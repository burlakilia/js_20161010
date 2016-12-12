/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
	            this.node.querySelector('.js-notes').appendChild(div);
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

	            this.form.clear();
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
		}__fest_buf += "<div class=\"note note_" + __fest_attrs[0] + "\"><img class=\"note__close\" src=\"img\/ico_close.svg\"/><textarea class=\"note__text\" placeholder=\"Введите текст заметки\" rows=\"6\" maxlength=\"119\">";try {
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