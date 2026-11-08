const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/collectionSheet-Bipr0nOs.js","assets/index-ByDOiLcp.js","assets/index-CkGtPHAo.css","assets/leaderboardService-B07R5FjD.js","assets/plotsClient-cqjolwhV.js","assets/collectionSheet-BbPHFWdv.css"])))=>i.map(i=>d[i]);
var cf=Object.defineProperty;var ff=(i,e,t)=>e in i?cf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var ce=(i,e,t)=>ff(i,typeof e!="symbol"?e+"":e,t);import{A as ur,aO as Bo,aP as uf,aF as Ct,aG as Nn,r as df,o as Ye,c as Ke,a as ye,E as nr,G as pa,l as ts,w as fn,H as Jr,D as gt,y as ri,C as bn,q as Qt,p as jt,T as Fn,k as hf,t as uc,aQ as pf,z as Ui,n as mf,S as _f,aR as oa,aS as gf,aT as vf,aU as xf,aV as yn,aW as Qs,aX as Sf,B as Mf,aY as bf,aZ as yf,aq as Ef,ag as wf,m as Pi,aK as la,a_ as zo,aC as ma,j as Tf,a$ as Af,b0 as Rf,aM as Cf,aN as Pf}from"./index-ByDOiLcp.js";import{g as Qr,a as ns,s as Lf,d as Df,c as If}from"./leaderboardService-B07R5FjD.js";import{f as Uf,n as _a,a as Nf,p as Ff}from"./plotsClient-cqjolwhV.js";const Of={class:"pointer-events-none fixed inset-0 z-20 flex items-start justify-center px-3 py-[1.125rem] sm:px-4 sm:py-6"},kf={class:"flex items-center gap-3 px-3 py-2"},Bf={class:"flex min-w-0 items-baseline gap-2"},zf={"aria-label":"Seasons",class:"flex items-center gap-1"},Gf={key:0,class:"flex min-w-0 items-center gap-1.5 text-sm"},Hf={"aria-hidden":"true"},Vf={class:"truncate font-semibold text-slate-900"},Wf={class:"tabular-nums text-slate-600"},Xf={class:"ml-auto flex items-center gap-1"},Yf=["aria-label","aria-expanded"],qf={key:0,id:"leaderboard-panel",class:"overflow-hidden border-t border-white/50"},$f={class:"px-3 pb-3 pt-2"},Kf={class:"relative"},Zf={class:"max-h-[60vh] overflow-y-auto px-2 pb-2"},Jf={key:0,class:"flex flex-col gap-0.5",role:"status","aria-label":"Fetching scores"},Qf={class:"flex min-w-0 flex-1 flex-col gap-1.5"},jf={key:1,class:"px-2 py-6 text-center text-sm text-slate-600"},eu={key:2,class:"flex flex-col gap-0.5"},tu=["aria-hidden"],nu=["src"],iu={class:"flex min-w-0 flex-col"},ru={class:"truncate text-sm font-semibold text-slate-900"},au={key:0,"aria-hidden":"true",class:"flex items-center gap-2 text-[11px] leading-4 tabular-nums text-slate-500"},su={class:"h-1 w-20 shrink-0 overflow-hidden rounded-full bg-slate-900/10"},ou={class:"ml-auto shrink-0 text-sm tabular-nums text-slate-700"},lu=ur({__name:"leaderboardOverlay",props:Bo({rows:{},loading:{type:Boolean},plotted:{},failed:{type:Boolean}},{expanded:{type:Boolean,default:!0},expandedModifiers:{}}),emits:Bo(["select"],["update:expanded"]),setup(i,{emit:e}){const t=i,n=e,r=uf(i,"expanded"),a=Ct(""),s=_f,o=Nn(()=>t.rows[0]),l=Nn(()=>{const h=a.value.trim().toLowerCase();return h?t.rows.filter(g=>g.playerName.toLowerCase().includes(h)):t.rows});function c(h){var g;return((g=t.plotted)==null?void 0:g.includes(h.playerUuid))??!0}const d=["42%","28%","55%","35%","48%","31%","44%","38%"];function u(h){const g=h.collection?`, ${h.collection.collected.toLocaleString()} of ${h.collection.total.toLocaleString()} items`:"";return`Rank ${h.rank}, ${h.playerName}, ${h.score.toLocaleString()} points${g}`}function f(h){const{collected:g,total:S}=h.collection??{collected:0,total:0};return`${S>0?g/S*100:0}%`}return(h,g)=>{const S=df("RouterLink");return Ye(),Ke("div",Of,[ye("section",{"aria-labelledby":"leaderboard-title",class:ri(["glass pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl",{"glass--centred":r.value}])},[ye("div",kf,[ye("div",Bf,[g[2]||(g[2]=ye("h2",{id:"leaderboard-title",class:"whitespace-nowrap text-sm font-bold text-slate-900"}," Snow Leagues 1 ",-1)),ye("nav",zf,[(Ye(!0),Ke(nr,null,pa(bn(s),m=>(Ye(),ts(S,{key:m.id,to:m.route,"aria-current":m.id==="s1"?"page":void 0,class:ri(["rounded px-1.5 py-0.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",m.id==="s1"?"bg-white/70 text-primary-700 shadow-sm":"text-slate-600 hover:bg-white/50 hover:text-slate-900"])},{default:fn(()=>[Jr(gt(m.shortName),1)]),_:2},1032,["to","aria-current","class"]))),128))])]),Qt(Fn,{name:"fade"},{default:fn(()=>[!r.value&&o.value?(Ye(),Ke("p",Gf,[ye("span",Hf,gt(bn(Qr)(1)),1),ye("span",Vf,gt(o.value.playerName),1),ye("span",Wf,gt(o.value.score.toLocaleString()),1)])):jt("",!0)]),_:1}),ye("div",Xf,[hf(h.$slots,"status",{},void 0,!0),ye("button",{type:"button",class:"rounded-full p-1.5 text-slate-700 transition-colors hover:bg-white/60 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600","aria-label":r.value?"Hide leaderboard":"Show leaderboard","aria-expanded":r.value,"aria-controls":"leaderboard-panel",onClick:g[0]||(g[0]=m=>r.value=!r.value)},[ye("i",{class:ri(r.value?"pi pi-chevron-up":"pi pi-chevron-down"),"aria-hidden":"true"},null,2)],8,Yf)])]),Qt(Fn,{name:"panel"},{default:fn(()=>[r.value?(Ye(),Ke("div",qf,[ye("div",$f,[g[4]||(g[4]=ye("label",{class:"sr-only",for:"leaderboard-search"},"Search player",-1)),ye("div",Kf,[g[3]||(g[3]=ye("i",{class:"pi pi-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500","aria-hidden":"true"},null,-1)),uc(ye("input",{id:"leaderboard-search","onUpdate:modelValue":g[1]||(g[1]=m=>a.value=m),type:"search",placeholder:"Search player",class:"w-full rounded-lg border border-white/60 bg-white/50 py-1.5 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600"},null,512),[[pf,a.value]])])]),ye("div",Zf,[h.loading?(Ye(),Ke("ul",Jf,[(Ye(),Ke(nr,null,pa(d,(m,p)=>ye("li",{key:p,class:"flex items-center gap-3 px-2 py-1.5","aria-hidden":"true"},[g[6]||(g[6]=ye("span",{class:"skeleton h-3 w-6 shrink-0 rounded"},null,-1)),g[7]||(g[7]=ye("span",{class:"skeleton size-5 shrink-0 rounded-sm"},null,-1)),ye("span",Qf,[ye("span",{class:"skeleton h-3 rounded",style:Ui({width:m})},null,4),g[5]||(g[5]=ye("span",{class:"skeleton h-1.5 w-28 rounded"},null,-1))]),g[8]||(g[8]=ye("span",{class:"skeleton ml-auto h-3 w-10 shrink-0 rounded"},null,-1))])),64))])):l.value.length===0?(Ye(),Ke("p",jf,gt(h.rows.length>0?`No player matching “${a.value}”`:h.failed?"Scores could not be reached":"No scores yet"),1)):(Ye(),Ke("ul",eu,[(Ye(!0),Ke(nr,null,pa(l.value,m=>(Ye(),Ke("li",{key:m.playerUuid},[(Ye(),ts(mf(c(m)?"button":"div"),{type:c(m)?"button":void 0,"aria-label":c(m)?u(m):void 0,class:ri(["group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors",c(m)?"hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600":void 0]),onClick:p=>c(m)&&n("select",m)},{default:fn(()=>[ye("span",{"aria-hidden":c(m)?"true":void 0,class:"w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-slate-500"},gt(bn(Qr)(m.rank)??m.rank),9,tu),ye("img",{src:bn(ns)(m.playerUuid),alt:"","aria-hidden":"true",loading:"lazy",class:"size-5 shrink-0 rounded-sm"},null,8,nu),ye("span",iu,[ye("span",ru,gt(m.playerName),1),m.collection?(Ye(),Ke("span",au,[ye("span",su,[ye("span",{class:"block h-full rounded-full bg-primary-500",style:Ui({width:f(m)})},null,4)]),Jr(" "+gt(m.collection.collected.toLocaleString())+" / "+gt(m.collection.total.toLocaleString()),1)])):jt("",!0)]),ye("span",ou,gt(m.score.toLocaleString()),1)]),_:2},1032,["type","aria-label","class","onClick"]))]))),128))]))])])):jt("",!0)]),_:1})],2)])}}}),cu=oa(lu,[["__scopeId","data-v-13ede8c8"]]);function dc(i){return gf()?(vf(i),!0):!1}function js(i){return typeof i=="function"?i():bn(i)}const fu=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const hc=fu?window:void 0;function Go(i){var e;const t=js(i);return(e=t==null?void 0:t.$el)!=null?e:t}function uu(){const i=Ct(!1),e=Sf();return e&&Qs(()=>{i.value=!0},e),i}function pc(i){const e=uu();return Nn(()=>(e.value,!!i()))}function mc(i,e={}){const{window:t=hc}=e,n=pc(()=>t&&"matchMedia"in t&&typeof t.matchMedia=="function");let r;const a=Ct(!1),s=c=>{a.value=c.matches},o=()=>{r&&("removeEventListener"in r?r.removeEventListener("change",s):r.removeListener(s))},l=xf(()=>{n.value&&(o(),r=t.matchMedia(js(i)),"addEventListener"in r?r.addEventListener("change",s):r.addListener(s),a.value=r.matches)});return dc(()=>{l(),o(),r=void 0}),a}function _c(i,e,t={}){const{window:n=hc,...r}=t;let a;const s=pc(()=>n&&"ResizeObserver"in n),o=()=>{a&&(a.disconnect(),a=void 0)},l=Nn(()=>{const u=js(i);return Array.isArray(u)?u.map(f=>Go(f)):[Go(u)]}),c=yn(l,u=>{if(o(),s.value&&n){a=new ResizeObserver(e);for(const f of u)f&&a.observe(f,r)}},{immediate:!0,flush:"post"}),d=()=>{o(),c()};return dc(d),{isSupported:s,stop:d}}function du(i){const e=mc("(prefers-reduced-motion: reduce)",i);return Nn(()=>e.value?"reduce":"no-preference")}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const eo="186",hu=0,Ho=1,pu=2,ir=1,mu=2,er=3,oi=0,en=1,pn=2,Tn=0,rr=1,jr=2,Vo=3,Wo=4,_u=5,Li=100,gu=101,vu=102,xu=103,Su=104,Mu=200,bu=201,yu=202,Eu=203,gc=204,vc=205,wu=206,Tu=207,Au=208,Ru=209,Cu=210,Pu=211,Lu=212,Du=213,Iu=214,is=0,rs=1,as=2,ar=3,ss=4,os=5,ls=6,cs=7,to=0,Uu=1,Nu=2,An=0,no=1,io=2,ro=3,ca=4,ao=5,so=6,oo=7,xc=300,li=301,Oi=302,Hr=303,ga=304,fa=306,ci=1e3,On=1001,fs=1002,wt=1003,Fu=1004,Di=1005,Yt=1006,va=1007,ai=1008,an=1009,Sc=1010,Mc=1011,sr=1012,lo=1013,Rn=1014,En=1015,Zt=1016,co=1017,fo=1018,or=1020,bc=35902,yc=35899,Ec=1021,wc=1022,_n=1023,Bn=1026,si=1027,Tc=1028,uo=1029,fi=1030,ho=1031,po=1033,Vr=33776,Wr=33777,Xr=33778,Yr=33779,us=35840,ds=35841,hs=35842,ps=35843,ms=36196,_s=37492,gs=37496,vs=37488,xs=37489,ea=37490,Ss=37491,Ms=37808,bs=37809,ys=37810,Es=37811,ws=37812,Ts=37813,As=37814,Rs=37815,Cs=37816,Ps=37817,Ls=37818,Ds=37819,Is=37820,Us=37821,Ns=36492,Fs=36494,Os=36495,ks=36283,Bs=36284,ta=36285,zs=36286,Ou=3200,na=0,ku=1,Zn="",kt="srgb",ia="srgb-linear",ra="linear",st="srgb",xa=7680,Bu=519,zu=512,Gu=513,Hu=514,mo=515,Vu=516,Wu=517,_o=518,Xu=519,Yu=35044,Xo="300 es",wn=2e3,lr=2001;function qu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $u(){const i=cr("canvas");return i.style.display="block",i}const Yo={};function qo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ac(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=Ac(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){i=Ac(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ni(...i){const e=i.join(" ");e in Yo||(Yo[e]=!0,Be(...i))}function Ku(i,e,t){return new Promise(function(n,r){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}const Zu={[is]:rs,[as]:ls,[ss]:cs,[ar]:os,[rs]:is,[ls]:as,[cs]:ss,[os]:ar};class ui{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sa=Math.PI/180,Gs=180/Math.PI;function dr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Ju(i,e){return(i%e+e)%e}function Ma(i,e,t){return(1-t)*i+t*e}function qi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Co=class Co{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Co.prototype.isVector2=!0;let ke=Co;class Vi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,o){let l=n[r+0],c=n[r+1],d=n[r+2],u=n[r+3],f=a[s+0],h=a[s+1],g=a[s+2],S=a[s+3];if(u!==S||l!==f||c!==h||d!==g){let m=l*f+c*h+d*g+u*S;m<0&&(f=-f,h=-h,g=-g,S=-S,m=-m);let p=1-o;if(m<.9995){const w=Math.acos(m),R=Math.sin(w);p=Math.sin(p*w)/R,o=Math.sin(o*w)/R,l=l*p+f*o,c=c*p+h*o,d=d*p+g*o,u=u*p+S*o}else{l=l*p+f*o,c=c*p+h*o,d=d*p+g*o,u=u*p+S*o;const w=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=w,c*=w,d*=w,u*=w}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,a,s){const o=n[r],l=n[r+1],c=n[r+2],d=n[r+3],u=a[s],f=a[s+1],h=a[s+2],g=a[s+3];return e[t]=o*g+d*u+l*h-c*f,e[t+1]=l*g+d*f+c*u-o*h,e[t+2]=c*g+d*h+o*f-l*u,e[t+3]=d*g-o*u-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(r/2),u=o(a/2),f=l(n/2),h=l(r/2),g=l(a/2);switch(s){case"XYZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"YXZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"ZXY":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"ZYX":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"YZX":this._x=f*d*u+c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u-f*h*g;break;case"XZY":this._x=f*d*u-c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u+f*h*g;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+o+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(d-l)*h,this._y=(a-c)*h,this._z=(s-r)*h}else if(n>o&&n>u){const h=2*Math.sqrt(1+n-o-u);this._w=(d-l)/h,this._x=.25*h,this._y=(r+s)/h,this._z=(a+c)/h}else if(o>u){const h=2*Math.sqrt(1+o-n-u);this._w=(a-c)/h,this._x=(r+s)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+u-n-o);this._w=(s-r)/h,this._x=(a+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,s=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+s*o+r*c-a*l,this._y=r*d+s*l+a*o-n*c,this._z=a*d+s*c+n*l-r*o,this._w=s*d-n*o-r*l-a*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,a=-a,s=-s,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+a*t,this._w=this._w*l+s*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+a*t,this._w=this._w*l+s*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Po=class Po{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($o.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($o.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*r-o*n),d=2*(o*t-a*r),u=2*(a*n-s*t);return this.x=t+l*c+s*u-o*d,this.y=n+l*d+o*c-a*u,this.z=r+l*u+a*d-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,s=t.x,o=t.y,l=t.z;return this.x=r*l-a*o,this.y=a*s-n*l,this.z=n*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ba.copy(this).projectOnVector(e),this.sub(ba)}reflect(e){return this.sub(ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Po.prototype.isVector3=!0;let F=Po;const ba=new F,$o=new Vi,Lo=class Lo{constructor(e,t,n,r,a,s,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,l,c)}set(e,t,n,r,a,s,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=a,d[5]=l,d[6]=n,d[7]=s,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],h=n[5],g=n[8],S=r[0],m=r[3],p=r[6],w=r[1],R=r[4],M=r[7],b=r[2],y=r[5],A=r[8];return a[0]=s*S+o*w+l*b,a[3]=s*m+o*R+l*y,a[6]=s*p+o*M+l*A,a[1]=c*S+d*w+u*b,a[4]=c*m+d*R+u*y,a[7]=c*p+d*M+u*A,a[2]=f*S+h*w+g*b,a[5]=f*m+h*R+g*y,a[8]=f*p+h*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*s*d-t*o*c-n*a*d+n*o*l+r*a*c-r*s*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*s-o*c,f=o*l-d*a,h=c*a-s*l,g=t*u+n*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=u*S,e[1]=(r*c-d*n)*S,e[2]=(o*n-r*s)*S,e[3]=f*S,e[4]=(d*t-r*l)*S,e[5]=(r*a-o*t)*S,e[6]=h*S,e[7]=(n*l-c*t)*S,e[8]=(s*t-n*a)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*s+c*o)+s+e,-r*c,r*l,-r*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ya.makeScale(e,t)),this}rotate(e){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ya.makeRotation(-e)),this}translate(e,t){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ya.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Lo.prototype.isMatrix3=!0;let He=Lo;const ya=new He,Ko=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zo=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qu(){const i={enabled:!0,workingColorSpace:ia,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===st&&(r.r=kn(r.r),r.g=kn(r.g),r.b=kn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===st&&(r.r=Fi(r.r),r.g=Fi(r.g),r.b=Fi(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zn?ra:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Ni("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Ni("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ia]:{primaries:e,whitePoint:n,transfer:ra,toXYZ:Ko,fromXYZ:Zo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:st,toXYZ:Ko,fromXYZ:Zo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),i}const Je=Qu();function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class ju{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_i===void 0&&(_i=cr("canvas")),_i.width=e.width,_i.height=e.height;const r=_i.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=_i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=kn(a[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(kn(t[n]/255)*255):t[n]=kn(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ed=0;class go{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=dr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(Ea(r[s].image)):a.push(Ea(r[s]))}else a=Ea(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function Ea(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ju.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let td=0;const wa=new F;class Bt extends ui{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=On,r=On,a=Yt,s=ai,o=_n,l=an,c=Bt.DEFAULT_ANISOTROPY,d=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=dr(),this.name="",this.source=new go(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wa).x}get height(){return this.source.getSize(wa).y}get depth(){return this.source.getSize(wa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ci:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case fs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ci:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case fs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=xc;Bt.DEFAULT_ANISOTROPY=1;const Do=class Do{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],h=l[5],g=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,M=(h+1)/2,b=(p+1)/2,y=(d+f)/4,A=(u+S)/4,v=(g+m)/4;return R>M&&R>b?R<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(R),r=y/n,a=A/n):M>b?M<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(M),n=y/r,a=v/r):b<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(b),n=A/a,r=v/a),this.set(n,r,a,t),this}let w=Math.sqrt((m-g)*(m-g)+(u-S)*(u-S)+(f-d)*(f-d));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-S)/w,this.z=(f-d)/w,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Do.prototype.isVector4=!0;let Mt=Do;class nd extends ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},a=new Bt(r),s=n.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new go(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zt extends nd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rc extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class id extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const sa=class sa{constructor(e,t,n,r,a,s,o,l,c,d,u,f,h,g,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,l,c,d,u,f,h,g,S,m)}set(e,t,n,r,a,s,o,l,c,d,u,f,h,g,S,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=a,p[5]=s,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=f,p[3]=h,p[7]=g,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new sa().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/gi.setFromMatrixColumn(e,0).length(),a=1/gi.setFromMatrixColumn(e,1).length(),s=1/gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){const f=s*d,h=s*u,g=o*d,S=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=h+g*c,t[5]=f-S*c,t[9]=-o*l,t[2]=S-f*c,t[6]=g+h*c,t[10]=s*l}else if(e.order==="YXZ"){const f=l*d,h=l*u,g=c*d,S=c*u;t[0]=f+S*o,t[4]=g*o-h,t[8]=s*c,t[1]=s*u,t[5]=s*d,t[9]=-o,t[2]=h*o-g,t[6]=S+f*o,t[10]=s*l}else if(e.order==="ZXY"){const f=l*d,h=l*u,g=c*d,S=c*u;t[0]=f-S*o,t[4]=-s*u,t[8]=g+h*o,t[1]=h+g*o,t[5]=s*d,t[9]=S-f*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const f=s*d,h=s*u,g=o*d,S=o*u;t[0]=l*d,t[4]=g*c-h,t[8]=f*c+S,t[1]=l*u,t[5]=S*c+f,t[9]=h*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const f=s*l,h=s*c,g=o*l,S=o*c;t[0]=l*d,t[4]=S-f*u,t[8]=g*u+h,t[1]=u,t[5]=s*d,t[9]=-o*d,t[2]=-c*d,t[6]=h*u+g,t[10]=f-S*u}else if(e.order==="XZY"){const f=s*l,h=s*c,g=o*l,S=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+S,t[5]=s*d,t[9]=h*u-g,t[2]=g*u-h,t[6]=o*d,t[10]=S*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rd,e,ad)}lookAt(e,t,n){const r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),Wn.crossVectors(n,nn),Wn.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),Wn.crossVectors(n,nn)),Wn.normalize(),_r.crossVectors(nn,Wn),r[0]=Wn.x,r[4]=_r.x,r[8]=nn.x,r[1]=Wn.y,r[5]=_r.y,r[9]=nn.y,r[2]=Wn.z,r[6]=_r.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],h=n[13],g=n[2],S=n[6],m=n[10],p=n[14],w=n[3],R=n[7],M=n[11],b=n[15],y=r[0],A=r[4],v=r[8],T=r[12],P=r[1],U=r[5],O=r[9],z=r[13],I=r[2],G=r[6],Z=r[10],$=r[14],ae=r[3],Y=r[7],ne=r[11],re=r[15];return a[0]=s*y+o*P+l*I+c*ae,a[4]=s*A+o*U+l*G+c*Y,a[8]=s*v+o*O+l*Z+c*ne,a[12]=s*T+o*z+l*$+c*re,a[1]=d*y+u*P+f*I+h*ae,a[5]=d*A+u*U+f*G+h*Y,a[9]=d*v+u*O+f*Z+h*ne,a[13]=d*T+u*z+f*$+h*re,a[2]=g*y+S*P+m*I+p*ae,a[6]=g*A+S*U+m*G+p*Y,a[10]=g*v+S*O+m*Z+p*ne,a[14]=g*T+S*z+m*$+p*re,a[3]=w*y+R*P+M*I+b*ae,a[7]=w*A+R*U+M*G+b*Y,a[11]=w*v+R*O+M*Z+b*ne,a[15]=w*T+R*z+M*$+b*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],h=e[14],g=e[3],S=e[7],m=e[11],p=e[15],w=l*h-c*f,R=o*h-c*u,M=o*f-l*u,b=s*h-c*d,y=s*f-l*d,A=s*u-o*d;return t*(S*w-m*R+p*M)-n*(g*w-m*b+p*y)+r*(g*R-S*b+p*A)-a*(g*M-S*y+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[1],s=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(s*d-o*c)-n*(a*d-o*l)+r*(a*c-s*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],h=e[11],g=e[12],S=e[13],m=e[14],p=e[15],w=t*o-n*s,R=t*l-r*s,M=t*c-a*s,b=n*l-r*o,y=n*c-a*o,A=r*c-a*l,v=d*S-u*g,T=d*m-f*g,P=d*p-h*g,U=u*m-f*S,O=u*p-h*S,z=f*p-h*m,I=w*z-R*O+M*U+b*P-y*T+A*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/I;return e[0]=(o*z-l*O+c*U)*G,e[1]=(r*O-n*z-a*U)*G,e[2]=(S*A-m*y+p*b)*G,e[3]=(f*y-u*A-h*b)*G,e[4]=(l*P-s*z-c*T)*G,e[5]=(t*z-r*P+a*T)*G,e[6]=(m*M-g*A-p*R)*G,e[7]=(d*A-f*M+h*R)*G,e[8]=(s*O-o*P+c*v)*G,e[9]=(n*P-t*O-a*v)*G,e[10]=(g*y-S*M+p*w)*G,e[11]=(u*M-d*y-h*w)*G,e[12]=(o*T-s*U-l*v)*G,e[13]=(t*U-n*T+r*v)*G,e[14]=(S*R-g*b-m*w)*G,e[15]=(d*b-u*R+f*w)*G,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,o=e.y,l=e.z,c=a*s,d=a*o;return this.set(c*s+n,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+n,d*l-r*s,0,c*l-r*o,d*l+r*s,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,s=t._y,o=t._z,l=t._w,c=a+a,d=s+s,u=o+o,f=a*c,h=a*d,g=a*u,S=s*d,m=s*u,p=o*u,w=l*c,R=l*d,M=l*u,b=n.x,y=n.y,A=n.z;return r[0]=(1-(S+p))*b,r[1]=(h+M)*b,r[2]=(g-R)*b,r[3]=0,r[4]=(h-M)*y,r[5]=(1-(f+p))*y,r[6]=(m+w)*y,r[7]=0,r[8]=(g+R)*A,r[9]=(m-w)*A,r[10]=(1-(f+S))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return n.set(1,1,1),t.identity(),this;let s=gi.set(r[0],r[1],r[2]).length();const o=gi.set(r[4],r[5],r[6]).length(),l=gi.set(r[8],r[9],r[10]).length();a<0&&(s=-s),un.copy(this);const c=1/s,d=1/o,u=1/l;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=d,un.elements[5]*=d,un.elements[6]*=d,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,t.setFromRotationMatrix(un),n.x=s,n.y=o,n.z=l,this}makePerspective(e,t,n,r,a,s,o=wn,l=!1){const c=this.elements,d=2*a/(t-e),u=2*a/(n-r),f=(t+e)/(t-e),h=(n+r)/(n-r);let g,S;if(l)g=a/(s-a),S=s*a/(s-a);else if(o===wn)g=-(s+a)/(s-a),S=-2*s*a/(s-a);else if(o===lr)g=-s/(s-a),S=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,a,s,o=wn,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-r),f=-(t+e)/(t-e),h=-(n+r)/(n-r);let g,S;if(l)g=1/(s-a),S=s/(s-a);else if(o===wn)g=-2/(s-a),S=-(s+a)/(s-a);else if(o===lr)g=-1/(s-a),S=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};sa.prototype.isMatrix4=!0;let vt=sa;const gi=new F,un=new vt,rd=new F(0,0,0),ad=new F(1,1,1),Wn=new F,_r=new F,nn=new F,Jo=new vt,Qo=new Vi;class zn{constructor(e=0,t=0,n=0,r=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-je(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,h),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qo.setFromEuler(this),this.setFromQuaternion(Qo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class vo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sd=0;const jo=new F,vi=new Vi,Cn=new vt,gr=new F,$i=new F,od=new F,ld=new Vi,el=new F(1,0,0),tl=new F(0,1,0),nl=new F(0,0,1),il={type:"added"},cd={type:"removed"},xi={type:"childadded",child:null},Ta={type:"childremoved",child:null};class Gt extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=dr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new F,t=new zn,n=new Vi,r=new F(1,1,1);function a(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new He}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.multiply(vi),this}rotateOnWorldAxis(e,t){return vi.setFromAxisAngle(e,t),this.quaternion.premultiply(vi),this}rotateX(e){return this.rotateOnAxis(el,e)}rotateY(e){return this.rotateOnAxis(tl,e)}rotateZ(e){return this.rotateOnAxis(nl,e)}translateOnAxis(e,t){return jo.copy(e).applyQuaternion(this.quaternion),this.position.add(jo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(el,e)}translateY(e){return this.translateOnAxis(tl,e)}translateZ(e){return this.translateOnAxis(nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gr.copy(e):gr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt($i,gr,this.up):Cn.lookAt(gr,$i,this.up),this.quaternion.setFromRotationMatrix(Cn),r&&(Cn.extractRotation(r.matrixWorld),vi.setFromRotationMatrix(Cn),this.quaternion.premultiply(vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(il),xi.child=e,this.dispatchEvent(xi),xi.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cd),Ta.child=e,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(il),xi.child=e,this.dispatchEvent(xi),xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,e,od),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,ld,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*n-a[8]*r,a[13]+=n-a[1]*t-a[5]*n-a[9]*r,a[14]+=r-a[2]*t-a[6]*n-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];a(e.shapes,u)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(a(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),d=s(e.images),u=s(e.shapes),f=s(e.skeletons),h=s(e.animations),g=s(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=r,n;function s(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Gt.DEFAULT_UP=new F(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jn extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fd={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,n),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Cc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},vr={h:0,s:0,l:0};function Ra(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ve{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=Ju(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=Ra(s,a,e+1/3),this.g=Ra(s,a,e),this.b=Ra(s,a,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=kt){function n(a){a!==void 0&&parseFloat(a)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const n=Cc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return Je.workingToColorSpace(Wt.copy(this),e),Math.round(je(Wt.r*255,0,255))*65536+Math.round(je(Wt.g*255,0,255))*256+Math.round(je(Wt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Wt.copy(this),t);const n=Wt.r,r=Wt.g,a=Wt.b,s=Math.max(n,r,a),o=Math.min(n,r,a);let l,c;const d=(o+s)/2;if(o===s)l=0,c=0;else{const u=s-o;switch(c=d<=.5?u/(s+o):u/(2-s-o),s){case n:l=(r-a)/u+(r<a?6:0);break;case r:l=(a-n)/u+2;break;case a:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=kt){Je.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,r=Wt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Xn),this.setHSL(Xn.h+e,Xn.s+t,Xn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xn),e.getHSL(vr);const n=Ma(Xn.h,vr.h,t),r=Ma(Xn.s,vr.s,t),a=Ma(Xn.l,vr.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ve;Ve.NAMES=Cc;class qr extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const dn=new F,Pn=new F,Ca=new F,Ln=new F,Si=new F,Mi=new F,rl=new F,Pa=new F,La=new F,Da=new F,Ia=new Mt,Ua=new Mt,Na=new Mt;class mn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),dn.subVectors(e,t),r.cross(dn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){dn.subVectors(r,t),Pn.subVectors(n,t),Ca.subVectors(e,t);const s=dn.dot(dn),o=dn.dot(Pn),l=dn.dot(Ca),c=Pn.dot(Pn),d=Pn.dot(Ca),u=s*c-o*o;if(u===0)return a.set(0,0,0),null;const f=1/u,h=(c*l-o*d)*f,g=(s*d-o*l)*f;return a.set(1-h-g,g,h)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,n,r,a,s,o,l){return this.getBarycoord(e,t,n,r,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Ln.x),l.addScaledVector(s,Ln.y),l.addScaledVector(o,Ln.z),l)}static getInterpolatedAttribute(e,t,n,r,a,s){return Ia.setScalar(0),Ua.setScalar(0),Na.setScalar(0),Ia.fromBufferAttribute(e,t),Ua.fromBufferAttribute(e,n),Na.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Ia,a.x),s.addScaledVector(Ua,a.y),s.addScaledVector(Na,a.z),s}static isFrontFacing(e,t,n,r){return dn.subVectors(n,t),Pn.subVectors(e,t),dn.cross(Pn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),dn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let s,o;Si.subVectors(r,n),Mi.subVectors(a,n),Pa.subVectors(e,n);const l=Si.dot(Pa),c=Mi.dot(Pa);if(l<=0&&c<=0)return t.copy(n);La.subVectors(e,r);const d=Si.dot(La),u=Mi.dot(La);if(d>=0&&u<=d)return t.copy(r);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return s=l/(l-d),t.copy(n).addScaledVector(Si,s);Da.subVectors(e,a);const h=Si.dot(Da),g=Mi.dot(Da);if(g>=0&&h<=g)return t.copy(a);const S=h*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Mi,o);const m=d*g-h*u;if(m<=0&&u-d>=0&&h-g>=0)return rl.subVectors(a,r),o=(u-d)/(u-d+(h-g)),t.copy(r).addScaledVector(rl,o);const p=1/(m+S+f);return s=S*p,o=f*p,t.copy(n).addScaledVector(Si,s).addScaledVector(Mi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hr{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,hn):hn.fromBufferAttribute(a,s),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xr.copy(n.boundingBox)),xr.applyMatrix4(e.matrixWorld),this.union(xr)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ki),Sr.subVectors(this.max,Ki),bi.subVectors(e.a,Ki),yi.subVectors(e.b,Ki),Ei.subVectors(e.c,Ki),Yn.subVectors(yi,bi),qn.subVectors(Ei,yi),jn.subVectors(bi,Ei);let t=[0,-Yn.z,Yn.y,0,-qn.z,qn.y,0,-jn.z,jn.y,Yn.z,0,-Yn.x,qn.z,0,-qn.x,jn.z,0,-jn.x,-Yn.y,Yn.x,0,-qn.y,qn.x,0,-jn.y,jn.x,0];return!Fa(t,bi,yi,Ei,Sr)||(t=[1,0,0,0,1,0,0,0,1],!Fa(t,bi,yi,Ei,Sr))?!1:(Mr.crossVectors(Yn,qn),t=[Mr.x,Mr.y,Mr.z],Fa(t,bi,yi,Ei,Sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Dn=[new F,new F,new F,new F,new F,new F,new F,new F],hn=new F,xr=new hr,bi=new F,yi=new F,Ei=new F,Yn=new F,qn=new F,jn=new F,Ki=new F,Sr=new F,Mr=new F,ei=new F;function Fa(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){ei.fromArray(i,a);const o=r.x*Math.abs(ei.x)+r.y*Math.abs(ei.y)+r.z*Math.abs(ei.z),l=e.dot(ei),c=t.dot(ei),d=n.dot(ei);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Rt=new F,br=new ke;let ud=0;class Xt extends ui{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ud++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yu,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),r=Jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),r=Jt(r,this.array),a=Jt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Pc extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lc extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class yt extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const dd=new hr,Zi=new F,Oa=new F;class xo{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):dd.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zi.subVectors(e,this.center);const t=Zi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Zi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zi.copy(e.center).add(Oa)),this.expandByPoint(Zi.copy(e.center).sub(Oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hd=0;const on=new vt,ka=new Gt,wi=new F,rn=new hr,Ji=new hr,Ut=new F;class Nt extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=dr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qu(e)?Lc:Pc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new He().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return ka.lookAt(e),ka.updateMatrix(),this.applyMatrix4(ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new yt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];rn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Ji.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(rn.min,Ji.min),rn.expandByPoint(Ut),Ut.addVectors(rn.max,Ji.max),rn.expandByPoint(Ut)):(rn.expandByPoint(Ji.min),rn.expandByPoint(Ji.max))}rn.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)Ut.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(Ut));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Ut.fromBufferAttribute(o,c),l&&(wi.fromBufferAttribute(e,c),Ut.add(wi)),r=Math.max(r,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");(s===void 0||s.count!==n.count)&&(s=new Xt(new Float32Array(4*n.count),4),this.setAttribute("tangent",s));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new F,l[v]=new F;const c=new F,d=new F,u=new F,f=new ke,h=new ke,g=new ke,S=new F,m=new F;function p(v,T,P){c.fromBufferAttribute(n,v),d.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),f.fromBufferAttribute(a,v),h.fromBufferAttribute(a,T),g.fromBufferAttribute(a,P),d.sub(c),u.sub(c),h.sub(f),g.sub(f);const U=1/(h.x*g.y-g.x*h.y);isFinite(U)&&(S.copy(d).multiplyScalar(g.y).addScaledVector(u,-h.y).multiplyScalar(U),m.copy(u).multiplyScalar(h.x).addScaledVector(d,-g.x).multiplyScalar(U),o[v].add(S),o[T].add(S),o[P].add(S),l[v].add(m),l[T].add(m),l[P].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let v=0,T=w.length;v<T;++v){const P=w[v],U=P.start,O=P.count;for(let z=U,I=U+O;z<I;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const R=new F,M=new F,b=new F,y=new F;function A(v){b.fromBufferAttribute(r,v),y.copy(b);const T=o[v];R.copy(T),R.sub(b.multiplyScalar(b.dot(T))).normalize(),M.crossVectors(y,T);const U=M.dot(l[v])<0?-1:1;s.setXYZW(v,R.x,R.y,R.z,U)}for(let v=0,T=w.length;v<T;++v){const P=w[v],U=P.start,O=P.count;for(let z=U,I=U+O;z<I;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const r=new F,a=new F,s=new F,o=new F,l=new F,c=new F,d=new F,u=new F;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),S=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,S),s.fromBufferAttribute(t,m),d.subVectors(s,a),u.subVectors(r,a),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),d.subVectors(s,a),u.subVectors(r,a),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let h=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?h=l[S]*o.data.stride+o.offset:h=l[S]*d;for(let p=0;p<d;p++)f[g++]=c[h++]}return new Xt(f,d,u)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],h=e(f,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const h=c[u];d.push(h.toJSON(e.data))}d.length>0&&(r[l]=d,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const a=e.morphAttributes;for(const c in a){const d=[],u=a[c];for(let f=0,h=u.length;f<h;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,d=s.length;c<d;c++){const u=s[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ba=new F,pd=new F,md=new He;class Un{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ba.subVectors(n,t).cross(pd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Ba),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return n===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||md.getNormalMatrix(e),r=this.coplanarPoint(Ba).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let _d=0;class Wi extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=dr(),this.name="",this.type="Material",this.blending=rr,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gc,this.blendDst=vc,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xa,this.stencilZFail=xa,this.stencilZPass=xa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const s=[];for(const o in a){const l=a[o];delete l.metadata,s.push(l)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Un().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ke().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const In=new F,za=new F,yr=new F,Er=new F;class So{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){za.copy(e).add(t).multiplyScalar(.5),yr.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(za);const a=e.distanceTo(t)*.5,s=-this.direction.dot(yr),o=Er.dot(this.direction),l=-Er.dot(yr),c=Er.lengthSq(),d=Math.abs(1-s*s);let u,f,h,g;if(d>0)if(u=s*l-o,f=s*o-l,g=a*d,u>=0)if(f>=-g)if(f<=g){const S=1/d;u*=S,f*=S,h=u*(u+s*f+2*o)+f*(s*u+f+2*l)+c}else f=a,u=Math.max(0,-(s*f+o)),h=-u*u+f*(f+2*l)+c;else f=-a,u=Math.max(0,-(s*f+o)),h=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-s*a+o)),f=u>0?-a:Math.min(Math.max(-a,-l),a),h=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-a,-l),a),h=f*(f+2*l)+c):(u=Math.max(0,-(s*a+o)),f=u>0?a:Math.min(Math.max(-a,-l),a),h=-u*u+f*(f+2*l)+c);else f=s>0?-a:a,u=Math.max(0,-(s*f+o)),h=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(za).addScaledVector(yr,f),h}intersectSphere(e,t){if(e.radius<0)return null;In.subVectors(e.center,this.origin);const n=In.dot(this.direction),r=In.dot(In)-n*n,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(a=(e.min.y-f.y)*d,s=(e.max.y-f.y)*d):(a=(e.max.y-f.y)*d,s=(e.min.y-f.y)*d),n>s||a>r||((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,n,r,a){const s=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,u=e.x-s.x,f=e.y-s.y,h=e.z-s.z,g=t.x-s.x,S=t.y-s.y,m=t.z-s.z,p=n.x-s.x,w=n.y-s.y,R=n.z-s.z,M=Math.abs(l),b=Math.abs(c),y=Math.abs(d);let A,v,T,P,U,O,z,I,G,Z,$,ae;if(M>=b&&M>=y?(T=l,O=u,G=g,ae=p,l>=0?(A=c,v=d,P=f,U=h,z=S,I=m,Z=w,$=R):(A=d,v=c,P=h,U=f,z=m,I=S,Z=R,$=w)):b>=y?(T=c,O=f,G=S,ae=w,c>=0?(A=d,v=l,P=h,U=u,z=m,I=g,Z=R,$=p):(A=l,v=d,P=u,U=h,z=g,I=m,Z=p,$=R)):(T=d,O=h,G=m,ae=R,d>=0?(A=l,v=c,P=u,U=f,z=g,I=S,Z=p,$=w):(A=c,v=l,P=f,U=u,z=S,I=g,Z=w,$=p)),T===0)return null;const Y=A/T,ne=v/T,re=1/T,Te=P-Y*O,Ae=U-ne*O,et=z-Y*G,J=I-ne*G,ee=Z-Y*ae,H=$-ne*ae,q=ee*J-H*et,oe=Te*H-Ae*ee,Oe=et*Ae-J*Te;if(r){if(q<0||oe<0||Oe<0)return null}else if((q<0||oe<0||Oe<0)&&(q>0||oe>0||Oe>0))return null;const Se=q+oe+Oe;if(Se===0)return null;const ze=re*(q*O+oe*G+Oe*ae);return(Se>0?ze<0:ze>0)?null:this.at(ze/Se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mo extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=to,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const al=new vt,ti=new So,wr=new xo,sl=new F,Tr=new F,Ar=new F,Rr=new F,Ga=new F,Cr=new F,ol=new F,Pr=new F;class Pt extends Gt{constructor(e=new Nt,t=new Mo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){Cr.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=o[l],u=a[l];d!==0&&(Ga.fromBufferAttribute(u,e),s?Cr.addScaledVector(Ga,d):Cr.addScaledVector(Ga.sub(t),d))}t.add(Cr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(a),ti.copy(e.ray).recast(e.near),!(wr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(wr,sl)===null||ti.origin.distanceToSquared(sl)>(e.far-e.near)**2))&&(al.copy(a).invert(),ti.copy(e.ray).applyMatrix4(al),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let r;const a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,u=a.attributes.normal,f=a.groups,h=a.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,S=f.length;g<S;g++){const m=f[g],p=s[m.materialIndex],w=Math.max(m.start,h.start),R=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let M=w,b=R;M<b;M+=3){const y=o.getX(M),A=o.getX(M+1),v=o.getX(M+2);r=Lr(this,p,e,n,c,d,u,y,A,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,h.start),S=Math.min(o.count,h.start+h.count);for(let m=g,p=S;m<p;m+=3){const w=o.getX(m),R=o.getX(m+1),M=o.getX(m+2);r=Lr(this,s,e,n,c,d,u,w,R,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,S=f.length;g<S;g++){const m=f[g],p=s[m.materialIndex],w=Math.max(m.start,h.start),R=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let M=w,b=R;M<b;M+=3){const y=M,A=M+1,v=M+2;r=Lr(this,p,e,n,c,d,u,y,A,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,h.start),S=Math.min(l.count,h.start+h.count);for(let m=g,p=S;m<p;m+=3){const w=m,R=m+1,M=m+2;r=Lr(this,s,e,n,c,d,u,w,R,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function gd(i,e,t,n,r,a,s,o){let l;if(e.side===en?l=n.intersectTriangle(s,a,r,!0,o):l=n.intersectTriangle(r,a,s,e.side===oi,o),l===null)return null;Pr.copy(o),Pr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Pr);return c<t.near||c>t.far?null:{distance:c,point:Pr.clone(),object:i}}function Lr(i,e,t,n,r,a,s,o,l,c){i.getVertexPosition(o,Tr),i.getVertexPosition(l,Ar),i.getVertexPosition(c,Rr);const d=gd(i,e,t,n,Tr,Ar,Rr,ol);if(d){const u=new F;mn.getBarycoord(ol,Tr,Ar,Rr,u),r&&(d.uv=mn.getInterpolatedAttribute(r,o,l,c,u,new ke)),a&&(d.uv1=mn.getInterpolatedAttribute(a,o,l,c,u,new ke)),s&&(d.normal=mn.getInterpolatedAttribute(s,o,l,c,u,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new F,materialIndex:0};mn.getNormal(Tr,Ar,Rr,f.normal),d.face=f,d.barycoord=u}return d}class vd extends Bt{constructor(e=null,t=1,n=1,r,a,s,o,l,c=wt,d=wt,u,f){super(null,s,o,l,c,d,r,a,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ni=new xo,xd=new ke(.5,.5),Dr=new F;class bo{constructor(e=new Un,t=new Un,n=new Un,r=new Un,a=new Un,s=new Un){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn,n=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],l=a[2],c=a[3],d=a[4],u=a[5],f=a[6],h=a[7],g=a[8],S=a[9],m=a[10],p=a[11],w=a[12],R=a[13],M=a[14],b=a[15];if(r[0].setComponents(c-s,h-d,p-g,b-w).normalize(),r[1].setComponents(c+s,h+d,p+g,b+w).normalize(),r[2].setComponents(c+o,h+u,p+S,b+R).normalize(),r[3].setComponents(c-o,h-u,p-S,b-R).normalize(),n)r[4].setComponents(l,f,m,M).normalize(),r[5].setComponents(c-l,h-f,p-m,b-M).normalize();else if(r[4].setComponents(c-l,h-f,p-m,b-M).normalize(),t===wn)r[5].setComponents(c+l,h+f,p+m,b+M).normalize();else if(t===lr)r[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){ni.center.set(0,0,0);const t=xd.distanceTo(e.center);return ni.radius=.7071067811865476+t,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Dr.x=r.normal.x>0?e.max.x:e.min.x,Dr.y=r.normal.y>0?e.max.y:e.min.y,Dr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dc extends Bt{constructor(e=[],t=li,n,r,a,s,o,l,c,d){super(e,t,n,r,a,s,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ua extends Bt{constructor(e,t,n,r,a,s,o,l,c){super(e,t,n,r,a,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ki extends Bt{constructor(e,t,n=Rn,r,a,s,o=wt,l=wt,c,d=Bn,u=1){if(d!==Bn&&d!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,r,a,s,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new go(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Sd extends ki{constructor(e,t=Rn,n=li,r,a,s=wt,o=wt,l,c=Bn){const d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,n,r,a,s,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ic extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Xi extends Nt{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const l=[],c=[],d=[],u=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,s,a,0),g("z","y","x",1,-1,n,t,-e,s,a,1),g("x","z","y",1,1,e,n,t,r,s,2),g("x","z","y",1,-1,e,n,-t,r,s,3),g("x","y","z",1,-1,e,t,n,r,a,4),g("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(d,3)),this.setAttribute("uv",new yt(u,2));function g(S,m,p,w,R,M,b,y,A,v,T){const P=M/A,U=b/v,O=M/2,z=b/2,I=y/2,G=A+1,Z=v+1;let $=0,ae=0;const Y=new F;for(let ne=0;ne<Z;ne++){const re=ne*U-z;for(let Te=0;Te<G;Te++){const Ae=Te*P-O;Y[S]=Ae*w,Y[m]=re*R,Y[p]=I,c.push(Y.x,Y.y,Y.z),Y[S]=0,Y[m]=0,Y[p]=y>0?1:-1,d.push(Y.x,Y.y,Y.z),u.push(Te/A),u.push(1-ne/v),$+=1}}for(let ne=0;ne<v;ne++)for(let re=0;re<A;re++){const Te=f+re+G*ne,Ae=f+re+G*(ne+1),et=f+(re+1)+G*(ne+1),J=f+(re+1)+G*ne;l.push(Te,Ae,J),l.push(Ae,et,J),ae+=6}o.addGroup(h,ae,T),h+=ae,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Bi extends Nt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,d=l+1,u=e/o,f=t/l,h=[],g=[],S=[],m=[];for(let p=0;p<d;p++){const w=p*f-s;for(let R=0;R<c;R++){const M=R*u-a;g.push(M,-w,0),S.push(0,0,1),m.push(R/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const R=w+c*p,M=w+c*(p+1),b=w+1+c*(p+1),y=w+1+c*p;h.push(R,M,y),h.push(M,b,y)}this.setIndex(h),this.setAttribute("position",new yt(g,3)),this.setAttribute("normal",new yt(S,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.width,e.height,e.widthSegments,e.heightSegments)}}function zi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(ll(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(ll(r[0])){const a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][n]=a}else e[t][n]=r.slice();else e[t][n]=r}}return e}function $t(i){const e={};for(let t=0;t<i.length;t++){const n=zi(i[t]);for(const r in n)e[r]=n[r]}return e}function ll(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Md(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Uc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const fr={clone:zi,merge:$t};var bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Lt extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bd,this.fragmentShader=yd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=Md(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Ve().setHex(r.value);break;case"v2":this.uniforms[n].value=new ke().fromArray(r.value);break;case"v3":this.uniforms[n].value=new F().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Mt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new He().fromArray(r.value);break;case"m4":this.uniforms[n].value=new vt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Nc extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ir extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hs extends Wi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=to,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fc extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ed extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ha={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(cl(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!cl(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function cl(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class wd{constructor(e,t,n){const r=this;let a=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,a===!1&&r.onStart!==void 0&&r.onStart(d,s,o),a=!0},this.itemEnd=function(d){s++,r.onProgress!==void 0&&r.onProgress(d,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,f=c.length;u<f;u+=2){const h=c[u],g=c[u+1];if(h.global&&(h.lastIndex=0),h.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Td=new wd;class yo{constructor(e){this.manager=e!==void 0?e:Td,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,a){n.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}yo.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ti=new WeakMap;class Ad extends yo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,s=Ha.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0);else{let u=Ti.get(s);u===void 0&&(u=[],Ti.set(s,u)),u.push({onLoad:t,onError:r})}return s}const o=cr("img");function l(){d(),t&&t(this);const u=Ti.get(this)||[];for(let f=0;f<u.length;f++){const h=u[f];h.onLoad&&h.onLoad(this)}Ti.delete(this),a.manager.itemEnd(e)}function c(u){d(),r&&r(u),Ha.remove(`image:${e}`);const f=Ti.get(this)||[];for(let h=0;h<f.length;h++){const g=f[h];g.onError&&g.onError(u)}Ti.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ha.add(`image:${e}`,o),a.manager.itemStart(e),o.src=e,o}}class Rd extends yo{constructor(e){super(e)}load(e,t,n,r){const a=new Bt,s=new Ad(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},n,r),a}}class Eo extends Gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Cd extends Eo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Va=new vt,fl=new F,ul=new F;class Pd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bo,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;fl.setFromMatrixPosition(e.matrixWorld),t.position.copy(fl),ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ul),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Va,e.coordinateSystem,e.reversedDepth);const a=this._frameExtents,s=r?r.z/a.x:1,o=r?r.w/a.y:1,l=r?r.x/a.x:0,c=r?r.y/a.y:0;e.coordinateSystem===lr||e.reversedDepth?t.set(.5*s,0,0,.5*s+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*s,0,0,.5*s+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ur=new F,Nr=new Vi,xn=new F;class Oc extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ur,Nr,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ur,Nr,xn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ur,Nr,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ur,Nr,xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $n=new F,dl=new ke,hl=new ke;class ln extends Oc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(Sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($n.x,$n.y).multiplyScalar(-e/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-e/$n.z)}getViewSize(e,t){return this.getViewBounds(e,dl,hl),t.subVectors(hl,dl)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*r/l,t-=s.offsetY*n/c,r*=s.width/l,n*=s.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Gi extends Oc{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,s=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ld extends Pd{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kc extends Eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new Ld}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Dd extends Eo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ai=-90,Ri=1;class Id extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ln(Ai,Ri,e,t);r.layers=this.layers,this.add(r);const a=new ln(Ai,Ri,e,t);a.layers=this.layers,this.add(a);const s=new ln(Ai,Ri,e,t);s.layers=this.layers,this.add(s);const o=new ln(Ai,Ri,e,t);o.layers=this.layers,this.add(o);const l=new ln(Ai,Ri,e,t);l.layers=this.layers,this.add(l);const c=new ln(Ai,Ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,o,l]=t;for(const c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ud extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const pl=new vt;class Nd{constructor(e,t,n=0,r=1/0){this.ray=new So(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):it("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pl),this}intersectObject(e,t=!0,n=[]){return Vs(e,this,n,t),n.sort(ml),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)Vs(e[r],this,n,t);return n.sort(ml),n}}function ml(i,e){return i.distance-e.distance}function Vs(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let s=0,o=a.length;s<o;s++)Vs(a[s],e,t,!0)}}const Io=class Io{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=n,a[3]=r,this}};Io.prototype.isMatrix2=!0;let _l=Io;function gl(i,e,t,n){const r=Fd(n);switch(t){case Ec:return i*e;case Tc:return i*e/r.components*r.byteLength;case uo:return i*e/r.components*r.byteLength;case fi:return i*e*2/r.components*r.byteLength;case ho:return i*e*2/r.components*r.byteLength;case wc:return i*e*3/r.components*r.byteLength;case _n:return i*e*4/r.components*r.byteLength;case po:return i*e*4/r.components*r.byteLength;case Vr:case Wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ds:case ps:return Math.max(i,16)*Math.max(e,8)/4;case us:case hs:return Math.max(i,8)*Math.max(e,8)/2;case ms:case _s:case vs:case xs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case gs:case ea:case Ss:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ms:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bs:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ys:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Es:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ws:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ts:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case As:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Rs:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Cs:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ps:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ls:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ds:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Is:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Us:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ns:case Fs:case Os:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ks:case Bs:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ta:case zs:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fd(i){switch(i){case an:case Sc:return{byteLength:1,components:1};case sr:case Mc:case Zt:return{byteLength:2,components:1};case co:case fo:return{byteLength:2,components:4};case Rn:case lo:case En:return{byteLength:4,components:1};case bc:case yc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:eo}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=eo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bc(){let i=null,e=!1,t=null,n=null;function r(a,s){n=i.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Od(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,d),o.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<u.length;h++){const g=u[f],S=u[h];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++f,u[f]=S)}u.length=f+1;for(let h=0,g=u.length;h<g;h++){const S=u[h];i.bufferSubData(c,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:a,update:s}}var kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$d=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,eh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,th=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ih=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ah=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,oh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ch=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,fh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ph="gl_FragColor = linearToOutputTexel( gl_FragColor );",mh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_h=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Eh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Th=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ah=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ch=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ph=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Lh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ih=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Fh=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Oh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zh=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Gh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$h=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ep=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,op=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ap=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ip=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Op=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,im=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,am=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,um=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_m=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:kd,alphahash_pars_fragment:Bd,alphamap_fragment:zd,alphamap_pars_fragment:Gd,alphatest_fragment:Hd,alphatest_pars_fragment:Vd,aomap_fragment:Wd,aomap_pars_fragment:Xd,batching_pars_vertex:Yd,batching_vertex:qd,begin_vertex:$d,beginnormal_vertex:Kd,bsdfs:Zd,iridescence_fragment:Jd,bumpmap_pars_fragment:Qd,clipping_planes_fragment:jd,clipping_planes_pars_fragment:eh,clipping_planes_pars_vertex:th,clipping_planes_vertex:nh,color_fragment:ih,color_pars_fragment:rh,color_pars_vertex:ah,color_vertex:sh,common:oh,cube_uv_reflection_fragment:lh,defaultnormal_vertex:ch,displacementmap_pars_vertex:fh,displacementmap_vertex:uh,emissivemap_fragment:dh,emissivemap_pars_fragment:hh,colorspace_fragment:ph,colorspace_pars_fragment:mh,envmap_fragment:_h,envmap_common_pars_fragment:gh,envmap_pars_fragment:vh,envmap_pars_vertex:xh,envmap_physical_pars_fragment:Ph,envmap_vertex:Sh,fog_vertex:Mh,fog_pars_vertex:bh,fog_fragment:yh,fog_pars_fragment:Eh,gradientmap_pars_fragment:wh,lightmap_pars_fragment:Th,lights_lambert_fragment:Ah,lights_lambert_pars_fragment:Rh,lights_pars_begin:Ch,lights_toon_fragment:Lh,lights_toon_pars_fragment:Dh,lights_phong_fragment:Ih,lights_phong_pars_fragment:Uh,lights_physical_fragment:Nh,lights_physical_pars_fragment:Fh,lights_fragment_begin:Oh,lights_fragment_maps:kh,lights_fragment_end:Bh,lightprobes_pars_fragment:zh,logdepthbuf_fragment:Gh,logdepthbuf_pars_fragment:Hh,logdepthbuf_pars_vertex:Vh,logdepthbuf_vertex:Wh,map_fragment:Xh,map_pars_fragment:Yh,map_particle_fragment:qh,map_particle_pars_fragment:$h,metalnessmap_fragment:Kh,metalnessmap_pars_fragment:Zh,morphinstance_vertex:Jh,morphcolor_vertex:Qh,morphnormal_vertex:jh,morphtarget_pars_vertex:ep,morphtarget_vertex:tp,normal_fragment_begin:np,normal_fragment_maps:ip,normal_pars_fragment:rp,normal_pars_vertex:ap,normal_vertex:sp,normalmap_pars_fragment:op,clearcoat_normal_fragment_begin:lp,clearcoat_normal_fragment_maps:cp,clearcoat_pars_fragment:fp,iridescence_pars_fragment:up,opaque_fragment:dp,packing:hp,premultiplied_alpha_fragment:pp,project_vertex:mp,dithering_fragment:_p,dithering_pars_fragment:gp,roughnessmap_fragment:vp,roughnessmap_pars_fragment:xp,shadowmap_pars_fragment:Sp,shadowmap_pars_vertex:Mp,shadowmap_vertex:bp,shadowmask_pars_fragment:yp,skinbase_vertex:Ep,skinning_pars_vertex:wp,skinning_vertex:Tp,skinnormal_vertex:Ap,specularmap_fragment:Rp,specularmap_pars_fragment:Cp,tonemapping_fragment:Pp,tonemapping_pars_fragment:Lp,transmission_fragment:Dp,transmission_pars_fragment:Ip,uv_pars_fragment:Up,uv_pars_vertex:Np,uv_vertex:Fp,worldpos_vertex:Op,background_vert:kp,background_frag:Bp,backgroundCube_vert:zp,backgroundCube_frag:Gp,cube_vert:Hp,cube_frag:Vp,depth_vert:Wp,depth_frag:Xp,distance_vert:Yp,distance_frag:qp,equirect_vert:$p,equirect_frag:Kp,linedashed_vert:Zp,linedashed_frag:Jp,meshbasic_vert:Qp,meshbasic_frag:jp,meshlambert_vert:em,meshlambert_frag:tm,meshmatcap_vert:nm,meshmatcap_frag:im,meshnormal_vert:rm,meshnormal_frag:am,meshphong_vert:sm,meshphong_frag:om,meshphysical_vert:lm,meshphysical_frag:cm,meshtoon_vert:fm,meshtoon_frag:um,points_vert:dm,points_frag:hm,shadow_vert:pm,shadow_frag:mm,sprite_vert:_m,sprite_frag:gm},_e={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Mn={basic:{uniforms:$t([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:$t([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:$t([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:$t([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:$t([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ve(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:$t([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:$t([_e.points,_e.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:$t([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:$t([_e.common,_e.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:$t([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:$t([_e.sprite,_e.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:$t([_e.common,_e.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:$t([_e.lights,_e.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Mn.physical={uniforms:$t([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Fr={r:0,b:0,g:0},vm=new vt,zc=new He;zc.set(-1,0,0,0,1,0,0,0,1);function xm(i,e,t,n,r,a){const s=new Ve(0);let o=r===!0?0:1,l,c,d=null,u=0,f=null;function h(w){let R=w.isScene===!0?w.background:null;if(R&&R.isTexture){const M=w.backgroundBlurriness>0;R=e.get(R,M)}return R}function g(w){let R=!1;const M=h(w);M===null?m(s,o):M&&M.isColor&&(m(M,1),R=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(w,R){const M=h(R);M&&(M.isCubeTexture||M.mapping===fa)?(c===void 0&&(c=new Pt(new Xi(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:zi(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,y,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(vm.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zc),c.material.toneMapped=Je.getTransfer(M.colorSpace)!==st,(d!==M||u!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,u=M.version,f=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Pt(new Bi(2,2),new Lt({name:"BackgroundMaterial",uniforms:zi(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Je.getTransfer(M.colorSpace)!==st,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,R){w.getRGB(Fr,Uc(i)),t.buffers.color.setClear(Fr.r,Fr.g,Fr.b,R,a)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(w,R=1){s.set(w),o=R,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(s,o)},render:g,addToRenderList:S,dispose:p}}function Sm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let a=r,s=!1;function o(U,O,z,I,G){let Z=!1;const $=u(U,I,z,O);a!==$&&(a=$,c(a.object)),Z=h(U,I,z,G),Z&&g(U,I,z,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(Z||s)&&(s=!1,M(U,O,z,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(U){return i.bindVertexArray(U)}function d(U){return i.deleteVertexArray(U)}function u(U,O,z,I){const G=I.wireframe===!0;let Z=n[O.id];Z===void 0&&(Z={},n[O.id]=Z);const $=U.isInstancedMesh===!0?U.id:0;let ae=Z[$];ae===void 0&&(ae={},Z[$]=ae);let Y=ae[z.id];Y===void 0&&(Y={},ae[z.id]=Y);let ne=Y[G];return ne===void 0&&(ne=f(l()),Y[G]=ne),ne}function f(U){const O=[],z=[],I=[];for(let G=0;G<t;G++)O[G]=0,z[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:z,attributeDivisors:I,object:U,attributes:{},index:null}}function h(U,O,z,I){const G=a.attributes,Z=O.attributes;let $=0;const ae=z.getAttributes();for(const Y in ae)if(ae[Y].location>=0){const re=G[Y];let Te=Z[Y];if(Te===void 0&&(Y==="instanceMatrix"&&U.instanceMatrix&&(Te=U.instanceMatrix),Y==="instanceColor"&&U.instanceColor&&(Te=U.instanceColor)),re===void 0||re.attribute!==Te||Te&&re.data!==Te.data)return!0;$++}return a.attributesNum!==$||a.index!==I}function g(U,O,z,I){const G={},Z=O.attributes;let $=0;const ae=z.getAttributes();for(const Y in ae)if(ae[Y].location>=0){let re=Z[Y];re===void 0&&(Y==="instanceMatrix"&&U.instanceMatrix&&(re=U.instanceMatrix),Y==="instanceColor"&&U.instanceColor&&(re=U.instanceColor));const Te={};Te.attribute=re,re&&re.data&&(Te.data=re.data),G[Y]=Te,$++}a.attributes=G,a.attributesNum=$,a.index=I}function S(){const U=a.newAttributes;for(let O=0,z=U.length;O<z;O++)U[O]=0}function m(U){p(U,0)}function p(U,O){const z=a.newAttributes,I=a.enabledAttributes,G=a.attributeDivisors;z[U]=1,I[U]===0&&(i.enableVertexAttribArray(U),I[U]=1),G[U]!==O&&(i.vertexAttribDivisor(U,O),G[U]=O)}function w(){const U=a.newAttributes,O=a.enabledAttributes;for(let z=0,I=O.length;z<I;z++)O[z]!==U[z]&&(i.disableVertexAttribArray(z),O[z]=0)}function R(U,O,z,I,G,Z,$){$===!0?i.vertexAttribIPointer(U,O,z,G,Z):i.vertexAttribPointer(U,O,z,I,G,Z)}function M(U,O,z,I){S();const G=I.attributes,Z=z.getAttributes(),$=O.defaultAttributeValues;for(const ae in Z){const Y=Z[ae];if(Y.location>=0){let ne=G[ae];if(ne===void 0&&(ae==="instanceMatrix"&&U.instanceMatrix&&(ne=U.instanceMatrix),ae==="instanceColor"&&U.instanceColor&&(ne=U.instanceColor)),ne!==void 0){const re=ne.normalized,Te=ne.itemSize,Ae=e.get(ne);if(Ae===void 0)continue;const et=Ae.buffer,J=Ae.type,ee=Ae.bytesPerElement,H=J===i.INT||J===i.UNSIGNED_INT||ne.gpuType===lo;if(ne.isInterleavedBufferAttribute){const q=ne.data,oe=q.stride,Oe=ne.offset;if(q.isInstancedInterleavedBuffer){for(let Se=0;Se<Y.locationSize;Se++)p(Y.location+Se,q.meshPerAttribute);U.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Se=0;Se<Y.locationSize;Se++)m(Y.location+Se);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Se=0;Se<Y.locationSize;Se++)R(Y.location+Se,Te/Y.locationSize,J,re,oe*ee,(Oe+Te/Y.locationSize*Se)*ee,H)}else{if(ne.isInstancedBufferAttribute){for(let q=0;q<Y.locationSize;q++)p(Y.location+q,ne.meshPerAttribute);U.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let q=0;q<Y.locationSize;q++)m(Y.location+q);i.bindBuffer(i.ARRAY_BUFFER,et);for(let q=0;q<Y.locationSize;q++)R(Y.location+q,Te/Y.locationSize,J,re,Te*ee,Te/Y.locationSize*q*ee,H)}}else if($!==void 0){const re=$[ae];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(Y.location,re);break;case 3:i.vertexAttrib3fv(Y.location,re);break;case 4:i.vertexAttrib4fv(Y.location,re);break;default:i.vertexAttrib1fv(Y.location,re)}}}}w()}function b(){T();for(const U in n){const O=n[U];for(const z in O){const I=O[z];for(const G in I){const Z=I[G];for(const $ in Z)d(Z[$].object),delete Z[$];delete I[G]}}delete n[U]}}function y(U){if(n[U.id]===void 0)return;const O=n[U.id];for(const z in O){const I=O[z];for(const G in I){const Z=I[G];for(const $ in Z)d(Z[$].object),delete Z[$];delete I[G]}}delete n[U.id]}function A(U){for(const O in n){const z=n[O];for(const I in z){const G=z[I];if(G[U.id]===void 0)continue;const Z=G[U.id];for(const $ in Z)d(Z[$].object),delete Z[$];delete G[U.id]}}}function v(U){for(const O in n){const z=n[O],I=U.isInstancedMesh===!0?U.id:0,G=z[I];if(G!==void 0){for(const Z in G){const $=G[Z];for(const ae in $)d($[ae].object),delete $[ae];delete G[Z]}delete z[I],Object.keys(z).length===0&&delete n[O]}}}function T(){P(),s=!0,a!==r&&(a=r,c(a.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:y,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:S,enableAttribute:m,disableUnusedAttributes:w}}function Mm(i,e,t){let n;function r(l){n=l}function a(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function s(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let f=0;for(let h=0;h<d;h++)f+=c[h];t.update(f,n,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function bm(i,e,t,n){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(A){return!(A!==_n&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Zt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==an&&A!==En&&!v&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Be("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:R,maxFragmentUniforms:M,maxSamples:b,samples:y}}function ym(i){const e=this;let t=null,n=0,r=!1,a=!1;const s=new Un,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||n!==0||r;return r=f,n=u.length,h},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,h){const g=u.clippingPlanes,S=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||a&&!m)a?d(null):c();else{const w=a?0:n,R=w*4;let M=p.clippingState||null;l.value=M,M=d(g,f,R,h);for(let b=0;b!==R;++b)M[b]=t[b];p.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,h,g){const S=u!==null?u.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const p=h+S*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let R=0,M=h;R!==S;++R,M+=4)s.copy(u[R]).applyMatrix4(w,o),s.normal.toArray(m,M),m[M+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const Ii=4,Em=6,wm=20,Tm=256,Qi=new Gi,vl=new Ve;let Wa=null,Xa=0,Ya=0,qa=!1;const Am=new F,ii=new F;class Ws{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,a={}){const{size:s=256,position:o=Am}=a;Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wa,Xa,Ya),this._renderer.xr.enabled=qa,e.scissorTest=!1,Ci(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===li||e.mapping===Oi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Zt,format:_n,colorSpace:ia,depthBuffer:!1},r=xl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xl(e,t,n);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Rm(a)),this._blurMaterial=Pm(a,e,t),this._ggxMaterial=Cm(a,e,t)}return r}_compileMaterial(e){const t=new Pt(new Nt,e);this._renderer.compile(t,Qi)}_sceneToCubeUV(e,t,n,r,a){const l=new ln(90,1,t,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(vl),u.toneMapping=An,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new Xi,new Mo({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let p=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,p=!0):(m.color.copy(vl),p=!0);for(let R=0;R<6;R++){const M=R%3;M===0?(l.up.set(0,c[R],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+d[R],a.y,a.z)):M===1?(l.up.set(0,0,c[R]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+d[R],a.z)):(l.up.set(0,c[R],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+d[R]));const b=this._cubeSize;Ci(r,M*b,R>2?b:0,b,b),u.setRenderTarget(r),p&&u.render(S,l),u.render(e,l)}u.toneMapping=h,u.autoClear=f,e.background=w}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===li||e.mapping===Oi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sl());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;Ci(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,Qi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[n];o.material=s;const l=s.uniforms,c=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),f=c*1.25,h=u*f,{_lodMax:g}=this,S=this._sizeLods[n],m=3*S*(n>g-Ii?n-g+Ii:0),p=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=g-t,Ci(a,m,p,3*S,2*S),r.setRenderTarget(a),r.render(o,Qi),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=g-n,Ci(e,m,p,3*S,2*S),r.setRenderTarget(e),r.render(o,Qi)}_blur(e,t,n,r){const a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,n,s),this._blurPass(a,e,n,n,s)}_blurPass(e,t,n,r,a){const s=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-n;const d=this._sizeLods[r],u=3*d*(r>this._lodMax-Ii?r-this._lodMax+Ii:0),f=4*(this._cubeSize-d);Ci(t,u,f,3*d,2*d),s.setRenderTarget(t),s.render(l,Qi)}}function Rm(i){const e=[],t=[];let n=i;const r=i-Ii+1+Em;for(let a=0;a<r;a++){const s=Math.pow(2,n);e.push(s);const o=1/(s-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,f=6,h=3,g=new Float32Array(h*f*u),S=new Float32Array(h*f*u);for(let p=0;p<u;p++){const w=p%3*2/3-1,R=p>2?0:-1,M=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];g.set(M,h*f*p);for(let b=0;b<f;b++){const y=d[b*2]*2-1,A=d[b*2+1]*2-1;p===0?ii.set(1,A,y):p===1?ii.set(-y,1,-A):p===2?ii.set(-y,A,1):p===3?ii.set(-1,A,-y):p===4?ii.set(-y,-1,A):ii.set(y,A,-1),ii.toArray(S,(p*f+b)*h)}}const m=new Nt;m.setAttribute("position",new Xt(g,h)),m.setAttribute("outputDirection",new Xt(S,h)),t.push(new Pt(m,null)),n>Ii&&n--}return{lodMeshes:t,sizeLods:e}}function xl(i,e,t){const n=new zt(i,e,t);return n.texture.mapping=fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ci(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Cm(i,e,t){return new Lt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Tm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:da(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Pm(i,e,t){return new Lt({name:"SphericalGaussianBlur",defines:{SAMPLES:wm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:da(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Sl(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Ml(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function da(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Gc extends zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Dc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Xi(5,5,5),a=new Lt({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Tn});a.uniforms.tEquirect.value=t;const s=new Pt(r,a),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=Yt),new Id(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}}function Lm(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,h=!1){return f==null?null:h?s(f):a(f)}function a(f){if(f&&f.isTexture){const h=f.mapping;if(h===Hr||h===ga)if(e.has(f)){const g=e.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const S=new Gc(g.height);return S.fromEquirectangularTexture(i,f),e.set(f,S),f.addEventListener("dispose",c),o(S.texture,f.mapping)}else return null}}return f}function s(f){if(f&&f.isTexture){const h=f.mapping,g=h===Hr||h===ga,S=h===li||h===Oi;if(g||S){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Ws(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const w=f.image;return g&&w&&w.height>0||S&&w&&l(w)?(n===null&&(n=new Ws(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",d),m.texture):null}}}return f}function o(f,h){return h===Hr?f.mapping=li:h===ga&&(f.mapping=Oi),f}function l(f){let h=0;const g=6;for(let S=0;S<g;S++)f[S]!==void 0&&h++;return h===g}function c(f){const h=f.target;h.removeEventListener("dispose",c);const g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function d(f){const h=f.target;h.removeEventListener("dispose",d);const g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function Dm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ni("WebGLRenderer: "+n+" extension not supported."),r}}}function Im(i,e,t,n){const r={},a=new WeakMap;function s(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",s),delete r[f.id];const h=a.get(f);h&&(e.remove(h),a.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const h in f)e.update(f[h],i.ARRAY_BUFFER)}function c(u){const f=[],h=u.index,g=u.attributes.position;let S=0;if(g===void 0)return;if(h!==null){const w=h.array;S=h.version;for(let R=0,M=w.length;R<M;R+=3){const b=w[R+0],y=w[R+1],A=w[R+2];f.push(b,y,y,A,A,b)}}else{const w=g.array;S=g.version;for(let R=0,M=w.length/3-1;R<M;R+=3){const b=R+0,y=R+1,A=R+2;f.push(b,y,y,A,A,b)}}const m=new(g.count>=65535?Lc:Pc)(f,1);m.version=S;const p=a.get(u);p&&e.remove(p),a.set(u,m)}function d(u){const f=a.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&c(u)}else c(u);return a.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Um(i,e,t){let n;function r(u){n=u}let a,s;function o(u){a=u.type,s=u.bytesPerElement}function l(u,f){i.drawElements(n,f,a,u*s),t.update(f,n,1)}function c(u,f,h){h!==0&&(i.drawElementsInstanced(n,f,a,u*s,h),t.update(f,n,h))}function d(u,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,a,u,0,h);let S=0;for(let m=0;m<h;m++)S+=f[m];t.update(S,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Nm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:it("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Fm(i,e,t){const n=new WeakMap,r=new Mt;function a(s,o,l){const c=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let T=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const h=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let R=0;h===!0&&(R=1),g===!0&&(R=2),S===!0&&(R=3);let M=o.attributes.position.count*R,b=1;M>e.maxTextureSize&&(b=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const y=new Float32Array(M*b*4*u),A=new Rc(y,M,b,u);A.type=En,A.needsUpdate=!0;const v=R*4;for(let P=0;P<u;P++){const U=m[P],O=p[P],z=w[P],I=M*b*4*P;for(let G=0;G<U.count;G++){const Z=G*v;h===!0&&(r.fromBufferAttribute(U,G),y[I+Z+0]=r.x,y[I+Z+1]=r.y,y[I+Z+2]=r.z,y[I+Z+3]=0),g===!0&&(r.fromBufferAttribute(O,G),y[I+Z+4]=r.x,y[I+Z+5]=r.y,y[I+Z+6]=r.z,y[I+Z+7]=0),S===!0&&(r.fromBufferAttribute(z,G),y[I+Z+8]=r.x,y[I+Z+9]=r.y,y[I+Z+10]=r.z,y[I+Z+11]=z.itemSize===4?r.w:1)}}f={count:u,texture:A,size:new ke(M,b)},n.set(o,f),o.addEventListener("dispose",T)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let h=0;for(let S=0;S<c.length;S++)h+=c[S];const g=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:a}}function Om(i,e,t,n,r){let a=new WeakMap;function s(c){const d=r.render.frame,u=c.geometry,f=e.get(c,u);if(a.get(f)!==d&&(e.update(f),a.set(f,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){const h=c.skeleton;a.get(h)!==d&&(h.update(),a.set(h,d))}return f}function o(){a=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:s,dispose:o}}const km={[no]:"LINEAR_TONE_MAPPING",[io]:"REINHARD_TONE_MAPPING",[ro]:"CINEON_TONE_MAPPING",[ca]:"ACES_FILMIC_TONE_MAPPING",[so]:"AGX_TONE_MAPPING",[oo]:"NEUTRAL_TONE_MAPPING",[ao]:"CUSTOM_TONE_MAPPING"};function Bm(i,e,t,n,r,a){const s=new zt(e,t,{type:i,depthBuffer:r,stencilBuffer:a,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Nt;c.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new yt([0,2,0,0,2,0],2));const d=new Nc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Pt(c,d),f=new Gi(-1,1,1,-1,0,1);let h=null,g=null,S=!1,m,p=null,w=[],R=!1;this.setSize=function(M,b){s.setSize(M,b),o!==null&&o.setSize(M,b),l!==null&&l.setSize(M,b);for(let y=0;y<w.length;y++){const A=w[y];A.setSize&&A.setSize(M,b)}},this.setEffects=function(M){w=M,R=w.length>0&&w[0].isRenderPass===!0;const b=s.width,y=s.height;w.length>0&&o===null&&(o=new zt(b,y,{type:Zt,depthBuffer:!1,stencilBuffer:!1}),l=new zt(b,y,{type:Zt,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<w.length;A++){const v=w[A];v.setSize&&v.setSize(b,y)}},this.begin=function(M,b){if(S||M.toneMapping===An&&w.length===0)return!1;if(p=b,b!==null){const y=b.width,A=b.height;(s.width!==y||s.height!==A)&&this.setSize(y,A)}return R===!1&&M.setRenderTarget(s),m=M.toneMapping,M.toneMapping=An,!0},this.hasRenderPass=function(){return R},this.end=function(M,b){M.toneMapping=m,S=!0;let y=s,A=o;for(let v=0;v<w.length;v++){const T=w[v];T.enabled!==!1&&(T.render(M,A,y,b),T.needsSwap!==!1&&(y=A,A=A===o?l:o))}if(h!==M.outputColorSpace||g!==M.toneMapping){h=M.outputColorSpace,g=M.toneMapping,d.defines={},Je.getTransfer(h)===st&&(d.defines.SRGB_TRANSFER="");const v=km[g];v&&(d.defines[v]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,M.setRenderTarget(p),M.render(u,f),p=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}const Hc=new Bt,Xs=new ki(1,1),Vc=new Rc,Wc=new id,Xc=new Dc,bl=[],yl=[],El=new Float32Array(16),wl=new Float32Array(9),Tl=new Float32Array(4);function Yi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=bl[r];if(a===void 0&&(a=new Float32Array(r),bl[r]=a),e!==0){n.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ha(i,e){let t=yl[e];t===void 0&&(t=new Int32Array(e),yl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function zm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function Hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function Vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function Wm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;Tl.set(n),i.uniformMatrix2fv(this.addr,!1,Tl),It(t,n)}}function Xm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;wl.set(n),i.uniformMatrix3fv(this.addr,!1,wl),It(t,n)}}function Ym(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;El.set(n),i.uniformMatrix4fv(this.addr,!1,El),It(t,n)}}function qm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function Km(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function Zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function Jm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function e_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function t_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let a;this.type===i.SAMPLER_2D_SHADOW?(Xs.compareFunction=t.isReversedDepthBuffer()?_o:mo,a=Xs):a=Hc,t.setTexture2D(e||a,r)}function n_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Wc,r)}function i_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Xc,r)}function r_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Vc,r)}function a_(i){switch(i){case 5126:return zm;case 35664:return Gm;case 35665:return Hm;case 35666:return Vm;case 35674:return Wm;case 35675:return Xm;case 35676:return Ym;case 5124:case 35670:return qm;case 35667:case 35671:return $m;case 35668:case 35672:return Km;case 35669:case 35673:return Zm;case 5125:return Jm;case 36294:return Qm;case 36295:return jm;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return t_;case 35679:case 36299:case 36307:return n_;case 35680:case 36300:case 36308:case 36293:return i_;case 36289:case 36303:case 36311:case 36292:return r_}}function s_(i,e){i.uniform1fv(this.addr,e)}function o_(i,e){const t=Yi(e,this.size,2);i.uniform2fv(this.addr,t)}function l_(i,e){const t=Yi(e,this.size,3);i.uniform3fv(this.addr,t)}function c_(i,e){const t=Yi(e,this.size,4);i.uniform4fv(this.addr,t)}function f_(i,e){const t=Yi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function u_(i,e){const t=Yi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function d_(i,e){const t=Yi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function h_(i,e){i.uniform1iv(this.addr,e)}function p_(i,e){i.uniform2iv(this.addr,e)}function m_(i,e){i.uniform3iv(this.addr,e)}function __(i,e){i.uniform4iv(this.addr,e)}function g_(i,e){i.uniform1uiv(this.addr,e)}function v_(i,e){i.uniform2uiv(this.addr,e)}function x_(i,e){i.uniform3uiv(this.addr,e)}function S_(i,e){i.uniform4uiv(this.addr,e)}function M_(i,e,t){const n=this.cache,r=e.length,a=ha(t,r);Dt(n,a)||(i.uniform1iv(this.addr,a),It(n,a));let s;this.type===i.SAMPLER_2D_SHADOW?s=Xs:s=Hc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function b_(i,e,t){const n=this.cache,r=e.length,a=ha(t,r);Dt(n,a)||(i.uniform1iv(this.addr,a),It(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Wc,a[s])}function y_(i,e,t){const n=this.cache,r=e.length,a=ha(t,r);Dt(n,a)||(i.uniform1iv(this.addr,a),It(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Xc,a[s])}function E_(i,e,t){const n=this.cache,r=e.length,a=ha(t,r);Dt(n,a)||(i.uniform1iv(this.addr,a),It(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Vc,a[s])}function w_(i){switch(i){case 5126:return s_;case 35664:return o_;case 35665:return l_;case 35666:return c_;case 35674:return f_;case 35675:return u_;case 35676:return d_;case 5124:case 35670:return h_;case 35667:case 35671:return p_;case 35668:case 35672:return m_;case 35669:case 35673:return __;case 5125:return g_;case 36294:return v_;case 36295:return x_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return M_;case 35679:case 36299:case 36307:return b_;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return E_}}class T_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=a_(t.type)}}class A_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=w_(t.type)}}class R_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],n)}}}const $a=/(\w+)(\])?(\[|\.)?/g;function Al(i,e){i.seq.push(e),i.map[e.id]=e}function C_(i,e,t){const n=i.name,r=n.length;for($a.lastIndex=0;;){const a=$a.exec(n),s=$a.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===r){Al(t,c===void 0?new T_(o,i,e):new A_(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new R_(o),Al(t,u)),t=u}}}class $r{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=e.getActiveUniform(t,s),l=e.getUniformLocation(t,o.name);C_(o,l,this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&n.push(s)}return n}}function Rl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const P_=37297;let L_=0;function D_(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}const Cl=new He;function I_(i){Je._getMatrix(Cl,Je.workingColorSpace,i);const e=`mat3( ${Cl.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case ra:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Pl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),a=(i.getShaderInfoLog(e)||"").trim();if(n&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+D_(i.getShaderSource(e),o)}else return a}function U_(i,e){const t=I_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const N_={[no]:"Linear",[io]:"Reinhard",[ro]:"Cineon",[ca]:"ACESFilmic",[so]:"AgX",[oo]:"Neutral",[ao]:"Custom"};function F_(i,e){const t=N_[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Or=new F;function O_(){Je.getLuminanceCoefficients(Or);const i=Or.x.toFixed(4),e=Or.y.toFixed(4),t=Or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function B_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function z_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=i.getActiveAttrib(e,r),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function tr(i){return i!==""}function Ll(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const G_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ys(i){return i.replace(G_,V_)}const H_=new Map;function V_(i,e){let t=We[e];if(t===void 0){const n=H_.get(e);if(n!==void 0)t=We[n],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ys(t)}const W_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(i){return i.replace(W_,X_)}function X_(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Ul(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Y_={[ir]:"SHADOWMAP_TYPE_PCF",[er]:"SHADOWMAP_TYPE_VSM"};function q_(i){return Y_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $_={[li]:"ENVMAP_TYPE_CUBE",[Oi]:"ENVMAP_TYPE_CUBE",[fa]:"ENVMAP_TYPE_CUBE_UV"};function K_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":$_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Z_={[Oi]:"ENVMAP_MODE_REFRACTION"};function J_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Z_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Q_={[to]:"ENVMAP_BLENDING_MULTIPLY",[Uu]:"ENVMAP_BLENDING_MIX",[Nu]:"ENVMAP_BLENDING_ADD"};function j_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Q_[i.combine]||"ENVMAP_BLENDING_NONE"}function e1(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function t1(i,e,t,n){const r=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=q_(t),c=K_(t),d=J_(t),u=j_(t),f=e1(t),h=k_(t),g=B_(a),S=r.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(tr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(tr).join(`
`),p.length>0&&(p+=`
`)):(m=[Ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),p=[Ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?We.tonemapping_pars_fragment:"",t.toneMapping!==An?F_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,U_("linearToOutputTexel",t.outputColorSpace),O_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(tr).join(`
`)),s=Ys(s),s=Ll(s,t),s=Dl(s,t),o=Ys(o),o=Ll(o,t),o=Dl(o,t),s=Il(s),o=Il(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const R=w+m+s,M=w+p+o,b=Rl(r,r.VERTEX_SHADER,R),y=Rl(r,r.FRAGMENT_SHADER,M);r.attachShader(S,b),r.attachShader(S,y),t.index0AttributeName!==void 0?r.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function A(U){if(i.debug.checkShaderErrors){const O=r.getProgramInfoLog(S)||"",z=r.getShaderInfoLog(b)||"",I=r.getShaderInfoLog(y)||"",G=O.trim(),Z=z.trim(),$=I.trim();let ae=!0,Y=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(ae=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,S,b,y);else{const ne=Pl(r,b,"vertex"),re=Pl(r,y,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+G+`
`+ne+`
`+re)}else G!==""?Be("WebGLProgram: Program Info Log:",G):(Z===""||$==="")&&(Y=!1);Y&&(U.diagnostics={runnable:ae,programLog:G,vertexShader:{log:Z,prefix:m},fragmentShader:{log:$,prefix:p}})}r.deleteShader(b),r.deleteShader(y),v=new $r(r,S),T=z_(r,S)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(S,P_)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=L_++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=b,this.fragmentShader=y,this}let n1=0;class i1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new r1(e),t.set(e,n)),n}}class r1{constructor(e){this.id=n1++,this.code=e,this.usedTimes=0}}function a1(i){return i===fi||i===ea||i===ta}function s1(i,e,t,n,r,a){const s=new vo,o=new i1,l=new Set,c=[],d=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function S(v,T,P,U,O,z){const I=U.fog,G=O.geometry,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ae=e.get(v.envMap||Z,$),Y=ae&&ae.mapping===fa?ae.image.height:null,ne=h[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&Be("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const re=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Te=re!==void 0?re.length:0;let Ae=0;G.morphAttributes.position!==void 0&&(Ae=1),G.morphAttributes.normal!==void 0&&(Ae=2),G.morphAttributes.color!==void 0&&(Ae=3);let et,J,ee,H;if(ne){const ot=Mn[ne];et=ot.vertexShader,J=ot.fragmentShader}else{et=v.vertexShader,J=v.fragmentShader;const ot=o.getVertexShaderStage(v),tt=o.getFragmentShaderStage(v);o.update(v,ot,tt),ee=ot.id,H=tt.id}const q=i.getRenderTarget(),oe=i.state.buffers.depth.getReversed(),Oe=O.isInstancedMesh===!0,Se=O.isBatchedMesh===!0,ze=!!v.map,pt=!!v.matcap,qe=!!ae,Qe=!!v.aoMap,lt=!!v.lightMap,Xe=!!v.bumpMap&&v.wireframe===!1,ft=!!v.normalMap,Tt=!!v.displacementMap,Ft=!!v.emissiveMap,ut=!!v.metalnessMap,bt=!!v.roughnessMap,D=v.anisotropy>0,xt=v.clearcoat>0,rt=v.dispersion>0,E=v.retroreflectivity>0,_=v.iridescence>0,N=v.sheen>0,V=v.transmission>0,K=D&&!!v.anisotropyMap,le=xt&&!!v.clearcoatMap,ue=xt&&!!v.clearcoatNormalMap,Q=xt&&!!v.clearcoatRoughnessMap,ie=_&&!!v.iridescenceMap,fe=_&&!!v.iridescenceThicknessMap,Le=N&&!!v.sheenColorMap,me=N&&!!v.sheenRoughnessMap,de=!!v.specularMap,De=!!v.specularColorMap,Ne=!!v.specularIntensityMap,Ge=V&&!!v.transmissionMap,L=V&&!!v.thicknessMap,he=!!v.gradientMap,te=!!v.alphaMap,pe=v.alphaTest>0,ge=!!v.alphaHash,se=!!v.extensions;let Ue=An;v.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Ue=i.toneMapping);const Re={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:et,fragmentShader:J,defines:v.defines,customVertexShaderID:ee,customFragmentShaderID:H,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Se,batchingColor:Se&&O._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&O.instanceColor!==null,instancingMorph:Oe&&O.morphTexture!==null,outputColorSpace:q===null?i.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ze,matcap:pt,envMap:qe,envMapMode:qe&&ae.mapping,envMapCubeUVHeight:Y,aoMap:Qe,lightMap:lt,bumpMap:Xe,normalMap:ft,displacementMap:Tt,emissiveMap:Ft,normalMapObjectSpace:ft&&v.normalMapType===ku,normalMapTangentSpace:ft&&v.normalMapType===na,packedNormalMap:ft&&v.normalMapType===na&&a1(v.normalMap.format),metalnessMap:ut,roughnessMap:bt,anisotropy:D,anisotropyMap:K,clearcoat:xt,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:Q,dispersion:rt,retroreflection:E,iridescence:_,iridescenceMap:ie,iridescenceThicknessMap:fe,sheen:N,sheenColorMap:Le,sheenRoughnessMap:me,specularMap:de,specularColorMap:De,specularIntensityMap:Ne,transmission:V,transmissionMap:Ge,thicknessMap:L,gradientMap:he,opaque:v.transparent===!1&&v.blending===rr&&v.alphaToCoverage===!1,alphaMap:te,alphaTest:pe,alphaHash:ge,combine:v.combine,mapUv:ze&&g(v.map.channel),aoMapUv:Qe&&g(v.aoMap.channel),lightMapUv:lt&&g(v.lightMap.channel),bumpMapUv:Xe&&g(v.bumpMap.channel),normalMapUv:ft&&g(v.normalMap.channel),displacementMapUv:Tt&&g(v.displacementMap.channel),emissiveMapUv:Ft&&g(v.emissiveMap.channel),metalnessMapUv:ut&&g(v.metalnessMap.channel),roughnessMapUv:bt&&g(v.roughnessMap.channel),anisotropyMapUv:K&&g(v.anisotropyMap.channel),clearcoatMapUv:le&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(v.sheenRoughnessMap.channel),specularMapUv:de&&g(v.specularMap.channel),specularColorMapUv:De&&g(v.specularColorMap.channel),specularIntensityMapUv:Ne&&g(v.specularIntensityMap.channel),transmissionMapUv:Ge&&g(v.transmissionMap.channel),thicknessMapUv:L&&g(v.thicknessMap.channel),alphaMapUv:te&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ft||D),vertexNormals:!!G.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(ze||te),fog:!!I,useFog:v.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&ft===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:oe,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ae,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:ze&&v.map.isVideoTexture===!0&&Je.getTransfer(v.map.colorSpace)===st,decodeVideoTextureEmissive:Ft&&v.emissiveMap.isVideoTexture===!0&&Je.getTransfer(v.emissiveMap.colorSpace)===st,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===pn,flipSided:v.side===en,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:se&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&v.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)T.push(P),T.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(p(T,v),w(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numSunLights),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numSunLightShadows),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function w(v,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.retroreflection&&s.enable(24),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),T.packedNormalMap&&s.enable(22),T.vertexNormals&&s.enable(23),v.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),T.numLightProbeGrids>0&&s.enable(22),T.hasPositionAttribute&&s.enable(23),v.push(s.mask)}function R(v){const T=h[v.type];let P;if(T){const U=Mn[T];P=fr.clone(U.uniforms)}else P=v.uniforms;return P}function M(v,T){let P=d.get(T);return P!==void 0?++P.usedTimes:(P=new t1(i,T,v,r),c.push(P),d.set(T,P)),P}function b(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function y(v){o.remove(v)}function A(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:R,acquireProgram:M,releaseProgram:b,releaseShaderCache:y,programs:c,dispose:A}}function o1(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function r(s,o,l){i.get(s)[o]=l}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:a}}function l1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Nl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fl(){const i=[];let e=0;const t=[],n=[],r=[];function a(){e=0,t.length=0,n.length=0,r.length=0}function s(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,g,S,m,p){let w=i[e];return w===void 0?(w={id:f.id,object:f,geometry:h,material:g,materialVariant:s(f),groupOrder:S,renderOrder:f.renderOrder,z:m,group:p},i[e]=w):(w.id=f.id,w.object=f,w.geometry=h,w.material=g,w.materialVariant=s(f),w.groupOrder=S,w.renderOrder=f.renderOrder,w.z=m,w.group=p),e++,w}function l(f,h,g,S,m,p,w){w.reversedDepth===!0&&(m=-m);const R=o(f,h,g,S,m,p);g.transmission>0?n.push(R):g.transparent===!0?r.push(R):t.push(R)}function c(f,h,g,S,m,p){const w=o(f,h,g,S,m,p);g.transmission>0?n.unshift(w):g.transparent===!0?r.unshift(w):t.unshift(w)}function d(f,h){t.length>1&&t.sort(f||l1),n.length>1&&n.sort(h||Nl),r.length>1&&r.sort(h||Nl)}function u(){for(let f=e,h=i.length;f<h;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:a,push:l,unshift:c,finish:u,sort:d}}function c1(){let i=new WeakMap;function e(n,r){const a=i.get(n);let s;return a===void 0?(s=new Fl,i.set(n,[s])):r>=a.length?(s=new Fl,a.push(s)):s=a[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function f1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new F,color:new Ve};break;case"SpotLight":t={position:new F,direction:new F,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function u1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let d1=0;function h1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function p1(i){const e=new f1,t=u1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const r=new F,a=new vt,s=new vt;function o(c){let d=0,u=0,f=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let h=0,g=0,S=0,m=0,p=0,w=0,R=0,M=0,b=0,y=0,A=0,v=0,T=0,P=0;c.sort(h1);for(let O=0,z=c.length;O<z;O++){const I=c[O],G=I.color,Z=I.intensity,$=I.distance;let ae=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===fi?ae=I.shadow.map.texture:ae=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=G.r*Z,u+=G.g*Z,f+=G.b*Z;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],Z);P++}else if(I.isSunLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ne=I.shadow,re=t.get(I);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize.copy(ne.mapSize).multiply(ne.getFrameExtents()),n.sunShadow[g]=re,n.sunShadowMap[g]=ae;const Te=ne.getViewportCount();for(let Ae=0;Ae<Te;Ae++)n.sunShadowMatrix[S+Ae]=ne.getMatrix(Ae),n.sunShadowCascade[S+Ae]=ne._cascadeData[Ae];S+=Te,g++}n.sun[h]=Y,h++}else if(I.isDirectionalLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ne=I.shadow,re=t.get(I);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,n.directionalShadow[m]=re,n.directionalShadowMap[m]=ae,n.directionalShadowMatrix[m]=I.shadow.matrix,b++}n.directional[m]=Y,m++}else if(I.isSpotLight){const Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(G).multiplyScalar(Z),Y.distance=$,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[w]=Y;const ne=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,ne.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[w]=ne.matrix,I.castShadow){const re=t.get(I);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,n.spotShadow[w]=re,n.spotShadowMap[w]=ae,A++}w++}else if(I.isRectAreaLight){const Y=e.get(I);Y.color.copy(G).multiplyScalar(Z),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[R]=Y,R++}else if(I.isPointLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const ne=I.shadow,re=t.get(I);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,re.shadowCameraNear=ne.camera.near,re.shadowCameraFar=ne.camera.far,n.pointShadow[p]=re,n.pointShadowMap[p]=ae,n.pointShadowMatrix[p]=I.shadow.matrix,y++}n.point[p]=Y,p++}else if(I.isHemisphereLight){const Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar(Z),Y.groundColor.copy(I.groundColor).multiplyScalar(Z),n.hemi[M]=Y,M++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=f;const U=n.hash;(U.sunLength!==h||U.directionalLength!==m||U.pointLength!==p||U.spotLength!==w||U.rectAreaLength!==R||U.hemiLength!==M||U.numSunShadows!==g||U.numDirectionalShadows!==b||U.numPointShadows!==y||U.numSpotShadows!==A||U.numSpotMaps!==v||U.numLightProbes!==P)&&(n.sun.length=h,n.directional.length=m,n.spot.length=w,n.rectArea.length=R,n.point.length=p,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.pointShadowMatrix.length=y,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+v-T,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,U.sunLength=h,U.directionalLength=m,U.pointLength=p,U.spotLength=w,U.rectAreaLength=R,U.hemiLength=M,U.numSunShadows=g,U.numDirectionalShadows=b,U.numPointShadows=y,U.numSpotShadows=A,U.numSpotMaps=v,U.numLightProbes=P,n.version=d1++)}function l(c,d){let u=0,f=0,h=0,g=0,S=0,m=0;const p=d.matrixWorldInverse;for(let w=0,R=c.length;w<R;w++){const M=c[w];if(M.isSunLight){const b=n.sun[u];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(p),u++}else if(M.isDirectionalLight){const b=n.directional[f];b.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),f++}else if(M.isSpotLight){const b=n.spot[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),g++}else if(M.isRectAreaLight){const b=n.rectArea[S];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(p),s.identity(),a.copy(M.matrixWorld),a.premultiply(p),s.extractRotation(a),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(s),b.halfHeight.applyMatrix4(s),S++}else if(M.isPointLight){const b=n.point[h];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(p),h++}else if(M.isHemisphereLight){const b=n.hemi[m];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function Ol(i){const e=new p1(i),t=[],n=[],r=[];function a(f){u.camera=f,t.length=0,n.length=0,r.length=0}function s(f){t.push(f)}function o(f){n.push(f)}function l(f){r.push(f)}function c(){e.setup(t)}function d(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:d,pushLight:s,pushShadow:o,pushLightProbeGrid:l}}function m1(i){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new Ol(i),e.set(r,[o])):a>=s.length?(o=new Ol(i),s.push(o)):o=s[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const _1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,v1=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],x1=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],kl=new vt,ji=new F,Ka=new F;function S1(i,e,t){let n=new bo;const r=new ke,a=new ke,s=new Mt,o=new Fc,l=new Ed,c={},d=t.maxTextureSize,u={[oi]:en,[en]:oi,[pn]:pn},f=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:_1,fragmentShader:g1}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new Nt;g.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Pt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ir;let p=this.type;this.render=function(y,A,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===mu&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ir);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Tn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==this.type;z&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=y.length;I<G;I++){const Z=y[I],$=Z.shadow;if($===void 0){Be("WebGLShadowMap:",Z,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(a.x=Math.floor(d/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>d&&(a.y=Math.floor(d/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const Y=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=Y,$.map===null||z===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===er){if(Z.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new zt(r.x,r.y,{format:fi,type:Zt,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),$.map.texture.name=Z.name+".shadowMap",$.map.depthTexture=new ki(r.x,r.y,En),$.map.depthTexture.name=Z.name+".shadowMapDepth",$.map.depthTexture.format=Bn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=wt,$.map.depthTexture.magFilter=wt}else Z.isPointLight?($.map=new Gc(r.x),$.map.depthTexture=new Sd(r.x,Rn)):($.map=new zt(r.x,r.y),$.map.depthTexture=new ki(r.x,r.y,Rn)),$.map.depthTexture.name=Z.name+".shadowMap",$.map.depthTexture.format=Bn,this.type===ir?($.map.depthTexture.compareFunction=Y?_o:mo,$.map.depthTexture.minFilter=Yt,$.map.depthTexture.magFilter=Yt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=wt,$.map.depthTexture.magFilter=wt);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ne=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();Z.isPointLight!==!0&&$.updateMatrices(Z,v);for(let re=0;re<ne;re++){const Te=$.getCamera(re);if(Z.isPointLight){const Ae=$.camera,et=$.matrix,J=Z.distance||Ae.far;J!==Ae.far&&(Ae.far=J,Ae.updateProjectionMatrix()),ji.setFromMatrixPosition(Z.matrixWorld),Ae.position.copy(ji),Ka.copy(Ae.position),Ka.add(v1[re]),Ae.up.copy(x1[re]),Ae.lookAt(Ka),Ae.updateMatrixWorld(),et.makeTranslation(-ji.x,-ji.y,-ji.z),kl.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),$._frustum.setFromProjectionMatrix(kl,Ae.coordinateSystem,Ae.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,re),i.clear();else{re===0&&(i.setRenderTarget($.map),i.clear());const Ae=$.getViewport(re);s.set(a.x*Ae.x,a.y*Ae.y,a.x*Ae.z,a.y*Ae.w),O.viewport(s)}n=$.getFrustum(re),M(A,v,Te,Z,this.type)}$.isPointLightShadow!==!0&&this.type===er&&w($,v),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,U)};function w(y,A){const v=e.update(S);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,h.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),y.mapPass===null?y.mapPass=new zt(r.x,r.y,{format:fi,type:Zt}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),f.uniforms.shadow_pass.value=y.map.depthTexture,f.uniforms.resolution.value.set(y.map.width,y.map.height),f.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(A,null,v,f,S,null),h.uniforms.shadow_pass.value=y.mapPass.texture,h.uniforms.resolution.value.set(y.map.width,y.map.height),h.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(A,null,v,h,S,null)}function R(y,A,v,T){let P=null;const U=v.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(U!==void 0)P=U;else if(P=v.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=P.uuid,z=A.uuid;let I=c[O];I===void 0&&(I={},c[O]=I);let G=I[z];G===void 0&&(G=P.clone(),I[z]=G,A.addEventListener("dispose",b)),P=G}if(P.visible=A.visible,P.wireframe=A.wireframe,T===er?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:u[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const O=i.properties.get(P);O.light=v}return P}function M(y,A,v,T,P){if(y.visible===!1)return;if(y.layers.test(A.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&P===er)&&(!y.frustumCulled||y.intersectsFrustum(n))){y.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,y.matrixWorld);const z=e.update(y),I=y.material;if(Array.isArray(I)){const G=z.groups;for(let Z=0,$=G.length;Z<$;Z++){const ae=G[Z],Y=I[ae.materialIndex];if(Y&&Y.visible){const ne=R(y,Y,T,P);y.onBeforeShadow(i,y,A,v,z,ne,ae),i.renderBufferDirect(v,null,z,ne,y,ae),y.onAfterShadow(i,y,A,v,z,ne,ae)}}}else if(I.visible){const G=R(y,I,T,P);y.onBeforeShadow(i,y,A,v,z,G,null),i.renderBufferDirect(v,null,z,G,y,null),y.onAfterShadow(i,y,A,v,z,G,null)}}const O=y.children;for(let z=0,I=O.length;z<I;z++)M(O[z],A,v,T,P)}function b(y){y.target.removeEventListener("dispose",b);for(const v in c){const T=c[v],P=y.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function M1(i,e){function t(){let L=!1;const he=new Mt;let te=null;const pe=new Mt(0,0,0,0);return{setMask:function(ge){te!==ge&&!L&&(i.colorMask(ge,ge,ge,ge),te=ge)},setLocked:function(ge){L=ge},setClear:function(ge,se,Ue,Re,ot){ot===!0&&(ge*=Re,se*=Re,Ue*=Re),he.set(ge,se,Ue,Re),pe.equals(he)===!1&&(i.clearColor(ge,se,Ue,Re),pe.copy(he))},reset:function(){L=!1,te=null,pe.set(-1,0,0,0)}}}function n(){let L=!1,he=!1,te=null,pe=null,ge=null;return{setReversed:function(se){if(he!==se){const Ue=e.get("EXT_clip_control");se?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),he=se;const Re=ge;ge=null,this.setClear(Re)}},getReversed:function(){return he},setTest:function(se){se?q(i.DEPTH_TEST):oe(i.DEPTH_TEST)},setMask:function(se){te!==se&&!L&&(i.depthMask(se),te=se)},setFunc:function(se){if(he&&(se=Zu[se]),pe!==se){switch(se){case is:i.depthFunc(i.NEVER);break;case rs:i.depthFunc(i.ALWAYS);break;case as:i.depthFunc(i.LESS);break;case ar:i.depthFunc(i.LEQUAL);break;case ss:i.depthFunc(i.EQUAL);break;case os:i.depthFunc(i.GEQUAL);break;case ls:i.depthFunc(i.GREATER);break;case cs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=se}},setLocked:function(se){L=se},setClear:function(se){ge!==se&&(ge=se,he&&(se=1-se),i.clearDepth(se))},reset:function(){L=!1,te=null,pe=null,ge=null,he=!1}}}function r(){let L=!1,he=null,te=null,pe=null,ge=null,se=null,Ue=null,Re=null,ot=null;return{setTest:function(tt){L||(tt?q(i.STENCIL_TEST):oe(i.STENCIL_TEST))},setMask:function(tt){he!==tt&&!L&&(i.stencilMask(tt),he=tt)},setFunc:function(tt,W,j){(te!==tt||pe!==W||ge!==j)&&(i.stencilFunc(tt,W,j),te=tt,pe=W,ge=j)},setOp:function(tt,W,j){(se!==tt||Ue!==W||Re!==j)&&(i.stencilOp(tt,W,j),se=tt,Ue=W,Re=j)},setLocked:function(tt){L=tt},setClear:function(tt){ot!==tt&&(i.clearStencil(tt),ot=tt)},reset:function(){L=!1,he=null,te=null,pe=null,ge=null,se=null,Ue=null,Re=null,ot=null}}}const a=new t,s=new n,o=new r,l=new WeakMap,c=new WeakMap;let d={},u={},f={},h=new WeakMap,g=[],S=null,m=!1,p=null,w=null,R=null,M=null,b=null,y=null,A=null,v=new Ve(0,0,0),T=0,P=!1,U=null,O=null,z=null,I=null,G=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=ae>=1):Y.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=ae>=2);let ne=null,re={};const Te=i.getParameter(i.SCISSOR_BOX),Ae=i.getParameter(i.VIEWPORT),et=new Mt().fromArray(Te),J=new Mt().fromArray(Ae);function ee(L,he,te,pe){const ge=new Uint8Array(4),se=i.createTexture();i.bindTexture(L,se),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<te;Ue++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,ge):i.texImage2D(he+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ge);return se}const H={};H[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),H[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),H[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),q(i.DEPTH_TEST),s.setFunc(ar),Xe(!1),ft(Ho),q(i.CULL_FACE),Qe(Tn);function q(L){d[L]!==!0&&(i.enable(L),d[L]=!0)}function oe(L){d[L]!==!1&&(i.disable(L),d[L]=!1)}function Oe(L,he){return f[L]!==he?(i.bindFramebuffer(L,he),f[L]=he,L===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=he),L===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Se(L,he){let te=g,pe=!1;if(L){te=h.get(he),te===void 0&&(te=[],h.set(he,te));const ge=L.textures;if(te.length!==ge.length||te[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Ue=ge.length;se<Ue;se++)te[se]=i.COLOR_ATTACHMENT0+se;te.length=ge.length,pe=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,pe=!0);pe&&i.drawBuffers(te)}function ze(L){return S!==L?(i.useProgram(L),S=L,!0):!1}const pt={[Li]:i.FUNC_ADD,[gu]:i.FUNC_SUBTRACT,[vu]:i.FUNC_REVERSE_SUBTRACT};pt[xu]=i.MIN,pt[Su]=i.MAX;const qe={[Mu]:i.ZERO,[bu]:i.ONE,[yu]:i.SRC_COLOR,[gc]:i.SRC_ALPHA,[Cu]:i.SRC_ALPHA_SATURATE,[Au]:i.DST_COLOR,[wu]:i.DST_ALPHA,[Eu]:i.ONE_MINUS_SRC_COLOR,[vc]:i.ONE_MINUS_SRC_ALPHA,[Ru]:i.ONE_MINUS_DST_COLOR,[Tu]:i.ONE_MINUS_DST_ALPHA,[Pu]:i.CONSTANT_COLOR,[Lu]:i.ONE_MINUS_CONSTANT_COLOR,[Du]:i.CONSTANT_ALPHA,[Iu]:i.ONE_MINUS_CONSTANT_ALPHA};function Qe(L,he,te,pe,ge,se,Ue,Re,ot,tt){if(L===Tn){m===!0&&(oe(i.BLEND),m=!1);return}if(m===!1&&(q(i.BLEND),m=!0),L!==_u){if(L!==p||tt!==P){if((w!==Li||b!==Li)&&(i.blendEquation(i.FUNC_ADD),w=Li,b=Li),tt)switch(L){case rr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jr:i.blendFunc(i.ONE,i.ONE);break;case Vo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",L);break}else switch(L){case rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Vo:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wo:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",L);break}R=null,M=null,y=null,A=null,v.set(0,0,0),T=0,p=L,P=tt}return}ge=ge||he,se=se||te,Ue=Ue||pe,(he!==w||ge!==b)&&(i.blendEquationSeparate(pt[he],pt[ge]),w=he,b=ge),(te!==R||pe!==M||se!==y||Ue!==A)&&(i.blendFuncSeparate(qe[te],qe[pe],qe[se],qe[Ue]),R=te,M=pe,y=se,A=Ue),(Re.equals(v)===!1||ot!==T)&&(i.blendColor(Re.r,Re.g,Re.b,ot),v.copy(Re),T=ot),p=L,P=!1}function lt(L,he){L.side===pn?oe(i.CULL_FACE):q(i.CULL_FACE);let te=L.side===en;he&&(te=!te),Xe(te),L.blending===rr&&L.transparent===!1?Qe(Tn):Qe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),a.setMask(L.colorWrite);const pe=L.stencilWrite;o.setTest(pe),pe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ft(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?q(i.SAMPLE_ALPHA_TO_COVERAGE):oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(L){U!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),U=L)}function ft(L){L!==hu?(q(i.CULL_FACE),L!==O&&(L===Ho?i.cullFace(i.BACK):L===pu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):oe(i.CULL_FACE),O=L}function Tt(L){L!==z&&($&&i.lineWidth(L),z=L)}function Ft(L,he,te){L?(q(i.POLYGON_OFFSET_FILL),(I!==he||G!==te)&&(I=he,G=te,s.getReversed()&&(he=-he),i.polygonOffset(he,te))):oe(i.POLYGON_OFFSET_FILL)}function ut(L){L?q(i.SCISSOR_TEST):oe(i.SCISSOR_TEST)}function bt(L){L===void 0&&(L=i.TEXTURE0+Z-1),ne!==L&&(i.activeTexture(L),ne=L)}function D(L,he,te){te===void 0&&(ne===null?te=i.TEXTURE0+Z-1:te=ne);let pe=re[te];pe===void 0&&(pe={type:void 0,texture:void 0},re[te]=pe),(pe.type!==L||pe.texture!==he)&&(ne!==te&&(i.activeTexture(te),ne=te),i.bindTexture(L,he||H[L]),pe.type=L,pe.texture=he)}function xt(){const L=re[ne];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function rt(){try{i.compressedTexImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function _(){try{i.texSubImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function N(){try{i.texSubImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function le(){try{i.texStorage2D(...arguments)}catch(L){it("WebGLState:",L)}}function ue(){try{i.texStorage3D(...arguments)}catch(L){it("WebGLState:",L)}}function Q(){try{i.texImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function ie(){try{i.texImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function fe(L){return u[L]!==void 0?u[L]:i.getParameter(L)}function Le(L,he){u[L]!==he&&(i.pixelStorei(L,he),u[L]=he)}function me(L){et.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),et.copy(L))}function de(L){J.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),J.copy(L))}function De(L,he){let te=c.get(he);te===void 0&&(te=new WeakMap,c.set(he,te));let pe=te.get(L);pe===void 0&&(pe=i.getUniformBlockIndex(he,L.name),te.set(L,pe))}function Ne(L,he){const pe=c.get(he).get(L);l.get(he)!==pe&&(i.uniformBlockBinding(he,pe,L.__bindingPointIndex),l.set(he,pe))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},u={},ne=null,re={},f={},h=new WeakMap,g=[],S=null,m=!1,p=null,w=null,R=null,M=null,b=null,y=null,A=null,v=new Ve(0,0,0),T=0,P=!1,U=null,O=null,z=null,I=null,G=null,et.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:q,disable:oe,bindFramebuffer:Oe,drawBuffers:Se,useProgram:ze,setBlending:Qe,setMaterial:lt,setFlipSided:Xe,setCullFace:ft,setLineWidth:Tt,setPolygonOffset:Ft,setScissorTest:ut,activeTexture:bt,bindTexture:D,unbindTexture:xt,compressedTexImage2D:rt,compressedTexImage3D:E,texImage2D:Q,texImage3D:ie,pixelStorei:Le,getParameter:fe,updateUBOMapping:De,uniformBlockBinding:Ne,texStorage2D:le,texStorage3D:ue,texSubImage2D:_,texSubImage3D:N,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:me,viewport:de,reset:Ge}}function b1(i,e,t,n,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ke,d=new WeakMap,u=new Set;let f;const h=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(E,_){return g?new OffscreenCanvas(E,_):cr("canvas")}function m(E,_,N){let V=1;const K=rt(E);if((K.width>N||K.height>N)&&(V=N/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const le=Math.floor(V*K.width),ue=Math.floor(V*K.height);f===void 0&&(f=S(le,ue));const Q=_?S(le,ue):f;return Q.width=le,Q.height=ue,Q.getContext("2d").drawImage(E,0,0,le,ue),Be("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+le+"x"+ue+")."),Q}else return"data"in E&&Be("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function p(E){return E.generateMipmaps}function w(E){i.generateMipmap(E)}function R(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(E,_,N,V,K,le=!1){if(E!==null){if(i[E]!==void 0)return i[E];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ue;V&&(ue=e.get("EXT_texture_norm16"),ue||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=_;if(_===i.RED&&(N===i.FLOAT&&(Q=i.R32F),N===i.HALF_FLOAT&&(Q=i.R16F),N===i.UNSIGNED_BYTE&&(Q=i.R8),N===i.UNSIGNED_SHORT&&ue&&(Q=ue.R16_EXT),N===i.SHORT&&ue&&(Q=ue.R16_SNORM_EXT)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.R8UI),N===i.UNSIGNED_SHORT&&(Q=i.R16UI),N===i.UNSIGNED_INT&&(Q=i.R32UI),N===i.BYTE&&(Q=i.R8I),N===i.SHORT&&(Q=i.R16I),N===i.INT&&(Q=i.R32I)),_===i.RG&&(N===i.FLOAT&&(Q=i.RG32F),N===i.HALF_FLOAT&&(Q=i.RG16F),N===i.UNSIGNED_BYTE&&(Q=i.RG8),N===i.UNSIGNED_SHORT&&ue&&(Q=ue.RG16_EXT),N===i.SHORT&&ue&&(Q=ue.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.RG8UI),N===i.UNSIGNED_SHORT&&(Q=i.RG16UI),N===i.UNSIGNED_INT&&(Q=i.RG32UI),N===i.BYTE&&(Q=i.RG8I),N===i.SHORT&&(Q=i.RG16I),N===i.INT&&(Q=i.RG32I)),_===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),N===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),N===i.UNSIGNED_INT&&(Q=i.RGB32UI),N===i.BYTE&&(Q=i.RGB8I),N===i.SHORT&&(Q=i.RGB16I),N===i.INT&&(Q=i.RGB32I)),_===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),N===i.UNSIGNED_INT&&(Q=i.RGBA32UI),N===i.BYTE&&(Q=i.RGBA8I),N===i.SHORT&&(Q=i.RGBA16I),N===i.INT&&(Q=i.RGBA32I)),_===i.RGB&&(N===i.UNSIGNED_SHORT&&ue&&(Q=ue.RGB16_EXT),N===i.SHORT&&ue&&(Q=ue.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),_===i.RGBA){const ie=le?ra:Je.getTransfer(K);N===i.FLOAT&&(Q=i.RGBA32F),N===i.HALF_FLOAT&&(Q=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Q=ie===st?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&ue&&(Q=ue.RGBA16_EXT),N===i.SHORT&&ue&&(Q=ue.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function b(E,_){let N;return E?_===null||_===Rn||_===or?N=i.DEPTH24_STENCIL8:_===En?N=i.DEPTH32F_STENCIL8:_===sr&&(N=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Rn||_===or?N=i.DEPTH_COMPONENT24:_===En?N=i.DEPTH_COMPONENT32F:_===sr&&(N=i.DEPTH_COMPONENT16),N}function y(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==wt&&E.minFilter!==Yt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){const _=E.target;_.removeEventListener("dispose",A),T(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&u.delete(_)}function v(E){const _=E.target;_.removeEventListener("dispose",v),U(_)}function T(E){const _=n.get(E);if(_.__webglInit===void 0)return;const N=E.source,V=h.get(N);if(V){const K=V[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&P(E),Object.keys(V).length===0&&h.delete(N)}n.remove(E)}function P(E){const _=n.get(E);i.deleteTexture(_.__webglTexture);const N=E.source,V=h.get(N);delete V[_.__cacheKey],s.memory.textures--}function U(E){const _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let K=0;K<_.__webglFramebuffer[V].length;K++)i.deleteFramebuffer(_.__webglFramebuffer[V][K]);else i.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)i.deleteFramebuffer(_.__webglFramebuffer[V]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=E.textures;for(let V=0,K=N.length;V<K;V++){const le=n.get(N[V]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),s.memory.textures--),n.remove(N[V])}n.remove(E)}let O=0;function z(){O=0}function I(){return O}function G(E){O=E}function Z(){const E=O;return E>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,E}function $(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function ae(E,_){const N=n.get(E);if(E.isVideoTexture&&D(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){const V=E.image;if(V===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{oe(N,E,_);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function Y(E,_){const N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){oe(N,E,_);return}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function ne(E,_){const N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){oe(N,E,_);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function re(E,_){const N=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&N.__version!==E.version){Oe(N,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}const Te={[ci]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[fs]:i.MIRRORED_REPEAT},Ae={[wt]:i.NEAREST,[Fu]:i.NEAREST_MIPMAP_NEAREST,[Di]:i.NEAREST_MIPMAP_LINEAR,[Yt]:i.LINEAR,[va]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},et={[zu]:i.NEVER,[Xu]:i.ALWAYS,[Gu]:i.LESS,[mo]:i.LEQUAL,[Hu]:i.EQUAL,[_o]:i.GEQUAL,[Vu]:i.GREATER,[Wu]:i.NOTEQUAL};function J(E,_){if(_.type===En&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Yt||_.magFilter===va||_.magFilter===Di||_.magFilter===ai||_.minFilter===Yt||_.minFilter===va||_.minFilter===Di||_.minFilter===ai)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Te[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Te[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Te[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Ae[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Ae[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,et[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===wt||_.minFilter!==Di&&_.minFilter!==ai||_.type===En&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ee(E,_){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const V=_.source;let K=h.get(V);K===void 0&&(K={},h.set(V,K));const le=$(_);if(le!==E.__cacheKey){K[le]===void 0&&(K[le]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,N=!0),K[le].usedTimes++;const ue=K[E.__cacheKey];ue!==void 0&&(K[E.__cacheKey].usedTimes--,ue.usedTimes===0&&P(_)),E.__cacheKey=le,E.__webglTexture=K[le].texture}return N}function H(E,_,N){return Math.floor(Math.floor(E/N)/_)}function q(E,_,N,V){const le=E.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,N,V,_.data);else{le.sort((Le,me)=>Le.start-me.start);let ue=0;for(let Le=1;Le<le.length;Le++){const me=le[ue],de=le[Le],De=me.start+me.count,Ne=H(de.start,_.width,4),Ge=H(me.start,_.width,4);de.start<=De+1&&Ne===Ge&&H(de.start+de.count-1,_.width,4)===Ne?me.count=Math.max(me.count,de.start+de.count-me.start):(++ue,le[ue]=de)}le.length=ue+1;const Q=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),fe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Le=0,me=le.length;Le<me;Le++){const de=le[Le],De=Math.floor(de.start/4),Ne=Math.ceil(de.count/4),Ge=De%_.width,L=Math.floor(De/_.width),he=Ne,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,Ge,L,he,te,N,V,_.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,fe)}}function oe(E,_,N){let V=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=i.TEXTURE_3D);const K=ee(E,_),le=_.source;t.bindTexture(V,E.__webglTexture,i.TEXTURE0+N);const ue=n.get(le);if(le.version!==ue.__version||K===!0){if(t.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const te=Je.getPrimaries(Je.workingColorSpace),pe=_.colorSpace===Zn?null:Je.getPrimaries(_.colorSpace),ge=_.colorSpace===Zn||te===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let ie=m(_.image,!1,r.maxTextureSize);ie=xt(_,ie);const fe=a.convert(_.format,_.colorSpace),Le=a.convert(_.type);let me=M(_.internalFormat,fe,Le,_.normalized,_.colorSpace,_.isVideoTexture);J(V,_);let de;const De=_.mipmaps,Ne=_.isVideoTexture!==!0,Ge=ue.__version===void 0||K===!0,L=le.dataReady,he=y(_,ie);if(_.isDepthTexture)me=b(_.format===si,_.type),Ge&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,me,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,me,ie.width,ie.height,0,fe,Le,null));else if(_.isDataTexture)if(De.length>0){Ne&&Ge&&t.texStorage2D(i.TEXTURE_2D,he,me,De[0].width,De[0].height);for(let te=0,pe=De.length;te<pe;te++)de=De[te],Ne?L&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,de.width,de.height,fe,Le,de.data):t.texImage2D(i.TEXTURE_2D,te,me,de.width,de.height,0,fe,Le,de.data);_.generateMipmaps=!1}else Ne?(Ge&&t.texStorage2D(i.TEXTURE_2D,he,me,ie.width,ie.height),L&&q(_,ie,fe,Le)):t.texImage2D(i.TEXTURE_2D,0,me,ie.width,ie.height,0,fe,Le,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ne&&Ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,me,De[0].width,De[0].height,ie.depth);for(let te=0,pe=De.length;te<pe;te++)if(de=De[te],_.format!==_n)if(fe!==null)if(Ne){if(L)if(_.layerUpdates.size>0){const ge=gl(de.width,de.height,_.format,_.type);for(const se of _.layerUpdates){const Ue=de.data.subarray(se*ge/de.data.BYTES_PER_ELEMENT,(se+1)*ge/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,se,de.width,de.height,1,fe,Ue)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,de.width,de.height,ie.depth,fe,de.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,me,de.width,de.height,ie.depth,0,de.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,de.width,de.height,ie.depth,fe,Le,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,me,de.width,de.height,ie.depth,0,fe,Le,de.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ne&&Ge&&t.texStorage2D(i.TEXTURE_2D,he,me,De[0].width,De[0].height);for(let te=0,pe=De.length;te<pe;te++)de=De[te],_.format!==_n?fe!==null?Ne?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,de.width,de.height,fe,de.data):t.compressedTexImage2D(i.TEXTURE_2D,te,me,de.width,de.height,0,de.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?L&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,de.width,de.height,fe,Le,de.data):t.texImage2D(i.TEXTURE_2D,te,me,de.width,de.height,0,fe,Le,de.data)}else if(_.isDataArrayTexture)if(Ne){if(Ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,me,ie.width,ie.height,ie.depth),L)if(_.layerUpdates.size>0){const te=gl(ie.width,ie.height,_.format,_.type);for(const pe of _.layerUpdates){const ge=ie.data.subarray(pe*te/ie.data.BYTES_PER_ELEMENT,(pe+1)*te/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,ie.width,ie.height,1,fe,Le,ge)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,fe,Le,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,ie.width,ie.height,ie.depth,0,fe,Le,ie.data);else if(_.isData3DTexture)Ne?(Ge&&t.texStorage3D(i.TEXTURE_3D,he,me,ie.width,ie.height,ie.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,fe,Le,ie.data)):t.texImage3D(i.TEXTURE_3D,0,me,ie.width,ie.height,ie.depth,0,fe,Le,ie.data);else if(_.isFramebufferTexture){if(Ge)if(Ne)t.texStorage2D(i.TEXTURE_2D,he,me,ie.width,ie.height);else{let te=ie.width,pe=ie.height;for(let ge=0;ge<he;ge++)t.texImage2D(i.TEXTURE_2D,ge,me,te,pe,0,fe,Le,null),te>>=1,pe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ie.parentNode!==te){te.appendChild(ie),u.add(_),te.onpaint=pe=>{const ge=pe.changedElements;for(const se of u)ge.includes(se.image)&&(se.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{const ge=i.RGBA,se=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ge,se,Ue,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Ne&&Ge){const te=rt(De[0]);t.texStorage2D(i.TEXTURE_2D,he,me,te.width,te.height)}for(let te=0,pe=De.length;te<pe;te++)de=De[te],Ne?L&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,fe,Le,de):t.texImage2D(i.TEXTURE_2D,te,me,fe,Le,de);_.generateMipmaps=!1}else if(Ne){if(Ge){const te=rt(ie);t.texStorage2D(i.TEXTURE_2D,he,me,te.width,te.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Le,ie)}else t.texImage2D(i.TEXTURE_2D,0,me,fe,Le,ie);p(_)&&w(V),ue.__version=le.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Oe(E,_,N){if(_.image.length!==6)return;const V=ee(E,_),K=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const le=n.get(K);if(K.version!==le.__version||V===!0){t.activeTexture(i.TEXTURE0+N);const ue=Je.getPrimaries(Je.workingColorSpace),Q=_.colorSpace===Zn?null:Je.getPrimaries(_.colorSpace),ie=_.colorSpace===Zn||ue===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const fe=_.isCompressedTexture||_.image[0].isCompressedTexture,Le=_.image[0]&&_.image[0].isDataTexture,me=[];for(let se=0;se<6;se++)!fe&&!Le?me[se]=m(_.image[se],!0,r.maxCubemapSize):me[se]=Le?_.image[se].image:_.image[se],me[se]=xt(_,me[se]);const de=me[0],De=a.convert(_.format,_.colorSpace),Ne=a.convert(_.type),Ge=M(_.internalFormat,De,Ne,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,he=le.__version===void 0||V===!0,te=K.dataReady;let pe=y(_,de);J(i.TEXTURE_CUBE_MAP,_);let ge;if(fe){L&&he&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ge,de.width,de.height);for(let se=0;se<6;se++){ge=me[se].mipmaps;for(let Ue=0;Ue<ge.length;Ue++){const Re=ge[Ue];_.format!==_n?De!==null?L?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,0,0,Re.width,Re.height,De,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,Ge,Re.width,Re.height,0,Re.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,0,0,Re.width,Re.height,De,Ne,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,Ge,Re.width,Re.height,0,De,Ne,Re.data)}}}else{if(ge=_.mipmaps,L&&he){ge.length>0&&pe++;const se=rt(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ge,se.width,se.height)}for(let se=0;se<6;se++)if(Le){L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,me[se].width,me[se].height,De,Ne,me[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ge,me[se].width,me[se].height,0,De,Ne,me[se].data);for(let Ue=0;Ue<ge.length;Ue++){const ot=ge[Ue].image[se].image;L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,0,0,ot.width,ot.height,De,Ne,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,Ge,ot.width,ot.height,0,De,Ne,ot.data)}}else{L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De,Ne,me[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Ge,De,Ne,me[se]);for(let Ue=0;Ue<ge.length;Ue++){const Re=ge[Ue];L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,0,0,De,Ne,Re.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,Ge,De,Ne,Re.image[se])}}}p(_)&&w(i.TEXTURE_CUBE_MAP),le.__version=K.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Se(E,_,N,V,K,le){const ue=a.convert(N.format,N.colorSpace),Q=a.convert(N.type),ie=M(N.internalFormat,ue,Q,N.normalized,N.colorSpace),fe=n.get(_),Le=n.get(N);if(Le.__renderTarget=_,!fe.__hasExternalTextures){const me=Math.max(1,_.width>>le),de=Math.max(1,_.height>>le);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,le,ie,me,de,_.depth,0,ue,Q,null):t.texImage2D(K,le,ie,me,de,0,ue,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),bt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,K,Le.__webglTexture,0,ut(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,K,Le.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(E,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){const V=_.depthTexture,K=V&&V.isDepthTexture?V.type:null,le=b(_.stencilBuffer,K),ue=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;bt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut(_),le,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut(_),le,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,le,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,E)}else{const V=_.textures;for(let K=0;K<V.length;K++){const le=V[K],ue=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),ie=M(le.internalFormat,ue,Q,le.normalized,le.colorSpace);bt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut(_),ie,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut(_),ie,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ie,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(E,_,N){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=n.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),J(i.TEXTURE_CUBE_MAP,_.depthTexture);const fe=a.convert(_.depthTexture.format),Le=a.convert(_.depthTexture.type);let me;_.depthTexture.format===Bn?me=i.DEPTH_COMPONENT24:_.depthTexture.format===si&&(me=i.DEPTH24_STENCIL8);for(let de=0;de<6;de++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,me,_.width,_.height,0,fe,Le,null)}}else ae(_.depthTexture,0);const le=K.__webglTexture,ue=ut(_),Q=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,ie=_.depthTexture.format===si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Bn)bt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,Q,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ie,Q,le,0);else if(_.depthTexture.format===si)bt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,Q,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ie,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qe(E){const _=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const V=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=V}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(N)for(let V=0;V<6;V++)pt(_.__webglFramebuffer[V],E,V);else{const V=E.texture.mipmaps;V&&V.length>0?pt(_.__webglFramebuffer[0],E,0):pt(_.__webglFramebuffer,E,0)}else if(N){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=i.createRenderbuffer(),ze(_.__webglDepthbuffer[V],E,!1);else{const K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,le)}}else{const V=E.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ze(_.__webglDepthbuffer,E,!1);else{const K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Qe(E,_,N){const V=n.get(E);_!==void 0&&Se(V.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&qe(E)}function lt(E){const _=E.texture,N=n.get(E),V=n.get(_);E.addEventListener("dispose",v);const K=E.textures,le=E.isWebGLCubeRenderTarget===!0,ue=K.length>1;if(ue||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=_.version,s.memory.textures++),le){N.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[Q]=[];for(let ie=0;ie<_.mipmaps.length;ie++)N.__webglFramebuffer[Q][ie]=i.createFramebuffer()}else N.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let Q=0;Q<_.mipmaps.length;Q++)N.__webglFramebuffer[Q]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ue)for(let Q=0,ie=K.length;Q<ie;Q++){const fe=n.get(K[Q]);fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture(),s.memory.textures++)}if(E.samples>0&&bt(E)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){const ie=K[Q];N.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[Q]);const fe=a.convert(ie.format,ie.colorSpace),Le=a.convert(ie.type),me=M(ie.internalFormat,fe,Le,ie.normalized,ie.colorSpace,E.isXRRenderTarget===!0),de=ut(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,me,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,N.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),ze(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),J(i.TEXTURE_CUBE_MAP,_);for(let Q=0;Q<6;Q++)if(_.mipmaps&&_.mipmaps.length>0)for(let ie=0;ie<_.mipmaps.length;ie++)Se(N.__webglFramebuffer[Q][ie],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ie);else Se(N.__webglFramebuffer[Q],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(_)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let Q=0,ie=K.length;Q<ie;Q++){const fe=K[Q],Le=n.get(fe);let me=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(me=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Le.__webglTexture),J(me,fe),Se(N.__webglFramebuffer,E,fe,i.COLOR_ATTACHMENT0+Q,me,0),p(fe)&&w(me)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Q=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,V.__webglTexture),J(Q,_),_.mipmaps&&_.mipmaps.length>0)for(let ie=0;ie<_.mipmaps.length;ie++)Se(N.__webglFramebuffer[ie],E,_,i.COLOR_ATTACHMENT0,Q,ie);else Se(N.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,Q,0);p(_)&&w(Q),t.unbindTexture()}E.depthBuffer&&qe(E)}function Xe(E){const _=E.textures;for(let N=0,V=_.length;N<V;N++){const K=_[N];if(p(K)){const le=R(E),ue=n.get(K).__webglTexture;t.bindTexture(le,ue),w(le),t.unbindTexture()}}}const ft=[],Tt=[];function Ft(E){if(E.samples>0){if(bt(E)===!1){const _=E.textures,N=E.width,V=E.height;let K=i.COLOR_BUFFER_BIT;const le=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(E),Q=_.length>1;if(Q)for(let fe=0;fe<_.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ie=E.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let fe=0;fe<_.length;fe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Le=n.get(_[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,N,V,0,0,N,V,K,i.NEAREST),l===!0&&(ft.length=0,Tt.length=0,ft.push(i.COLOR_ATTACHMENT0+fe),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&(ft.push(le),Tt.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let fe=0;fe<_.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,ue.__webglColorRenderbuffer[fe]);const Le=n.get(_[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){const _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ut(E){return Math.min(r.maxSamples,E.samples)}function bt(E){const _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(E){const _=s.render.frame;d.get(E)!==_&&(d.set(E,_),E.update())}function xt(E,_){const N=E.colorSpace,V=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==ia&&N!==Zn&&(Je.getTransfer(N)===st?(V!==_n||K!==an)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",N)),_}function rt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=z,this.getTextureUnits=I,this.setTextureUnits=G,this.setTexture2D=ae,this.setTexture2DArray=Y,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=Qe,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function y1(i,e){function t(n,r=Zn){let a;const s=Je.getTransfer(r);if(n===an)return i.UNSIGNED_BYTE;if(n===co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sc)return i.BYTE;if(n===Mc)return i.SHORT;if(n===sr)return i.UNSIGNED_SHORT;if(n===lo)return i.INT;if(n===Rn)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Zt)return i.HALF_FLOAT;if(n===Ec)return i.ALPHA;if(n===wc)return i.RGB;if(n===_n)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===si)return i.DEPTH_STENCIL;if(n===Tc)return i.RED;if(n===uo)return i.RED_INTEGER;if(n===fi)return i.RG;if(n===ho)return i.RG_INTEGER;if(n===po)return i.RGBA_INTEGER;if(n===Vr||n===Wr||n===Xr||n===Yr)if(s===st)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Vr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Vr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===us||n===ds||n===hs||n===ps)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===us)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ds)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===hs)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ps)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ms||n===_s||n===gs||n===vs||n===xs||n===ea||n===Ss)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===ms||n===_s)return s===st?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===gs)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(n===vs)return a.COMPRESSED_R11_EAC;if(n===xs)return a.COMPRESSED_SIGNED_R11_EAC;if(n===ea)return a.COMPRESSED_RG11_EAC;if(n===Ss)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ms||n===bs||n===ys||n===Es||n===ws||n===Ts||n===As||n===Rs||n===Cs||n===Ps||n===Ls||n===Ds||n===Is||n===Us)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Ms)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bs)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ys)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Es)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ws)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ts)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===As)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rs)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cs)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ps)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ls)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ds)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Is)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Us)return s===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ns||n===Fs||n===Os)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===Ns)return s===st?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fs)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Os)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ks||n===Bs||n===ta||n===zs)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===ks)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Bs)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zs)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===or?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const E1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class T1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ic(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Lt({vertexShader:E1,fragmentShader:w1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new Bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A1 extends ui{constructor(e,t){super();const n=this;let r=null,a=1,s=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,h=null,g=null;const S=typeof XRWebGLBinding<"u",m=new T1,p={},w=t.getContextAttributes();let R=null,M=null;const b=[],y=[],A=new ke;let v=null,T=null;const P=new ln;P.viewport=new Mt;const U=new ln;U.viewport=new Mt;const O=[P,U],z=new Ud;let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let q=b[H];return q===void 0&&(q=new Aa,b[H]=q),q.getTargetRaySpace()},this.getControllerGrip=function(H){let q=b[H];return q===void 0&&(q=new Aa,b[H]=q),q.getGripSpace()},this.getHand=function(H){let q=b[H];return q===void 0&&(q=new Aa,b[H]=q),q.getHandSpace()};function Z(H){const q=y.indexOf(H.inputSource);if(q===-1)return;const oe=b[q];oe!==void 0&&(oe.update(H.inputSource,H.frame,c||s),oe.dispatchEvent({type:H.type,data:H.inputSource}))}function $(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let H=0;H<b.length;H++){const q=y[H];q!==null&&(y[H]=null,b[H].disconnect(q))}I=null,G=null,m.reset();for(const H in p)delete p[H];if(e.setRenderTarget(R),h=null,f=null,u=null,r=null,M=null,ee.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),T!==null){const H=T.camera;H.fov=T.fov,H.zoom=T.zoom,H.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){a=H,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u===null&&S&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(R=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),w.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,Oe=null,Se=null;w.depth&&(Se=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=w.stencil?si:Bn,Oe=w.stencil?or:Rn);const ze={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:a};u=this.getBinding(),f=u.createProjectionLayer(ze),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new zt(f.textureWidth,f.textureHeight,{format:_n,type:an,depthTexture:new ki(f.textureWidth,f.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const oe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:a};h=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),M=new zt(h.framebufferWidth,h.framebufferHeight,{format:_n,type:an,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(o),ee.setContext(r),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ae(H){for(let q=0;q<H.removed.length;q++){const oe=H.removed[q],Oe=y.indexOf(oe);Oe>=0&&(y[Oe]=null,b[Oe].disconnect(oe))}for(let q=0;q<H.added.length;q++){const oe=H.added[q];let Oe=y.indexOf(oe);if(Oe===-1){for(let ze=0;ze<b.length;ze++)if(ze>=y.length){y.push(oe),Oe=ze;break}else if(y[ze]===null){y[ze]=oe,Oe=ze;break}if(Oe===-1)break}const Se=b[Oe];Se&&Se.connect(oe)}}const Y=new F,ne=new F;function re(H,q,oe){Y.setFromMatrixPosition(q.matrixWorld),ne.setFromMatrixPosition(oe.matrixWorld);const Oe=Y.distanceTo(ne),Se=q.projectionMatrix.elements,ze=oe.projectionMatrix.elements,pt=Se[14]/(Se[10]-1),qe=Se[14]/(Se[10]+1),Qe=(Se[9]+1)/Se[5],lt=(Se[9]-1)/Se[5],Xe=(Se[8]-1)/Se[0],ft=(ze[8]+1)/ze[0],Tt=pt*Xe,Ft=pt*ft,ut=Oe/(-Xe+ft),bt=ut*-Xe;if(q.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(bt),H.translateZ(ut),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Se[10]===-1)H.projectionMatrix.copy(q.projectionMatrix),H.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const D=pt+ut,xt=qe+ut,rt=Tt-bt,E=Ft+(Oe-bt),_=Qe*qe/xt*D,N=lt*qe/xt*D;H.projectionMatrix.makePerspective(rt,E,_,N,D,xt),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function Te(H,q){q===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(q.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;let q=H.near,oe=H.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(oe=m.depthFar)),z.near=U.near=P.near=q,z.far=U.far=P.far=oe,(I!==z.near||G!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),I=z.near,G=z.far),z.layers.mask=H.layers.mask|6,P.layers.mask=z.layers.mask&-5,U.layers.mask=z.layers.mask&-3;const Oe=H.parent,Se=z.cameras;Te(z,Oe);for(let ze=0;ze<Se.length;ze++)Te(Se[ze],Oe);Se.length===2?re(z,P,U):z.projectionMatrix.copy(P.projectionMatrix),T===null&&H.isPerspectiveCamera&&(T={camera:H,fov:H.fov,zoom:H.zoom}),Ae(H,z,Oe)};function Ae(H,q,oe){oe===null?H.matrix.copy(q.matrixWorld):(H.matrix.copy(oe.matrixWorld),H.matrix.invert(),H.matrix.multiply(q.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(q.projectionMatrix),H.projectionMatrixInverse.copy(q.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Gs*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(H){l=H,f!==null&&(f.fixedFoveation=H),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=H)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(H){return p[H]};let et=null;function J(H,q){if(d=q.getViewerPose(c||s),g=q,d!==null){const oe=d.views;h!==null&&(e.setRenderTargetFramebuffer(M,h.framebuffer),e.setRenderTarget(M));let Oe=!1;oe.length!==z.cameras.length&&(z.cameras.length=0,Oe=!0);for(let qe=0;qe<oe.length;qe++){const Qe=oe[qe];let lt=null;if(h!==null)lt=h.getViewport(Qe);else{const ft=u.getViewSubImage(f,Qe);lt=ft.viewport,qe===0&&(e.setRenderTargetTextures(M,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(M))}let Xe=O[qe];Xe===void 0&&(Xe=new ln,Xe.layers.enable(qe),Xe.viewport=new Mt,O[qe]=Xe),Xe.matrix.fromArray(Qe.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Qe.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(lt.x,lt.y,lt.width,lt.height),qe===0&&(z.matrix.copy(Xe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Oe===!0&&z.cameras.push(Xe)}const Se=r.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){u=n.getBinding();const qe=u.getDepthInformation(oe[0]);qe&&qe.isValid&&qe.texture&&m.init(qe,r.renderState)}if(Se&&Se.includes("camera-access")&&S){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<oe.length;qe++){const Qe=oe[qe].camera;if(Qe){let lt=p[Qe];lt||(lt=new Ic,p[Qe]=lt);const Xe=u.getCameraImage(Qe);lt.sourceTexture=Xe}}}}for(let oe=0;oe<b.length;oe++){const Oe=y[oe],Se=b[oe];Oe!==null&&Se!==void 0&&Se.update(Oe,q,c||s)}et&&et(H,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),g=null}const ee=new Bc;ee.setAnimationLoop(J),this.setAnimationLoop=function(H){et=H},this.dispose=function(){}}}const R1=new vt,Yc=new He;Yc.set(-1,0,0,0,1,0,0,0,1);function C1(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Uc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,w,R,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(m,p):p.isMeshLambertMaterial?(a(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(m,p),u(m,p)):p.isMeshPhongMaterial?(a(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,M)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),S(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,R):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),R=w.envMap,M=w.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(R1.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Yc),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,R){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=R*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function P1(i,e,t,n){let r={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,b){const y=b.program;n.uniformBlockBinding(M,y)}function c(M,b){let y=r[M.id];y===void 0&&(m(M),y=d(M),r[M.id]=y,M.addEventListener("dispose",w));const A=b.program;n.updateUBOMapping(M,A);const v=e.render.frame;a[M.id]!==v&&(f(M),a[M.id]=v)}function d(M){const b=u();M.__bindingPointIndex=b;const y=i.createBuffer(),A=M.__size,v=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function u(){for(let M=0;M<o;M++)if(s.indexOf(M)===-1)return s.push(M),M;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const b=r[M.id],y=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let v=0,T=y.length;v<T;v++){const P=y[v];if(Array.isArray(P))for(let U=0,O=P.length;U<O;U++)h(P[U],v,U,A);else h(P,v,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(M,b,y,A){if(S(M,b,y,A)===!0){const v=M.__offset,T=M.value;if(Array.isArray(T)){let P=0;for(let U=0;U<T.length;U++){const O=T[U],z=p(O);g(O,M.__data,P),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,M.__data)}}function g(M,b,y){typeof M=="number"||typeof M=="boolean"?b[0]=M:M.isMatrix3?(b[0]=M.elements[0],b[1]=M.elements[1],b[2]=M.elements[2],b[3]=0,b[4]=M.elements[3],b[5]=M.elements[4],b[6]=M.elements[5],b[7]=0,b[8]=M.elements[6],b[9]=M.elements[7],b[10]=M.elements[8],b[11]=0):ArrayBuffer.isView(M)?b.set(new M.constructor(M.buffer,M.byteOffset,b.length)):M.toArray(b,y)}function S(M,b,y,A){const v=M.value,T=b+"_"+y;if(A[T]===void 0)return typeof v=="number"||typeof v=="boolean"?A[T]=v:ArrayBuffer.isView(v)?A[T]=v.slice():A[T]=v.clone(),!0;{const P=A[T];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return A[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(M){const b=M.uniforms;let y=0;const A=16;for(let T=0,P=b.length;T<P;T++){const U=Array.isArray(b[T])?b[T]:[b[T]];for(let O=0,z=U.length;O<z;O++){const I=U[O],G=Array.isArray(I.value)?I.value:[I.value];for(let Z=0,$=G.length;Z<$;Z++){const ae=G[Z],Y=p(ae),ne=y%A,re=ne%Y.boundary,Te=ne+re;y+=re,Te!==0&&A-Te<Y.storage&&(y+=A-Te),I.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=Y.storage}}}const v=y%A;return v>0&&(y+=A-v),M.__size=y,M.__cache={},this}function p(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",M),b}function w(M){const b=M.target;b.removeEventListener("dispose",w);const y=s.indexOf(b.__bindingPointIndex);s.splice(y,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete a[b.id]}function R(){for(const M in r)i.deleteBuffer(r[M]);s=[],r={},a={}}return{bind:l,update:c,dispose:R}}const L1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Sn=null;function D1(){return Sn===null&&(Sn=new vd(L1,16,16,fi,Zt),Sn.name="DFG_LUT",Sn.minFilter=Yt,Sn.magFilter=Yt,Sn.wrapS=On,Sn.wrapT=On,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}class qc{constructor(e={}){const{canvas:t=$u(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:h=an}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=s;const S=h,m=new Set([po,ho,uo]),p=new Set([an,Rn,sr,or,co,fo]),w=new Uint32Array(4),R=new Int32Array(4),M=new F;let b=null,y=null;const A=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let U=!1,O=null,z=null,I=null,G=null;this._outputColorSpace=kt;let Z=0,$=0,ae=null,Y=-1,ne=null;const re=new Mt,Te=new Mt;let Ae=null;const et=new Ve(0);let J=0,ee=t.width,H=t.height,q=1,oe=null,Oe=null;const Se=new Mt(0,0,ee,H),ze=new Mt(0,0,ee,H);let pt=!1;const qe=new bo;let Qe=!1,lt=!1;const Xe=new vt,ft=new F,Tt=new Mt,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function bt(){return ae===null?q:1}let D=n;function xt(x,C){return t.getContext(x,C)}let rt,E,_,N,V,K,le,ue,Q,ie,fe,Le,me,de,De,Ne,Ge,L,he,te,pe,ge,se;try{const x={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${eo}`),t.addEventListener("webglcontextlost",ot,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",W,!1),D===null){const C="webgl2";if(D=xt(C,x),D===null)throw xt(C)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(x){throw t.removeEventListener("webglcontextlost",ot,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",W,!1),it("WebGLRenderer: "+x.message),x}function Ue(){rt=new Dm(D),rt.init(),pe=new y1(D,rt),E=new bm(D,rt,e,pe),_=new M1(D,rt),E.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),z=D.createFramebuffer(),I=D.createFramebuffer(),G=D.createFramebuffer(),N=new Nm(D),V=new o1,K=new b1(D,rt,_,V,E,pe,N),le=new Lm(P),ue=new Od(D),ge=new Sm(D,ue),Q=new Im(D,ue,N,ge),ie=new Om(D,Q,ue,ge,N),L=new Fm(D,E,K),De=new ym(V),fe=new s1(P,le,rt,E,ge,De),Le=new C1(P,V),me=new c1,de=new m1(rt),Ge=new xm(P,le,_,ie,g,l),Ne=new S1(P,ie,E),se=new P1(D,N,E,_),he=new Mm(D,rt,N),te=new Um(D,rt,N),N.programs=fe.programs,P.capabilities=E,P.extensions=rt,P.properties=V,P.renderLists=me,P.shadowMap=Ne,P.state=_,P.info=N}S!==an&&(T=new Bm(S,t.width,t.height,o,r,a));const Re=new A1(P,D);this.xr=Re,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=rt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=rt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(x){x!==void 0&&(q=x,this.setSize(ee,H,!1))},this.getSize=function(x){return x.set(ee,H)},this.setSize=function(x,C,X=!0){if(Re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=x,H=C,t.width=Math.floor(x*q),t.height=Math.floor(C*q),X===!0&&(t.style.width=x+"px",t.style.height=C+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,x,C)},this.getDrawingBufferSize=function(x){return x.set(ee*q,H*q).floor()},this.setDrawingBufferSize=function(x,C,X){ee=x,H=C,q=X,t.width=Math.floor(x*X),t.height=Math.floor(C*X),this.setViewport(0,0,x,C)},this.setEffects=function(x){if(S===an){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let C=0;C<x.length;C++)if(x[C].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(re)},this.getViewport=function(x){return x.copy(Se)},this.setViewport=function(x,C,X,k){x.isVector4?Se.set(x.x,x.y,x.z,x.w):Se.set(x,C,X,k),_.viewport(re.copy(Se).multiplyScalar(q).round())},this.getScissor=function(x){return x.copy(ze)},this.setScissor=function(x,C,X,k){x.isVector4?ze.set(x.x,x.y,x.z,x.w):ze.set(x,C,X,k),_.scissor(Te.copy(ze).multiplyScalar(q).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(x){_.setScissorTest(pt=x)},this.setOpaqueSort=function(x){oe=x},this.setTransparentSort=function(x){Oe=x},this.getClearColor=function(x){return x.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(x=!0,C=!0,X=!0){let k=0;if(x){let B=!1;if(ae!==null){const xe=ae.texture.format;B=m.has(xe)}if(B){const xe=ae.texture.type,we=p.has(xe),ve=Ge.getClearColor(),Ce=Ge.getClearAlpha(),Ie=ve.r,$e=ve.g,Ze=ve.b;we?(w[0]=Ie,w[1]=$e,w[2]=Ze,w[3]=Ce,D.clearBufferuiv(D.COLOR,0,w)):(R[0]=Ie,R[1]=$e,R[2]=Ze,R[3]=Ce,D.clearBufferiv(D.COLOR,0,R))}else k|=D.COLOR_BUFFER_BIT}C&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),O=x},this.dispose=function(){t.removeEventListener("webglcontextlost",ot,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",W,!1),Ge.dispose(),me.dispose(),de.dispose(),V.dispose(),le.dispose(),ie.dispose(),ge.dispose(),se.dispose(),fe.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Ot),Re.removeEventListener("sessionend",gn),tn.stop()};function ot(x){x.preventDefault(),qo("WebGLRenderer: Context Lost."),U=!0}function tt(){qo("WebGLRenderer: Context Restored."),U=!1;const x=N.autoReset,C=Ne.enabled,X=Ne.autoUpdate,k=Ne.needsUpdate,B=Ne.type;Ue(),N.autoReset=x,Ne.enabled=C,Ne.autoUpdate=X,Ne.needsUpdate=k,Ne.type=B}function W(x){it("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function j(x){const C=x.target;C.removeEventListener("dispose",j),Me(C)}function Me(x){Ee(x),V.remove(x)}function Ee(x){const C=V.get(x).programs;C!==void 0&&(C.forEach(function(X){fe.releaseProgram(X)}),x.isShaderMaterial&&fe.releaseShaderCache(x))}this.renderBufferDirect=function(x,C,X,k,B,xe){C===null&&(C=Ft);const we=B.isMesh&&B.matrixWorld.determinantAffine()<0,ve=sf(x,C,X,k,B);_.setMaterial(k,we);let Ce=X.index,Ie=1;if(k.wireframe===!0){if(Ce=Q.getWireframeAttribute(X),Ce===void 0)return;Ie=2}const $e=X.drawRange,Ze=X.attributes.position;let Pe=$e.start*Ie,at=($e.start+$e.count)*Ie;xe!==null&&(Pe=Math.max(Pe,xe.start*Ie),at=Math.min(at,(xe.start+xe.count)*Ie)),Ce!==null?(Pe=Math.max(Pe,0),at=Math.min(at,Ce.count)):Ze!=null&&(Pe=Math.max(Pe,0),at=Math.min(at,Ze.count));const At=at-Pe;if(At<0||At===1/0)return;ge.setup(B,k,ve,X,Ce);let _t,ht=he;if(Ce!==null&&(_t=ue.get(Ce),ht=te,ht.setIndex(_t)),B.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*bt()),ht.setMode(D.LINES)):ht.setMode(D.TRIANGLES);else if(B.isLine){let Ht=k.linewidth;Ht===void 0&&(Ht=1),_.setLineWidth(Ht*bt()),B.isLineSegments?ht.setMode(D.LINES):B.isLineLoop?ht.setMode(D.LINE_LOOP):ht.setMode(D.LINE_STRIP)}else B.isPoints?ht.setMode(D.POINTS):B.isSprite&&ht.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))ht.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ht=B._multiDrawStarts,be=B._multiDrawCounts,qt=B._multiDrawCount,nt=Ce?ue.get(Ce).bytesPerElement:1,sn=V.get(k).currentProgram.getUniforms();for(let vn=0;vn<qt;vn++)sn.setValue(D,"_gl_DrawID",vn),ht.render(Ht[vn]/nt,be[vn])}else if(B.isInstancedMesh)ht.renderInstances(Pe,At,B.count);else if(X.isInstancedBufferGeometry){const Ht=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,be=Math.min(X.instanceCount,Ht);ht.renderInstances(Pe,At,be)}else ht.render(Pe,At)};function Fe(x,C,X,k){O!==null&&x.isNodeMaterial&&O.setObject(k,x),Qe===!0&&De.setState(x,X,!1),x.transparent===!0&&x.side===pn&&x.forceSinglePass===!1?(x.side=en,x.needsUpdate=!0,mr(x,C,k),x.side=oi,x.needsUpdate=!0,mr(x,C,k),x.side=pn):mr(x,C,k)}this.compile=function(x,C,X=null){X===null&&(X=x),O!==null&&O.renderStart(x,C,X),y=de.get(X),y.init(C),v.push(y),X.traverseVisible(function(B){B.isLight&&B.layers.test(C.layers)&&(y.pushLight(B),B.castShadow&&y.pushShadow(B))}),x!==X&&x.traverseVisible(function(B){B.isLight&&B.layers.test(C.layers)&&(y.pushLight(B),B.castShadow&&y.pushShadow(B))}),y.setupLights(),O!==null&&O.updateLights(y.state.lightsArray),lt=this.localClippingEnabled,Qe=De.init(this.clippingPlanes,lt),Qe===!0&&De.setGlobalState(this.clippingPlanes,C),O!==null&&Ne.render(y.state.shadowsArray,X,C);const k=new Set;return x.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const xe=B.material;if(xe)if(Array.isArray(xe))for(let we=0;we<xe.length;we++){const ve=xe[we];Fe(ve,X,C,B),k.add(ve)}else Fe(xe,X,C,B),k.add(xe)}),y=v.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(x,C,X=null){const k=this.compile(x,C,X);return new Promise(B=>{function xe(){if(k.forEach(function(we){const Ce=V.get(we).currentProgram;(Ce===void 0||Ce.isReady())&&k.delete(we)}),k.size===0){B(x);return}setTimeout(xe,10)}rt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let dt=null;function St(x){dt&&dt(x)}function Ot(){tn.stop()}function gn(){tn.start()}const tn=new Bc;tn.setAnimationLoop(St),typeof self<"u"&&tn.setContext(self),this.setAnimationLoop=function(x){dt=x,Re.setAnimationLoop(x),x===null?tn.stop():tn.start()},Re.addEventListener("sessionstart",Ot),Re.addEventListener("sessionend",gn),this.render=function(x,C){if(C!==void 0&&C.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;O!==null&&O.renderStart(x,C);const X=Re.enabled===!0&&Re.isPresenting===!0,k=T!==null&&(ae===null||X)&&T.begin(P,ae);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),C.parent===null&&C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(C),C=Re.getCamera()),x.isScene===!0&&x.onBeforeRender(P,x,C,ae),y=de.get(x,v.length),y.init(C),y.state.textureUnits=K.getTextureUnits(),v.push(y),Xe.multiplyMatrices(C.projectionMatrix,C.matrixWorldInverse),qe.setFromProjectionMatrix(Xe,wn,C.reversedDepth),lt=this.localClippingEnabled,Qe=De.init(this.clippingPlanes,lt),b=me.get(x,A.length),b.init(),A.push(b),Re.enabled===!0&&Re.isPresenting===!0){const we=P.xr.getDepthSensingMesh();we!==null&&Qn(we,C,-1/0,P.sortObjects)}Qn(x,C,0,P.sortObjects),b.finish(),O!==null&&O.updateLights(y.state.lightsArray),P.sortObjects===!0&&b.sort(oe,Oe),ut=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,ut&&Ge.addToRenderList(b,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Qe===!0&&De.beginShadows();const B=y.state.shadowsArray;if(Ne.render(B,x,C),Qe===!0&&De.endShadows(),(k&&T.hasRenderPass())===!1){const we=b.opaque,ve=b.transmissive;if(y.setupLights(),C.isArrayCamera){const Ce=C.cameras;if(ve.length>0)for(let Ie=0,$e=Ce.length;Ie<$e;Ie++){const Ze=Ce[Ie];hi(we,ve,x,Ze)}ut&&Ge.render(x);for(let Ie=0,$e=Ce.length;Ie<$e;Ie++){const Ze=Ce[Ie];di(b,x,Ze,Ze.viewport)}}else ve.length>0&&hi(we,ve,x,C),ut&&Ge.render(x),di(b,x,C)}ae!==null&&$===0&&(K.updateMultisampleRenderTarget(ae),K.updateRenderTargetMipmap(ae)),k&&T.end(P),x.isScene===!0&&x.onAfterRender(P,x,C),ge.resetDefaultState(),Y=-1,ne=null,v.pop(),v.length>0?(y=v[v.length-1],K.setTextureUnits(y.state.textureUnits),Qe===!0&&De.setGlobalState(P.clippingPlanes,y.state.camera)):y=null,A.pop(),A.length>0?b=A[A.length-1]:b=null,O!==null&&O.renderEnd()};function Qn(x,C,X,k){if(x.visible===!1)return;if(x.layers.test(C.layers)){if(x.isGroup)X=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(C);else if(x.isLightProbeGrid)y.pushLightProbeGrid(x);else if(x.isLight)y.pushLight(x),x.castShadow&&y.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(qe)){k&&Tt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Xe);const we=ie.update(x),ve=x.material;ve.visible&&b.push(x,we,ve,X,Tt.z,null,C)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(qe))){const we=ie.update(x),ve=x.material;if(k&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Tt.copy(x.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Tt.copy(we.boundingSphere.center)),Tt.applyMatrix4(x.matrixWorld).applyMatrix4(Xe)),Array.isArray(ve)){const Ce=we.groups;for(let Ie=0,$e=Ce.length;Ie<$e;Ie++){const Ze=Ce[Ie],Pe=ve[Ze.materialIndex];Pe&&Pe.visible&&b.push(x,we,Pe,X,Tt.z,Ze,C)}}else ve.visible&&b.push(x,we,ve,X,Tt.z,null,C)}}const xe=x.children;for(let we=0,ve=xe.length;we<ve;we++)Qn(xe[we],C,X,k)}function di(x,C,X,k){const{opaque:B,transmissive:xe,transparent:we}=x;y.setupLightsView(X),Qe===!0&&De.setGlobalState(P.clippingPlanes,X),k&&_.viewport(re.copy(k)),B.length>0&&pr(B,C,X),xe.length>0&&pr(xe,C,X),we.length>0&&pr(we,C,X),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function hi(x,C,X,k){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[k.id]===void 0){const Pe=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[k.id]=new zt(1,1,{generateMipmaps:!0,type:Pe?Zt:an,minFilter:ai,samples:Math.max(4,E.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const xe=y.state.transmissionRenderTarget[k.id],we=k.viewport||re;xe.setSize(we.z*P.transmissionResolutionScale,we.w*P.transmissionResolutionScale);const ve=P.getRenderTarget(),Ce=P.getActiveCubeFace(),Ie=P.getActiveMipmapLevel();P.setRenderTarget(xe),P.getClearColor(et),J=P.getClearAlpha(),J<1&&P.setClearColor(16777215,.5),P.clear(),ut&&Ge.render(X);const $e=P.toneMapping;P.toneMapping=An;const Ze=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),y.setupLightsView(k),Qe===!0&&De.setGlobalState(P.clippingPlanes,k),pr(x,X,k),K.updateMultisampleRenderTarget(xe),K.updateRenderTargetMipmap(xe),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let at=0,At=C.length;at<At;at++){const _t=C[at],{object:ht,geometry:Ht,material:be,group:qt}=_t;if(be.side===pn&&ht.layers.test(k.layers)){const nt=be.side;be.side=en,be.needsUpdate=!0,Uo(ht,X,k,Ht,be,qt),be.side=nt,be.needsUpdate=!0,Pe=!0}}Pe===!0&&(K.updateMultisampleRenderTarget(xe),K.updateRenderTargetMipmap(xe))}P.setRenderTarget(ve,Ce,Ie),P.setClearColor(et,J),Ze!==void 0&&(k.viewport=Ze),P.toneMapping=$e}function pr(x,C,X){const k=C.isScene===!0?C.overrideMaterial:null;for(let B=0,xe=x.length;B<xe;B++){const we=x[B],{object:ve,geometry:Ce,group:Ie}=we;let $e=we.material;$e.allowOverride===!0&&k!==null&&($e=k),ve.layers.test(X.layers)&&Uo(ve,C,X,Ce,$e,Ie)}}function Uo(x,C,X,k,B,xe){O!==null&&B.isNodeMaterial&&O.setObject(x,B),x.onBeforeRender(P,C,X,k,B,xe),x.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),B.onBeforeRender(P,C,X,k,x,xe),B.transparent===!0&&B.side===pn&&B.forceSinglePass===!1?(B.side=en,B.needsUpdate=!0,P.renderBufferDirect(X,C,k,B,x,xe),B.side=oi,B.needsUpdate=!0,P.renderBufferDirect(X,C,k,B,x,xe),B.side=pn):P.renderBufferDirect(X,C,k,B,x,xe),x.onAfterRender(P,C,X,k,B,xe)}function mr(x,C,X){C.isScene!==!0&&(C=Ft);const k=V.get(x),B=y.state.lights,xe=y.state.shadowsArray,we=B.state.version,ve=fe.getParameters(x,B.state,xe,C,X,y.state.lightProbeGridArray),Ce=fe.getProgramCacheKey(ve);let Ie=k.programs;k.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,k.fog=C.fog;const $e=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;k.envMap=le.get(x.envMap||k.environment,$e),k.envMapRotation=k.environment!==null&&x.envMap===null?C.environmentRotation:x.envMapRotation,Ie===void 0&&(x.addEventListener("dispose",j),Ie=new Map,k.programs=Ie);let Ze=Ie.get(Ce);if(Ze!==void 0){if(k.currentProgram===Ze&&k.lightsStateVersion===we)return Fo(x,ve),Ze}else ve.uniforms=fe.getUniforms(x),O!==null&&x.isNodeMaterial&&O.build(x,X,ve),x.onBeforeCompile(ve,P),Ze=fe.acquireProgram(ve,Ce),Ie.set(Ce,Ze),k.uniforms=ve.uniforms;const Pe=k.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Pe.clippingPlanes=De.uniform),Fo(x,ve),k.needsLights=lf(x),k.lightsStateVersion=we,k.needsLights&&(Pe.ambientLightColor.value=B.state.ambient,Pe.lightProbe.value=B.state.probe,Pe.sunLights.value=B.state.sun,Pe.sunLightShadows.value=B.state.sunShadow,Pe.directionalLights.value=B.state.directional,Pe.directionalLightShadows.value=B.state.directionalShadow,Pe.spotLights.value=B.state.spot,Pe.spotLightShadows.value=B.state.spotShadow,Pe.rectAreaLights.value=B.state.rectArea,Pe.ltc_1.value=B.state.rectAreaLTC1,Pe.ltc_2.value=B.state.rectAreaLTC2,Pe.pointLights.value=B.state.point,Pe.pointLightShadows.value=B.state.pointShadow,Pe.hemisphereLights.value=B.state.hemi,Pe.sunShadowMatrix.value=B.state.sunShadowMatrix,Pe.sunShadowCascade.value=B.state.sunShadowCascade,Pe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Pe.spotLightMatrix.value=B.state.spotLightMatrix,Pe.spotLightMap.value=B.state.spotLightMap,Pe.pointShadowMatrix.value=B.state.pointShadowMatrix),k.lightProbeGrid=y.state.lightProbeGridArray.length>0,k.currentProgram=Ze,k.uniformsList=null,Ze}function No(x){if(x.uniformsList===null){const C=x.currentProgram.getUniforms();x.uniformsList=$r.seqWithValue(C.seq,x.uniforms)}return x.uniformsList}function Fo(x,C){const X=V.get(x);X.outputColorSpace=C.outputColorSpace,X.batching=C.batching,X.batchingColor=C.batchingColor,X.instancing=C.instancing,X.instancingColor=C.instancingColor,X.instancingMorph=C.instancingMorph,X.skinning=C.skinning,X.morphTargets=C.morphTargets,X.morphNormals=C.morphNormals,X.morphColors=C.morphColors,X.morphTargetsCount=C.morphTargetsCount,X.numClippingPlanes=C.numClippingPlanes,X.numIntersection=C.numClipIntersection,X.vertexAlphas=C.vertexAlphas,X.vertexTangents=C.vertexTangents,X.toneMapping=C.toneMapping}function af(x,C){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;M.setFromMatrixPosition(C.matrixWorld);for(let X=0,k=x.length;X<k;X++){const B=x[X];if(B.texture!==null&&B.boundingBox.containsPoint(M))return B}return null}function sf(x,C,X,k,B){C.isScene!==!0&&(C=Ft),K.resetTextureUnits();const xe=C.fog,we=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?C.environment:null,ve=ae===null?P.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Je.workingColorSpace,Ce=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ie=le.get(k.envMap||we,Ce),$e=k.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ze=!!X.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pe=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,At=!!X.morphAttributes.color;let _t=An;k.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(_t=P.toneMapping);const ht=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ht=ht!==void 0?ht.length:0,be=V.get(k),qt=y.state.lights;if(Qe===!0&&(lt===!0||x!==ne)){const mt=x===ne&&k.id===Y;De.setState(k,x,mt)}let nt=!1;k.version===be.__version?(be.needsLights&&be.lightsStateVersion!==qt.state.version||be.outputColorSpace!==ve||B.isBatchedMesh&&be.batching===!1||!B.isBatchedMesh&&be.batching===!0||B.isBatchedMesh&&be.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&be.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&be.instancing===!1||!B.isInstancedMesh&&be.instancing===!0||B.isSkinnedMesh&&be.skinning===!1||!B.isSkinnedMesh&&be.skinning===!0||B.isInstancedMesh&&be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&be.instancingMorph===!1&&B.morphTexture!==null||be.envMap!==Ie||k.fog===!0&&be.fog!==xe||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==De.numPlanes||be.numIntersection!==De.numIntersection)||be.vertexAlphas!==$e||be.vertexTangents!==Ze||be.morphTargets!==Pe||be.morphNormals!==at||be.morphColors!==At||be.toneMapping!==_t||be.morphTargetsCount!==Ht||!!be.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,be.__version=k.version);let sn=be.currentProgram;nt===!0&&(sn=mr(k,C,B),O&&k.isNodeMaterial&&O.onUpdateProgram(k,sn,be));let vn=!1,Gn=!1,pi=!1;const ct=sn.getUniforms(),Et=be.uniforms;if(_.useProgram(sn.program)&&(vn=!0,Gn=!0,pi=!0),k.id!==Y&&(Y=k.id,Gn=!0),be.needsLights){const mt=af(y.state.lightProbeGridArray,B);be.lightProbeGrid!==mt&&(be.lightProbeGrid=mt,Gn=!0)}if(vn||ne!==x){_.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ct.setValue(D,"projectionMatrix",x.projectionMatrix),ct.setValue(D,"viewMatrix",x.matrixWorldInverse);const Vn=ct.map.cameraPosition;Vn!==void 0&&Vn.setValue(D,ft.setFromMatrixPosition(x.matrixWorld)),E.logarithmicDepthBuffer&&ct.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ct.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),ne!==x&&(ne=x,Gn=!0,pi=!0)}if(be.needsLights&&(qt.state.sunShadowMap.length>0&&ct.setValue(D,"sunShadowMap",qt.state.sunShadowMap,K),qt.state.directionalShadowMap.length>0&&ct.setValue(D,"directionalShadowMap",qt.state.directionalShadowMap,K),qt.state.spotShadowMap.length>0&&ct.setValue(D,"spotShadowMap",qt.state.spotShadowMap,K),qt.state.pointShadowMap.length>0&&ct.setValue(D,"pointShadowMap",qt.state.pointShadowMap,K)),B.isSkinnedMesh){ct.setOptional(D,B,"bindMatrix"),ct.setOptional(D,B,"bindMatrixInverse");const mt=B.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ct.setValue(D,"boneTexture",mt.boneTexture,K))}B.isBatchedMesh&&(ct.setOptional(D,B,"batchingTexture"),ct.setValue(D,"batchingTexture",B._matricesTexture,K),ct.setOptional(D,B,"batchingIdTexture"),ct.setValue(D,"batchingIdTexture",B._indirectTexture,K),ct.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&ct.setValue(D,"batchingColorTexture",B._colorsTexture,K));const Hn=X.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&L.update(B,X,sn),(Gn||be.receiveShadow!==B.receiveShadow)&&(be.receiveShadow=B.receiveShadow,ct.setValue(D,"receiveShadow",B.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&C.environment!==null&&(Et.envMapIntensity.value=C.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=D1()),Gn){if(ct.setValue(D,"toneMappingExposure",P.toneMappingExposure),be.needsLights&&of(Et,pi),xe&&k.fog===!0&&Le.refreshFogUniforms(Et,xe),Le.refreshMaterialUniforms(Et,k,q,H,y.state.transmissionRenderTarget[x.id]),be.needsLights&&be.lightProbeGrid){const mt=be.lightProbeGrid;Et.probesSH.value=mt.texture,Et.probesMin.value.copy(mt.boundingBox.min),Et.probesMax.value.copy(mt.boundingBox.max),Et.probesResolution.value.copy(mt.resolution)}$r.upload(D,No(be),Et,K)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&($r.upload(D,No(be),Et,K),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ct.setValue(D,"center",B.center),ct.setValue(D,"modelViewMatrix",B.modelViewMatrix),ct.setValue(D,"normalMatrix",B.normalMatrix),ct.setValue(D,"modelMatrix",B.matrixWorld),k.uniformsGroups!==void 0){const mt=k.uniformsGroups;for(let Vn=0,mi=mt.length;Vn<mi;Vn++){const ko=mt[Vn];se.update(ko,sn),se.bind(ko,sn)}}return sn}function of(x,C){x.ambientLightColor.needsUpdate=C,x.lightProbe.needsUpdate=C,x.sunLights.needsUpdate=C,x.sunLightShadows.needsUpdate=C,x.directionalLights.needsUpdate=C,x.directionalLightShadows.needsUpdate=C,x.pointLights.needsUpdate=C,x.pointLightShadows.needsUpdate=C,x.spotLights.needsUpdate=C,x.spotLightShadows.needsUpdate=C,x.rectAreaLights.needsUpdate=C,x.hemisphereLights.needsUpdate=C}function lf(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(x,C,X){const k=V.get(x);k.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),V.get(x.texture).__webglTexture=C,V.get(x.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:X,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,C){const X=V.get(x);X.__webglFramebuffer=C,X.__useDefaultFramebuffer=C===void 0},this.setRenderTarget=function(x,C=0,X=0){ae=x,Z=C,$=X;let k=null,B=!1,xe=!1;if(x){const ve=V.get(x);if(ve.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,ve.__webglFramebuffer),re.copy(x.viewport),Te.copy(x.scissor),Ae=x.scissorTest,_.viewport(re),_.scissor(Te),_.setScissorTest(Ae),Y=-1;return}else if(ve.__webglFramebuffer===void 0)K.setupRenderTarget(x);else if(ve.__hasExternalTextures)K.rebindTextures(x,V.get(x.texture).__webglTexture,V.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const $e=x.depthTexture;if(ve.__boundDepthTexture!==$e){if($e!==null&&V.has($e)&&(x.width!==$e.image.width||x.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(x)}}const Ce=x.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(xe=!0);const Ie=V.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ie[C])?k=Ie[C][X]:k=Ie[C],B=!0):x.samples>0&&K.useMultisampledRTT(x)===!1?k=V.get(x).__webglMultisampledFramebuffer:Array.isArray(Ie)?k=Ie[X]:k=Ie,re.copy(x.viewport),Te.copy(x.scissor),Ae=x.scissorTest}else re.copy(Se).multiplyScalar(q).floor(),Te.copy(ze).multiplyScalar(q).floor(),Ae=pt;if(X!==0&&(k=z),_.bindFramebuffer(D.FRAMEBUFFER,k)&&_.drawBuffers(x,k),_.viewport(re),_.scissor(Te),_.setScissorTest(Ae),B){const ve=V.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+C,ve.__webglTexture,X)}else if(xe){const ve=C;for(let Ce=0;Ce<x.textures.length;Ce++){const Ie=V.get(x.textures[Ce]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ce,Ie.__webglTexture,X,ve)}}else if(x!==null&&X!==0){const ve=V.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ve.__webglTexture,X)}Y=-1};function Oo(x){const C=V.get(x);return(C.__readFormat!==x.format||C.__readType!==x.type)&&(C.__readFormat=x.format,C.__readType=x.type,C.__formatReadable=E.textureFormatReadable(x.format),C.__typeReadable=E.textureTypeReadable(x.type)),C}this.readRenderTargetPixels=function(x,C,X,k,B,xe,we,ve=0){if(!(x&&x.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&we!==void 0&&(Ce=Ce[we]),Ce){_.bindFramebuffer(D.FRAMEBUFFER,Ce);try{const Ie=x.textures[ve],$e=Ie.format,Ze=Ie.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ve);const Pe=Oo(Ie);if(Pe.__formatReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}C>=0&&C<=x.width-k&&X>=0&&X<=x.height-B&&D.readPixels(C,X,k,B,pe.convert($e),pe.convert(Ze),xe)}finally{const Ie=ae!==null?V.get(ae).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(x,C,X,k,B,xe,we,ve=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=V.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&we!==void 0&&(Ce=Ce[we]),Ce)if(C>=0&&C<=x.width-k&&X>=0&&X<=x.height-B){_.bindFramebuffer(D.FRAMEBUFFER,Ce);const Ie=x.textures[ve],$e=Ie.format,Ze=Ie.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ve);const Pe=Oo(Ie);if(Pe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.bufferData(D.PIXEL_PACK_BUFFER,xe.byteLength,D.STREAM_READ),D.readPixels(C,X,k,B,pe.convert($e),pe.convert(Ze),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);const At=ae!==null?V.get(ae).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,At);const _t=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Ku(D,_t,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,xe),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(at),D.deleteSync(_t),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,C=null,X=0){const k=Math.pow(2,-X),B=Math.floor(x.image.width*k),xe=Math.floor(x.image.height*k),we=C!==null?C.x:0,ve=C!==null?C.y:0;K.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,we,ve,B,xe),_.unbindTexture()},this.copyTextureToTexture=function(x,C,X=null,k=null,B=0,xe=0){let we,ve,Ce,Ie,$e,Ze,Pe,at,At;const _t=x.isCompressedTexture?x.mipmaps[xe]:x.image;if(X!==null)we=X.max.x-X.min.x,ve=X.max.y-X.min.y,Ce=X.isBox3?X.max.z-X.min.z:1,Ie=X.min.x,$e=X.min.y,Ze=X.isBox3?X.min.z:0;else{const Et=Math.pow(2,-B);we=Math.floor(_t.width*Et),ve=Math.floor(_t.height*Et),x.isDataArrayTexture?Ce=_t.depth:x.isData3DTexture?Ce=Math.floor(_t.depth*Et):Ce=1,Ie=0,$e=0,Ze=0}k!==null?(Pe=k.x,at=k.y,At=k.z):(Pe=0,at=0,At=0);const ht=pe.convert(C.format),Ht=pe.convert(C.type);let be;C.isData3DTexture?(K.setTexture3D(C,0),be=D.TEXTURE_3D):C.isDataArrayTexture||C.isCompressedArrayTexture?(K.setTexture2DArray(C,0),be=D.TEXTURE_2D_ARRAY):(K.setTexture2D(C,0),be=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,C.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,C.unpackAlignment);const qt=_.getParameter(D.UNPACK_ROW_LENGTH),nt=_.getParameter(D.UNPACK_IMAGE_HEIGHT),sn=_.getParameter(D.UNPACK_SKIP_PIXELS),vn=_.getParameter(D.UNPACK_SKIP_ROWS),Gn=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,_t.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,_t.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ie),_.pixelStorei(D.UNPACK_SKIP_ROWS,$e),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Ze);const pi=x.isDataArrayTexture||x.isData3DTexture,ct=C.isDataArrayTexture||C.isData3DTexture;if(x.isDepthTexture){const Et=V.get(x),Hn=V.get(C),mt=V.get(Et.__renderTarget),Vn=V.get(Hn.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,mt.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let mi=0;mi<Ce;mi++)pi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(x).__webglTexture,B,Ze+mi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(C).__webglTexture,xe,At+mi)),D.blitFramebuffer(Ie,$e,we,ve,Pe,at,we,ve,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(B!==0||x.isRenderTargetTexture||V.has(x)){const Et=V.get(x),Hn=V.get(C);_.bindFramebuffer(D.READ_FRAMEBUFFER,I),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,G);for(let mt=0;mt<Ce;mt++)pi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Et.__webglTexture,B,Ze+mt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Et.__webglTexture,B),ct?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Hn.__webglTexture,xe,At+mt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Hn.__webglTexture,xe),B!==0?D.blitFramebuffer(Ie,$e,we,ve,Pe,at,we,ve,D.COLOR_BUFFER_BIT,D.NEAREST):ct?D.copyTexSubImage3D(be,xe,Pe,at,At+mt,Ie,$e,we,ve):D.copyTexSubImage2D(be,xe,Pe,at,Ie,$e,we,ve);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ct?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(be,xe,Pe,at,At,we,ve,Ce,ht,Ht,_t.data):C.isCompressedArrayTexture?D.compressedTexSubImage3D(be,xe,Pe,at,At,we,ve,Ce,ht,_t.data):D.texSubImage3D(be,xe,Pe,at,At,we,ve,Ce,ht,Ht,_t):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,xe,Pe,at,we,ve,ht,Ht,_t.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,xe,Pe,at,_t.width,_t.height,ht,_t.data):D.texSubImage2D(D.TEXTURE_2D,xe,Pe,at,we,ve,ht,Ht,_t);_.pixelStorei(D.UNPACK_ROW_LENGTH,qt),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,nt),_.pixelStorei(D.UNPACK_SKIP_PIXELS,sn),_.pixelStorei(D.UNPACK_SKIP_ROWS,vn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Gn),xe===0&&C.generateMipmaps&&D.generateMipmap(be),_.unbindTexture()},this.initRenderTarget=function(x){V.get(x).__webglFramebuffer===void 0&&K.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?K.setTextureCube(x,0):x.isData3DTexture?K.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?K.setTexture2DArray(x,0):K.setTexture2D(x,0),_.unbindTexture()},this.resetState=function(){Z=0,$=0,ae=null,_.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}var I1=function(e){var t=e.dt;return`
.p-slider {
    position: relative;
    background: `.concat(t("slider.track.background"),`;
    border-radius: `).concat(t("slider.track.border.radius"),`;
}

.p-slider-handle {
    cursor: grab;
    touch-action: none;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: `).concat(t("slider.handle.height"),`;
    width: `).concat(t("slider.handle.width"),`;
    background: `).concat(t("slider.handle.background"),`;
    border-radius: `).concat(t("slider.handle.border.radius"),`;
    transition: background `).concat(t("slider.transition.duration"),", color ").concat(t("slider.transition.duration"),", border-color ").concat(t("slider.transition.duration"),", box-shadow ").concat(t("slider.transition.duration"),", outline-color ").concat(t("slider.transition.duration"),`;
    outline-color: transparent;
}

.p-slider-handle::before {
    content: "";
    width: `).concat(t("slider.handle.content.width"),`;
    height: `).concat(t("slider.handle.content.height"),`;
    display: block;
    background: `).concat(t("slider.handle.content.background"),`;
    border-radius: `).concat(t("slider.handle.content.border.radius"),`;
    box-shadow: `).concat(t("slider.handle.content.shadow"),`;
    transition: background `).concat(t("slider.transition.duration"),`;
}

.p-slider:not(.p-disabled) .p-slider-handle:hover {
    background: `).concat(t("slider.handle.hover.background"),`;
}

.p-slider:not(.p-disabled) .p-slider-handle:hover::before {
    background: `).concat(t("slider.handle.content.hover.background"),`;
}

.p-slider-handle:focus-visible {
    box-shadow: `).concat(t("slider.handle.focus.ring.shadow"),`;
    outline: `).concat(t("slider.handle.focus.ring.width")," ").concat(t("slider.handle.focus.ring.style")," ").concat(t("slider.handle.focus.ring.color"),`;
    outline-offset: `).concat(t("slider.handle.focus.ring.offset"),`;
}

.p-slider-range {
    display: block;
    background: `).concat(t("slider.range.background"),`;
    border-radius: `).concat(t("slider.border.radius"),`;
}

.p-slider.p-slider-horizontal {
    height: `).concat(t("slider.track.size"),`;
}

.p-slider-horizontal .p-slider-range {
    inset-block-start: 0;
    inset-inline-start: 0;
    height: 100%;
}

.p-slider-horizontal .p-slider-handle {
    inset-block-start: 50%;
    margin-block-start: calc(-1 * calc(`).concat(t("slider.handle.height"),` / 2));
    margin-inline-start: calc(-1 * calc(`).concat(t("slider.handle.width"),` / 2));
}

.p-slider-vertical {
    min-height: 100px;
    width: `).concat(t("slider.track.size"),`;
}

.p-slider-vertical .p-slider-handle {
    inset-inline-start: 50%;
    margin-inline-start: calc(-1 * calc(`).concat(t("slider.handle.width"),` / 2));
    margin-block-end: calc(-1 * calc(`).concat(t("slider.handle.height"),` / 2));
}

.p-slider-vertical .p-slider-range {
    inset-block-end: 0;
    inset-inline-start: 0;
    width: 100%;
}
`)},U1={handle:{position:"absolute"},range:{position:"absolute"}},N1={root:function(e){var t=e.instance,n=e.props;return["p-slider p-component",{"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-slider-horizontal":n.orientation==="horizontal","p-slider-vertical":n.orientation==="vertical"}]},range:"p-slider-range",handle:"p-slider-handle"},F1=Mf.extend({name:"slider",theme:I1,classes:N1,inlineStyles:U1}),O1={name:"BaseSlider",extends:Lf,props:{min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:F1,provide:function(){return{$pcSlider:this,$parentInstance:this}}};function k1(i){return H1(i)||G1(i)||z1(i)||B1()}function B1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function z1(i,e){if(i){if(typeof i=="string")return qs(i,e);var t={}.toString.call(i).slice(8,-1);return t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set"?Array.from(i):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?qs(i,e):void 0}}function G1(i){if(typeof Symbol<"u"&&i[Symbol.iterator]!=null||i["@@iterator"]!=null)return Array.from(i)}function H1(i){if(Array.isArray(i))return qs(i)}function qs(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,n=Array(e);t<e;t++)n[t]=i[t];return n}var $c={name:"Slider",extends:O1,inheritAttrs:!1,emits:["change","slideend"],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var e=this.$el.getBoundingClientRect();this.initX=e.left+bf(),this.initY=e.top+yf(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(e){var t,n=e.touches?e.touches[0].pageX:e.pageX,r=e.touches?e.touches[0].pageY:e.pageY;this.orientation==="horizontal"?Ef(this.$el)?t=(this.initX+this.barWidth-n)*100/this.barWidth:t=(n-this.initX)*100/this.barWidth:t=(this.initY+this.barHeight-r)*100/this.barHeight;var a=(this.max-this.min)*(t/100)+this.min;if(this.step){var s=this.range?this.value[this.handleIndex]:this.value,o=a-s;o<0?a=s+Math.ceil(a/this.step-s/this.step)*this.step:o>0&&(a=s+Math.floor(a/this.step-s/this.step)*this.step)}else a=Math.floor(a);this.updateModel(e,a)},updateModel:function(e,t){var n=parseFloat(t.toFixed(10)),r;this.range?(r=this.value?k1(this.value):[],this.handleIndex==0?(n<this.min?n=this.min:n>=this.max&&(n=this.max),r[0]=n):(n>this.max?n=this.max:n<=this.min&&(n=this.min),r[1]=n)):(n<this.min?n=this.min:n>this.max&&(n=this.max),r=n),this.writeValue(r,e),this.$emit("change",r)},onDragStart:function(e,t){this.disabled||(this.$el.setAttribute("data-p-sliding",!0),this.dragging=!0,this.updateDomData(),this.range&&this.value[0]===this.max?this.handleIndex=0:this.handleIndex=t,e.currentTarget.focus())},onDrag:function(e){this.dragging&&this.setValue(e)},onDragEnd:function(e){this.dragging&&(this.dragging=!1,this.$el.setAttribute("data-p-sliding",!1),this.$emit("slideend",{originalEvent:e,value:this.value}))},onBarClick:function(e){this.disabled||wf(e.target,"data-pc-section")!=="handle"&&(this.updateDomData(),this.setValue(e))},onMouseDown:function(e,t){this.bindDragListeners(),this.onDragStart(e,t)},onKeyDown:function(e,t){switch(this.handleIndex=t,e.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(e,t),e.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(e,t),e.preventDefault();break;case"PageDown":this.decrementValue(e,t,!0),e.preventDefault();break;case"PageUp":this.incrementValue(e,t,!0),e.preventDefault();break;case"Home":this.updateModel(e,this.min),e.preventDefault();break;case"End":this.updateModel(e,this.max),e.preventDefault();break}},onBlur:function(e,t){var n,r;(n=(r=this.formField).onBlur)===null||n===void 0||n.call(r,e)},decrementValue:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,r;this.range?this.step?r=this.value[t]-this.step:r=this.value[t]-1:this.step?r=this.value-this.step:!this.step&&n?r=this.value-10:r=this.value-1,this.updateModel(e,r),e.preventDefault()},incrementValue:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,r;this.range?this.step?r=this.value[t]+this.step:r=this.value[t]+1:this.step?r=this.value+this.step:!this.step&&n?r=this.value+10:r=this.value+1,this.updateModel(e,r),e.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)},rangeStyle:function(){if(this.range){var e=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,t=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{"inset-inline-start":t+"%",width:e+"%"}:{bottom:t+"%",height:e+"%"}}else return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle:function(){return this.horizontal?{"inset-inline-start":this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},rangeStartHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle:function(){return this.horizontal?{"inset-inline-start":this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}},computed:{value:function(){var e;if(this.range){var t,n,r,a;return[(t=(n=this.d_value)===null||n===void 0?void 0:n[0])!==null&&t!==void 0?t:this.min,(r=(a=this.d_value)===null||a===void 0?void 0:a[1])!==null&&r!==void 0?r:this.max]}return(e=this.d_value)!==null&&e!==void 0?e:this.min},horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},handlePosition:function(){return this.value<this.min?0:this.value>this.max?100:(this.value-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.value&&this.value[0]!==void 0?this.value[0]<this.min?0:(this.value[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.value&&this.value.length===2&&this.value[1]!==void 0?this.value[1]>this.max?100:(this.value[1]-this.min)*100/(this.max-this.min):100}}},V1=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],W1=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],X1=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"];function Y1(i,e,t,n,r,a){return Ye(),Ke("div",Pi({class:i.cx("root"),onClick:e[18]||(e[18]=function(){return a.onBarClick&&a.onBarClick.apply(a,arguments)})},i.ptmi("root"),{"data-p-sliding":!1}),[ye("span",Pi({class:i.cx("range"),style:[i.sx("range"),a.rangeStyle()]},i.ptm("range")),null,16),i.range?jt("",!0):(Ye(),Ke("span",Pi({key:0,class:i.cx("handle"),style:[i.sx("handle"),a.handleStyle()],onTouchstartPassive:e[0]||(e[0]=function(s){return a.onDragStart(s)}),onTouchmovePassive:e[1]||(e[1]=function(s){return a.onDrag(s)}),onTouchend:e[2]||(e[2]=function(s){return a.onDragEnd(s)}),onMousedown:e[3]||(e[3]=function(s){return a.onMouseDown(s)}),onKeydown:e[4]||(e[4]=function(s){return a.onKeyDown(s)}),onBlur:e[5]||(e[5]=function(s){return a.onBlur(s)}),tabindex:i.tabindex,role:"slider","aria-valuemin":i.min,"aria-valuenow":i.d_value,"aria-valuemax":i.max,"aria-labelledby":i.ariaLabelledby,"aria-label":i.ariaLabel,"aria-orientation":i.orientation},i.ptm("handle")),null,16,V1)),i.range?(Ye(),Ke("span",Pi({key:1,class:i.cx("handle"),style:[i.sx("handle"),a.rangeStartHandleStyle()],onTouchstartPassive:e[6]||(e[6]=function(s){return a.onDragStart(s,0)}),onTouchmovePassive:e[7]||(e[7]=function(s){return a.onDrag(s)}),onTouchend:e[8]||(e[8]=function(s){return a.onDragEnd(s)}),onMousedown:e[9]||(e[9]=function(s){return a.onMouseDown(s,0)}),onKeydown:e[10]||(e[10]=function(s){return a.onKeyDown(s,0)}),onBlur:e[11]||(e[11]=function(s){return a.onBlur(s,0)}),tabindex:i.tabindex,role:"slider","aria-valuemin":i.min,"aria-valuenow":i.d_value?i.d_value[0]:null,"aria-valuemax":i.max,"aria-labelledby":i.ariaLabelledby,"aria-label":i.ariaLabel,"aria-orientation":i.orientation},i.ptm("startHandler")),null,16,W1)):jt("",!0),i.range?(Ye(),Ke("span",Pi({key:2,class:i.cx("handle"),style:[i.sx("handle"),a.rangeEndHandleStyle()],onTouchstartPassive:e[12]||(e[12]=function(s){return a.onDragStart(s,1)}),onTouchmovePassive:e[13]||(e[13]=function(s){return a.onDrag(s)}),onTouchend:e[14]||(e[14]=function(s){return a.onDragEnd(s)}),onMousedown:e[15]||(e[15]=function(s){return a.onMouseDown(s,1)}),onKeydown:e[16]||(e[16]=function(s){return a.onKeyDown(s,1)}),onBlur:e[17]||(e[17]=function(s){return a.onBlur(s,1)}),tabindex:i.tabindex,role:"slider","aria-valuemin":i.min,"aria-valuenow":i.d_value?i.d_value[1]:null,"aria-valuemax":i.max,"aria-labelledby":i.ariaLabelledby,"aria-label":i.ariaLabel,"aria-orientation":i.orientation},i.ptm("endHandler")),null,16,X1)):jt("",!0)],16)}$c.render=Y1;const Kt=64;function $s(i,e,t){return(t*i.width+e)*4}function*wo(i,e,t,n,r){for(let a=t;a<t+r;a++)for(let s=e;s<e+n;s++)yield $s(i,s,a)}function Kc(i,e,t,n,r){for(const a of wo(i,e,t,n,r))if(i.data[a+3]!==255)return!0;return!1}function Bl(i,e,t,n,r,a){for(const s of wo(i,e,t,n,r)){const o=i.data;if(o[s]!==a||o[s+1]!==a||o[s+2]!==a||o[s+3]!==255)return!1}return!0}function q1(i){const e=[[50,16,2,4],[54,20,2,12],[42,48,2,4],[46,52,2,12]];return e.some(t=>Kc(i,...t))||e.every(t=>Bl(i,...t,0))||e.every(t=>Bl(i,...t,255))}const $1=[[4,16,4,4,20,48],[8,16,4,4,24,48],[0,20,4,12,24,52],[4,20,4,12,20,52],[8,20,4,12,16,52],[12,20,4,12,28,52],[44,16,4,4,36,48],[48,16,4,4,40,48],[40,20,4,12,40,52],[44,20,4,12,36,52],[48,20,4,12,32,52],[52,20,4,12,44,52]],Zc=[[32,0,32,16]],K1=[...Zc,[0,32,64,16],[0,48,16,16],[48,48,16,16]];function Z1(i){const e=i.height===Kt/2;if(i.width!==Kt||i.height!==Kt&&!e)throw new Error(`not a skin: ${i.width}x${i.height}`);const t={data:new Uint8ClampedArray(Kt*Kt*4),width:Kt,height:Kt};if(t.data.set(i.data),e)for(const[n,r,a,s,o,l]of $1)for(let c=0;c<s;c++)for(let d=0;d<a;d++){const u=$s(t,n+d,r+c);t.data.set(t.data.subarray(u,u+4),$s(t,o+a-1-d,l+c))}if(!Kc(i,0,0,i.width,i.height))for(const n of e?Zc:K1)for(const r of wo(t,...n))t.data[r+3]=0;return{pixels:t,slim:q1(t)}}function J1(i,e,t,n,r){const a=(h,g,S,m)=>[[h/Kt,1-m/Kt],[S/Kt,1-m/Kt],[S/Kt,1-g/Kt],[h/Kt,1-g/Kt]],s=a(i+r,e,i+r+t,e+r),o=a(i+r+t,e,i+r+2*t,e+r),l=a(i,e+r,i+r,e+r+n),c=a(i+r,e+r,i+r+t,e+r+n),d=a(i+r+t,e+r,i+2*r+t,e+r+n),u=a(i+2*r+t,e+r,i+2*r+2*t,e+r+n),f=h=>[h[3],h[2],h[0],h[1]];return new Float32Array([f(d),f(l),f(s),[o[0],o[1],o[3],o[2]],f(c),f(u)].flat(2))}function zl(i,e,t,n){const[r,a,s]=i,o=new Xi(r+e,a+e,s+e);return o.getAttribute("uv").array.set(J1(t[0],t[1],r,a,s)),new Pt(o,n)}function Gl(i,e,t){const n=new Jn,r=t?3:4,a=(c,d,u,f,h,g,S)=>{const m=[zl(c,0,d,i)];e&&m.push(zl(c,f,u,e));for(const p of m)p.position.set(g,S,0),h.add(p)},s=new Jn;s.position.set(0,8,0),a([8,8,8],[0,0],[32,0],1,s,0,4),n.add(s),a([8,12,4],[16,16],[16,32],.5,n,0,2),a([4,12,4],[0,16],[0,32],.5,n,-1.9,-10),a([4,12,4],[16,48],[0,48],.5,n,1.9,-10);const o=new Jn,l=new Jn;return o.position.set(-4-r/2,6,0),l.position.set(4+r/2,6,0),a([r,12,4],[40,16],[40,32],.5,o,0,-4),a([r,12,4],[32,48],[48,48],.5,l,0,-4),n.add(o,l),{root:n,head:s,leftArm:l,rightArm:o}}function Hl(i){const e=document.createElement("canvas");e.width=i.width,e.height=i.height,e.getContext("2d").putImageData(new ImageData(i.data,i.width,i.height),0,0);const t=new ua(e);return t.magFilter=wt,t.minFilter=wt,t.generateMipmaps=!1,t.colorSpace=kt,t}function Vl(i){const e=t=>t.replace("varying vec2 vMapUv;","centroid varying vec2 vMapUv;");return i.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <uv_pars_vertex>",e(We.uv_pars_vertex)),t.fragmentShader=t.fragmentShader.replace("#include <uv_pars_fragment>",e(We.uv_pars_fragment))},i.customProgramCacheKey=()=>"skin-centroid",i}function Q1(i){const e=new Uint8ClampedArray(i.pixels.data);for(let t=3;t<e.length;t+=4)e[t]=255;return{inner:Vl(new Hs({map:Hl({...i.pixels,data:e})})),outer:Vl(new Hs({map:Hl(i.pixels),transparent:!0,alphaTest:1e-5,side:pn}))}}async function j1(i){const e=new Image;e.crossOrigin="anonymous",e.src=i,await e.decode();const t=document.createElement("canvas");t.width=e.naturalWidth,t.height=e.naturalHeight;const n=t.getContext("2d",{willReadFrequently:!0});return n.drawImage(e,0,0),Z1(n.getImageData(0,0,t.width,t.height))}function e0(i,e,t,n){const r=2*Math.PI/n,a=Math.exp(-r*t),s=e+r*i;return{offset:(i+s*t)*a,velocity:(e-r*s*t)*a}}function Za(i,e,t,n=.4,r=.4){const a=2*Math.PI/n;for(let s=t;s>0;s-=1/60){const o=Math.min(s,.016666666666666666);i.speed+=(-a*a*(i.angle-e)-2*r*a*i.speed)*o,i.angle+=i.speed*o}}const t0={"aria-label":"Plot on show",class:"card glass"},n0=["aria-label"],i0={key:0,class:"sr-only"},r0={key:1,"aria-hidden":"true",class:"text-base leading-none"},a0={key:2,"aria-hidden":"true",class:"rounded-md bg-slate-900/[0.06] px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600"},s0={class:"truncate text-[15px] font-semibold tracking-tight text-slate-900"},o0={"aria-label":"Other plots",class:"steps grid grid-cols-2 gap-1"},l0=["disabled","aria-label","title"],c0={class:"stack"},f0=["src"],u0={class:"truncate"},d0={key:1,"aria-hidden":"true"},h0=["disabled","aria-label","title"],p0={class:"stack justify-items-end"},m0={class:"truncate"},_0=["src"],g0={key:1,"aria-hidden":"true"},v0={class:"slice flex min-w-0 items-center gap-3"},x0={class:"track relative h-2.5 min-w-0 flex-1"},S0=["disabled"],M0=["aria-label"],b0={class:"hint truncate text-[11px] leading-4 text-slate-600"},y0="Drag to spin · scroll to zoom · Ctrl + scroll to slice",E0="Drag to spin · pinch to zoom",w0=3,T0=.011,Kn=.5,A0=.5,Wl=80,R0=.22,C0=.12,P0=.06,L0=8,Xl=.7,D0=17.5,I0=9,U0=9.5,Yl=28,ql=.12,N0=1.12,F0=ur({__name:"playerPanel",props:{uuid:{},name:{},score:{},rank:{},medal:{},prev:{},next:{},slice:{},landscape:{type:Boolean}},emits:["step","slice","back","log"],setup(i,{emit:e}){var Ae,et;const t=i,n=e,r={stone:"#8d939a",dirt:"#94704f",grass:"#6f9e4f",sky:"#8fb8e0"};function a(){const{cut:J,layers:ee}=t.slice;return ee>1?(J-1)/(ee-1):1}function s(){const{layers:J,surface:ee}=t.slice,H=Se=>`${Math.min(Math.max(Se,0),J)/J*100}%`,q=H(ee-w0),oe=H(ee),Oe=`calc(${oe} + 3px)`;return`linear-gradient(to right, ${r.stone} ${q}, ${r.dirt} ${q} ${oe}, ${r.grass} ${oe} ${Oe}, ${r.sky} ${Oe})`}const o=Ct(null),l=Ct(null),c=Ct(!1),d=du(),u=new qr,f=new ln(Yl,1,1,500);u.add(new Cd(16777215,9741240,2.4));const h=new kc(16777215,1.6);h.position.set(-8,16,12),u.add(h);let g=null,S=null,m=[],p=Kn,w=0,R=null,M=0,b=0;const y={angle:0,speed:0},A={angle:0,speed:0},v={angle:0,speed:0};let T=null,P=!0,U=!1,O=0;function z(){var J;S&&(u.remove(S.root),S.root.traverse(ee=>ee instanceof Pt&&ee.geometry.dispose()));for(const ee of m)(J=ee.map)==null||J.dispose(),ee.dispose();S=null,m=[]}function I(J,ee){z(),S=J,m=ee,J.leftArm.rotation.z=Math.PI*.02,J.rightArm.rotation.z=-Math.PI*.02,u.add(J.root),P=!0}function G(){const J=new Hs({color:9741240});I(Gl(J,null,!1),[J])}const Z=Ct("swap");let $={prev:(Ae=t.prev)==null?void 0:Ae.uuid,next:(et=t.next)==null?void 0:et.uuid};yn(()=>t.uuid,J=>{Z.value=J===$.next?"next":J===$.prev?"prev":"swap"}),yn(()=>{var J,ee;return[(J=t.prev)==null?void 0:J.uuid,(ee=t.next)==null?void 0:ee.uuid]},([J,ee])=>$={prev:J,next:ee},{flush:"post"}),yn(()=>t.uuid,()=>{var ee;const J={next:12,prev:-12,swap:0}[Z.value];(ee=l.value)==null||ee.animate([{opacity:0,transform:`translateX(${d.value==="reduce"?0:J}px)`},{opacity:1,transform:"none"}],{duration:220,easing:"cubic-bezier(0.23, 1, 0.32, 1)"})},{flush:"post"}),yn(()=>t.uuid,async J=>{const ee=++O;c.value=!1,G();try{const H=await j1(Df(J));if(ee!==O||U)return;const{inner:q,outer:oe}=Q1(H);I(Gl(q,oe,H.slim),[q,oe]),c.value=!0}catch(H){ee===O&&console.warn("[skin] could not load:",H)}},{immediate:!0});function ae(){const J=o.value;if(!g||!J)return;const ee=J.clientWidth||1,H=J.clientHeight||1;g.setSize(ee,H,!1),f.aspect=ee/H;const q=Math.max(I0,U0/f.aspect)*N0,oe=q/Math.tan(Yl*Math.PI/360),Oe=D0-q;f.position.set(0,Oe+oe*Math.sin(ql),oe*Math.cos(ql)),f.lookAt(0,Oe,0),f.updateProjectionMatrix(),P=!0}function Y(J){T=requestAnimationFrame(Y);const ee=b===0?0:Math.min((J-b)/1e3,.1);if(b=J,!(!g||!S)){if(R===null&&(p!==Kn||w!==0)){const H=e0(p-Kn,w,ee,A0),q=Math.abs(H.offset)<.001&&Math.abs(H.velocity)<.01;p=q?Kn:Kn+H.offset,w=q?0:H.velocity,P=!0}if(d.value!=="reduce"){const q=R!==null&&J-M>Wl?0:Math.max(-1,Math.min(1,w/L0));Za(y,-R0*q,ee),Za(A,C0*q,ee,void 0,Xl),Za(v,P0*q*q,ee,void 0,Xl),S.head.rotation.y=y.angle,S.rightArm.rotation.x=A.angle,S.leftArm.rotation.x=-A.angle;const oe=J/1e3*1.6;S.leftArm.rotation.z=Math.cos(oe)*.03+Math.PI*.02+v.angle,S.rightArm.rotation.z=Math.cos(oe+Math.PI)*.03-Math.PI*.02-v.angle,P=!0}P&&(P=!1,S.root.rotation.y=p,g.render(u,f))}}function ne(J){var ee;R=J.clientX,w=0,M=J.timeStamp,(ee=o.value)==null||ee.setPointerCapture(J.pointerId)}function re(J){if(R===null)return;const ee=(J.clientX-R)*T0,H=(J.timeStamp-M)/1e3;p+=ee,H>0&&(w=w*.4+ee/H*.6),R=J.clientX,M=J.timeStamp,P=!0}function Te(J){if(R===null)return;R=null,J.timeStamp-M>Wl&&(w=0);const ee=p-Kn;p=Kn+Math.atan2(Math.sin(ee),Math.cos(ee)),d.value==="reduce"&&(p=Kn,w=0),P=!0}return _c(o,ae),Qs(()=>{o.value&&(g=new qc({canvas:o.value,alpha:!0,antialias:!0}),g.setPixelRatio(Math.min(window.devicePixelRatio,2)),ae(),T=requestAnimationFrame(Y))}),la(()=>{U=!0,T!==null&&cancelAnimationFrame(T),z(),g==null||g.dispose(),g==null||g.forceContextLoss(),g=null}),(J,ee)=>{var H,q;return Ye(),Ke("section",t0,[ye("div",{ref_key:"bust",ref:l,class:"bust"},[ye("canvas",{ref_key:"canvas",ref:o,role:"img","aria-label":`${J.name}'s skin. Drag to turn.`,class:ri(["skin absolute inset-0 block size-full cursor-grab touch-none active:cursor-grabbing",{"skin--ready":c.value}]),onPointerdown:ne,onPointermove:re,onPointerup:Te,onPointercancel:Te},null,42,n0)],512),Qt(Fn,{name:`shift-${Z.value}`},{default:fn(()=>[(Ye(),Ke("p",{key:J.uuid,class:"name flex min-w-0 items-center gap-1.5"},[J.rank?(Ye(),Ke("span",i0,"Rank "+gt(J.rank)+",",1)):jt("",!0),J.medal?(Ye(),Ke("span",r0,gt(J.medal),1)):J.rank?(Ye(),Ke("span",a0," #"+gt(J.rank),1)):jt("",!0),ye("span",s0,gt(J.name),1)]))]),_:1},8,["name"]),Qt(Fn,{name:`shift-${Z.value}`},{default:fn(()=>[J.score?(Ye(),Ke("p",{key:J.uuid,class:"score text-2xl font-semibold leading-none tracking-tight tabular-nums text-slate-900"},[Jr(gt(J.score)+" ",1),ee[6]||(ee[6]=ye("span",{class:"text-xs font-medium tracking-normal text-slate-600"},"points",-1))])):(Ye(),Ke("p",{key:`${J.uuid}-unranked`,class:"score text-sm font-medium text-slate-600"}," Unranked "))]),_:1},8,["name"]),ye("nav",o0,[ye("button",{type:"button",class:"step",disabled:!J.prev,"aria-label":J.prev?`Previous plot: ${J.prev.name}`:"No previous plot",title:(H=J.prev)==null?void 0:H.name,onClick:ee[0]||(ee[0]=oe=>J.prev&&n("step",J.prev.uuid))},[ee[7]||(ee[7]=ye("i",{class:"pi pi-chevron-left text-[10px]","aria-hidden":"true"},null,-1)),ye("span",c0,[Qt(Fn,{name:`shift-${Z.value}`},{default:fn(()=>{var oe;return[(Ye(),Ke("span",{key:((oe=J.prev)==null?void 0:oe.uuid)??"first",class:"flex min-w-0 items-center gap-1.5"},[J.prev?(Ye(),Ke(nr,{key:0},[ye("img",{src:bn(ns)(J.prev.uuid),alt:"",class:"size-4 shrink-0 rounded-[3px]"},null,8,f0),ye("span",u0,gt(J.prev.name),1)],64)):(Ye(),Ke("span",d0,"First"))]))]}),_:1},8,["name"])])],8,l0),ye("button",{type:"button",class:"step justify-end",disabled:!J.next,"aria-label":J.next?`Next plot: ${J.next.name}`:"No next plot",title:(q=J.next)==null?void 0:q.name,onClick:ee[1]||(ee[1]=oe=>J.next&&n("step",J.next.uuid))},[ye("span",p0,[Qt(Fn,{name:`shift-${Z.value}`},{default:fn(()=>{var oe;return[(Ye(),Ke("span",{key:((oe=J.next)==null?void 0:oe.uuid)??"last",class:"flex min-w-0 items-center gap-1.5"},[J.next?(Ye(),Ke(nr,{key:0},[ye("span",m0,gt(J.next.name),1),ye("img",{src:bn(ns)(J.next.uuid),alt:"",class:"size-4 shrink-0 rounded-[3px]"},null,8,_0)],64)):(Ye(),Ke("span",g0,"Last"))]))]}),_:1},8,["name"])]),ee[8]||(ee[8]=ye("i",{class:"pi pi-chevron-right text-[10px]","aria-hidden":"true"},null,-1))],8,h0)]),ye("div",v0,[ee[9]||(ee[9]=ye("span",{class:"slice-label text-[11px] font-medium text-slate-600"},"Slice",-1)),ye("div",x0,[ye("div",{"aria-hidden":"true",class:"absolute inset-0 overflow-hidden rounded-full",style:Ui({background:s()})},[ye("div",{class:"absolute inset-y-0 right-0 bg-white/70",style:Ui({width:(1-a())*100+"%"})},null,4)],4),Qt(bn($c),{"model-value":J.slice.cut,min:1,max:J.slice.layers,disabled:J.slice.layers<2,"aria-label":"Slice height","onUpdate:modelValue":ee[2]||(ee[2]=oe=>n("slice",Number(oe)))},null,8,["model-value","max","disabled"]),ye("span",{"aria-hidden":"true",class:"readout pointer-events-none absolute whitespace-nowrap text-[11px] font-semibold tabular-nums text-slate-800",style:Ui({left:a()*100+"%"})}," Y "+gt(J.slice.worldY),5)])]),ye("button",{type:"button",class:"round reset",disabled:J.slice.cut===J.slice.layers,"aria-label":"Show the whole plot",title:"Whole plot",onClick:ee[3]||(ee[3]=oe=>n("slice",J.slice.layers))},ee[10]||(ee[10]=[ye("i",{class:"pi pi-undo text-[11px]","aria-hidden":"true"},null,-1)]),8,S0),ye("button",{type:"button",class:"round close","aria-label":"Back to the board",title:"Back to the board",onClick:ee[4]||(ee[4]=oe=>n("back"))},ee[11]||(ee[11]=[ye("i",{class:"pi pi-times text-[11px]","aria-hidden":"true"},null,-1)])),ye("button",{type:"button",class:"round log","aria-label":`Open ${J.name}'s collection log`,title:"Collection log",onClick:ee[5]||(ee[5]=oe=>n("log"))},ee[12]||(ee[12]=[ye("i",{class:"pi pi-th-large text-[11px]","aria-hidden":"true"},null,-1)]),8,M0),ye("p",b0,gt(J.landscape?y0:E0),1)])}}}),O0=oa(F0,[["__scopeId","data-v-60c022f8"]]),k0={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ke(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`};class To{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const B0=new Gi(-1,1,1,-1,0,1);class z0 extends Nt{constructor(){super(),this.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new yt([0,2,0,0,2,0],2))}}const G0=new z0;class Ao{constructor(e){this._mesh=new Pt(G0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,B0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class H0 extends To{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=fr.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ao(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class V0 extends H0{constructor(){super(k0)}setSize(e,t){this.material.uniforms.resolution.value.set(1/e,1/t)}}const kr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class W0 extends To{constructor(){super(),this.isOutputPass=!0,this.uniforms=fr.clone(kr.uniforms),this.material=new Nc({name:kr.name,uniforms:this.uniforms,vertexShader:kr.vertexShader,fragmentShader:kr.fragmentShader}),this._fsQuad=new Ao(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Je.getTransfer(this._outputColorSpace)===st&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===no?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===io?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ro?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ca?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===so?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===oo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ao&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Ja={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},X0={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ve(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Hi extends To{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new ke(e.x,e.y):new ke(256,256),this.clearColor=new Ve(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new zt(a,s,{type:Zt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new zt(a,s,{type:Zt,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new zt(a,s,{type:Zt,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),a=Math.round(a/2),s=Math.round(s/2)}const o=X0;this.highPassUniforms=fr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Lt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ke(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=fr.clone(Ja.uniforms),this.blendMaterial=new Lt({uniforms:this.copyUniforms,vertexShader:Ja.vertexShader,fragmentShader:Ja.fragmentShader,premultipliedAlpha:!0,blending:jr,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ve,this._oldClearAlpha=1,this._basic=new Mo,this._fsQuad=new Ao(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(n,r),this.renderTargetsVertical[a].setSize(n,r),this.separableBlurMaterials[a].uniforms.invSize.value=new ke(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Hi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Hi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);const r=[],a=[];for(let s=1;s<e;s+=2){const o=t[s],l=s+1<e?t[s+1]:0,c=o+l;r.push((s*o+(s+1)*l)/c),a.push(c)}return new Lt({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new ke(.5,.5)},direction:{value:new ke(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:a}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Hi.BlurDirectionX=new ke(1,0);Hi.BlurDirectionY=new ke(0,1);const Y0="/assets/blocks-BWyloO2-.png",q0=16,$l=4,Kl=24,Zl=32,zv=768,Gv=1368,$0=0,K0={Opaque:0,Cutout:1,Translucent:2},Kr={"minecraft:acacia_door":[1,1,1,1],"minecraft:acacia_door[half=upper]":[1719,1719,1719,1],"minecraft:acacia_hanging_sign":[1784,1784,1784,0],"minecraft:acacia_leaves":[2,2,2,1],"minecraft:acacia_leaves1":[3,3,3,1],"minecraft:acacia_leaves2":[4,4,4,1],"minecraft:acacia_log":[5,5,6,0],"minecraft:acacia_log1":[7,7,7,0],"minecraft:acacia_planks":[8,8,8,0],"minecraft:acacia_planks1":[9,9,9,0],"minecraft:acacia_planks2":[10,10,10,0],"minecraft:acacia_sapling":[11,11,11,1],"minecraft:acacia_shelf":[12,12,12,0],"minecraft:acacia_sign":[1784,1784,1784,0],"minecraft:acacia_trapdoor":[13,13,13,1],"minecraft:acacia_wall_sign":[1784,1784,1784,0],"minecraft:acacia_wood":[6,6,6,0],"minecraft:activator_rail":[14,14,14,1],"minecraft:activator_rail_on":[15,15,15,1],"minecraft:activator_rail_on_e":[16,16,16,1],"minecraft:activator_rail_on_e_s":[17,17,17,1],"minecraft:activator_rail_on_s":[18,18,18,1],"minecraft:allium":[19,19,19,1],"minecraft:amethyst_block":[20,20,20,0],"minecraft:amethyst_cluster":[21,21,21,1],"minecraft:amethyst_cluster_block":[22,22,22,1],"minecraft:ancient_debris":[23,23,24,0],"minecraft:andesite":[25,25,25,0],"minecraft:anvil":[26,26,27,0],"minecraft:anvil_base":[28,28,28,0],"minecraft:attached_melon_stem":[29,29,29,1],"minecraft:attached_pumpkin_stem":[30,30,30,1],"minecraft:attached_stem":[31,31,31,1],"minecraft:azalea":[34,34,35,1],"minecraft:azalea_leaves":[32,32,32,1],"minecraft:azalea_plant":[33,33,33,1],"minecraft:azure_bluet":[36,36,36,1],"minecraft:bad_omen_block":[37,37,37,0],"minecraft:bamboo":[1748,1748,1748,1],"minecraft:bamboo_block":[38,38,39,0],"minecraft:bamboo_door":[40,40,40,1],"minecraft:bamboo_door[half=upper]":[1720,1720,1720,1],"minecraft:bamboo_hanging_sign":[1790,1790,1790,0],"minecraft:bamboo_large_leaves":[41,41,41,1],"minecraft:bamboo_mosaic":[42,42,42,0],"minecraft:bamboo_planks":[43,43,43,0],"minecraft:bamboo_planks1":[44,44,44,0],"minecraft:bamboo_planks2":[45,45,45,0],"minecraft:bamboo_shelf":[46,46,46,0],"minecraft:bamboo_sign":[1790,1790,1790,0],"minecraft:bamboo_singleleaf":[47,47,47,1],"minecraft:bamboo_small_leaves":[48,48,48,1],"minecraft:bamboo_stage0":[49,49,49,1],"minecraft:bamboo_stalk":[50,50,50,0],"minecraft:bamboo_trapdoor":[51,51,51,1],"minecraft:bamboo_wall_sign":[1790,1790,1790,0],"minecraft:barrel":[52,53,54,0],"minecraft:barrel_top_open":[55,55,55,0],"minecraft:basalt":[56,56,57,0],"minecraft:beacon":[58,58,58,2],"minecraft:beacon_s":[59,59,59,1],"minecraft:bedrock":[60,60,60,0],"minecraft:bee_nest":[61,62,63,0],"minecraft:bee_nest_front":[64,64,64,0],"minecraft:bee_nest_front_honey":[65,65,65,0],"minecraft:beehive":[66,66,67,0],"minecraft:beehive_front":[68,68,68,0],"minecraft:beehive_front_honey":[69,69,69,0],"minecraft:beetroots":[73,73,73,1],"minecraft:beetroots_stage0":[70,70,70,1],"minecraft:beetroots_stage1":[71,71,71,1],"minecraft:beetroots_stage2":[72,72,72,1],"minecraft:beetroots_stage3":[73,73,73,1],"minecraft:beetroots_stage3_vegitable":[74,74,74,1],"minecraft:bell":[75,76,77,0],"minecraft:big_dripleaf":[78,78,79,1],"minecraft:big_dripleaf_stem":[80,80,80,1],"minecraft:big_dripleaf_tip":[81,81,81,1],"minecraft:birch_door":[82,82,82,1],"minecraft:birch_door[half=upper]":[1721,1721,1721,1],"minecraft:birch_hanging_sign":[1782,1782,1782,0],"minecraft:birch_leaves":[83,83,83,1],"minecraft:birch_leaves1":[84,84,84,1],"minecraft:birch_log":[85,85,86,0],"minecraft:birch_log1":[87,87,87,0],"minecraft:birch_planks":[88,88,88,0],"minecraft:birch_planks1":[89,89,89,0],"minecraft:birch_planks2":[90,90,90,0],"minecraft:birch_sapling":[91,91,91,1],"minecraft:birch_shelf":[92,92,92,0],"minecraft:birch_sign":[1782,1782,1782,0],"minecraft:birch_trapdoor":[93,93,93,1],"minecraft:birch_wall_sign":[1782,1782,1782,0],"minecraft:birch_wood":[86,86,86,0],"minecraft:black_banner":[102,102,102,0],"minecraft:black_bed":[94,94,94,0],"minecraft:black_candle":[95,95,95,1],"minecraft:black_candle_lit":[96,96,96,1],"minecraft:black_carpet":[102,102,102,0],"minecraft:black_concrete":[97,97,97,0],"minecraft:black_concrete_powder":[98,98,98,0],"minecraft:black_glazed_terracotta":[99,99,99,0],"minecraft:black_stained_glass":[100,100,100,2],"minecraft:black_terracotta":[101,101,101,0],"minecraft:black_wall_banner":[102,102,102,0],"minecraft:black_wool":[102,102,102,0],"minecraft:blackstone":[103,103,103,0],"minecraft:blast_furnace":[104,104,105,0],"minecraft:blast_furnace_front":[106,106,106,0],"minecraft:blast_furnace_front_on":[107,107,107,0],"minecraft:blast_furnace_front_on_e":[108,108,108,1],"minecraft:blast_furnace_front_on_e_s":[109,109,109,1],"minecraft:blast_furnace_front_on_s":[110,110,110,1],"minecraft:blue_banner":[121,121,121,0],"minecraft:blue_bed":[111,111,111,0],"minecraft:blue_candle":[95,95,95,1],"minecraft:blue_candle_lit":[112,112,112,1],"minecraft:blue_carpet":[121,121,121,0],"minecraft:blue_concrete":[113,113,113,0],"minecraft:blue_concrete_powder":[114,114,114,0],"minecraft:blue_glazed_terracotta":[115,115,115,0],"minecraft:blue_ice":[116,116,116,0],"minecraft:blue_orchid":[117,117,117,1],"minecraft:blue_stained_glass":[118,118,118,2],"minecraft:blue_terracotta":[119,119,119,0],"minecraft:blue_wall_banner":[121,121,121,0],"minecraft:blue_wildflowers":[120,120,120,1],"minecraft:blue_wool":[121,121,121,0],"minecraft:bone_block":[122,122,123,0],"minecraft:bookshelf":[124,124,125,0],"minecraft:bookshelf1":[126,126,126,0],"minecraft:bookshelf2":[127,127,127,0],"minecraft:brain_coral":[128,128,128,1],"minecraft:brain_coral_block":[129,129,129,0],"minecraft:brain_coral_fan":[130,130,130,1],"minecraft:brewing_stand":[131,132,131,1],"minecraft:brewing_stand_arm":[133,133,133,1],"minecraft:brewing_stand_base":[132,132,132,1],"minecraft:brewing_stand_base_e":[134,134,134,1],"minecraft:brewing_stand_base_e_s":[135,135,135,1],"minecraft:brewing_stand_base_s":[136,136,136,1],"minecraft:brewing_stand_e":[137,137,137,1],"minecraft:brewing_stand_e_s":[138,138,138,1],"minecraft:brewing_stand_potion":[139,139,139,1],"minecraft:brewing_stand_s":[140,140,140,1],"minecraft:bricks":[141,141,141,0],"minecraft:bricks1":[142,142,142,0],"minecraft:bricks2":[143,143,143,0],"minecraft:brown_banner":[153,153,153,0],"minecraft:brown_bed":[144,144,144,0],"minecraft:brown_candle":[95,95,95,1],"minecraft:brown_candle_lit":[145,145,145,1],"minecraft:brown_carpet":[153,153,153,0],"minecraft:brown_concrete":[146,146,146,0],"minecraft:brown_concrete_powder":[147,147,147,0],"minecraft:brown_glazed_terracotta":[148,148,148,0],"minecraft:brown_mushroom":[149,149,149,1],"minecraft:brown_mushroom_block":[150,150,150,0],"minecraft:brown_stained_glass":[151,151,151,2],"minecraft:brown_terracotta":[152,152,152,0],"minecraft:brown_wall_banner":[153,153,153,0],"minecraft:brown_wool":[153,153,153,0],"minecraft:bubble_coral":[154,154,154,1],"minecraft:bubble_coral_block":[155,155,155,0],"minecraft:bubble_coral_fan":[156,156,156,1],"minecraft:budding_amethyst":[157,157,157,0],"minecraft:bush":[158,158,158,1],"minecraft:bush1":[159,159,159,1],"minecraft:cactus":[160,161,162,1],"minecraft:cactus_flower":[163,163,163,1],"minecraft:cactus_flower_stem":[164,164,164,1],"minecraft:cake":[165,166,167,0],"minecraft:cake_inner":[168,168,168,1],"minecraft:calcite":[169,169,169,0],"minecraft:calibrated_sculk_sensor_amethyst":[170,170,170,1],"minecraft:campfire":[171,174,174,1],"minecraft:campfire_fire":[171,171,171,1],"minecraft:campfire_fire_e_s":[172,172,172,2],"minecraft:campfire_fire_s":[173,173,173,2],"minecraft:campfire_log":[174,174,174,1],"minecraft:campfire_log_lit":[175,175,175,1],"minecraft:candle":[95,95,95,1],"minecraft:candle_lit":[176,176,176,1],"minecraft:carrots":[180,180,180,1],"minecraft:carrots_stage0":[177,177,177,1],"minecraft:carrots_stage1":[178,178,178,1],"minecraft:carrots_stage2":[179,179,179,1],"minecraft:carrots_stage3":[180,180,180,1],"minecraft:carrots_stage3_vegitable":[181,181,181,1],"minecraft:cartography_table_side1":[182,182,182,0],"minecraft:cartography_table_side2":[183,183,183,0],"minecraft:cartography_table_side3":[184,184,184,0],"minecraft:carved_pumpkin":[185,185,186,0],"minecraft:cauldron":[187,188,189,0],"minecraft:cauldron_inner":[190,190,190,0],"minecraft:cave_vines":[191,191,191,1],"minecraft:cave_vines_lit":[192,192,192,1],"minecraft:cave_vines_lit_e":[193,193,193,1],"minecraft:cave_vines_lit_e_s":[194,194,194,1],"minecraft:cave_vines_lit_s":[195,195,195,1],"minecraft:cave_vines_plant":[196,196,196,1],"minecraft:cave_vines_plant_lit":[197,197,197,1],"minecraft:cave_vines_plant_lit_e":[198,198,198,1],"minecraft:cave_vines_plant_lit_e_s":[199,199,199,1],"minecraft:cave_vines_plant_lit_s":[200,200,200,1],"minecraft:chain_command_block_back":[201,201,201,0],"minecraft:chain_command_block_back_e":[202,202,202,1],"minecraft:chain_command_block_back_e_s":[203,203,203,1],"minecraft:chain_command_block_back_s":[204,204,204,1],"minecraft:chain_command_block_conditional":[205,205,205,0],"minecraft:chain_command_block_conditional_e":[206,206,206,1],"minecraft:chain_command_block_conditional_s":[207,207,207,1],"minecraft:chain_command_block_front":[208,208,208,0],"minecraft:chain_command_block_front_e":[209,209,209,1],"minecraft:chain_command_block_front_e_s":[210,210,210,1],"minecraft:chain_command_block_front_s":[211,211,211,1],"minecraft:chain_command_block_side_e":[212,212,212,1],"minecraft:chain_command_block_side_e_s":[213,213,213,1],"minecraft:chain_command_block_side_s":[214,214,214,1],"minecraft:cherry_door":[215,215,215,1],"minecraft:cherry_door[half=upper]":[1722,1722,1722,1],"minecraft:cherry_hanging_sign":[1787,1787,1787,0],"minecraft:cherry_leaves":[216,216,216,1],"minecraft:cherry_log":[217,217,218,0],"minecraft:cherry_planks":[219,219,219,0],"minecraft:cherry_sapling":[220,220,220,1],"minecraft:cherry_shelf":[221,221,221,0],"minecraft:cherry_sign":[1787,1787,1787,0],"minecraft:cherry_trapdoor":[222,222,222,1],"minecraft:cherry_wall_sign":[1787,1787,1787,0],"minecraft:cherry_wood":[218,218,218,0],"minecraft:chest":[1738,1739,1740,0],"minecraft:chipped_anvil":[1755,1755,27,0],"minecraft:chiseled_a_sandstone":[223,223,223,0],"minecraft:chiseled_b_sandstone":[224,224,224,0],"minecraft:chiseled_bookshelf":[227,227,228,0],"minecraft:chiseled_bookshelf_empty":[225,225,225,0],"minecraft:chiseled_bookshelf_occupied":[226,226,226,0],"minecraft:chiseled_c_sandstone":[229,229,229,0],"minecraft:chiseled_cinnabar":[230,230,230,0],"minecraft:chiseled_copper":[231,231,231,0],"minecraft:chiseled_d_sandstone":[232,232,232,0],"minecraft:chiseled_deepslate":[233,233,233,0],"minecraft:chiseled_e_sandstone":[234,234,234,0],"minecraft:chiseled_f_sandstone":[235,235,235,0],"minecraft:chiseled_g_sandstone":[236,236,236,0],"minecraft:chiseled_h_sandstone":[237,237,237,0],"minecraft:chiseled_i_sandstone":[238,238,238,0],"minecraft:chiseled_j_sandstone":[239,239,239,0],"minecraft:chiseled_k_sandstone":[240,240,240,0],"minecraft:chiseled_l_sandstone":[241,241,241,0],"minecraft:chiseled_m_sandstone":[242,242,242,0],"minecraft:chiseled_n_sandstone":[243,243,243,0],"minecraft:chiseled_nether_bricks":[244,244,244,0],"minecraft:chiseled_o_sandstone":[245,245,245,0],"minecraft:chiseled_p_sandstone":[246,246,246,0],"minecraft:chiseled_polished_blackstone":[247,247,247,0],"minecraft:chiseled_q_sandstone":[248,248,248,0],"minecraft:chiseled_quartz_block":[249,249,249,0],"minecraft:chiseled_r_sandstone":[250,250,250,0],"minecraft:chiseled_red_a_sandstone":[251,251,251,0],"minecraft:chiseled_red_b_sandstone":[252,252,252,0],"minecraft:chiseled_red_c_sandstone":[253,253,253,0],"minecraft:chiseled_red_d_sandstone":[254,254,254,0],"minecraft:chiseled_red_e_sandstone":[255,255,255,0],"minecraft:chiseled_red_f_sandstone":[256,256,256,0],"minecraft:chiseled_red_g_sandstone":[257,257,257,0],"minecraft:chiseled_red_h_sandstone":[258,258,258,0],"minecraft:chiseled_red_i_sandstone":[259,259,259,0],"minecraft:chiseled_red_j_sandstone":[260,260,260,0],"minecraft:chiseled_red_k_sandstone":[261,261,261,0],"minecraft:chiseled_red_l_sandstone":[262,262,262,0],"minecraft:chiseled_red_m_sandstone":[263,263,263,0],"minecraft:chiseled_red_n_sandstone":[264,264,264,0],"minecraft:chiseled_red_o_sandstone":[265,265,265,0],"minecraft:chiseled_red_p_sandstone":[266,266,266,0],"minecraft:chiseled_red_q_sandstone":[267,267,267,0],"minecraft:chiseled_red_r_sandstone":[268,268,268,0],"minecraft:chiseled_red_s_sandstone":[269,269,269,0],"minecraft:chiseled_red_sandstone":[270,270,270,0],"minecraft:chiseled_red_sandstone1":[271,271,271,0],"minecraft:chiseled_red_t_sandstone":[272,272,272,0],"minecraft:chiseled_red_u_sandstone":[273,273,273,0],"minecraft:chiseled_red_v_sandstone":[274,274,274,0],"minecraft:chiseled_red_w_sandstone":[275,275,275,0],"minecraft:chiseled_red_x_sandstone":[276,276,276,0],"minecraft:chiseled_red_y_sandstone":[277,277,277,0],"minecraft:chiseled_red_z_sandstone":[278,278,278,0],"minecraft:chiseled_resin_bricks":[279,279,279,0],"minecraft:chiseled_s_sandstone":[280,280,280,0],"minecraft:chiseled_sandstone":[281,281,281,0],"minecraft:chiseled_sandstone1":[282,282,282,0],"minecraft:chiseled_stone_bricks":[283,283,283,0],"minecraft:chiseled_sulfur":[284,284,284,0],"minecraft:chiseled_t_sandstone":[285,285,285,0],"minecraft:chiseled_tuff":[286,286,286,0],"minecraft:chiseled_tuff_bricks":[287,288,288,0],"minecraft:chiseled_u_sandstone":[289,289,289,0],"minecraft:chiseled_v_sandstone":[290,290,290,0],"minecraft:chiseled_w_sandstone":[291,291,291,0],"minecraft:chiseled_x_sandstone":[292,292,292,0],"minecraft:chiseled_y_sandstone":[293,293,293,0],"minecraft:chiseled_z_sandstone":[294,294,294,0],"minecraft:chorus_flower":[295,295,295,0],"minecraft:chorus_flower_dead":[296,296,296,0],"minecraft:chorus_flower_dead_e":[297,297,297,1],"minecraft:chorus_flower_dead_e_s":[298,298,298,1],"minecraft:chorus_flower_dead_s":[299,299,299,1],"minecraft:chorus_flower_e":[300,300,300,1],"minecraft:chorus_flower_e_s":[301,301,301,1],"minecraft:chorus_flower_petal":[302,302,302,1],"minecraft:chorus_flower_petal_s":[303,303,303,1],"minecraft:chorus_flower_s":[304,304,304,1],"minecraft:chorus_plant":[305,305,305,0],"minecraft:cinnabar":[306,306,306,0],"minecraft:cinnabar_bricks":[307,307,307,0],"minecraft:clay":[308,308,308,0],"minecraft:closed_eyeblossom":[309,309,309,1],"minecraft:coal_block":[310,310,310,0],"minecraft:coal_ore":[311,311,311,0],"minecraft:coal_ore1":[312,312,312,0],"minecraft:coal_ore2":[313,313,313,0],"minecraft:coarse_dirt":[314,314,314,0],"minecraft:cobbled_deepslate":[315,315,315,0],"minecraft:cobbled_deepslate1":[316,316,316,0],"minecraft:cobbled_deepslate2":[317,317,317,0],"minecraft:cobblestone":[318,318,318,0],"minecraft:cobblestone1":[319,319,319,0],"minecraft:cobblestone2":[320,320,320,0],"minecraft:cobweb":[321,321,321,1],"minecraft:cocoa_stage0":[322,322,322,1],"minecraft:cocoa_stage1":[323,323,323,1],"minecraft:cocoa_stage2":[324,324,324,1],"minecraft:command_block_back":[325,325,325,0],"minecraft:command_block_back_e":[326,326,326,1],"minecraft:command_block_back_e_s":[327,327,327,1],"minecraft:command_block_back_s":[328,328,328,1],"minecraft:command_block_conditional":[329,329,329,0],"minecraft:command_block_conditional_e":[330,330,330,1],"minecraft:command_block_conditional_s":[331,331,331,1],"minecraft:command_block_front":[332,332,332,0],"minecraft:command_block_front_e":[333,333,333,1],"minecraft:command_block_front_e_s":[334,334,334,1],"minecraft:command_block_front_s":[335,335,335,1],"minecraft:command_block_side_e":[336,336,336,1],"minecraft:command_block_side_e_s":[337,337,337,1],"minecraft:command_block_side_s":[338,338,338,1],"minecraft:comparator":[339,339,339,1],"minecraft:comparator_on":[340,340,340,0],"minecraft:composter":[341,342,343,1],"minecraft:composter_compost":[344,344,344,1],"minecraft:composter_ready":[345,345,345,1],"minecraft:conduit":[1791,1791,1791,0],"minecraft:copper colour changes":[346,346,346,0],"minecraft:copper_bars":[347,347,347,1],"minecraft:copper_bars_post":[348,348,348,1],"minecraft:copper_block":[349,349,349,0],"minecraft:copper_bulb":[350,350,350,0],"minecraft:copper_bulb_lit":[351,351,351,1],"minecraft:copper_bulb_lit_e":[352,352,352,1],"minecraft:copper_bulb_lit_powered":[353,353,353,0],"minecraft:copper_bulb_lit_powered_s":[354,354,354,2],"minecraft:copper_bulb_lit_s":[355,355,355,2],"minecraft:copper_bulb_powered":[356,356,356,0],"minecraft:copper_bulb_powered_e":[357,357,357,1],"minecraft:copper_bulb_powered_lit_e":[358,358,358,1],"minecraft:copper_bulb_powered_s":[359,359,359,1],"minecraft:copper_chain":[360,360,360,1],"minecraft:copper_door":[361,361,361,0],"minecraft:copper_door[half=upper]":[1723,1723,1723,1],"minecraft:copper_grate":[362,362,362,1],"minecraft:copper_lantern":[363,363,363,1],"minecraft:copper_lantern_e":[364,364,364,1],"minecraft:copper_ore":[365,365,365,0],"minecraft:copper_ore1":[366,366,366,0],"minecraft:copper_torch":[367,367,367,1],"minecraft:copper_trapdoor":[368,368,368,1],"minecraft:cornflower":[369,369,369,1],"minecraft:cracked_deepslate_bricks":[370,370,370,0],"minecraft:cracked_deepslate_bricks1":[371,371,371,0],"minecraft:cracked_deepslate_bricks2":[372,372,372,0],"minecraft:cracked_deepslate_bricks3":[373,373,373,0],"minecraft:cracked_deepslate_bricks4":[374,374,374,0],"minecraft:cracked_deepslate_tiles":[375,375,375,0],"minecraft:cracked_deepslate_tiles1":[376,376,376,0],"minecraft:cracked_deepslate_tiles2":[377,377,377,0],"minecraft:cracked_deepslate_tiles3":[378,378,378,0],"minecraft:cracked_deepslate_tiles4":[379,379,379,0],"minecraft:cracked_nether_bricks":[380,380,380,0],"minecraft:cracked_polished_blackstone_bricks":[381,381,381,0],"minecraft:cracked_stone_bricks":[382,382,382,0],"minecraft:cracked_stone_bricks1":[383,383,383,0],"minecraft:cracked_stone_bricks2":[384,384,384,0],"minecraft:cracked_stone_bricks3":[385,385,385,0],"minecraft:crafter":[386,387,386,0],"minecraft:crafter_east":[388,388,388,0],"minecraft:crafter_east_crafting":[389,389,389,0],"minecraft:crafter_east_crafting_s":[390,390,390,1],"minecraft:crafter_east_triggered":[391,391,391,0],"minecraft:crafter_east_triggered_s":[392,392,392,1],"minecraft:crafter_north":[393,393,393,0],"minecraft:crafter_north_crafting":[394,394,394,0],"minecraft:crafter_north_crafting_s":[395,395,395,1],"minecraft:crafter_north_triggered":[396,396,396,0],"minecraft:crafter_north_triggered_s":[397,397,397,1],"minecraft:crafter_south":[398,398,398,0],"minecraft:crafter_south_crafting_s":[399,399,399,1],"minecraft:crafter_south_triggered":[400,400,400,0],"minecraft:crafter_south_triggered_s":[401,401,401,1],"minecraft:crafter_top_crafting":[402,402,402,0],"minecraft:crafter_top_crafting_s":[403,403,403,2],"minecraft:crafter_top_triggered":[404,404,404,1],"minecraft:crafter_top_triggered_s":[405,405,405,1],"minecraft:crafter_west":[406,406,406,0],"minecraft:crafter_west_crafting":[407,407,407,0],"minecraft:crafter_west_crafting_s":[408,408,408,1],"minecraft:crafter_west_triggered":[409,409,409,0],"minecraft:crafter_west_triggered_s":[410,410,410,1],"minecraft:crafting_table":[411,124,412,0],"minecraft:crafting_table_front":[413,413,413,0],"minecraft:crafting_table_side_1":[414,414,414,0],"minecraft:crafting_table_side_2":[415,415,415,0],"minecraft:creaking_heart":[416,417,417,0],"minecraft:creaking_heart_awake":[418,418,418,0],"minecraft:creaking_heart_dormant":[419,419,419,0],"minecraft:creaking_heart_top_awake":[420,420,420,0],"minecraft:creaking_heart_top_dormant":[421,421,421,0],"minecraft:creeper_head":[1761,1762,1763,0],"minecraft:creeper_wall_head":[1761,1762,1763,0],"minecraft:crimson_door":[422,422,422,0],"minecraft:crimson_door[half=upper]":[1724,1724,1724,0],"minecraft:crimson_fungus":[423,423,423,1],"minecraft:crimson_fungus_block":[424,424,424,1],"minecraft:crimson_fungus_block_e":[425,425,425,1],"minecraft:crimson_fungus_block_e_s":[426,426,426,1],"minecraft:crimson_fungus_block_s":[427,427,427,1],"minecraft:crimson_fungus_e":[428,428,428,1],"minecraft:crimson_fungus_e_s":[429,429,429,1],"minecraft:crimson_fungus_s":[430,430,430,1],"minecraft:crimson_hanging_sign":[1788,1788,1788,0],"minecraft:crimson_hyphae":[450,450,450,0],"minecraft:crimson_nylium":[431,431,432,0],"minecraft:crimson_planks":[433,433,433,0],"minecraft:crimson_roots":[434,434,434,1],"minecraft:crimson_roots_pot":[435,435,435,1],"minecraft:crimson_roots1":[436,436,436,1],"minecraft:crimson_roots1_e":[437,437,437,1],"minecraft:crimson_roots1_e_s":[438,438,438,1],"minecraft:crimson_roots1_s":[439,439,439,1],"minecraft:crimson_roots2":[440,440,440,1],"minecraft:crimson_roots2_e":[441,441,441,1],"minecraft:crimson_roots2_e_s":[442,442,442,1],"minecraft:crimson_roots2_s":[443,443,443,1],"minecraft:crimson_roots3":[444,444,444,1],"minecraft:crimson_roots3_e":[445,445,445,1],"minecraft:crimson_roots3_e_s":[446,446,446,1],"minecraft:crimson_roots3_s":[447,447,447,1],"minecraft:crimson_shelf":[448,448,448,0],"minecraft:crimson_sign":[1788,1788,1788,0],"minecraft:crimson_stem":[449,449,450,0],"minecraft:crimson_stem1":[451,451,451,0],"minecraft:crimson_stem2":[452,452,452,0],"minecraft:crimson_trapdoor":[453,453,453,0],"minecraft:crimson_wall_sign":[1788,1788,1788,0],"minecraft:crying_obsidian":[454,454,454,0],"minecraft:crying_obsidian_e":[455,455,455,1],"minecraft:crying_obsidian_e_s":[456,456,456,1],"minecraft:crying_obsidian_s":[457,457,457,1],"minecraft:cut_copper":[458,458,458,0],"minecraft:cut_red_sandstone":[459,459,459,0],"minecraft:cut_sandstone":[460,460,460,0],"minecraft:cut_sandstone1":[461,461,461,0],"minecraft:cut_sandstone2":[462,462,462,0],"minecraft:cut_sandstone3":[463,463,463,0],"minecraft:cyan_banner":[471,471,471,0],"minecraft:cyan_bed":[464,464,464,0],"minecraft:cyan_candle":[95,95,95,1],"minecraft:cyan_candle_lit":[465,465,465,1],"minecraft:cyan_carpet":[471,471,471,0],"minecraft:cyan_concrete":[466,466,466,0],"minecraft:cyan_concrete_powder":[467,467,467,0],"minecraft:cyan_glazed_terracotta":[468,468,468,0],"minecraft:cyan_stained_glass":[469,469,469,2],"minecraft:cyan_terracotta":[470,470,470,0],"minecraft:cyan_wall_banner":[471,471,471,0],"minecraft:cyan_wool":[471,471,471,0],"minecraft:damaged_anvil":[1756,1756,27,0],"minecraft:dandelion":[472,472,472,1],"minecraft:dappled_leaves":[473,473,473,1],"minecraft:dappled_leaves1":[474,474,474,1],"minecraft:dark_oak_door":[475,475,475,1],"minecraft:dark_oak_door[half=upper]":[1725,1725,1725,1],"minecraft:dark_oak_hanging_sign":[1785,1785,1785,0],"minecraft:dark_oak_leaves":[476,476,476,1],"minecraft:dark_oak_leaves1":[477,477,477,1],"minecraft:dark_oak_log":[478,478,479,0],"minecraft:dark_oak_log1":[480,480,480,0],"minecraft:dark_oak_planks":[481,481,481,0],"minecraft:dark_oak_planks1":[482,482,482,0],"minecraft:dark_oak_planks2":[483,483,483,0],"minecraft:dark_oak_sapling":[484,484,484,1],"minecraft:dark_oak_shelf":[485,485,485,0],"minecraft:dark_oak_sign":[1785,1785,1785,0],"minecraft:dark_oak_trapdoor":[486,486,486,1],"minecraft:dark_oak_wall_sign":[1785,1785,1785,0],"minecraft:dark_oak_wood":[479,479,479,0],"minecraft:dark_prismarine":[487,487,487,0],"minecraft:daylight_detector":[488,488,489,0],"minecraft:daylight_detector[inverted=true]":[1760,1760,489,0],"minecraft:dead_brain_coral":[490,490,490,1],"minecraft:dead_brain_coral_block":[491,491,491,0],"minecraft:dead_brain_coral_fan":[492,492,492,1],"minecraft:dead_bubble_coral":[493,493,493,1],"minecraft:dead_bubble_coral_block":[494,494,494,0],"minecraft:dead_bubble_coral_fan":[495,495,495,1],"minecraft:dead_bush":[496,496,496,1],"minecraft:dead_fire_coral":[497,497,497,1],"minecraft:dead_fire_coral_block":[498,498,498,0],"minecraft:dead_fire_coral_fan":[499,499,499,1],"minecraft:dead_horn_coral":[500,500,500,1],"minecraft:dead_horn_coral_block":[501,501,501,0],"minecraft:dead_horn_coral_fan":[502,502,502,1],"minecraft:dead_tube_coral":[503,503,503,1],"minecraft:dead_tube_coral_block":[504,504,504,0],"minecraft:dead_tube_coral_fan":[505,505,505,1],"minecraft:debug":[506,506,506,0],"minecraft:debug2":[507,507,507,0],"minecraft:decorated_pot":[1792,1792,1792,0],"minecraft:deepslate":[508,508,509,0],"minecraft:deepslate_bricks":[510,510,510,0],"minecraft:deepslate_bricks1":[511,511,511,0],"minecraft:deepslate_bricks2":[512,512,512,0],"minecraft:deepslate_bricks3":[513,513,513,0],"minecraft:deepslate_bricks4":[514,514,514,0],"minecraft:deepslate_coal_ore":[515,515,515,0],"minecraft:deepslate_coal_ore1":[516,516,516,0],"minecraft:deepslate_coal_ore2":[517,517,517,0],"minecraft:deepslate_copper_ore":[518,518,518,0],"minecraft:deepslate_copper_ore1":[519,519,519,0],"minecraft:deepslate_diamond_ore":[520,520,520,0],"minecraft:deepslate_diamond_ore1":[521,521,521,0],"minecraft:deepslate_emerald_ore":[522,522,522,0],"minecraft:deepslate_emerald_ore1":[523,523,523,0],"minecraft:deepslate_gold_ore":[524,524,524,0],"minecraft:deepslate_gold_ore1":[525,525,525,0],"minecraft:deepslate_iron_ore":[526,526,526,0],"minecraft:deepslate_iron_ore1":[527,527,527,0],"minecraft:deepslate_lapis_ore":[528,528,528,0],"minecraft:deepslate_lapis_ore1":[529,529,529,0],"minecraft:deepslate_redstone_ore":[530,530,530,0],"minecraft:deepslate_redstone_ore1":[531,531,531,0],"minecraft:deepslate_tiles":[532,532,532,0],"minecraft:deepslate_tiles1":[533,533,533,0],"minecraft:deepslate_tiles2":[534,534,534,0],"minecraft:deepslate_tiles3":[535,535,535,0],"minecraft:deepslate_tiles4":[536,536,536,0],"minecraft:deepslate2":[537,537,537,0],"minecraft:destroy_stage_0":[538,538,538,1],"minecraft:destroy_stage_1":[539,539,539,1],"minecraft:destroy_stage_2":[540,540,540,1],"minecraft:destroy_stage_3":[541,541,541,1],"minecraft:destroy_stage_4":[542,542,542,1],"minecraft:destroy_stage_5":[543,543,543,1],"minecraft:destroy_stage_6":[544,544,544,1],"minecraft:destroy_stage_7":[545,545,545,1],"minecraft:destroy_stage_8":[546,546,546,1],"minecraft:destroy_stage_9":[547,547,547,1],"minecraft:detector_rail":[548,548,548,1],"minecraft:detector_rail_on":[549,549,549,1],"minecraft:detector_rail_on_e":[550,550,550,1],"minecraft:detector_rail_on_e_s":[551,551,551,1],"minecraft:detector_rail_on_s":[552,552,552,1],"minecraft:diamond_block":[553,553,553,0],"minecraft:diamond_ore":[554,554,554,0],"minecraft:diamond_ore1":[555,555,555,0],"minecraft:diorite":[556,556,556,0],"minecraft:diorite1":[557,557,557,0],"minecraft:dirt":[558,558,558,0],"minecraft:dirt_path":[559,558,560,0],"minecraft:dirt_path_top1":[561,561,561,0],"minecraft:dirt1":[562,562,562,0],"minecraft:dirt2":[563,563,563,0],"minecraft:dirt3":[564,564,564,0],"minecraft:dirt4":[565,565,565,0],"minecraft:dispenser_front":[566,566,566,0],"minecraft:dispenser_front_vertical":[567,567,567,0],"minecraft:dragon_egg":[568,568,568,0],"minecraft:dragon_head":[1779,1779,1779,0],"minecraft:dragon_wall_head":[1779,1779,1779,0],"minecraft:dried_ghast":[569,569,569,0],"minecraft:dried_ghast_1":[570,570,570,0],"minecraft:dried_ghast_2":[571,571,571,0],"minecraft:dried_ghast_3":[572,572,572,0],"minecraft:dried_ghast_4":[573,573,573,0],"minecraft:dried_kelp":[574,575,576,0],"minecraft:dried_kelp_block":[574,575,576,0],"minecraft:dried_kelp_side_mirror":[577,577,577,0],"minecraft:dripstone_block":[578,578,578,0],"minecraft:dropper_front":[579,579,579,0],"minecraft:dropper_front_vertical":[580,580,580,0],"minecraft:emerald_block":[581,581,581,0],"minecraft:emerald_ore":[582,582,582,0],"minecraft:emerald_ore1":[583,583,583,0],"minecraft:empty_armor_slot_boots":[584,584,584,1],"minecraft:empty_armor_slot_chestplate":[585,585,585,1],"minecraft:empty_armor_slot_helmet":[586,586,586,1],"minecraft:empty_armor_slot_leggings":[587,587,587,1],"minecraft:empty_armor_slot_shield":[588,588,588,1],"minecraft:enchanting_table":[589,590,591,0],"minecraft:enchanting_table_side_e":[592,592,592,1],"minecraft:enchanting_table_side_e_s":[593,593,593,1],"minecraft:enchanting_table_side_s":[594,594,594,1],"minecraft:end_crystal":[595,595,595,1],"minecraft:end_crystal_s":[596,596,596,1],"minecraft:end_portal_frame":[597,598,599,1],"minecraft:end_portal_frame_eye":[600,600,600,1],"minecraft:end_portal_frame_eye_glow":[601,601,601,1],"minecraft:end_rod":[602,602,602,1],"minecraft:end_stone":[603,603,603,0],"minecraft:end_stone_bricks":[604,604,604,0],"minecraft:end_stone_bricks1":[605,605,605,0],"minecraft:end_stone_bricks2":[606,606,606,0],"minecraft:end_stone_bricks3":[607,607,607,0],"minecraft:ender_chest":[1744,1745,1746,0],"minecraft:exposed_chiseled_copper":[608,608,608,0],"minecraft:exposed_copper":[609,609,609,0],"minecraft:exposed_copper_bars":[610,610,610,1],"minecraft:exposed_copper_bars_post":[611,611,611,1],"minecraft:exposed_copper_bulb":[612,612,612,0],"minecraft:exposed_copper_bulb_lit":[613,613,613,0],"minecraft:exposed_copper_bulb_lit_powered":[614,614,614,0],"minecraft:exposed_copper_bulb_lit_powered_s":[615,615,615,2],"minecraft:exposed_copper_bulb_lit_s":[616,616,616,2],"minecraft:exposed_copper_bulb_powered":[617,617,617,0],"minecraft:exposed_copper_bulb_powered_s":[618,618,618,1],"minecraft:exposed_copper_chain":[619,619,619,1],"minecraft:exposed_copper_door":[620,620,620,0],"minecraft:exposed_copper_door[half=upper]":[1726,1726,1726,1],"minecraft:exposed_copper_grate":[621,621,621,1],"minecraft:exposed_copper_lantern":[622,622,622,1],"minecraft:exposed_copper_trapdoor":[623,623,623,1],"minecraft:exposed_cut_copper":[624,624,624,0],"minecraft:exposed_lightning_rod":[625,625,625,1],"minecraft:farmland":[626,558,558,0],"minecraft:farmland_moist":[627,627,627,0],"minecraft:fence_acacia":[628,628,628,0],"minecraft:fence_big_oak":[629,629,629,0],"minecraft:fence_birch":[630,630,630,0],"minecraft:fence_gate_acacia":[631,631,631,0],"minecraft:fence_gate_big_oak":[632,632,632,0],"minecraft:fence_gate_birch":[633,633,633,0],"minecraft:fence_gate_jungle":[634,634,634,0],"minecraft:fence_gate_oak":[635,635,635,0],"minecraft:fence_jungle":[636,636,636,0],"minecraft:fence_oak":[637,637,637,0],"minecraft:fence_wooden":[638,638,638,0],"minecraft:fern":[639,639,639,1],"minecraft:fern1":[640,640,640,1],"minecraft:fire_0":[641,641,641,1],"minecraft:fire_0_e":[642,642,642,1],"minecraft:fire_0_e_s":[643,643,643,2],"minecraft:fire_0_s":[644,644,644,2],"minecraft:fire_1":[645,645,645,1],"minecraft:fire_1_e":[646,646,646,1],"minecraft:fire_1_e_s":[647,647,647,2],"minecraft:fire_1_s":[648,648,648,2],"minecraft:fire_coral":[649,649,649,1],"minecraft:fire_coral_block":[650,650,650,0],"minecraft:fire_coral_fan":[651,651,651,1],"minecraft:firefly_bush":[652,652,652,1],"minecraft:firefly_bush_emissive":[653,653,653,1],"minecraft:fletching_table":[655,655,656,0],"minecraft:fletching_table_front":[654,654,654,0],"minecraft:flower_pot":[657,657,657,1],"minecraft:flowering_azalea":[659,659,660,1],"minecraft:flowering_azalea_leaves":[658,658,658,1],"minecraft:frogspawn":[661,661,661,1],"minecraft:frosted_ice":[662,662,662,2],"minecraft:frosted_ice_0":[662,662,662,2],"minecraft:frosted_ice_1":[663,663,663,2],"minecraft:frosted_ice_2":[664,664,664,2],"minecraft:frosted_ice_3":[665,665,665,2],"minecraft:furnace":[666,666,667,0],"minecraft:furnace_front":[668,668,668,0],"minecraft:furnace_front_on":[669,669,669,0],"minecraft:furnace_front_on_e":[670,670,670,1],"minecraft:furnace_front_on_s":[671,671,671,1],"minecraft:gilded_blackstone":[672,672,672,0],"minecraft:glass":[673,673,673,2],"minecraft:glow_item_frame":[674,674,674,1],"minecraft:glow_item_frame_border":[675,675,675,0],"minecraft:glow_item_frame_e":[676,676,676,1],"minecraft:glow_item_frame_e_s":[677,677,677,2],"minecraft:glow_item_frame_s":[678,678,678,2],"minecraft:glow_itemframe_border":[679,679,679,0],"minecraft:glow_lichen":[680,680,680,1],"minecraft:glow_lichen_s":[681,681,681,2],"minecraft:glowstone":[682,682,682,0],"minecraft:glowstone_e":[683,683,683,0],"minecraft:glowstone_e_s":[684,684,684,2],"minecraft:glowstone_s":[685,685,685,2],"minecraft:gold_block":[686,686,686,0],"minecraft:gold_ore":[687,687,687,0],"minecraft:gold_ore1":[688,688,688,0],"minecraft:golden_dandelion":[689,689,689,1],"minecraft:granite":[690,690,690,0],"minecraft:granite1":[691,691,691,0],"minecraft:grass":[692,692,692,1],"minecraft:grass_block":[693,558,694,0],"minecraft:grass_block_side_overlay":[695,695,695,1],"minecraft:grass_block_snow":[696,696,696,0],"minecraft:grass_block_top_extra":[697,697,697,1],"minecraft:grass_block_top_extra1":[698,698,698,1],"minecraft:grass_block_top1":[699,699,699,0],"minecraft:grass_block_top2":[700,700,700,0],"minecraft:grass_block_top3":[701,701,701,0],"minecraft:grass_block[snowy=true]":[693,558,696,0],"minecraft:grass_path":[559,558,560,0],"minecraft:grass_path_top1":[702,702,702,0],"minecraft:grass_topextra":[703,703,703,1],"minecraft:grass_topextra1":[704,704,704,1],"minecraft:grass1":[705,705,705,1],"minecraft:grass2":[706,706,706,1],"minecraft:grass3":[707,707,707,1],"minecraft:grass4":[708,708,708,1],"minecraft:gravel":[709,709,709,0],"minecraft:gray_banner":[717,717,717,0],"minecraft:gray_bed":[710,710,710,0],"minecraft:gray_candle":[95,95,95,1],"minecraft:gray_candle_lit":[711,711,711,1],"minecraft:gray_carpet":[717,717,717,0],"minecraft:gray_concrete":[712,712,712,0],"minecraft:gray_concrete_powder":[713,713,713,0],"minecraft:gray_glazed_terracotta":[714,714,714,0],"minecraft:gray_stained_glass":[715,715,715,2],"minecraft:gray_terracotta":[716,716,716,0],"minecraft:gray_wall_banner":[717,717,717,0],"minecraft:gray_wool":[717,717,717,0],"minecraft:green_banner":[725,725,725,0],"minecraft:green_bed":[718,718,718,0],"minecraft:green_candle":[95,95,95,1],"minecraft:green_candle_lit":[719,719,719,1],"minecraft:green_carpet":[725,725,725,0],"minecraft:green_concrete":[720,720,720,0],"minecraft:green_concrete_powder":[721,721,721,0],"minecraft:green_glazed_terracotta":[722,722,722,0],"minecraft:green_stained_glass":[723,723,723,2],"minecraft:green_terracotta":[724,724,724,0],"minecraft:green_wall_banner":[725,725,725,0],"minecraft:green_wool":[725,725,725,0],"minecraft:grindstone":[1759,1759,1759,0],"minecraft:grindstone_pivot":[726,726,726,1],"minecraft:grindstone_round":[727,727,727,1],"minecraft:hanging_roots":[728,728,728,1],"minecraft:hay_block":[729,729,730,0],"minecraft:heavy_core":[731,731,731,1],"minecraft:heavy_core_e":[732,732,732,1],"minecraft:heavy_core_item":[733,733,733,1],"minecraft:heavy_core_item_s":[734,734,734,2],"minecraft:heavy_core_s":[735,735,735,2],"minecraft:heavy_weighted_pressure_plate":[747,747,747,0],"minecraft:honey_block":[736,737,737,2],"minecraft:honeycomb_block":[738,738,738,0],"minecraft:hopper":[1757,740,740,0],"minecraft:hopper_inside":[739,739,739,0],"minecraft:hopper_outside":[740,740,740,0],"minecraft:horn_coral":[741,741,741,1],"minecraft:horn_coral_block":[742,742,742,0],"minecraft:horn_coral_fan":[743,743,743,1],"minecraft:ice":[744,744,744,2],"minecraft:iron_bars":[745,745,745,1],"minecraft:iron_bars_hor":[746,746,746,1],"minecraft:iron_block":[747,747,747,0],"minecraft:iron_block_alt":[748,748,748,0],"minecraft:iron_chain":[749,749,749,1],"minecraft:iron_door":[750,750,750,1],"minecraft:iron_door[half=upper]":[1727,1727,1727,1],"minecraft:iron_ore":[751,751,751,0],"minecraft:iron_ore1":[752,752,752,0],"minecraft:iron_trapdoor":[753,753,753,1],"minecraft:item_frame":[754,754,754,1],"minecraft:item_frame_border":[755,755,755,0],"minecraft:itemframe_border":[756,756,756,0],"minecraft:jack_o_lantern":[185,185,757,0],"minecraft:jack_o_lantern_e":[758,758,758,1],"minecraft:jack_o_lantern_s":[759,759,759,2],"minecraft:jigsaw":[760,761,762,0],"minecraft:jigsaw_bottom_e":[763,763,763,1],"minecraft:jigsaw_lock":[764,764,764,0],"minecraft:jigsaw_lock_e":[765,765,765,1],"minecraft:jigsaw_lock_e_s":[766,766,766,1],"minecraft:jigsaw_lock_s":[767,767,767,1],"minecraft:jigsaw_side_e":[768,768,768,1],"minecraft:jigsaw_side_e_s":[769,769,769,1],"minecraft:jigsaw_side_s":[770,770,770,1],"minecraft:jigsaw_top_e":[771,771,771,1],"minecraft:jigsaw_top_e_s":[772,772,772,1],"minecraft:jigsaw_top_s":[773,773,773,1],"minecraft:jukebox":[774,775,775,0],"minecraft:jungle_door":[776,776,776,1],"minecraft:jungle_door[half=upper]":[1728,1728,1728,1],"minecraft:jungle_hanging_sign":[1783,1783,1783,0],"minecraft:jungle_leaves":[777,777,777,1],"minecraft:jungle_leaves1":[778,778,778,1],"minecraft:jungle_log":[779,779,780,0],"minecraft:jungle_log1":[781,781,781,0],"minecraft:jungle_planks":[782,782,782,0],"minecraft:jungle_planks1":[783,783,783,0],"minecraft:jungle_planks2":[784,784,784,0],"minecraft:jungle_sapling":[785,785,785,1],"minecraft:jungle_shelf":[786,786,786,0],"minecraft:jungle_sign":[1783,1783,1783,0],"minecraft:jungle_trapdoor":[787,787,787,1],"minecraft:jungle_wall_sign":[1783,1783,1783,0],"minecraft:jungle_wood":[780,780,780,0],"minecraft:kelp":[788,788,788,1],"minecraft:kelp_plant":[789,789,789,1],"minecraft:ladder":[790,790,790,1],"minecraft:lantern":[791,791,791,1],"minecraft:lantern_e":[792,792,792,1],"minecraft:lantern_extra":[793,793,793,1],"minecraft:lantern_s":[794,794,794,1],"minecraft:lapis_block":[795,795,795,0],"minecraft:lapis_ore":[796,796,796,0],"minecraft:lapis_ore1":[797,797,797,0],"minecraft:large_amethyst_bud":[798,798,798,1],"minecraft:large_fern":[799,799,799,1],"minecraft:large_fern[half=upper]":[1750,1750,1750,1],"minecraft:lava":[804,804,804,0],"minecraft:lava_cauldron":[187,188,189,0],"minecraft:lava_flow":[800,800,800,0],"minecraft:lava_flow_e":[801,801,801,0],"minecraft:lava_flow_e_s":[802,802,802,0],"minecraft:lava_flow_s":[803,803,803,0],"minecraft:lava_still":[804,804,804,0],"minecraft:lava_still_e":[805,805,805,0],"minecraft:lava_still_e_s":[806,806,806,2],"minecraft:lava_still_s":[807,807,807,2],"minecraft:leaf_litter":[808,808,808,1],"minecraft:lectern":[1758,809,811,0],"minecraft:lectern_base":[809,809,809,0],"minecraft:lectern_front":[810,810,810,0],"minecraft:lectern_sides":[811,811,811,0],"minecraft:lever":[812,812,812,1],"minecraft:light_blue_banner":[820,820,820,0],"minecraft:light_blue_bed":[813,813,813,0],"minecraft:light_blue_candle":[95,95,95,1],"minecraft:light_blue_candle_lit":[814,814,814,1],"minecraft:light_blue_carpet":[820,820,820,0],"minecraft:light_blue_concrete":[815,815,815,0],"minecraft:light_blue_concrete_powder":[816,816,816,0],"minecraft:light_blue_glazed_terracotta":[817,817,817,0],"minecraft:light_blue_stained_glass":[818,818,818,2],"minecraft:light_blue_terracotta":[819,819,819,0],"minecraft:light_blue_wall_banner":[820,820,820,0],"minecraft:light_blue_wool":[820,820,820,0],"minecraft:light_gray_banner":[828,828,828,0],"minecraft:light_gray_bed":[821,821,821,0],"minecraft:light_gray_candle":[95,95,95,1],"minecraft:light_gray_candle_lit":[822,822,822,1],"minecraft:light_gray_carpet":[828,828,828,0],"minecraft:light_gray_concrete":[823,823,823,0],"minecraft:light_gray_concrete_powder":[824,824,824,0],"minecraft:light_gray_glazed_terracotta":[825,825,825,0],"minecraft:light_gray_stained_glass":[826,826,826,2],"minecraft:light_gray_terracotta":[827,827,827,0],"minecraft:light_gray_wall_banner":[828,828,828,0],"minecraft:light_gray_wool":[828,828,828,0],"minecraft:light_weighted_pressure_plate":[686,686,686,0],"minecraft:lightning_rod":[829,829,829,1],"minecraft:lilac":[830,830,830,1],"minecraft:lilac[half=upper]":[1751,1751,1751,1],"minecraft:lily_of_the_valley":[831,831,831,1],"minecraft:lily_pad":[832,832,832,1],"minecraft:lily_pad_flowers":[833,833,833,1],"minecraft:lime_banner":[841,841,841,0],"minecraft:lime_bed":[834,834,834,0],"minecraft:lime_candle":[95,95,95,1],"minecraft:lime_candle_lit":[835,835,835,1],"minecraft:lime_carpet":[841,841,841,0],"minecraft:lime_concrete":[836,836,836,0],"minecraft:lime_concrete_powder":[837,837,837,0],"minecraft:lime_glazed_terracotta":[838,838,838,0],"minecraft:lime_stained_glass":[839,839,839,2],"minecraft:lime_terracotta":[840,840,840,0],"minecraft:lime_wall_banner":[841,841,841,0],"minecraft:lime_wool":[841,841,841,0],"minecraft:lodestone":[842,842,843,0],"minecraft:lodestone_side_east":[844,844,844,0],"minecraft:lodestone_side_north":[845,845,845,0],"minecraft:lodestone_side_south":[846,846,846,0],"minecraft:lodestone_side_west":[847,847,847,0],"minecraft:loom":[848,124,849,0],"minecraft:loom_front":[850,850,850,0],"minecraft:magenta_banner":[858,858,858,0],"minecraft:magenta_bed":[851,851,851,0],"minecraft:magenta_candle":[95,95,95,1],"minecraft:magenta_candle_lit":[852,852,852,1],"minecraft:magenta_carpet":[858,858,858,0],"minecraft:magenta_concrete":[853,853,853,0],"minecraft:magenta_concrete_powder":[854,854,854,0],"minecraft:magenta_glazed_terracotta":[855,855,855,0],"minecraft:magenta_stained_glass":[856,856,856,2],"minecraft:magenta_terracotta":[857,857,857,0],"minecraft:magenta_wall_banner":[858,858,858,0],"minecraft:magenta_wool":[858,858,858,0],"minecraft:magma":[859,859,859,0],"minecraft:magma_block":[859,859,859,0],"minecraft:magma_e":[860,860,860,1],"minecraft:magma_e_s":[861,861,861,2],"minecraft:magma_s":[862,862,862,2],"minecraft:mangrove_door":[863,863,863,1],"minecraft:mangrove_door[half=upper]":[1729,1729,1729,1],"minecraft:mangrove_hanging_sign":[1786,1786,1786,0],"minecraft:mangrove_leaves":[864,864,864,1],"minecraft:mangrove_leaves1":[865,865,865,1],"minecraft:mangrove_log":[866,866,867,0],"minecraft:mangrove_planks":[868,868,868,0],"minecraft:mangrove_propagule":[869,869,869,1],"minecraft:mangrove_propagule_hanging":[870,870,870,1],"minecraft:mangrove_roots":[871,871,872,1],"minecraft:mangrove_shelf":[873,873,873,0],"minecraft:mangrove_sign":[1786,1786,1786,0],"minecraft:mangrove_trapdoor":[874,874,874,1],"minecraft:mangrove_wall_sign":[1786,1786,1786,0],"minecraft:mangrove_wood":[867,867,867,0],"minecraft:medium_amethyst_bud":[875,875,875,1],"minecraft:melon":[876,876,877,0],"minecraft:melon_stem":[878,878,878,1],"minecraft:moss_block":[879,879,879,0],"minecraft:mossy_cobblestone":[880,880,880,0],"minecraft:mossy_cobblestone1":[881,881,881,0],"minecraft:mossy_cobblestone2":[882,882,882,0],"minecraft:mossy_stone_bricks":[883,883,883,0],"minecraft:mossy_stone_bricks1":[884,884,884,0],"minecraft:mossy_stone_bricks2":[885,885,885,0],"minecraft:mossy_stone_bricks3":[886,886,886,0],"minecraft:mud":[887,887,887,0],"minecraft:mud_bricks":[888,888,888,0],"minecraft:muddy_mangrove_roots":[889,889,890,0],"minecraft:mushroom_block_inside":[891,891,891,0],"minecraft:mushroom_stem":[892,892,892,0],"minecraft:mycelium":[893,558,894,0],"minecraft:mycelium[snowy=true]":[893,558,696,0],"minecraft:nether_bricks":[895,895,895,0],"minecraft:nether_gold_ore":[896,896,896,0],"minecraft:nether_gold_ore1":[897,897,897,0],"minecraft:nether_portal":[898,898,898,2],"minecraft:nether_quartz_ore":[899,899,899,0],"minecraft:nether_sprouts":[900,900,900,1],"minecraft:nether_wart":[916,916,916,1],"minecraft:nether_wart_block":[901,901,901,0],"minecraft:nether_wart_block1_e":[902,902,902,1],"minecraft:nether_wart_block1_e_s":[903,903,903,1],"minecraft:nether_wart_block1_s":[904,904,904,1],"minecraft:nether_wart_block2_e":[905,905,905,1],"minecraft:nether_wart_block2_e_s":[906,906,906,1],"minecraft:nether_wart_block2_s":[907,907,907,1],"minecraft:nether_wart_block3_e":[908,908,908,1],"minecraft:nether_wart_block3_e_s":[909,909,909,1],"minecraft:nether_wart_block3_s":[910,910,910,1],"minecraft:nether_wart_block4_e":[911,911,911,1],"minecraft:nether_wart_block4_e_s":[912,912,912,1],"minecraft:nether_wart_block4_s":[913,913,913,1],"minecraft:nether_wart_stage0":[914,914,914,1],"minecraft:nether_wart_stage1":[915,915,915,1],"minecraft:nether_wart_stage2":[916,916,916,1],"minecraft:netherite_block":[917,917,917,0],"minecraft:netherrack":[918,918,918,0],"minecraft:note_block":[919,919,919,0],"minecraft:oak_door":[920,920,920,1],"minecraft:oak_door[half=upper]":[1730,1730,1730,1],"minecraft:oak_fence_side2":[921,921,921,0],"minecraft:oak_hanging_sign":[1780,1780,1780,0],"minecraft:oak_leaves":[922,922,922,1],"minecraft:oak_leaves1":[923,923,923,1],"minecraft:oak_log":[924,924,925,0],"minecraft:oak_log1":[926,926,926,0],"minecraft:oak_planks":[124,124,124,0],"minecraft:oak_planks1":[927,927,927,0],"minecraft:oak_planks2":[928,928,928,0],"minecraft:oak_sapling":[929,929,929,1],"minecraft:oak_shelf":[930,930,930,0],"minecraft:oak_sign":[1780,1780,1780,0],"minecraft:oak_trapdoor":[931,931,931,1],"minecraft:oak_wall_sign":[1780,1780,1780,0],"minecraft:oak_wood":[925,925,925,0],"minecraft:observer":[941,932,942,0],"minecraft:observer_back":[932,932,932,0],"minecraft:observer_back_on":[933,933,933,0],"minecraft:observer_back_on_e":[934,934,934,1],"minecraft:observer_back_on_e_s":[935,935,935,1],"minecraft:observer_back_on_s":[936,936,936,1],"minecraft:observer_front":[937,937,937,0],"minecraft:observer_front_e":[938,938,938,1],"minecraft:observer_front_e_s":[939,939,939,1],"minecraft:observer_front_s":[940,940,940,1],"minecraft:obsidian":[943,943,943,0],"minecraft:ochre_froglight":[944,944,945,0],"minecraft:ochre_froglight_side_s":[946,946,946,2],"minecraft:ochre_froglight_top_s":[947,947,947,2],"minecraft:open_eyeblossom":[948,948,948,1],"minecraft:open_eyeblossom_e":[949,949,949,1],"minecraft:open_eyeblossom_e_s":[950,950,950,1],"minecraft:open_eyeblossom_s":[951,951,951,1],"minecraft:orange_banner":[962,962,962,0],"minecraft:orange_bed":[952,952,952,0],"minecraft:orange_candle":[95,95,95,1],"minecraft:orange_candle_lit":[953,953,953,1],"minecraft:orange_carpet":[962,962,962,0],"minecraft:orange_concrete":[954,954,954,0],"minecraft:orange_concrete_powder":[955,955,955,0],"minecraft:orange_glazed_terracotta":[956,956,956,0],"minecraft:orange_poplar_leaves":[957,957,957,1],"minecraft:orange_poplar_leaves1":[958,958,958,1],"minecraft:orange_stained_glass":[959,959,959,2],"minecraft:orange_terracotta":[960,960,960,0],"minecraft:orange_tulip":[961,961,961,1],"minecraft:orange_wall_banner":[962,962,962,0],"minecraft:orange_wool":[962,962,962,0],"minecraft:oxeye_daisy":[963,963,963,1],"minecraft:oxidized_chiseled_copper":[964,964,964,0],"minecraft:oxidized_copper":[965,965,965,0],"minecraft:oxidized_copper_bars":[966,966,966,1],"minecraft:oxidized_copper_bars_post":[967,967,967,1],"minecraft:oxidized_copper_bulb":[968,968,968,0],"minecraft:oxidized_copper_bulb_lit":[969,969,969,0],"minecraft:oxidized_copper_bulb_lit_powered":[970,970,970,0],"minecraft:oxidized_copper_bulb_lit_powered_s":[971,971,971,2],"minecraft:oxidized_copper_bulb_lit_s":[972,972,972,2],"minecraft:oxidized_copper_bulb_powered":[973,973,973,0],"minecraft:oxidized_copper_bulb_powered_s":[974,974,974,1],"minecraft:oxidized_copper_chain":[975,975,975,1],"minecraft:oxidized_copper_door":[976,976,976,0],"minecraft:oxidized_copper_door[half=upper]":[1731,1731,1731,1],"minecraft:oxidized_copper_grate":[977,977,977,1],"minecraft:oxidized_copper_lantern":[978,978,978,1],"minecraft:oxidized_copper_trapdoor":[979,979,979,1],"minecraft:oxidized_cut_copper":[980,980,980,0],"minecraft:oxidized_lightning_rod":[981,981,981,1],"minecraft:packed_ice":[982,982,982,0],"minecraft:packed_mud":[983,983,983,0],"minecraft:pale_hanging_moss":[984,984,984,1],"minecraft:pale_hanging_moss_tip":[985,985,985,1],"minecraft:pale_moss_block":[986,986,986,0],"minecraft:pale_moss_carpet_side_short":[987,987,987,1],"minecraft:pale_moss_carpet_side_small":[988,988,988,1],"minecraft:pale_moss_carpet_side_tall":[989,989,989,1],"minecraft:pale_oak_door":[990,990,990,0],"minecraft:pale_oak_door[half=upper]":[1732,1732,1732,0],"minecraft:pale_oak_leaves":[991,991,991,1],"minecraft:pale_oak_log":[992,993,993,0],"minecraft:pale_oak_planks":[994,994,994,0],"minecraft:pale_oak_sapling":[995,995,995,1],"minecraft:pale_oak_shelf":[996,996,996,0],"minecraft:pale_oak_trapdoor":[997,997,997,0],"minecraft:pearlescent_froglight":[998,998,999,0],"minecraft:pearlescent_froglight_side_s":[1e3,1e3,1e3,2],"minecraft:pearlescent_froglight_top_s":[1001,1001,1001,1],"minecraft:peony":[1002,1002,1002,1],"minecraft:peony[half=upper]":[1753,1753,1753,1],"minecraft:piglin_head":[1773,1774,1775,0],"minecraft:piglin_wall_head":[1773,1774,1775,0],"minecraft:pink_banner":[1013,1013,1013,0],"minecraft:pink_bed":[1003,1003,1003,0],"minecraft:pink_candle":[95,95,95,1],"minecraft:pink_candle_lit":[1004,1004,1004,1],"minecraft:pink_carpet":[1013,1013,1013,0],"minecraft:pink_concrete":[1005,1005,1005,0],"minecraft:pink_concrete_powder":[1006,1006,1006,0],"minecraft:pink_glazed_terracotta":[1007,1007,1007,0],"minecraft:pink_petals":[1008,1008,1008,1],"minecraft:pink_petals_stem":[1009,1009,1009,1],"minecraft:pink_stained_glass":[1010,1010,1010,2],"minecraft:pink_terracotta":[1011,1011,1011,0],"minecraft:pink_tulip":[1012,1012,1012,1],"minecraft:pink_wall_banner":[1013,1013,1013,0],"minecraft:pink_wool":[1013,1013,1013,0],"minecraft:piston":[1014,1015,1016,0],"minecraft:piston_head":[1014,1017,1016,0],"minecraft:piston_inner":[1017,1017,1017,0],"minecraft:piston_top_sticky":[1018,1018,1018,0],"minecraft:pitcher_crop":[1019,1020,1021,1],"minecraft:pitcher_crop_bottom_stage_1":[1022,1022,1022,1],"minecraft:pitcher_crop_bottom_stage_2":[1023,1023,1023,1],"minecraft:pitcher_crop_bottom_stage_4":[1024,1024,1024,1],"minecraft:pitcher_crop_head_mouth_stage_2":[1025,1025,1025,1],"minecraft:pitcher_crop_head_mouth_stage_3":[1026,1026,1026,1],"minecraft:pitcher_crop_head_mouth_stage_4":[1027,1027,1027,1],"minecraft:pitcher_crop_head_stage_2":[1028,1028,1028,1],"minecraft:pitcher_crop_head_stage_3":[1029,1029,1029,1],"minecraft:pitcher_crop_head_stage_4":[1030,1030,1030,1],"minecraft:pitcher_plant":[1020,1020,1020,1],"minecraft:pitcher_plant[half=upper]":[1019,1019,1019,1],"minecraft:player_head":[1776,1777,1778,0],"minecraft:player_wall_head":[1776,1777,1778,0],"minecraft:podzol":[1031,558,1032,0],"minecraft:podzol[snowy=true]":[1031,558,696,0],"minecraft:polished_andesite":[1033,1033,1033,0],"minecraft:polished_basalt":[1034,1034,1035,0],"minecraft:polished_blackstone":[1036,1036,1036,0],"minecraft:polished_blackstone_bricks":[1037,1037,1037,0],"minecraft:polished_blackstone_bricks1":[1038,1038,1038,0],"minecraft:polished_blackstone_bricks2":[1039,1039,1039,0],"minecraft:polished_blackstone_bricks3":[1040,1040,1040,0],"minecraft:polished_cinnabar":[1041,1041,1041,0],"minecraft:polished_deepslate":[1042,1042,1042,0],"minecraft:polished_diorite":[1043,1043,1043,0],"minecraft:polished_granite":[1044,1044,1044,0],"minecraft:polished_sulfur":[1045,1045,1045,0],"minecraft:polished_tuff":[1046,1046,1046,0],"minecraft:poplar_door":[1047,1047,1047,0],"minecraft:poplar_door[half=upper]":[1733,1733,1733,1],"minecraft:poplar_log":[1048,1049,1049,0],"minecraft:poplar_log1":[1050,1050,1050,0],"minecraft:poplar_planks":[1051,1051,1051,0],"minecraft:poplar_planks1":[1052,1052,1052,0],"minecraft:poplar_planks2":[1053,1053,1053,0],"minecraft:poplar_sapling":[1054,1054,1054,1],"minecraft:poplar_sapling_orange":[1055,1055,1055,1],"minecraft:poplar_shelf":[1056,1056,1056,0],"minecraft:poplar_trapdoor":[1057,1057,1057,1],"minecraft:poppy":[1058,1058,1058,1],"minecraft:portal":[1059,1059,1059,0],"minecraft:potatoes":[1063,1063,1063,1],"minecraft:potatoes_stage0":[1060,1060,1060,1],"minecraft:potatoes_stage1":[1061,1061,1061,1],"minecraft:potatoes_stage2":[1062,1062,1062,1],"minecraft:potatoes_stage3":[1063,1063,1063,1],"minecraft:potatoes_stage3_vegitable":[1064,1064,1064,1],"minecraft:potent_sulfur":[1065,1065,1065,0],"minecraft:potted_acacia_sapling":[657,657,657,1],"minecraft:potted_allium":[657,657,657,1],"minecraft:potted_azalea_bush":[1067,1067,1068,1],"minecraft:potted_azalea_bush_plant":[1066,1066,1066,1],"minecraft:potted_azure_bluet":[657,657,657,1],"minecraft:potted_bamboo":[657,657,657,1],"minecraft:potted_birch_sapling":[657,657,657,1],"minecraft:potted_blue_orchid":[657,657,657,1],"minecraft:potted_brown_mushroom":[657,657,657,1],"minecraft:potted_cactus":[657,657,657,1],"minecraft:potted_cherry_sapling":[657,657,657,1],"minecraft:potted_cornflower":[657,657,657,1],"minecraft:potted_dandelion":[657,657,657,1],"minecraft:potted_dark_oak_sapling":[657,657,657,1],"minecraft:potted_dead_bush":[657,657,657,1],"minecraft:potted_fern":[657,657,657,1],"minecraft:potted_flowering_azalea_bush":[1070,1070,1071,1],"minecraft:potted_flowering_azalea_bush_plant":[1069,1069,1069,1],"minecraft:potted_jungle_sapling":[657,657,657,1],"minecraft:potted_lily_of_the_valley":[657,657,657,1],"minecraft:potted_mangrove_sapling":[657,657,657,1],"minecraft:potted_oak_sapling":[657,657,657,1],"minecraft:potted_orange_tulip":[657,657,657,1],"minecraft:potted_oxeye_daisy":[657,657,657,1],"minecraft:potted_pink_tulip":[657,657,657,1],"minecraft:potted_poppy":[657,657,657,1],"minecraft:potted_red_mushroom":[657,657,657,1],"minecraft:potted_red_tulip":[657,657,657,1],"minecraft:potted_spruce_sapling":[657,657,657,1],"minecraft:potted_torchflower":[657,657,657,1],"minecraft:potted_white_tulip":[657,657,657,1],"minecraft:potted_wither_rose":[657,657,657,1],"minecraft:powder_snow":[1072,1072,1072,0],"minecraft:powder_snow_cauldron":[187,188,189,0],"minecraft:powered_rail":[1073,1073,1073,1],"minecraft:powered_rail_on":[1074,1074,1074,1],"minecraft:powered_rail_on_e":[1075,1075,1075,1],"minecraft:powered_rail_on_e_s":[1076,1076,1076,1],"minecraft:powered_rail_on_s":[1077,1077,1077,1],"minecraft:prismarine":[1078,1078,1078,0],"minecraft:prismarine_bricks":[1079,1079,1079,0],"minecraft:pumpkin":[185,185,1080,0],"minecraft:pumpkin_stem":[1081,1081,1081,1],"minecraft:purple_banner":[1089,1089,1089,0],"minecraft:purple_bed":[1082,1082,1082,0],"minecraft:purple_candle":[95,95,95,1],"minecraft:purple_candle_lit":[1083,1083,1083,1],"minecraft:purple_carpet":[1089,1089,1089,0],"minecraft:purple_concrete":[1084,1084,1084,0],"minecraft:purple_concrete_powder":[1085,1085,1085,0],"minecraft:purple_glazed_terracotta":[1086,1086,1086,0],"minecraft:purple_stained_glass":[1087,1087,1087,2],"minecraft:purple_terracotta":[1088,1088,1088,0],"minecraft:purple_wall_banner":[1089,1089,1089,0],"minecraft:purple_wool":[1089,1089,1089,0],"minecraft:purpur_block":[1090,1090,1090,0],"minecraft:purpur_pillar":[1091,1091,1092,0],"minecraft:quartz_block":[1093,1094,1095,0],"minecraft:quartz_bricks":[1096,1096,1096,0],"minecraft:quartz_pillar":[1097,1097,1098,0],"minecraft:rail":[1099,1099,1099,1],"minecraft:rail_corner":[1100,1100,1100,1],"minecraft:raw_copper_block":[1101,1101,1101,0],"minecraft:raw_gold_block":[1102,1102,1102,0],"minecraft:raw_iron_block":[1103,1103,1103,0],"minecraft:red_banner":[1128,1128,1128,0],"minecraft:red_bed":[1104,1104,1104,0],"minecraft:red_candle":[95,95,95,1],"minecraft:red_candle_lit":[1105,1105,1105,1],"minecraft:red_carpet":[1128,1128,1128,0],"minecraft:red_concrete":[1106,1106,1106,0],"minecraft:red_concrete_powder":[1107,1107,1107,0],"minecraft:red_glazed_terracotta":[1108,1108,1108,0],"minecraft:red_mushroom":[1109,1109,1109,1],"minecraft:red_mushroom_block":[1110,1110,1110,0],"minecraft:red_mushroom_block_model":[1111,1111,1111,0],"minecraft:red_nether_bricks":[1112,1112,1112,0],"minecraft:red_poplar_leaves":[1113,1113,1113,1],"minecraft:red_poplar_leaves1":[1114,1114,1114,1],"minecraft:red_sand":[1115,1115,1115,0],"minecraft:red_sand1":[1116,1116,1116,0],"minecraft:red_sand2":[1117,1117,1117,0],"minecraft:red_sandstone":[1118,1119,1120,0],"minecraft:red_sandstone1":[1121,1121,1121,0],"minecraft:red_sandstone2":[1122,1122,1122,0],"minecraft:red_sandstonel1":[1123,1123,1123,0],"minecraft:red_shrub":[1124,1124,1124,1],"minecraft:red_stained_glass":[1125,1125,1125,2],"minecraft:red_terracotta":[1126,1126,1126,0],"minecraft:red_tulip":[1127,1127,1127,1],"minecraft:red_wall_banner":[1128,1128,1128,0],"minecraft:red_wool":[1128,1128,1128,0],"minecraft:redstone_block":[1129,1129,1129,0],"minecraft:redstone_dust_cross_overlay":[1130,1130,1130,1],"minecraft:redstone_dust_dot":[1131,1131,1131,1],"minecraft:redstone_dust_line_overlay":[1132,1132,1132,1],"minecraft:redstone_dust_line0":[1133,1133,1133,1],"minecraft:redstone_dust_line1":[1134,1134,1134,1],"minecraft:redstone_lamp":[1135,1135,1135,0],"minecraft:redstone_lamp_on":[1136,1136,1136,0],"minecraft:redstone_lamp_on_e":[1137,1137,1137,1],"minecraft:redstone_lamp_on_e_s":[1138,1138,1138,2],"minecraft:redstone_lamp_on_s":[1139,1139,1139,2],"minecraft:redstone_ore":[1140,1140,1140,0],"minecraft:redstone_ore1":[1141,1141,1141,0],"minecraft:redstone_torch":[1142,1142,1142,1],"minecraft:redstone_torch_e":[1143,1143,1143,1],"minecraft:redstone_torch_e_s":[1144,1144,1144,1],"minecraft:redstone_torch_extra_on":[1145,1145,1145,1],"minecraft:redstone_torch_new":[1146,1146,1146,1],"minecraft:redstone_torch_off":[1147,1147,1147,1],"minecraft:redstone_torch_s":[1148,1148,1148,1],"minecraft:redstone_torch[lit=false]":[1147,1147,1147,1],"minecraft:redstone_wall_torch":[1142,1142,1142,1],"minecraft:redstone_wire":[1754,1754,1754,1],"minecraft:reeds":[1149,1149,1149,1],"minecraft:reeds_extra":[1150,1150,1150,1],"minecraft:reinforced_deepslate":[1151,1152,1153,0],"minecraft:repeater":[1154,1154,1154,1],"minecraft:repeater_on":[1155,1155,1155,1],"minecraft:repeating_command_block_back":[1156,1156,1156,0],"minecraft:repeating_command_block_back_e":[1157,1157,1157,1],"minecraft:repeating_command_block_back_e_s":[1158,1158,1158,1],"minecraft:repeating_command_block_back_s":[1159,1159,1159,1],"minecraft:repeating_command_block_conditional":[1160,1160,1160,0],"minecraft:repeating_command_block_conditional_e":[1161,1161,1161,1],"minecraft:repeating_command_block_conditional_s":[1162,1162,1162,1],"minecraft:repeating_command_block_front":[1163,1163,1163,0],"minecraft:repeating_command_block_front_e":[1164,1164,1164,1],"minecraft:repeating_command_block_front_e_s":[1165,1165,1165,1],"minecraft:repeating_command_block_front_s":[1166,1166,1166,1],"minecraft:repeating_command_block_side_e":[1167,1167,1167,1],"minecraft:repeating_command_block_side_e_s":[1168,1168,1168,1],"minecraft:repeating_command_block_side_s":[1169,1169,1169,1],"minecraft:resin_block":[1170,1170,1170,0],"minecraft:resin_bricks":[1171,1171,1171,0],"minecraft:resin_clump":[1172,1172,1172,0],"minecraft:respawn_anchor":[1173,1174,1173,0],"minecraft:respawn_anchor_bottom_e":[1175,1175,1175,1],"minecraft:respawn_anchor_bottom_e_s":[1176,1176,1176,1],"minecraft:respawn_anchor_bottom_s":[1177,1177,1177,1],"minecraft:respawn_anchor_side0":[1178,1178,1178,0],"minecraft:respawn_anchor_side0_e":[1179,1179,1179,1],"minecraft:respawn_anchor_side0_e_s":[1180,1180,1180,1],"minecraft:respawn_anchor_side0_s":[1181,1181,1181,1],"minecraft:respawn_anchor_side1":[1182,1182,1182,0],"minecraft:respawn_anchor_side1_e":[1183,1183,1183,1],"minecraft:respawn_anchor_side1_e_s":[1184,1184,1184,1],"minecraft:respawn_anchor_side1_s":[1185,1185,1185,1],"minecraft:respawn_anchor_side2":[1186,1186,1186,0],"minecraft:respawn_anchor_side2_e":[1187,1187,1187,1],"minecraft:respawn_anchor_side2_e_s":[1188,1188,1188,1],"minecraft:respawn_anchor_side2_s":[1189,1189,1189,1],"minecraft:respawn_anchor_side3":[1190,1190,1190,0],"minecraft:respawn_anchor_side3_e":[1191,1191,1191,1],"minecraft:respawn_anchor_side3_e_s":[1192,1192,1192,1],"minecraft:respawn_anchor_side3_s":[1193,1193,1193,1],"minecraft:respawn_anchor_side4":[1194,1194,1194,0],"minecraft:respawn_anchor_side4_e":[1195,1195,1195,1],"minecraft:respawn_anchor_side4_e_s":[1196,1196,1196,2],"minecraft:respawn_anchor_side4_s":[1197,1197,1197,2],"minecraft:respawn_anchor_top_e":[1198,1198,1198,1],"minecraft:respawn_anchor_top_off":[1199,1199,1199,1],"minecraft:respawn_anchor_top_off_e":[1200,1200,1200,1],"minecraft:respawn_anchor_top_off_e_s":[1201,1201,1201,1],"minecraft:respawn_anchor_top_off_s":[1202,1202,1202,1],"minecraft:rooted_dirt":[1203,1203,1203,0],"minecraft:rose_bush":[1204,1204,1204,1],"minecraft:rose_bush[half=upper]":[1752,1752,1752,1],"minecraft:sand":[1205,1205,1205,0],"minecraft:sand1":[1206,1206,1206,0],"minecraft:sand2":[1207,1207,1207,0],"minecraft:sand4":[1208,1208,1208,0],"minecraft:sandstone":[1209,1210,1211,0],"minecraft:sandstone1":[1212,1212,1212,0],"minecraft:sandstone2":[1213,1213,1213,0],"minecraft:scaffolding":[1214,1215,1216,1],"minecraft:sculk":[1217,1217,1217,0],"minecraft:sculk_and_soul_colours":[1218,1218,1218,0],"minecraft:sculk_catalyst":[1219,1220,1221,0],"minecraft:sculk_catalyst_bottom_e":[1222,1222,1222,1],"minecraft:sculk_catalyst_bottom_s":[1223,1223,1223,1],"minecraft:sculk_catalyst_side_bloom":[1224,1224,1224,0],"minecraft:sculk_catalyst_top_bloom":[1225,1225,1225,0],"minecraft:sculk_catalyst_top_e":[1226,1226,1226,1],"minecraft:sculk_catalyst_top_s":[1227,1227,1227,1],"minecraft:sculk_e_s":[1228,1228,1228,1],"minecraft:sculk_s":[1229,1229,1229,1],"minecraft:sculk_sensor":[1230,1231,1232,1],"minecraft:sculk_sensor_bottom_e":[1233,1233,1233,1],"minecraft:sculk_sensor_bottom_s":[1234,1234,1234,1],"minecraft:sculk_sensor_side_e":[1235,1235,1235,1],"minecraft:sculk_sensor_side_s":[1236,1236,1236,1],"minecraft:sculk_sensor_tendril_active":[1237,1237,1237,1],"minecraft:sculk_sensor_tendril_inactive":[1238,1238,1238,1],"minecraft:sculk_sensor_top_e":[1239,1239,1239,1],"minecraft:sculk_sensor_top_s":[1240,1240,1240,1],"minecraft:sculk_shrieker":[1241,1242,1243,1],"minecraft:sculk_shrieker_bottom_e":[1244,1244,1244,1],"minecraft:sculk_shrieker_can_summon_inner_top_e":[1245,1245,1245,1],"minecraft:sculk_shrieker_can_summon_inner_top_s":[1246,1246,1246,2],"minecraft:sculk_shrieker_side_e":[1247,1247,1247,1],"minecraft:sculk_vein":[1248,1248,1248,1],"minecraft:sculk1":[1249,1249,1249,0],"minecraft:sculk1_e":[1250,1250,1250,1],"minecraft:sculk1_s":[1251,1251,1251,1],"minecraft:sculk2":[1252,1252,1252,0],"minecraft:sculk2_e":[1253,1253,1253,1],"minecraft:sculk2_s":[1254,1254,1254,1],"minecraft:sculk3":[1255,1255,1255,0],"minecraft:sculk3_e":[1256,1256,1256,1],"minecraft:sculk3_s":[1257,1257,1257,1],"minecraft:sculk4":[1258,1258,1258,0],"minecraft:sculk4_e":[1259,1259,1259,1],"minecraft:sea_lantern":[1260,1260,1260,0],"minecraft:sea_lantern_e":[1261,1261,1261,1],"minecraft:sea_lantern_s":[1262,1262,1262,2],"minecraft:sea_pickle":[1263,1263,1263,1],"minecraft:sea_pickle_e":[1264,1264,1264,1],"minecraft:sea_pickle_e_s":[1265,1265,1265,1],"minecraft:sea_pickle_s":[1266,1266,1266,1],"minecraft:seagrass":[1267,1267,1267,1],"minecraft:shelf_mushroom_stage0":[1268,1268,1268,1],"minecraft:shelf_mushroom_stage1":[1269,1269,1269,1],"minecraft:short_dry_grass":[1270,1270,1270,1],"minecraft:short_grass":[692,692,692,1],"minecraft:shroomlight":[1271,1271,1271,0],"minecraft:shroomlight_e":[1272,1272,1272,0],"minecraft:shroomlight_e_s":[1273,1273,1273,2],"minecraft:shroomlight_s":[1274,1274,1274,2],"minecraft:sign_acacia":[1275,1275,1275,1],"minecraft:sign_bamboo":[1276,1276,1276,1],"minecraft:sign_birch":[1277,1277,1277,1],"minecraft:sign_cherry":[1278,1278,1278,1],"minecraft:sign_crimson":[1279,1279,1279,1],"minecraft:sign_dark_oak":[1280,1280,1280,1],"minecraft:sign_jungle":[1281,1281,1281,1],"minecraft:sign_mangrove":[1282,1282,1282,1],"minecraft:sign_oak":[1283,1283,1283,1],"minecraft:sign_pale_oak":[1284,1284,1284,1],"minecraft:sign_poplar":[1285,1285,1285,1],"minecraft:sign_spruce":[1286,1286,1286,1],"minecraft:sign_warped":[1287,1287,1287,1],"minecraft:skeleton_skull":[1767,1768,1769,0],"minecraft:skeleton_wall_skull":[1767,1768,1769,0],"minecraft:slime_block":[1288,1288,1288,2],"minecraft:slime_block1":[1289,1289,1289,2],"minecraft:slime_block2":[1290,1290,1290,2],"minecraft:slime_block3":[1291,1291,1291,2],"minecraft:slime_block4":[1292,1292,1292,2],"minecraft:small_amethyst_bud":[1293,1293,1293,1],"minecraft:small_dripleaf":[1294,1294,1295,1],"minecraft:small_dripleaf_stem":[1296,1297,1296,1],"minecraft:smithing_table":[1298,1299,1300,0],"minecraft:smithing_table_bottom2":[1301,1301,1301,0],"minecraft:smithing_table_front":[1302,1302,1302,0],"minecraft:smithing_table_front2":[1303,1303,1303,0],"minecraft:smithing_table_side2":[1304,1304,1304,0],"minecraft:smithing_table_top2":[1305,1305,1305,0],"minecraft:smoker":[1306,1307,1308,0],"minecraft:smoker_front":[1309,1309,1309,0],"minecraft:smoker_front_on":[1310,1310,1310,0],"minecraft:smoker_front_on_e":[1311,1311,1311,1],"minecraft:smoker_front_on_e_s":[1312,1312,1312,1],"minecraft:smoker_front_on_s":[1313,1313,1313,1],"minecraft:smooth_basalt":[1314,1314,1314,0],"minecraft:smooth_quartz":[1094,1094,1094,0],"minecraft:smooth_red_sandstone":[1118,1118,1118,0],"minecraft:smooth_sandstone":[1209,1209,1209,0],"minecraft:smooth_stone":[1315,1315,1315,0],"minecraft:sniffer_egg_not_cracked":[1316,1316,1316,1],"minecraft:sniffer_egg_slightly_cracked":[1317,1317,1317,1],"minecraft:sniffer_egg_very_cracked":[1318,1318,1318,1],"minecraft:snow":[1319,1319,1319,0],"minecraft:snow_block":[1319,1319,1319,0],"minecraft:soul_campfire_fire":[1320,1320,1320,1],"minecraft:soul_campfire_fire_e":[1321,1321,1321,1],"minecraft:soul_campfire_fire_e_s":[1322,1322,1322,2],"minecraft:soul_campfire_fire_s":[1323,1323,1323,2],"minecraft:soul_campfire_log_lit":[1324,1324,1324,1],"minecraft:soul_fire_0":[1325,1325,1325,1],"minecraft:soul_fire_0_e":[1326,1326,1326,1],"minecraft:soul_fire_0_e_s":[1327,1327,1327,2],"minecraft:soul_fire_0_s":[1328,1328,1328,2],"minecraft:soul_fire_1":[1329,1329,1329,1],"minecraft:soul_fire_1_e":[1330,1330,1330,1],"minecraft:soul_fire_1_e_s":[1331,1331,1331,2],"minecraft:soul_fire_1_s":[1332,1332,1332,2],"minecraft:soul_lantern":[1333,1333,1333,1],"minecraft:soul_lantern_e":[1334,1334,1334,1],"minecraft:soul_lantern_e_s":[1335,1335,1335,1],"minecraft:soul_lantern_extra":[1336,1336,1336,1],"minecraft:soul_lantern_s":[1337,1337,1337,1],"minecraft:soul_sand":[1338,1338,1338,0],"minecraft:soul_soil":[1339,1339,1339,0],"minecraft:soul_torch":[1340,1340,1340,1],"minecraft:soul_torch_e":[1341,1341,1341,1],"minecraft:soul_torch_e_s":[1342,1342,1342,1],"minecraft:soul_torch_s":[1343,1343,1343,1],"minecraft:spawner":[1344,1344,1345,1],"minecraft:spawner_ejecting_glow":[1346,1346,1346,2],"minecraft:spawner_side_e":[1347,1347,1347,1],"minecraft:spawner_side_e_s":[1348,1348,1348,1],"minecraft:spawner_side_s":[1349,1349,1349,1],"minecraft:sponge":[1350,1350,1350,0],"minecraft:spore_blossom":[1351,1351,1351,1],"minecraft:spore_blossom_base":[1352,1352,1352,1],"minecraft:spruce_door":[1353,1353,1353,1],"minecraft:spruce_door[half=upper]":[1734,1734,1734,1],"minecraft:spruce_hanging_sign":[1781,1781,1781,0],"minecraft:spruce_leaves":[1354,1354,1354,1],"minecraft:spruce_leaves1":[1355,1355,1355,1],"minecraft:spruce_log":[1356,1356,1357,0],"minecraft:spruce_log1":[1358,1358,1358,0],"minecraft:spruce_planks":[1359,1359,1359,0],"minecraft:spruce_planks1":[1360,1360,1360,0],"minecraft:spruce_planks2":[1361,1361,1361,0],"minecraft:spruce_sapling":[1362,1362,1362,1],"minecraft:spruce_shelf":[1363,1363,1363,0],"minecraft:spruce_sign":[1781,1781,1781,0],"minecraft:spruce_trapdoor":[1364,1364,1364,1],"minecraft:spruce_wall_sign":[1781,1781,1781,0],"minecraft:spruce_wood":[1357,1357,1357,0],"minecraft:stem":[1365,1365,1365,1],"minecraft:stem_leaf":[1366,1366,1366,1],"minecraft:stem_melon_fruit":[1367,1367,1367,1],"minecraft:stem_pumpkin_fruit":[1368,1368,1368,1],"minecraft:sticky_piston":[1018,1015,1016,0],"minecraft:stone":[1369,1369,1369,0],"minecraft:stone_bricks":[1370,1370,1370,0],"minecraft:stone_bricks1":[1371,1371,1371,0],"minecraft:stone_bricks2":[1372,1372,1372,0],"minecraft:stone_bricks3":[1373,1373,1373,0],"minecraft:stone_diorite1":[1374,1374,1374,0],"minecraft:stone_granite1":[1375,1375,1375,0],"minecraft:stone_slab_top2":[1377,1377,1377,0],"minecraft:stone_slab_top2 (2)":[1376,1376,1376,0],"minecraft:stone1":[1378,1378,1378,0],"minecraft:stone10":[1379,1379,1379,0],"minecraft:stone2":[1380,1380,1380,0],"minecraft:stone3":[1381,1381,1381,0],"minecraft:stone4":[1382,1382,1382,0],"minecraft:stone5":[1383,1383,1383,0],"minecraft:stone6":[1384,1384,1384,0],"minecraft:stone7":[1385,1385,1385,0],"minecraft:stone8":[1386,1386,1386,0],"minecraft:stone9":[1387,1387,1387,0],"minecraft:stonecutter":[1388,1389,1390,0],"minecraft:stonecutter_saw":[1391,1391,1391,1],"minecraft:stonecutter_saw1":[1392,1392,1392,1],"minecraft:stonecutter_side1":[1393,1393,1393,1],"minecraft:stonecutter_top1":[1394,1394,1394,0],"minecraft:straw_bed":[1395,1395,1395,1],"minecraft:straw_bed_particle":[1396,1396,1396,0],"minecraft:stripped_acacia_log":[1397,1397,1398,0],"minecraft:stripped_acacia_wood":[1398,1398,1398,0],"minecraft:stripped_bamboo_block":[1399,1400,1400,0],"minecraft:stripped_birch_log":[1401,1401,1402,0],"minecraft:stripped_birch_wood":[1402,1402,1402,0],"minecraft:stripped_cherry_log":[1403,1403,1404,0],"minecraft:stripped_cherry_wood":[1404,1404,1404,0],"minecraft:stripped_crimson_stem":[1405,1405,1406,0],"minecraft:stripped_dark_oak_log":[1407,1407,1408,0],"minecraft:stripped_dark_oak_wood":[1408,1408,1408,0],"minecraft:stripped_jungle_log":[1409,1409,1410,0],"minecraft:stripped_jungle_wood":[1410,1410,1410,0],"minecraft:stripped_mangrove_log":[1411,1411,1412,0],"minecraft:stripped_mangrove_wood":[1412,1412,1412,0],"minecraft:stripped_oak_log":[1413,1413,1414,0],"minecraft:stripped_oak_wood":[1414,1414,1414,0],"minecraft:stripped_pale_oak_log":[1415,1416,1416,0],"minecraft:stripped_poplar_log":[1417,1418,1418,0],"minecraft:stripped_spruce_log":[1419,1419,1420,0],"minecraft:stripped_spruce_wood":[1420,1420,1420,0],"minecraft:stripped_warped_stem":[1421,1421,1422,0],"minecraft:structure_block":[1423,1423,1423,0],"minecraft:structure_block_corner":[1424,1424,1424,0],"minecraft:structure_block_corner_e":[1425,1425,1425,1],"minecraft:structure_block_corner_e_s":[1426,1426,1426,1],"minecraft:structure_block_corner_s":[1427,1427,1427,1],"minecraft:structure_block_data":[1428,1428,1428,0],"minecraft:structure_block_data_e":[1429,1429,1429,1],"minecraft:structure_block_data_e_s":[1430,1430,1430,1],"minecraft:structure_block_data_s":[1431,1431,1431,1],"minecraft:structure_block_e":[1432,1432,1432,1],"minecraft:structure_block_e_s":[1433,1433,1433,1],"minecraft:structure_block_load":[1434,1434,1434,0],"minecraft:structure_block_load_e":[1435,1435,1435,1],"minecraft:structure_block_load_e_s":[1436,1436,1436,1],"minecraft:structure_block_load_s":[1437,1437,1437,1],"minecraft:structure_block_s":[1438,1438,1438,1],"minecraft:structure_block_save":[1439,1439,1439,0],"minecraft:structure_block_save_e":[1440,1440,1440,1],"minecraft:structure_block_save_e_s":[1441,1441,1441,1],"minecraft:structure_block_save_s":[1442,1442,1442,1],"minecraft:sugar_cane":[1443,1443,1443,1],"minecraft:sugar_cane_extra":[1444,1444,1444,1],"minecraft:sulfur":[1445,1445,1445,0],"minecraft:sulfur_bricks":[1446,1446,1446,0],"minecraft:sulfur_spike":[1447,1447,1447,0],"minecraft:sulfur_spire_small":[1448,1448,1448,1],"minecraft:sunflower":[1450,1450,1450,1],"minecraft:sunflower_back":[1449,1449,1449,1],"minecraft:sunflower_front":[1451,1451,1451,1],"minecraft:sunflower[half=upper]":[1451,1451,1451,1],"minecraft:suspicious_gravel_0":[1452,1452,1452,0],"minecraft:suspicious_gravel_1":[1453,1453,1453,0],"minecraft:suspicious_gravel_2":[1454,1454,1454,0],"minecraft:suspicious_gravel_3":[1455,1455,1455,0],"minecraft:suspicious_sand":[1456,1456,1456,0],"minecraft:suspicious_sand_0":[1457,1457,1457,0],"minecraft:suspicious_sand_1":[1458,1458,1458,0],"minecraft:suspicious_sand_2":[1459,1459,1459,0],"minecraft:suspicious_sand_3":[1460,1460,1460,0],"minecraft:sweet_berry_bush":[1464,1464,1464,1],"minecraft:sweet_berry_bush_stage0":[1461,1461,1461,1],"minecraft:sweet_berry_bush_stage1":[1462,1462,1462,1],"minecraft:sweet_berry_bush_stage2":[1463,1463,1463,1],"minecraft:sweet_berry_bush_stage3":[1464,1464,1464,1],"minecraft:tall_dry_grass":[1465,1465,1465,1],"minecraft:tall_grass":[1466,1466,1466,1],"minecraft:tall_grass[half=upper]":[1749,1749,1749,1],"minecraft:tall_seagrass":[1467,1467,1467,1],"minecraft:tall_seagrass[half=upper]":[1747,1747,1747,1],"minecraft:target":[1468,1468,1469,0],"minecraft:terracotta":[1470,1470,1470,0],"minecraft:test_block_accept":[1471,1471,1471,0],"minecraft:test_block_accept_e":[1472,1472,1472,1],"minecraft:test_block_fail":[1473,1473,1473,0],"minecraft:test_block_fail_e":[1474,1474,1474,1],"minecraft:test_block_log":[1475,1475,1475,0],"minecraft:test_block_log_e":[1476,1476,1476,1],"minecraft:test_block_start":[1477,1477,1477,0],"minecraft:test_block_start_e":[1478,1478,1478,1],"minecraft:test_instance_block":[1479,1479,1479,0],"minecraft:test_instance_block_e":[1480,1480,1480,1],"minecraft:tinted_glass":[1481,1481,1481,2],"minecraft:tnt":[1482,1483,1484,0],"minecraft:tnt_top1":[1485,1485,1485,0],"minecraft:torch":[1486,1486,1486,1],"minecraft:torch_e":[1487,1487,1487,1],"minecraft:torch_e_s":[1488,1488,1488,1],"minecraft:torch_s":[1489,1489,1489,1],"minecraft:torchflower":[1490,1490,1490,1],"minecraft:torchflower_crop_stage0":[1491,1491,1491,1],"minecraft:torchflower_crop_stage1":[1492,1492,1492,1],"minecraft:torchflower_crop_stage2":[1493,1493,1493,1],"minecraft:trapdoor":[1494,1494,1494,1],"minecraft:trapped_chest":[1741,1742,1743,0],"minecraft:trial_spawner":[1495,1496,1497,1],"minecraft:trial_spawner_side_active":[1498,1498,1498,1],"minecraft:trial_spawner_side_active_ominous":[1499,1499,1499,1],"minecraft:trial_spawner_side_active_ominous_s":[1500,1500,1500,1],"minecraft:trial_spawner_side_active_s":[1501,1501,1501,1],"minecraft:trial_spawner_side_dispensing_ominous":[1502,1502,1502,1],"minecraft:trial_spawner_side_dispensing_ominous_s":[1503,1503,1503,1],"minecraft:trial_spawner_side_e":[1504,1504,1504,1],"minecraft:trial_spawner_side_inactive":[1505,1505,1505,1],"minecraft:trial_spawner_side_inactive_ominous":[1506,1506,1506,1],"minecraft:trial_spawner_side_ominous":[1507,1507,1507,1],"minecraft:trial_spawner_side_ominous_e":[1508,1508,1508,1],"minecraft:trial_spawner_side_ominous_off_e":[1509,1509,1509,1],"minecraft:trial_spawner_side_ominous_s":[1510,1510,1510,1],"minecraft:trial_spawner_side_on_e":[1511,1511,1511,1],"minecraft:trial_spawner_side_on_ominous_e":[1512,1512,1512,1],"minecraft:trial_spawner_side_s":[1513,1513,1513,1],"minecraft:trial_spawner_top_active":[1514,1514,1514,1],"minecraft:trial_spawner_top_e":[1515,1515,1515,1],"minecraft:trial_spawner_top_ejecting_reward":[1516,1516,1516,0],"minecraft:trial_spawner_top_ejecting_reward_s":[1517,1517,1517,2],"minecraft:trial_spawner_top_inactive":[1518,1518,1518,1],"minecraft:trip_wire":[1519,1519,1519,1],"minecraft:trip_wire_source":[1520,1520,1520,1],"minecraft:tripwire_hook":[1521,1521,1521,1],"minecraft:tube_coral":[1522,1522,1522,1],"minecraft:tube_coral_block":[1523,1523,1523,0],"minecraft:tube_coral_fan":[1524,1524,1524,1],"minecraft:tuff":[1525,1525,1525,0],"minecraft:tuff_bricks":[1526,1526,1526,0],"minecraft:tuff_bricks1":[1527,1527,1527,0],"minecraft:tuff_bricks2":[1528,1528,1528,0],"minecraft:tuff_bricks3":[1529,1529,1529,0],"minecraft:tuff_bricks4":[1530,1530,1530,0],"minecraft:turtle_egg":[1531,1531,1531,1],"minecraft:turtle_egg_slightly_cracked":[1532,1532,1532,1],"minecraft:turtle_egg_very_cracked":[1533,1533,1533,1],"minecraft:twisting_vines":[1534,1534,1534,1],"minecraft:twisting_vines_plant":[1535,1535,1535,1],"minecraft:twisting_vines_plant1":[1536,1536,1536,1],"minecraft:twisting_vines_plant1_e":[1537,1537,1537,1],"minecraft:twisting_vines_plant1_e_s":[1538,1538,1538,1],"minecraft:twisting_vines_plant1_s":[1539,1539,1539,1],"minecraft:twisting_vines_plant2":[1540,1540,1540,1],"minecraft:twisting_vines_plant2_e":[1541,1541,1541,1],"minecraft:twisting_vines_plant2_e_s":[1542,1542,1542,1],"minecraft:twisting_vines_plant2_s":[1543,1543,1543,1],"minecraft:twisting_vines_plant3":[1544,1544,1544,1],"minecraft:twisting_vines_plant3_e":[1545,1545,1545,1],"minecraft:twisting_vines_plant3_e_s":[1546,1546,1546,1],"minecraft:twisting_vines_plant3_s":[1547,1547,1547,1],"minecraft:twisting_vines1":[1548,1548,1548,1],"minecraft:twisting_vines1_e":[1549,1549,1549,1],"minecraft:twisting_vines1_e_s":[1550,1550,1550,1],"minecraft:twisting_vines1_s":[1551,1551,1551,1],"minecraft:twisting_vines2":[1552,1552,1552,1],"minecraft:twisting_vines2_e":[1553,1553,1553,1],"minecraft:twisting_vines2_e_s":[1554,1554,1554,1],"minecraft:twisting_vines2_s":[1555,1555,1555,1],"minecraft:twisting_vines3":[1556,1556,1556,1],"minecraft:twisting_vines3_e":[1557,1557,1557,1],"minecraft:twisting_vines3_e_s":[1558,1558,1558,1],"minecraft:twisting_vines3_s":[1559,1559,1559,1],"minecraft:vault_deco_off":[1560,1560,1560,1],"minecraft:vault_deco_on":[1561,1561,1561,1],"minecraft:vault_deco_on_e":[1562,1562,1562,1],"minecraft:vault_deco_on_s":[1563,1563,1563,1],"minecraft:vault_deco_unlock":[1564,1564,1564,1],"minecraft:vault_deco_unlock_e":[1565,1565,1565,1],"minecraft:vault_deco_unlock_s":[1566,1566,1566,1],"minecraft:vault_front_ejecting":[1567,1567,1567,1],"minecraft:vault_front_of":[1568,1568,1568,1],"minecraft:vault_front_off":[1569,1569,1569,1],"minecraft:vault_front_on":[1570,1570,1570,1],"minecraft:vault_ominous_deco_on":[1571,1571,1571,1],"minecraft:vault_ominous_deco_on_e":[1572,1572,1572,1],"minecraft:vault_ominous_deco_on_s":[1573,1573,1573,1],"minecraft:vault_ominous_deco_unlock":[1574,1574,1574,1],"minecraft:vault_ominous_deco_unlock_e":[1575,1575,1575,1],"minecraft:vault_ominous_deco_unlock_s":[1576,1576,1576,1],"minecraft:vault_side_ejecting":[1577,1577,1577,1],"minecraft:vault_side_off":[1578,1578,1578,1],"minecraft:vault_side_on":[1579,1579,1579,1],"minecraft:vault_top_ejecting":[1580,1580,1580,1],"minecraft:vault_top_off":[1581,1581,1581,1],"minecraft:vault_top_on":[1582,1582,1582,1],"minecraft:vault_top_unlock":[1583,1583,1583,1],"minecraft:vault_unlock_glow":[1584,1584,1584,1],"minecraft:verdant_froglight":[1585,1585,1586,0],"minecraft:verdant_froglight_side_s":[1587,1587,1587,2],"minecraft:verdant_froglight_top_s":[1588,1588,1588,2],"minecraft:vine":[1589,1589,1589,1],"minecraft:warped_door":[1590,1590,1590,0],"minecraft:warped_door[half=upper]":[1735,1735,1735,0],"minecraft:warped_fungus":[1591,1591,1591,1],"minecraft:warped_fungus_block":[1592,1592,1592,1],"minecraft:warped_fungus_block_e":[1593,1593,1593,1],"minecraft:warped_fungus_block_e_s":[1594,1594,1594,1],"minecraft:warped_fungus_block_s":[1595,1595,1595,1],"minecraft:warped_fungus_e":[1596,1596,1596,1],"minecraft:warped_fungus_e_s":[1597,1597,1597,1],"minecraft:warped_fungus_s":[1598,1598,1598,1],"minecraft:warped_hanging_sign":[1789,1789,1789,0],"minecraft:warped_hyphae":[1620,1620,1620,0],"minecraft:warped_nylium":[1599,1599,1600,0],"minecraft:warped_planks":[1601,1601,1601,0],"minecraft:warped_roots":[1602,1602,1602,1],"minecraft:warped_roots_glow":[1603,1603,1603,1],"minecraft:warped_roots_pot":[1604,1604,1604,1],"minecraft:warped_roots_pot_e":[1605,1605,1605,1],"minecraft:warped_roots_pot1_e":[1606,1606,1606,1],"minecraft:warped_roots_pot2_e":[1607,1607,1607,1],"minecraft:warped_roots_pot3_e":[1608,1608,1608,1],"minecraft:warped_roots1_e":[1609,1609,1609,1],"minecraft:warped_roots1_e_s":[1610,1610,1610,1],"minecraft:warped_roots1_s":[1611,1611,1611,1],"minecraft:warped_roots2_e":[1612,1612,1612,1],"minecraft:warped_roots2_e_s":[1613,1613,1613,1],"minecraft:warped_roots2_s":[1614,1614,1614,1],"minecraft:warped_roots3_e":[1615,1615,1615,1],"minecraft:warped_roots3_e_s":[1616,1616,1616,1],"minecraft:warped_roots3_s":[1617,1617,1617,1],"minecraft:warped_shelf":[1618,1618,1618,0],"minecraft:warped_sign":[1789,1789,1789,0],"minecraft:warped_stem":[1619,1619,1620,0],"minecraft:warped_stem1":[1621,1621,1621,0],"minecraft:warped_stem2":[1622,1622,1622,0],"minecraft:warped_trapdoor":[1623,1623,1623,0],"minecraft:warped_wall_sign":[1789,1789,1789,0],"minecraft:warped_wart_block":[1624,1624,1624,0],"minecraft:warped_wart_block1_e":[1625,1625,1625,1],"minecraft:warped_wart_block1_e_s":[1626,1626,1626,1],"minecraft:warped_wart_block1_s":[1627,1627,1627,1],"minecraft:warped_wart_block2_e":[1628,1628,1628,1],"minecraft:warped_wart_block2_e_s":[1629,1629,1629,1],"minecraft:warped_wart_block2_s":[1630,1630,1630,1],"minecraft:warped_wart_block3_e":[1631,1631,1631,1],"minecraft:warped_wart_block3_e_s":[1632,1632,1632,1],"minecraft:warped_wart_block3_s":[1633,1633,1633,1],"minecraft:warped_wart_block4_e":[1634,1634,1634,1],"minecraft:warped_wart_block4_e_s":[1635,1635,1635,1],"minecraft:warped_wart_block4_s":[1636,1636,1636,1],"minecraft:water":[1737,1737,1737,2],"minecraft:water_cauldron":[187,188,189,0],"minecraft:water_flow":[1637,1637,1637,2],"minecraft:water_overlay":[1638,1638,1638,2],"minecraft:water_still":[1639,1639,1639,2],"minecraft:waterlily_flowers":[1640,1640,1640,1],"minecraft:weathered_chiseled_copper":[1641,1641,1641,0],"minecraft:weathered_copper":[1642,1642,1642,0],"minecraft:weathered_copper_bars":[1643,1643,1643,1],"minecraft:weathered_copper_bars_post":[1644,1644,1644,1],"minecraft:weathered_copper_bulb":[1645,1645,1645,0],"minecraft:weathered_copper_bulb_lit":[1646,1646,1646,0],"minecraft:weathered_copper_bulb_lit_powered":[1647,1647,1647,0],"minecraft:weathered_copper_bulb_lit_powered_s":[1648,1648,1648,2],"minecraft:weathered_copper_bulb_lit_s":[1649,1649,1649,2],"minecraft:weathered_copper_bulb_powered":[1650,1650,1650,0],"minecraft:weathered_copper_bulb_powered_s":[1651,1651,1651,1],"minecraft:weathered_copper_chain":[1652,1652,1652,1],"minecraft:weathered_copper_door":[1653,1653,1653,0],"minecraft:weathered_copper_door[half=upper]":[1736,1736,1736,1],"minecraft:weathered_copper_grate":[1654,1654,1654,1],"minecraft:weathered_copper_lantern":[1655,1655,1655,1],"minecraft:weathered_copper_trapdoor":[1656,1656,1656,1],"minecraft:weathered_cut_copper":[1657,1657,1657,0],"minecraft:weathered_lightning_rod":[1658,1658,1658,1],"minecraft:weeping_vines":[1659,1659,1659,1],"minecraft:weeping_vines_plant":[1660,1660,1660,1],"minecraft:weeping_vines_plant1":[1661,1661,1661,1],"minecraft:weeping_vines_plant1_e":[1662,1662,1662,1],"minecraft:weeping_vines_plant1_e_s":[1663,1663,1663,1],"minecraft:weeping_vines_plant1_s":[1664,1664,1664,1],"minecraft:weeping_vines_plant2":[1665,1665,1665,1],"minecraft:weeping_vines_plant2_e":[1666,1666,1666,1],"minecraft:weeping_vines_plant2_e_s":[1667,1667,1667,1],"minecraft:weeping_vines_plant2_s":[1668,1668,1668,1],"minecraft:weeping_vines_plant3":[1669,1669,1669,1],"minecraft:weeping_vines_plant3_e":[1670,1670,1670,1],"minecraft:weeping_vines_plant3_e_s":[1671,1671,1671,1],"minecraft:weeping_vines_plant3_s":[1672,1672,1672,1],"minecraft:weeping_vines1":[1673,1673,1673,1],"minecraft:weeping_vines1_e":[1674,1674,1674,1],"minecraft:weeping_vines1_e_s":[1675,1675,1675,1],"minecraft:weeping_vines1_s":[1676,1676,1676,1],"minecraft:weeping_vines2":[1677,1677,1677,1],"minecraft:weeping_vines2_e":[1678,1678,1678,1],"minecraft:weeping_vines2_e_s":[1679,1679,1679,1],"minecraft:weeping_vines2_s":[1680,1680,1680,1],"minecraft:weeping_vines3":[1681,1681,1681,1],"minecraft:weeping_vines3_e":[1682,1682,1682,1],"minecraft:weeping_vines3_e_s":[1683,1683,1683,1],"minecraft:weeping_vines3_s":[1684,1684,1684,1],"minecraft:wet_sponge":[1685,1685,1685,0],"minecraft:wheat":[1686,1686,1686,1],"minecraft:wheat_stage_full_5":[1686,1686,1686,1],"minecraft:wheat_stage_full_6":[1687,1687,1687,1],"minecraft:wheat_stage_full_7":[1688,1688,1688,1],"minecraft:wheat_stage_full_7a":[1689,1689,1689,1],"minecraft:wheat_stage0":[1690,1690,1690,1],"minecraft:wheat_stage1":[1691,1691,1691,1],"minecraft:wheat_stage2":[1692,1692,1692,1],"minecraft:wheat_stage3":[1693,1693,1693,1],"minecraft:wheat_stage4":[1694,1694,1694,1],"minecraft:wheat_stage5":[1695,1695,1695,1],"minecraft:wheat_stage6":[1696,1696,1696,1],"minecraft:white_banner":[1705,1705,1705,0],"minecraft:white_bed":[1697,1697,1697,0],"minecraft:white_candle":[95,95,95,1],"minecraft:white_candle_lit":[1698,1698,1698,1],"minecraft:white_carpet":[1705,1705,1705,0],"minecraft:white_concrete":[1699,1699,1699,0],"minecraft:white_concrete_powder":[1700,1700,1700,0],"minecraft:white_glazed_terracotta":[1701,1701,1701,0],"minecraft:white_stained_glass":[1702,1702,1702,2],"minecraft:white_terracotta":[1703,1703,1703,0],"minecraft:white_tulip":[1704,1704,1704,1],"minecraft:white_wall_banner":[1705,1705,1705,0],"minecraft:white_wool":[1705,1705,1705,0],"minecraft:wildflower_stem":[1706,1706,1706,1],"minecraft:wildflowers":[1707,1707,1707,1],"minecraft:wither_rose":[1708,1708,1708,1],"minecraft:wither_skeleton_skull":[1770,1771,1772,0],"minecraft:wither_skeleton_wall_skull":[1770,1771,1772,0],"minecraft:yellow_banner":[1718,1718,1718,0],"minecraft:yellow_bed":[1709,1709,1709,0],"minecraft:yellow_candle":[95,95,95,1],"minecraft:yellow_candle_lit":[1710,1710,1710,1],"minecraft:yellow_carpet":[1718,1718,1718,0],"minecraft:yellow_concrete":[1711,1711,1711,0],"minecraft:yellow_concrete_powder":[1712,1712,1712,0],"minecraft:yellow_glazed_terracotta":[1713,1713,1713,0],"minecraft:yellow_poplar_leaves":[1714,1714,1714,1],"minecraft:yellow_poplar_leaves1":[1715,1715,1715,1],"minecraft:yellow_stained_glass":[1716,1716,1716,2],"minecraft:yellow_terracotta":[1717,1717,1717,0],"minecraft:yellow_wall_banner":[1718,1718,1718,0],"minecraft:yellow_wool":[1718,1718,1718,0],"minecraft:zombie_head":[1764,1765,1766,0],"minecraft:zombie_wall_head":[1764,1765,1766,0]},Z0=["_slab","_stairs","_wall","_fence_gate","_fence","_pressure_plate","_button","_trapdoor","_door","_hanging_sign","_wall_sign","_sign","_carpet","_pane","_bars"];function J0(i){for(const e of Z0)if(i.endsWith(e))return i.slice(0,-e.length);return null}function Q0(i,e){if(e(i))return i;const t=J0(i);if(t===null)return null;if(e(t))return t;const n=`${t}_planks`;if(e(n))return n;const r=`${t}_block`;if(e(r))return r;const a=`${t}s`;return e(a)?a:null}function Qa(i,e){const t=i.indexOf("[");if(t===-1)return null;const n=i.slice(t+1,i.lastIndexOf("]"));for(const r of n.split(",")){const a=r.indexOf("=");if(a!==-1&&r.slice(0,a).trim()===e)return r.slice(a+1).trim()}return null}const j0={tiles:new Uint16Array(6).fill($0),render:K0.Opaque,textured:!1},eg=i=>Kr[i]!==void 0,Jl=new Map;function tg(i){const e=Jl.get(i);if(e)return e;const t=ng(i);return Jl.set(i,t),t}function ng(i){const e=i.indexOf("["),t=e===-1?i:i.slice(0,e),n=(Qa(i,"snowy")==="true"?Kr[`${t}[snowy=true]`]??null:null)??(Qa(i,"half")==="upper"?Kr[`${t}[half=upper]`]??null:null),r=n===null?Q0(t,eg):null,a=n??(r===null?null:Kr[r]);if(a===null)return j0;const[s,o,l,c]=a,d=new Uint16Array(6);switch(d.fill(l),Qa(i,"axis")){case"x":d[2]=s,d[3]=o;break;case"z":d[4]=s,d[5]=o;break;default:d[0]=s,d[1]=o}return{tiles:d,render:c,textured:!0}}function ig(i){const e=i%Zl,t=Math.floor(i/Zl);return{x:e*Kl+$l,y:t*Kl+$l,size:q0}}const rg=2,aa=32;function ag(i){let e=0;for(const t of i)e=Math.max(e,t.sizeX,t.sizeZ);return e>0?e:aa}function Ks(i){return i+rg}function Ql(i,e,t){return e<=0||t<=0?i:i/e*t}const jl={x:1,z:0},Zr=27.5*Math.PI/180,Ro=1/Math.sin(Zr);function sg(i,e,t){const n=i*t/Math.SQRT2,r=e*t*Ro/Math.SQRT2;return{x:n+r,z:r-n}}function og(i,e){let t=Math.abs(i),n=Math.abs(e);for(;n!==0;){const r=n;n=t%n,t=r}return t}function Jc(i){if(i<=2)return 1;for(let e=2;e<i;e++)if(og(e,i)===1)return e;return 1}function lg(i,e){let t=Math.imul(i,668265261)^Math.imul(e,374761393);return t=Math.imul(t^t>>>15,739982445),t^=t>>>13,t=Math.imul(t,2246822507),t>>>16&3}function cg(i,e,t,n){return t<=0?0:((i+e*n)%t+t)%t}function ec(i,e){return e<=0?0:(i%e+e)%e}function fg(i,e,t,n,r){if(i<=0||e<=0||r.across<=0)return[];if(r.near<=0||r.far<=0)return[];const a=Jc(i),s=[],o=(r.across+Math.max(r.near,r.far))/2,l=Math.floor((t-o)/e),c=Math.ceil((t+o)/e),d=Math.floor((n-o)/e),u=Math.ceil((n+o)/e);for(let f=l;f<=c;f++)for(let h=d;h<=u;h++){const g=f*e-t,S=h*e-n;if(Math.abs(g-S)>r.across)continue;const m=g+S;m>r.near||-m>r.far||s.push({playerIndex:cg(f,h,i,a),gx:f,gz:h,x:g,z:S,turn:lg(f,h)})}return s}const tc=new Un(new F(0,1,0)),ug=new F,Br=new So,zr=new F,ja=new F;function dg(i,e,t){tc.constant=-t;const n=i.intersectPlane(tc,ug);let r=null,a=1/0;for(let s=0;s<e.length;s++){const o=e[s];if(!o)continue;Br.copy(i).applyMatrix4(o.toLocal);const l=pg(Br,o);if(l===null||(zr.copy(Br.origin).addScaledVector(Br.direction,l),zr.applyMatrix4(o.toWorld),zr.y<t&&(!n||(ja.copy(n).applyMatrix4(o.toLocal),!(Math.abs(ja.x)<=o.sizeX/2&&Math.abs(ja.z)<=o.sizeZ/2)))))continue;const c=zr.distanceToSquared(i.origin);c<a&&(a=c,r=s)}return r}function hg(i,e,t){if(e===0)return i>=0&&i<=t?[-1/0,1/0]:null;const n=-i/e,r=(t-i)/e;return[Math.min(n,r),Math.max(n,r)]}function pg(i,{sizeX:e,sizeY:t,sizeZ:n,solid:r}){const a=[e,t,n],s=[i.origin.x+e/2,i.origin.y,i.origin.z+n/2],o=[i.direction.x,i.direction.y,i.direction.z];let l=0,c=1/0;for(let h=0;h<3;h++){const g=hg(s[h],o[h],a[h]);if(!g)return null;l=Math.max(l,g[0]),c=Math.min(c,g[1])}if(l>=c)return null;const d=[0,0,0],u=[0,0,0],f=[0,0,0];for(let h=0;h<3;h++){const g=s[h]+o[h]*l;d[h]=Math.max(0,Math.min(a[h]-1,Math.floor(g))),u[h]=o[h]>0?1:-1,f[h]=o[h]===0?1/0:(d[h]+(o[h]>0?1:0)-s[h])/o[h]}for(;l<c;){if(r[(d[1]*n+d[2])*e+d[0]]===1)return l;const h=f[0]<f[1]?f[0]<f[2]?0:2:f[1]<f[2]?1:2;if(d[h]+=u[h],d[h]<0||d[h]>=a[h])return null;l=f[h],f[h]+=1/Math.abs(o[h])}return null}function mg(i,e,t){return Math.min(i,e)*(1-1/t)/2}function _g(i,e,t,n,r,a){const s=Math.max(t-2*(r.x+a),1),o=Math.max(n-2*(r.y+a),1);return Math.max(i/s,e/o)}const Qc=.18;Je.enabled=!0;const cn=.28,nc=new Nt,gg="minecraft:white_concrete",jc=.5,vg=1.24,xg=new F(0,1,0),Sg=new F(Math.cos(Zr)/Math.SQRT2,Math.sin(Zr),Math.cos(Zr)/Math.SQRT2),Zs=1/Ro,Mg=Math.sqrt(1-Zs*Zs),bg=7,ic=.13,rc=.08,yg=.08,Eg=.05,ef=39/18,tf=5.5,wg=12,Tg=.5,Ag=.8,Rg=.8,Cg=.7,Pg=1.1,Lg="#9fc4f0",Dg="#dcebff",Ig=new Ve("#4e8fdc"),Ug=new Ve("#76b5ff"),Ng=.2,Js=24,Fg=13,Og=.3,kg=.92,Bg=1,zg=2,Gg=new Ve(7158486),Hg=new Ve(13215479);function nf(i,e){i.uniforms.uNow=e,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
        attribute float change;
        attribute float stamp;
        uniform float uNow;
        varying float vChange;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vChange = 1.0;
        if (change != 0.0) {
          float t = clamp((uNow - stamp) / ${Qc.toFixed(2)}, 0.0, 1.0);
          float amount = change > 0.0 ? t : 1.0 - t;
          // Eased, so it settles rather than arriving at speed.
          amount = amount * amount * (3.0 - 2.0 * amount);

          if (abs(change) < 1.5) {
            // A whole layer coming or going: it fades, all of it together.
            vChange = amount;
          } else {
            // One block: it grows out of its own middle, which the tag packs.
            float packed = abs(change) - 2.0;
            float by = floor(packed / 4096.0);
            float rest = packed - by * 4096.0;
            float bz = floor(rest / 64.0);
            float bx = rest - bz * 64.0;
            vec3 middle = vec3(bx - 32.0, by, bz - 32.0) + 0.5;
            transformed = middle + (transformed - middle) * amount;
          }
        }`)}function Gr(i,e){i.onBeforeCompile=t=>{nf(t,e),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
        varying float vChange;`).replace("#include <alphatest_fragment>",`diffuseColor.a *= vChange;
        #include <alphatest_fragment>`)},i.customProgramCacheKey=()=>"plot-changes"}function Vg(i){const e=new Fc;return e.onBeforeCompile=t=>{nf(t,i),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
        varying vec3 vObject;`).replace("#include <project_vertex>",`vObject = transformed;
        #include <project_vertex>`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
        varying float vChange;
        varying vec3 vObject;`).replace("#include <alphatest_fragment>",`#include <alphatest_fragment>
        if (vChange < 0.5) discard;
        vec3 face = normalize(cross(dFdx(vObject), dFdy(vObject)));
        if (abs(face.x * face.z) > 0.25) discard;`)},e.customProgramCacheKey=()=>"plot-changes-depth",e}class Wg{constructor(e){ce(this,"renderer");ce(this,"scene",new qr);ce(this,"camera");ce(this,"material");ce(this,"blendedMaterial");ce(this,"fadeMaterial");ce(this,"changeClock",{value:0});ce(this,"changeDepth",Vg(this.changeClock));ce(this,"changesUntil",0);ce(this,"atlas",null);ce(this,"groundTexture",null);ce(this,"floorMaterial");ce(this,"shaftMaterial");ce(this,"sun");ce(this,"environment",null);ce(this,"veilScene",new qr);ce(this,"veilCamera",new Gi(-1,1,1,-1,0,1));ce(this,"veilMaterial");ce(this,"veilPane");ce(this,"veilFocus",new F);ce(this,"veil",0);ce(this,"sceneTarget");ce(this,"dofScene",new qr);ce(this,"dofMaterial");ce(this,"dofQuad");ce(this,"bufferSize",new ke);ce(this,"lensTarget");ce(this,"outputTarget");ce(this,"bloom");ce(this,"output",new W0);ce(this,"fxaa",new V0);ce(this,"focusedMesh",null);ce(this,"focusGeometry",null);ce(this,"focusSpin",0);ce(this,"focusEase",0);ce(this,"focusCentre",new F);ce(this,"focusHeight",0);ce(this,"focusRadius",0);ce(this,"focusReserve",{x:0,y:0});ce(this,"focusRest",null);ce(this,"revealAmount",{value:0});ce(this,"revealTop",{value:0});ce(this,"revealFoot",{value:0});ce(this,"revealing",!1);ce(this,"revealMaterials",[]);ce(this,"glintMesh");ce(this,"glintMaterial");ce(this,"glintTexture");ce(this,"glintPlaceholder",new Nt);ce(this,"columns",new Map);ce(this,"instances",[]);ce(this,"floorPatch");ce(this,"shaftPatch");ce(this,"patchCells",0);ce(this,"collarGeometries",new Map);ce(this,"hasColumns",!1);ce(this,"frameRequested",!1);ce(this,"disposed",!1);ce(this,"raycaster",new Nd);ce(this,"pointer",new ke);ce(this,"viewHeight",100);ce(this,"baseHeight",100);ce(this,"zoom",1);ce(this,"target",new F(0,0,0));ce(this,"boardTarget",new F(0,0,0));ce(this,"columnWidth",aa);ce(this,"spacing",Ks(aa));ce(this,"tallest",0);ce(this,"floorY",0);ce(this,"baseMinY",null);ce(this,"scrollX",0);ce(this,"scrollZ",0);this.canvas=e,this.renderer=new qc({canvas:e,antialias:!1,alpha:!0}),this.renderer.outputColorSpace=kt,this.renderer.toneMapping=ca,this.renderer.toneMappingExposure=1.15,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ir,this.camera=new Gi(-1,1,1,-1,.1,1e4),this.camera.position.set(1,1,1),this.material=new Ir({vertexColors:!0,roughness:.94,metalness:0,envMapIntensity:1.35,alphaTest:jc}),this.blendedMaterial=new Ir({vertexColors:!0,roughness:.62,metalness:0,envMapIntensity:1.6,transparent:!0,depthWrite:!0}),this.fadeMaterial=this.material.clone(),this.fadeMaterial.transparent=!0,this.fadeMaterial.alphaTest=0,this.fadeMaterial.depthWrite=!1,Gr(this.material,this.changeClock),Gr(this.blendedMaterial,this.changeClock),Gr(this.fadeMaterial,this.changeClock),this.revealMaterials=[this.material,this.blendedMaterial,this.fadeMaterial].map(n=>this.buildRevealMaterial(n)),this.veilMaterial=qg(),this.veilPane=new Pt(new Bi(2,2),this.veilMaterial),this.veilPane.frustumCulled=!1,this.veilScene.add(this.veilPane);const t=this.renderer.getDrawingBufferSize(this.bufferSize);this.sceneTarget=new zt(t.x,t.y,{type:Zt,samples:4,depthTexture:new ki(t.x,t.y)}),this.dofMaterial=Yg(),this.dofMaterial.uniforms.tColour.value=this.sceneTarget.texture,this.dofMaterial.uniforms.tDepth.value=this.sceneTarget.depthTexture,this.dofQuad=new Pt(new Bi(2,2),this.dofMaterial),this.dofQuad.frustumCulled=!1,this.dofScene.add(this.dofQuad),this.lensTarget=new zt(t.x,t.y,{type:Zt}),this.outputTarget=new zt(t.x,t.y),this.bloom=new Hi(new ke(t.x,t.y),Ag,Rg,Tg),this.fxaa.renderToScreen=!0,this.renderer.autoClear=!1,this.glintMaterial=Kg(),this.glintTexture=this.glintMaterial.uniforms.uGlint.value,this.glintMesh=new Pt(this.glintPlaceholder,this.glintMaterial),this.glintMesh.visible=!1,this.glintMesh.renderOrder=1,this.scene.add(this.glintMesh),this.loadAtlas(),this.floorMaterial=new Ir({roughness:.96,metalness:0,envMapIntensity:1.2}),this.shaftMaterial=new Ir({roughness:1,metalness:0,envMapIntensity:1.5,vertexColors:!0,side:pn}),this.floorPatch=new Pt(new Nt,this.floorMaterial),this.floorPatch.receiveShadow=!0,this.floorPatch.visible=!1,this.scene.add(this.floorPatch),this.shaftPatch=new Pt(new Nt,this.shaftMaterial),this.shaftPatch.receiveShadow=!0,this.shaftPatch.visible=!1,this.scene.add(this.shaftPatch),this.setUpLighting(),this.resize()}loadAtlas(){new Rd().load(Y0,e=>{if(this.disposed){e.dispose();return}e.colorSpace=kt,e.magFilter=wt,e.minFilter=Di,e.generateMipmaps=!0,e.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy()),this.atlas=e;for(const t of[this.material,this.blendedMaterial,this.fadeMaterial,...this.revealMaterials])t.map=e,t.needsUpdate=!0;if(this.glintMaterial.uniforms.uAtlas.value=e,this.groundTexture=$g(e.image),this.groundTexture){this.groundTexture.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy());for(const t of[this.floorMaterial,this.shaftMaterial])t.map=this.groundTexture,t.needsUpdate=!0}this.invalidate()},void 0,()=>console.warn("block atlas failed to load; plots will draw untextured"))}setUpLighting(){this.sun=new kc(16774888,2.25),this.sun.position.set(60,110,90),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=0,this.sun.shadow.intensity=Cg,this.scene.add(this.sun),this.scene.add(this.sun.target),this.scene.add(new Dd(14280439,.62)),this.environment=this.buildEnvironment(),this.scene.environment=this.environment}buildEnvironment(){const e=document.createElement("canvas");e.width=8,e.height=128;const t=e.getContext("2d");if(!t)return null;const n=t.createLinearGradient(0,0,0,128);n.addColorStop(0,Lg),n.addColorStop(.46,Dg),n.addColorStop(.54,"#f2f6fa"),n.addColorStop(1,"#c9d6e4"),t.fillStyle=n,t.fillRect(0,0,8,128);const r=new ua(e);r.mapping=Hr,r.colorSpace=kt;const a=new Ws(this.renderer),s=a.fromEquirectangular(r).texture;return a.dispose(),r.dispose(),s}setGrid(e,t){Math.abs(e-this.spacing)<.001&&t===this.columnWidth||(this.spacing=e,this.columnWidth=t,this.patchCells=0,this.dropCollars(),this.rebuildGround())}rebuildGround(){const e=Qg(this.visibleReach,this.spacing);if(e===this.patchCells)return;this.patchCells=e;const t=jg(e,this.spacing,this.columnWidth);this.floorPatch.geometry.dispose(),this.floorPatch.geometry=t;const n=sc(e,this.spacing,this.columnWidth,Math.max(this.floorY+4,8));this.shaftPatch.geometry.dispose(),this.shaftPatch.geometry=n,this.positionGround()}positionGround(){this.floorPatch.position.set(-ec(this.scrollX,this.spacing),this.floorY,-ec(this.scrollZ,this.spacing)),this.shaftPatch.position.copy(this.floorPatch.position)}setScroll(e,t){this.scrollX=e,this.scrollZ=t,this.positionGround()}setColumn(e,t){if(this.disposed)return;const n=ac(t,this.seconds());this.noteChanges(t),this.baseMinY===null&&(this.baseMinY=t.minY),this.hasColumns||(this.hasColumns=!0,this.floorPatch.visible=!0,this.shaftPatch.visible=!0);const r=this.columns.get(e);if(r){for(const a of this.instances)a.uuid===e&&(a.mesh.geometry=n);r.geometry.dispose(),r.geometry=n,r.occupiedHeight=t.occupiedHeight,r.surfaceLevel=t.surfaceLevel,r.minY=t.minY,r.sizeX=t.sizeX,r.sizeY=t.sizeY,r.sizeZ=t.sizeZ,r.solid=t.solid}else this.columns.set(e,{geometry:n,occupiedHeight:t.occupiedHeight,surfaceLevel:t.surfaceLevel,minY:t.minY,sizeX:t.sizeX,sizeY:t.sizeY,sizeZ:t.sizeZ,solid:t.solid});this.invalidate()}seconds(){return performance.now()/1e3}noteChanges(e){for(const t of e.changes)if(t!==0){this.changesUntil=this.seconds()+Qc;return}}get settling(){return this.seconds()<this.changesUntil}removeColumn(e){const t=this.columns.get(e);if(t){for(const n of this.instances)n.uuid===e&&(n.uuid=null,n.mesh.visible=!1);t.geometry.dispose(),this.columns.delete(e),this.invalidate()}}hasColumn(e){return this.columns.has(e)}get columnCount(){return this.columns.size}get instanceCount(){return this.instances.filter(e=>e.mesh.visible).length}get gpuGeometryCount(){return this.renderer.info.memory.geometries}shaftDepth(){return Math.max(this.floorY+4,8)}dropCollars(){for(const e of this.collarGeometries.values())e.dispose();this.collarGeometries.clear();for(const e of this.instances)e.collar.geometry=nc,e.collar.visible=!1}collarFor(e,t){if(e>=this.columnWidth&&t>=this.columnWidth)return null;const n=`${e}x${t}`,r=this.collarGeometries.get(n);if(r)return r;const a=ev(e,t,this.columnWidth,this.shaftDepth());return a?(this.collarGeometries.set(n,a),a):null}syncPlots(e){if(!this.disposed){for(;this.instances.length<e.length;){const t=new Pt(void 0,[this.material,this.blendedMaterial,this.fadeMaterial]);t.castShadow=!0,t.receiveShadow=!0,t.customDepthMaterial=this.changeDepth,t.visible=!1,this.scene.add(t);const n=new Pt(nc,[this.floorMaterial,this.shaftMaterial]);n.receiveShadow=!0,n.visible=!1,this.scene.add(n),this.instances.push({mesh:t,uuid:null,restY:0,collar:n})}for(let t=0;t<this.instances.length;t++){const n=this.instances[t],r=e[t],a=r?this.columns.get(r.uuid):void 0;if(!r||!a){n.uuid=null,n.mesh.visible=!1,n.collar.visible=!1;continue}n.mesh.geometry!==a.geometry&&(n.mesh.geometry=a.geometry),n.uuid=r.uuid,n.mesh.visible=!0,n.restY=a.minY-(this.baseMinY??a.minY),n.mesh.position.set(r.x,n.restY,r.z),n.mesh.rotation.y=(r.turn??0)*(Math.PI/2);const s=this.collarFor(a.sizeX,a.sizeZ);n.collar.visible=s!==null&&this.hasColumns,s&&(n.collar.geometry!==s&&(n.collar.geometry=s),n.collar.position.set(r.x,this.floorY,r.z),n.collar.rotation.y=n.mesh.rotation.y)}}}setLift(e,t){const n=this.instances[e];!n||!n.mesh.visible||(n.mesh.position.y=n.restY+t)}setFocus(e,t,n){var p;if(this.disposed)return;const r=e===null?void 0:this.instances[e],a=r&&r.uuid&&r.mesh.visible&&t>0?r:null;if(this.focusedMesh!==((a==null?void 0:a.mesh)??null)&&((p=this.focusGeometry)==null||p.dispose(),this.focusGeometry=null,this.focusedMesh=(a==null?void 0:a.mesh)??null),this.veil=a?Math.min(Math.max(n,0),1):0,!a){this.revealing=!1,this.focusEase!==0&&(this.focusEase=0,this.updateCamera());return}const s=this.columns.get(a.uuid),o=a.restY+Math.max((s==null?void 0:s.occupiedHeight)??this.spacing,1),l=a.restY,c=this.canvas.clientWidth||1,d=this.canvas.clientHeight||1,u=this.columnWidth*Math.SQRT2,f=(o-l)*Mg+u*Zs,h=mg(c,d,vg),g=_g(u,f,c,d,this.focusReserve,h)*d/2;this.focusHeight=Math.min(g/this.zoom,this.boardHeight);const S=Math.min(g,this.baseHeight)*2/d;this.focusRest={width:u/S,height:f/S,gutter:h},this.focusCentre.set(a.mesh.position.x,(l+o)/2,a.mesh.position.z),this.focusRadius=Math.hypot(this.columnWidth/Math.SQRT2,(o-l)/2);const m=Math.min(this.veil/kg,1);this.revealAmount.value=m,this.revealTop.value=this.floorY-Bg,this.revealFoot.value=Math.min(l,this.floorY)-.5,this.revealing=m<1,this.focusEase=t,this.updateCamera(),this.focusGeometry&&(a.mesh.geometry=this.focusGeometry)}buildRevealMaterial(e){const t=e.clone();t.transparent=!0,Gr(t,this.changeClock);const n=t.onBeforeCompile;return t.onBeforeCompile=(r,a)=>{n(r,a),r.uniforms.uReveal=this.revealAmount,r.uniforms.uRevealTop=this.revealTop,r.uniforms.uRevealFoot=this.revealFoot,r.vertexShader=r.vertexShader.replace("#include <common>",`#include <common>
        varying float vRevealY;`).replace("#include <project_vertex>",`vRevealY = (modelMatrix * vec4(transformed, 1.0)).y;
          #include <project_vertex>`),r.fragmentShader=r.fragmentShader.replace("#include <common>",`#include <common>
          varying float vRevealY;
          uniform float uReveal;
          uniform float uRevealTop;
          uniform float uRevealFoot;`).replace("#include <alphatest_fragment>",`#include <alphatest_fragment>
          // Nothing above the plaza is arriving: it was on screen already.
          float revealSpan = max(uRevealTop - uRevealFoot, 0.001);
          float revealDepth = clamp((uRevealTop - vRevealY) / revealSpan, 0.0, 1.0);
          diffuseColor.a *= vRevealY >= uRevealTop
            ? 1.0
            : clamp(uReveal * ${zg.toFixed(1)} - revealDepth, 0.0, 1.0);`)},t.customProgramCacheKey=()=>"plot-reveal",t}get focusExtent(){return this.focusRest}setFocusReserve(e){this.disposed||(this.focusReserve={...e},this.invalidate())}setFocusSpin(e){this.disposed||this.focusSpin===e||(this.focusSpin=e,this.updateCamera(),this.invalidate())}setFocusColumn(e){var n;if(this.disposed)return;const t=e?ac(e,this.seconds()):null;e&&this.noteChanges(e),this.focusedMesh&&(this.focusedMesh.geometry=t??this.columnGeometryFor(this.focusedMesh)??this.focusedMesh.geometry),(n=this.focusGeometry)==null||n.dispose(),this.focusGeometry=t,this.invalidate()}columnGeometryFor(e){var t;for(const n of this.instances)if(n.mesh===e&&n.uuid)return((t=this.columns.get(n.uuid))==null?void 0:t.geometry)??null;return null}setGlint(e,t){if(this.disposed)return;const n=e===null?void 0:this.instances[e];if(!n||!n.uuid||!n.mesh.visible||t<=0||!this.atlas){this.glintMesh.visible=!1;return}this.glintMesh.geometry=n.mesh.geometry,this.glintMesh.position.copy(n.mesh.position),this.glintMesh.quaternion.copy(n.mesh.quaternion),this.glintMesh.scale.copy(n.mesh.scale),this.glintMaterial.uniforms.uIntensity.value=Math.min(t,1),this.glintMesh.visible=!0}setFloorLevel(e){const t=e+1;if(Math.abs(t-this.floorY)<.001)return;this.floorY=t;const n=sc(this.patchCells,this.spacing,this.columnWidth,this.floorY+4);this.shaftPatch.geometry.dispose(),this.shaftPatch.geometry=n,this.dropCollars(),this.positionGround(),this.invalidate()}get floorLevel(){return this.floorY}get viewExtent(){const e=(this.canvas.clientWidth||1)/(this.canvas.clientHeight||1),t=this.spacing*.9,n=Math.max(this.tallest-this.floorY,0)*1.25,r=this.boardHeight*Math.SQRT2*Ro;return{across:this.boardHeight*e*Math.SQRT2+t,near:r+t,far:r+t+n}}get visibleReach(){const e=this.viewExtent;return(e.across+Math.max(e.near,e.far))/2}get unitsPerPixel(){return this.viewHeight*2/(this.canvas.clientHeight||1)}pickSlot(e,t){if(this.disposed)return null;const n=this.canvas.clientWidth||1,r=this.canvas.clientHeight||1;this.pointer.set(e/n*2-1,1-t/r*2),this.raycaster.setFromCamera(this.pointer,this.camera),this.scene.updateMatrixWorld();const a=this.instances.map(s=>{const o=s.uuid?this.columns.get(s.uuid):void 0;if(!o||!s.mesh.visible)return null;const l=s.mesh.matrixWorld;return{...o,toWorld:l,toLocal:new vt().copy(l).invert()}});return dg(this.raycaster.ray,a,this.floorY)}projectSlot(e){const t=this.instances[e];if(!t||!t.mesh.visible||!t.uuid)return null;const n=this.columns.get(t.uuid);if(!n)return null;const r=Math.min(Math.max(n.occupiedHeight,this.floorY)+3,this.floorY+11),s=new F(0,r,0).add(t.mesh.position).project(this.camera);return s.x<-1.1||s.x>1.1||s.y<-1.1||s.y>1.1?null:{x:(s.x+1)/2*this.canvas.clientWidth,y:(1-s.y)/2*this.canvas.clientHeight}}frame(e){this.boardTarget.set(0,this.floorY+3,0),this.tallest=e,this.baseHeight=this.spacing*1.35,this.resize()}setZoom(e){this.disposed||Math.abs(e-this.zoom)<1e-4||(this.zoom=e,this.resize())}get zoomLevel(){return this.zoom}get boardHeight(){return this.baseHeight/this.zoom}resize(){if(this.disposed)return;const e=this.canvas.clientWidth||1,t=this.canvas.clientHeight||1;this.renderer.setSize(e,t,!1);const n=this.renderer.getDrawingBufferSize(this.bufferSize);this.sceneTarget.setSize(n.x,n.y),this.lensTarget.setSize(n.x,n.y),this.outputTarget.setSize(n.x,n.y),this.bloom.setSize(n.x,n.y),this.fxaa.setSize(n.x,n.y),this.updateCamera(),this.rebuildGround(),this.invalidate()}updateCamera(){const e=(this.canvas.clientWidth||1)/(this.canvas.clientHeight||1),t=this.boardHeight;this.viewHeight=t+(this.focusHeight-t)*this.focusEase,this.target.lerpVectors(this.boardTarget,this.focusCentre,this.focusEase);const n=this.viewHeight,r=n*e;this.camera.left=-r,this.camera.right=r,this.camera.top=n,this.camera.bottom=-n,this.camera.position.copy(Sg).applyAxisAngle(xg,this.focusSpin*this.focusEase).multiplyScalar(Math.max(t*6,800)).add(this.target),this.camera.lookAt(this.target),this.camera.updateProjectionMatrix(),this.fitShadowCamera(t*e,t)}fitShadowCamera(e,t){const n=Math.hypot(e,t)*1.2,r=this.sun.shadow.camera;r.left=-n,r.right=n,r.top=n,r.bottom=-n,r.near=1,r.far=n*6,r.updateProjectionMatrix(),this.sun.shadow.normalBias=n*2/this.sun.shadow.mapSize.x,this.sun.target.position.copy(this.boardTarget),this.sun.target.updateMatrixWorld(),this.sun.position.set(.55,1.15,.8).normalize().multiplyScalar(n*2.2).add(this.boardTarget)}renderNow(){this.disposed||this.draw()}invalidate(){this.disposed||this.frameRequested||(this.frameRequested=!0,requestAnimationFrame(()=>{this.frameRequested=!1,!this.disposed&&this.draw()}))}draw(){this.changeClock.value=this.seconds(),this.focusGeometry&&!this.settling&&Xg(this.focusGeometry),this.glintMesh.visible&&(this.glintMaterial.uniforms.uTime.value=this.changeClock.value),this.renderer.setRenderTarget(this.sceneTarget),this.renderer.clear();const e=this.veil>0?this.focusedMesh:null;e?(e.visible=!1,this.renderer.render(this.scene,this.camera),e.visible=!0,this.aimVeil(),this.renderer.render(this.veilScene,this.veilCamera),this.veil>=Og&&this.renderer.clearDepth(),this.drawAlone(e)):this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(this.lensTarget),this.focusLens(),this.renderer.render(this.dofScene,this.veilCamera),this.bloom.render(this.renderer,this.lensTarget,this.lensTarget,0,!1),this.output.render(this.renderer,this.outputTarget,this.lensTarget,0,!1),this.fxaa.render(this.renderer,this.outputTarget,this.outputTarget,0,!1)}aimVeil(){const e=this.veilMaterial.uniforms,t=(this.canvas.clientWidth||1)/(this.canvas.clientHeight||1);this.camera.updateMatrixWorld(),this.veilFocus.copy(this.focusCentre).project(this.camera),e.uProgress.value=this.veil,e.uFocus.value.set(this.veilFocus.x,this.veilFocus.y),e.uRadius.value.set(Js/(this.viewHeight*t),Js/this.viewHeight)}focusLens(){const e=this.dofMaterial.uniforms;e.uFocus.value=-this.camera.position.distanceTo(this.target),e.uRange.value=ef*this.spacing,e.uSharp.value=this.focusRadius*this.focusEase,e.uNear.value=this.camera.near,e.uFar.value=this.camera.far,e.uTexel.value.set(1/this.sceneTarget.width,1/this.sceneTarget.height),e.uRadius.value=tf*this.renderer.getPixelRatio()}drawAlone(e){const t=e.material;this.revealing&&(e.material=this.revealMaterials),this.floorPatch.visible=!1,this.shaftPatch.visible=!1;const n=this.glintMesh.visible;this.glintMesh.visible=!1;const r=[];for(const a of this.instances)a.mesh!==e&&(a.mesh.visible=!1),a.collar.visible&&(r.push(a),a.collar.visible=!1);this.renderer.render(this.scene,this.camera),e.material=t,this.floorPatch.visible=this.hasColumns,this.shaftPatch.visible=this.hasColumns,this.glintMesh.visible=n;for(const a of r)a.collar.visible=!0;for(const a of this.instances)a.mesh.visible=a.uuid!==null}dispose(){var e,t,n,r,a,s;if(!this.disposed){this.disposed=!0;for(const o of this.instances)this.scene.remove(o.mesh);this.instances=[],this.focusedMesh=null,this.scene.remove(this.glintMesh),this.glintMesh.geometry=this.glintPlaceholder,this.glintPlaceholder.dispose();for(const o of this.columns.values())o.geometry.dispose();this.columns.clear(),(e=this.focusGeometry)==null||e.dispose(),this.focusGeometry=null,this.scene.remove(this.floorPatch),this.scene.remove(this.shaftPatch),this.floorPatch.geometry.dispose(),this.shaftPatch.geometry.dispose();for(const o of this.instances)this.scene.remove(o.collar);for(const o of this.collarGeometries.values())o.dispose();this.collarGeometries.clear(),this.material.dispose(),this.changeDepth.dispose();for(const o of this.revealMaterials)o.dispose();this.blendedMaterial.dispose(),this.veilPane.geometry.dispose(),this.dofQuad.geometry.dispose(),this.dofMaterial.dispose(),(t=this.sceneTarget.depthTexture)==null||t.dispose(),this.sceneTarget.dispose(),this.lensTarget.dispose(),this.outputTarget.dispose(),this.bloom.dispose(),this.output.dispose(),this.fxaa.dispose(),this.fadeMaterial.dispose(),this.veilMaterial.dispose(),this.glintMaterial.dispose(),(n=this.glintTexture)==null||n.dispose(),(r=this.atlas)==null||r.dispose(),(a=this.groundTexture)==null||a.dispose(),this.floorMaterial.dispose(),this.shaftMaterial.dispose(),(s=this.environment)==null||s.dispose(),this.renderer.dispose()}}}function ac(i,e){const t=new Nt;t.setAttribute("position",new Xt(i.positions,3)),t.setAttribute("normal",new Xt(i.normals,3,!0)),t.setAttribute("color",new Xt(i.colours,3)),t.setAttribute("uv",new Xt(i.uvs,2)),t.setAttribute("change",new Xt(i.changes,1));const n=new Float32Array(i.changes.length);for(let s=0;s<n.length;s++)n[s]=i.changes[s]===0?0:e;t.setAttribute("stamp",new Xt(n,1)),t.setIndex(new Xt(i.indices,1));const r=i.opaqueIndexCount+i.blendedIndexCount,a=i.indices.length-r;return i.opaqueIndexCount>0&&t.addGroup(0,i.opaqueIndexCount,0),i.blendedIndexCount>0&&t.addGroup(i.opaqueIndexCount,i.blendedIndexCount,1),a>0&&t.addGroup(r,a,2),t.computeBoundingSphere(),t}function Xg(i){for(const e of i.groups)e.materialIndex===2&&(e.materialIndex=0)}function Yg(){return new Lt({name:"tilt-shift",defines:{TAPS:wg},uniforms:{tColour:{value:null},tDepth:{value:null},uTexel:{value:new ke},uFocus:{value:0},uNear:{value:0},uFar:{value:0},uRange:{value:ef},uSharp:{value:0},uRadius:{value:tf}},depthTest:!1,depthWrite:!1,blending:Tn,vertexShader:`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,fragmentShader:`
      #include <packing>

      uniform sampler2D tColour;
      uniform sampler2D tDepth;
      uniform vec2 uTexel;
      uniform float uFocus;
      uniform float uNear;
      uniform float uFar;
      uniform float uRange;
      uniform float uSharp;
      uniform float uRadius;

      varying vec2 vUv;

      // How far out of focus one point is, from nothing to fully blurred:
      // nothing within uSharp of the plane of focus, fully uRange past that.
      float confusion(vec2 uv) {
        float depth = texture2D(tDepth, uv).x;
        float viewZ = orthographicDepthToViewZ(depth, uNear, uFar);
        // Eased at both ends, so the blur neither starts nor tops out at a line.
        return smoothstep(0.0, 1.0, (abs(viewZ - uFocus) - uSharp) / uRange);
      }

      void main() {
        float here = confusion(vUv);
        float radius = here * uRadius;

        vec4 sum = texture2D(tColour, vUv);
        float weight = 1.0;

        for (int i = 0; i < TAPS; i++) {
          // A golden-angle spiral: every tap lands somewhere the ones before it
          // did not, at any count, without a table of offsets to carry around.
          float ring = (float(i) + 0.5) / float(TAPS);
          float angle = float(i) * 2.399963;
          vec2 at = vUv + vec2(cos(angle), sin(angle)) * sqrt(ring) * radius * uTexel;

          // A tap that is itself in focus does not get to smear over what is
          // behind it, so a sharp edge keeps its own outline instead of
          // bleeding into whatever the blur reaches for.
          float share = min(confusion(at) / max(here, 0.001), 1.0);
          sum += texture2D(tColour, at) * share;
          weight += share;
        }

        // Still in open-ended light: the bloom comes next, then the tone mapping.
        gl_FragColor = sum / weight;
        gl_FragColor.rgb = pow(max(gl_FragColor.rgb, 0.0) / 0.18, vec3(${Pg.toFixed(2)})) * 0.18;
      }
    `})}function qg(){return new Lt({name:"backdrop",uniforms:{uTop:{value:Ig},uBottom:{value:Ug},uProgress:{value:0},uFocus:{value:new ke},uRadius:{value:new ke(1,1)},uClean:{value:Fg/Js},uRemains:{value:Ng}},transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTop;
      uniform vec3 uBottom;
      uniform float uProgress;
      uniform vec2 uFocus;
      uniform vec2 uRadius;
      uniform float uClean;
      uniform float uRemains;

      varying vec2 vUv;

      void main() {
        // Distance from the plot, in clearings rather than in pixels.
        vec2 fromPlot = (vUv * 2.0 - 1.0 - uFocus) / uRadius;
        float away = length(fromPlot);

        // Swept clean as far as the plot's own edge, then fading back in, until
        // by the edge of the clearing the board is merely dimmed - and it stays
        // that way however much further out you look.
        float cover = mix(1.0, 1.0 - uRemains, smoothstep(uClean, 1.0, away));

        gl_FragColor = vec4(mix(uBottom, uTop, vUv.y), cover * uProgress);
      }
    `})}function $g(i){const e=tg(gg).tiles[0],t=ig(e),n=document.createElement("canvas");n.width=t.size,n.height=t.size;const r=n.getContext("2d");if(!r)return null;r.drawImage(i,t.x,t.y,t.size,t.size,0,0,t.size,t.size);const a=new ua(n);return a.colorSpace=kt,a.wrapS=ci,a.wrapT=ci,a.magFilter=wt,a.minFilter=Di,a.generateMipmaps=!0,a}function Kg(){return new Lt({uniforms:{uAtlas:{value:null},uGlint:{value:Zg()},uTime:{value:0},uIntensity:{value:0},uDark:{value:Gg},uLight:{value:Hg}},vertexShader:`
      // Two rotations about twenty and fifty degrees apart, so the streaks of
      // the two layers cross rather than run together.
      const mat2 TURN_A = mat2(0.94, -0.34, 0.34, 0.94);
      const mat2 TURN_B = mat2(0.63, 0.78, -0.78, 0.63);

      varying vec2 vGlintA;
      varying vec2 vGlintB;
      varying vec2 vAtlas;

      void main() {
        // Laid on the plot's own faces rather than on the screen: the board
        // scrolls and the plot turns, and a sheen fixed to the screen slides
        // off whatever it is meant to be on. Each face takes the two axes it
        // faces across, so the pattern runs over the blocks and stays there.
        vec3 facing = abs(normal);
        vec2 sheenSpace = facing.y > 0.5
          ? position.xz
          : (facing.x > 0.5 ? position.zy : position.xy);
        sheenSpace /= ${bg.toFixed(1)};

        vGlintA = TURN_A * sheenSpace;
        // Not a whole multiple of the other layer, so the two never line up
        // into a pattern the eye can follow.
        vGlintB = TURN_B * sheenSpace * 0.63;

        vAtlas = uv;

        // Worked out in the same two steps the lit material uses, and in the
        // same order: this pass lies exactly on the blocks it is lighting, and
        // multiplying the matrices together first rounds differently enough to
        // set the two fighting over which is in front.
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform sampler2D uAtlas;
      uniform sampler2D uGlint;
      uniform float uTime;
      uniform float uIntensity;
      uniform vec3 uDark;
      uniform vec3 uLight;

      varying vec2 vGlintA;
      varying vec2 vGlintB;
      varying vec2 vAtlas;

      void main() {
        // Cut to the same shape the blocks are: leaves and bars are mostly
        // holes, and a glint over the holes would be a glowing block.
        if (texture2D(uAtlas, vAtlas).a < ${jc}) discard;

        float a = texture2D(uGlint, vGlintA + vec2(uTime * ${ic}, uTime * ${(ic*.4).toFixed(3)})).r;
        float b = texture2D(uGlint, vGlintB + vec2(uTime * -${rc}, uTime * ${(rc*.5).toFixed(3)})).r;

        // Added and eased, rather than multiplied and sharpened: the sheen
        // washes across the plot and falls away at its edges instead of
        // breaking into hot specks wherever two bright patches cross.
        //
        // The two layers average about half each, so the threshold sits well
        // above their sum: only where both happen to run bright does a streak
        // show at all, and most of the plot is left as it was.
        float sheen = smoothstep(1.02, 1.46, a + b);

        // A faint wash of the same purple across the whole plot under the
        // streaks, so a hovered plot reads as enchanted even at the moments
        // when no streak is crossing it.
        vec3 glow = uDark * ${Eg} + mix(uDark, uLight, sheen) * sheen * ${yg};

        gl_FragColor = vec4(glow * uIntensity, 1.0);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,blending:jr,depthWrite:!1})}function Zg(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");if(!t)return null;const n=[{cellsX:2,cellsY:9,weight:.55},{cellsX:4,cellsY:18,weight:.3},{cellsX:8,cellsY:32,weight:.15}].map((s,o)=>({...s,sample:Jg(s.cellsX,s.cellsY,o)})),r=t.createImageData(256,256);for(let s=0;s<256;s++)for(let o=0;o<256;o++){let l=0;for(const u of n)l+=u.sample(o/256,s/256)*u.weight;const c=(s*256+o)*4,d=Math.round(Math.min(Math.max(l,0),1)*255);r.data[c]=d,r.data[c+1]=d,r.data[c+2]=d,r.data[c+3]=255}t.putImageData(r,0,0);const a=new ua(e);return a.wrapS=ci,a.wrapT=ci,a}function Jg(i,e,t){const n=new Float32Array(i*e);for(let a=0;a<n.length;a++){const s=Math.sin((a+1)*127.1+(t+1)*311.7)*43758.5453;n[a]=s-Math.floor(s)}const r=a=>a*a*(3-2*a);return(a,s)=>{const o=a*i,l=s*e,c=Math.floor(o)%i,d=Math.floor(l)%e,u=(c+1)%i,f=(d+1)%e,h=r(o-Math.floor(o)),g=r(l-Math.floor(l)),S=n[d*i+c]+(n[d*i+u]-n[d*i+c])*h,m=n[f*i+c]+(n[f*i+u]-n[f*i+c])*h;return S+(m-S)*g}}function Qg(i,e){return e<=0?1:Math.ceil(i*2/e)+3}function rf(i,e){const t=Math.floor(Math.max(i,1)/2),n=[];for(let r=-t;r<=t;r++)n.push(r*e);return n}function jg(i,e,t){const n=[],r=[],a=[],s=[],o=e/2,l=t/2,c=rf(i,e),d=(f,h,g,S)=>{if(g-f<=0||S-h<=0)return;const m=n.length/3;n.push(f,0,h,g,0,h,g,0,S,f,0,S);for(let p=0;p<4;p++)r.push(0,1,0);a.push(f,h,g,h,g,S,f,S),s.push(m,m+2,m+1,m,m+3,m+2)};for(const f of c)for(const h of c){const g=f-o,S=f+o,m=h-o,p=h+o;d(g,m,S,h-l),d(g,h+l,S,p),d(g,h-l,f-l,h+l),d(f+l,h-l,S,h+l)}const u=new Nt;return u.setAttribute("position",new yt(n,3)),u.setAttribute("normal",new yt(r,3)),u.setAttribute("uv",new yt(a,2)),u.setIndex(s),u.computeBoundingSphere(),u}function sc(i,e,t,n){const r=[],a=[],s=[],o=[],l=[],c=t/2,d=rf(i,e);for(const f of d)for(const h of d){const g=(S,m,p,w,R,M)=>{const b=r.length/3;r.push(f+S,0,h+m,f+p,0,h+w,f+p,-n,h+w,f+S,-n,h+m);for(let y=0;y<4;y++)a.push(R,0,M);o.push(0,0,t,0,t,n,0,n),s.push(1,1,1,1,1,1,cn,cn,cn,cn,cn,cn),l.push(b,b+1,b+2,b,b+2,b+3)};g(-c,-c,c,-c,0,1),g(c,c,-c,c,0,-1),g(-c,c,-c,-c,1,0),g(c,-c,c,c,-1,0)}const u=new Nt;return u.setAttribute("position",new yt(r,3)),u.setAttribute("normal",new yt(a,3)),u.setAttribute("color",new yt(s,3)),u.setAttribute("uv",new yt(o,2)),u.setIndex(l),u.computeBoundingSphere(),u}function ev(i,e,t,n){const r=t/2,a=Math.min(i,t)/2,s=Math.min(e,t)/2;if(r-a<1e-6&&r-s<1e-6)return null;const o=[],l=[],c=[],d=[],u=[],f=(m,p,w,R)=>{if(w-m<=1e-6||R-p<=1e-6)return;const M=o.length/3;o.push(m,0,p,w,0,p,w,0,R,m,0,R);for(let b=0;b<4;b++)l.push(0,1,0),c.push(1,1,1);d.push(m,p,w,p,w,R,m,R),u.push(M,M+2,M+1,M,M+3,M+2)};f(-r,-r,r,-s),f(-r,s,r,r),f(-r,-s,-a,s),f(a,-s,r,s);const h=u.length,g=(m,p,w,R,M,b)=>{const y=o.length/3;o.push(m,0,p,w,0,R,w,-n,R,m,-n,p);const A=Math.hypot(w-m,R-p);for(let v=0;v<4;v++)l.push(M,0,b);d.push(0,0,A,0,A,n,0,n),c.push(1,1,1,1,1,1,cn,cn,cn,cn,cn,cn),u.push(y,y+1,y+2,y,y+2,y+3)};g(-a,-s,a,-s,0,1),g(a,s,-a,s,0,-1),g(-a,s,-a,-s,1,0),g(a,-s,a,s,-1,0);const S=new Nt;return S.setAttribute("position",new yt(o,3)),S.setAttribute("normal",new yt(l,3)),S.setAttribute("color",new yt(c,3)),S.setAttribute("uv",new yt(d,2)),S.setIndex(u),S.addGroup(0,h,0),S.addGroup(h,u.length-h,1),S.computeBoundingSphere(),S}class tv{constructor(){ce(this,"worker",null);ce(this,"nextRequestId",1);ce(this,"pending",new Map)}ensureWorker(){if(this.worker)return this.worker;const e=new Worker(new URL("/assets/decode.worker-Ctlj6mY-.js",import.meta.url),{type:"module"});return e.onmessage=t=>{const n=t.data,r=this.pending.get(n.requestId);r&&(this.pending.delete(n.requestId),n.ok?r.resolve(n):r.reject(new Error(n.error)))},e.onerror=t=>{const n=new Error(`decode worker failed: ${t.message}`);for(const r of this.pending.values())r.reject(n);this.pending.clear()},this.worker=e,e}decode(e){const t=this.ensureWorker(),n=this.nextRequestId++;return new Promise((r,a)=>{this.pending.set(n,{resolve:r,reject:a}),t.postMessage({kind:"decode",requestId:n,payload:e})})}slice(e,t,n){const r=this.ensureWorker(),a=this.nextRequestId++;return new Promise((s,o)=>{this.pending.set(a,{resolve:s,reject:o}),r.postMessage({kind:"slice",requestId:a,playerUuid:e,ceiling:t,from:n})})}forget(e){var t;(t=this.worker)==null||t.postMessage({kind:"forget",playerUuid:e})}dispose(){var e;(e=this.worker)==null||e.terminate(),this.worker=null;for(const t of this.pending.values())t.reject(new Error("decode client disposed"));this.pending.clear()}}const nv=3e3,iv=6e4;function rv(i,e=nv){if(i<=0)return e;const t=e*2**(i-1),n=Math.min(t,iv);return Math.round(n*(.85+Math.random()*.3))}class av{constructor(e,t=3e3){ce(this,"known",new Map);ce(this,"decoder",new tv);ce(this,"timer",null);ce(this,"abort",null);ce(this,"consecutiveFailures",0);ce(this,"lastSuccessAt",null);ce(this,"lastError",null);ce(this,"started",!1);ce(this,"stopped",!1);this.callbacks=e,this.pollMs=t}start(){this.started||(this.started=!0,this.stopped=!1,this.emitStatus("connecting"),this.poll())}slice(e,t,n){return this.decoder.slice(e,t,n)}stop(){var e;this.stopped=!0,this.started=!1,this.timer!==null&&clearTimeout(this.timer),this.timer=null,(e=this.abort)==null||e.abort(),this.abort=null,this.decoder.dispose()}emitStatus(e){this.callbacks.onStatus({state:e,lastSuccessAt:this.lastSuccessAt,consecutiveFailures:this.consecutiveFailures,lastError:this.lastError,plotCount:this.known.size})}schedule(){this.stopped||(this.timer=setTimeout(()=>void this.poll(),rv(this.consecutiveFailures,this.pollMs)))}async poll(){if(!this.stopped){this.abort=new AbortController;try{const e=await Uf(this.abort.signal);if(this.stopped)return;this.consecutiveFailures=0,this.lastError=null,this.lastSuccessAt=Date.now(),await this.reconcile(e),this.emitStatus("live")}catch(e){if(this.stopped)return;this.consecutiveFailures++,this.lastError=e instanceof Error?e.message:String(e),this.emitStatus("stale")}finally{this.abort=null,this.schedule()}}}async reconcile(e){const t=new Set(e.map(r=>r.playerUuid));for(const r of[...this.known.keys()])t.has(r)||(this.known.delete(r),this.decoder.forget(r),this.callbacks.onRemoved(r));const n=e.filter(r=>_a(r.etag)!==this.known.get(r.playerUuid));for(const r of n){if(this.stopped)return;await this.refresh(r)}}async refresh(e){var t;try{const n=await Nf(e.playerUuid,this.known.get(e.playerUuid),(t=this.abort)==null?void 0:t.signal);if(this.stopped)return;if(n.status==="missing"){this.known.delete(e.playerUuid)&&(this.decoder.forget(e.playerUuid),this.callbacks.onRemoved(e.playerUuid));return}if(n.status==="not-modified"){this.known.set(e.playerUuid,_a(e.etag));return}const r=await this.decoder.decode(n.payload);if(this.stopped)return;this.known.set(e.playerUuid,n.etag??_a(e.etag)),this.callbacks.onMesh(r)}catch(n){console.error(`[plots] column ${e.playerName} failed:`,n)}}}function sv(i,e){const t=i.trim().toLowerCase();if(!t)return null;let n=null;for(const r of e){if(r.uuid.toLowerCase()===t)return r.uuid;n===null&&r.name.toLowerCase()===t&&(n=r.uuid)}return n}const ov={class:"pointer-events-none absolute inset-0 overflow-hidden"},lv={class:"rounded-md bg-white/75 px-2 py-1 text-xs shadow-sm ring-1 ring-black/5 backdrop-blur-sm"},cv={key:0,class:"mr-0.5"},fv={key:1,class:"mr-1 text-slate-400"},uv={class:"font-semibold text-slate-700"},dv={key:2,class:"ml-1.5 text-slate-500"},hv={key:3,class:"ml-1.5 italic text-slate-400"},pv={key:0,class:"pointer-events-none absolute inset-x-0 bottom-16 text-center text-sm font-semibold text-slate-400"},oc=1.3,lc=4e3,mv=6,_v=220,cc=2,gv=52,vv=.01,xv=95,fc=.002,Sv=240,Mv=.011,bv=1,yv=.82,Ev=1.3,es=.0012,wv=.9,Tv=110,Av=88,Rv=ur({__name:"plotScene",props:{rows:{},covered:{type:Boolean}},emits:["status","focused","dismiss","escape","plots","log","dock"],setup(i,{expose:e,emit:t}){const n=i,r=t;e({focusPlayer:he});const a=Ct(null),s=Ct("Connecting..."),o=zo(null),l=zo(null),c=mc("(orientation: landscape)"),d=Ct(null);let u=null,f=null,h=null,g=null;const S=new Map;let m=[],p=aa,w=Ks(p),R=!0,M=24;const b={x:0,z:0};let y=null,A=null,v=0;const T=[];let P=[],U=null;const O=new Map;let z=0,I=0,G=0,Z=0,$=1,ae=0;const Y=new Map;let ne=0,re=0,Te=0,Ae=!1,et=0,J=0,ee=!0;function H(){const W=new Map(n.rows.map(j=>[j.playerUuid,j.rank]));m=[...S.keys()].sort((j,Me)=>{var dt,St;const Ee=W.get(j),Fe=W.get(Me);return Ee!==void 0&&Fe!==void 0?Ee-Fe:Ee!==void 0?-1:Fe!==void 0?1:(((dt=S.get(j))==null?void 0:dt.plotIndex)??0)-(((St=S.get(Me))==null?void 0:St.plotIndex)??0)}),r("plots",m),l.value&&(l.value={...l.value,...pe(l.value.uuid)}),ee=!0}function q(W){if(g=requestAnimationFrame(q),!u||m.length===0)return;const j=et===0?0:Math.min(W-et,100);if(et=W,W>J&&!ze())b.x+=oc*jl.x*j/1e3,b.z+=oc*jl.z*j/1e3;else if(!ee)return;ee=!1,u.settling&&(ee=!0),Tt(j),u.setScroll(b.x,b.z);const Ee=fg(m.length,w,b.x,b.z,u.viewExtent),Fe=[],dt=new Set;for(const Ot of Ee){const gn=`${Ot.gx}:${Ot.gz}`;dt.add(gn);const tn=O.get(gn)??m[Ot.playerIndex];S.has(tn)&&Fe.push({uuid:tn,x:Ot.x,z:Ot.z,turn:R?Ot.turn:Ot.turn&2,key:gn})}for(const Ot of O.keys())Ot!==U&&!dt.has(Ot)&&O.delete(Ot);u.syncPlots(Fe),P=Fe;let St=null;n.covered||ze()?xt():St=bt(Fe,W),oe(Fe,j),Oe(Fe),Se(Fe,j),D(Fe,St,W),u.renderNow()}function oe(W,j){if(!u||(A!==null&&!T.some(Ee=>Ee.key===A)&&T.push({key:A,height:0}),T.length===0))return;const Me=ut()?1:1-Math.exp(-j/gv);for(let Ee=T.length-1;Ee>=0;Ee--){const Fe=T[Ee],dt=Fe.key===A?cc:0;Fe.height+=(dt-Fe.height)*Me,Math.abs(dt-Fe.height)<vv&&(Fe.height=dt,dt===0&&T.splice(Ee,1))}T.length>0&&(ee=!0);for(let Ee=0;Ee<W.length;Ee++){const Fe=T.find(dt=>dt.key===W[Ee].key);Fe&&u.setLift(Ee,Fe.height)}}function Oe(W){if(!u)return;const j=ze()?null:A,Me=j===null?void 0:T.find(Fe=>Fe.key===j);if(!Me){u.setGlint(null,0);return}const Ee=W.findIndex(Fe=>Fe.key===j);u.setGlint(Ee===-1?null:Ee,Me.height/cc)}function Se(W,j){if(!u||U===null&&I===0&&G===0)return;const Me=ut(),Ee=Me?1:1-Math.exp(-j/xv),Fe=Me?1:1-Math.exp(-j/Sv);I+=(z-I)*Ee,G+=(z-G)*Fe,Math.abs(z-I)<fc&&Math.abs(z-G)<fc?(I=z,G=z,z===0&&(U=null)):ee=!0;const dt=U===null?-1:W.findIndex(St=>St.key===U);u.setFocus(dt===-1?null:dt,I,G)}function ze(){return z===1}function pt(){U===null||z===0||(z=0,l.value=null,Z=0,Te=0,u==null||u.setFocusSpin(0),u==null||u.setFocusColumn(null),ee=!0,r("focused",null))}function qe(W){const j=Qe();if(!j||!l.value)return;const Me=Math.round(Math.min(Math.max(W,1),j.occupiedHeight));l.value={...l.value,cut:Me,worldY:j.minY+Me-1},Te=Me,lt()}function Qe(){const W=U===null?void 0:O.get(U);return W===void 0?void 0:S.get(W)}async function lt(){if(Ae)return;const W=Qe();if(!(!f||!u||!W||Te===re)){Ae=!0;try{for(;Te!==re&&U!==null;){const j=Te;u.setFocusColumn(await f.slice(W.playerUuid,j,re)),re=j,ee=!0}}catch(j){console.warn("[plots] slice failed:",j)}finally{Ae=!1}}}function Xe(W){if(!u)return;const j=Math.min(Math.max($*W,yv),Ev);Math.abs(j-$)<5e-4||($=j,ft(),ee=!0)}function ft(){u==null||u.setZoom($*(1-ae*(1-wv)))}function Tt(W){const j=n.covered?1:0;if(ae===j)return;const Me=ut()?1:1-Math.exp(-W/Tv);ae+=(j-ae)*Me,Math.abs(j-ae)<.002?ae=j:ee=!0,ft()}function Ft(){const[W,j]=[...Y.values()];return!W||!j?0:Math.hypot(W.x-j.x,W.y-j.y)}function ut(){return typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function bt(W,j){if(!u||!y)return xt(),null;const Me=u.pickSlot(y.x,y.y),Ee=Me===null?null:W[Me];return Me===null||!Ee||!S.has(Ee.uuid)?(xt(),null):(Ee.key!==A&&(A=Ee.key,v=j,o.value=null),Me)}function D(W,j,Me){if(!u||j===null)return;const Ee=W[j],Fe=S.get(Ee.uuid);if(!Fe)return;if(Me-v<_v){ee=!0;return}const dt=u.projectSlot(j);if(!dt){xt();return}const St=n.rows.find(Ot=>Ot.playerUuid===Ee.uuid);o.value={name:(St==null?void 0:St.playerName)??Fe.playerName,score:St?St.score.toLocaleString():null,rank:(St==null?void 0:St.rank)??null,medal:St?Qr(St.rank):null,x:dt.x,y:dt.y}}function xt(){A=null,v=0,o.value=null}function rt(){if(!u)return;const W=[...S.values()],j=ag(W),Me=Ks(j);j===p&&Me===w||(b.x=Ql(b.x,w,Me),b.z=Ql(b.z,w,Me),p=j,w=Me,R=W.every(Ee=>Ee.sizeX===Ee.sizeZ),u.setGrid(w,p))}function E(W){if(!u)return;ee=!0,S.set(W.playerUuid,{playerUuid:W.playerUuid,playerName:W.playerName,plotIndex:W.plotIndex,occupiedHeight:W.occupiedHeight,surfaceLevel:W.surfaceLevel,minY:W.minY,sizeX:W.sizeX,sizeZ:W.sizeZ}),rt();const j=[...S.values()].map(Ee=>Ee.surfaceLevel).sort((Ee,Fe)=>Ee-Fe);j.length&&u.setFloorLevel(j[Math.floor(j.length/2)]);const Me=[...S.values()].map(Ee=>Ee.occupiedHeight);M=Math.max(...Me,u.floorLevel+4),u.frame(M),u.setColumn(W.playerUuid,W),H(),s.value=null}function _(W){var j;ee=!0,((j=l.value)==null?void 0:j.uuid)===W&&pt();for(const[Me,Ee]of O)Ee===W&&O.delete(Me);u==null||u.removeColumn(W),S.delete(W),H()}function N(W){r("status",W),S.size===0?s.value=W.state==="stale"?"Waiting for the server...":W.plotCount===0&&W.state==="live"?"No plots published yet":"Connecting...":s.value=null}function V(W,j){if(!u)return;const Me=sg(-W,-j,u.unitsPerPixel);b.x+=Me.x,b.z+=Me.z,J=performance.now()+lc,ee=!0}let K=!1;function le(W){K=W.ctrlKey||W.metaKey}function ue(){K=!1}function Q(W){if(W.preventDefault(),n.covered)return;if(l.value&&K&&(W.ctrlKey||W.metaKey)){qe(l.value.cut-Math.sign(W.deltaY)*bv);return}const j=W.deltaY*[1,16,window.innerHeight][W.deltaMode];Xe(Math.exp(-j*es))}function ie(W){var Me;const j=(Me=a.value)==null?void 0:Me.getBoundingClientRect();j&&(y={x:W.clientX-j.left,y:W.clientY-j.top},ee=!0)}let fe=!1,Le=0,me=0,de=0;function De(W){var j,Me;if(!n.covered){if(Y.set(W.pointerId,{x:W.clientX,y:W.clientY}),Y.size>1){fe=!1,ne=Ft();return}fe=!0,Le=W.clientX,me=W.clientY,de=0,ie(W),(Me=(j=W.target).setPointerCapture)==null||Me.call(j,W.pointerId)}}function Ne(W){if(n.covered)return;if(Y.has(W.pointerId)&&Y.set(W.pointerId,{x:W.clientX,y:W.clientY}),Y.size>1){const Ee=Ft();ne>0&&Ee>0&&Xe(Ee/ne),ne=Ee;return}if(ie(W),!fe)return;const j=W.clientX-Le,Me=W.clientY-me;if(Le=W.clientX,me=W.clientY,de+=Math.hypot(j,Me),ze()){Z-=j*Mv,u==null||u.setFocusSpin(Z),ee=!0;return}V(j,Me)}function Ge(W){if(n.covered){r("dismiss");return}Y.delete(W.pointerId),ne=0;const j=fe&&de<=mv;if(fe=!1,!j)return;if(ze()){pt();return}const Me=Ue();Me&&te(Me.key,Me.uuid)}function L(){return m.flatMap(W=>{var Me,Ee;return[(Me=n.rows.find(Fe=>Fe.playerUuid===W))==null?void 0:Me.playerName,(Ee=S.get(W))==null?void 0:Ee.playerName].filter(Fe=>!!Fe).map(Fe=>({uuid:W,name:Fe}))})}function he(W){const j=sv(W,L()),Me=j===null?-1:m.indexOf(j);if(j===null||Me===-1||w<=0)return!1;U!==null&&pt();const Ee=P.filter(Qn=>Qn.uuid===j);if(Ee.length){const Qn=Ee.reduce((di,hi)=>Math.hypot(di.x,di.z)<=Math.hypot(hi.x,hi.z)?di:hi);return te(Qn.key,j),!0}const Fe=m.length,dt=Math.round(b.z/w),St=Math.round(b.x/w);let gn=((((Me-dt*Jc(Fe))%Fe+Fe)%Fe-St)%Fe+Fe)%Fe;gn*2>Fe&&(gn-=Fe);const tn=St+gn;return b.x=tn*w,b.z=dt*w,J=performance.now()+lc,ee=!0,te(`${tn}:${dt}`,j),!0}function te(W,j){const Me=S.get(j);if(!Me)return;U=W,O.set(W,j),z=1,Z=0,u==null||u.setFocusSpin(0),re=Me.occupiedHeight,Te=re;const Ee=n.rows.find(Fe=>Fe.playerUuid===j);l.value={uuid:j,name:(Ee==null?void 0:Ee.playerName)??Me.playerName,score:Ee?Ee.score.toLocaleString():null,rank:(Ee==null?void 0:Ee.rank)??null,medal:Ee?Qr(Ee.rank):null,...pe(j),cut:re,layers:Me.occupiedHeight,surface:Me.surfaceLevel,worldY:Me.minY+re-1},ee=!0,r("focused",{uuid:j,name:l.value.name})}function pe(W){const j=m.indexOf(W);return j===-1?{prev:null,next:null}:{prev:ge(m[j-1]),next:ge(m[j+1])}}function ge(W){var Me;if(W===void 0)return null;const j=n.rows.find(Ee=>Ee.playerUuid===W);return{uuid:W,name:(j==null?void 0:j.playerName)??((Me=S.get(W))==null?void 0:Me.playerName)??W,rank:(j==null?void 0:j.rank)??null}}function se(){const W=d.value;if(!W)return;u==null||u.setFocusReserve({x:0,y:Math.max(W.offsetHeight,Av)}),ee=!0;const j=W.querySelector(".bust");r("dock",W.offsetHeight-Math.min(0,(j==null?void 0:j.offsetTop)??0))}_c(d,se),yn(c,se,{flush:"post"});function Ue(){if(A!==null)return P.find(j=>j.key===A)??null;if(!u||!y)return null;const W=u.pickSlot(y.x,y.y);return W===null?null:P[W]??null}function Re(W){if(le(W),W.key==="Escape"){U!==null?pt():r("escape");return}n.covered||((W.key==="+"||W.key==="=")&&Xe(1+es*60),(W.key==="-"||W.key==="_")&&Xe(1-es*60))}function ot(W){W?Y.delete(W.pointerId):Y.clear(),ne=0,fe=!1,y=null,xt(),ee=!0}function tt(){document.hidden?(g!==null&&cancelAnimationFrame(g),g=null):g===null&&(et=0,ee=!0,g=requestAnimationFrame(q))}return yn(()=>n.covered,W=>{W&&pt(),ee=!0}),yn(()=>n.rows,()=>{ee=!0,H()},{deep:!1}),Qs(()=>{if(a.value){if(u=new Wg(a.value),u.setGrid(w,p),u.frame(M),h=new ResizeObserver(()=>{ee=!0,u==null||u.resize()}),h.observe(a.value),!Ff()){s.value="VITE_PLOTS_API_URL is not set";return}f=new av({onMesh:E,onRemoved:_,onStatus:N}),f.start(),document.addEventListener("visibilitychange",tt),document.addEventListener("keydown",Re),document.addEventListener("keyup",le),window.addEventListener("blur",ue),g=requestAnimationFrame(q)}}),la(()=>{document.removeEventListener("visibilitychange",tt),document.removeEventListener("keydown",Re),document.removeEventListener("keyup",le),window.removeEventListener("blur",ue),g!==null&&cancelAnimationFrame(g),g=null,h==null||h.disconnect(),h=null,f==null||f.stop(),f=null,u==null||u.dispose(),u=null}),(W,j)=>(Ye(),Ke("div",{class:"absolute inset-0 touch-none",onWheel:Q,onPointerdown:De,onPointermove:Ne,onPointerup:Ge,onPointercancel:ot,onPointerleave:ot},[ye("canvas",{ref_key:"canvas",ref:a,class:"block h-full w-full"},null,512),ye("div",ov,[Qt(Fn,{name:"plot-card"},{default:fn(()=>[o.value?(Ye(),Ke("div",{key:0,"data-plot-label":"",class:"absolute -translate-x-1/2 -translate-y-full whitespace-nowrap text-center",style:Ui({left:o.value.x+"px",top:o.value.y+"px"})},[ye("div",lv,[o.value.medal?(Ye(),Ke("span",cv,gt(o.value.medal),1)):o.value.rank?(Ye(),Ke("span",fv,"#"+gt(o.value.rank),1)):jt("",!0),ye("span",uv,gt(o.value.name),1),o.value.score?(Ye(),Ke("span",dv,gt(o.value.score),1)):(Ye(),Ke("span",hv,"unranked"))])],4)):jt("",!0)]),_:1})]),Qt(Fn,{name:"focus-ui",duration:{enter:220,leave:160}},{default:fn(()=>[l.value&&!W.covered?(Ye(),Ke("div",{key:0,ref_key:"cardBox",ref:d,class:"dock pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6",onPointerdown:j[1]||(j[1]=ma(()=>{},["stop"])),onPointerup:j[2]||(j[2]=ma(()=>{},["stop"])),onPointermove:j[3]||(j[3]=ma(()=>{},["stop"]))},[Qt(O0,{class:"pointer-events-auto",uuid:l.value.uuid,name:l.value.name,score:l.value.score,rank:l.value.rank,medal:l.value.medal,prev:l.value.prev,next:l.value.next,slice:l.value,landscape:bn(c),onStep:he,onSlice:qe,onBack:pt,onLog:j[0]||(j[0]=Me=>r("log",{uuid:l.value.uuid,name:l.value.name}))},null,8,["uuid","name","score","rank","medal","prev","next","slice","landscape"])],544)):jt("",!0)]),_:1}),s.value?(Ye(),Ke("p",pv,gt(s.value),1)):jt("",!0),j[4]||(j[4]=ye("p",{class:"pointer-events-none absolute bottom-1 right-2 text-[10px] text-slate-400/70"}," Textures: Pixel Perfection by XSSheep & Nova_Wostra ",-1))],32))}}),Cv=oa(Rv,[["__scopeId","data-v-7472be13"]]),Pv={key:0,class:"flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] text-slate-500"},Lv=ur({__name:"liveStatus",props:{status:{}},setup(i){const e=i,t=Ct(Date.now()),n=setInterval(()=>t.value=Date.now(),1e3);la(()=>clearInterval(n));const r=Nn(()=>{var l;return(l=e.status)!=null&&l.lastSuccessAt?Math.max(0,Math.round((t.value-e.status.lastSuccessAt)/1e3)):null}),a=Nn(()=>{const l=e.status;if(!l)return"";if(l.state==="connecting")return"connecting";if(l.state==="live")return"live";const c=r.value;return c===null?"offline":c<60?`${c}s ago`:`${Math.floor(c/60)}m ago`}),s=Nn(()=>{var c;const l=(c=e.status)==null?void 0:c.state;return l==="live"?"bg-emerald-500":l==="stale"?"bg-amber-500":"bg-slate-300"}),o=Nn(()=>{const l=e.status;return l?l.state==="live"?`${l.plotCount} plot(s), updated just now`:l.state==="connecting"?"Contacting the server...":`Showing the last known board. ${l.lastError??"Server unreachable."}`:""});return(l,c)=>{const d=Tf("tooltip");return l.status?uc((Ye(),Ke("div",Pv,[ye("span",{class:ri(["h-1.5 w-1.5 rounded-full transition-colors",[s.value,l.status.state==="live"?"animate-pulse":""]])},null,2),Jr(" "+gt(a.value),1)])),[[d,o.value,void 0,{bottom:!0}]]):jt("",!0)}}}),Dv={class:"relative h-full w-full overflow-hidden bg-slate-200"},Iv=3e4,Uv=ur({__name:"SeasonOneView",setup(i){const e=Cf(()=>Pf(()=>import("./collectionSheet-Bipr0nOs.js"),__vite__mapDeps([0,1,2,3,4,5]))),t=Ct(null),n=Ct([]),r=Ct([]),a=Ct(!0),s=Ct(!1),o=Ct(null),l=Ct(0),c=Ct(null),d=Ct(!0);let u=!1;const f=Af(),h=Rf();let g=typeof f.query.plot=="string"?f.query.plot:null;yn(r,()=>{var M;g&&((M=t.value)!=null&&M.focusPlayer(g))&&(g=null)});function S(){d.value&&(u=!0,d.value=!1)}function m(){u&&(u=!1,d.value=!0)}yn(d,M=>{M&&(u=!1)});function p(M){g=null,M?S():m(),h.replace({query:{...f.query,plot:M==null?void 0:M.name}})}function w(){If("s1").then(M=>{n.value=M,s.value=!1}).catch(M=>{console.warn("[scores] could not load:",M),s.value=n.value.length===0}).finally(()=>a.value=!1)}w();const R=setInterval(w,Iv);return la(()=>clearInterval(R)),(M,b)=>(Ye(),Ke("div",Dv,[ye("div",{class:ri(["board",{"board--behind-glass":d.value||o.value}])},[Qt(Cv,{ref_key:"scene",ref:t,rows:n.value,covered:d.value,onStatus:b[0]||(b[0]=y=>c.value=y),onPlots:b[1]||(b[1]=y=>r.value=y),onDismiss:b[2]||(b[2]=y=>d.value=!1),onEscape:b[3]||(b[3]=y=>d.value=!d.value),onFocused:p,onLog:b[4]||(b[4]=y=>o.value=y),onDock:b[5]||(b[5]=y=>l.value=y)},null,8,["rows","covered"])],2),Qt(cu,{expanded:d.value,"onUpdate:expanded":b[6]||(b[6]=y=>d.value=y),rows:n.value,loading:a.value,failed:s.value,plotted:r.value,onSelect:b[7]||(b[7]=y=>{var A;return(A=t.value)==null?void 0:A.focusPlayer(y.playerUuid)})},{status:fn(()=>[Qt(Lv,{status:c.value},null,8,["status"])]),_:1},8,["expanded","rows","loading","failed","plotted"]),Qt(Fn,{name:"sheet"},{default:fn(()=>[o.value?(Ye(),ts(bn(e),Pi({key:o.value.uuid},o.value,{below:l.value,onClose:b[8]||(b[8]=y=>o.value=null)}),null,16,["below"])):jt("",!0)]),_:1})]))}}),Nv=oa(Uv,[["__scopeId","data-v-d9bfce05"]]),Hv=Object.freeze(Object.defineProperty({__proto__:null,default:Nv},Symbol.toStringTag,{value:"Module"}));export{Zl as A,Kr as B,Hv as S,Kl as a,Y0 as b,$l as c,zv as d,Gv as e,q0 as f,Q0 as r};
