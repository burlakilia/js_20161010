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
	            var noteNode = this.node.querySelector('.js-notes').appendChild(div);
	
	            noteNode.querySelector('.js-close').addEventListener('click', this.delNote.bind(this));
	            noteNode.querySelector('.js-add-new').addEventListener('click', this.newNote.bind(this));
	            noteNode.querySelector('.js-set-color').addEventListener('click', this.setColorNote.bind(this));
	            noteNode.querySelector('.note__text').addEventListener('change', this.saveNoteText.bind(this));
	        }
	    }, {
	        key: 'indexOfNoteInNotesData',
	        value: function indexOfNoteInNotesData(noteNode) {
	            var noteId = noteNode.dataset.id;
	
	            return notesData.findIndex(function (note) {
	                return note.id === +noteId;
	            });
	        }
	    }, {
	        key: 'delNote',
	        value: function delNote(event) {
	            var noteNode = event.target.parentNode;
	
	            notesData.splice(this.indexOfNoteInNotesData(noteNode), 1);
	
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
	            var noteNode = event.target.parentNode;
	
	            notesData[this.indexOfNoteInNotesData(noteNode)].text = event.target.value;
	        }
	    }, {
	        key: 'setColorNote',
	        value: function setColorNote(event) {
	            var noteNode = event.target.parentNode.parentNode;
	
	            var currentColor = notesData[this.indexOfNoteInNotesData(noteNode)].color;
	
	            // если последний цвет в массиве, то берем первый
	            var newColor = notesColors[0];
	            newColor = notesColors[notesColors.indexOf(currentColor) + 1] || newColor;
	
	            notesData[this.indexOfNoteInNotesData(noteNode)].color = newColor;
	
	            noteNode.classList.remove('note_' + currentColor);
	            noteNode.classList.add('note_' + newColor);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDkyODVhMDk2OTUzNjcwNzlmYzMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL21lbnUvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIndlYnBhY2s6Ly8vLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwid2VicGFjazovLy8uL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJ3ZWJwYWNrOi8vLy4vYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sIm5hbWVzIjpbIm1lbnVEYXRhIiwibGlzdCIsInRpdGxlIiwibmFtZSIsIm5vdGVzRGF0YSIsImlkIiwidHlwZSIsInRleHQiLCJjb2xvciIsInRhZ3MiLCJub3Rlc0NvbG9ycyIsIkFwcCIsIm5vZGUiLCJyZW5kZXIiLCJtZW51IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybSIsIm5vdGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsImV2ZW50IiwiZGV0YWlsIiwicmVuZGVyTm90ZXMiLCJzZXRSb3V0ZSIsImxvY2F0aW9uIiwiaGFzaCIsInJlcGxhY2UiLCJyb3V0ZSIsInRvZ2dsZUFjdGl2ZSIsIm5vdGVzRmlsdGVyIiwiaW5uZXJIVE1MIiwiZGF0YSIsImZvckVhY2giLCJhZGROb3RlIiwiaXRlbSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJub3RlIiwicHVzaCIsIm5vdGVOb2RlIiwiYXBwZW5kQ2hpbGQiLCJkZWxOb3RlIiwiYmluZCIsIm5ld05vdGUiLCJzZXRDb2xvck5vdGUiLCJzYXZlTm90ZVRleHQiLCJub3RlSWQiLCJkYXRhc2V0IiwiZmluZEluZGV4IiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsInNwbGljZSIsImluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEiLCJyZW1vdmUiLCJwYWdlTG9jYXRpb24iLCJzbGljZSIsIm5ld05vdGVEYXRhIiwidmFsdWUiLCJjdXJyZW50Q29sb3IiLCJuZXdDb2xvciIsImluZGV4T2YiLCJjbGFzc0xpc3QiLCJmaWx0ZXJEYXRhIiwiZmlsdGVyIiwiYXBwIiwiYm9keSIsIndpbmRvdyIsIk1lbnUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJsaW5rcyIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGluayIsImFjdGl2ZSIsIl9fZmVzdF9jb250ZXh0IiwiX19mZXN0X3NlbGYiLCJfX2Zlc3RfYnVmIiwiX19mZXN0X2NodW5rcyIsIl9fZmVzdF9jaHVuayIsIl9fZmVzdF9hdHRycyIsIl9fZmVzdF9zZWxlY3QiLCJfX2Zlc3RfaWYiLCJfX2Zlc3RfaXRlcmF0b3IiLCJfX2Zlc3RfdG8iLCJfX2Zlc3RfZm4iLCJfX2Zlc3RfaHRtbCIsIl9fZmVzdF9ibG9ja3MiLCJfX2Zlc3RfcGFyYW1zIiwiX19mZXN0X2VsZW1lbnQiLCJfX2Zlc3RfZGVidWdfZmlsZSIsIl9fZmVzdF9kZWJ1Z19saW5lIiwiX19mZXN0X2RlYnVnX2Jsb2NrIiwiX19mZXN0X2VsZW1lbnRfc3RhY2siLCJfX2Zlc3Rfc2hvcnRfdGFncyIsIl9fZmVzdF9qc2NoYXJzIiwiX19mZXN0X2pzY2hhcnNfdGVzdCIsIl9fZmVzdF9odG1sY2hhcnMiLCJfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QiLCJfX2Zlc3RfanNoYXNoIiwiX19mZXN0X2h0bWxoYXNoIiwiX19mZXN0X2VzY2FwZUpTIiwidGVzdCIsIl9fZmVzdF9yZXBsYWNlSlMiLCJjaHIiLCJfX2Zlc3RfZXNjYXBlSFRNTCIsIl9fZmVzdF9yZXBsYWNlSFRNTCIsIl9fZmVzdF9leHRlbmQiLCJkZXN0Iiwic3JjIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJfX2Zlc3RfcGFyYW0iLCJmbiIsInBhcmFtIiwiaTE4biIsInN0ciIsIl9fX2Zlc3RfbG9nX2Vycm9yIiwiX19mZXN0X2Vycm9yIiwiY29uc29sZSIsImVycm9yIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9fZmVzdF9sb2dfZXJyb3IiLCJtc2ciLCJfX2Zlc3RfY2FsbCIsInBhcmFtcyIsImNwIiwiaSIsImpzb24iLCJfX2Zlc3RfaXRlcmF0b3IwIiwiZSIsIm1lc3NhZ2UiLCJsZW5ndGgiLCJ0cmFuc2xpdGVyYXRlIiwicnVzIiwic3BsaXQiLCJlbmciLCJlbmdUb1J1cyIsIngiLCJqb2luIiwidG9VcHBlckNhc2UiLCJGb3JtIiwib25TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnRzIiwidG9Mb3dlckNhc2UiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsIk5vdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFSSxLQUFJQSxXQUFXO0FBQ1hDLFdBQU0sQ0FDRjtBQUNJQyxnQkFBTyxhQURYO0FBRUlDLGVBQU07QUFGVixNQURFLEVBS0Y7QUFDSUQsZ0JBQU8sT0FEWDtBQUVJQyxlQUFNO0FBRlYsTUFMRTtBQURLLEVBQWY7O0FBYUEsS0FBSUMsWUFBWSxDQUNaO0FBQ0lDLFNBQUksQ0FEUjtBQUVJQyxXQUFNLE1BRlY7QUFHSUMsV0FBTSxNQUhWO0FBSUlDLFlBQU8sUUFKWDtBQUtJQyxXQUFNLENBQUMsTUFBRCxFQUFTLEtBQVQ7QUFMVixFQURZLEVBUVo7QUFDSUosU0FBSSxDQURSO0FBRUlDLFdBQU0sTUFGVjtBQUdJQyxXQUFNLE1BSFY7QUFJSUMsWUFB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LEdBQUcxQyxJQUFILENBQVFLLFdBQVIsRUFBb0JvRCxNQUFwQixDQUFQO0FBQW1DLE9BQUlHLE9BQUt4RCxjQUFULENBQXdCRSxjQUFhLGlYQUFiLENBQWdZTyxZQUFVTixjQUFjeUQsTUFBeEIsQ0FBK0IsSUFBSW5ELFNBQUosRUFBZTtBQUFDRCxxQkFBa0IsQ0FBbEIsQ0FBb0IsT0FBTUEsa0JBQWdCQyxTQUF0QixFQUFnQ0QsaUJBQWhDLEVBQW1EO0FBQUNKLG1CQUFhRCxjQUFjSyxlQUFkLENBQWIsQ0FBNEMsSUFBSSxPQUFPSixZQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQUNPLG9CQUFhUCxZQUFiO0FBQTJCLEtBQWhFLE1BQXNFO0FBQUNNLGlCQUFVRSxjQUFjUixhQUFhOUUsSUFBM0IsQ0FBVixDQUEyQyxJQUFJb0YsU0FBSixFQUFlQyxlQUFheUMsWUFBWTFDLFNBQVosRUFBc0JOLGFBQWFpRCxNQUFuQyxFQUEwQ2pELGFBQWFrRCxFQUF2RCxDQUFiO0FBQXlFO0FBQUMsV0FBTzNDLGNBQVlULFVBQW5CO0FBQStCLEdBQTlXLE1BQW9YO0FBQUMsVUFBT0EsVUFBUDtBQUFtQjtBQUFDLEUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDkyODVhMDk2OTUzNjcwNzlmYzMiLCJpbXBvcnQgeyBNZW51IH0gZnJvbSAnLi4vbWVudS9tZW51LmpzJztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0vZm9ybS5qcyc7XHJcbmltcG9ydCB7IE5vdGUgfSBmcm9tICcuLi9ub3RlL25vdGUuanMnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9hcHAueG1sLmpzJztcclxuXHJcbiAgICBsZXQgbWVudURhdGEgPSB7XHJcbiAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9CS0YHQtSDQt9Cw0LzQtdGC0LrQuCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYWxsJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Ci0LXQutGB0YInLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RleHQnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBub3Rlc0RhdGEgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnMTIzNCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgdGFnczogWyd0ZXh0JywgJ2FsbCddXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIHRleHQ6ICcyMzQ1JyxcclxuICAgICAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxyXG4gICAgICAgICAgICB0YWdzOiBbJ3RleHQnXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgbm90ZXNDb2xvcnMgPSBbJ3llbGxvdycsICdncmVlbiddO1xyXG5cclxuICAgIGNsYXNzIEFwcCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBuZXcgTWVudShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudScpLCBtZW51RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51LWZvcm0nKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZC1uZXcnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuYWRkKGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb3Rlcyhub3Rlc0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Um91dGUgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS50b2dnbGVBY3RpdmUocm91dGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVzRmlsdGVyKHJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlck5vdGVzIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ub3RlcycpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goIGl0ZW0gPT4gdGhpcy5hZGROb3RlKGl0ZW0pICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGROb3RlIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSBuZXcgTm90ZShkaXYsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKG5vdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBub3RlTm9kZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtbm90ZXMnKS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIG5vdGVOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBub3RlTm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtYWRkLW5ldycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5uZXdOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBub3RlTm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtc2V0LWNvbG9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldENvbG9yTm90ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgbm90ZU5vZGUucXVlcnlTZWxlY3RvcignLm5vdGVfX3RleHQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLnNhdmVOb3RlVGV4dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpbmRleE9mTm90ZUluTm90ZXNEYXRhIChub3RlTm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub3RlSWQgPSBub3RlTm9kZS5kYXRhc2V0LmlkO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBub3Rlc0RhdGEuZmluZEluZGV4KCBub3RlID0+IG5vdGUuaWQgPT09ICtub3RlSWQgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGVsTm90ZSAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5zcGxpY2UodGhpcy5pbmRleE9mTm90ZUluTm90ZXNEYXRhKG5vdGVOb2RlKSwgMSk7XHJcbiAgICBcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG5ld05vdGUgKCkge1xyXG4gICAgICAgICAgICBsZXQgdGFncyA9IFsnYWxsJ107XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VMb2NhdGlvbiA9ICcnIHx8IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgaWYgKHBhZ2VMb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGFncy5wdXNoKHBhZ2VMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpZCA9IDE7IC8v0LXRgdC70Lgg0LfQsNC80LXRgtC+0Log0L3QtdGCXHJcbiAgICAgICAgICAgIGlkID0gbm90ZXNEYXRhLnNsaWNlKC0xKVswXS5pZCArIDEgfHwgaWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb3RlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5wdXNoKG5ld05vdGVEYXRhKTtcclxuICAgIFxyXG4gICAgICAgICAgICBwYWdlTG9jYXRpb24gPyB0aGlzLm5vdGVzRmlsdGVyKHBhZ2VMb2NhdGlvbikgOiB0aGlzLnJlbmRlck5vdGVzKG5vdGVzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNhdmVOb3RlVGV4dCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YVt0aGlzLmluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEobm90ZU5vZGUpXS50ZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldENvbG9yTm90ZSAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbG9yID0gbm90ZXNEYXRhW3RoaXMuaW5kZXhPZk5vdGVJbk5vdGVzRGF0YShub3RlTm9kZSldLmNvbG9yO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7RgdC70LXQtNC90LjQuSDRhtCy0LXRgiDQsiDQvNCw0YHRgdC40LLQtSwg0YLQviDQsdC10YDQtdC8INC/0LXRgNCy0YvQuVxyXG4gICAgICAgICAgICBsZXQgbmV3Q29sb3IgPSBub3Rlc0NvbG9yc1swXTtcclxuICAgICAgICAgICAgbmV3Q29sb3IgPSBub3Rlc0NvbG9yc1tub3Rlc0NvbG9ycy5pbmRleE9mKGN1cnJlbnRDb2xvcikgKyAxXSB8fCBuZXdDb2xvcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YVt0aGlzLmluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEobm90ZU5vZGUpXS5jb2xvciA9IG5ld0NvbG9yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbm90ZU5vZGUuY2xhc3NMaXN0LnJlbW92ZShgbm90ZV8ke2N1cnJlbnRDb2xvcn1gKTtcclxuICAgICAgICAgICAgbm90ZU5vZGUuY2xhc3NMaXN0LmFkZChgbm90ZV8ke25ld0NvbG9yfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBub3Rlc0ZpbHRlciAocm91dGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyRGF0YSA9IG5vdGVzRGF0YS5maWx0ZXIoKG5vdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3RlLnRhZ3MuaW5kZXhPZihyb3V0ZSkgIT09IC0xO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTm90ZXMoZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBhcHAgPSBuZXcgQXBwKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL2FwcC9hcHAuanMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9tZW51LnhtbC5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWVudSB7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKG5vZGUsIGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMudGl0bGUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpzLXRpdGxlJyk7XHJcbiAgICAgICAgLy90aGlzLnRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JTQvtCx0LDQstC70LXRj9GCINC90L7QstGL0LkgaXRlbSDQsiDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSDQvtC/0LjRgdCw0L3QuNC10Lwg0L/Rg9C90LrRgtCwINC80LXQvdGOXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbS50aXRsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0ubmFtZVxyXG4gICAgICovXHJcbiAgICBhZGQoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuZGF0YS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5ub2RlLCB0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtCDQv9C10YDQtdC60LvRjtGH0LDQtdGCINCw0LrRgtC40LLQvdGL0Lkg0L/Rg9C90LrRgiDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDQuNC80Y8g0LDQutGC0LjQstC90L7Qs9C+INC/0YPQvdC60YLQsCDQvNC10L3RjlxyXG4gICAgICovXHJcbiAgICB0b2dnbGVBY3RpdmUgKG5hbWUpIHtcclxuICAgICAgICBsZXQgbGlua3MgPSBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpKTtcclxuXHJcbiAgICAgICAgbGlua3MuZm9yRWFjaCggbGluayA9PiB7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGFjdGl2ZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKGAubWVudV9fbGluay5qcy0ke25hbWV9YCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1lbnUgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL21lbnUvbWVudS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJtZW51XFxcIj48dWwgY2xhc3M9XFxcIm1lbnVfX2xpc3RcXFwiPlwiKTt2YXIgaSxpdGVtLF9fZmVzdF9pdGVyYXRvcjA7dHJ5e19fZmVzdF9pdGVyYXRvcjA9anNvbi5saXN0IHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IwKXtpdGVtPV9fZmVzdF9pdGVyYXRvcjBbaV07X19mZXN0X2J1Zis9KFwiPGxpIGNsYXNzPVxcXCJtZW51X19pdGVtXFxcIj5cIik7dHJ5e19fZmVzdF9hdHRyc1swXT1fX2Zlc3RfZXNjYXBlSFRNTChpdGVtLm5hbWUpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1swXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fXRyeXtfX2Zlc3RfYXR0cnNbMV09X19mZXN0X2VzY2FwZUhUTUwoaXRlbS5uYW1lKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMV09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31fX2Zlc3RfYnVmKz0oXCI8YSBjbGFzcz1cXFwibWVudV9fbGluayBqcy1cIiArIF9fZmVzdF9hdHRyc1swXSArIFwiXFxcIiBocmVmPVxcXCIjXCIgKyBfX2Zlc3RfYXR0cnNbMV0gKyBcIlxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoaXRlbS50aXRsZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI2XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2E+PC9saT5cIik7fV9fZmVzdF9idWYrPShcIjwvdWw+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9tZW51L21lbnUueG1sLmpzIiwiLy8gaW1wb3J0IGZlc3QuZm9ybVxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vZm9ybS54bWwuanMnO1xuXG4vL9CV0YHQu9C4INGBINCw0L3Qs9C70LjQudGB0LrQvtCz0L4g0L3QsCDRgNGD0YHRgdC60LjQuSwg0YLQviDQv9C10YDQtdC00LDRkdC8INCy0YLQvtGA0YvQvCDQv9Cw0YDQsNC80LXRgtGA0L7QvCB0cnVlLlxubGV0IHRyYW5zbGl0ZXJhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgICBydXMgPSBcItGJICAg0YggINGHICDRhiAg0Y4gINGPICDRkSAg0LYgINGKICDRiyAg0Y0gINCwINCxINCyINCzINC0INC1INC3INC4INC5INC6INC7INC8INC9INC+INC/INGAINGBINGCINGDINGEINGFINGMXCIuc3BsaXQoLyArL2cpLFxuICAgICAgICBlbmcgPSBcInNoaCBzaCBjaCBjeiB5dSB5YSB5byB6aCBgYCB5JyBlYCBhIGIgdiBnIGQgZSB6IGkgaiBrIGwgbSBuIG8gcCByIHMgdCB1IGYgeCBgXCIuc3BsaXQoLyArL2cpXG4gICAgICAgIDtcbiAgICByZXR1cm4gZnVuY3Rpb24odGV4dCwgZW5nVG9SdXMpIHtcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIGZvcih4ID0gMDsgeCA8IHJ1cy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoZW5nVG9SdXMgPyBlbmdbeF0gOiBydXNbeF0pLmpvaW4oZW5nVG9SdXMgPyBydXNbeF0gOiBlbmdbeF0pO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoZW5nVG9SdXMgPyBlbmdbeF0udG9VcHBlckNhc2UoKSA6IHJ1c1t4XS50b1VwcGVyQ2FzZSgpKS5qb2luKGVuZ1RvUnVzID8gcnVzW3hdLnRvVXBwZXJDYXNlKCkgOiBlbmdbeF0udG9VcHBlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufSkoKTtcblxuY2xhc3MgRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBtZW51KSB7XG4gICAgICAgIHRoaXMubWVudT0gbWVudTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIobm9kZSk7XG5cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1mb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlbmRlcihub2RlKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2FkZC1uZXcnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmZvcm0uZWxlbWVudHMudGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRyYW5zbGl0ZXJhdGUodGhpcy5mb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IHsgRm9ybSB9O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvZm9ybS9mb3JtLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfV9fZmVzdF9idWYrPShcIjxmb3JtIGNsYXNzPVxcXCJmb3JtIGpzLWZvcm1cXFwiPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwi0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y9cXFwiIGNsYXNzPVxcXCJmb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwidGl0bGVcXFwiLz48L2Zvcm0+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbm90ZS54bWwuanMnO1xyXG5cclxuY2xhc3MgTm90ZSB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBOb3RlIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYmxvY2tzL25vdGUvbm90ZS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDt0cnl7X19mZXN0X2F0dHJzWzBdPV9fZmVzdF9lc2NhcGVIVE1MKGpzb24uY29sb3IpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1swXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fXRyeXtfX2Zlc3RfYXR0cnNbMV09X19mZXN0X2VzY2FwZUhUTUwoanNvbi5pZCl9Y2F0Y2goZSl7X19mZXN0X2F0dHJzWzFdPVwiXCI7IF9fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwibm90ZSBub3RlX1wiICsgX19mZXN0X2F0dHJzWzBdICsgXCJcXFwiIGRhdGEtaWQ9XFxcIlwiICsgX19mZXN0X2F0dHJzWzFdICsgXCJcXFwiPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2Nsb3NlIGpzLWNsb3NlXFxcIiBzcmM9XFxcImltZ1xcL2ljb19jbG9zZS5zdmdcXFwiLz48dGV4dGFyZWEgY2xhc3M9XFxcIm5vdGVfX3RleHRcXFwiIHBsYWNlaG9sZGVyPVxcXCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCINC30LDQvNC10YLQutC4XFxcIiByb3dzPVxcXCI2XFxcIiBtYXhsZW5ndGg9XFxcIjExOVxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoanNvbi50ZXh0KSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjRcIik7fV9fZmVzdF9idWYrPShcIjwvdGV4dGFyZWE+PGRpdiBjbGFzcz1cXFwibm90ZV9fZm9vdGVyXFxcIj48aW1nIGNsYXNzPVxcXCJub3RlX19idXR0b24gbm90ZV9fYnV0dG9uX2NvbG9yIGpzLXNldC1jb2xvclxcXCIgc3JjPVxcXCJpbWdcXC9pY29fY29sb3Iuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9hZGQtbmV3IGpzLWFkZC1uZXdcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2FkZC5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJub3RlX19idXR0b24gbm90ZV9fYnV0dG9uX2xpbmsganMtZ2V0LWxpbmtcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2xpbmsuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9zYXZlIGpzLXNhdmVcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX3NhdmUuc3ZnXFxcIi8+PC9kaXY+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Jsb2Nrcy9ub3RlL25vdGUueG1sLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxkaXYgY2xhc3M9XFxcImFwcFxcXCI+PGRpdiBjbGFzcz1cXFwiYXBwX19zaWRlYmFyXFxcIj48ZGl2IGNsYXNzPVxcXCJhcHBfX2xvZ29cXFwiPjxpbWcgY2xhc3M9XFxcImFwcF9fdGl0bGVcXFwiIHNyYz1cXFwiaW1nXFwvbG9nb190ZXh0LnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcImFwcF9faWNvblxcXCIgc3JjPVxcXCJpbWdcXC9sb2dvX21hcmsuc3ZnXFxcIi8+PC9kaXY+PGhyIGNsYXNzPVxcXCJhcHBfX2hyXFxcIi8+PGRpdiBjbGFzcz1cXFwiYXBwX19tZW51IGpzLW1lbnVcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImFwcF9fZm9ybSBqcy1tZW51LWZvcm1cXFwiPjwvZGl2PjxociBjbGFzcz1cXFwiYXBwX19oclxcXCIvPjwvZGl2PjxkaXYgY2xhc3M9XFxcImFwcF9fbm90ZXMganMtbm90ZXNcXFwiPjwvZGl2PjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ibG9ja3MvYXBwL2FwcC54bWwuanMiXSwic291cmNlUm9vdCI6IiJ9