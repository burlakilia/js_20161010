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
	            var noteNode = this.node.querySelector('.js-notes').appendChild(div);
	
	            noteNode.querySelector('.js-close').addEventListener('click', this.delNote.bind(this));
	            noteNode.querySelector('.js-add-new').addEventListener('click', this.newNote.bind(this));
	            noteNode.querySelector('.note__text').addEventListener('change', this.saveNoteText.bind(this));
	        }
	    }, {
	        key: 'indexOfNoteInNotesData',
	        value: function indexOfNoteInNotesData(event) {
	            var noteNode = event.target.parentNode;
	            var noteId = noteNode.dataset.id;
	
	            return notesData.findIndex(function (note) {
	                return note.id === +noteId;
	            });
	        }
	    }, {
	        key: 'delNote',
	        value: function delNote(event) {
	
	            notesData.splice(this.indexOfNoteInNotesData(event), 1);
	
	            event.target.parentNode.remove();
	        }
	    }, {
	        key: 'newNote',
	        value: function newNote() {
	            var tags = ['all'];
	            var pageLocation = '' || location.hash.replace('#', '');
	            if (pageLocation) {
	                tags.push(pageLocation);
	            }
	
	            var id = 1; //если заметок нет
	            id = notesData.slice(-1)[0].id + 1 || id;
	
	            var newNoteData = {
	                id: id,
	                type: 'text',
	                color: 'yellow',
	                tags: tags
	            };
	
	            notesData.push(newNoteData);
	
	            pageLocation ? this.notesFilter(pageLocation) : this.renderNotes(notesData);
	        }
	    }, {
	        key: 'saveNoteText',
	        value: function saveNoteText(event) {
	
	            notesData[this.indexOfNoteInNotesData(event)].text = event.target.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODFlNGUwYmE3ZmIzNzcyNzMxOTYiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL21lbnUvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sIm5hbWVzIjpbIm1lbnVEYXRhIiwibGlzdCIsInRpdGxlIiwibmFtZSIsIm5vdGVzRGF0YSIsImlkIiwidHlwZSIsInRleHQiLCJjb2xvciIsInRhZ3MiLCJBcHAiLCJub2RlIiwicmVuZGVyIiwibWVudSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm0iLCJub3RlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGQiLCJldmVudCIsImRldGFpbCIsInJlbmRlck5vdGVzIiwic2V0Um91dGUiLCJsb2NhdGlvbiIsImhhc2giLCJyZXBsYWNlIiwicm91dGUiLCJ0b2dnbGVBY3RpdmUiLCJub3Rlc0ZpbHRlciIsImlubmVySFRNTCIsImRhdGEiLCJmb3JFYWNoIiwiYWRkTm90ZSIsIml0ZW0iLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwibm90ZSIsInB1c2giLCJub3RlTm9kZSIsImFwcGVuZENoaWxkIiwiZGVsTm90ZSIsImJpbmQiLCJuZXdOb3RlIiwic2F2ZU5vdGVUZXh0IiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsIm5vdGVJZCIsImRhdGFzZXQiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJpbmRleE9mTm90ZUluTm90ZXNEYXRhIiwicmVtb3ZlIiwicGFnZUxvY2F0aW9uIiwic2xpY2UiLCJuZXdOb3RlRGF0YSIsInZhbHVlIiwiZmlsdGVyRGF0YSIsImZpbHRlciIsImluZGV4T2YiLCJhcHAiLCJib2R5Iiwid2luZG93IiwiTWVudSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImxpbmtzIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaW5rIiwiY2xhc3NMaXN0IiwiYWN0aXZlIiwiX19mZXN0X2NvbnRleHQiLCJfX2Zlc3Rfc2VsZiIsIl9fZmVzdF9idWYiLCJfX2Zlc3RfY2h1bmtzIiwiX19mZXN0X2NodW5rIiwiX19mZXN0X2F0dHJzIiwiX19mZXN0X3NlbGVjdCIsIl9fZmVzdF9pZiIsIl9fZmVzdF9pdGVyYXRvciIsIl9fZmVzdF90byIsIl9fZmVzdF9mbiIsIl9fZmVzdF9odG1sIiwiX19mZXN0X2Jsb2NrcyIsIl9fZmVzdF9wYXJhbXMiLCJfX2Zlc3RfZWxlbWVudCIsIl9fZmVzdF9kZWJ1Z19maWxlIiwiX19mZXN0X2RlYnVnX2xpbmUiLCJfX2Zlc3RfZGVidWdfYmxvY2siLCJfX2Zlc3RfZWxlbWVudF9zdGFjayIsIl9fZmVzdF9zaG9ydF90YWdzIiwiX19mZXN0X2pzY2hhcnMiLCJfX2Zlc3RfanNjaGFyc190ZXN0IiwiX19mZXN0X2h0bWxjaGFycyIsIl9fZmVzdF9odG1sY2hhcnNfdGVzdCIsIl9fZmVzdF9qc2hhc2giLCJfX2Zlc3RfaHRtbGhhc2giLCJfX2Zlc3RfZXNjYXBlSlMiLCJ0ZXN0IiwiX19mZXN0X3JlcGxhY2VKUyIsImNociIsIl9fZmVzdF9lc2NhcGVIVE1MIiwiX19mZXN0X3JlcGxhY2VIVE1MIiwiX19mZXN0X2V4dGVuZCIsImRlc3QiLCJzcmMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fZmVzdF9wYXJhbSIsImZuIiwicGFyYW0iLCJpMThuIiwic3RyIiwiX19fZmVzdF9sb2dfZXJyb3IiLCJfX2Zlc3RfZXJyb3IiLCJjb25zb2xlIiwiZXJyb3IiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX19mZXN0X2xvZ19lcnJvciIsIm1zZyIsIl9fZmVzdF9jYWxsIiwicGFyYW1zIiwiY3AiLCJpIiwianNvbiIsIl9fZmVzdF9pdGVyYXRvcjAiLCJlIiwibWVzc2FnZSIsImxlbmd0aCIsInRyYW5zbGl0ZXJhdGUiLCJydXMiLCJzcGxpdCIsImVuZyIsImVuZ1RvUnVzIiwieCIsImpvaW4iLCJ0b1VwcGVyQ2FzZSIsIkZvcm0iLCJvblN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZWxlbWVudHMiLCJ0b0xvd2VyQ2FzZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiTm90ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVJLEtBQUlBLFdBQVc7QUFDWEMsV0FBTSxDQUNGO0FBQ0lDLGdCQUFPLGFBRFg7QUFFSUMsZUFBTTtBQUZWLE1BREUsRUFLRjtBQUNJRCxnQkFBTyxPQURYO0FBRUlDLGVBQU07QUFGVixNQUxFO0FBREssRUFBZjs7QUFhQSxLQUFJQyxZQUFZLENBQ1o7QUFDSUMsU0FBSSxDQURSO0FBRUlDLFdBQU0sTUFGVjtBQUdJQyxXQUFNLE1BSFY7QUFJSUMsWUFBTyxRQUpYO0FBS0lDLFdBQU0sQ0FBQyxNQUFELEVBQVMsS0FBVDtBQUxWLEVBRFksRUFRWjtBQUNJSixTQUFJLENBRFI7QUFFSUMsV0FBTSxNQUZWO0FBR0lDLFdBQU0sTUFIVjtBQUlJQyxZQUFPLFFBSlg7QUFLSUMsV0FBTSxDQUFDLE1BQUQ7QUFMVixFQVJZLENBQWhCOztLQWlCTUMsRztBQUVGLGtCQUFhQyxJQUFiLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsY0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsTUFBTDs7QUFFQSxjQUFLQyxJQUFMLEdBQVksZUFBU0MsU0FBU0MsYUFBVCxDQUF1QixVQUF2QixDQUFULEVBQTZDZixRQUE3QyxDQUFaO0FBQ0EsY0FBS2dCLElBQUwsR0FBWSxlQUFTRixTQUFTQyxhQUFULENBQXVCLGVBQXZCLENBQVQsQ0FBWjtBQUNBLGNBQUtFLEtBQUwsR0FBYSxFQUFiOztBQUVBLGNBQUtELElBQUwsQ0FBVUwsSUFBVixDQUFlTyxnQkFBZixDQUFnQyxTQUFoQyxFQUEyQyxpQkFBUztBQUNoRCxtQkFBS0wsSUFBTCxDQUFVTSxHQUFWLENBQWNDLE1BQU1DLE1BQXBCO0FBQ0gsVUFGRDs7QUFJQSxjQUFLQyxXQUFMLENBQWlCbEIsU0FBakI7O0FBRUEsY0FBS21CLFFBQUwsQ0FBY0MsU0FBU0MsSUFBVCxDQUFjQyxPQUFkLENBQXNCLEdBQXRCLEVBQTJCLEVBQTNCLENBQWQ7QUFDSDs7OztrQ0FFU0MsSyxFQUFPO0FBQ2Isa0JBQUtkLElBQUwsQ0FBVWUsWUFBVixDQUF1QkQsS0FBdkI7O0FBRUEsaUJBQUlBLEtBQUosRUFBVztBQUNQLHNCQUFLRSxXQUFMLENBQWlCRixLQUFqQjtBQUNIO0FBQ0o7OztrQ0FFUztBQUNOLGtCQUFLaEIsSUFBTCxDQUFVbUIsU0FBVixHQUFzQix1QkFBdEI7QUFDSDs7O3FDQUVZQyxJLEVBQU07QUFBQTs7QUFDZmpCLHNCQUFTQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DZSxTQUFwQyxHQUFnRCxFQUFoRDtBQUNBQyxrQkFBS0MsT0FBTCxDQUFjO0FBQUEsd0JBQVEsT0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQVI7QUFBQSxjQUFkO0FBQ0g7OztpQ0FFUUEsSSxFQUFNO0FBQ1gsaUJBQUlDLE1BQU1yQixTQUFTc0IsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsaUJBQUlDLE9BQU8sZUFBU0YsR0FBVCxFQUFjRCxJQUFkLENBQVg7O0FBRUEsa0JBQUtqQixLQUFMLENBQVdxQixJQUFYLENBQWdCRCxJQUFoQjtBQUNBLGlCQUFNRSxXQUFXLEtBQUs1QixJQUFMLENBQVVJLGFBQVYsQ0FBd0IsV0FBeEIsRUFBcUN5QixXQUFyQyxDQUFpREwsR0FBakQsQ0FBakI7O0FBRUFJLHNCQUFTeEIsYUFBVCxDQUF1QixXQUF2QixFQUFvQ0csZ0JBQXBDLENBQXFELE9BQXJELEVBQThELEtBQUt1QixPQUFMLENBQWFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBOUQ7QUFDQUgsc0JBQVN4QixhQUFULENBQXVCLGFBQXZCLEVBQXNDRyxnQkFBdEMsQ0FBdUQsT0FBdkQsRUFBZ0UsS0FBS3lCLE9BQUwsQ0FBYUQsSUFBYixDQUFrQixJQUFsQixDQUFoRTtBQUNBSCxzQkFBU3hCLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0NHLGdCQUF0QyxDQUF1RCxRQUF2RCxFQUFpRSxLQUFLMEIsWUFBTCxDQUFrQkYsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBakU7QUFDSDs7O2dEQUV1QnRCLEssRUFBTztBQUMzQixpQkFBTW1CLFdBQVduQixNQUFNeUIsTUFBTixDQUFhQyxVQUE5QjtBQUNBLGlCQUFNQyxTQUFTUixTQUFTUyxPQUFULENBQWlCM0MsRUFBaEM7O0FBRUEsb0JBQU9ELFVBQVU2QyxTQUFWLENBQXFCO0FBQUEsd0JBQVFaLEtBQUtoQyxFQUFMLEtBQVksQ0FBQzBDLE1BQXJCO0FBQUEsY0FBckIsQ0FBUDtBQUNIOzs7aUNBRVEzQixLLEVBQU87O0FBRVpoQix1QkFBVThDLE1BQVYsQ0FBaUIsS0FBS0Msc0JBQUwsQ0FBNEIvQixLQUE1QixDQUFqQixFQUFxRCxDQUFyRDs7QUFFQUEsbUJBQU15QixNQUFOLENBQWFDLFVBQWIsQ0FBd0JNLE1BQXhCO0FBQ0g7OzttQ0FFVTtBQUNQLGlCQUFJM0MsT0FBTyxDQUFDLEtBQUQsQ0FBWDtBQUNBLGlCQUFNNEMsZUFBZSxNQUFNN0IsU0FBU0MsSUFBVCxDQUFjQyxPQUFkLENBQXNCLEdBQXRCLEVBQTJCLEVBQTNCLENBQTNCO0FBQ0EsaUJBQUkyQixZQUFKLEVBQWtCO0FBQ2Q1QyxzQkFBSzZCLElBQUwsQ0FBVWUsWUFBVjtBQUNIOztBQUVELGlCQUFJaEQsS0FBSyxDQUFULENBUE8sQ0FPSztBQUNaQSxrQkFBS0QsVUFBVWtELEtBQVYsQ0FBZ0IsQ0FBQyxDQUFqQixFQUFvQixDQUFwQixFQUF1QmpELEVBQXZCLEdBQTRCLENBQTVCLElBQWlDQSxFQUF0Qzs7QUFFQSxpQkFBTWtELGNBQWM7QUFDaEJsRCxxQkFBSUEsRUFEWTtBQUVoQkMsdUJBQU0sTUFGVTtBQUdoQkUsd0JBQU8sUUFIUztBQUloQkMsdUJBQU1BO0FBSlUsY0FBcEI7O0FBT0FMLHVCQUFVa0MsSUFBVixDQUFlaUIsV0FBZjs7QUFFQUYsNEJBQWUsS0FBS3hCLFdBQUwsQ0FBaUJ3QixZQUFqQixDQUFmLEdBQWdELEtBQUsvQixXQUFMLENBQWlCbEIsU0FBakIsQ0FBaEQ7QUFDSDs7O3NDQUVhZ0IsSyxFQUFPOztBQUVqQmhCLHVCQUFVLEtBQUsrQyxzQkFBTCxDQUE0Qi9CLEtBQTVCLENBQVYsRUFBOENiLElBQTlDLEdBQXFEYSxNQUFNeUIsTUFBTixDQUFhVyxLQUFsRTtBQUVIOzs7cUNBRVk3QixLLEVBQU87QUFDaEIsaUJBQU04QixhQUFhckQsVUFBVXNELE1BQVYsQ0FBaUIsVUFBQ3JCLElBQUQsRUFBVTtBQUMxQyx3QkFBT0EsS0FBSzVCLElBQUwsQ0FBVWtELE9BQVYsQ0FBa0JoQyxLQUFsQixNQUE2QixDQUFDLENBQXJDO0FBQ0gsY0FGa0IsQ0FBbkI7O0FBSUEsa0JBQUtMLFdBQUwsQ0FBaUJtQyxVQUFqQjtBQUNIOzs7Ozs7QUFJTDNDLFVBQVNJLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hELFNBQUkwQyxNQUFNLElBQUlsRCxHQUFKLENBQVFJLFNBQVMrQyxJQUFqQixDQUFWOztBQUVKQyxZQUFPNUMsZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MsWUFBTTtBQUN4QzBDLGFBQUlyQyxRQUFKLENBQWFDLFNBQVNDLElBQVQsQ0FBY0MsT0FBZCxDQUFzQixHQUF0QixFQUEyQixFQUEzQixDQUFiO0FBQ0gsTUFGRDtBQUlILEVBUEcsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SUo7Ozs7Ozs7O0tBR01xQyxJO0FBRUYsbUJBQVlwRCxJQUFaLEVBQWtCb0IsSUFBbEIsRUFBd0I7QUFBQTs7QUFDcEIsY0FBS0EsSUFBTCxHQUFZaUMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWVuQyxJQUFmLENBQVgsQ0FBWjs7QUFFQSxhQUFJLFFBQU9BLElBQVAseUNBQU9BLElBQVAsTUFBZSxRQUFuQixFQUE2QjtBQUN6QixrQkFBS3BCLElBQUwsR0FBWSxLQUFLQyxNQUFMLENBQVlELElBQVosRUFBa0JvQixJQUFsQixDQUFaO0FBQ0gsVUFGRCxNQUVPO0FBQ0gsa0JBQUtwQixJQUFMLEdBQVlBLElBQVo7QUFDSDs7QUFFRDtBQUNBO0FBQ0g7Ozs7Z0NBRU1BLEksRUFBTW9CLEksRUFBTTtBQUNmcEIsa0JBQUttQixTQUFMLEdBQWlCLHVCQUFTQyxJQUFULENBQWpCO0FBQ0Esb0JBQU9wQixJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs2QkFNSXVCLEksRUFBTTtBQUNOLGtCQUFLSCxJQUFMLENBQVU5QixJQUFWLENBQWVxQyxJQUFmLENBQW9CSixJQUFwQjtBQUNBLGtCQUFLdEIsTUFBTCxDQUFZLEtBQUtELElBQWpCLEVBQXVCLEtBQUtvQixJQUE1QjtBQUNIOztBQUVEOzs7Ozs7O3NDQUljNUIsSSxFQUFNO0FBQ2hCLGlCQUFJZ0UsUUFBUSxHQUFHYixLQUFILENBQVNjLElBQVQsQ0FBYyxLQUFLekQsSUFBTCxDQUFVMEQsZ0JBQVYsQ0FBMkIsYUFBM0IsQ0FBZCxDQUFaOztBQUVBRixtQkFBTW5DLE9BQU4sQ0FBZSxnQkFBUTtBQUNuQnNDLHNCQUFLQyxTQUFMLENBQWVuQixNQUFmLENBQXNCLG1CQUF0QjtBQUNILGNBRkQ7O0FBSUEsaUJBQUlvQixTQUFTLEtBQUs3RCxJQUFMLENBQVVJLGFBQVYscUJBQTBDWixJQUExQyxDQUFiOztBQUVBLGlCQUFJcUUsTUFBSixFQUFZO0FBQ1JBLHdCQUFPRCxTQUFQLENBQWlCcEQsR0FBakIsQ0FBcUIsbUJBQXJCO0FBQ0g7QUFFSjs7Ozs7O1NBSUk0QyxJLEdBQUFBLEk7Ozs7Ozs7Ozs7OzttQkN2RE0sVUFBVVUsY0FBVixFQUF5QjtBQUFDO0FBQWEsTUFBSUMsY0FBWSxJQUFoQjtBQUFBLE1BQXFCQyxhQUFXLEVBQWhDO0FBQUEsTUFBbUNDLGdCQUFjLEVBQWpEO0FBQUEsTUFBb0RDLFlBQXBEO0FBQUEsTUFBaUVDLGVBQWEsRUFBOUU7QUFBQSxNQUFpRkMsYUFBakY7QUFBQSxNQUErRkMsU0FBL0Y7QUFBQSxNQUF5R0MsZUFBekc7QUFBQSxNQUF5SEMsU0FBekg7QUFBQSxNQUFtSUMsU0FBbkk7QUFBQSxNQUE2SUMsY0FBWSxFQUF6SjtBQUFBLE1BQTRKQyxnQkFBYyxFQUExSztBQUFBLE1BQTZLQyxhQUE3SztBQUFBLE1BQTJMQyxjQUEzTDtBQUFBLE1BQTBNQyxvQkFBa0IsRUFBNU47QUFBQSxNQUErTkMsb0JBQWtCLEVBQWpQO0FBQUEsTUFBb1BDLHFCQUFtQixFQUF2UTtBQUFBLE1BQTBRQyx1QkFBdUIsRUFBalM7QUFBQSxNQUFvU0Msb0JBQW9CLEVBQUMsUUFBUSxJQUFULEVBQWUsUUFBUSxJQUF2QixFQUE2QixNQUFNLElBQW5DLEVBQXlDLE9BQU8sSUFBaEQsRUFBc0QsV0FBVyxJQUFqRSxFQUF1RSxTQUFTLElBQWhGLEVBQXNGLE1BQU0sSUFBNUYsRUFBa0csT0FBTyxJQUF6RyxFQUErRyxTQUFTLElBQXhILEVBQThILFVBQVUsSUFBeEksRUFBOEksUUFBUSxJQUF0SixFQUE0SixRQUFRLElBQXBLLEVBQTBLLFNBQVMsSUFBbkwsRUFBeUwsVUFBVSxJQUFuTSxFQUF5TSxPQUFPLElBQWhOLEVBQXhUO0FBQUEsTUFBOGdCQyxpQkFBaUIsdUJBQS9oQjtBQUFBLE1BQXVqQkMsc0JBQXNCLHNCQUE3a0I7QUFBQSxNQUFvbUJDLG1CQUFtQixTQUF2bkI7QUFBQSxNQUFpb0JDLHdCQUF3QixRQUF6cEI7QUFBQSxNQUFrcUJDLGdCQUFnQixFQUFDLE1BQU0sTUFBUCxFQUFlLE1BQU0sTUFBckIsRUFBNkIsS0FBSyxLQUFsQyxFQUF5QyxNQUFNLEtBQS9DLEVBQXNELE1BQU0sS0FBNUQsRUFBbUUsTUFBTSxLQUF6RSxFQUFnRixNQUFNLEtBQXRGLEVBQTZGLE1BQU0sS0FBbkcsRUFBMEcsS0FBSyxLQUEvRyxFQUFzSCxLQUFLLFNBQTNILEVBQXNJLEtBQUssU0FBM0ksRUFBbHJCO0FBQUEsTUFBdzBCQyxrQkFBa0IsRUFBQyxLQUFLLE9BQU4sRUFBZSxLQUFLLE1BQXBCLEVBQTRCLEtBQUssTUFBakMsRUFBeUMsTUFBTSxRQUEvQyxFQUExMUI7QUFBQSxNQUFtNUJDLGtCQUFrQixTQUFTQSxlQUFULENBQXlCM0MsS0FBekIsRUFBZ0M7QUFDei9CLE9BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixRQUFJc0Msb0JBQW9CTSxJQUFwQixDQUF5QjVDLEtBQXpCLENBQUosRUFBcUM7QUFDcEMsWUFBT0EsTUFBTTlCLE9BQU4sQ0FBY21FLGNBQWQsRUFBOEJRLGdCQUE5QixDQUFQO0FBQ0E7QUFDRDs7QUFFRCxVQUFPN0MsU0FBUyxJQUFULEdBQWdCLEVBQWhCLEdBQXFCQSxLQUE1QjtBQUNBLEdBUm9EO0FBQUEsTUFRbkQ2QyxtQkFBbUIsU0FBU0EsZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQ25ELFVBQU9MLGNBQWNLLEdBQWQsQ0FBUDtBQUNBLEdBVm9EO0FBQUEsTUFVbkRDLG9CQUFvQixTQUFTQSxpQkFBVCxDQUEyQi9DLEtBQTNCLEVBQWtDO0FBQ3ZELE9BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixRQUFJd0Msc0JBQXNCSSxJQUF0QixDQUEyQjVDLEtBQTNCLENBQUosRUFBdUM7QUFDdEMsWUFBT0EsTUFBTTlCLE9BQU4sQ0FBY3FFLGdCQUFkLEVBQWdDUyxrQkFBaEMsQ0FBUDtBQUNBO0FBQ0Q7O0FBRUQsVUFBT2hELFNBQVMsSUFBVCxHQUFnQixFQUFoQixHQUFxQkEsS0FBNUI7QUFDQSxHQWxCb0Q7QUFBQSxNQWtCbkRnRCxxQkFBcUIsU0FBU0Esa0JBQVQsQ0FBNEJGLEdBQTVCLEVBQWlDO0FBQ3ZELFVBQU9KLGdCQUFnQkksR0FBaEIsQ0FBUDtBQUNBLEdBcEJvRDtBQUFBLE1Bb0JuREcsZ0JBQWdCLFNBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxHQUE3QixFQUFrQztBQUNuRCxRQUFLLElBQUlDLEdBQVQsSUFBZ0JELEdBQWhCLEVBQXFCO0FBQ3BCLFFBQUlBLElBQUlFLGNBQUosQ0FBbUJELEdBQW5CLENBQUosRUFBNkI7QUFDNUJGLFVBQUtFLEdBQUwsSUFBWUQsSUFBSUMsR0FBSixDQUFaO0FBQ0E7QUFDRDtBQUNELEdBMUJvRDtBQUFBLE1BMEJuREUsZUFBZSxTQUFTQSxZQUFULENBQXNCQyxFQUF0QixFQUEwQjtBQUMxQ0EsTUFBR0MsS0FBSCxHQUFXLElBQVg7QUFDQSxVQUFPRCxFQUFQO0FBQ0EsR0E3Qm9EO0FBQUEsTUE2Qm5ERSxPQUFLdkMsZUFBZSxPQUFPQSxZQUFZdUMsSUFBbkIsS0FBNEIsVUFBM0MsR0FBd0R2QyxZQUFZdUMsSUFBcEUsR0FBMkUsVUFBVUMsR0FBVixFQUFlO0FBQUMsVUFBT0EsR0FBUDtBQUFZLEdBN0J6RDtBQUFBLE1BNkIwREMsaUJBN0IxRCxDQTZCNEUsSUFBRyxPQUFPQyxZQUFQLEtBQXdCLFdBQTNCLEVBQXVDO0FBQUNELHVCQUFxQixPQUFPRSxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxRQUFRQyxLQUEzQyxHQUFvRCxZQUFVO0FBQUMsV0FBT0MsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJyRCxJQUF6QixDQUE4QmlELFFBQVFDLEtBQXRDLEVBQTZDRCxPQUE3QyxFQUFzREssU0FBdEQsQ0FBUDtBQUF3RSxJQUF2SSxHQUEwSSxZQUFVLENBQUUsQ0FBMUs7QUFBNEssR0FBcE4sTUFBd047QUFBQ1AsdUJBQWtCQyxZQUFsQjtBQUErQixJQUFDLFNBQVNPLGdCQUFULENBQTBCQyxHQUExQixFQUE4QjtBQUFDVCxxQkFBa0JTLE1BQUksZUFBSixHQUFvQmxDLGtCQUFwQixHQUF1QyxjQUF2QyxHQUFzREQsaUJBQXRELEdBQXdFLFVBQXhFLEdBQW1GRCxpQkFBckc7QUFBd0gsWUFBU3FDLFdBQVQsQ0FBcUJkLEVBQXJCLEVBQXlCZSxNQUF6QixFQUFnQ0MsRUFBaEMsRUFBbUM7QUFBQyxPQUFHQSxFQUFILEVBQU0sS0FBSSxJQUFJQyxDQUFSLElBQWFGLE1BQWI7QUFBb0IsUUFBRyxPQUFPQSxPQUFPRSxDQUFQLENBQVAsSUFBa0IsVUFBbEIsSUFBOEJGLE9BQU9FLENBQVAsRUFBVWhCLEtBQTNDLEVBQWlEYyxPQUFPRSxDQUFQLElBQVVGLE9BQU9FLENBQVAsR0FBVjtBQUFyRSxJQUEyRixPQUFPakIsR0FBRzNDLElBQUgsQ0FBUU0sV0FBUixFQUFvQm9ELE1BQXBCLENBQVA7QUFBbUMsT0FBSUcsT0FBS3hELGNBQVQsQ0FBd0JFLGNBQWEsK0NBQWIsQ0FBOEQsSUFBSXFELENBQUosRUFBTTlGLElBQU4sRUFBV2dHLGdCQUFYLENBQTRCLElBQUc7QUFBQ0Esc0JBQWlCRCxLQUFLaEksSUFBTCxJQUFhLEVBQTlCO0FBQWtDLEdBQXRDLENBQXNDLE9BQU1rSSxDQUFOLEVBQVE7QUFBQ2xELHFCQUFnQixFQUFoQixDQUFtQjBDLGlCQUFpQlEsRUFBRUMsT0FBbkI7QUFBNkIsUUFBSUosQ0FBSixJQUFTRSxnQkFBVCxFQUEwQjtBQUFDaEcsVUFBS2dHLGlCQUFpQkYsQ0FBakIsQ0FBTCxDQUF5QnJELGNBQWEsMkJBQWIsQ0FBMEMsSUFBRztBQUFDRyxpQkFBYSxDQUFiLElBQWdCeUIsa0JBQWtCckUsS0FBSy9CLElBQXZCLENBQWhCO0FBQTZDLElBQWpELENBQWlELE9BQU1nSSxDQUFOLEVBQVE7QUFBQ3JELGlCQUFhLENBQWIsSUFBZ0IsRUFBaEIsQ0FBb0I2QyxpQkFBaUJRLEVBQUVDLE9BQW5CO0FBQTZCLFFBQUc7QUFBQ3RELGlCQUFhLENBQWIsSUFBZ0J5QixrQkFBa0JyRSxLQUFLL0IsSUFBdkIsQ0FBaEI7QUFBNkMsSUFBakQsQ0FBaUQsT0FBTWdJLENBQU4sRUFBUTtBQUFDckQsaUJBQWEsQ0FBYixJQUFnQixFQUFoQixDQUFvQjZDLGlCQUFpQlEsRUFBRUMsT0FBbkI7QUFBNkIsa0JBQWEsOEJBQThCdEQsYUFBYSxDQUFiLENBQTlCLEdBQWdELGFBQWhELEdBQWdFQSxhQUFhLENBQWIsQ0FBaEUsR0FBa0YsS0FBL0YsQ0FBc0csSUFBRztBQUFDSCxrQkFBYTRCLGtCQUFrQnJFLEtBQUtoQyxLQUF2QixDQUFiO0FBQTRDLElBQWhELENBQWdELE9BQU1pSSxDQUFOLEVBQVE7QUFBQ1IscUJBQWlCUSxFQUFFQyxPQUFGLEdBQVksR0FBN0I7QUFBbUMsa0JBQWEsV0FBYjtBQUEyQixpQkFBYSxhQUFiLENBQTRCbEQsWUFBVU4sY0FBY3lELE1BQXhCLENBQStCLElBQUluRCxTQUFKLEVBQWU7QUFBQ0QscUJBQWtCLENBQWxCLENBQW9CLE9BQU1BLGtCQUFnQkMsU0FBdEIsRUFBZ0NELGlCQUFoQyxFQUFtRDtBQUFDSixtQkFBYUQsY0FBY0ssZUFBZCxDQUFiLENBQTRDLElBQUksT0FBT0osWUFBUCxLQUFzQixRQUExQixFQUFvQztBQUFDTyxvQkFBYVAsWUFBYjtBQUEyQixLQUFoRSxNQUFzRTtBQUFDTSxpQkFBVUUsY0FBY1IsYUFBYTFFLElBQTNCLENBQVYsQ0FBMkMsSUFBSWdGLFNBQUosRUFBZUMsZUFBYXlDLFlBQVkxQyxTQUFaLEVBQXNCTixhQUFhaUQsTUFBbkMsRUFBMENqRCxhQUFha0QsRUFBdkQsQ0FBYjtBQUF5RTtBQUFDLFdBQU8zQyxjQUFZVCxVQUFuQjtBQUErQixHQUE5VyxNQUFvWDtBQUFDLFVBQU9BLFVBQVA7QUFBbUI7QUFBQyxFOzs7Ozs7Ozs7Ozs7O3NqQkM3QmgyRDs7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDQSxLQUFJMkQsZ0JBQWlCLFlBQVk7QUFDN0IsU0FDSUMsTUFBTSxnRkFBZ0ZDLEtBQWhGLENBQXNGLEtBQXRGLENBRFY7QUFBQSxTQUVJQyxNQUFNLGdGQUFnRkQsS0FBaEYsQ0FBc0YsS0FBdEYsQ0FGVjtBQUlBLFlBQU8sVUFBU2pJLElBQVQsRUFBZW1JLFFBQWYsRUFBeUI7QUFDNUIsYUFBSUMsQ0FBSjtBQUNBLGNBQUlBLElBQUksQ0FBUixFQUFXQSxJQUFJSixJQUFJRixNQUFuQixFQUEyQk0sR0FBM0IsRUFBZ0M7QUFDNUJwSSxvQkFBT0EsS0FBS2lJLEtBQUwsQ0FBV0UsV0FBV0QsSUFBSUUsQ0FBSixDQUFYLEdBQW9CSixJQUFJSSxDQUFKLENBQS9CLEVBQXVDQyxJQUF2QyxDQUE0Q0YsV0FBV0gsSUFBSUksQ0FBSixDQUFYLEdBQW9CRixJQUFJRSxDQUFKLENBQWhFLENBQVA7QUFDQXBJLG9CQUFPQSxLQUFLaUksS0FBTCxDQUFXRSxXQUFXRCxJQUFJRSxDQUFKLEVBQU9FLFdBQVAsRUFBWCxHQUFrQ04sSUFBSUksQ0FBSixFQUFPRSxXQUFQLEVBQTdDLEVBQW1FRCxJQUFuRSxDQUF3RUYsV0FBV0gsSUFBSUksQ0FBSixFQUFPRSxXQUFQLEVBQVgsR0FBa0NKLElBQUlFLENBQUosRUFBT0UsV0FBUCxFQUExRyxDQUFQO0FBQ0g7QUFDRCxnQkFBT3RJLElBQVA7QUFDSCxNQVBEO0FBUUgsRUFibUIsRUFBcEI7O0tBZU11SSxJO0FBRUYsbUJBQVluSSxJQUFaLEVBQWtCRSxJQUFsQixFQUF3QjtBQUFBOztBQUNwQixjQUFLQSxJQUFMLEdBQVdBLElBQVg7QUFDQSxjQUFLRixJQUFMLEdBQVksS0FBS0MsTUFBTCxDQUFZRCxJQUFaLENBQVo7O0FBRUEsY0FBS0ssSUFBTCxHQUFZLEtBQUtMLElBQUwsQ0FBVUksYUFBVixDQUF3QixVQUF4QixDQUFaO0FBQ0EsY0FBS0MsSUFBTCxDQUFVRSxnQkFBVixDQUEyQixRQUEzQixFQUFxQyxLQUFLNkgsUUFBTCxDQUFjckcsSUFBZCxDQUFtQixJQUFuQixDQUFyQztBQUNIOzs7O2dDQUVNL0IsSSxFQUFNO0FBQ1RBLGtCQUFLbUIsU0FBTCxHQUFpQix3QkFBakI7QUFDQSxvQkFBT25CLElBQVA7QUFDSDs7O2tDQUVRUyxLLEVBQU87QUFDWkEsbUJBQU00SCxjQUFOOztBQUVBLGtCQUFLckksSUFBTCxDQUFVc0ksYUFBVixDQUF3QixJQUFJQyxXQUFKLENBQWdCLFNBQWhCLEVBQTJCO0FBQzNDN0gseUJBQVE7QUFDSm5CLDRCQUFPLEtBQUtjLElBQUwsQ0FBVW1JLFFBQVYsQ0FBbUJqSixLQUFuQixDQUF5QnNELEtBRDVCO0FBRUpyRCwyQkFBTW1JLGNBQWMsS0FBS3RILElBQUwsQ0FBVW1JLFFBQVYsQ0FBbUJqSixLQUFuQixDQUF5QnNELEtBQXZDLEVBQThDNEYsV0FBOUM7QUFGRixrQkFEbUM7QUFLM0NDLDBCQUFTLElBTGtDO0FBTTNDQyw2QkFBWTtBQU4rQixjQUEzQixDQUF4QjtBQVVIOzs7Ozs7U0FJSVIsSSxHQUFBQSxJOzs7Ozs7Ozs7Ozs7bUJDbkRNLFVBQVVyRSxjQUFWLEVBQXlCO0FBQUM7QUFBYSxNQUFJQyxjQUFZLElBQWhCO0FBQUEsTUFBcUJDLGFBQVcsRUFBaEM7QUFBQSxNQUFtQ0MsZ0JBQWMsRUFBakQ7QUFBQSxNQUFvREMsWUFBcEQ7QUFBQSxNQUFpRUMsZUFBYSxFQUE5RTtBQUFBLE1BQWlGQyxhQUFqRjtBQUFBLE1BQStGQyxTQUEvRjtBQUFBLE1BQXlHQyxlQUF6RztBQUFBLE1BQXlIQyxTQUF6SDtBQUFBLE1BQW1JQyxTQUFuSTtBQUFBLE1BQTZJQyxjQUFZLEVBQXpKO0FBQUEsTUFBNEpDLGdCQUFjLEVBQTFLO0FBQUEsTUFBNktDLGFBQTdLO0FBQUEsTUFBMkxDLGNBQTNMO0FBQUEsTUFBME1DLG9CQUFrQixFQUE1TjtBQUFBLE1BQStOQyxvQkFBa0IsRUFBalA7QUFBQSxNQUFvUEMscUJBQW1CLEVBQXZRO0FBQUEsTUFBMFFDLHVCQUF1QixFQUFqUztBQUFBLE1BQW9TQyxvQkFBb0IsRUFBQyxRQUFRLElBQVQsRUFBZSxRQUFRLElBQXZCLEVBQTZCLE1BQU0sSUFBbkMsRUFBeUMsT0FBTyxJQUFoRCxFQUFzRCxXQUFXLElBQWpFLEVBQXVFLFNBQVMsSUFBaEYsRUFBc0YsTUFBTSxJQUE1RixFQUFrRyxPQUFPLElBQXpHLEVBQStHLFNBQVMsSUFBeEgsRUFBOEgsVUFBVSxJQUF4SSxFQUE4SSxRQUFRLElBQXRKLEVBQTRKLFFBQVEsSUFBcEssRUFBMEssU0FBUyxJQUFuTCxFQUF5TCxVQUFVLElBQW5NLEVBQXlNLE9BQU8sSUFBaE4sRUFBeFQ7QUFBQSxNQUE4Z0JDLGlCQUFpQix1QkFBL2hCO0FBQUEsTUFBdWpCQyxzQkFBc0Isc0JBQTdrQjtBQUFBLE1BQW9tQkMsbUJBQW1CLFNBQXZuQjtBQUFBLE1BQWlvQkMsd0JBQXdCLFFBQXpwQjtBQUFBLE1BQWtxQkMsZ0JBQWdCLEVBQUMsTUFBTSxNQUFQLEVBQWUsTUFBTSxNQUFyQixFQUE2QixLQUFLLEtBQWxDLEVBQXlDLE1BQU0sS0FBL0MsRUFBc0QsTUFBTSxLQUE1RCxFQUFtRSxNQUFNLEtBQXpFLEVBQWdGLE1BQU0sS0FBdEYsRUFBNkYsTUFBTSxLQUFuRyxFQUEwRyxLQUFLLEtBQS9HLEVBQXNILEtBQUssU0FBM0gsRUFBc0ksS0FBSyxTQUEzSSxFQUFsckI7QUFBQSxNQUF3MEJDLGtCQUFrQixFQUFDLEtBQUssT0FBTixFQUFlLEtBQUssTUFBcEIsRUFBNEIsS0FBSyxNQUFqQyxFQUF5QyxNQUFNLFFBQS9DLEVBQTExQjtBQUFBLE1BQW01QkMsa0JBQWtCLFNBQVNBLGVBQVQsQ0FBeUIzQyxLQUF6QixFQUFnQztBQUN6L0IsT0FBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzlCLFFBQUlzQyxvQkFBb0JNLElBQXBCLENBQXlCNUMsS0FBekIsQ0FBSixFQUFxQztBQUNwQyxZQUFPQSxNQUFNOUIsT0FBTixDQUFjbUUsY0FBZCxFQUE4QlEsZ0JBQTlCLENBQVA7QUFDQTtBQUNEOztBQUVELFVBQU83QyxTQUFTLElBQVQsR0FBZ0IsRUFBaEIsR0FBcUJBLEtBQTVCO0FBQ0EsR0FSb0Q7QUFBQSxNQVFuRDZDLG1CQUFtQixTQUFTQSxnQkFBVCxDQUEwQkMsR0FBMUIsRUFBK0I7QUFDbkQsVUFBT0wsY0FBY0ssR0FBZCxDQUFQO0FBQ0EsR0FWb0Q7QUFBQSxNQVVuREMsb0JBQW9CLFNBQVNBLGlCQUFULENBQTJCL0MsS0FBM0IsRUFBa0M7QUFDdkQsT0FBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzlCLFFBQUl3QyxzQkFBc0JJLElBQXRCLENBQTJCNUMsS0FBM0IsQ0FBSixFQUF1QztBQUN0QyxZQUFPQSxNQUFNOUIsT0FBTixDQUFjcUUsZ0JBQWQsRUFBZ0NTLGtCQUFoQyxDQUFQO0FBQ0E7QUFDRDs7QUFFRCxVQUFPaEQsU0FBUyxJQUFULEdBQWdCLEVBQWhCLEdBQXFCQSxLQUE1QjtBQUNBLEdBbEJvRDtBQUFBLE1Ba0JuRGdELHFCQUFxQixTQUFTQSxrQkFBVCxDQUE0QkYsR0FBNUIsRUFBaUM7QUFDdkQsVUFBT0osZ0JBQWdCSSxHQUFoQixDQUFQO0FBQ0EsR0FwQm9EO0FBQUEsTUFvQm5ERyxnQkFBZ0IsU0FBU0EsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkJDLEdBQTdCLEVBQWtDO0FBQ25ELFFBQUssSUFBSUMsR0FBVCxJQUFnQkQsR0FBaEIsRUFBcUI7QUFDcEIsUUFBSUEsSUFBSUUsY0FBSixDQUFtQkQsR0FBbkIsQ0FBSixFQUE2QjtBQUM1QkYsVUFBS0UsR0FBTCxJQUFZRCxJQUFJQyxHQUFKLENBQVo7QUFDQTtBQUNEO0FBQ0QsR0ExQm9EO0FBQUEsTUEwQm5ERSxlQUFlLFNBQVNBLFlBQVQsQ0FBc0JDLEVBQXRCLEVBQTBCO0FBQzFDQSxNQUFHQyxLQUFILEdBQVcsSUFBWDtBQUNBLFVBQU9ELEVBQVA7QUFDQSxHQTdCb0Q7QUFBQSxNQTZCbkRFLE9BQUt2QyxlQUFlLE9BQU9BLFlBQVl1QyxJQUFuQixLQUE0QixVQUEzQyxHQUF3RHZDLFlBQVl1QyxJQUFwRSxHQUEyRSxVQUFVQyxHQUFWLEVBQWU7QUFBQyxVQUFPQSxHQUFQO0FBQVksR0E3QnpEO0FBQUEsTUE2QjBEQyxpQkE3QjFELENBNkI0RSxJQUFHLE9BQU9DLFlBQVAsS0FBd0IsV0FBM0IsRUFBdUM7QUFBQ0QsdUJBQXFCLE9BQU9FLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0NBLFFBQVFDLEtBQTNDLEdBQW9ELFlBQVU7QUFBQyxXQUFPQyxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixDQUF5QnJELElBQXpCLENBQThCaUQsUUFBUUMsS0FBdEMsRUFBNkNELE9BQTdDLEVBQXNESyxTQUF0RCxDQUFQO0FBQXdFLElBQXZJLEdBQTBJLFlBQVUsQ0FBRSxDQUExSztBQUE0SyxHQUFwTixNQUF3TjtBQUFDUCx1QkFBa0JDLFlBQWxCO0FBQStCLElBQUMsU0FBU08sZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQThCO0FBQUNULHFCQUFrQlMsTUFBSSxlQUFKLEdBQW9CbEMsa0JBQXBCLEdBQXVDLGNBQXZDLEdBQXNERCxpQkFBdEQsR0FBd0UsVUFBeEUsR0FBbUZELGlCQUFyRztBQUF3SCxZQUFTcUMsV0FBVCxDQUFxQmQsRUFBckIsRUFBeUJlLE1BQXpCLEVBQWdDQyxFQUFoQyxFQUFtQztBQUFDLE9BQUdBLEVBQUgsRUFBTSxLQUFJLElBQUlDLENBQVIsSUFBYUYsTUFBYjtBQUFvQixRQUFHLE9BQU9BLE9BQU9FLENBQVAsQ0FBUCxJQUFrQixVQUFsQixJQUE4QkYsT0FBT0UsQ0FBUCxFQUFVaEIsS0FBM0MsRUFBaURjLE9BQU9FLENBQVAsSUFBVUYsT0FBT0UsQ0FBUCxHQUFWO0FBQXJFLElBQTJGLE9BQU9qQixHQUFHM0MsSUFBSCxDQUFRTSxXQUFSLEVBQW9Cb0QsTUFBcEIsQ0FBUDtBQUFtQyxpQkFBYSxpSUFBYixDQUFnSjVDLFlBQVVOLGNBQWN5RCxNQUF4QixDQUErQixJQUFJbkQsU0FBSixFQUFlO0FBQUNELHFCQUFrQixDQUFsQixDQUFvQixPQUFNQSxrQkFBZ0JDLFNBQXRCLEVBQWdDRCxpQkFBaEMsRUFBbUQ7QUFBQ0osbUJBQWFELGNBQWNLLGVBQWQsQ0FBYixDQUE0QyxJQUFJLE9BQU9KLFlBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFBQ08sb0JBQWFQLFlBQWI7QUFBMkIsS0FBaEUsTUFBc0U7QUFBQ00saUJBQVVFLGNBQWNSLGFBQWExRSxJQUEzQixDQUFWLENBQTJDLElBQUlnRixTQUFKLEVBQWVDLGVBQWF5QyxZQUFZMUMsU0FBWixFQUFzQk4sYUFBYWlELE1BQW5DLEVBQTBDakQsYUFBYWtELEVBQXZELENBQWI7QUFBeUU7QUFBQyxXQUFPM0MsY0FBWVQsVUFBbkI7QUFBK0IsR0FBOVcsTUFBb1g7QUFBQyxVQUFPQSxVQUFQO0FBQW1CO0FBQUMsRTs7Ozs7Ozs7Ozs7Ozs7O0FDN0JsdkM7Ozs7Ozs7O0tBRU00RSxJO0FBRUYsbUJBQVk1SSxJQUFaLEVBQWtCb0IsSUFBbEIsRUFBd0I7QUFBQTs7QUFDcEIsY0FBS3BCLElBQUwsR0FBWUEsSUFBWjtBQUNBLGNBQUtvQixJQUFMLEdBQVlBLElBQVo7QUFDQSxjQUFLbkIsTUFBTDtBQUVIOzs7O2tDQUVRO0FBQ0wsa0JBQUtELElBQUwsQ0FBVW1CLFNBQVYsR0FBc0IsdUJBQVMsS0FBS0MsSUFBZCxDQUF0QjtBQUNIOzs7Ozs7U0FHSXdILEksR0FBQUEsSTs7Ozs7Ozs7Ozs7O21CQ2hCTSxVQUFVOUUsY0FBVixFQUF5QjtBQUFDO0FBQWEsTUFBSUMsY0FBWSxJQUFoQjtBQUFBLE1BQXFCQyxhQUFXLEVBQWhDO0FBQUEsTUFBbUNDLGdCQUFjLEVBQWpEO0FBQUEsTUFBb0RDLFlBQXBEO0FBQUEsTUFBaUVDLGVBQWEsRUFBOUU7QUFBQSxNQUFpRkMsYUFBakY7QUFBQSxNQUErRkMsU0FBL0Y7QUFBQSxNQUF5R0MsZUFBekc7QUFBQSxNQUF5SEMsU0FBekg7QUFBQSxNQUFtSUMsU0FBbkk7QUFBQSxNQUE2SUMsY0FBWSxFQUF6SjtBQUFBLE1BQTRKQyxnQkFBYyxFQUExSztBQUFBLE1BQTZLQyxhQUE3SztBQUFBLE1BQTJMQyxjQUEzTDtBQUFBLE1BQTBNQyxvQkFBa0IsRUFBNU47QUFBQSxNQUErTkMsb0JBQWtCLEVBQWpQO0FBQUEsTUFBb1BDLHFCQUFtQixFQUF2UTtBQUFBLE1BQTBRQyx1QkFBdUIsRUFBalM7QUFBQSxNQUFvU0Msb0JBQW9CLEVBQUMsUUFBUSxJQUFULEVBQWUsUUFBUSxJQUF2QixFQUE2QixNQUFNLElBQW5DLEVBQXlDLE9BQU8sSUFBaEQsRUFBc0QsV0FBVyxJQUFqRSxFQUF1RSxTQUFTLElBQWhGLEVBQXNGLE1BQU0sSUFBNUYsRUFBa0csT0FBTyxJQUF6RyxFQUErRyxTQUFTLElBQXhILEVBQThILFVBQVUsSUFBeEksRUFBOEksUUFBUSxJQUF0SixFQUE0SixRQUFRLElBQXBLLEVBQTBLLFNBQVMsSUFBbkwsRUFBeUwsVUFBVSxJQUFuTSxFQUF5TSxPQUFPLElBQWhOLEVBQXhUO0FBQUEsTUFBOGdCQyxpQkFBaUIsdUJBQS9oQjtBQUFBLE1BQXVqQkMsc0JBQXNCLHNCQUE3a0I7QUFBQSxNQUFvbUJDLG1CQUFtQixTQUF2bkI7QUFBQSxNQUFpb0JDLHdCQUF3QixRQUF6cEI7QUFBQSxNQUFrcUJDLGdCQUFnQixFQUFDLE1BQU0sTUFBUCxFQUFlLE1BQU0sTUFBckIsRUFBNkIsS0FBSyxLQUFsQyxFQUF5QyxNQUFNLEtBQS9DLEVBQXNELE1BQU0sS0FBNUQsRUFBbUUsTUFBTSxLQUF6RSxFQUFnRixNQUFNLEtBQXRGLEVBQTZGLE1BQU0sS0FBbkcsRUFBMEcsS0FBSyxLQUEvRyxFQUFzSCxLQUFLLFNBQTNILEVBQXNJLEtBQUssU0FBM0ksRUFBbHJCO0FBQUEsTUFBdzBCQyxrQkFBa0IsRUFBQyxLQUFLLE9BQU4sRUFBZSxLQUFLLE1BQXBCLEVBQTRCLEtBQUssTUFBakMsRUFBeUMsTUFBTSxRQUEvQyxFQUExMUI7QUFBQSxNQUFtNUJDLGtCQUFrQixTQUFTQSxlQUFULENBQXlCM0MsS0FBekIsRUFBZ0M7QUFDei9CLE9BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixRQUFJc0Msb0JBQW9CTSxJQUFwQixDQUF5QjVDLEtBQXpCLENBQUosRUFBcUM7QUFDcEMsWUFBT0EsTUFBTTlCLE9BQU4sQ0FBY21FLGNBQWQsRUFBOEJRLGdCQUE5QixDQUFQO0FBQ0E7QUFDRDs7QUFFRCxVQUFPN0MsU0FBUyxJQUFULEdBQWdCLEVBQWhCLEdBQXFCQSxLQUE1QjtBQUNBLEdBUm9EO0FBQUEsTUFRbkQ2QyxtQkFBbUIsU0FBU0EsZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQ25ELFVBQU9MLGNBQWNLLEdBQWQsQ0FBUDtBQUNBLEdBVm9EO0FBQUEsTUFVbkRDLG9CQUFvQixTQUFTQSxpQkFBVCxDQUEyQi9DLEtBQTNCLEVBQWtDO0FBQ3ZELE9BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixRQUFJd0Msc0JBQXNCSSxJQUF0QixDQUEyQjVDLEtBQTNCLENBQUosRUFBdUM7QUFDdEMsWUFBT0EsTUFBTTlCLE9BQU4sQ0FBY3FFLGdCQUFkLEVBQWdDUyxrQkFBaEMsQ0FBUDtBQUNBO0FBQ0Q7O0FBRUQsVUFBT2hELFNBQVMsSUFBVCxHQUFnQixFQUFoQixHQUFxQkEsS0FBNUI7QUFDQSxHQWxCb0Q7QUFBQSxNQWtCbkRnRCxxQkFBcUIsU0FBU0Esa0JBQVQsQ0FBNEJGLEdBQTVCLEVBQWlDO0FBQ3ZELFVBQU9KLGdCQUFnQkksR0FBaEIsQ0FBUDtBQUNBLEdBcEJvRDtBQUFBLE1Bb0JuREcsZ0JBQWdCLFNBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxHQUE3QixFQUFrQztBQUNuRCxRQUFLLElBQUlDLEdBQVQsSUFBZ0JELEdBQWhCLEVBQXFCO0FBQ3BCLFFBQUlBLElBQUlFLGNBQUosQ0FBbUJELEdBQW5CLENBQUosRUFBNkI7QUFDNUJGLFVBQUtFLEdBQUwsSUFBWUQsSUFBSUMsR0FBSixDQUFaO0FBQ0E7QUFDRDtBQUNELEdBMUJvRDtBQUFBLE1BMEJuREUsZUFBZSxTQUFTQSxZQUFULENBQXNCQyxFQUF0QixFQUEwQjtBQUMxQ0EsTUFBR0MsS0FBSCxHQUFXLElBQVg7QUFDQSxVQUFPRCxFQUFQO0FBQ0EsR0E3Qm9EO0FBQUEsTUE2Qm5ERSxPQUFLdkMsZUFBZSxPQUFPQSxZQUFZdUMsSUFBbkIsS0FBNEIsVUFBM0MsR0FBd0R2QyxZQUFZdUMsSUFBcEUsR0FBMkUsVUFBVUMsR0FBVixFQUFlO0FBQUMsVUFBT0EsR0FBUDtBQUFZLEdBN0J6RDtBQUFBLE1BNkIwREMsaUJBN0IxRCxDQTZCNEUsSUFBRyxPQUFPQyxZQUFQLEtBQXdCLFdBQTNCLEVBQXVDO0FBQUNELHVCQUFxQixPQUFPRSxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxRQUFRQyxLQUEzQyxHQUFvRCxZQUFVO0FBQUMsV0FBT0MsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJyRCxJQUF6QixDQUE4QmlELFFBQVFDLEtBQXRDLEVBQTZDRCxPQUE3QyxFQUFzREssU0FBdEQsQ0FBUDtBQUF3RSxJQUF2SSxHQUEwSSxZQUFVLENBQUUsQ0FBMUs7QUFBNEssR0FBcE4sTUFBd047QUFBQ1AsdUJBQWtCQyxZQUFsQjtBQUErQixJQUFDLFNBQVNPLGdCQUFULENBQTBCQyxHQUExQixFQUE4QjtBQUFDVCxxQkFBa0JTLE1BQUksZUFBSixHQUFvQmxDLGtCQUFwQixHQUF1QyxjQUF2QyxHQUFzREQsaUJBQXRELEdBQXdFLFVBQXhFLEdBQW1GRCxpQkFBckc7QUFBd0gsWUFBU3FDLFdBQVQsQ0FBcUJkLEVBQXJCLEVBQXlCZSxNQUF6QixFQUFnQ0MsRUFBaEMsRUFBbUM7QUFBQyxPQUFHQSxFQUFILEVBQU0sS0FBSSxJQUFJQyxDQUFSLElBQWFGLE1BQWI7QUFBb0IsUUFBRyxPQUFPQSxPQUFPRSxDQUFQLENBQVAsSUFBa0IsVUFBbEIsSUFBOEJGLE9BQU9FLENBQVAsRUFBVWhCLEtBQTNDLEVBQWlEYyxPQUFPRSxDQUFQLElBQVVGLE9BQU9FLENBQVAsR0FBVjtBQUFyRSxJQUEyRixPQUFPakIsR0FBRzNDLElBQUgsQ0FBUU0sV0FBUixFQUFvQm9ELE1BQXBCLENBQVA7QUFBbUMsT0FBSUcsT0FBS3hELGNBQVQsQ0FBd0IsSUFBRztBQUFDSyxnQkFBYSxDQUFiLElBQWdCeUIsa0JBQWtCMEIsS0FBS3pILEtBQXZCLENBQWhCO0FBQThDLEdBQWxELENBQWtELE9BQU0ySCxDQUFOLEVBQVE7QUFBQ3JELGdCQUFhLENBQWIsSUFBZ0IsRUFBaEIsQ0FBb0I2QyxpQkFBaUJRLEVBQUVDLE9BQW5CO0FBQTZCLE9BQUc7QUFBQ3RELGdCQUFhLENBQWIsSUFBZ0J5QixrQkFBa0IwQixLQUFLNUgsRUFBdkIsQ0FBaEI7QUFBMkMsR0FBL0MsQ0FBK0MsT0FBTThILENBQU4sRUFBUTtBQUFDckQsZ0JBQWEsQ0FBYixJQUFnQixFQUFoQixDQUFvQjZDLGlCQUFpQlEsRUFBRUMsT0FBbkI7QUFBNkIsaUJBQWEsNEJBQTRCdEQsYUFBYSxDQUFiLENBQTVCLEdBQThDLGVBQTlDLEdBQWdFQSxhQUFhLENBQWIsQ0FBaEUsR0FBa0YsdUtBQS9GLENBQXdRLElBQUc7QUFBQ0gsaUJBQWE0QixrQkFBa0IwQixLQUFLMUgsSUFBdkIsQ0FBYjtBQUEyQyxHQUEvQyxDQUErQyxPQUFNNEgsQ0FBTixFQUFRO0FBQUNSLG9CQUFpQlEsRUFBRUMsT0FBRixHQUFZLEdBQTdCO0FBQW1DLGlCQUFhLHlZQUFiLENBQXdabEQsWUFBVU4sY0FBY3lELE1BQXhCLENBQStCLElBQUluRCxTQUFKLEVBQWU7QUFBQ0QscUJBQWtCLENBQWxCLENBQW9CLE9BQU1BLGtCQUFnQkMsU0FBdEIsRUFBZ0NELGlCQUFoQyxFQUFtRDtBQUFDSixtQkFBYUQsY0FBY0ssZUFBZCxDQUFiLENBQTRDLElBQUksT0FBT0osWUFBUCxLQUFzQixRQUExQixFQUFvQztBQUFDTyxvQkFBYVAsWUFBYjtBQUEyQixLQUFoRSxNQUFzRTtBQUFDTSxpQkFBVUUsY0FBY1IsYUFBYTFFLElBQTNCLENBQVYsQ0FBMkMsSUFBSWdGLFNBQUosRUFBZUMsZUFBYXlDLFlBQVkxQyxTQUFaLEVBQXNCTixhQUFhaUQsTUFBbkMsRUFBMENqRCxhQUFha0QsRUFBdkQsQ0FBYjtBQUF5RTtBQUFDLFdBQU8zQyxjQUFZVCxVQUFuQjtBQUErQixHQUE5VyxNQUFvWDtBQUFDLFVBQU9BLFVBQVA7QUFBbUI7QUFBQyxFOzs7Ozs7Ozs7Ozs7bUJDN0IzakUsVUFBVUYsY0FBVixFQUF5QjtBQUFDO0FBQWEsTUFBSUMsY0FBWSxJQUFoQjtBQUFBLE1BQXFCQyxhQUFXLEVBQWhDO0FBQUEsTUFBbUNDLGdCQUFjLEVBQWpEO0FBQUEsTUFBb0RDLFlBQXBEO0FBQUEsTUFBaUVDLGVBQWEsRUFBOUU7QUFBQSxNQUFpRkMsYUFBakY7QUFBQSxNQUErRkMsU0FBL0Y7QUFBQSxNQUF5R0MsZUFBekc7QUFBQSxNQUF5SEMsU0FBekg7QUFBQSxNQUFtSUMsU0FBbkk7QUFBQSxNQUE2SUMsY0FBWSxFQUF6SjtBQUFBLE1BQTRKQyxnQkFBYyxFQUExSztBQUFBLE1BQTZLQyxhQUE3SztBQUFBLE1BQTJMQyxjQUEzTDtBQUFBLE1BQTBNQyxvQkFBa0IsRUFBNU47QUFBQSxNQUErTkMsb0JBQWtCLEVBQWpQO0FBQUEsTUFBb1BDLHFCQUFtQixFQUF2UTtBQUFBLE1BQTBRQyx1QkFBdUIsRUFBalM7QUFBQSxNQUFvU0Msb0JBQW9CLEVBQUMsUUFBUSxJQUFULEVBQWUsUUFBUSxJQUF2QixFQUE2QixNQUFNLElBQW5DLEVBQXlDLE9BQU8sSUFBaEQsRUFBc0QsV0FBVyxJQUFqRSxFQUF1RSxTQUFTLElBQWhGLEVBQXNGLE1BQU0sSUFBNUYsRUFBa0csT0FBTyxJQUF6RyxFQUErRyxTQUFTLElBQXhILEVBQThILFVBQVUsSUFBeEksRUFBOEksUUFBUSxJQUF0SixFQUE0SixRQUFRLElBQXBLLEVBQTBLLFNBQVMsSUFBbkwsRUFBeUwsVUFBVSxJQUFuTSxFQUF5TSxPQUFPLElBQWhOLEVBQXhUO0FBQUEsTUFBOGdCQyxpQkFBaUIsdUJBQS9oQjtBQUFBLE1BQXVqQkMsc0JBQXNCLHNCQUE3a0I7QUFBQSxNQUFvbUJDLG1CQUFtQixTQUF2bkI7QUFBQSxNQUFpb0JDLHdCQUF3QixRQUF6cEI7QUFBQSxNQUFrcUJDLGdCQUFnQixFQUFDLE1BQU0sTUFBUCxFQUFlLE1BQU0sTUFBckIsRUFBNkIsS0FBSyxLQUFsQyxFQUF5QyxNQUFNLEtBQS9DLEVBQXNELE1BQU0sS0FBNUQsRUFBbUUsTUFBTSxLQUF6RSxFQUFnRixNQUFNLEtBQXRGLEVBQTZGLE1BQU0sS0FBbkcsRUFBMEcsS0FBSyxLQUEvRyxFQUFzSCxLQUFLLFNBQTNILEVBQXNJLEtBQUssU0FBM0ksRUFBbHJCO0FBQUEsTUFBdzBCQyxrQkFBa0IsRUFBQyxLQUFLLE9BQU4sRUFBZSxLQUFLLE1BQXBCLEVBQTRCLEtBQUssTUFBakMsRUFBeUMsTUFBTSxRQUEvQyxFQUExMUI7QUFBQSxNQUFtNUJDLGtCQUFrQixTQUFTQSxlQUFULENBQXlCM0MsS0FBekIsRUFBZ0M7QUFDei9CLE9BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixRQUFJc0Msb0JBQW9CTSxJQUFwQixDQUF5QjVDLEtBQXpCLENBQUosRUFBcUM7QUFDcEMsWUFBT0EsTUFBTTlCLE9BQU4sQ0FBY21FLGNBQWQsRUFBOEJRLGdCQUE5QixDQUFQO0FBQ0E7QUFDRDs7QUFFRCxVQUFPN0MsU0FBUyxJQUFULEdBQWdCLEVBQWhCLEdBQXFCQSxLQUE1QjtBQUNBLEdBUm9EO0FBQUEsTUFRbkQ2QyxtQkFBbUIsU0FBU0EsZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQ25ELFVBQU9MLGNBQWNLLEdBQWQsQ0FBUDtBQUNBLEdBVm9EO0FBQUEsTUFVbkRDLG9CQUFvQixTQUFTQSxpQkFBVCxDQUEyQi9DLEtBQTNCLEVBQWtDO0FBQ3ZELE9BQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM5QixRQUFJd0Msc0JBQXNCSSxJQUF0QixDQUEyQjVDLEtBQTNCLENBQUosRUFBdUM7QUFDdEMsWUFBT0EsTUFBTTlCLE9BQU4sQ0FBY3FFLGdCQUFkLEVBQWdDUyxrQkFBaEMsQ0FBUDtBQUNBO0FBQ0Q7O0FBRUQsVUFBT2hELFNBQVMsSUFBVCxHQUFnQixFQUFoQixHQUFxQkEsS0FBNUI7QUFDQSxHQWxCb0Q7QUFBQSxNQWtCbkRnRCxxQkFBcUIsU0FBU0Esa0JBQVQsQ0FBNEJGLEdBQTVCLEVBQWlDO0FBQ3ZELFVBQU9KLGdCQUFnQkksR0FBaEIsQ0FBUDtBQUNBLEdBcEJvRDtBQUFBLE1Bb0JuREcsZ0JBQWdCLFNBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxHQUE3QixFQUFrQztBQUNuRCxRQUFLLElBQUlDLEdBQVQsSUFBZ0JELEdBQWhCLEVBQXFCO0FBQ3BCLFFBQUlBLElBQUlFLGNBQUosQ0FBbUJELEdBQW5CLENBQUosRUFBNkI7QUFDNUJGLFVBQUtFLEdBQUwsSUFBWUQsSUFBSUMsR0FBSixDQUFaO0FBQ0E7QUFDRDtBQUNELEdBMUJvRDtBQUFBLE1BMEJuREUsZUFBZSxTQUFTQSxZQUFULENBQXNCQyxFQUF0QixFQUEwQjtBQUMxQ0EsTUFBR0MsS0FBSCxHQUFXLElBQVg7QUFDQSxVQUFPRCxFQUFQO0FBQ0EsR0E3Qm9EO0FBQUEsTUE2Qm5ERSxPQUFLdkMsZUFBZSxPQUFPQSxZQUFZdUMsSUFBbkIsS0FBNEIsVUFBM0MsR0FBd0R2QyxZQUFZdUMsSUFBcEUsR0FBMkUsVUFBVUMsR0FBVixFQUFlO0FBQUMsVUFBT0EsR0FBUDtBQUFZLEdBN0J6RDtBQUFBLE1BNkIwREMsaUJBN0IxRCxDQTZCNEUsSUFBRyxPQUFPQyxZQUFQLEtBQXdCLFdBQTNCLEVBQXVDO0FBQUNELHVCQUFxQixPQUFPRSxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxRQUFRQyxLQUEzQyxHQUFvRCxZQUFVO0FBQUMsV0FBT0MsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUJyRCxJQUF6QixDQUE4QmlELFFBQVFDLEtBQXRDLEVBQTZDRCxPQUE3QyxFQUFzREssU0FBdEQsQ0FBUDtBQUF3RSxJQUF2SSxHQUEwSSxZQUFVLENBQUUsQ0FBMUs7QUFBNEssR0FBcE4sTUFBd047QUFBQ1AsdUJBQWtCQyxZQUFsQjtBQUErQixJQUFDLFNBQVNPLGdCQUFULENBQTBCQyxHQUExQixFQUE4QjtBQUFDVCxxQkFBa0JTLE1BQUksZUFBSixHQUFvQmxDLGtCQUFwQixHQUF1QyxjQUF2QyxHQUFzREQsaUJBQXRELEdBQXdFLFVBQXhFLEdBQW1GRCxpQkFBckc7QUFBd0gsWUFBU3FDLFdBQVQsQ0FBcUJkLEVBQXJCLEVBQXlCZSxNQUF6QixFQUFnQ0MsRUFBaEMsRUFBbUM7QUFBQyxPQUFHQSxFQUFILEVBQU0sS0FBSSxJQUFJQyxDQUFSLElBQWFGLE1BQWI7QUFBb0IsUUFBRyxPQUFPQSxPQUFPRSxDQUFQLENBQVAsSUFBa0IsVUFBbEIsSUFBOEJGLE9BQU9FLENBQVAsRUFBVWhCLEtBQTNDLEVBQWlEYyxPQUFPRSxDQUFQLElBQVVGLE9BQU9FLENBQVAsR0FBVjtBQUFyRSxJQUEyRixPQUFPakIsR0FBRzNDLElBQUgsQ0FBUU0sV0FBUixFQUFvQm9ELE1BQXBCLENBQVA7QUFBbUMsT0FBSUcsT0FBS3hELGNBQVQsQ0FBd0JFLGNBQWEsaVhBQWIsQ0FBZ1lPLFlBQVVOLGNBQWN5RCxNQUF4QixDQUErQixJQUFJbkQsU0FBSixFQUFlO0FBQUNELHFCQUFrQixDQUFsQixDQUFvQixPQUFNQSxrQkFBZ0JDLFNBQXRCLEVBQWdDRCxpQkFBaEMsRUFBbUQ7QUFBQ0osbUJBQWFELGNBQWNLLGVBQWQsQ0FBYixDQUE0QyxJQUFJLE9BQU9KLFlBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFBQ08sb0JBQWFQLFlBQWI7QUFBMkIsS0FBaEUsTUFBc0U7QUFBQ00saUJBQVVFLGNBQWNSLGFBQWExRSxJQUEzQixDQUFWLENBQTJDLElBQUlnRixTQUFKLEVBQWVDLGVBQWF5QyxZQUFZMUMsU0FBWixFQUFzQk4sYUFBYWlELE1BQW5DLEVBQTBDakQsYUFBYWtELEVBQXZELENBQWI7QUFBeUU7QUFBQyxXQUFPM0MsY0FBWVQsVUFBbkI7QUFBK0IsR0FBOVcsTUFBb1g7QUFBQyxVQUFPQSxVQUFQO0FBQW1CO0FBQUMsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4MWU0ZTBiYTdmYjM3NzI3MzE5NiIsImltcG9ydCB7IE1lbnUgfSBmcm9tICcuLi9tZW51L21lbnUuanMnO1xyXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vZm9ybS9mb3JtLmpzJztcclxuaW1wb3J0IHsgTm90ZSB9IGZyb20gJy4uL25vdGUvbm90ZS5qcyc7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2FwcC54bWwuanMnO1xyXG5cclxuICAgIGxldCBtZW51RGF0YSA9IHtcclxuICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0JLRgdC1INC30LDQvNC10YLQutC4JyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdhbGwnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0KLQtdC60YHRgicsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndGV4dCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IG5vdGVzRGF0YSA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIHRleHQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxyXG4gICAgICAgICAgICB0YWdzOiBbJ3RleHQnLCAnYWxsJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgdGV4dDogJzIzNDUnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3llbGxvdycsXHJcbiAgICAgICAgICAgIHRhZ3M6IFsndGV4dCddXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICBjbGFzcyBBcHAge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51ID0gbmV3IE1lbnUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1lbnUnKSwgbWVudURhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudS1mb3JtJykpO1xyXG4gICAgICAgICAgICB0aGlzLm5vdGVzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvcm0ubm9kZS5hZGRFdmVudExpc3RlbmVyKCdhZGQtbmV3JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmFkZChldmVudC5kZXRhaWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTm90ZXMobm90ZXNEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um91dGUobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFJvdXRlIChyb3V0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUudG9nZ2xlQWN0aXZlKHJvdXRlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Rlc0ZpbHRlcihyb3V0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZW5kZXJOb3RlcyAoZGF0YSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbm90ZXMnKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCBpdGVtID0+IHRoaXMuYWRkTm90ZShpdGVtKSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkTm90ZSAoaXRlbSkge1xyXG4gICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGxldCBub3RlID0gbmV3IE5vdGUoZGl2LCBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChub3RlKTtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpzLW5vdGVzJykuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIFxyXG4gICAgICAgICAgICBub3RlTm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGVsTm90ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgbm90ZU5vZGUucXVlcnlTZWxlY3RvcignLmpzLWFkZC1uZXcnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubmV3Tm90ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgbm90ZU5vZGUucXVlcnlTZWxlY3RvcignLm5vdGVfX3RleHQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLnNhdmVOb3RlVGV4dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpbmRleE9mTm90ZUluTm90ZXNEYXRhIChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBub3RlTm9kZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBjb25zdCBub3RlSWQgPSBub3RlTm9kZS5kYXRhc2V0LmlkO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBub3Rlc0RhdGEuZmluZEluZGV4KCBub3RlID0+IG5vdGUuaWQgPT09ICtub3RlSWQgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGVsTm90ZSAoZXZlbnQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5zcGxpY2UodGhpcy5pbmRleE9mTm90ZUluTm90ZXNEYXRhKGV2ZW50KSwgMSk7XHJcbiAgICBcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG5ld05vdGUgKCkge1xyXG4gICAgICAgICAgICBsZXQgdGFncyA9IFsnYWxsJ107XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VMb2NhdGlvbiA9ICcnIHx8IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgaWYgKHBhZ2VMb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGFncy5wdXNoKHBhZ2VMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpZCA9IDE7IC8v0LXRgdC70Lgg0LfQsNC80LXRgtC+0Log0L3QtdGCXHJcbiAgICAgICAgICAgIGlkID0gbm90ZXNEYXRhLnNsaWNlKC0xKVswXS5pZCArIDEgfHwgaWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb3RlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5wdXNoKG5ld05vdGVEYXRhKTtcclxuICAgIFxyXG4gICAgICAgICAgICBwYWdlTG9jYXRpb24gPyB0aGlzLm5vdGVzRmlsdGVyKHBhZ2VMb2NhdGlvbikgOiB0aGlzLnJlbmRlck5vdGVzKG5vdGVzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNhdmVOb3RlVGV4dCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YVt0aGlzLmluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEoZXZlbnQpXS50ZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm90ZXNGaWx0ZXIgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckRhdGEgPSBub3Rlc0RhdGEuZmlsdGVyKChub3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90ZS50YWdzLmluZGV4T2Yocm91dGUpICE9PSAtMTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vdGVzKGZpbHRlckRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgYXBwID0gbmV3IEFwcChkb2N1bWVudC5ib2R5KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICBhcHAuc2V0Um91dGUobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9hcHAvYXBwLmpzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbWVudS54bWwuanMnO1xyXG5cclxuXHJcbmNsYXNzIE1lbnUge1xyXG4gXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJlbmRlcihub2RlLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy90aGlzLnRpdGxlID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy10aXRsZScpO1xyXG4gICAgICAgIC8vdGhpcy50aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShkYXRhKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCU0L7QsdCw0LLQu9C10Y/RgiDQvdC+0LLRi9C5IGl0ZW0g0LIg0LzQtdC90Y5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0g0L7Qv9C40YHQsNC90LjQtdC8INC/0YPQvdC60YLQsCDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0udGl0bGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtLm5hbWVcclxuICAgICAqL1xyXG4gICAgYWRkKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmRhdGEubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMubm9kZSwgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqINCc0LXRgtC+0LQg0L/QtdGA0LXQutC70Y7Rh9Cw0LXRgiDQsNC60YLQuNCy0L3Ri9C5INC/0YPQvdC60YIg0LzQtdC90Y5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0g0LjQvNGPINCw0LrRgtC40LLQvdC+0LPQviDQv9GD0L3QutGC0LAg0LzQtdC90Y5cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlQWN0aXZlIChuYW1lKSB7XHJcbiAgICAgICAgbGV0IGxpbmtzID0gW10uc2xpY2UuY2FsbCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKSk7XHJcblxyXG4gICAgICAgIGxpbmtzLmZvckVhY2goIGxpbmsgPT4ge1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhY3RpdmUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihgLm1lbnVfX2xpbmsuanMtJHtuYW1lfWApO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKCdtZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBNZW51IH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9tZW51L21lbnUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwibWVudVxcXCI+PHVsIGNsYXNzPVxcXCJtZW51X19saXN0XFxcIj5cIik7dmFyIGksaXRlbSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24ubGlzdCB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMCl7aXRlbT1fX2Zlc3RfaXRlcmF0b3IwW2ldO19fZmVzdF9idWYrPShcIjxsaSBjbGFzcz1cXFwibWVudV9faXRlbVxcXCI+XCIpO3RyeXtfX2Zlc3RfYXR0cnNbMF09X19mZXN0X2VzY2FwZUhUTUwoaXRlbS5uYW1lKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMF09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO310cnl7X19mZXN0X2F0dHJzWzFdPV9fZmVzdF9lc2NhcGVIVE1MKGl0ZW0ubmFtZSl9Y2F0Y2goZSl7X19mZXN0X2F0dHJzWzFdPVwiXCI7IF9fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9X19mZXN0X2J1Zis9KFwiPGEgY2xhc3M9XFxcIm1lbnVfX2xpbmsganMtXCIgKyBfX2Zlc3RfYXR0cnNbMF0gKyBcIlxcXCIgaHJlZj1cXFwiI1wiICsgX19mZXN0X2F0dHJzWzFdICsgXCJcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGl0ZW0udGl0bGUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNlwiKTt9X19mZXN0X2J1Zis9KFwiPC9hPjwvbGk+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3VsPjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIi8vIGltcG9ydCBmZXN0LmZvcm1cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2Zvcm0ueG1sLmpzJztcblxuLy/QldGB0LvQuCDRgSDQsNC90LPQu9C40LnRgdC60L7Qs9C+INC90LAg0YDRg9GB0YHQutC40LksINGC0L4g0L/QtdGA0LXQtNCw0ZHQvCDQstGC0L7RgNGL0Lwg0L/QsNGA0LDQvNC10YLRgNC+0LwgdHJ1ZS5cbmxldCB0cmFuc2xpdGVyYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXJcbiAgICAgICAgcnVzID0gXCLRiSAgINGIICDRhyAg0YYgINGOICDRjyAg0ZEgINC2ICDRiiAg0YsgINGNICDQsCDQsSDQsiDQsyDQtCDQtSDQtyDQuCDQuSDQuiDQuyDQvCDQvSDQviDQvyDRgCDRgSDRgiDRgyDRhCDRhSDRjFwiLnNwbGl0KC8gKy9nKSxcbiAgICAgICAgZW5nID0gXCJzaGggc2ggY2ggY3ogeXUgeWEgeW8gemggYGAgeScgZWAgYSBiIHYgZyBkIGUgeiBpIGogayBsIG0gbiBvIHAgciBzIHQgdSBmIHggYFwiLnNwbGl0KC8gKy9nKVxuICAgICAgICA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQsIGVuZ1RvUnVzKSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICBmb3IoeCA9IDA7IHggPCBydXMubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGVuZ1RvUnVzID8gZW5nW3hdIDogcnVzW3hdKS5qb2luKGVuZ1RvUnVzID8gcnVzW3hdIDogZW5nW3hdKTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGVuZ1RvUnVzID8gZW5nW3hdLnRvVXBwZXJDYXNlKCkgOiBydXNbeF0udG9VcHBlckNhc2UoKSkuam9pbihlbmdUb1J1cyA/IHJ1c1t4XS50b1VwcGVyQ2FzZSgpIDogZW5nW3hdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbn0pKCk7XG5cbmNsYXNzIEZvcm0ge1xuXG4gICAgY29uc3RydWN0b3Iobm9kZSwgbWVudSkge1xuICAgICAgICB0aGlzLm1lbnU9IG1lbnU7XG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKG5vZGUpO1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtZm9ybScpO1xuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZW5kZXIobm9kZSkge1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIG9uU3VibWl0KGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdhZGQtbmV3Jywge1xuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5mb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0cmFuc2xpdGVyYXRlKHRoaXMuZm9ybS5lbGVtZW50cy50aXRsZS52YWx1ZSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IEZvcm0gfTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2Zvcm0vZm9ybS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX1fX2Zlc3RfYnVmKz0oXCI8Zm9ybSBjbGFzcz1cXFwiZm9ybSBqcy1mb3JtXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXFxcIiBjbGFzcz1cXFwiZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInRpdGxlXFxcIi8+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvZm9ybS9mb3JtLnhtbC5qcyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25vdGUueG1sLmpzJztcclxuXHJcbmNsYXNzIE5vdGUge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcy5kYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTm90ZSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7dHJ5e19fZmVzdF9hdHRyc1swXT1fX2Zlc3RfZXNjYXBlSFRNTChqc29uLmNvbG9yKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMF09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO310cnl7X19mZXN0X2F0dHJzWzFdPV9fZmVzdF9lc2NhcGVIVE1MKGpzb24uaWQpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1sxXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fV9fZmVzdF9idWYrPShcIjxkaXYgY2xhc3M9XFxcIm5vdGUgbm90ZV9cIiArIF9fZmVzdF9hdHRyc1swXSArIFwiXFxcIiBkYXRhLWlkPVxcXCJcIiArIF9fZmVzdF9hdHRyc1sxXSArIFwiXFxcIj48aW1nIGNsYXNzPVxcXCJub3RlX19jbG9zZSBqcy1jbG9zZVxcXCIgc3JjPVxcXCJpbWdcXC9pY29fY2xvc2Uuc3ZnXFxcIi8+PHRleHRhcmVhIGNsYXNzPVxcXCJub3RlX190ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgiDQt9Cw0LzQtdGC0LrQuFxcXCIgcm93cz1cXFwiNlxcXCIgbWF4bGVuZ3RoPVxcXCIxMTlcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGpzb24udGV4dCkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI0XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RleHRhcmVhPjxkaXYgY2xhc3M9XFxcIm5vdGVfX2Zvb3RlclxcXCI+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9jb2xvciBqcy1zZXQtY29sb3JcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2NvbG9yLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fYWRkLW5ldyBqcy1hZGQtbmV3XFxcIiBzcmM9XFxcImltZ1xcL2ljb19hZGQuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9saW5rIGpzLWdldC1saW5rXFxcIiBzcmM9XFxcImltZ1xcL2ljb19saW5rLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fc2F2ZSBqcy1zYXZlXFxcIiBzcmM9XFxcImltZ1xcL2ljb19zYXZlLnN2Z1xcXCIvPjwvZGl2PjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3Mvbm90ZS9ub3RlLnhtbC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJhcHBcXFwiPjxkaXYgY2xhc3M9XFxcImFwcF9fc2lkZWJhclxcXCI+PGRpdiBjbGFzcz1cXFwiYXBwX19sb2dvXFxcIj48aW1nIGNsYXNzPVxcXCJhcHBfX3RpdGxlXFxcIiBzcmM9XFxcImltZ1xcL2xvZ29fdGV4dC5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJhcHBfX2ljb25cXFwiIHNyYz1cXFwiaW1nXFwvbG9nb19tYXJrLnN2Z1xcXCIvPjwvZGl2PjxociBjbGFzcz1cXFwiYXBwX19oclxcXCIvPjxkaXYgY2xhc3M9XFxcImFwcF9fbWVudSBqcy1tZW51XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJhcHBfX2Zvcm0ganMtbWVudS1mb3JtXFxcIj48L2Rpdj48aHIgY2xhc3M9XFxcImFwcF9faHJcXFwiLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJhcHBfX25vdGVzIGpzLW5vdGVzXFxcIj48L2Rpdj48L2Rpdj5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==