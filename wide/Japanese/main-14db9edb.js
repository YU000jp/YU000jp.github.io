let F;const ze=new Uint8Array(16);function Je(){if(!F&&(F=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!F))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return F(ze)}const Qe=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function Ze(t){return typeof t=="string"&&Qe.test(t)}const p=[];for(let t=0;t<256;++t)p.push((t+256).toString(16).slice(1));function et(t,e=0){return(p[t[e+0]]+p[t[e+1]]+p[t[e+2]]+p[t[e+3]]+"-"+p[t[e+4]]+p[t[e+5]]+"-"+p[t[e+6]]+p[t[e+7]]+"-"+p[t[e+8]]+p[t[e+9]]+"-"+p[t[e+10]]+p[t[e+11]]+p[t[e+12]]+p[t[e+13]]+p[t[e+14]]+p[t[e+15]]).toLowerCase()}const tt=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ye={randomUUID:tt};function Ie(t,e,n){if(ye.randomUUID&&!e&&!t)return ye.randomUUID();t=t||{};const i=t.random||(t.rng||Je)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,e){n=n||0;for(let a=0;a<16;++a)e[n+a]=i[a];return e}return et(i)}class nt{constructor(){this.listeners={}}add(e,n,i,a=Ie()){this.listeners[a]={event:e,element:n,handler:i},n.addEventListener(e,i)}remove(e){const n=this.listeners[e];n&&(n.element.removeEventListener(n.event,n.handler),delete this.listeners[e])}}const l={monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",done:"DONE"};class ne{constructor(e){this.id=e.id||Ie(),this.title=e.title,this.status=e.status,this.check=e.check,this.dateAndTime=e.dateAndTime}update(e){this.title=e.title||this.title,this.status=e.status||this.status,this.check=e.check===null?this.check:e.check,this.dateAndTime=e.dateAndTime||this.dateAndTime}static validate(e){return!(!e||!Ze(e.id)||!e.title||!Object.values(l).includes(e.status))}}const it="DONEのリスト内を空にします",rt="削除",at="この項目を削除します",Z="daily-kanban-japanese";class st{constructor(){this.storage=localStorage,this.tasks=this.getStoredTasks()}add(e){this.tasks.push(e),this.updateStorage()}delete(e){this.tasks=this.tasks.filter(({id:n})=>n!==e.id),this.updateStorage()}find(e){return this.tasks.find(n=>n.id===e)}update(e){this.tasks=this.tasks.map(n=>n.id===e.id?e:n)}filter(e){return this.tasks.filter(({status:n})=>n===e)}moveAboveTarget(e,n){const i=this.tasks.indexOf(e),a=this.tasks.indexOf(n);this.changeOrder(e,i,i<a?a-1:a)}moveToLast(e){const n=this.tasks.indexOf(e);this.changeOrder(e,n,this.tasks.length)}checkbox(){this.updateStorage()}changeOrder(e,n,i){this.tasks.splice(n,1),this.tasks.splice(i,0,e),this.updateStorage()}updateStorage(){this.storage.setItem(Z,JSON.stringify(this.tasks))}getStoredTasks(){const e=this.storage.getItem(Z);if(!e)return[];try{const n=JSON.parse(e);return ot(n),n.map(a=>new ne(a))}catch{return this.storage.removeItem(Z),[]}}}function ot(t){if(!Array.isArray(t)||!t.every(e=>ne.validate(e)))throw new Error("引数「value」は TaskObject[] 型と一致しません。")}var S=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function dt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ut=function(e,n){return Array.prototype.slice.call(e,n)},ct=typeof setImmediate=="function",te;ct?te=function(t){setImmediate(t)}:te=function(t){setTimeout(t,0)};var lt=te,ft=lt,ht=function(e,n,i){e&&ft(function(){e.apply(i||null,n||[])})},ge=ut,vt=ht,mt=function(e,n){var i=n||{},a={};return e===void 0&&(e={}),e.on=function(s,o){return a[s]?a[s].push(o):a[s]=[o],e},e.once=function(s,o){return o._once=!0,e.on(s,o),e},e.off=function(s,o){var h=arguments.length;if(h===1)delete a[s];else if(h===0)a={};else{var g=a[s];if(!g)return e;g.splice(g.indexOf(o),1)}return e},e.emit=function(){var s=ge(arguments);return e.emitterSnapshot(s.shift()).apply(this,s)},e.emitterSnapshot=function(s){var o=(a[s]||[]).slice(0);return function(){var h=ge(arguments),g=this||e;if(s==="error"&&i.throws!==!1&&!o.length)throw h.length===1?h[0]:h;return o.forEach(function(C){i.async?vt(C,h,g):C.apply(g,h),C._once&&e.off(s,C)}),e}},e},De=S.CustomEvent;function yt(){try{var t=new De("cat",{detail:{foo:"bar"}});return t.type==="cat"&&t.detail.foo==="bar"}catch{}return!1}var gt=yt()?De:typeof document<"u"&&typeof document.createEvent=="function"?function(e,n){var i=document.createEvent("CustomEvent");return n?i.initCustomEvent(e,n.bubbles,n.cancelable,n.detail):i.initCustomEvent(e,!1,!1,void 0),i}:function(e,n){var i=document.createEventObject();return i.type=e,n?(i.bubbles=!!n.bubbles,i.cancelable=!!n.cancelable,i.detail=n.detail):(i.bubbles=!1,i.cancelable=!1,i.detail=void 0),i},Be=[],ee="",pt=/^on/;for(ee in S)pt.test(ee)&&Be.push(ee.slice(2));var Et=Be,Lt=gt,kt=Et,H=S.document,xe=wt,Oe=Tt,$=[];S.addEventListener||(xe=Ct,Oe=St);var bt={add:xe,remove:Oe,fabricate:It};function wt(t,e,n,i){return t.addEventListener(e,n,i)}function Ct(t,e,n){return t.attachEvent("on"+e,Bt(t,e,n))}function Tt(t,e,n,i){return t.removeEventListener(e,n,i)}function St(t,e,n){var i=Ae(t,e,n);if(i)return t.detachEvent("on"+e,i)}function It(t,e,n){var i=kt.indexOf(e)===-1?s():a();t.dispatchEvent?t.dispatchEvent(i):t.fireEvent("on"+e,i);function a(){var o;return H.createEvent?(o=H.createEvent("Event"),o.initEvent(e,!0,!0)):H.createEventObject&&(o=H.createEventObject()),o}function s(){return new Lt(e,{detail:n})}}function Dt(t,e,n){return function(a){var s=a||S.event;s.target=s.target||s.srcElement,s.preventDefault=s.preventDefault||function(){s.returnValue=!1},s.stopPropagation=s.stopPropagation||function(){s.cancelBubble=!0},s.which=s.which||s.keyCode,n.call(t,s)}}function Bt(t,e,n){var i=Ae(t,e,n)||Dt(t,e,n);return $.push({wrapper:i,element:t,type:e,fn:n}),i}function Ae(t,e,n){var i=xt(t,e,n);if(i){var a=$[i].wrapper;return $.splice(i,1),a}}function xt(t,e,n){var i,a;for(i=0;i<$.length;i++)if(a=$[i],a.element===t&&a.type===e&&a.fn===n)return i}var pe={},Ot="(?:^|\\s)",At="(?:\\s|$)";function Re(t){var e=pe[t];return e?e.lastIndex=0:pe[t]=e=new RegExp(Ot+t+At,"g"),e}function Rt(t,e){var n=t.className;n.length?Re(e).test(n)||(t.className+=" "+e):t.className=e}function Mt(t,e){t.className=t.className.replace(Re(e)," ").trim()}var _t={add:Rt,rm:Mt},Nt=mt,N=bt,B=_t,X=document,T=X.documentElement;function Xt(t,e){var n=arguments.length;n===1&&Array.isArray(t)===!1&&(e=t,t=[]);var i,a,s,o,h,g,Y,C,M,m,W,O=null,j,u=e||{};u.moves===void 0&&(u.moves=be),u.accepts===void 0&&(u.accepts=be),u.invalid===void 0&&(u.invalid=Pe),u.containers===void 0&&(u.containers=t||[]),u.isContainer===void 0&&(u.isContainer=jt),u.copy===void 0&&(u.copy=!1),u.copySortSource===void 0&&(u.copySortSource=!1),u.revertOnSpill===void 0&&(u.revertOnSpill=!1),u.removeOnSpill===void 0&&(u.removeOnSpill=!1),u.direction===void 0&&(u.direction="vertical"),u.ignoreInputTextSelection===void 0&&(u.ignoreInputTextSelection=!0),u.mirrorContainer===void 0&&(u.mirrorContainer=X.body);var v=Nt({containers:u.containers,start:Ue,end:de,cancel:fe,remove:le,destroy:Ne,canMove:je,dragging:!1});return u.removeOnSpill===!0&&v.on("over",$e).on("out",Fe),re(),v;function q(r){return v.containers.indexOf(r)!==-1||u.isContainer(r)}function re(r){var d=r?"remove":"add";U(T,d,"mousedown",Xe),U(T,d,"mouseup",K)}function V(r){var d=r?"remove":"add";U(T,d,"mousemove",Ye)}function ae(r){var d=r?"remove":"add";N[d](T,"selectstart",se),N[d](T,"click",se)}function Ne(){re(!0),K({})}function se(r){j&&r.preventDefault()}function Xe(r){g=r.clientX,Y=r.clientY;var d=Ee(r)!==1||r.metaKey||r.ctrlKey;if(!d){var c=r.target,f=G(c);f&&(j=f,V(),r.type==="mousedown"&&(Te(c)?c.focus():r.preventDefault()))}}function Ye(r){if(j){if(Ee(r)===0){K({});return}if(!(r.clientX!==void 0&&Math.abs(r.clientX-g)<=(u.slideFactorX||0)&&r.clientY!==void 0&&Math.abs(r.clientY-Y)<=(u.slideFactorY||0))){if(u.ignoreInputTextSelection){var d=x("clientX",r)||0,c=x("clientY",r)||0,f=X.elementFromPoint(d,c);if(Te(f))return}var L=j;V(!0),ae(),de(),oe(L);var y=Yt(s);o=x("pageX",r)-y.left,h=x("pageY",r)-y.top,B.add(m||s,"gu-transit"),He(),Q(r)}}}function G(r){if(!(v.dragging&&i)&&!q(r)){for(var d=r;k(r)&&q(k(r))===!1;)if(u.invalid(r,d)||(r=k(r),!r))return;var c=k(r);if(c&&!u.invalid(r,d)){var f=u.moves(r,c,d,P(r));if(f)return{item:r,source:c}}}}function je(r){return!!G(r)}function Ue(r){var d=G(r);d&&oe(d)}function oe(r){qe(r.item,r.source)&&(m=r.item.cloneNode(!0),v.emit("cloned",m,r.item,"copy")),a=r.source,s=r.item,C=M=P(r.item),v.dragging=!0,v.emit("drag",s,a)}function Pe(){return!1}function de(){if(v.dragging){var r=m||s;ce(r,k(r))}}function ue(){j=!1,V(!0),ae(!0)}function K(r){if(ue(),!!v.dragging){var d=m||s,c=x("clientX",r)||0,f=x("clientY",r)||0,L=ke(i,c,f),y=he(L,c,f);y&&(m&&u.copySortSource||!m||y!==a)?ce(d,y):u.removeOnSpill?le():fe()}}function ce(r,d){var c=k(r);m&&u.copySortSource&&d===a&&c.removeChild(s),J(d)?v.emit("cancel",r,a,a):v.emit("drop",r,d,a,M),z()}function le(){if(v.dragging){var r=m||s,d=k(r);d&&d.removeChild(r),v.emit(m?"cancel":"remove",r,d,a),z()}}function fe(r){if(v.dragging){var d=arguments.length>0?r:u.revertOnSpill,c=m||s,f=k(c),L=J(f);L===!1&&d&&(m?f&&f.removeChild(m):a.insertBefore(c,C)),L||d?v.emit("cancel",c,a,a):v.emit("drop",c,f,a,M),z()}}function z(){var r=m||s;ue(),We(),r&&B.rm(r,"gu-transit"),W&&clearTimeout(W),v.dragging=!1,O&&v.emit("out",r,O,a),v.emit("dragend",r),a=s=m=C=M=W=O=null}function J(r,d){var c;return d!==void 0?c=d:i?c=M:c=P(m||s),r===a&&c===C}function he(r,d,c){for(var f=r;f&&!L();)f=k(f);return f;function L(){var y=q(f);if(y===!1)return!1;var _=ve(f,r),E=me(f,_,d,c),I=J(f,E);return I?!0:u.accepts(s,f,a,E)}}function Q(r){if(!i)return;r.preventDefault();var d=x("clientX",r)||0,c=x("clientY",r)||0,f=d-o,L=c-h;i.style.left=f+"px",i.style.top=L+"px";var y=m||s,_=ke(i,d,c),E=he(_,d,c),I=E!==null&&E!==O;(I||E===null)&&(Ge(),O=E,Ve());var b=k(y);if(E===a&&m&&!u.copySortSource){b&&b.removeChild(y);return}var w,A=ve(E,_);if(A!==null)w=me(E,A,d,c);else if(u.revertOnSpill===!0&&!m)w=C,E=a;else{m&&b&&b.removeChild(y);return}(w===null&&I||w!==y&&w!==P(y))&&(M=w,E.insertBefore(y,w),v.emit("shadow",y,E,a));function D(Ke){v.emit(Ke,y,O,a)}function Ve(){I&&D("over")}function Ge(){O&&D("out")}}function $e(r){B.rm(r,"gu-hide")}function Fe(r){v.dragging&&B.add(r,"gu-hide")}function He(){if(!i){var r=s.getBoundingClientRect();i=s.cloneNode(!0),i.style.width=we(r)+"px",i.style.height=Ce(r)+"px",B.rm(i,"gu-transit"),B.add(i,"gu-mirror"),u.mirrorContainer.appendChild(i),U(T,"add","mousemove",Q),B.add(u.mirrorContainer,"gu-unselectable"),v.emit("cloned",i,s,"mirror")}}function We(){i&&(B.rm(u.mirrorContainer,"gu-unselectable"),U(T,"remove","mousemove",Q),k(i).removeChild(i),i=null)}function ve(r,d){for(var c=d;c!==r&&k(c)!==r;)c=k(c);return c===T?null:c}function me(r,d,c,f){var L=u.direction==="horizontal",y=d!==r?E():_();return y;function _(){var b=r.children.length,w,A,D;for(w=0;w<b;w++)if(A=r.children[w],D=A.getBoundingClientRect(),L&&D.left+D.width/2>c||!L&&D.top+D.height/2>f)return A;return null}function E(){var b=d.getBoundingClientRect();return I(L?c>b.left+we(b)/2:f>b.top+Ce(b)/2)}function I(b){return b?P(d):d}}function qe(r,d){return typeof u.copy=="boolean"?u.copy:u.copy(r,d)}}function U(t,e,n,i){var a={mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"},s={mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"},o={mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"};S.navigator.pointerEnabled?N[e](t,s[n],i):S.navigator.msPointerEnabled?N[e](t,o[n],i):(N[e](t,a[n],i),N[e](t,n,i))}function Ee(t){if(t.touches!==void 0)return t.touches.length;if(t.which!==void 0&&t.which!==0)return t.which;if(t.buttons!==void 0)return t.buttons;var e=t.button;if(e!==void 0)return e&1?1:e&2?3:e&4?2:0}function Yt(t){var e=t.getBoundingClientRect();return{left:e.left+Le("scrollLeft","pageXOffset"),top:e.top+Le("scrollTop","pageYOffset")}}function Le(t,e){return typeof S[e]<"u"?S[e]:T.clientHeight?T[t]:X.body[t]}function ke(t,e,n){t=t||{};var i=t.className||"",a;return t.className+=" gu-hide",a=X.elementFromPoint(e,n),t.className=i,a}function jt(){return!1}function be(){return!0}function we(t){return t.width||t.right-t.left}function Ce(t){return t.height||t.bottom-t.top}function k(t){return t.parentNode===X?null:t.parentNode}function Te(t){return t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||Me(t)}function Me(t){return!t||t.contentEditable==="false"?!1:t.contentEditable==="true"?!0:Me(k(t))}function P(t){return t.nextElementSibling||e();function e(){var n=t;do n=n.nextSibling;while(n&&n.nodeType!==1);return n}}function Ut(t){return t.targetTouches&&t.targetTouches.length?t.targetTouches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t}function x(t,e){var n=Ut(e),i={pageX:"clientX",pageY:"clientY"};return t in i&&!(t in n)&&i[t]in n&&(t=i[t]),n[t]}var Pt=Xt;const $t=dt(Pt),R=t=>{const e=localStorage.getItem("todayColoring")||"#e6ffe6";t.style.outline="2px solid "+e,t.style.outlineOffset="1px",t.style.borderRadius="5px",setTimeout(()=>{t.style.outline="unset",t.style.outlineOffset="unset",t.style.borderRadius="unset"},1100)};class Ft{constructor(e,n,i,a,s,o,h,g){this.mondayList=e,this.tuesdayList=n,this.wednesdayList=i,this.thursdayList=a,this.fridayList=s,this.saturdayList=o,this.sundayList=h,this.doneList=g}append(e){const{taskEl:n,deleteButtonEl:i,checkEl:a}=this.render(e);switch(new Date().getDay()){case 0:this.sundayList.append(n),R(this.sundayList);break;case 1:this.mondayList.append(n),R(this.mondayList);break;case 2:this.tuesdayList.append(n),R(this.tuesdayList);break;case 3:this.wednesdayList.append(n),R(this.wednesdayList);break;case 4:this.thursdayList.append(n),R(this.thursdayList);break;case 5:this.fridayList.append(n),R(this.fridayList);break;case 6:this.saturdayList.append(n),R(this.saturdayList);break}return{deleteButtonEl:i,checkEl:a}}remove(e){const n=document.getElementById(e.id);n&&(e.status===l.monday?this.mondayList.removeChild(n):e.status===l.tuesday?this.tuesdayList.removeChild(n):e.status===l.wednesday?this.wednesdayList.removeChild(n):e.status===l.thursday?this.thursdayList.removeChild(n):e.status===l.friday?this.fridayList.removeChild(n):e.status===l.saturday?this.saturdayList.removeChild(n):e.status===l.sunday?this.sundayList.removeChild(n):e.status===l.done&&this.doneList.removeChild(n))}subscribeDragAndDrop(e){$t([this.mondayList,this.tuesdayList,this.wednesdayList,this.thursdayList,this.fridayList,this.saturdayList,this.sundayList,this.doneList]).on("drop",(n,i,a,s)=>{const o=i.id==="doneList"?l.done:i.id==="mondayList"?l.monday:i.id==="tuesdayList"?l.tuesday:i.id==="wednesdayList"?l.wednesday:i.id==="thursdayList"?l.thursday:i.id==="fridayList"?l.friday:i.id==="saturdayList"?l.saturday:i.id==="sundayList"?l.sunday:l.done;e(n,s,o)})}getId(e){return e.id}renderAll(e){const n=this.renderList(e.filter(l.monday),this.mondayList),i=this.renderList(e.filter(l.tuesday),this.tuesdayList),a=this.renderList(e.filter(l.wednesday),this.wednesdayList),s=this.renderList(e.filter(l.thursday),this.thursdayList),o=this.renderList(e.filter(l.friday),this.fridayList),h=this.renderList(e.filter(l.saturday),this.saturdayList),g=this.renderList(e.filter(l.sunday),this.sundayList),Y=this.renderList(e.filter(l.done),this.doneList);return[...n,...i,...a,...s,...o,...h,...g,...Y]}renderList(e,n){if(e.length===0)return[];const i=[];return e.forEach(a=>{const{taskEl:s,deleteButtonEl:o,checkEl:h}=this.render(a);n.append(s),i.push({task:a,deleteButtonEl:o,checkEl:h})}),i}render(e){const n=document.createElement("div"),i=document.createElement("span"),a=document.createElement("button"),s=document.createElement("input");return s.type="checkbox",s.checked=e.check,n.id=e.id,n.classList.add("task-item"),i.textContent=e.title,n.title=e.title+`
(createdAt: `+e.dateAndTime+")",a.textContent=rt,a.title=at,n.append(s,i,a),{taskEl:n,deleteButtonEl:a,checkEl:s}}}function ie(){const t=document.querySelectorAll('div.lane-item:has(div[data-today="true"])');t&&t.forEach(n=>{n.style.backgroundColor="unset",n.dataset.today="false"});const e=_e();if(e){const n=localStorage.getItem("todayColoring");if(n){e.style.backgroundColor=n,e.dataset.today="true";const i=document.getElementById("todayColoring");for(let a=0;a<i.options.length;a++)if(i.options[a].value===n){i.options[a].selected=!0;break}}}}function Se(){const t=document.querySelector("div.lane-item:has(div#sundayList)");if(t.dataset.begin==="true")return;document.querySelector("div.lane-item:has(div#mondayList)")?.insertAdjacentElement("beforebegin",t),t.dataset.begin="true"}function Ht(){const t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1,0,0,0).getTime()-t.getTime();setTimeout(ie,n)}function Wt(){const t=new Date;t.getHours()===0&&t.getMinutes()===0&&ie()}function qt(){document.hidden||Wt()}class Vt{constructor(){this.eventListener=new nt,this.taskCollection=new st,this.taskRenderer=new Ft(document.getElementById("mondayList"),document.getElementById("tuesdayList"),document.getElementById("wednesdayList"),document.getElementById("thursdayList"),document.getElementById("fridayList"),document.getElementById("saturdayList"),document.getElementById("sundayList"),document.getElementById("doneList")),this.handleSubmit=e=>{e.preventDefault();const n=document.getElementById("title");if(!n.value)return;const i=new Date().getDay(),a=i===0?l.sunday:i===1?l.monday:i===2?l.tuesday:i===3?l.wednesday:i===4?l.thursday:i===5?l.friday:i===6?l.saturday:l.monday,s=new Intl.DateTimeFormat("default",{month:"short",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric"}).format(new Date),o=new ne({title:n.value,check:!1,status:a,dateAndTime:s});this.taskCollection.add(o);const{deleteButtonEl:h,checkEl:g}=this.taskRenderer.append(o);this.eventListener.add("click",h,()=>this.handleClickDeleteTask(o),o.id),this.eventListener.add("change",g,()=>this.handleClickCheckboxTask(o),o.id),n.value=""},this.executeDeleteTask=e=>{this.eventListener.remove(e.id),this.taskCollection.delete(e),this.taskRenderer.remove(e)},this.handleClickDeleteTask=e=>{this.executeDeleteTask(e)},this.handleClickCheckboxTask=e=>{const n=document.querySelector(`div[id="${e.id}"]>input[type="checkbox"]`).checked;e.update({check:n}),this.taskCollection.update(e),this.taskCollection.checkbox()},this.handleClickDeleteAllDoneTasks=()=>{if(!window.confirm(it))return;this.taskCollection.filter(l.done).forEach(n=>this.executeDeleteTask(n))},this.handleDropAndDrop=(e,n,i)=>{const a=this.taskRenderer.getId(e);if(!a)return;const s=this.taskCollection.find(a);if(s)if(s.update({status:i}),this.taskCollection.update(s),n){const o=this.taskRenderer.getId(n);if(!o)return;const h=this.taskCollection.find(o);if(!h)return;this.taskCollection.moveAboveTarget(s,h)}else this.taskCollection.moveToLast(s)}}start(){this.taskRenderer.renderAll(this.taskCollection).forEach(({task:o,deleteButtonEl:h,checkEl:g})=>{this.eventListener.add("click",h,()=>this.handleClickDeleteTask(o),o.id),this.eventListener.add("change",g,()=>this.handleClickCheckboxTask(o),o.id)});const n=document.getElementById("createForm");this.eventListener.add("submit",n,this.handleSubmit);const i=document.getElementById("deleteAllDoneTask");this.eventListener.add("click",i,this.handleClickDeleteAllDoneTasks);const a=document.getElementById("startDayOfWeek");this.eventListener.add("change",a,()=>{if(a.checked)localStorage.setItem("startDayOfWeek","true"),Se();else{localStorage.setItem("startDayOfWeek","false");const o=document.querySelector("div.lane-item:has(div#sundayList)");o.dataset.begin==="true"&&(document.querySelector("div.lane-item:has(div#saturdayList)")?.insertAdjacentElement("afterend",o),o.dataset.begin="false")}});const s=document.getElementById("todayColoring");this.eventListener.add("change",s,()=>{const o=_e();o&&(o.style.backgroundColor=s.value),localStorage.setItem("todayColoring",s.value)}),this.taskRenderer.subscribeDragAndDrop(this.handleDropAndDrop),document.addEventListener("visibilitychange",qt),Ht(),ie(),localStorage.getItem("startDayOfWeek")==="true"&&(a.checked=!0,Se())}}window.addEventListener("load",()=>{new Vt().start()});function _e(){switch(new Date().getDay()){case 0:return document.getElementById("sundayList");case 1:return document.getElementById("mondayList");case 2:return document.getElementById("tuesdayList");case 3:return document.getElementById("wednesdayList");case 4:return document.getElementById("thursdayList");case 5:return document.getElementById("fridayList");case 6:return document.getElementById("saturdayList")}}