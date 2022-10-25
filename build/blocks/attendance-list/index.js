!function(){"use strict";var e=window.wp.blocks,t=window.wp.element,a=window.wp.blockEditor,n=window.wp.i18n,s=e=>{let{item:a,additionalClasses:n,count:s,onTitleClick:r}=e;const{title:i,value:l}=a,c=0===s&&"attending"!==l?"hidden":"active";return(0,t.createElement)("div",{className:`gp-attendance-list__navigation--item gp-attendance-list__${c} ${n}`},(0,t.createElement)("a",{className:"gp-attendance-list__anchor","data-item":l,"data-toggle":"tab",href:"#",role:"tab","aria-controls":`#gp-attendance-${l}`,onClick:e=>r(e,l)},i),(0,t.createElement)("span",{className:"gp-attendance-list__count"},"(",s,")"))};const r=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];for(const[a,n]of Object.entries(e)){let e=a;t&&(e+=t),addEventListener(e,(e=>{n(e.detail)}),!1)}};var i=e=>{let{items:a,activeValue:n,onTitleClick:i}=e;const l={all:0,attending:0,not_attending:0,waiting_list:0};if("object"==typeof GatherPress)for(const[e,t]of Object.entries(GatherPress.attendees))l[e]=t.count;const[c,o]=(0,t.useState)(l);r({setAttendanceCount:o},GatherPress.post_id);const d=a.map(((e,a)=>{const r=e.value===n?"gp-attendance-list__navigation--current":"";return(0,t.createElement)(s,{key:a,item:e,count:c[e.value],additionalClasses:r,onTitleClick:i})}));return(0,t.createElement)("nav",{className:"gp-attendance-list__navigation"},d)},l=e=>{let{eventId:a,value:s,limit:i,attendees:l=[],avatarOnly:c=!1}=e;const[o,d]=(0,t.useState)(l);r({setAttendanceList:d},a);let m="";return"object"==typeof o&&void 0!==o[s]&&(l=[...o[s].attendees],i&&(l=l.splice(0,i)),m=l.map(((e,a)=>{const{profile:n,name:s,photo:r,role:i}=e;let{guests:l}=e;return l=l?" +"+l+" guest(s)":"",(0,t.createElement)("div",{key:a,className:"gp-attendance-list__items--item"},(0,t.createElement)("figure",{className:"gp-attendance-list__member-avatar"},(0,t.createElement)("a",{href:n},(0,t.createElement)("img",{alt:s,title:s,src:r}))),!1===c&&(0,t.createElement)("div",{className:"gp-attendance-list__member-info"},(0,t.createElement)("div",{className:"gp-attendance-list__member-name"},(0,t.createElement)("a",{href:n},s)),(0,t.createElement)("div",{className:"gp-attendance-list__member-role"},i),(0,t.createElement)("small",{className:"gp-attendance-list__guests"},l)))}))),(0,t.createElement)(t.Fragment,null,"attending"===s&&0===m.length&&!1===c&&(0,t.createElement)("div",{className:"gp-attendance-list__no-attendees"},"1"!==GatherPress.has_event_past?(0,n.__)("No one is attending this event yet.","gatherpress"):(0,n.__)("No one went to this event.","gatherpress")),m)},c=e=>{let{items:a,activeValue:n,limit:s=!1}=e;const r=a.map(((e,a)=>{const{value:r}=e,i=r===n?"active":"hidden",c=GatherPress.post_id,o=GatherPress.attendees;return(0,t.createElement)("div",{key:a,className:`gp-attendance-list__items gp-attendance-list__${i}`,id:`gp-attendance-${r}`,role:"tabpanel","aria-labelledby":`gp-attendance-${r}-tab`},(0,t.createElement)(l,{eventId:c,value:r,limit:s,attendees:o}))}));return(0,t.createElement)("div",{className:"gp-attendance-list__container"},r)},o=()=>{let e="attending";const a=[{title:"1"!==GatherPress.has_event_past?(0,n.__)("Attending","gatherpress"):(0,n.__)("Went","gatherpress"),value:"attending"},{title:"1"!==GatherPress.has_event_past?(0,n.__)("Waiting List","gatherpress"):(0,n.__)("Wait Listed","gatherpress"),value:"waiting_list"},{title:"1"!==GatherPress.has_event_past?(0,n.__)("Not Attending","gatherpress"):(0,n.__)("Didn't Go","gatherpress"),value:"not_attending"}];"object"==typeof GatherPress&&(e=void 0!==GatherPress.current_user.status&&"attend"!==GatherPress.current_user.status?GatherPress.current_user.status:e);const[s,l]=(0,t.useState)(e),[o,d]=(0,t.useState)(10);let m;return r({setAttendanceStatus:l},GatherPress.post_id),m=!1===o?(0,n.__)("See less","gatherpress"):(0,n.__)("See more","gatherpress"),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"gp-attendance-list"},(0,t.createElement)(i,{items:a,activeValue:s,onTitleClick:(e,t)=>{e.preventDefault(),l(t)}}),(0,t.createElement)(c,{items:a,activeValue:s,limit:o})),(0,t.createElement)("div",{className:"has-text-align-right"},(0,t.createElement)("a",{href:"#",onClick:e=>(e=>{e.preventDefault(),d(!1===o&&10)})(e)},m)))},d=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gatherpress/attendance-list","version":"0.1.1","title":"Attendance List","category":"gatherpress","icon":"groups","example":{},"description":"The block with attendance list.","attributes":{"blockId":{"type":"string"},"content":{"type":"string"},"color":{"type":"string"}},"supports":{"html":false},"textdomain":"gatherpress","editorScript":"file:./index.js","style":"file:./style-index.css"}');(0,e.registerBlockType)(d,{edit:()=>{const e=(0,a.useBlockProps)();return(0,t.createElement)("div",e,(0,t.createElement)(o,null))},save:()=>null})}();