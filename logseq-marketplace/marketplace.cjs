const fs = require('fs');
const axios = require('axios');

async function fetchPluginsData() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/logseq/marketplace/master/plugins.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching plugins data:', error);
        return null;
    }
}

async function downloadIcon(iconURL, id, icon) {
    const iconPath = `./icon/${id}/${icon}`;
    if (!fs.existsSync(iconPath)) {
        try {
            const response = await axios.get(iconURL, { responseType: 'arraybuffer' });
            fs.mkdirSync(`./icon/${id}`, { recursive: true });
            fs.writeFileSync(iconPath, Buffer.from(response.data));
        } catch (error) {
            console.error(`Error downloading icon for package ID ${id}:`, error);
        }
    }
}

function downloadIcons(packages) {
    try {
        for (const pkg of packages) {
            const { icon, id } = pkg;
            if (icon) {
                const iconURL = `https://github.com/YU000jp/fork-logseq-marketplace/raw/main/packages/${id}/${icon}`;
                downloadIcon(iconURL, id, icon);
            }
        }
    } catch (error) {
        console.error('Error downloading icons:', error);
    }
}

async function createTablesByTheme() {
    const pluginsData = await fetchPluginsData();
    if (!pluginsData) {
        console.error('Failed to fetch plugins data. Exiting.');
        return;
    }

    // Sort packages by addedAt property in descending order
    const sortedPackages = pluginsData.packages.sort((a, b) => b.addedAt - a.addedAt);

    // Separate packages based on theme property
    const themeYesPackages = sortedPackages.filter(pkg => pkg.theme);
    const themeNoPackages = sortedPackages.filter(pkg => !pkg.theme);



    //pluginData.datetimeをtxtファイルから読み込む
    fs.readFile('logseq-marketplace/lastUpdate.txt', 'utf8', (err, data) => { //github Actionsで実行する場合は、logseq-marketplace/lastUpdate.txtにする
        if (err) {
            console.error(`Error reading lastUpdate.txt:`, err);
            return;
        }

        //古い値と新しい値が同じだったら終了
        if (pluginsData.datetime.toString() === data.toString()) {
            console.log(`Not need update. exit.`);
        } else {
            // pluginData.datetimeをtxtファイルに書き込む
            fs.writeFile('logseq-marketplace/lastUpdate.txt', pluginsData.datetime.toString(), (err) => { //github Actionsで実行する場合は、logseq-marketplace/lastUpdate.txtにする
                if (err) {
                    console.error(`Error writing lastUpdate.txt:`, err);
                    return;
                }
            });

            // JSONからlastUpdateを取得する
            const lastUpdate = new Date(pluginsData.datetime).toLocaleString();
            // Create tables for theme Yes and No separately
            const themeYesTable = createTable(themeYesPackages, 'theme', lastUpdate);
            const themeNoTable = createTable(themeNoPackages, 'plugin', lastUpdate);

            // Write HTML files
            writeHTMLFile(themeYesTable, 'theme_table.html', 'theme');
            writeHTMLFile(themeNoTable, 'plugin_table.html', 'plugin');
            // Download icons
            downloadIcons(sortedPackages);
        }
    });
}

