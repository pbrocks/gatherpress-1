!function(){"use strict";var e,t={123:function(e,t,n){var r=window.wp.blocks,a=window.wp.element,s=window.wp.i18n,i=window.wp.blockEditor,o=window.wp.components,l=window.wp.date,c=window.moment,u=n.n(c);const m=()=>{const e=new Date;return e.setDate(e.getDate()+14),e.setHours(14,0,0),d(e)},d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"F j, Y g:ia ";const n=new Date(e);return n.setDate(n.getDate()),(0,l.dateI18n)(t,n)+"UTC-"+n.getTimezoneOffset()/60+":00"};var p=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gatherpress/initial-time","version":"0.1.0","title":"Initial Time","category":"gatherpress","example":{},"icon":{"background":"#29c8aa","foreground":"white","src":"clock"},"description":"Initial Static block scaffolded with Create Block tool.","attributes":{"beginTime":{"type":"string"}},"supports":{"html":false},"textdomain":"gatherpress","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}'),g=window.wp.plugins,h=window.wp.editPost;function v(){return"gp_event"===wp.data.select("core/editor").getCurrentPostType()}function _(){wp.data.dispatch("core/editor").editPost({meta:{_non_existing_meta:!0}})}(0,g.registerPlugin)("pbrocks-document-setting-panel-example",{render:()=>(0,a.createElement)(h.PluginDocumentSettingPanel,{name:"pbrocks-panel",title:"PBrocks Panel",className:"pbrocks-panel"},"PBrocks Panel Contents"),icon:"palmtree"});var f=window.wp.data,w=window.wp.apiFetch,E=n.n(w);const b=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];for(const[n,r]of Object.entries(e)){let e=n;t&&(e+=t);const a=new CustomEvent(e,{detail:r});dispatchEvent(a)}};function P(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;C(e),GatherPress.event_datetime.datetime_start=e,this.setState({dateTime:e}),null!==t&&t({dateTime:e});const n={setDateTimeStart:e};b(n),_()}function S(){return GatherPress.event_datetime.datetime_start=this.state.dateTime,this.state.dateTime}class T extends a.Component{constructor(e){super(e),this.state={dateTime:GatherPress.event_datetime.datetime_start}}componentDidMount(){this.updateDateTimeStart=P,this.getDateTimeStart=S,P=P.bind(this),S=S.bind(this)}componentWillUnmount(){P=this.updateDateTimeStart,S=this.getDateTimeStart}render(){const e=(0,l.__experimentalGetSettings)();return(0,l.dateI18n)(`${e.formats.date} ${e.formats.time}`,this.state.dateTime)}}function D(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;G(e),GatherPress.event_datetime.datetime_end=e,this.setState({dateTime:e}),null!==t&&t({dateTime:e});const n={setDateTimeEnd:e};b(n),_()}function k(){return GatherPress.event_datetime.datetime_end=this.state.dateTime,O(),this.state.dateTime}function O(){const e="gp_event_past",t=wp.data.dispatch("core/notices"),n=u()().valueOf()>u()(GatherPress.event_datetime.datetime_end).valueOf();t.removeNotice(e),n&&t.createNotice("warning",(0,s.__)("This event has already past.","gatherpress"),{id:e,isDismissible:!0})}class x extends a.Component{constructor(e){super(e),this.state={dateTime:GatherPress.event_datetime.datetime_end}}componentDidMount(){this.updateDateTimeEnd=D,this.getDateTimeEnd=k,D=D.bind(this),k=k.bind(this),O()}componentWillUnmount(){D=this.updateDateTimeEnd,k=this.getDateTimeEnd}componentDidUpdate(){O()}render(){const e=(0,l.__experimentalGetSettings)();return(0,l.dateI18n)(`${e.formats.date} ${e.formats.time}`,this.state.dateTime)}}const y="YYYY-MM-DDTHH:mm:ss";function C(e){const t=u()(GatherPress.event_datetime.datetime_end).valueOf(),n=u()(e).valueOf();n>=t&&D(u()(n).add(2,"hours").format(y)),O()}function G(e){const t=u()(GatherPress.event_datetime.datetime_start).valueOf(),n=u()(e).valueOf();n<=t&&P(u()(n).subtract(2,"hours").format(y)),O()}var Y=window.wp.compose;const j=(0,Y.withState)()((e=>{let{setState:t}=e;const n=(0,l.__experimentalGetSettings)(),r=/a(?!\\)/i.test(n.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,a.createElement)(o.DateTimePicker,{currentDate:S(),onChange:e=>P(e,t),is12Hour:r})})),F=(0,Y.withState)()((e=>{let{setState:t}=e;const n=(0,l.__experimentalGetSettings)(),r=/a(?!\\)/i.test(n.formats.time.toLowerCase().replace(/\\\\/g,"").split("").reverse().join(""));return(0,a.createElement)(o.DateTimePicker,{currentDate:k(),onChange:e=>D(e,t),is12Hour:r})})),H=u()().format(y);let B=GatherPress.event_datetime.datetime_start,I=GatherPress.event_datetime.datetime_end;(0,f.subscribe)((function(){const e=wp.data.select("core/editor").isSavingPost(),t=wp.data.select("core/editor").isAutosavingPost();v()&&e&&!t&&E()({path:"/gatherpress/v1/event/datetime/",method:"POST",data:{post_id:GatherPress.post_id,datetime_start:u()(GatherPress.event_datetime.datetime_start).format("YYYY-MM-DD HH:mm:ss"),datetime_end:u()(GatherPress.event_datetime.datetime_end).format("YYYY-MM-DD HH:mm:ss"),_wpnonce:GatherPress.nonce}}).then((()=>{}))})),B=""!==B?u()(B).format(y):H,I=""!==I?u()(I).format(y):u()(H).add(2,"hours").format(y),GatherPress.event_datetime.datetime_start=B,GatherPress.event_datetime.datetime_end=I;const M=()=>(0,a.createElement)("section",null,(0,a.createElement)("h3",null,(0,s.__)("Date & time","gatherpress")),(0,a.createElement)(o.PanelRow,null,(0,a.createElement)("span",null,(0,s.__)("Start","gatherpress")),(0,a.createElement)(o.Dropdown,{position:"bottom left",renderToggle:e=>{let{isOpen:t,onToggle:n}=e;return(0,a.createElement)(o.Button,{onClick:n,"aria-expanded":t,isLink:!0},(0,a.createElement)(T,null))},renderContent:()=>(0,a.createElement)(j,null)})),(0,a.createElement)(o.PanelRow,null,(0,a.createElement)("span",null,(0,s.__)("End","gatherpress")),(0,a.createElement)(o.Dropdown,{position:"bottom left",renderToggle:e=>{let{isOpen:t,onToggle:n}=e;return(0,a.createElement)(o.Button,{onClick:n,"aria-expanded":t,isLink:!0},(0,a.createElement)(x,null))},renderContent:()=>(0,a.createElement)(F,null)})));var L=e=>{const{venue:t,setVenue:n}=e,r=(0,f.useDispatch)("core/editor").editPost,{unlockPostSaving:i}=(0,f.useDispatch)("core/editor"),l=(0,f.useSelect)((e=>e("core/editor").getEditedPostAttribute("_gp_venue"))),c=(0,f.useSelect)((e=>e("core").getEntityRecord("taxonomy","_gp_venue",l))),u=null==c?void 0:c.slug.replace("_venue_",""),m=l+":"+u;(0,a.useEffect)((()=>{var e;n(null!==(e=String(m))&&void 0!==e?e:""),b({setVenueId:u})}));let d=(0,f.useSelect)((e=>e("core").getEntityRecords("taxonomy","_gp_venue",{per_page:-1,context:"view"})),[t]);return d?(d=d.map((e=>({label:e.name,value:e.id+":"+e.slug.replace("_venue_","")}))),d.unshift({value:":",label:(0,s.__)("Choose a venue","gatherpress")})):d=[],(0,a.createElement)(o.PanelRow,null,(0,a.createElement)(o.Flex,null,(0,a.createElement)(o.FlexItem,null,(0,s.__)("Venue","gatherpress")),(0,a.createElement)(o.FlexItem,null,(0,a.createElement)(o.SelectControl,{label:(0,s.__)("Venue","gatherpress"),hideLabelFromVision:"true",value:t,onChange:e=>{(e=>{n(e);const t=""!==(e=e.split(":"))[0]?[e[0]]:[];r({_gp_venue:t}),b({setVenueId:e[1]}),i()})(e)},options:d,style:{width:"11rem"}}))))};(0,g.registerPlugin)("gp-event-settings",{render:()=>{const[e,t]=(0,a.useState)("");return v()&&(0,a.createElement)(h.PluginDocumentSettingPanel,{name:"gp-event-settings",title:(0,s.__)("Event settings","gatherpress"),initialOpen:!0,className:"gp-event-settings"},(0,a.createElement)(M,null),(0,a.createElement)("hr",null),(0,a.createElement)(L,{venue:e,setVenue:t}))},icon:""});var N=window.lodash,V=window.wp.coreData,R=e=>{var t,n;const{name:r,option:i,value:l}=e.attrs,[c,u]=(0,a.useState)(null!==(t=JSON.parse(l))&&void 0!==t?t:"[]"),{usersList:m}=(0,f.useSelect)((e=>{const{getEntityRecords:t}=e(V.store);return{usersList:t("root","user",{per_page:-1,context:"view"})}}),[c]),d=null!==(n=null==m?void 0:m.reduce(((e,t)=>({...e,[t.name]:t})),{}))&&void 0!==n?n:{};return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(o.FormTokenField,{key:i,label:(0,s.__)("Select Users","gatherpress"),name:r,value:c&&c.map((e=>({id:e.id,slug:e.slug,value:e.name||e.value}))),suggestions:Object.keys(d),onChange:e=>{if(e.some((e=>"string"==typeof e&&!d[e])))return;const t=e.map((e=>"string"==typeof e?d[e]:e));if((0,N.includes)(t,null))return!1;u(t)},maxSuggestions:20}),(0,a.createElement)("input",{type:"hidden",id:i,name:r,value:c&&JSON.stringify(c.map((e=>({id:e.id,slug:e.slug,value:e.name||e.value}))))}))};const U=document.querySelectorAll('[data-gp_component_name="user-select"]');for(let e=0;e<U.length;e++){const t=JSON.parse(U[e].dataset.gp_component_attrs);(0,a.render)((0,a.createElement)(R,{attrs:t}),U[e])}(0,r.registerBlockType)(p,{edit:function(e){let{attributes:t,setAttributes:n}=e;const{beginTime:r}=t,[l,c]=(0,a.useState)(!1),[u,p]=(0,a.useState)(r);return(0,a.createElement)("div",(0,i.useBlockProps)(),(0,a.createElement)(a.Fragment,null,(0,a.createElement)("p",null,u?d(r):(0,a.createElement)(m,null)),(0,a.createElement)(o.Button,{isLink:!0,onClick:()=>c(!l),isSecondary:!0},u?d(u):(0,s.__)("Set Start Date & Time","gb-blocks")),l&&(0,a.createElement)(o.Popover,{position:"bottom",onClose:c.bind(null,!1)},(0,a.createElement)(o.DateTimePicker,{label:(0,s.__)("Date/Time Picker","gatherpress"),currentDate:u,onChange:e=>{p(e),n({beginTime:e})},is12Hour:!0}))))},save:function(e){let{attributes:t}=e;const{beginTime:n}=t;return(0,a.createElement)("div",i.useBlockProps.save(),(0,a.createElement)("p",null,n?d(n):(0,s.__)("Start date not set","gb-blocks")))}})}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=function(t,n,a,s){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],s=e[u][2];for(var o=!0,l=0;l<n.length;l++)(!1&s||i>=s)&&Object.keys(r.O).every((function(e){return r.O[e](n[l])}))?n.splice(l--,1):(o=!1,s<i&&(i=s));if(o){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[n,a,s]},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={518:0,381:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,s,i=n[0],o=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(a in o)r.o(o,a)&&(r.m[a]=o[a]);if(l)var u=l(r)}for(t&&t(n);c<i.length;c++)s=i[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(u)},n=self.webpackChunkgatherpress=self.webpackChunkgatherpress||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var a=r.O(void 0,[381],(function(){return r(123)}));a=r.O(a)}();