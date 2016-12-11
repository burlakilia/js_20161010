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
	    id: 1,
	    type: 'text',
	    text: '1234',
	    color: 'yellow',
	    tags: ['text', 'all']
	}, {
	    id: 2,
	    type: 'text',
	    text: '2345',
	    color: 'yellow',
	    tags: ['text']
	}];
	
	var notesColors = ['yellow', 'green'];
	
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
	            data.forEach(function (item) {
	                return _this2.addNote(item);
	            });
	        }
	    }, {
	        key: 'addNote',
	        value: function addNote(item) {
	            var div = document.createElement('div');
	            var note = new _note.Note(div, item);
	
	            this.notes.push(note);
	            var nodeNote = this.node.querySelector('.js-notes').appendChild(div);
	
	            nodeNote.querySelector('.js-set-color').addEventListener('click', this.setColorNote.bind(this));
	        }
	    }, {
	        key: 'setColorNote',
	        value: function setColorNote(event) {
	            var nodeNote = event.target.parentNode.parentNode;
	            var noteId = nodeNote.dataset.id;
	
	            var indexOfNoteInNotesData = notesData.findIndex(function (note) {
	                return note.id === +noteId;
	            });
	
	            var currentColor = notesData[indexOfNoteInNotesData].color;
	
	            // если последний цвет в массиве, то берем первый
	            var newColor = notesColors[0];
	            newColor = notesColors[notesColors.indexOf(currentColor) + 1] || newColor;
	
	            notesData[indexOfNoteInNotesData].color = newColor;
	
	            nodeNote.classList.remove('note_' + currentColor);
	            nodeNote.classList.add('note_' + newColor);
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
	    function Note(node, data) {
	        _classCallCheck(this, Note);
	
	        this.node = node;
	        this.data = data;
	        this.render();
	    }
	
	    _createClass(Note, [{
	        key: 'render',
	        value: function render() {
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
		}__fest_buf += "<div class=\"note note_" + __fest_attrs[0] + "\" data-id=\"" + __fest_attrs[1] + "\"><img class=\"note__close\" src=\"img\/ico_close.svg\"/><textarea class=\"note__text\" placeholder=\"Введите текст заметки\" rows=\"6\" maxlength=\"119\">";try {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzFiNzIzNDAxOWFjMzJjYjgwOGQiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL21lbnUvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sIm5hbWVzIjpbIm1lbnVEYXRhIiwibGlzdCIsInRpdGxlIiwibmFtZSIsIm5vdGVzRGF0YSIsImlkIiwidHlwZSIsInRleHQiLCJjb2xvciIsInRhZ3MiLCJub3Rlc0NvbG9ycyIsIkFwcCIsIm5vZGUiLCJyZW5kZXIiLCJtZW51IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybSIsIm5vdGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsImV2ZW50IiwiZGV0YWlsIiwicmVuZGVyTm90ZXMiLCJzZXRSb3V0ZSIsImxvY2F0aW9uIiwiaGFzaCIsInJlcGxhY2UiLCJyb3V0ZSIsInRvZ2dsZUFjdGl2ZSIsIm5vdGVzRmlsdGVyIiwiaW5uZXJIVE1MIiwiZGF0YSIsImZvckVhY2giLCJhZGROb3RlIiwiaXRlbSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJub3RlIiwicHVzaCIsIm5vZGVOb3RlIiwiYXBwZW5kQ2hpbGQiLCJzZXRDb2xvck5vdGUiLCJiaW5kIiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsIm5vdGVJZCIsImRhdGFzZXQiLCJpbmRleE9mTm90ZUluTm90ZXNEYXRhIiwiZmluZEluZGV4IiwiY3VycmVudENvbG9yIiwibmV3Q29sb3IiLCJpbmRleE9mIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZmlsdGVyRGF0YSIsImZpbHRlciIsImFwcCIsImJvZHkiLCJ3aW5kb3ciLCJNZW51IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibGlua3MiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGluayIsImFjdGl2ZSIsIl9fZmVzdF9jb250ZXh0IiwiX19mZXN0X3NlbGYiLCJfX2Zlc3RfYnVmIiwiX19mZXN0X2NodW5rcyIsIl9fZmVzdF9jaHVuayIsIl9fZmVzdF9hdHRycyIsIl9fZmVzdF9zZWxlY3QiLCJfX2Zlc3RfaWYiLCJfX2Zlc3RfaXRlcmF0b3IiLCJfX2Zlc3RfdG8iLCJfX2Zlc3RfZm4iLCJfX2Zlc3RfaHRtbCIsIl9fZmVzdF9ibG9ja3MiLCJfX2Zlc3RfcGFyYW1zIiwiX19mZXN0X2VsZW1lbnQiLCJfX2Zlc3RfZGVidWdfZmlsZSIsIl9fZmVzdF9kZWJ1Z19saW5lIiwiX19mZXN0X2RlYnVnX2Jsb2NrIiwiX19mZXN0X2VsZW1lbnRfc3RhY2siLCJfX2Zlc3Rfc2hvcnRfdGFncyIsIl9fZmVzdF9qc2NoYXJzIiwiX19mZXN0X2pzY2hhcnNfdGVzdCIsIl9fZmVzdF9odG1sY2hhcnMiLCJfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QiLCJfX2Zlc3RfanNoYXNoIiwiX19mZXN0X2h0bWxoYXNoIiwiX19mZXN0X2VzY2FwZUpTIiwidmFsdWUiLCJ0ZXN0IiwiX19mZXN0X3JlcGxhY2VKUyIsImNociIsIl9fZmVzdF9lc2NhcGVIVE1MIiwiX19mZXN0X3JlcGxhY2VIVE1MIiwiX19mZXN0X2V4dGVuZCIsImRlc3QiLCJzcmMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fZmVzdF9wYXJhbSIsImZuIiwicGFyYW0iLCJpMThuIiwic3RyIiwiX19fZmVzdF9sb2dfZXJyb3IiLCJfX2Zlc3RfZXJyb3IiLCJjb25zb2xlIiwiZXJyb3IiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX19mZXN0X2xvZ19lcnJvciIsIm1zZyIsIl9fZmVzdF9jYWxsIiwicGFyYW1zIiwiY3AiLCJpIiwianNvbiIsIl9fZmVzdF9pdGVyYXRvcjAiLCJlIiwibWVzc2FnZSIsImxlbmd0aCIsInRyYW5zbGl0ZXJhdGUiLCJydXMiLCJzcGxpdCIsImVuZyIsImVuZ1RvUnVzIiwieCIsImpvaW4iLCJ0b1VwcGVyQ2FzZSIsIkZvcm0iLCJvblN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZWxlbWVudHMiLCJ0b0xvd2VyQ2FzZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiTm90ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVJLEtBQUlBLFdBQVc7QUFDWEMsV0FBTSxDQUNGO0FBQ0lDLGdCQUFPLGFBRFg7QUFFSUMsZUFBTTtBQUZWLE1BREUsRUFLRjtBQUNJRCxnQkFBTyxPQURYO0FBRUlDLGVBQU07QUFGVixNQUxFO0FBREssRUFBZjs7QUFhQSxLQUFJQyxZQUFZLENBQ1o7QUFDSUMsU0FBSSxDQURSO0FBRUlDLFdBQU0sTUFGVjtBQUdJQyxXQUFNLE1BSFY7QUFJSUMsWUFBTyxRQUpYO0FBS0lDLFdBQU0sQ0FBQyxNQUFELEVBQVMsS0FBVDtBQUxWLEVBRFksRUFRWjtBQUNJSixTQUFJLENBRFI7QUFFSUMsV0FBTSxNQUZWO0FBR0lDLFdBQU0sTUFIVjtBQUlJQyxZQUFPLFFBSlg7QUFLSUMsV0FBTSxDQUFDLE1BQUQ7QUFMVixFQVJZLENBQWhCOztBQWlCQSxLQUFNQyxjQUFjLENBQUMsUUFBRCxF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VUFBbkI7QUFBK0IsR0FBOVcsTUFBb1g7QUFBQyxVQUFPQSxVQUFQO0FBQW1CO0FBQUMsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MWI3MjM0MDE5YWMzMmNiODA4ZCIsImltcG9ydCB7IE1lbnUgfSBmcm9tICcuLi9tZW51L21lbnUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS9mb3JtLmpzJztcclxuaW1wb3J0IHsgTm90ZSB9IGZyb20gJy4uL25vdGUvbm90ZS5qcyc7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2FwcC54bWwuanMnO1xyXG5cclxuICAgIGxldCBtZW51RGF0YSA9IHtcclxuICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0JLRgdC1INC30LDQvNC10YLQutC4JyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdhbGwnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0KLQtdC60YHRgicsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndGV4dCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IG5vdGVzRGF0YSA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIHRleHQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxyXG4gICAgICAgICAgICB0YWdzOiBbJ3RleHQnLCAnYWxsJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgdGV4dDogJzIzNDUnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3llbGxvdycsXHJcbiAgICAgICAgICAgIHRhZ3M6IFsndGV4dCddXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgY29uc3Qgbm90ZXNDb2xvcnMgPSBbJ3llbGxvdycsICdncmVlbiddO1xyXG5cclxuICAgIGNsYXNzIEFwcCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBuZXcgTWVudShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudScpLCBtZW51RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51LWZvcm0nKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZC1uZXcnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuYWRkKGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb3Rlcyhub3Rlc0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Um91dGUgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS50b2dnbGVBY3RpdmUocm91dGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVzRmlsdGVyKHJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlck5vdGVzIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ub3RlcycpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goIGl0ZW0gPT4gdGhpcy5hZGROb3RlKGl0ZW0pICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGROb3RlIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSBuZXcgTm90ZShkaXYsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKG5vdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlTm90ZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtbm90ZXMnKS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIG5vZGVOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZXQtY29sb3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0Q29sb3JOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRDb2xvck5vdGUgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVOb3RlID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZUlkID0gbm9kZU5vdGUuZGF0YXNldC5pZDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEgPSBub3Rlc0RhdGEuZmluZEluZGV4KCBub3RlID0+IG5vdGUuaWQgPT09ICtub3RlSWQgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb2xvciA9IG5vdGVzRGF0YVtpbmRleE9mTm90ZUluTm90ZXNEYXRhXS5jb2xvcjtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9C+0YHQu9C10LTQvdC40Lkg0YbQstC10YIg0LIg0LzQsNGB0YHQuNCy0LUsINGC0L4g0LHQtdGA0LXQvCDQv9C10YDQstGL0LlcclxuICAgICAgICAgICAgbGV0IG5ld0NvbG9yID0gbm90ZXNDb2xvcnNbMF07XHJcbiAgICAgICAgICAgIG5ld0NvbG9yID0gbm90ZXNDb2xvcnNbbm90ZXNDb2xvcnMuaW5kZXhPZihjdXJyZW50Q29sb3IpICsgMV0gfHwgbmV3Q29sb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBub3Rlc0RhdGFbaW5kZXhPZk5vdGVJbk5vdGVzRGF0YV0uY29sb3IgPSBuZXdDb2xvcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vZGVOb3RlLmNsYXNzTGlzdC5yZW1vdmUoYG5vdGVfJHtjdXJyZW50Q29sb3J9YCk7XHJcbiAgICAgICAgICAgIG5vZGVOb3RlLmNsYXNzTGlzdC5hZGQoYG5vdGVfJHtuZXdDb2xvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm90ZXNGaWx0ZXIgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckRhdGEgPSBub3Rlc0RhdGEuZmlsdGVyKChub3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90ZS50YWdzLmluZGV4T2Yocm91dGUpICE9PSAtMTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vdGVzKGZpbHRlckRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgYXBwID0gbmV3IEFwcChkb2N1bWVudC5ib2R5KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICBhcHAuc2V0Um91dGUobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9hcHAvYXBwLmpzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbWVudS54bWwuanMnO1xyXG5cclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcihub2RlLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLnRpdGxlID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy10aXRsZScpO1xyXG4gICAgICAgIC8vdGhpcy50aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShkYXRhKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCU0L7QsdCw0LLQu9C10Y/RgiDQvdC+0LLRi9C5IGl0ZW0g0LIg0LzQtdC90Y5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0g0L7Qv9C40YHQsNC90LjQtdC8INC/0YPQvdC60YLQsCDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0udGl0bGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtLm5hbWVcclxuICAgICAqL1xyXG4gICAgYWRkKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmRhdGEubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMubm9kZSwgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCc0LXRgtC+0LQg0L/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQsNC60YLQuNCy0L3Ri9C5INC/0YPQvdC60YIg0LzQtdC90Y5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0g0LjQvNGPINCw0LrRgtC40LLQvdC+0LPQviDQv9GD0L3QutGC0LAg0LzQtdC90Y5cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlQWN0aXZlIChuYW1lKSB7XHJcbiAgICAgICAgbGV0IGxpbmtzID0gW10uc2xpY2UuY2FsbCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKSk7XHJcblxyXG4gICAgICAgIGxpbmtzLmZvckVhY2goIGxpbmsgPT4ge1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihgLm1lbnVfX2xpbmsuanMtJHtuYW1lfWApO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKCdtZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBNZW51IH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9tZW51L21lbnUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwibWVudVxcXCI+PHVsIGNsYXNzPVxcXCJtZW51X19saXN0XFxcIj5cIik7dmFyIGksaXRlbSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24ubGlzdCB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMCl7aXRlbT1fX2Zlc3RfaXRlcmF0b3IwW2ldO19fZmVzdF9idWYrPShcIjxsaSBjbGFzcz1cXFwibWVudV9faXRlbVxcXCI+XCIpO3RyeXtfX2Zlc3RfYXR0cnNbMF09X19mZXN0X2VzY2FwZUhUTUwoaXRlbS5uYW1lKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMF09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO310cnl7X19mZXN0X2F0dHJzWzFdPV9fZmVzdF9lc2NhcGVIVE1MKGl0ZW0ubmFtZSl9Y2F0Y2goZSl7X19mZXN0X2F0dHJzWzFdPVwiXCI7IF9fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9X19mZXN0X2J1Zis9KFwiPGEgY2xhc3M9XFxcIm1lbnVfX2xpbmsganMtXCIgKyBfX2Zlc3RfYXR0cnNbMF0gKyBcIlxcXCIgaHJlZj1cXFwiI1wiICsgX19mZXN0X2F0dHJzWzFdICsgXCJcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGl0ZW0udGl0bGUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNlwiKTt9X19mZXN0X2J1Zis9KFwiPC9hPjwvbGk+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3VsPjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIi8vIGltcG9ydCBmZXN0LmZvcm1cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2Zvcm0ueG1sLmpzJztcblxuLy/QldGB0LvQuCDRgSDQsNC90LPQu9C40LnRgdC60L7Qs9C+INC90LAg0YDRg9GB0YHQutC40LksINGC0L4g0L/QtdGA0LXQtNCw0ZHQvCDQstGC0L7RgNGL0Lwg0L/QsNGA0LDQvNC10YLRgNC+0LwgdHJ1ZS5cbmxldCB0cmFuc2xpdGVyYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXJcbiAgICAgICAgcnVzID0gXCLRiSAgINGIICDRhyAg0YYgINGOICDRjyAg0ZEgINC2ICDRiiAg0YsgINGNICDQsCDQsSDQsiDQsyDQtCDQtSDQtyDQuCDQuSDQuiDQuyDQvCDQvSDQviDQvyDRgCDRgSDRgiDRgyDRhCDRhSDRjFwiLnNwbGl0KC8gKy9nKSxcbiAgICAgICAgZW5nID0gXCJzaGggc2ggY2ggY3ogeXUgeWEgeW8gemggYGAgeScgZWAgYSBiIHYgZyBkIGUgeiBpIGogayBsIG0gbiBvIHAgciBzIHQgdSBmIHggYFwiLnNwbGl0KC8gKy9nKVxuICAgICAgICA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQsIGVuZ1RvUnVzKSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICBmb3IoeCA9IDA7IHggPCBydXMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGVuZ1RvUnVzID8gZW5nW3hdIDogcnVzW3hdKS5qb2luKGVuZ1RvUnVzID8gcnVzW3hdIDogZW5nW3hdKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGVuZ1RvUnVzID8gZW5nW3hdLnRvVXBwZXJDYXNlKCkgOiBydXNbeF0udG9VcHBlckNhc2UoKSkuam9pbihlbmdUb1J1cyA/IHJ1c1t4XS50b1VwcGVyQ2FzZSgpIDogZW5nW3hdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbn0pKCk7XG5cbmNsYXNzIEZvcm0ge1xuXG4gICAgY29uc3RydWN0b3Iobm9kZSwgbWVudSkge1xuICAgICAgICB0aGlzLm1lbnU9IG1lbnU7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKG5vZGUpO1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtZm9ybScpO1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZW5kZXIobm9kZSkge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIG9uU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdhZGQtbmV3Jywge1xuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5mb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0cmFuc2xpdGVyYXRlKHRoaXMuZm9ybS5lbGVtZW50cy50aXRsZS52YWx1ZSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IEZvcm0gfTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2Zvcm0vZm9ybS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX1fX2Zlc3RfYnVmKz0oXCI8Zm9ybSBjbGFzcz1cXFwiZm9ybSBqcy1mb3JtXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXFxcIiBjbGFzcz1cXFwiZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInRpdGxlXFxcIi8+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvZm9ybS9mb3JtLnhtbC5qcyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25vdGUueG1sLmpzJztcclxuXHJcbmNsYXNzIE5vdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE5vdGUgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3Mvbm90ZS9ub3RlLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O3RyeXtfX2Zlc3RfYXR0cnNbMF09X19mZXN0X2VzY2FwZUhUTUwoanNvbi5jb2xvcil9Y2F0Y2goZSl7X19mZXN0X2F0dHJzWzBdPVwiXCI7IF9fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9dHJ5e19fZmVzdF9hdHRyc1sxXT1fX2Zlc3RfZXNjYXBlSFRNTChqc29uLmlkKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMV09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31fX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJub3RlIG5vdGVfXCIgKyBfX2Zlc3RfYXR0cnNbMF0gKyBcIlxcXCIgZGF0YS1pZD1cXFwiXCIgKyBfX2Zlc3RfYXR0cnNbMV0gKyBcIlxcXCI+PGltZyBjbGFzcz1cXFwibm90ZV9fY2xvc2VcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2Nsb3NlLnN2Z1xcXCIvPjx0ZXh0YXJlYSBjbGFzcz1cXFwibm90ZV9fdGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcItCS0LLQtdC00LjRgtC1INGC0LXQutGB0YIg0LfQsNC80LXRgtC60LhcXFwiIHJvd3M9XFxcIjZcXFwiIG1heGxlbmd0aD1cXFwiMTE5XFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChqc29uLnRleHQpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNFwiKTt9X19mZXN0X2J1Zis9KFwiPC90ZXh0YXJlYT48ZGl2IGNsYXNzPVxcXCJub3RlX19mb290ZXJcXFwiPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fY29sb3IganMtc2V0LWNvbG9yXFxcIiBzcmM9XFxcImltZ1xcL2ljb19jb2xvci5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJub3RlX19idXR0b24gbm90ZV9fYnV0dG9uX2FkZC1uZXcganMtYWRkLW5ld1xcXCIgc3JjPVxcXCJpbWdcXC9pY29fYWRkLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fbGluayBqcy1nZXQtbGlua1xcXCIgc3JjPVxcXCJpbWdcXC9pY29fbGluay5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJub3RlX19idXR0b24gbm90ZV9fYnV0dG9uX3NhdmUganMtc2F2ZVxcXCIgc3JjPVxcXCJpbWdcXC9pY29fc2F2ZS5zdmdcXFwiLz48L2Rpdj48L2Rpdj5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwiYXBwXFxcIj48ZGl2IGNsYXNzPVxcXCJhcHBfX3NpZGViYXJcXFwiPjxkaXYgY2xhc3M9XFxcImFwcF9fbG9nb1xcXCI+PGltZyBjbGFzcz1cXFwiYXBwX190aXRsZVxcXCIgc3JjPVxcXCJpbWdcXC9sb2dvX3RleHQuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwiYXBwX19pY29uXFxcIiBzcmM9XFxcImltZ1xcL2xvZ29fbWFyay5zdmdcXFwiLz48L2Rpdj48aHIgY2xhc3M9XFxcImFwcF9faHJcXFwiLz48ZGl2IGNsYXNzPVxcXCJhcHBfX21lbnUganMtbWVudVxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiYXBwX19mb3JtIGpzLW1lbnUtZm9ybVxcXCI+PC9kaXY+PGhyIGNsYXNzPVxcXCJhcHBfX2hyXFxcIi8+PC9kaXY+PGRpdiBjbGFzcz1cXFwiYXBwX19ub3RlcyBqcy1ub3Rlc1xcXCI+PC9kaXY+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9hcHAvYXBwLnhtbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=