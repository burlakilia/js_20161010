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
	
	            nodeNote.querySelector('.js-set-color').addEventListener('click', this.setColorNote.bind(this));
	        }
	    }, {
	        key: 'setColorNote',
	        value: function setColorNote(event) {
	            var nodeNote = event.target.parentNode.parentNode;
	            var noteId = nodeNote.dataset.id;
	
	            var currentColor = notesData[noteId].color;
	
	            var newColor = notesColors[notesColors.indexOf(currentColor) + 1];
	
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
	    function Note(node, data, id) {
	        _classCallCheck(this, Note);
	
	        this.node = node;
	        this.data = data;
	        this.data.id = id;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzliMmVlYzI3Zjc1NDkwZTAzZTUiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL21lbnUvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sIm5hbWVzIjpbIm1lbnVEYXRhIiwibGlzdCIsInRpdGxlIiwibmFtZSIsIm5vdGVzRGF0YSIsInR5cGUiLCJ0ZXh0IiwiY29sb3IiLCJ0YWdzIiwibm90ZXNDb2xvcnMiLCJBcHAiLCJub2RlIiwicmVuZGVyIiwibWVudSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm0iLCJub3RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGQiLCJldmVudCIsImRldGFpbCIsInJlbmRlck5vdGVzIiwic2V0Um91dGUiLCJsb2NhdGlvbiIsImhhc2giLCJyZXBsYWNlIiwicm91dGUiLCJ0b2dnbGVBY3RpdmUiLCJub3Rlc0ZpbHRlciIsImlubmVySFRNTCIsImRhdGEiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiYWRkTm90ZSIsImlkIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsIm5vdGUiLCJwdXNoIiwibm9kZU5vdGUiLCJhcHBlbmRDaGlsZCIsInNldENvbG9yTm90ZSIsImJpbmQiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwibm90ZUlkIiwiZGF0YXNldCIsImN1cnJlbnRDb2xvciIsIm5ld0NvbG9yIiwiaW5kZXhPZiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImZpbHRlckRhdGEiLCJmaWx0ZXIiLCJhcHAiLCJib2R5Iiwid2luZG93IiwiTWVudSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImxpbmtzIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImxpbmsiLCJhY3RpdmUiLCJfX2Zlc3RfY29udGV4dCIsIl9fZmVzdF9zZWxmIiwiX19mZXN0X2J1ZiIsIl9fZmVzdF9jaHVua3MiLCJfX2Zlc3RfY2h1bmsiLCJfX2Zlc3RfYXR0cnMiLCJfX2Zlc3Rfc2VsZWN0IiwiX19mZXN0X2lmIiwiX19mZXN0X2l0ZXJhdG9yIiwiX19mZXN0X3RvIiwiX19mZXN0X2ZuIiwiX19mZXN0X2h0bWwiLCJfX2Zlc3RfYmxvY2tzIiwiX19mZXN0X3BhcmFtcyIsIl9fZmVzdF9lbGVtZW50IiwiX19mZXN0X2RlYnVnX2ZpbGUiLCJfX2Zlc3RfZGVidWdfbGluZSIsIl9fZmVzdF9kZWJ1Z19ibG9jayIsIl9fZmVzdF9lbGVtZW50X3N0YWNrIiwiX19mZXN0X3Nob3J0X3RhZ3MiLCJfX2Zlc3RfanNjaGFycyIsIl9fZmVzdF9qc2NoYXJzX3Rlc3QiLCJfX2Zlc3RfaHRtbGNoYXJzIiwiX19mZXN0X2h0bWxjaGFyc190ZXN0IiwiX19mZXN0X2pzaGFzaCIsIl9fZmVzdF9odG1saGFzaCIsIl9fZmVzdF9lc2NhcGVKUyIsInZhbHVlIiwidGVzdCIsIl9fZmVzdF9yZXBsYWNlSlMiLCJjaHIiLCJfX2Zlc3RfZXNjYXBlSFRNTCIsIl9fZmVzdF9yZXBsYWNlSFRNTCIsIl9fZmVzdF9leHRlbmQiLCJkZXN0Iiwic3JjIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJfX2Zlc3RfcGFyYW0iLCJmbiIsInBhcmFtIiwiaTE4biIsInN0ciIsIl9fX2Zlc3RfbG9nX2Vycm9yIiwiX19mZXN0X2Vycm9yIiwiY29uc29sZSIsImVycm9yIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9fZmVzdF9sb2dfZXJyb3IiLCJtc2ciLCJfX2Zlc3RfY2FsbCIsInBhcmFtcyIsImNwIiwiaSIsImpzb24iLCJfX2Zlc3RfaXRlcmF0b3IwIiwiZSIsIm1lc3NhZ2UiLCJsZW5ndGgiLCJ0cmFuc2xpdGVyYXRlIiwicnVzIiwic3BsaXQiLCJlbmciLCJlbmdUb1J1cyIsIngiLCJqb2luIiwidG9VcHBlckNhc2UiLCJGb3JtIiwib25TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnRzIiwidG9Mb3dlckNhc2UiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsIk5vdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFSSxLQUFJQSxXQUFXO0FBQ1hDLFdBQU0sQ0FDRjtBQUNJQyxnQkFBTyxhQURYO0FBRUlDLGVBQU07QUFGVixNQURFLEVBS0Y7QUFDSUQsZ0JBQU8sT0FEWDtBQUVJQyxlQUFNO0FBRlYsTUFMRTtBQURLLEVBQWY7O0FBYUEsS0FBSUMsWUFBWSxDQUNaO0FBQ0lDLFdBQU0sTUFEVjtBQUVJQyxXQUFNLE1BRlY7QUFHSUMsWUFBTyxRQUhYO0FBSUlDLFdBQU0sQ0FBQyxNQUFELEVBQVMsS0FBVDtBQUpWLEVBRFksRUFPWjtBQUNJSCxXQUFNLE1BRFY7QUFFSUMsV0FBTSxNQUZWO0FBR0lDLFlBQU8sUUFIWDtBQUlJQyxXQUFNLENBQUMsTUFBRDtBQUpWLEVBUFksQ0FBaEI7O0FBZUEsS0FBTUMsY0FBYyxDQUFDLFFBQUQsRUFBVyxPQUFYLENBQXBCOztLQUVNQyxHO0FBRUYsa0JBQWFDLElBQWIsRUFBbUI7QUFBQTs7QUFBQTs7QUFD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LEdBQXVDLGNBQXZDLEdBQXNERCxpQkFBdEQsR0FBd0UsVUFBeEUsR0FBbUZELGlCQUFyRztBQUF3SCxZQUFTc0MsV0FBVCxDQUFxQmQsRUFBckIsRUFBeUJlLE1BQXpCLEVBQWdDQyxFQUFoQyxFQUFtQztBQUFDLE9BQUdBLEVBQUgsRUFBTSxLQUFJLElBQUlDLENBQVIsSUFBYUYsTUFBYjtBQUFvQixRQUFHLE9BQU9BLE9BQU9FLENBQVAsQ0FBUCxJQUFrQixVQUFsQixJQUE4QkYsT0FBT0UsQ0FBUCxFQUFVaEIsS0FBM0MsRUFBaURjLE9BQU9FLENBQVAsSUFBVUYsT0FBT0UsQ0FBUCxHQUFWO0FBQXJFLElBQTJGLE9BQU9qQixHQUFHM0MsSUFBSCxDQUFRSyxXQUFSLEVBQW9CcUQsTUFBcEIsQ0FBUDtBQUFtQyxPQUFJRyxPQUFLekQsY0FBVCxDQUF3QkUsY0FBYSxpWEFBYixDQUFnWU8sWUFBVU4sY0FBYzBELE1BQXhCLENBQStCLElBQUlwRCxTQUFKLEVBQWU7QUFBQ0QscUJBQWtCLENBQWxCLENBQW9CLE9BQU1BLGtCQUFnQkMsU0FBdEIsRUFBZ0NELGlCQUFoQyxFQUFtRDtBQUFDSixtQkFBYUQsY0FBY0ssZUFBZCxDQUFiLENBQTRDLElBQUksT0FBT0osWUFBUCxLQUFzQixRQUExQixFQUFvQztBQUFDTyxvQkFBYVAsWUFBYjtBQUEyQixLQUFoRSxNQUFzRTtBQUFDTSxpQkFBVUUsY0FBY1IsYUFBYXRFLElBQTNCLENBQVYsQ0FBMkMsSUFBSTRFLFNBQUosRUFBZUMsZUFBYTBDLFlBQVkzQyxTQUFaLEVBQXNCTixhQUFha0QsTUFBbkMsRUFBMENsRCxhQUFhbUQsRUFBdkQsQ0FBYjtBQUF5RTtBQUFDLFdBQU81QyxjQUFZVCxVQUFuQjtBQUErQixHQUE5VyxNQUFvWDtBQUFDLFVBQU9BLFVBQVA7QUFBbUI7QUFBQyxFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM5YjJlZWMyN2Y3NTQ5MGUwM2U1IiwiaW1wb3J0IHsgTWVudSB9IGZyb20gJy4uL21lbnUvbWVudS5qcyc7XHJcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtL2Zvcm0uanMnO1xyXG5pbXBvcnQgeyBOb3RlIH0gZnJvbSAnLi4vbm90ZS9ub3RlLmpzJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vYXBwLnhtbC5qcyc7XHJcblxyXG4gICAgbGV0IG1lbnVEYXRhID0ge1xyXG4gICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQktGB0LUg0LfQsNC80LXRgtC60LgnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2FsbCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQotC10LrRgdGCJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXh0J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgbm90ZXNEYXRhID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnMTIzNCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgdGFnczogWyd0ZXh0JywgJ2FsbCddXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgdGV4dDogJzIzNDUnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3llbGxvdycsXHJcbiAgICAgICAgICAgIHRhZ3M6IFsndGV4dCddXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgY29uc3Qgbm90ZXNDb2xvcnMgPSBbJ3llbGxvdycsICdncmVlbiddO1xyXG5cclxuICAgIGNsYXNzIEFwcCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBuZXcgTWVudShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudScpLCBtZW51RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51LWZvcm0nKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZC1uZXcnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuYWRkKGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb3Rlcyhub3Rlc0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Um91dGUgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS50b2dnbGVBY3RpdmUocm91dGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVzRmlsdGVyKHJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlck5vdGVzIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ub3RlcycpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goIChpdGVtLCBpbmRleCkgPT4gdGhpcy5hZGROb3RlKGl0ZW0sIGluZGV4KSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkTm90ZSAoaXRlbSwgaWQpIHtcclxuICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBsZXQgbm90ZSA9IG5ldyBOb3RlKGRpdiwgaXRlbSwgaWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKG5vdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlTm90ZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtbm90ZXMnKS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIG5vZGVOb3RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZXQtY29sb3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0Q29sb3JOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRDb2xvck5vdGUgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVOb3RlID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZUlkID0gbm9kZU5vdGUuZGF0YXNldC5pZDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb2xvciA9IG5vdGVzRGF0YVtub3RlSWRdLmNvbG9yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBub3Rlc0NvbG9yc1tub3Rlc0NvbG9ycy5pbmRleE9mKGN1cnJlbnRDb2xvcikgKyAxXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vZGVOb3RlLmNsYXNzTGlzdC5yZW1vdmUoYG5vdGVfJHtjdXJyZW50Q29sb3J9YCk7XHJcbiAgICAgICAgICAgIG5vZGVOb3RlLmNsYXNzTGlzdC5hZGQoYG5vdGVfJHtuZXdDb2xvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm90ZXNGaWx0ZXIgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckRhdGEgPSBub3Rlc0RhdGEuZmlsdGVyKChub3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90ZS50YWdzLmluZGV4T2Yocm91dGUpICE9PSAtMTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vdGVzKGZpbHRlckRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgYXBwID0gbmV3IEFwcChkb2N1bWVudC5ib2R5KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICBhcHAuc2V0Um91dGUobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9hcHAvYXBwLmpzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbWVudS54bWwuanMnO1xyXG5cclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcihub2RlLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLnRpdGxlID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy10aXRsZScpO1xyXG4gICAgICAgIC8vdGhpcy50aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShkYXRhKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCU0L7QsdCw0LLQu9C10Y/RgiDQvdC+0LLRi9C5IGl0ZW0g0LIg0LzQtdC90Y5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0g0L7Qv9C40YHQsNC90LjQtdC8INC/0YPQvdC60YLQsCDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0udGl0bGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtLm5hbWVcclxuICAgICAqL1xyXG4gICAgYWRkKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmRhdGEubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMubm9kZSwgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCc0LXRgtC+0LQg0L/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQsNC60YLQuNCy0L3Ri9C5INC/0YPQvdC60YIg0LzQtdC90Y5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0g0LjQvNGPINCw0LrRgtC40LLQvdC+0LPQviDQv9GD0L3QutGC0LAg0LzQtdC90Y5cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlQWN0aXZlIChuYW1lKSB7XHJcbiAgICAgICAgbGV0IGxpbmtzID0gW10uc2xpY2UuY2FsbCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKSk7XHJcblxyXG4gICAgICAgIGxpbmtzLmZvckVhY2goIGxpbmsgPT4ge1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihgLm1lbnVfX2xpbmsuanMtJHtuYW1lfWApO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKCdtZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBNZW51IH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9tZW51L21lbnUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwibWVudVxcXCI+PHVsIGNsYXNzPVxcXCJtZW51X19saXN0XFxcIj5cIik7dmFyIGksaXRlbSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24ubGlzdCB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMCl7aXRlbT1fX2Zlc3RfaXRlcmF0b3IwW2ldO19fZmVzdF9idWYrPShcIjxsaSBjbGFzcz1cXFwibWVudV9faXRlbVxcXCI+XCIpO3RyeXtfX2Zlc3RfYXR0cnNbMF09X19mZXN0X2VzY2FwZUhUTUwoaXRlbS5uYW1lKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMF09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO310cnl7X19mZXN0X2F0dHJzWzFdPV9fZmVzdF9lc2NhcGVIVE1MKGl0ZW0ubmFtZSl9Y2F0Y2goZSl7X19mZXN0X2F0dHJzWzFdPVwiXCI7IF9fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9X19mZXN0X2J1Zis9KFwiPGEgY2xhc3M9XFxcIm1lbnVfX2xpbmsganMtXCIgKyBfX2Zlc3RfYXR0cnNbMF0gKyBcIlxcXCIgaHJlZj1cXFwiI1wiICsgX19mZXN0X2F0dHJzWzFdICsgXCJcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGl0ZW0udGl0bGUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNlwiKTt9X19mZXN0X2J1Zis9KFwiPC9hPjwvbGk+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3VsPjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIi8vIGltcG9ydCBmZXN0LmZvcm1cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2Zvcm0ueG1sLmpzJztcblxuLy/QldGB0LvQuCDRgSDQsNC90LPQu9C40LnRgdC60L7Qs9C+INC90LAg0YDRg9GB0YHQutC40LksINGC0L4g0L/QtdGA0LXQtNCw0ZHQvCDQstGC0L7RgNGL0Lwg0L/QsNGA0LDQvNC10YLRgNC+0LwgdHJ1ZS5cbmxldCB0cmFuc2xpdGVyYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXJcbiAgICAgICAgcnVzID0gXCLRiSAgINGIICDRhyAg0YYgINGOICDRjyAg0ZEgINC2ICDRiiAg0YsgINGNICDQsCDQsSDQsiDQsyDQtCDQtSDQtyDQuCDQuSDQuiDQuyDQvCDQvSDQviDQvyDRgCDRgSDRgiDRgyDRhCDRhSDRjFwiLnNwbGl0KC8gKy9nKSxcbiAgICAgICAgZW5nID0gXCJzaGggc2ggY2ggY3ogeXUgeWEgeW8gemggYGAgeScgZWAgYSBiIHYgZyBkIGUgeiBpIGogayBsIG0gbiBvIHAgciBzIHQgdSBmIHggYFwiLnNwbGl0KC8gKy9nKVxuICAgICAgICA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQsIGVuZ1RvUnVzKSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICBmb3IoeCA9IDA7IHggPCBydXMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGVuZ1RvUnVzID8gZW5nW3hdIDogcnVzW3hdKS5qb2luKGVuZ1RvUnVzID8gcnVzW3hdIDogZW5nW3hdKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGVuZ1RvUnVzID8gZW5nW3hdLnRvVXBwZXJDYXNlKCkgOiBydXNbeF0udG9VcHBlckNhc2UoKSkuam9pbihlbmdUb1J1cyA/IHJ1c1t4XS50b1VwcGVyQ2FzZSgpIDogZW5nW3hdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbn0pKCk7XG5cbmNsYXNzIEZvcm0ge1xuXG4gICAgY29uc3RydWN0b3Iobm9kZSwgbWVudSkge1xuICAgICAgICB0aGlzLm1lbnU9IG1lbnU7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKG5vZGUpO1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtZm9ybScpO1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZW5kZXIobm9kZSkge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIG9uU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdhZGQtbmV3Jywge1xuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5mb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0cmFuc2xpdGVyYXRlKHRoaXMuZm9ybS5lbGVtZW50cy50aXRsZS52YWx1ZSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IEZvcm0gfTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2Zvcm0vZm9ybS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX1fX2Zlc3RfYnVmKz0oXCI8Zm9ybSBjbGFzcz1cXFwiZm9ybSBqcy1mb3JtXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXFxcIiBjbGFzcz1cXFwiZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInRpdGxlXFxcIi8+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvZm9ybS9mb3JtLnhtbC5qcyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25vdGUueG1sLmpzJztcclxuXHJcbmNsYXNzIE5vdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChub2RlLCBkYXRhLCBpZCkge1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmRhdGEuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBOb3RlIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL25vdGUvbm90ZS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDt0cnl7X19mZXN0X2F0dHJzWzBdPV9fZmVzdF9lc2NhcGVIVE1MKGpzb24uY29sb3IpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1swXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fXRyeXtfX2Zlc3RfYXR0cnNbMV09X19mZXN0X2VzY2FwZUhUTUwoanNvbi5pZCl9Y2F0Y2goZSl7X19mZXN0X2F0dHJzWzFdPVwiXCI7IF9fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwibm90ZSBub3RlX1wiICsgX19mZXN0X2F0dHJzWzBdICsgXCJcXFwiIGRhdGEtaWQ9XFxcIlwiICsgX19mZXN0X2F0dHJzWzFdICsgXCJcXFwiPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2Nsb3NlXFxcIiBzcmM9XFxcImltZ1xcL2ljb19jbG9zZS5zdmdcXFwiLz48dGV4dGFyZWEgY2xhc3M9XFxcIm5vdGVfX3RleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCINC30LDQvNC10YLQutC4XFxcIiByb3dzPVxcXCI2XFxcIiBtYXhsZW5ndGg9XFxcIjExOVxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoanNvbi50ZXh0KSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjRcIik7fV9fZmVzdF9idWYrPShcIjwvdGV4dGFyZWE+PGRpdiBjbGFzcz1cXFwibm90ZV9fZm9vdGVyXFxcIj48aW1nIGNsYXNzPVxcXCJub3RlX19idXR0b24gbm90ZV9fYnV0dG9uX2NvbG9yIGpzLXNldC1jb2xvclxcXCIgc3JjPVxcXCJpbWdcXC9pY29fY29sb3Iuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9hZGQtbmV3IGpzLWFkZC1uZXdcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2FkZC5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJub3RlX19idXR0b24gbm90ZV9fYnV0dG9uX2xpbmsganMtZ2V0LWxpbmtcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2xpbmsuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9zYXZlIGpzLXNhdmVcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX3NhdmUuc3ZnXFxcIi8+PC9kaXY+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9ub3RlL25vdGUueG1sLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxkaXYgY2xhc3M9XFxcImFwcFxcXCI+PGRpdiBjbGFzcz1cXFwiYXBwX19zaWRlYmFyXFxcIj48ZGl2IGNsYXNzPVxcXCJhcHBfX2xvZ29cXFwiPjxpbWcgY2xhc3M9XFxcImFwcF9fdGl0bGVcXFwiIHNyYz1cXFwiaW1nXFwvbG9nb190ZXh0LnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcImFwcF9faWNvblxcXCIgc3JjPVxcXCJpbWdcXC9sb2dvX21hcmsuc3ZnXFxcIi8+PC9kaXY+PGhyIGNsYXNzPVxcXCJhcHBfX2hyXFxcIi8+PGRpdiBjbGFzcz1cXFwiYXBwX19tZW51IGpzLW1lbnVcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImFwcF9fZm9ybSBqcy1tZW51LWZvcm1cXFwiPjwvZGl2PjxociBjbGFzcz1cXFwiYXBwX19oclxcXCIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImFwcF9fbm90ZXMganMtbm90ZXNcXFwiPjwvZGl2PjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvYXBwL2FwcC54bWwuanMiXSwic291cmNlUm9vdCI6IiJ9