/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/attendance-selector/edit.js":
/*!************************************************!*\
  !*** ./src/blocks/attendance-selector/edit.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_AttendanceSelector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/AttendanceSelector */ "./src/components/AttendanceSelector.js");


/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */



const Edit = () => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(); // eslint-disable-next-line no-undef

  const postId = GatherPress.post_id; // eslint-disable-next-line no-undef

  const currentUser = GatherPress.current_user;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_AttendanceSelector__WEBPACK_IMPORTED_MODULE_2__["default"], {
    eventId: postId,
    currentUser: currentUser,
    type: 'upcoming'
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "./src/blocks/attendance-selector/index.js":
/*!*************************************************!*\
  !*** ./src/blocks/attendance-selector/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/attendance-selector/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/blocks/attendance-selector/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/attendance-selector/style.scss");
/**
 * WordPress dependencies.
 */

/**
 * Internal dependencies.
 */




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: () => null
});

/***/ }),

/***/ "./src/components/AttendanceSelector.js":
/*!**********************************************!*\
  !*** ./src/components/AttendanceSelector.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'react-modal'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_broadcasting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/broadcasting */ "./src/helpers/broadcasting.js");
/* harmony import */ var _AttendeeResponse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AttendeeResponse */ "./src/components/AttendeeResponse.js");


/**
 * External dependencies
 */

/**
 * WordPress dependencies.
 */





/**
 * Internal Dependencies.
 */




const AttendanceSelector = _ref => {
  let {
    eventId,
    currentUser = '',
    type
  } = _ref;
  const [attendanceStatus, setAttendanceStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(currentUser.status);
  const [attendanceGuests, setAttendanceGuests] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(currentUser.guests);
  const [selectorHidden, setSelectorHidden] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('hidden');
  const [selectorExpanded, setSelectorExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('false');
  const [modalIsOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const openModal = e => {
    e.preventDefault();

    if ('not_attending' === attendanceStatus || 'attend' === attendanceStatus) {
      onAnchorClick(e, 'attending', 0, false);
    }

    setIsOpen(true);
  }; // No need to show block if event is in the past.


  if ('past' === type) {
    return '';
  } // Might be better way to do this, but should only run on frontend, not admin.


  if ('undefined' === typeof adminpage) {
    Object(function webpackMissingModule() { var e = new Error("Cannot find module 'react-modal'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('.gp-enabled');
  }

  const closeModal = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  const onAnchorClick = async function (e, status) {
    let guests = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let close = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    e.preventDefault();

    if ('attending' !== status) {
      guests = 0;
    }

    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: '/gatherpress/v1/event/attendance',
      method: 'POST',
      data: {
        post_id: eventId,
        status,
        guests,
        // eslint-disable-next-line no-undef
        _wpnonce: GatherPress.nonce
      }
    }).then(res => {
      if (res.success) {
        setAttendanceStatus(res.status);
        setAttendanceGuests(res.guests);
        const count = {
          all: 0,
          attending: 0,
          not_attending: 0,
          // eslint-disable-line camelcase
          waiting_list: 0 // eslint-disable-line camelcase

        };

        for (const [key, value] of Object.entries(res.attendees)) {
          count[key] = value.count;
        }

        const payload = {
          setAttendanceStatus: res.status,
          setAttendanceList: res.attendees,
          setAttendanceCount: count
        };
        (0,_helpers_broadcasting__WEBPACK_IMPORTED_MODULE_5__.Broadcaster)(payload, res.event_id);

        if (close) {
          closeModal(e);
        }
      }
    });
  };

  const getButtonText = status => {
    switch (status) {
      case 'attending':
      case 'waiting_list':
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit RSVP', 'gatherpress');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Attend', 'gatherpress');
  };

  const onSpanKeyDown = e => {
    if (13 === e.keyCode) {
      setSelectorHidden('hidden' === selectorHidden ? 'show' : 'hidden');
      setSelectorExpanded('false' === selectorExpanded ? 'true' : 'false');
    }
  }; // @todo need to revisit this and handle button for users that aren't logged in.
  // Clean up so this does something... See issue #68 in GitHub.


  if ('' === currentUser) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "gp-attendance-selector"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wp-block-button"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "wp-block-button__link",
      href: "#",
      onClick: e => onAnchorClick(e, 'attending')
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Attend', 'gatherpress'))));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-attendance-selector"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    className: "gp-buttons wp-block-buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-buttons__container  wp-block-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    className: "gp-buttons__button wp-block-button__link",
    "aria-expanded": selectorExpanded,
    tabIndex: "0",
    onKeyDown: onSpanKeyDown,
    onClick: e => openModal(e)
  }, getButtonText(attendanceStatus))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'react-modal'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    style: customStyles,
    contentLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit RSVP', 'gatherpress')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-modal gp-modal__attendance-selector"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-modal__header has-large-font-size"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit RSVP', 'gatherpress')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-modal__content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "gp-guests"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Number of guests?', 'gatherpress')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "gp-guests",
    type: "number",
    min: "0",
    max: "5",
    onChange: e => onAnchorClick(e, 'attending', e.target.value, false),
    defaultValue: attendanceGuests
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    className: "gp-buttons wp-block-buttons"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-buttons__container wp-block-button is-style-outline has-small-font-size"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    onClick: e => onAnchorClick(e, 'not_attending'),
    className: "gp-buttons__button wp-block-button__link"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not Attending', 'gatherpress'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-buttons__container wp-block-button has-small-font-size"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    onClick: closeModal,
    className: "gp-buttons__button wp-block-button__link"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'gatherpress'))))))), 'attend' !== attendanceStatus && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-status"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AttendeeResponse__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: type,
    status: attendanceStatus
  }), 0 < attendanceGuests && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-status__guests"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "+", attendanceGuests, ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('guest(s)', 'gatherpress')))));
};

