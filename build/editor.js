!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.domReady,n=e.n(t),o=window.wp.data;n()((()=>{(0,o.select)("core/edit-post").isEditorSidebarOpened()?((0,o.dispatch)("core/edit-post").openGeneralSidebar("edit-post/document"),(0,o.dispatch)("core/edit-post").toggleEditorPanelOpened("gp-event-settings/gp-event-settings")):((0,o.dispatch)("core/edit-post").openGeneralSidebar(),(0,o.dispatch)("core/edit-post").toggleEditorPanelOpened("gp-event-settings/gp-event-settings"))}))}();