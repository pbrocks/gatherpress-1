(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.moment;var n=e.n(t);const r=window.wp.i18n,o=window.wp.element;window.wp.data;const a=window.wp.date,s=window.ReactJSXRuntime,d=e=>{const{name:t,value:n}=e.attrs,[r,d]=(0,o.useState)(n);return document.querySelector(`[name="${t}"]`).addEventListener("input",(e=>{d(e.target.value)}),{once:!0}),(0,s.jsx)(s.Fragment,{children:r&&(0,a.format)(r)})},c="YYYY-MM-DDTHH:mm:ss",i=n().tz(u()).add(1,"day").set("hour",18).set("minute",0).set("second",0).format(c);function u(e=function(){if("object"==typeof GatherPress)return"eventDetails.dateTime.timezone".split(".").reduce(((e,t)=>e&&e[t]),GatherPress)}()){return n().tz.zone(e)?e:(0,r.__)("GMT","gatherpress")}n().tz(i,u()).add(2,"hours").format(c),function(){const e=document.querySelectorAll('[data-gatherpress_component_name="datetime-preview"]');for(let t=0;t<e.length;t++){const n=JSON.parse(e[t].dataset.gatherpress_component_attrs);(0,o.createRoot)(e[t]).render((0,s.jsx)(d,{attrs:n}))}}()})();