/* harmony default export */ __webpack_exports__["default"] = (AttendanceSelector);

/***/ }),

/***/ "./src/components/AttendeeResponse.js":
/*!********************************************!*\
  !*** ./src/components/AttendeeResponse.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



const AttendeeResponse = _ref => {
  let {
    type = 'upcoming',
    status = 'attend'
  } = _ref;
  const responses = {
    upcoming: {
      attend: {
        icon: '',
        text: ''
      },
      attending: {
        icon: 'dashicons dashicons-yes-alt',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Attending', 'gatherpress')
      },
      waiting_list: {
        icon: 'dashicons dashicons-editor-help',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Waiting List', 'gatherpress')
      },
      not_attending: {
        icon: 'dashicons dashicons-dismiss',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Not Attending', 'gatherpress')
      }
    },
    past: {
      attending: {
        icon: 'dashicons dashicons-yes-alt',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Went', 'gatherpress')
      },
      attend: {
        icon: 'dashicons dashicons-dismiss',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Didn't Go", 'gatherpress')
      },
      waiting_list: {
        icon: 'dashicons dashicons-dismiss',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Didn't Go", 'gatherpress')
      },
      not_attending: {
        icon: 'dashicons dashicons-dismiss',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Didn't Go", 'gatherpress')
      }
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gp-status__response"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: responses[type][status].icon
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, responses[type][status].text));
};

/* harmony default export */ __webpack_exports__["default"] = (AttendeeResponse);

/***/ }),

/***/ "./src/helpers/broadcasting.js":
/*!*************************************!*\
  !*** ./src/helpers/broadcasting.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Broadcaster": function() { return /* binding */ Broadcaster; },
/* harmony export */   "Listener": function() { return /* binding */ Listener; }
/* harmony export */ });
const Broadcaster = function (payload) {
  let identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  for (const [key, value] of Object.entries(payload)) {
    let type = key;

    if (identifier) {
      type += identifier;
    }

    const dispatcher = new CustomEvent(type, {
      detail: value
    });
    dispatchEvent(dispatcher);
  }
};
const Listener = function (payload) {
  let identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  for (const [key, value] of Object.entries(payload)) {
    let type = key;

    if (identifier) {
      type += identifier;
    }

    addEventListener(type, e => {
      value(e.detail);
    }, false);
  }
};

/***/ }),

/***/ "./src/blocks/attendance-selector/style.scss":
/*!***************************************************!*\
  !*** ./src/blocks/attendance-selector/style.scss ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/attendance-selector/block.json":
/*!***************************************************!*\
  !*** ./src/blocks/attendance-selector/block.json ***!
  \***************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gatherpress/attendance-selector","version":"0.1.1","title":"Attendance Selector","category":"gatherpress","icon":"groups","example":{},"description":"The block with attendance selector.","attributes":{"content":{"type":"string"},"color":{"type":"string"}},"supports":{"html":false},"textdomain":"gatherpress","editorScript":"file:./index.js","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/attendance-selector/index": 0,
/******/ 			"blocks/attendance-selector/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgatherpress"] = self["webpackChunkgatherpress"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/attendance-selector/style-index"], function() { return __webpack_require__("./src/blocks/attendance-selector/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map