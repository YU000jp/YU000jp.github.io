let F;const ze=new Uint8Array(16);function Je(){if(!F&&(F=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!F))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return F(ze)}const Qe=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function Ze(t){return typeof t=="string"&&Qe.test(t)}const p=[];for(let t=0;t<256;++t)p.push((t+256).toString(16).slice(1));function et(t,e=0){return(p[t[e+0]]+p[t[e+1]]+p[t[e+2]]+p[t[e+3]]+"-"+p[t[e+4]]+p[t[e+5]]+"-"+p[t[e+6]]+p[t[e+7]]+"-"+p[t[e+8]]+p[t[e+9]]+"-"+p[t[e+10]]+p[t[e+11]]+p[t[e+12]]+p[t[e+13]]+p[t[e+14]]+p[t[e+15]]).toLowerCase()}const tt=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ye={randomUUID:tt};function Ie(t,e,n){if(ye.randomUUID&&!e&&!t)return ye.randomUUID();t=t||{};const i=t.random||(t.rng||Je)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,e){n=n||0;for(let s=0;s<16;++s)e[n+s]=i[s];return e}return et(i)}class nt{constructor(){this.listeners={}}add(e,n,i,s=Ie()){this.listeners[s]={event:e,element:n,handler:i},n.addEventListener(e,i)}remove(e){const n=this.listeners[e];n&&(n.element.removeEventListener(n.event,n.handler),delete this.listeners[e])}}const l={monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday",done:"DONE"};class ne{constructor(e){this.id=e.id||Ie(),this.title=e.title,this.status=e.status,this.check=e.check,this.dateAndTime=e.dateAndTime}update(e){this.title=e.title||this.title,this.status=e.status||this.status,this.check=e.check===null?this.check:e.check,this.dateAndTime=e.dateAndTime||this.dateAndTime}static validate(e){return!(!e||!Ze(e.id)||!e.title||!Object.values(l).includes(e.status)||typeof e.check!="boolean"||!e.dateAndTime)}}const Z="TASKS";class it{constructor(){this.storage=localStorage,this.tasks=this.getStoredTasks()}add(e){this.tasks.push(e),this.updateStorage()}delete(e){this.tasks=this.tasks.filter(({id:n})=>n!==e.id),this.updateStorage()}find(e){return this.tasks.find(n=>n.id===e)}update(e){this.tasks=this.tasks.map(n=>n.id===e.id?e:n)}filter(e){return this.tasks.filter(({status:n})=>n===e)}moveAboveTarget(e,n){const i=this.tasks.indexOf(e),s=this.tasks.indexOf(n);this.changeOrder(e,i,i<s?s-1:s)}moveToLast(e){const n=this.tasks.indexOf(e);this.changeOrder(e,n,this.tasks.length)}checkbox(){this.updateStorage()}changeOrder(e,n,i){this.tasks.splice(n,1),this.tasks.splice(i,0,e),this.updateStorage()}updateStorage(){this.storage.setItem(Z,JSON.stringify(this.tasks))}getStoredTasks(){const e=this.storage.getItem(Z);if(!e)return[];try{const n=JSON.parse(e);return rt(n),n.map(s=>new ne(s))}catch{return this.storage.removeItem(Z),[]}}}function rt(t){if(!Array.isArray(t)||!t.every(e=>ne.validate(e)))throw new Error("引数「value」は TaskObject[] 型と一致しません。")}var S=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function st(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var at=function(e,n){return Array.prototype.slice.call(e,n)},ot=typeof setImmediate=="function",te;ot?te=function(t){setImmediate(t)}:te=function(t){setTimeout(t,0)};var dt=te,ut=dt,ct=function(e,n,i){e&&ut(function(){e.apply(i||null,n||[])})},ge=at,lt=ct,ft=function(e,n){var i=n||{},s={};return e===void 0&&(e={}),e.on=function(a,o){return s[a]?s[a].push(o):s[a]=[o],e},e.once=function(a,o){return o._once=!0,e.on(a,o),e},e.off=function(a,o){var h=arguments.length;if(h===1)delete s[a];else if(h===0)s={};else{var g=s[a];if(!g)return e;g.splice(g.indexOf(o),1)}return e},e.emit=function(){var a=ge(arguments);return e.emitterSnapshot(a.shift()).apply(this,a)},e.emitterSnapshot=function(a){var o=(s[a]||[]).slice(0);return function(){var h=ge(arguments),g=this||e;if(a==="error"&&i.throws!==!1&&!o.length)throw h.length===1?h[0]:h;return o.forEach(function(T){i.async?lt(T,h,g):T.apply(g,h),T._once&&e.off(a,T)}),e}},e},De=S.CustomEvent;function ht(){try{var t=new De("cat",{detail:{foo:"bar"}});return t.type==="cat"&&t.detail.foo==="bar"}catch{}return!1}var vt=ht()?De:typeof document<"u"&&typeof document.createEvent=="function"?function(e,n){var i=document.createEvent("CustomEvent");return n?i.initCustomEvent(e,n.bubbles,n.cancelable,n.detail):i.initCustomEvent(e,!1,!1,void 0),i}:function(e,n){var i=document.createEventObject();return i.type=e,n?(i.bubbles=!!n.bubbles,i.cancelable=!!n.cancelable,i.detail=n.detail):(i.bubbles=!1,i.cancelable=!1,i.detail=void 0),i},Be=[],ee="",mt=/^on/;for(ee in S)mt.test(ee)&&Be.push(ee.slice(2));var yt=Be,gt=vt,pt=yt,H=S.document,xe=Lt,Oe=bt,$=[];S.addEventListener||(xe=kt,Oe=wt);var Et={add:xe,remove:Oe,fabricate:Tt};function Lt(t,e,n,i){return t.addEventListener(e,n,i)}function kt(t,e,n){return t.attachEvent("on"+e,St(t,e,n))}function bt(t,e,n,i){return t.removeEventListener(e,n,i)}function wt(t,e,n){var i=Ae(t,e,n);if(i)return t.detachEvent("on"+e,i)}function Tt(t,e,n){var i=pt.indexOf(e)===-1?a():s();t.dispatchEvent?t.dispatchEvent(i):t.fireEvent("on"+e,i);function s(){var o;return H.createEvent?(o=H.createEvent("Event"),o.initEvent(e,!0,!0)):H.createEventObject&&(o=H.createEventObject()),o}function a(){return new gt(e,{detail:n})}}function Ct(t,e,n){return function(s){var a=s||S.event;a.target=a.target||a.srcElement,a.preventDefault=a.preventDefault||function(){a.returnValue=!1},a.stopPropagation=a.stopPropagation||function(){a.cancelBubble=!0},a.which=a.which||a.keyCode,n.call(t,a)}}function St(t,e,n){var i=Ae(t,e,n)||Ct(t,e,n);return $.push({wrapper:i,element:t,type:e,fn:n}),i}function Ae(t,e,n){var i=It(t,e,n);if(i){var s=$[i].wrapper;return $.splice(i,1),s}}function It(t,e,n){var i,s;for(i=0;i<$.length;i++)if(s=$[i],s.element===t&&s.type===e&&s.fn===n)return i}var pe={},Dt="(?:^|\\s)",Bt="(?:\\s|$)";function Re(t){var e=pe[t];return e?e.lastIndex=0:pe[t]=e=new RegExp(Dt+t+Bt,"g"),e}function xt(t,e){var n=t.className;n.length?Re(e).test(n)||(t.className+=" "+e):t.className=e}function Ot(t,e){t.className=t.className.replace(Re(e)," ").trim()}var At={add:xt,rm:Ot},Rt=ft,N=Et,B=At,X=document,C=X.documentElement;function Mt(t,e){var n=arguments.length;n===1&&Array.isArray(t)===!1&&(e=t,t=[]);var i,s,a,o,h,g,Y,T,M,m,W,O=null,U,u=e||{};u.moves===void 0&&(u.moves=be),u.accepts===void 0&&(u.accepts=be),u.invalid===void 0&&(u.invalid=Pe),u.containers===void 0&&(u.containers=t||[]),u.isContainer===void 0&&(u.isContainer=Nt),u.copy===void 0&&(u.copy=!1),u.copySortSource===void 0&&(u.copySortSource=!1),u.revertOnSpill===void 0&&(u.revertOnSpill=!1),u.removeOnSpill===void 0&&(u.removeOnSpill=!1),u.direction===void 0&&(u.direction="vertical"),u.ignoreInputTextSelection===void 0&&(u.ignoreInputTextSelection=!0),u.mirrorContainer===void 0&&(u.mirrorContainer=X.body);var v=Rt({containers:u.containers,start:je,end:de,cancel:fe,remove:le,destroy:Ne,canMove:Ue,dragging:!1});return u.removeOnSpill===!0&&v.on("over",$e).on("out",Fe),re(),v;function q(r){return v.containers.indexOf(r)!==-1||u.isContainer(r)}function re(r){var d=r?"remove":"add";j(C,d,"mousedown",Xe),j(C,d,"mouseup",K)}function V(r){var d=r?"remove":"add";j(C,d,"mousemove",Ye)}function se(r){var d=r?"remove":"add";N[d](C,"selectstart",ae),N[d](C,"click",ae)}function Ne(){re(!0),K({})}function ae(r){U&&r.preventDefault()}function Xe(r){g=r.clientX,Y=r.clientY;var d=Ee(r)!==1||r.metaKey||r.ctrlKey;if(!d){var c=r.target,f=G(c);f&&(U=f,V(),r.type==="mousedown"&&(Ce(c)?c.focus():r.preventDefault()))}}function Ye(r){if(U){if(Ee(r)===0){K({});return}if(!(r.clientX!==void 0&&Math.abs(r.clientX-g)<=(u.slideFactorX||0)&&r.clientY!==void 0&&Math.abs(r.clientY-Y)<=(u.slideFactorY||0))){if(u.ignoreInputTextSelection){var d=x("clientX",r)||0,c=x("clientY",r)||0,f=X.elementFromPoint(d,c);if(Ce(f))return}var L=U;V(!0),se(),de(),oe(L);var y=_t(a);o=x("pageX",r)-y.left,h=x("pageY",r)-y.top,B.add(m||a,"gu-transit"),He(),Q(r)}}}function G(r){if(!(v.dragging&&i)&&!q(r)){for(var d=r;k(r)&&q(k(r))===!1;)if(u.invalid(r,d)||(r=k(r),!r))return;var c=k(r);if(c&&!u.invalid(r,d)){var f=u.moves(r,c,d,P(r));if(f)return{item:r,source:c}}}}function Ue(r){return!!G(r)}function je(r){var d=G(r);d&&oe(d)}function oe(r){qe(r.item,r.source)&&(m=r.item.cloneNode(!0),v.emit("cloned",m,r.item,"copy")),s=r.source,a=r.item,T=M=P(r.item),v.dragging=!0,v.emit("drag",a,s)}function Pe(){return!1}function de(){if(v.dragging){var r=m||a;ce(r,k(r))}}function ue(){U=!1,V(!0),se(!0)}function K(r){if(ue(),!!v.dragging){var d=m||a,c=x("clientX",r)||0,f=x("clientY",r)||0,L=ke(i,c,f),y=he(L,c,f);y&&(m&&u.copySortSource||!m||y!==s)?ce(d,y):u.removeOnSpill?le():fe()}}function ce(r,d){var c=k(r);m&&u.copySortSource&&d===s&&c.removeChild(a),J(d)?v.emit("cancel",r,s,s):v.emit("drop",r,d,s,M),z()}function le(){if(v.dragging){var r=m||a,d=k(r);d&&d.removeChild(r),v.emit(m?"cancel":"remove",r,d,s),z()}}function fe(r){if(v.dragging){var d=arguments.length>0?r:u.revertOnSpill,c=m||a,f=k(c),L=J(f);L===!1&&d&&(m?f&&f.removeChild(m):s.insertBefore(c,T)),L||d?v.emit("cancel",c,s,s):v.emit("drop",c,f,s,M),z()}}function z(){var r=m||a;ue(),We(),r&&B.rm(r,"gu-transit"),W&&clearTimeout(W),v.dragging=!1,O&&v.emit("out",r,O,s),v.emit("dragend",r),s=a=m=T=M=W=O=null}function J(r,d){var c;return d!==void 0?c=d:i?c=M:c=P(m||a),r===s&&c===T}function he(r,d,c){for(var f=r;f&&!L();)f=k(f);return f;function L(){var y=q(f);if(y===!1)return!1;var _=ve(f,r),E=me(f,_,d,c),I=J(f,E);return I?!0:u.accepts(a,f,s,E)}}function Q(r){if(!i)return;r.preventDefault();var d=x("clientX",r)||0,c=x("clientY",r)||0,f=d-o,L=c-h;i.style.left=f+"px",i.style.top=L+"px";var y=m||a,_=ke(i,d,c),E=he(_,d,c),I=E!==null&&E!==O;(I||E===null)&&(Ge(),O=E,Ve());var b=k(y);if(E===s&&m&&!u.copySortSource){b&&b.removeChild(y);return}var w,A=ve(E,_);if(A!==null)w=me(E,A,d,c);else if(u.revertOnSpill===!0&&!m)w=T,E=s;else{m&&b&&b.removeChild(y);return}(w===null&&I||w!==y&&w!==P(y))&&(M=w,E.insertBefore(y,w),v.emit("shadow",y,E,s));function D(Ke){v.emit(Ke,y,O,s)}function Ve(){I&&D("over")}function Ge(){O&&D("out")}}function $e(r){B.rm(r,"gu-hide")}function Fe(r){v.dragging&&B.add(r,"gu-hide")}function He(){if(!i){var r=a.getBoundingClientRect();i=a.cloneNode(!0),i.style.width=we(r)+"px",i.style.height=Te(r)+"px",B.rm(i,"gu-transit"),B.add(i,"gu-mirror"),u.mirrorContainer.appendChild(i),j(C,"add","mousemove",Q),B.add(u.mirrorContainer,"gu-unselectable"),v.emit("cloned",i,a,"mirror")}}function We(){i&&(B.rm(u.mirrorContainer,"gu-unselectable"),j(C,"remove","mousemove",Q),k(i).removeChild(i),i=null)}function ve(r,d){for(var c=d;c!==r&&k(c)!==r;)c=k(c);return c===C?null:c}function me(r,d,c,f){var L=u.direction==="horizontal",y=d!==r?E():_();return y;function _(){var b=r.children.length,w,A,D;for(w=0;w<b;w++)if(A=r.children[w],D=A.getBoundingClientRect(),L&&D.left+D.width/2>c||!L&&D.top+D.height/2>f)return A;return null}function E(){var b=d.getBoundingClientRect();return I(L?c>b.left+we(b)/2:f>b.top+Te(b)/2)}function I(b){return b?P(d):d}}function qe(r,d){return typeof u.copy=="boolean"?u.copy:u.copy(r,d)}}function j(t,e,n,i){var s={mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"},a={mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"},o={mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"};S.navigator.pointerEnabled?N[e](t,a[n],i):S.navigator.msPointerEnabled?N[e](t,o[n],i):(N[e](t,s[n],i),N[e](t,n,i))}function Ee(t){if(t.touches!==void 0)return t.touches.length;if(t.which!==void 0&&t.which!==0)return t.which;if(t.buttons!==void 0)return t.buttons;var e=t.button;if(e!==void 0)return e&1?1:e&2?3:e&4?2:0}function _t(t){var e=t.getBoundingClientRect();return{left:e.left+Le("scrollLeft","pageXOffset"),top:e.top+Le("scrollTop","pageYOffset")}}function Le(t,e){return typeof S[e]<"u"?S[e]:C.clientHeight?C[t]:X.body[t]}function ke(t,e,n){t=t||{};var i=t.className||"",s;return t.className+=" gu-hide",s=X.elementFromPoint(e,n),t.className=i,s}function Nt(){return!1}function be(){return!0}function we(t){return t.width||t.right-t.left}function Te(t){return t.height||t.bottom-t.top}function k(t){return t.parentNode===X?null:t.parentNode}function Ce(t){return t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||Me(t)}function Me(t){return!t||t.contentEditable==="false"?!1:t.contentEditable==="true"?!0:Me(k(t))}function P(t){return t.nextElementSibling||e();function e(){var n=t;do n=n.nextSibling;while(n&&n.nodeType!==1);return n}}function Xt(t){return t.targetTouches&&t.targetTouches.length?t.targetTouches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t}function x(t,e){var n=Xt(e),i={pageX:"clientX",pageY:"clientY"};return t in i&&!(t in n)&&i[t]in n&&(t=i[t]),n[t]}var Yt=Mt;const Ut=st(Yt),jt="Delete",Pt="Delete this item",R=t=>{const e=localStorage.getItem("todayColoring")||"#e6ffe6";t.style.outline="2px solid "+e,t.style.outlineOffset="1px",t.style.borderRadius="5px",setTimeout(()=>{t.style.outline="unset",t.style.outlineOffset="unset",t.style.borderRadius="unset"},1100)};class $t{constructor(e,n,i,s,a,o,h,g){this.mondayList=e,this.tuesdayList=n,this.wednesdayList=i,this.thursdayList=s,this.fridayList=a,this.saturdayList=o,this.sundayList=h,this.doneList=g}append(e){const{taskEl:n,deleteButtonEl:i,checkEl:s}=this.render(e);switch(new Date().getDay()){case 0:this.sundayList.append(n),R(this.sundayList);break;case 1:this.mondayList.append(n),R(this.mondayList);break;case 2:this.tuesdayList.append(n),R(this.tuesdayList);break;case 3:this.wednesdayList.append(n),R(this.wednesdayList);break;case 4:this.thursdayList.append(n),R(this.thursdayList);break;case 5:this.fridayList.append(n),R(this.fridayList);break;case 6:this.saturdayList.append(n),R(this.saturdayList);break}return{deleteButtonEl:i,checkEl:s}}remove(e){const n=document.getElementById(e.id);n&&(e.status===l.monday?this.mondayList.removeChild(n):e.status===l.tuesday?this.tuesdayList.removeChild(n):e.status===l.wednesday?this.wednesdayList.removeChild(n):e.status===l.thursday?this.thursdayList.removeChild(n):e.status===l.friday?this.fridayList.removeChild(n):e.status===l.saturday?this.saturdayList.removeChild(n):e.status===l.sunday?this.sundayList.removeChild(n):e.status===l.done&&this.doneList.removeChild(n))}subscribeDragAndDrop(e){Ut([this.mondayList,this.tuesdayList,this.wednesdayList,this.thursdayList,this.fridayList,this.saturdayList,this.sundayList,this.doneList]).on("drop",(n,i,s,a)=>{const o=i.id==="doneList"?l.done:i.id==="mondayList"?l.monday:i.id==="tuesdayList"?l.tuesday:i.id==="wednesdayList"?l.wednesday:i.id==="thursdayList"?l.thursday:i.id==="fridayList"?l.friday:i.id==="saturdayList"?l.saturday:i.id==="sundayList"?l.sunday:l.done;e(n,a,o)})}getId(e){return e.id}renderAll(e){const n=this.renderList(e.filter(l.monday),this.mondayList),i=this.renderList(e.filter(l.tuesday),this.tuesdayList),s=this.renderList(e.filter(l.wednesday),this.wednesdayList),a=this.renderList(e.filter(l.thursday),this.thursdayList),o=this.renderList(e.filter(l.friday),this.fridayList),h=this.renderList(e.filter(l.saturday),this.saturdayList),g=this.renderList(e.filter(l.sunday),this.sundayList),Y=this.renderList(e.filter(l.done),this.doneList);return[...n,...i,...s,...a,...o,...h,...g,...Y]}renderList(e,n){if(e.length===0)return[];const i=[];return e.forEach(s=>{const{taskEl:a,deleteButtonEl:o,checkEl:h}=this.render(s);n.append(a),i.push({task:s,deleteButtonEl:o,checkEl:h})}),i}render(e){const n=document.createElement("div"),i=document.createElement("span"),s=document.createElement("button"),a=document.createElement("input");return a.type="checkbox",a.checked=e.check,n.id=e.id,n.classList.add("task-item"),i.textContent=e.title,n.title=e.title+`
(createdAt: `+e.dateAndTime+")",s.textContent=jt,s.title=Pt,n.append(a,i,s),{taskEl:n,deleteButtonEl:s,checkEl:a}}}const Ft="Clear DONE list";function ie(){const t=document.querySelectorAll('div.lane-item:has(div[data-today="true"])');t&&t.forEach(n=>{n.style.backgroundColor="unset",n.dataset.today="false"});const e=_e();if(e){const n=localStorage.getItem("todayColoring");if(n){e.style.backgroundColor=n,e.dataset.today="true";const i=document.getElementById("todayColoring");for(let s=0;s<i.options.length;s++)if(i.options[s].value===n){i.options[s].selected=!0;break}}}}function Se(){const t=document.querySelector("div.lane-item:has(div#sundayList)");if(t.dataset.begin==="true")return;document.querySelector("div.lane-item:has(div#mondayList)")?.insertAdjacentElement("beforebegin",t),t.dataset.begin="true"}function Ht(){const t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()+1,0,0,0).getTime()-t.getTime();setTimeout(ie,n)}function Wt(){const t=new Date;t.getHours()===0&&t.getMinutes()===0&&ie()}function qt(){document.hidden||Wt()}class Vt{constructor(){this.eventListener=new nt,this.taskCollection=new it,this.taskRenderer=new $t(document.getElementById("mondayList"),document.getElementById("tuesdayList"),document.getElementById("wednesdayList"),document.getElementById("thursdayList"),document.getElementById("fridayList"),document.getElementById("saturdayList"),document.getElementById("sundayList"),document.getElementById("doneList")),this.handleSubmit=e=>{e.preventDefault();const n=document.getElementById("title");if(!n.value)return;const i=new Date().getDay(),s=i===0?l.sunday:i===1?l.monday:i===2?l.tuesday:i===3?l.wednesday:i===4?l.thursday:i===5?l.friday:i===6?l.saturday:l.monday,a=new Intl.DateTimeFormat("default",{month:"short",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric"}).format(new Date),o=new ne({title:n.value,check:!1,status:s,dateAndTime:a});this.taskCollection.add(o);const{deleteButtonEl:h,checkEl:g}=this.taskRenderer.append(o);this.eventListener.add("click",h,()=>this.handleClickDeleteTask(o),o.id),this.eventListener.add("change",g,()=>this.handleClickCheckboxTask(o),o.id),n.value=""},this.executeDeleteTask=e=>{this.eventListener.remove(e.id),this.taskCollection.delete(e),this.taskRenderer.remove(e)},this.handleClickDeleteTask=e=>{this.executeDeleteTask(e)},this.handleClickCheckboxTask=e=>{const n=document.querySelector(`div[id="${e.id}"]>input[type="checkbox"]`).checked;e.update({check:n}),this.taskCollection.update(e),this.taskCollection.checkbox()},this.handleClickDeleteAllDoneTasks=()=>{if(!window.confirm(Ft))return;this.taskCollection.filter(l.done).forEach(n=>this.executeDeleteTask(n))},this.handleDropAndDrop=(e,n,i)=>{const s=this.taskRenderer.getId(e);if(!s)return;const a=this.taskCollection.find(s);if(a)if(a.update({status:i}),this.taskCollection.update(a),n){const o=this.taskRenderer.getId(n);if(!o)return;const h=this.taskCollection.find(o);if(!h)return;this.taskCollection.moveAboveTarget(a,h)}else this.taskCollection.moveToLast(a)}}start(){this.taskRenderer.renderAll(this.taskCollection).forEach(({task:o,deleteButtonEl:h,checkEl:g})=>{this.eventListener.add("click",h,()=>this.handleClickDeleteTask(o),o.id),this.eventListener.add("change",g,()=>this.handleClickCheckboxTask(o),o.id)});const n=document.getElementById("createForm");this.eventListener.add("submit",n,this.handleSubmit);const i=document.getElementById("deleteAllDoneTask");this.eventListener.add("click",i,this.handleClickDeleteAllDoneTasks);const s=document.getElementById("startDayOfWeek");this.eventListener.add("change",s,()=>{if(s.checked)localStorage.setItem("startDayOfWeek","true"),Se();else{localStorage.setItem("startDayOfWeek","false");const o=document.querySelector("div.lane-item:has(div#sundayList)");o.dataset.begin==="true"&&(document.querySelector("div.lane-item:has(div#saturdayList)")?.insertAdjacentElement("afterend",o),o.dataset.begin="false")}});const a=document.getElementById("todayColoring");this.eventListener.add("change",a,()=>{const o=_e();o&&(o.style.backgroundColor=a.value),localStorage.setItem("todayColoring",a.value)}),this.taskRenderer.subscribeDragAndDrop(this.handleDropAndDrop),document.addEventListener("visibilitychange",qt),Ht(),ie(),localStorage.getItem("startDayOfWeek")==="true"&&(s.checked=!0,Se())}}window.addEventListener("load",()=>{new Vt().start()});function _e(){switch(new Date().getDay()){case 0:return document.getElementById("sundayList");case 1:return document.getElementById("mondayList");case 2:return document.getElementById("tuesdayList");case 3:return document.getElementById("wednesdayList");case 4:return document.getElementById("thursdayList");case 5:return document.getElementById("fridayList");case 6:return document.getElementById("saturdayList")}}
