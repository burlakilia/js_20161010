/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _menu = __webpack_require__(1);
	
	var _form = __webpack_require__(3);
	
	var _note = __webpack_require__(5);
	
	var _appXml = __webpack_require__(7);
	
	var _appXml2 = _interopRequireDefault(_appXml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var menuData = {
	    list: [{
	        title: 'Все заметки',
	        name: 'all'
	    }, {
	        title: 'Текст',
	        name: 'text'
	    }]
	};
	
	var notesData = [{
	    type: 'text',
	    text: '1234',
	    color: 'yellow',
	    tags: ['text', 'all']
	}, {
	    type: 'text',
	    text: '2345',
	    color: 'yellow',
	    tags: ['text']
	}];
	
	var App = function () {
	    function App(node) {
	        var _this = this;
	
	        _classCallCheck(this, App);
	
	        this.node = node;
	        this.render();
	
	        this.menu = new _menu.Menu(document.querySelector('.js-menu'), menuData);
	        this.form = new _form.Form(document.querySelector('.js-menu-form'));
	        this.notes = [];
	
	        this.form.node.addEventListener('add-new', function (event) {
	            _this.menu.add(event.detail);
	        });
	
	        this.renderNotes(notesData);
	
	        this.setRoute(location.hash.replace('#', ''));
	    }
	
	    _createClass(App, [{
	        key: 'setRoute',
	        value: function setRoute(route) {
	            this.menu.toggleActive(route);
	
	            if (route) {
	                this.notesFilter(route);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.node.innerHTML = (0, _appXml2.default)();
	        }
	    }, {
	        key: 'renderNotes',
	        value: function renderNotes(data) {
	            var _this2 = this;
	
	            document.querySelector('.js-notes').innerHTML = '';
	            data.forEach(function (item, index) {
	                return _this2.addNote(item, index);
	            });
	        }
	    }, {
	        key: 'addNote',
	        value: function addNote(item, id) {
	            var div = document.createElement('div');
	            var note = new _note.Note(div, item, id);
	
	            this.notes.push(note);
	            var nodeNote = this.node.querySelector('.js-notes').appendChild(div);
	
	            nodeNote.querySelector('.js-close').addEventListener('click', this.delNote.bind(this));
	
	            nodeNote.querySelector('.js-add-new').addEventListener('click', this.newNote.bind(this));
	        }
	    }, {
	        key: 'delNote',
	        value: function delNote(event) {
	            var nodeNote = event.target.parentNode;
	            var delNoteId = nodeNote.dataset.id;
	            notesData.splice(delNoteId, 1);
	            nodeNote.remove();
	        }
	    }, {
	        key: 'newNote',
	        value: function newNote() {
	            var tags = ['all'];
	            console.log(location);
	            var pageLocation = '' || location.hash.replace('#', '');
	            tags = pageLocation ? tags.push(pageLocation) : tags;
	            var newNoteData = {
	                type: 'text',
	                //text: '1234',
	                color: 'yellow',
	                tags: tags
	            };
	
	            notesData.push(newNoteData);
	            this.renderNotes(notesData);
	        }
	    }, {
	        key: 'notesFilter',
	        value: function notesFilter(route) {
	            var filterData = notesData.filter(function (note) {
	                return note.tags.indexOf(route) !== -1;
	            });
	
	            this.renderNotes(filterData);
	        }
	    }]);
	
	    return App;
	}();
	
	document.addEventListener('DOMContentLoaded', function () {
	    var app = new App(document.body);
	
	    window.addEventListener('hashchange', function () {
	        app.setRoute(location.hash.replace('#', ''));
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Menu = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _menuXml = __webpack_require__(2);
	
	var _menuXml2 = _interopRequireDefault(_menuXml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Menu = function () {
	    function Menu(node, data) {
	        _classCallCheck(this, Menu);
	
	        this.data = JSON.parse(JSON.stringify(data));
	
	        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == 'object') {
	            this.node = this.render(node, data);
	        } else {
	            this.node = node;
	        }
	
	        //this.title = this.node.querySelector('.js-title');
	        //this.title.addEventListener('click', this.toggle.bind(this));
	    }
	
	    _createClass(Menu, [{
	        key: 'render',
	        value: function render(node, data) {
	            node.innerHTML = (0, _menuXml2.default)(data);
	            return node;
	        }
	
	        /**
	         * Добавлеят новый item в меню
	         * @param {Object} item - описанием пункта меню
	         * @param {string} item.title
	         * @param {string} item.name
	         */
	
	    }, {
	        key: 'add',
	        value: function add(item) {
	            this.data.list.push(item);
	            this.render(this.node, this.data);
	        }
	
	        /**
	         * Метод переключает активный пункт меню
	         * @param {string} name - имя активного пункта меню
	         */
	
	    }, {
	        key: 'toggleActive',
	        value: function toggleActive(name) {
	            var links = [].slice.call(this.node.querySelectorAll('.menu__link'));
	
	            links.forEach(function (link) {
	                link.classList.remove('menu__link_active');
	            });
	
	            var active = this.node.querySelector('.menu__link.js-' + name);
	
	            if (active) {
	                active.classList.add('menu__link_active');
	            }
	        }
	    }]);
	
	    return Menu;
	}();
	
	exports.Menu = Menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (__fest_context) {
		"use strict";
		var __fest_self = this,
		    __fest_buf = "",
		    __fest_chunks = [],
		    __fest_chunk,
		    __fest_attrs = [],
		    __fest_select,
		    __fest_if,
		    __fest_iterator,
		    __fest_to,
		    __fest_fn,
		    __fest_html = "",
		    __fest_blocks = {},
		    __fest_params,
		    __fest_element,
		    __fest_debug_file = "",
		    __fest_debug_line = "",
		    __fest_debug_block = "",
		    __fest_element_stack = [],
		    __fest_short_tags = { "area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true },
		    __fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,
		    __fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,
		    __fest_htmlchars = /[&<>"]/g,
		    __fest_htmlchars_test = /[&<>"]/,
		    __fest_jshash = { "\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E" },
		    __fest_htmlhash = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" },
		    __fest_escapeJS = function __fest_escapeJS(value) {
			if (typeof value === 'string') {
				if (__fest_jschars_test.test(value)) {
					return value.replace(__fest_jschars, __fest_replaceJS);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceJS = function __fest_replaceJS(chr) {
			return __fest_jshash[chr];
		},
		    __fest_escapeHTML = function __fest_escapeHTML(value) {
			if (typeof value === 'string') {
				if (__fest_htmlchars_test.test(value)) {
					return value.replace(__fest_htmlchars, __fest_replaceHTML);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceHTML = function __fest_replaceHTML(chr) {
			return __fest_htmlhash[chr];
		},
		    __fest_extend = function __fest_extend(dest, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		},
		    __fest_param = function __fest_param(fn) {
			fn.param = true;
			return fn;
		},
		    i18n = __fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {
			return str;
		},
		    ___fest_log_error;if (typeof __fest_error === "undefined") {
			___fest_log_error = typeof console !== "undefined" && console.error ? function () {
				return Function.prototype.apply.call(console.error, console, arguments);
			} : function () {};
		} else {
			___fest_log_error = __fest_error;
		};function __fest_log_error(msg) {
			___fest_log_error(msg + "\nin block \"" + __fest_debug_block + "\" at line: " + __fest_debug_line + "\nfile: " + __fest_debug_file);
		}function __fest_call(fn, params, cp) {
			if (cp) for (var i in params) {
				if (typeof params[i] == "function" && params[i].param) params[i] = params[i]();
			}return fn.call(__fest_self, params);
		}var json = __fest_context;__fest_buf += "<div class=\"menu\"><ul class=\"menu__list\">";var i, item, __fest_iterator0;try {
			__fest_iterator0 = json.list || {};
		} catch (e) {
			__fest_iterator = {};__fest_log_error(e.message);
		}for (i in __fest_iterator0) {
			item = __fest_iterator0[i];__fest_buf += "<li class=\"menu__item\">";try {
				__fest_attrs[0] = __fest_escapeHTML(item.name);
			} catch (e) {
				__fest_attrs[0] = "";__fest_log_error(e.message);
			}try {
				__fest_attrs[1] = __fest_escapeHTML(item.name);
			} catch (e) {
				__fest_attrs[1] = "";__fest_log_error(e.message);
			}__fest_buf += "<a class=\"menu__link js-" + __fest_attrs[0] + "\" href=\"#" + __fest_attrs[1] + "\">";try {
				__fest_buf += __fest_escapeHTML(item.title);
			} catch (e) {
				__fest_log_error(e.message + "6");
			}__fest_buf += "</a></li>";
		}__fest_buf += "</ul></div>";__fest_to = __fest_chunks.length;if (__fest_to) {
			__fest_iterator = 0;for (; __fest_iterator < __fest_to; __fest_iterator++) {
				__fest_chunk = __fest_chunks[__fest_iterator];if (typeof __fest_chunk === "string") {
					__fest_html += __fest_chunk;
				} else {
					__fest_fn = __fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html += __fest_call(__fest_fn, __fest_chunk.params, __fest_chunk.cp);
				}
			}return __fest_html + __fest_buf;
		} else {
			return __fest_buf;
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Form = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import fest.form
	
	
	var _formXml = __webpack_require__(4);
	
	var _formXml2 = _interopRequireDefault(_formXml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//Если с английского на русский, то передаём вторым параметром true.
	var transliterate = function () {
	    var rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
	        eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
	    return function (text, engToRus) {
	        var x;
	        for (x = 0; x < rus.length; x++) {
	            text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
	            text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
	        }
	        return text;
	    };
	}();
	
	var Form = function () {
	    function Form(node, menu) {
	        _classCallCheck(this, Form);
	
	        this.menu = menu;
	        this.node = this.render(node);
	
	        this.form = this.node.querySelector('.js-form');
	        this.form.addEventListener('submit', this.onSubmit.bind(this));
	    }
	
	    _createClass(Form, [{
	        key: "render",
	        value: function render(node) {
	            node.innerHTML = (0, _formXml2.default)();
	            return node;
	        }
	    }, {
	        key: "onSubmit",
	        value: function onSubmit(event) {
	            event.preventDefault();
	
	            this.node.dispatchEvent(new CustomEvent('add-new', {
	                detail: {
	                    title: this.form.elements.title.value,
	                    name: transliterate(this.form.elements.title.value).toLowerCase()
	                },
	                bubbles: true,
	                cancelable: true
	            }));
	        }
	    }]);
	
	    return Form;
	}();
	
	exports.Form = Form;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (__fest_context) {
		"use strict";
		var __fest_self = this,
		    __fest_buf = "",
		    __fest_chunks = [],
		    __fest_chunk,
		    __fest_attrs = [],
		    __fest_select,
		    __fest_if,
		    __fest_iterator,
		    __fest_to,
		    __fest_fn,
		    __fest_html = "",
		    __fest_blocks = {},
		    __fest_params,
		    __fest_element,
		    __fest_debug_file = "",
		    __fest_debug_line = "",
		    __fest_debug_block = "",
		    __fest_element_stack = [],
		    __fest_short_tags = { "area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true },
		    __fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,
		    __fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,
		    __fest_htmlchars = /[&<>"]/g,
		    __fest_htmlchars_test = /[&<>"]/,
		    __fest_jshash = { "\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E" },
		    __fest_htmlhash = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" },
		    __fest_escapeJS = function __fest_escapeJS(value) {
			if (typeof value === 'string') {
				if (__fest_jschars_test.test(value)) {
					return value.replace(__fest_jschars, __fest_replaceJS);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceJS = function __fest_replaceJS(chr) {
			return __fest_jshash[chr];
		},
		    __fest_escapeHTML = function __fest_escapeHTML(value) {
			if (typeof value === 'string') {
				if (__fest_htmlchars_test.test(value)) {
					return value.replace(__fest_htmlchars, __fest_replaceHTML);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceHTML = function __fest_replaceHTML(chr) {
			return __fest_htmlhash[chr];
		},
		    __fest_extend = function __fest_extend(dest, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		},
		    __fest_param = function __fest_param(fn) {
			fn.param = true;
			return fn;
		},
		    i18n = __fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {
			return str;
		},
		    ___fest_log_error;if (typeof __fest_error === "undefined") {
			___fest_log_error = typeof console !== "undefined" && console.error ? function () {
				return Function.prototype.apply.call(console.error, console, arguments);
			} : function () {};
		} else {
			___fest_log_error = __fest_error;
		};function __fest_log_error(msg) {
			___fest_log_error(msg + "\nin block \"" + __fest_debug_block + "\" at line: " + __fest_debug_line + "\nfile: " + __fest_debug_file);
		}function __fest_call(fn, params, cp) {
			if (cp) for (var i in params) {
				if (typeof params[i] == "function" && params[i].param) params[i] = params[i]();
			}return fn.call(__fest_self, params);
		}__fest_buf += "<form class=\"form js-form\"><input type=\"text\" placeholder=\"Новая категория\" class=\"form__input\" name=\"title\"/></form>";__fest_to = __fest_chunks.length;if (__fest_to) {
			__fest_iterator = 0;for (; __fest_iterator < __fest_to; __fest_iterator++) {
				__fest_chunk = __fest_chunks[__fest_iterator];if (typeof __fest_chunk === "string") {
					__fest_html += __fest_chunk;
				} else {
					__fest_fn = __fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html += __fest_call(__fest_fn, __fest_chunk.params, __fest_chunk.cp);
				}
			}return __fest_html + __fest_buf;
		} else {
			return __fest_buf;
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Note = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _noteXml = __webpack_require__(6);
	
	var _noteXml2 = _interopRequireDefault(_noteXml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Note = function () {
	    function Note(node, data, id) {
	        _classCallCheck(this, Note);
	
	        this.node = node;
	        this.data = data;
	        this.id = id;
	        this.render();
	    }
	
	    _createClass(Note, [{
	        key: 'render',
	        value: function render() {
	            this.data.id = this.id;
	            this.node.innerHTML = (0, _noteXml2.default)(this.data);
	        }
	    }]);
	
	    return Note;
	}();
	
	exports.Note = Note;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (__fest_context) {
		"use strict";
		var __fest_self = this,
		    __fest_buf = "",
		    __fest_chunks = [],
		    __fest_chunk,
		    __fest_attrs = [],
		    __fest_select,
		    __fest_if,
		    __fest_iterator,
		    __fest_to,
		    __fest_fn,
		    __fest_html = "",
		    __fest_blocks = {},
		    __fest_params,
		    __fest_element,
		    __fest_debug_file = "",
		    __fest_debug_line = "",
		    __fest_debug_block = "",
		    __fest_element_stack = [],
		    __fest_short_tags = { "area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true },
		    __fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,
		    __fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,
		    __fest_htmlchars = /[&<>"]/g,
		    __fest_htmlchars_test = /[&<>"]/,
		    __fest_jshash = { "\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E" },
		    __fest_htmlhash = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" },
		    __fest_escapeJS = function __fest_escapeJS(value) {
			if (typeof value === 'string') {
				if (__fest_jschars_test.test(value)) {
					return value.replace(__fest_jschars, __fest_replaceJS);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceJS = function __fest_replaceJS(chr) {
			return __fest_jshash[chr];
		},
		    __fest_escapeHTML = function __fest_escapeHTML(value) {
			if (typeof value === 'string') {
				if (__fest_htmlchars_test.test(value)) {
					return value.replace(__fest_htmlchars, __fest_replaceHTML);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceHTML = function __fest_replaceHTML(chr) {
			return __fest_htmlhash[chr];
		},
		    __fest_extend = function __fest_extend(dest, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		},
		    __fest_param = function __fest_param(fn) {
			fn.param = true;
			return fn;
		},
		    i18n = __fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {
			return str;
		},
		    ___fest_log_error;if (typeof __fest_error === "undefined") {
			___fest_log_error = typeof console !== "undefined" && console.error ? function () {
				return Function.prototype.apply.call(console.error, console, arguments);
			} : function () {};
		} else {
			___fest_log_error = __fest_error;
		};function __fest_log_error(msg) {
			___fest_log_error(msg + "\nin block \"" + __fest_debug_block + "\" at line: " + __fest_debug_line + "\nfile: " + __fest_debug_file);
		}function __fest_call(fn, params, cp) {
			if (cp) for (var i in params) {
				if (typeof params[i] == "function" && params[i].param) params[i] = params[i]();
			}return fn.call(__fest_self, params);
		}var json = __fest_context;try {
			__fest_attrs[0] = __fest_escapeHTML(json.color);
		} catch (e) {
			__fest_attrs[0] = "";__fest_log_error(e.message);
		}try {
			__fest_attrs[1] = __fest_escapeHTML(json.id);
		} catch (e) {
			__fest_attrs[1] = "";__fest_log_error(e.message);
		}__fest_buf += "<div class=\"note note_" + __fest_attrs[0] + "\" data-id=\"" + __fest_attrs[1] + "\"><img class=\"note__close js-close\" src=\"img\/ico_close.svg\"/><textarea class=\"note__text\" placeholder=\"Введите текст заметки\" rows=\"6\" maxlength=\"119\">";try {
			__fest_buf += __fest_escapeHTML(json.text);
		} catch (e) {
			__fest_log_error(e.message + "4");
		}__fest_buf += "</textarea><div class=\"note__footer\"><img class=\"note__button note__button_color js-set-color\" src=\"img\/ico_color.svg\"/><img class=\"note__button note__button_add-new js-add-new\" src=\"img\/ico_add.svg\"/><img class=\"note__button note__button_link js-get-link\" src=\"img\/ico_link.svg\"/><img class=\"note__button note__button_save js-save\" src=\"img\/ico_save.svg\"/></div></div>";__fest_to = __fest_chunks.length;if (__fest_to) {
			__fest_iterator = 0;for (; __fest_iterator < __fest_to; __fest_iterator++) {
				__fest_chunk = __fest_chunks[__fest_iterator];if (typeof __fest_chunk === "string") {
					__fest_html += __fest_chunk;
				} else {
					__fest_fn = __fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html += __fest_call(__fest_fn, __fest_chunk.params, __fest_chunk.cp);
				}
			}return __fest_html + __fest_buf;
		} else {
			return __fest_buf;
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (__fest_context) {
		"use strict";
		var __fest_self = this,
		    __fest_buf = "",
		    __fest_chunks = [],
		    __fest_chunk,
		    __fest_attrs = [],
		    __fest_select,
		    __fest_if,
		    __fest_iterator,
		    __fest_to,
		    __fest_fn,
		    __fest_html = "",
		    __fest_blocks = {},
		    __fest_params,
		    __fest_element,
		    __fest_debug_file = "",
		    __fest_debug_line = "",
		    __fest_debug_block = "",
		    __fest_element_stack = [],
		    __fest_short_tags = { "area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true },
		    __fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,
		    __fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,
		    __fest_htmlchars = /[&<>"]/g,
		    __fest_htmlchars_test = /[&<>"]/,
		    __fest_jshash = { "\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E" },
		    __fest_htmlhash = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" },
		    __fest_escapeJS = function __fest_escapeJS(value) {
			if (typeof value === 'string') {
				if (__fest_jschars_test.test(value)) {
					return value.replace(__fest_jschars, __fest_replaceJS);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceJS = function __fest_replaceJS(chr) {
			return __fest_jshash[chr];
		},
		    __fest_escapeHTML = function __fest_escapeHTML(value) {
			if (typeof value === 'string') {
				if (__fest_htmlchars_test.test(value)) {
					return value.replace(__fest_htmlchars, __fest_replaceHTML);
				}
			}
	
			return value == null ? '' : value;
		},
		    __fest_replaceHTML = function __fest_replaceHTML(chr) {
			return __fest_htmlhash[chr];
		},
		    __fest_extend = function __fest_extend(dest, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		},
		    __fest_param = function __fest_param(fn) {
			fn.param = true;
			return fn;
		},
		    i18n = __fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {
			return str;
		},
		    ___fest_log_error;if (typeof __fest_error === "undefined") {
			___fest_log_error = typeof console !== "undefined" && console.error ? function () {
				return Function.prototype.apply.call(console.error, console, arguments);
			} : function () {};
		} else {
			___fest_log_error = __fest_error;
		};function __fest_log_error(msg) {
			___fest_log_error(msg + "\nin block \"" + __fest_debug_block + "\" at line: " + __fest_debug_line + "\nfile: " + __fest_debug_file);
		}function __fest_call(fn, params, cp) {
			if (cp) for (var i in params) {
				if (typeof params[i] == "function" && params[i].param) params[i] = params[i]();
			}return fn.call(__fest_self, params);
		}var json = __fest_context;__fest_buf += "<div class=\"app\"><div class=\"app__sidebar\"><div class=\"app__logo\"><img class=\"app__title\" src=\"img\/logo_text.svg\"/><img class=\"app__icon\" src=\"img\/logo_mark.svg\"/></div><hr class=\"app__hr\"/><div class=\"app__menu js-menu\"></div><div class=\"app__form js-menu-form\"></div><hr class=\"app__hr\"/></div><div class=\"app__notes js-notes\"></div></div>";__fest_to = __fest_chunks.length;if (__fest_to) {
			__fest_iterator = 0;for (; __fest_iterator < __fest_to; __fest_iterator++) {
				__fest_chunk = __fest_chunks[__fest_iterator];if (typeof __fest_chunk === "string") {
					__fest_html += __fest_chunk;
				} else {
					__fest_fn = __fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html += __fest_call(__fest_fn, __fest_chunk.params, __fest_chunk.cp);
				}
			}return __fest_html + __fest_buf;
		} else {
			return __fest_buf;
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWRmZjRlMjk1MjBkYzIyNWQxMmYiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL21lbnUvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sIm5hbWVzIjpbIm1lbnVEYXRhIiwibGlzdCIsInRpdGxlIiwibmFtZSIsIm5vdGVzRGF0YSIsInR5cGUiLCJ0ZXh0IiwiY29sb3IiLCJ0YWdzIiwiQXBwIiwibm9kZSIsInJlbmRlciIsIm1lbnUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtIiwibm90ZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkIiwiZXZlbnQiLCJkZXRhaWwiLCJyZW5kZXJOb3RlcyIsInNldFJvdXRlIiwibG9jYXRpb24iLCJoYXNoIiwicmVwbGFjZSIsInJvdXRlIiwidG9nZ2xlQWN0aXZlIiwibm90ZXNGaWx0ZXIiLCJpbm5lckhUTUwiLCJkYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFkZE5vdGUiLCJpZCIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJub3RlIiwicHVzaCIsIm5vZGVOb3RlIiwiYXBwZW5kQ2hpbGQiLCJkZWxOb3RlIiwiYmluZCIsIm5ld05vdGUiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwiZGVsTm90ZUlkIiwiZGF0YXNldCIsInNwbGljZSIsInJlbW92ZSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlTG9jYXRpb24iLCJuZXdOb3RlRGF0YSIsImZpbHRlckRhdGEiLCJmaWx0ZXIiLCJpbmRleE9mIiwiYXBwIiwiYm9keSIsIndpbmRvdyIsIk1lbnUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJsaW5rcyIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaW5rIiwiY2xhc3NMaXN0IiwiYWN0aXZlIiwiX19mZXN0X2NvbnRleHQiLCJfX2Zlc3Rfc2VsZiIsIl9fZmVzdF9idWYiLCJfX2Zlc3RfY2h1bmtzIiwiX19mZXN0X2NodW5rIiwiX19mZXN0X2F0dHJzIiwiX19mZXN0X3NlbGVjdCIsIl9fZmVzdF9pZiIsIl9fZmVzdF9pdGVyYXRvciIsIl9fZmVzdF90byIsIl9fZmVzdF9mbiIsIl9fZmVzdF9odG1sIiwiX19mZXN0X2Jsb2NrcyIsIl9fZmVzdF9wYXJhbXMiLCJfX2Zlc3RfZWxlbWVudCIsIl9fZmVzdF9kZWJ1Z19maWxlIiwiX19mZXN0X2RlYnVnX2xpbmUiLCJfX2Zlc3RfZGVidWdfYmxvY2siLCJfX2Zlc3RfZWxlbWVudF9zdGFjayIsIl9fZmVzdF9zaG9ydF90YWdzIiwiX19mZXN0X2pzY2hhcnMiLCJfX2Zlc3RfanNjaGFyc190ZXN0IiwiX19mZXN0X2h0bWxjaGFycyIsIl9fZmVzdF9odG1sY2hhcnNfdGVzdCIsIl9fZmVzdF9qc2hhc2giLCJfX2Zlc3RfaHRtbGhhc2giLCJfX2Zlc3RfZXNjYXBlSlMiLCJ2YWx1ZSIsInRlc3QiLCJfX2Zlc3RfcmVwbGFjZUpTIiwiY2hyIiwiX19mZXN0X2VzY2FwZUhUTUwiLCJfX2Zlc3RfcmVwbGFjZUhUTUwiLCJfX2Zlc3RfZXh0ZW5kIiwiZGVzdCIsInNyYyIsImtleSIsImhhc093blByb3BlcnR5IiwiX19mZXN0X3BhcmFtIiwiZm4iLCJwYXJhbSIsImkxOG4iLCJzdHIiLCJfX19mZXN0X2xvZ19lcnJvciIsIl9fZmVzdF9lcnJvciIsImVycm9yIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9fZmVzdF9sb2dfZXJyb3IiLCJtc2ciLCJfX2Zlc3RfY2FsbCIsInBhcmFtcyIsImNwIiwiaSIsImpzb24iLCJfX2Zlc3RfaXRlcmF0b3IwIiwiZSIsIm1lc3NhZ2UiLCJsZW5ndGgiLCJ0cmFuc2xpdGVyYXRlIiwicnVzIiwic3BsaXQiLCJlbmciLCJlbmdUb1J1cyIsIngiLCJqb2luIiwidG9VcHBlckNhc2UiLCJGb3JtIiwib25TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnRzIiwidG9Mb3dlckNhc2UiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsIk5vdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFSSxLQUFJQSxXQUFXO0FBQ1hDLFdBQU0sQ0FDRjtBQUNJQyxnQkFBTyxhQURYO0FBRUlDLGVBQU07QUFGVixNQURFLEVBS0Y7QUFDSUQsZ0JBQU8sT0FEWDtBQUVJQyxlQUFNO0FBRlYsTUFMRTtBQURLLEVBQWY7O0FBYUEsS0FBSUMsWUFBWSxDQUNaO0FBQ0lDLFdBQU0sTUFEVjtBQUVJQyxXQUFNLE1BRlY7QUFHSUMsWUFBTyxRQUhYO0FBSUlDLFdBQU0sQ0FBQyxNQUFELEVBQVMsS0FBVDtBQUpWLEVBRFksRUFPWjtBQUNJSCxXQUFNLE1BRFY7QUFFSUMsV0FBTSxNQUZWO0FBR0lDLFlBQU8sUUFIWDtBQUlJQyxXQUFNLENBQUMsTUFBRDtBQUpWLEVBUFksQ0FBaEI7O0tBZU1DLEc7QUFFRixrQkFBYUMsSUFBYixFQUFtQjtBQUFBOztBQUFBOztBQUNmLGNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLGNB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QUFDTyxvQkFBYVAsWUFBYjtBQUEyQixLQUFoRSxNQUFzRTtBQUFDTSxpQkFBVUUsY0FBY1IsYUFBYXpFLElBQTNCLENBQVYsQ0FBMkMsSUFBSStFLFNBQUosRUFBZUMsZUFBYXlDLFlBQVkxQyxTQUFaLEVBQXNCTixhQUFhaUQsTUFBbkMsRUFBMENqRCxhQUFha0QsRUFBdkQsQ0FBYjtBQUF5RTtBQUFDLFdBQU8zQyxjQUFZVCxVQUFuQjtBQUErQixHQUE5VyxNQUFvWDtBQUFDLFVBQU9BLFVBQVA7QUFBbUI7QUFBQyxFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFkZmY0ZTI5NTIwZGMyMjVkMTJmIiwiaW1wb3J0IHsgTWVudSB9IGZyb20gJy4uL21lbnUvbWVudS5qcyc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtL2Zvcm0uanMnO1xyXG5pbXBvcnQgeyBOb3RlIH0gZnJvbSAnLi4vbm90ZS9ub3RlLmpzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vYXBwLnhtbC5qcyc7XHJcblxyXG4gICAgbGV0IG1lbnVEYXRhID0ge1xyXG4gICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQktGB0LUg0LfQsNC80LXRgtC60LgnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2FsbCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQotC10LrRgdGCJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXh0J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgbm90ZXNEYXRhID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnMTIzNCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgdGFnczogWyd0ZXh0JywgJ2FsbCddXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgdGV4dDogJzIzNDUnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3llbGxvdycsXHJcbiAgICAgICAgICAgIHRhZ3M6IFsndGV4dCddXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjbGFzcyBBcHAge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51ID0gbmV3IE1lbnUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1lbnUnKSwgbWVudURhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudS1mb3JtJykpO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGVzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvcm0ubm9kZS5hZGRFdmVudExpc3RlbmVyKCdhZGQtbmV3JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmFkZChldmVudC5kZXRhaWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTm90ZXMobm90ZXNEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um91dGUobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFJvdXRlIChyb3V0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUudG9nZ2xlQWN0aXZlKHJvdXRlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Rlc0ZpbHRlcihyb3V0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZW5kZXJOb3RlcyAoZGF0YSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbm90ZXMnKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCAoaXRlbSwgaW5kZXgpID0+IHRoaXMuYWRkTm90ZShpdGVtLCBpbmRleCkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZE5vdGUgKGl0ZW0sIGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSBuZXcgTm90ZShkaXYsIGl0ZW0sIGlkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChub3RlKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZU5vdGUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpzLW5vdGVzJykuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIFxyXG4gICAgICAgICAgICBub2RlTm90ZS5xdWVyeVNlbGVjdG9yKCcuanMtY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGVsTm90ZS5iaW5kKHRoaXMpKTtcclxuICAgIFxyXG4gICAgICAgICAgICBub2RlTm90ZS5xdWVyeVNlbGVjdG9yKCcuanMtYWRkLW5ldycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5uZXdOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWxOb3RlIChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlTm90ZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxOb3RlSWQgPSBub2RlTm90ZS5kYXRhc2V0LmlkO1xyXG4gICAgICAgICAgICBub3Rlc0RhdGEuc3BsaWNlKGRlbE5vdGVJZCwgMSk7XHJcbiAgICAgICAgICAgIG5vZGVOb3RlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBuZXdOb3RlICgpIHtcclxuICAgICAgICAgICAgbGV0IHRhZ3MgPSBbJ2FsbCddO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VMb2NhdGlvbiA9ICcnIHx8IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgdGFncyA9IHBhZ2VMb2NhdGlvbiA/IHRhZ3MucHVzaChwYWdlTG9jYXRpb24pIDogdGFncztcclxuICAgICAgICAgICAgY29uc3QgbmV3Tm90ZURhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAvL3RleHQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5wdXNoKG5ld05vdGVEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb3Rlcyhub3Rlc0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3Rlc0ZpbHRlciAocm91dGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyRGF0YSA9IG5vdGVzRGF0YS5maWx0ZXIoKG5vdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3RlLnRhZ3MuaW5kZXhPZihyb3V0ZSkgIT09IC0xO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTm90ZXMoZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBhcHAgPSBuZXcgQXBwKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2FwcC9hcHAuanMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9tZW51LnhtbC5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWVudSB7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKG5vZGUsIGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMudGl0bGUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpzLXRpdGxlJyk7XHJcbiAgICAgICAgLy90aGlzLnRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JTQvtCx0LDQstC70LXRj9GCINC90L7QstGL0LkgaXRlbSDQsiDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSDQvtC/0LjRgdCw0L3QuNC10Lwg0L/Rg9C90LrRgtCwINC80LXQvdGOXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbS50aXRsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0ubmFtZVxyXG4gICAgICovXHJcbiAgICBhZGQoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuZGF0YS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5ub2RlLCB0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtCDQv9C10YDQtdC60LvRjtGH0LDQtdGCINCw0LrRgtC40LLQvdGL0Lkg0L/Rg9C90LrRgiDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDQuNC80Y8g0LDQutGC0LjQstC90L7Qs9C+INC/0YPQvdC60YLQsCDQvNC10L3RjlxyXG4gICAgICovXHJcbiAgICB0b2dnbGVBY3RpdmUgKG5hbWUpIHtcclxuICAgICAgICBsZXQgbGlua3MgPSBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpKTtcclxuXHJcbiAgICAgICAgbGlua3MuZm9yRWFjaCggbGluayA9PiB7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGFjdGl2ZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKGAubWVudV9fbGluay5qcy0ke25hbWV9YCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1lbnUgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL21lbnUvbWVudS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJtZW51XFxcIj48dWwgY2xhc3M9XFxcIm1lbnVfX2xpc3RcXFwiPlwiKTt2YXIgaSxpdGVtLF9fZmVzdF9pdGVyYXRvcjA7dHJ5e19fZmVzdF9pdGVyYXRvcjA9anNvbi5saXN0IHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IwKXtpdGVtPV9fZmVzdF9pdGVyYXRvcjBbaV07X19mZXN0X2J1Zis9KFwiPGxpIGNsYXNzPVxcXCJtZW51X19pdGVtXFxcIj5cIik7dHJ5e19fZmVzdF9hdHRyc1swXT1fX2Zlc3RfZXNjYXBlSFRNTChpdGVtLm5hbWUpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1swXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fXRyeXtfX2Zlc3RfYXR0cnNbMV09X19mZXN0X2VzY2FwZUhUTUwoaXRlbS5uYW1lKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMV09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31fX2Zlc3RfYnVmKz0oXCI8YSBjbGFzcz1cXFwibWVudV9fbGluayBqcy1cIiArIF9fZmVzdF9hdHRyc1swXSArIFwiXFxcIiBocmVmPVxcXCIjXCIgKyBfX2Zlc3RfYXR0cnNbMV0gKyBcIlxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoaXRlbS50aXRsZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI2XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2E+PC9saT5cIik7fV9fZmVzdF9idWYrPShcIjwvdWw+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9tZW51L21lbnUueG1sLmpzIiwiLy8gaW1wb3J0IGZlc3QuZm9ybVxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vZm9ybS54bWwuanMnO1xuXG4vL9CV0YHQu9C4INGBINCw0L3Qs9C70LjQudGB0LrQvtCz0L4g0L3QsCDRgNGD0YHRgdC60LjQuSwg0YLQviDQv9C10YDQtdC00LDRkdC8INCy0YLQvtGA0YvQvCDQv9Cw0YDQsNC80LXRgtGA0L7QvCB0cnVlLlxubGV0IHRyYW5zbGl0ZXJhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgICBydXMgPSBcItGJICAg0YggINGHICDRhiAg0Y4gINGPICDRkSAg0LYgINGKICDRiyAg0Y0gINCwINCxINCyINCzINC0INC1INC3INC4INC5INC6INC7INC8INC9INC+INC/INGAINGBINGCINGDINGEINGFINGMXCIuc3BsaXQoLyArL2cpLFxuICAgICAgICBlbmcgPSBcInNoaCBzaCBjaCBjeiB5dSB5YSB5byB6aCBgYCB5JyBlYCBhIGIgdiBnIGQgZSB6IGkgaiBrIGwgbSBuIG8gcCByIHMgdCB1IGYgeCBgXCIuc3BsaXQoLyArL2cpXG4gICAgICAgIDtcbiAgICByZXR1cm4gZnVuY3Rpb24odGV4dCwgZW5nVG9SdXMpIHtcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIGZvcih4ID0gMDsgeCA8IHJ1cy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoZW5nVG9SdXMgPyBlbmdbeF0gOiBydXNbeF0pLmpvaW4oZW5nVG9SdXMgPyBydXNbeF0gOiBlbmdbeF0pO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoZW5nVG9SdXMgPyBlbmdbeF0udG9VcHBlckNhc2UoKSA6IHJ1c1t4XS50b1VwcGVyQ2FzZSgpKS5qb2luKGVuZ1RvUnVzID8gcnVzW3hdLnRvVXBwZXJDYXNlKCkgOiBlbmdbeF0udG9VcHBlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufSkoKTtcblxuY2xhc3MgRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBtZW51KSB7XG4gICAgICAgIHRoaXMubWVudT0gbWVudTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIobm9kZSk7XG5cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1mb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlbmRlcihub2RlKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2FkZC1uZXcnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmZvcm0uZWxlbWVudHMudGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRyYW5zbGl0ZXJhdGUodGhpcy5mb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IHsgRm9ybSB9O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfV9fZmVzdF9idWYrPShcIjxmb3JtIGNsYXNzPVxcXCJmb3JtIGpzLWZvcm1cXFwiPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwi0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y9cXFwiIGNsYXNzPVxcXCJmb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwidGl0bGVcXFwiLz48L2Zvcm0+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbm90ZS54bWwuanMnO1xyXG5cclxuY2xhc3MgTm90ZSB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLmlkID0gdGhpcy5pZDtcclxuICAgICAgICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcy5kYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTm90ZSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7dHJ5e19fZmVzdF9hdHRyc1swXT1fX2Zlc3RfZXNjYXBlSFRNTChqc29uLmNvbG9yKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMF09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO310cnl7X19mZXN0X2F0dHJzWzFdPV9fZmVzdF9lc2NhcGVIVE1MKGpzb24uaWQpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1sxXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fV9fZmVzdF9idWYrPShcIjxkaXYgY2xhc3M9XFxcIm5vdGUgbm90ZV9cIiArIF9fZmVzdF9hdHRyc1swXSArIFwiXFxcIiBkYXRhLWlkPVxcXCJcIiArIF9fZmVzdF9hdHRyc1sxXSArIFwiXFxcIj48aW1nIGNsYXNzPVxcXCJub3RlX19jbG9zZSBqcy1jbG9zZVxcXCIgc3JjPVxcXCJpbWdcXC9pY29fY2xvc2Uuc3ZnXFxcIi8+PHRleHRhcmVhIGNsYXNzPVxcXCJub3RlX190ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgiDQt9Cw0LzQtdGC0LrQuFxcXCIgcm93cz1cXFwiNlxcXCIgbWF4bGVuZ3RoPVxcXCIxMTlcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGpzb24udGV4dCkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI0XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RleHRhcmVhPjxkaXYgY2xhc3M9XFxcIm5vdGVfX2Zvb3RlclxcXCI+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9jb2xvciBqcy1zZXQtY29sb3JcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2NvbG9yLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fYWRkLW5ldyBqcy1hZGQtbmV3XFxcIiBzcmM9XFxcImltZ1xcL2ljb19hZGQuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9saW5rIGpzLWdldC1saW5rXFxcIiBzcmM9XFxcImltZ1xcL2ljb19saW5rLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fc2F2ZSBqcy1zYXZlXFxcIiBzcmM9XFxcImltZ1xcL2ljb19zYXZlLnN2Z1xcXCIvPjwvZGl2PjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3Mvbm90ZS9ub3RlLnhtbC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJhcHBcXFwiPjxkaXYgY2xhc3M9XFxcImFwcF9fc2lkZWJhclxcXCI+PGRpdiBjbGFzcz1cXFwiYXBwX19sb2dvXFxcIj48aW1nIGNsYXNzPVxcXCJhcHBfX3RpdGxlXFxcIiBzcmM9XFxcImltZ1xcL2xvZ29fdGV4dC5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJhcHBfX2ljb25cXFwiIHNyYz1cXFwiaW1nXFwvbG9nb19tYXJrLnN2Z1xcXCIvPjwvZGl2PjxociBjbGFzcz1cXFwiYXBwX19oclxcXCIvPjxkaXYgY2xhc3M9XFxcImFwcF9fbWVudSBqcy1tZW51XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJhcHBfX2Zvcm0ganMtbWVudS1mb3JtXFxcIj48L2Rpdj48aHIgY2xhc3M9XFxcImFwcF9faHJcXFwiLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJhcHBfX25vdGVzIGpzLW5vdGVzXFxcIj48L2Rpdj48L2Rpdj5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==