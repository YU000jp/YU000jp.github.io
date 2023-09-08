let deferredPrompt;
const addBtn = document.getElementById("add-button");
window.addEventListener("beforeinstallprompt", (e) => {
    // 後で発生させることができるように、イベントを隠しておく。
    deferredPrompt = e;
    // ホーム画面に内側へ追加できることをユーザーに通知する UI の更新
    addBtn.style.display = "block";

    addBtn.addEventListener("click", (e) => {
        // A2HS ボタンを表示するユーザーインターフェイスを非表示にします。
        addBtn.style.display = "none";
        // プロンプトを表示
        deferredPrompt.prompt();
        // ユーザーがプロンプトに応答するのを待つ
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("ユーザーが A2HS プロンプトを受け入れました。");
            } else {
                console.log("ユーザーは A2HS のプロンプトを拒否しました。");
            }
            deferredPrompt = null;
        });
    });
});