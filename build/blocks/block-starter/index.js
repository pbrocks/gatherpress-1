!function(){"use strict";var e,t={9357:function(){var e=window.wp.blocks,t=window.wp.element,r=window.wp.components,n=window.wp.blockEditor,o=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gatherpress/block-starter","version":"0.1.1","title":"Sample Block Starter","category":"gatherpress","icon":{"background":"#29c8aa","foreground":"white","src":"flag"},"description":"A block to build from! This block enables you to type text and style it with the color font Gilbert from Type with Pride.","attributes":{"message":{"type":"string","source":"text","selector":"div"}},"supports":{"html":false},"example":{},"textdomain":"gatherpress","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');(0,e.registerBlockType)(o,{example:{attributes:{message:"Basic Template for a TextControl input and message attribute"}},edit:function(e){let{attributes:o,setAttributes:s}=e;const i=(0,n.useBlockProps)();return(0,t.createElement)("div",i,(0,t.createElement)(r.TextControl,{placeholder:"font-size: 36px;",value:o.message,onChange:e=>s({message:e})}))},save:function(e){let{attributes:r}=e;const o=n.useBlockProps.save();return(0,t.createElement)("div",o,r.message)}})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var s=r[e]={exports:{}};return t[e](s,s.exports,n),s.exports}n.m=t,e=[],n.O=function(t,r,o,s){if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],s=e[u][2];for(var a=!0,l=0;l<r.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(a=!1,s<i&&(i=s));if(a){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[r,o,s]},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={916:0,777:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,s,i=r[0],a=r[1],l=r[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(l)var u=l(n)}for(t&&t(r);c<i.length;c++)s=i[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(u)},r=self.webpackChunkgatherpress=self.webpackChunkgatherpress||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[777],(function(){return n(9357)}));o=n.O(o)}();