function createTable(packages, theme, lastUpdate) {
    // Create table header
    let tableContent = `
    <h2>Logseq ${theme} table (➕${theme === "theme" ? '<a href="./plugin_table.html">Plugin</a>' : '<a href="./theme_table.html">Theme</a>'})</h2>
    <p>This is a site for checking plugins from the browser. Can be sorted by title or newest(Click "Number"). Notes and checks by the user are saved in WebStorage (the device only). Copy the title using the copy button and input it on Logseq.</p>
    <p>Last updated: ${lastUpdate}</p>

    <table border="1" id="target">
        <thead>
            <tr><th>Number</th>
            <th>Repo</th>
            <th>Icon</th>
            <th>Title</th>
            <th>Copy</th>
            <th>Description / User Notes</th>
            <th>User Check</th>
            <th>Author</th>
            <th>Added Date</th></tr>
        </thead>
        <tbody>
        `;

    // Iterate over packages and populate table rows
    packages.forEach(async (pkg, index) => {
        const { title, repo, description, author, icon, addedAt, id } = pkg;
        let authorLink = author.startsWith('@') ? author : `@${author}`;
        //authorLinkに 「(URL)」が含まれている場合はそれを削除する
        authorLink = authorLink.replace(/\(.*\)/, '');
        const titleLink = `<a href="https://github.com/${repo}" title="${title}" class="title">${title}</a><small>🔗</small>`;
        const authorLinkWithAt = `<a href="https://github.com/${repo.split('/')[0]}">${authorLink}</a>`;
        const addedDate = new Date(addedAt).toLocaleDateString();
        const iconPath = icon ? `./icon/${id}/${icon}` : '';
        const iconHTML = icon ? `<img class="icon" src="${iconPath}" alt="icon" title="${title}" loading="lazy"/>` : '';
        const copyButton = `<button onclick="copyToClipboard('${title}')" title="${title}">📋</button>`;
        //昇順の番号 (上に行くほど番号が大きい)
        const number = packages.length - index;
        tableContent += `
        <tr>
            <th translate="no">
                ${number}
            </th>
            <th translate="no">
                <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/${repo}?style=for-the-badge" loading="lazy"/><br/>
                ${theme === 'theme' ? "" : `<img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/${repo}/total?style=for-the-badge" loading="lazy" /><br/>`}
                <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/${repo}?style=for-the-badge" loading="lazy"/>
            </th>
            <td translate="no">
                ${iconHTML}
            </td>
            <td translate="no">
                ${titleLink}<br/>
            </td>
            <td translate="no">
                ${copyButton}
            </td>
            <td>
                ${description}<br/>
                <textarea translate="no" name="textarea-${id}" onblur="textareaMemo(this)" rows="4" cols="80" placeholder="User Notes"></textarea>
            </td>
            <td translate="no">
                <input type="checkbox" onclick="toggleTaskConfirmation(this)" name="${id}"/>
            </td>
            <td translate="no">
                ${authorLinkWithAt}
            </td>
            <td translate="no">
            ${addedDate}
            </td>
        </tr>
        `;
    });

    tableContent += '</tbody>\n</table>\n';
    return tableContent;
}

function writeHTMLFile(htmlContent, filename, theme) {
    const fullHTMLContent = `
<!DOCTYPE html>
<html>
    <head>
        <title>Logseq ${theme} user records in table</title>
        <meta charset="UTF-8"/>
        <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
        <script>
            // Function to copy text to clipboard
            function copyToClipboard(text) {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            }

            // Function to toggle task confirmation
            let processing = false;
            function toggleTaskConfirmation(button) {
                if (processing) {
                    return;
                }
                processing = true;
                button.disabled = true;
                setTimeout(() => {
                    processing = false;
                    button.disabled = false;
                }
                , 1000);
                const taskName = button.name.trim();
                if (localStorage.getItem(taskName) === 'true') {
                    localStorage.setItem(taskName, 'false');
                    button.checked = false;
                } else {
                    localStorage.setItem(taskName, 'true');
                    button.checked = true;
                }
            }
            let processingTextarea = false;
            function textareaMemo(input){
                if (processingTextarea) {
                    return;
                }
                processingTextarea = true;
                input.disabled = true;
                setTimeout(() => {
                    processingTextarea = false;
                    input.disabled = false;
                }
                , 1000);
                localStorage.setItem("textarea-"+input.name, input.value);
            }
            // Load saved data from Web Storage
            document.addEventListener('DOMContentLoaded', function() {
                const buttons = document.querySelectorAll('input[type="checkbox"]');
                buttons.forEach(function(button) {
                    if (localStorage.getItem(button.name.trim()) === 'true') {
                        button.checked = true;
                    } else {
                        button.checked = false;
                    }
                });
                const textarea = document.querySelectorAll('textarea');
                textarea.forEach(function(input) {
                    input.value = localStorage.getItem("textarea-"+input.name);
                });
            });
            $(document).ready(function(){
                $("#target").DataTable({
                    // "language":{
                    //     url:"https://cdn.datatables.net/plug-ins/1.11.5/i18n/ja.json",
                    // }
                    stateSave: true,
                    orderClasses: true,
                    orderMulti: true,
                    pageLength: 120,
                    fixedHeader: true,
                });
            });
        </script>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
        <link rel="stylesheet" href="marketplace.css"/>
        <script type="text/javascript" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
        <link rel="icon" href="https://blog.logseq.com/content/images/size/w256h256/2022/04/logseq-favicon.png" type="image/png">
    </head>
    <body>
    ${htmlContent}
    </body>
</html>
`;

    fs.writeFile(filename, fullHTMLContent, (err) => {
        if (err) {
            console.error(`Error writing HTML file ${filename}:`, err);
            return;
        }
        console.log(`HTML file generated successfully: ${filename}`);
    });
}

// Call the function to generate tables based on theme
createTablesByTheme();
