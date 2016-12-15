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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGNmNzNiYzNhN2E4NzBhMTFmMWQiLCJ3ZWJwYWNrOi8vLy4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL21lbnUvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9DOi9wcm9qZWN0cy9qc18yMDE2MTAxMC9ibG9ja3MvbWVudS9tZW51LnhtbC5qcyIsIndlYnBhY2s6Ly8vLi9DOi9wcm9qZWN0cy9qc18yMDE2MTAxMC9ibG9ja3MvZm9ybS9mb3JtLmpzIiwid2VicGFjazovLy8uL0M6L3Byb2plY3RzL2pzXzIwMTYxMDEwL2Jsb2Nrcy9mb3JtL2Zvcm0ueG1sLmpzIiwid2VicGFjazovLy8uL0M6L3Byb2plY3RzL2pzXzIwMTYxMDEwL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL25vdGUvbm90ZS54bWwuanMiLCJ3ZWJwYWNrOi8vLy4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sIm5hbWVzIjpbIm1lbnVEYXRhIiwibGlzdCIsInRpdGxlIiwibmFtZSIsIm5vdGVzRGF0YSIsImlkIiwidHlwZSIsInRleHQiLCJjb2xvciIsInRhZ3MiLCJub3Rlc0NvbG9ycyIsIkFwcCIsIm5vZGUiLCJyZW5kZXIiLCJtZW51IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybSIsIm5vdGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsImV2ZW50IiwiZGV0YWlsIiwicmVuZGVyTm90ZXMiLCJzZXRSb3V0ZSIsImxvY2F0aW9uIiwiaGFzaCIsInJlcGxhY2UiLCJyb3V0ZSIsInRvZ2dsZUFjdGl2ZSIsIm5vdGVzRmlsdGVyIiwiaW5uZXJIVE1MIiwiZGF0YSIsImZvckVhY2giLCJhZGROb3RlIiwiaXRlbSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJub3RlIiwicHVzaCIsIm5vdGVOb2RlIiwiYXBwZW5kQ2hpbGQiLCJkZWxOb3RlIiwiYmluZCIsIm5ld05vdGUiLCJzZXRDb2xvck5vdGUiLCJzYXZlTm90ZVRleHQiLCJub3RlSWQiLCJkYXRhc2V0IiwiZmluZEluZGV4IiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsInNwbGljZSIsImluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEiLCJyZW1vdmUiLCJwYWdlTG9jYXRpb24iLCJzbGljZSIsIm5ld05vdGVEYXRhIiwidmFsdWUiLCJjdXJyZW50Q29sb3IiLCJuZXdDb2xvciIsImluZGV4T2YiLCJjbGFzc0xpc3QiLCJmaWx0ZXJEYXRhIiwiZmlsdGVyIiwiYXBwIiwiYm9keSIsIndpbmRvdyIsIk1lbnUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJsaW5rcyIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGluayIsImFjdGl2ZSIsIl9fZmVzdF9jb250ZXh0IiwiX19mZXN0X3NlbGYiLCJfX2Zlc3RfYnVmIiwiX19mZXN0X2NodW5rcyIsIl9fZmVzdF9jaHVuayIsIl9fZmVzdF9hdHRycyIsIl9fZmVzdF9zZWxlY3QiLCJfX2Zlc3RfaWYiLCJfX2Zlc3RfaXRlcmF0b3IiLCJfX2Zlc3RfdG8iLCJfX2Zlc3RfZm4iLCJfX2Zlc3RfaHRtbCIsIl9fZmVzdF9ibG9ja3MiLCJfX2Zlc3RfcGFyYW1zIiwiX19mZXN0X2VsZW1lbnQiLCJfX2Zlc3RfZGVidWdfZmlsZSIsIl9fZmVzdF9kZWJ1Z19saW5lIiwiX19mZXN0X2RlYnVnX2Jsb2NrIiwiX19mZXN0X2VsZW1lbnRfc3RhY2siLCJfX2Zlc3Rfc2hvcnRfdGFncyIsIl9fZmVzdF9qc2NoYXJzIiwiX19mZXN0X2pzY2hhcnNfdGVzdCIsIl9fZmVzdF9odG1sY2hhcnMiLCJfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QiLCJfX2Zlc3RfanNoYXNoIiwiX19mZXN0X2h0bWxoYXNoIiwiX19mZXN0X2VzY2FwZUpTIiwidGVzdCIsIl9fZmVzdF9yZXBsYWNlSlMiLCJjaHIiLCJfX2Zlc3RfZXNjYXBlSFRNTCIsIl9fZmVzdF9yZXBsYWNlSFRNTCIsIl9fZmVzdF9leHRlbmQiLCJkZXN0Iiwic3JjIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJfX2Zlc3RfcGFyYW0iLCJmbiIsInBhcmFtIiwiaTE4biIsInN0ciIsIl9fX2Zlc3RfbG9nX2Vycm9yIiwiX19mZXN0X2Vycm9yIiwiY29uc29sZSIsImVycm9yIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9fZmVzdF9sb2dfZXJyb3IiLCJtc2ciLCJfX2Zlc3RfY2FsbCIsInBhcmFtcyIsImNwIiwiaSIsImpzb24iLCJfX2Zlc3RfaXRlcmF0b3IwIiwiZSIsIm1lc3NhZ2UiLCJsZW5ndGgiLCJ0cmFuc2xpdGVyYXRlIiwicnVzIiwic3BsaXQiLCJlbmciLCJlbmdUb1J1cyIsIngiLCJqb2luIiwidG9VcHBlckNhc2UiLCJGb3JtIiwib25TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnRzIiwidG9Mb3dlckNhc2UiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImNsZWFyIiwiTm90ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVJLEtBQUlBLFdBQVc7QUFDWEMsV0FBTSxDQUNGO0FBQ0lDLGdCQUFPLGFBRFg7QUFFSUMsZUFBTTtBQUZWLE1BREUsRUFLRjtBQUNJRCxnQkFBTyxPQURYO0FBRUlDLGVBQU07QUFGVixNQUxF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QUFULENBQXFCZCxFQUFyQixFQUF5QmUsTUFBekIsRUFBZ0NDLEVBQWhDLEVBQW1DO0FBQUMsT0FBR0EsRUFBSCxFQUFNLEtBQUksSUFBSUMsQ0FBUixJQUFhRixNQUFiO0FBQW9CLFFBQUcsT0FBT0EsT0FBT0UsQ0FBUCxDQUFQLElBQWtCLFVBQWxCLElBQThCRixPQUFPRSxDQUFQLEVBQVVoQixLQUEzQyxFQUFpRGMsT0FBT0UsQ0FBUCxJQUFVRixPQUFPRSxDQUFQLEdBQVY7QUFBckUsSUFBMkYsT0FBT2pCLEdBQUcxQyxJQUFILENBQVFLLFdBQVIsRUFBb0JvRCxNQUFwQixDQUFQO0FBQW1DLE9BQUlHLE9BQUt4RCxjQUFULENBQXdCRSxjQUFhLGlYQUFiLENBQWdZTyxZQUFVTixjQUFjeUQsTUFBeEIsQ0FBK0IsSUFBSW5ELFNBQUosRUFBZTtBQUFDRCxxQkFBa0IsQ0FBbEIsQ0FBb0IsT0FBTUEsa0JBQWdCQyxTQUF0QixFQUFnQ0QsaUJBQWhDLEVBQW1EO0FBQUNKLG1CQUFhRCxjQUFjSyxlQUFkLENBQWIsQ0FBNEMsSUFBSSxPQUFPSixZQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQUNPLG9CQUFhUCxZQUFiO0FBQTJCLEtBQWhFLE1BQXNFO0FBQUNNLGlCQUFVRSxjQUFjUixhQUFhOUUsSUFBM0IsQ0FBVixDQUEyQyxJQUFJb0YsU0FBSixFQUFlQyxlQUFheUMsWUFBWTFDLFNBQVosRUFBc0JOLGFBQWFpRCxNQUFuQyxFQUEwQ2pELGFBQWFrRCxFQUF2RCxDQUFiO0FBQXlFO0FBQUMsV0FBTzNDLGNBQVlULFVBQW5CO0FBQStCLEdBQTlXLE1BQW9YO0FBQUMsVUFBT0EsVUFBUDtBQUFtQjtBQUFDLEUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGNmNzNiYzNhN2E4NzBhMTFmMWQiLCJpbXBvcnQgeyBNZW51IH0gZnJvbSAnLi4vbWVudS9tZW51LmpzJztcclxuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL2Zvcm0vZm9ybS5qcyc7XHJcbmltcG9ydCB7IE5vdGUgfSBmcm9tICcuLi9ub3RlL25vdGUuanMnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9hcHAueG1sLmpzJztcclxuXHJcbiAgICBsZXQgbWVudURhdGEgPSB7XHJcbiAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9CS0YHQtSDQt9Cw0LzQtdGC0LrQuCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYWxsJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Ci0LXQutGB0YInLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RleHQnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBub3Rlc0RhdGEgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnMTIzNCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgdGFnczogWyd0ZXh0JywgJ2FsbCddXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIHRleHQ6ICcyMzQ1JyxcclxuICAgICAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxyXG4gICAgICAgICAgICB0YWdzOiBbJ3RleHQnXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgbm90ZXNDb2xvcnMgPSBbJ3llbGxvdycsICdncmVlbiddO1xyXG5cclxuICAgIGNsYXNzIEFwcCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBuZXcgTWVudShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVudScpLCBtZW51RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZW51LWZvcm0nKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybS5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZC1uZXcnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuYWRkKGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb3Rlcyhub3Rlc0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Um91dGUgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS50b2dnbGVBY3RpdmUocm91dGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVzRmlsdGVyKHJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlck5vdGVzIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ub3RlcycpLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goIGl0ZW0gPT4gdGhpcy5hZGROb3RlKGl0ZW0pICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGROb3RlIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSBuZXcgTm90ZShkaXYsIGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKG5vdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBub3RlTm9kZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtbm90ZXMnKS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIG5vdGVOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBub3RlTm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtYWRkLW5ldycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5uZXdOb3RlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBub3RlTm9kZS5xdWVyeVNlbGVjdG9yKCcuanMtc2V0LWNvbG9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldENvbG9yTm90ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgbm90ZU5vZGUucXVlcnlTZWxlY3RvcignLm5vdGVfX3RleHQnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLnNhdmVOb3RlVGV4dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpbmRleE9mTm90ZUluTm90ZXNEYXRhIChub3RlTm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub3RlSWQgPSBub3RlTm9kZS5kYXRhc2V0LmlkO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBub3Rlc0RhdGEuZmluZEluZGV4KCBub3RlID0+IG5vdGUuaWQgPT09ICtub3RlSWQgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGVsTm90ZSAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5zcGxpY2UodGhpcy5pbmRleE9mTm90ZUluTm90ZXNEYXRhKG5vdGVOb2RlKSwgMSk7XHJcbiAgICBcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG5ld05vdGUgKCkge1xyXG4gICAgICAgICAgICBsZXQgdGFncyA9IFsnYWxsJ107XHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VMb2NhdGlvbiA9ICcnIHx8IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgaWYgKHBhZ2VMb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGFncy5wdXNoKHBhZ2VMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpZCA9IDE7IC8v0LXRgdC70Lgg0LfQsNC80LXRgtC+0Log0L3QtdGCXHJcbiAgICAgICAgICAgIGlkID0gbm90ZXNEYXRhLnNsaWNlKC0xKVswXS5pZCArIDEgfHwgaWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBuZXdOb3RlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YS5wdXNoKG5ld05vdGVEYXRhKTtcclxuICAgIFxyXG4gICAgICAgICAgICBwYWdlTG9jYXRpb24gPyB0aGlzLm5vdGVzRmlsdGVyKHBhZ2VMb2NhdGlvbikgOiB0aGlzLnJlbmRlck5vdGVzKG5vdGVzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNhdmVOb3RlVGV4dCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YVt0aGlzLmluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEobm90ZU5vZGUpXS50ZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldENvbG9yTm90ZSAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZU5vZGUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbG9yID0gbm90ZXNEYXRhW3RoaXMuaW5kZXhPZk5vdGVJbk5vdGVzRGF0YShub3RlTm9kZSldLmNvbG9yO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0L7RgdC70LXQtNC90LjQuSDRhtCy0LXRgiDQsiDQvNCw0YHRgdC40LLQtSwg0YLQviDQsdC10YDQtdC8INC/0LXRgNCy0YvQuVxyXG4gICAgICAgICAgICBsZXQgbmV3Q29sb3IgPSBub3Rlc0NvbG9yc1swXTtcclxuICAgICAgICAgICAgbmV3Q29sb3IgPSBub3Rlc0NvbG9yc1tub3Rlc0NvbG9ycy5pbmRleE9mKGN1cnJlbnRDb2xvcikgKyAxXSB8fCBuZXdDb2xvcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vdGVzRGF0YVt0aGlzLmluZGV4T2ZOb3RlSW5Ob3Rlc0RhdGEobm90ZU5vZGUpXS5jb2xvciA9IG5ld0NvbG9yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbm90ZU5vZGUuY2xhc3NMaXN0LnJlbW92ZShgbm90ZV8ke2N1cnJlbnRDb2xvcn1gKTtcclxuICAgICAgICAgICAgbm90ZU5vZGUuY2xhc3NMaXN0LmFkZChgbm90ZV8ke25ld0NvbG9yfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBub3Rlc0ZpbHRlciAocm91dGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyRGF0YSA9IG5vdGVzRGF0YS5maWx0ZXIoKG5vdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3RlLnRhZ3MuaW5kZXhPZihyb3V0ZSkgIT09IC0xO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTm90ZXMoZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBhcHAgPSBuZXcgQXBwKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIGFwcC5zZXRSb3V0ZShsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJykpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL2FwcC9hcHAuanMiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9tZW51LnhtbC5qcyc7XHJcblxyXG5cclxuY2xhc3MgTWVudSB7XHJcbiBcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IHRoaXMucmVuZGVyKG5vZGUsIGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMudGl0bGUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpzLXRpdGxlJyk7XHJcbiAgICAgICAgLy90aGlzLnRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKG5vZGUsIGRhdGEpIHtcclxuICAgICAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JTQvtCx0LDQstC70LXRj9GCINC90L7QstGL0LkgaXRlbSDQsiDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSDQvtC/0LjRgdCw0L3QuNC10Lwg0L/Rg9C90LrRgtCwINC80LXQvdGOXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbS50aXRsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0ubmFtZVxyXG4gICAgICovXHJcbiAgICBhZGQoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuZGF0YS5saXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5ub2RlLCB0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JzQtdGC0L7QtCDQv9C10YDQtdC60LvRjtGH0LDQtdGCINCw0LrRgtC40LLQvdGL0Lkg0L/Rg9C90LrRgiDQvNC10L3RjlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDQuNC80Y8g0LDQutGC0LjQstC90L7Qs9C+INC/0YPQvdC60YLQsCDQvNC10L3RjlxyXG4gICAgICovXHJcbiAgICB0b2dnbGVBY3RpdmUgKG5hbWUpIHtcclxuICAgICAgICBsZXQgbGlua3MgPSBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpKTtcclxuXHJcbiAgICAgICAgbGlua3MuZm9yRWFjaCggbGluayA9PiB7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9fbGlua19hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGFjdGl2ZSA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKGAubWVudV9fbGluay5qcy0ke25hbWV9YCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7IE1lbnUgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL21lbnUvbWVudS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJtZW51XFxcIj48dWwgY2xhc3M9XFxcIm1lbnVfX2xpc3RcXFwiPlwiKTt2YXIgaSxpdGVtLF9fZmVzdF9pdGVyYXRvcjA7dHJ5e19fZmVzdF9pdGVyYXRvcjA9anNvbi5saXN0IHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IwKXtpdGVtPV9fZmVzdF9pdGVyYXRvcjBbaV07X19mZXN0X2J1Zis9KFwiPGxpIGNsYXNzPVxcXCJtZW51X19pdGVtXFxcIj5cIik7dHJ5e19fZmVzdF9hdHRyc1swXT1fX2Zlc3RfZXNjYXBlSFRNTChpdGVtLm5hbWUpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1swXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fXRyeXtfX2Zlc3RfYXR0cnNbMV09X19mZXN0X2VzY2FwZUhUTUwoaXRlbS5uYW1lKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMV09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31fX2Zlc3RfYnVmKz0oXCI8YSBjbGFzcz1cXFwibWVudV9fbGluayBqcy1cIiArIF9fZmVzdF9hdHRyc1swXSArIFwiXFxcIiBocmVmPVxcXCIjXCIgKyBfX2Zlc3RfYXR0cnNbMV0gKyBcIlxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoaXRlbS50aXRsZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI2XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2E+PC9saT5cIik7fV9fZmVzdF9idWYrPShcIjwvdWw+PC9kaXY+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0M6L3Byb2plY3RzL2pzXzIwMTYxMDEwL2Jsb2Nrcy9tZW51L21lbnUueG1sLmpzIiwiLy8gaW1wb3J0IGZlc3QuZm9ybVxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vZm9ybS54bWwuanMnO1xuXG4vL9CV0YHQu9C4INGBINCw0L3Qs9C70LjQudGB0LrQvtCz0L4g0L3QsCDRgNGD0YHRgdC60LjQuSwg0YLQviDQv9C10YDQtdC00LDRkdC8INCy0YLQvtGA0YvQvCDQv9Cw0YDQsNC80LXRgtGA0L7QvCB0cnVlLlxubGV0IHRyYW5zbGl0ZXJhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgICBydXMgPSBcItGJICAg0YggINGHICDRhiAg0Y4gINGPICDRkSAg0LYgINGKICDRiyAg0Y0gINCwINCxINCyINCzINC0INC1INC3INC4INC5INC6INC7INC8INC9INC+INC/INGAINGBINGCINGDINGEINGFINGMXCIuc3BsaXQoLyArL2cpLFxuICAgICAgICBlbmcgPSBcInNoaCBzaCBjaCBjeiB5dSB5YSB5byB6aCBgYCB5JyBlYCBhIGIgdiBnIGQgZSB6IGkgaiBrIGwgbSBuIG8gcCByIHMgdCB1IGYgeCBgXCIuc3BsaXQoLyArL2cpXG4gICAgICAgIDtcbiAgICByZXR1cm4gZnVuY3Rpb24odGV4dCwgZW5nVG9SdXMpIHtcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIGZvcih4ID0gMDsgeCA8IHJ1cy5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoZW5nVG9SdXMgPyBlbmdbeF0gOiBydXNbeF0pLmpvaW4oZW5nVG9SdXMgPyBydXNbeF0gOiBlbmdbeF0pO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoZW5nVG9SdXMgPyBlbmdbeF0udG9VcHBlckNhc2UoKSA6IHJ1c1t4XS50b1VwcGVyQ2FzZSgpKS5qb2luKGVuZ1RvUnVzID8gcnVzW3hdLnRvVXBwZXJDYXNlKCkgOiBlbmdbeF0udG9VcHBlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufSkoKTtcblxuY2xhc3MgRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBtZW51KSB7XG4gICAgICAgIHRoaXMubWVudT0gbWVudTtcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yZW5kZXIobm9kZSk7XG5cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcy1mb3JtJyk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlbmRlcihub2RlKSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgb25TdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2FkZC1uZXcnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmZvcm0uZWxlbWVudHMudGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRyYW5zbGl0ZXJhdGUodGhpcy5mb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLmNsZWFyKCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IEZvcm0gfTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL2Zvcm0vZm9ybS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX1fX2Zlc3RfYnVmKz0oXCI8Zm9ybSBjbGFzcz1cXFwiZm9ybSBqcy1mb3JtXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXFxcIiBjbGFzcz1cXFwiZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInRpdGxlXFxcIi8+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DOi9wcm9qZWN0cy9qc18yMDE2MTAxMC9ibG9ja3MvZm9ybS9mb3JtLnhtbC5qcyIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL25vdGUueG1sLmpzJztcclxuXHJcbmNsYXNzIE5vdGUge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcy5kYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTm90ZSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0M6L3Byb2plY3RzL2pzXzIwMTYxMDEwL2Jsb2Nrcy9ub3RlL25vdGUuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7dHJ5e19fZmVzdF9hdHRyc1swXT1fX2Zlc3RfZXNjYXBlSFRNTChqc29uLmNvbG9yKX1jYXRjaChlKXtfX2Zlc3RfYXR0cnNbMF09XCJcIjsgX19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO310cnl7X19mZXN0X2F0dHJzWzFdPV9fZmVzdF9lc2NhcGVIVE1MKGpzb24uaWQpfWNhdGNoKGUpe19fZmVzdF9hdHRyc1sxXT1cIlwiOyBfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fV9fZmVzdF9idWYrPShcIjxkaXYgY2xhc3M9XFxcIm5vdGUgbm90ZV9cIiArIF9fZmVzdF9hdHRyc1swXSArIFwiXFxcIiBkYXRhLWlkPVxcXCJcIiArIF9fZmVzdF9hdHRyc1sxXSArIFwiXFxcIj48aW1nIGNsYXNzPVxcXCJub3RlX19jbG9zZSBqcy1jbG9zZVxcXCIgc3JjPVxcXCJpbWdcXC9pY29fY2xvc2Uuc3ZnXFxcIi8+PHRleHRhcmVhIGNsYXNzPVxcXCJub3RlX190ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgiDQt9Cw0LzQtdGC0LrQuFxcXCIgcm93cz1cXFwiNlxcXCIgbWF4bGVuZ3RoPVxcXCIxMTlcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGpzb24udGV4dCkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI0XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RleHRhcmVhPjxkaXYgY2xhc3M9XFxcIm5vdGVfX2Zvb3RlclxcXCI+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9jb2xvciBqcy1zZXQtY29sb3JcXFwiIHNyYz1cXFwiaW1nXFwvaWNvX2NvbG9yLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fYWRkLW5ldyBqcy1hZGQtbmV3XFxcIiBzcmM9XFxcImltZ1xcL2ljb19hZGQuc3ZnXFxcIi8+PGltZyBjbGFzcz1cXFwibm90ZV9fYnV0dG9uIG5vdGVfX2J1dHRvbl9saW5rIGpzLWdldC1saW5rXFxcIiBzcmM9XFxcImltZ1xcL2ljb19saW5rLnN2Z1xcXCIvPjxpbWcgY2xhc3M9XFxcIm5vdGVfX2J1dHRvbiBub3RlX19idXR0b25fc2F2ZSBqcy1zYXZlXFxcIiBzcmM9XFxcImltZ1xcL2ljb19zYXZlLnN2Z1xcXCIvPjwvZGl2PjwvZGl2PlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DOi9wcm9qZWN0cy9qc18yMDE2MTAxMC9ibG9ja3Mvbm90ZS9ub3RlLnhtbC5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJhcHBcXFwiPjxkaXYgY2xhc3M9XFxcImFwcF9fc2lkZWJhclxcXCI+PGRpdiBjbGFzcz1cXFwiYXBwX19sb2dvXFxcIj48aW1nIGNsYXNzPVxcXCJhcHBfX3RpdGxlXFxcIiBzcmM9XFxcImltZ1xcL2xvZ29fdGV4dC5zdmdcXFwiLz48aW1nIGNsYXNzPVxcXCJhcHBfX2ljb25cXFwiIHNyYz1cXFwiaW1nXFwvbG9nb19tYXJrLnN2Z1xcXCIvPjwvZGl2PjxociBjbGFzcz1cXFwiYXBwX19oclxcXCIvPjxkaXYgY2xhc3M9XFxcImFwcF9fbWVudSBqcy1tZW51XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJhcHBfX2Zvcm0ganMtbWVudS1mb3JtXFxcIj48L2Rpdj48aHIgY2xhc3M9XFxcImFwcF9faHJcXFwiLz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJhcHBfX25vdGVzIGpzLW5vdGVzXFxcIj48L2Rpdj48L2Rpdj5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQzovcHJvamVjdHMvanNfMjAxNjEwMTAvYmxvY2tzL2FwcC9hcHAueG1sLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==