/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/jsvm/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "034f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("85ec");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "078a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "199c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("25f0");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_Translator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7b49");
/* harmony import */ var acorn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("b0e0");
/* harmony import */ var _components_CodeViewer_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ea81");
/* harmony import */ var _js_FileRaw_assets_md5_min_txt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c6e1");
/* harmony import */ var _js_FileRaw_assets_md5_min_txt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_FileRaw_assets_md5_min_txt__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_FileRaw_assets_sha512_js_txt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("eb50");
/* harmony import */ var _js_FileRaw_assets_sha512_js_txt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_FileRaw_assets_sha512_js_txt__WEBPACK_IMPORTED_MODULE_6__);


//
//
//
//
//
//
//
//
//
//
//
//
//




 //功能测试代码

var testJs = "\nconst a=127,b=256,c=0x7777,d=0xfffffff,f=0xfffffffff,g=1234.5678\nconsole.log(\"a-b=\"+(a-b))\nconsole.log(\"b-a=\"+(b-a))\nconsole.log(\"c-a=\"+(c-a))\nconsole.log(\"d-a=\"+(d-a))\nconsole.log(\"f-d=\"+(f-d))\nconsole.log(\"g-a=\"+(g-a))\nconsole.log(\"\u4E5F\u4E0D\u5BF9\u3010-_.'~!*()\u3011\u53CA\u3010@#$&+=:;/?,\u3011\u7F16\u7801\")\nconst obj={\n  a:1,b:2,\n  c:{\n    d:1,f:2\n  }\n}\ndelete obj.a\ndelete obj[\"b\"]\ndelete obj.c.d\nconsole.log(obj)\n\nlet kk=0;\nkk++,console.log(kk),++kk,console.log(kk),kk\nconsole.log(kk)\n\nlet k=0,m=0;\nm=k+k++\nconsole.log(m)\nconsole.log(k)\n\nm=k+(++k)\nconsole.log(m)\nconsole.log(k)\n\nfunction switchTest(t){\n  console.log(\"test case \"+t)\n  switch(t){\n    case 1:console.log(\"1\");break;\n    case 2:console.log(\"2\");\n    default:console.log(\"default\");\n    case 3:console.log(\"3\");break;\n    case 4:{console.log(\"4\");}break;\n    case 5:{console.log(\"5\");}\n    case 6:{console.log(\"6\");}\n  }\n}\n\nswitchTest(1)\nswitchTest(2)\nswitchTest(3)\nswitchTest(4)\nswitchTest(5)\nswitchTest(6)\nswitchTest(7)\n\n\nfunction NewObject(obj){\n  console.log(\"call NewObject constructor\")\n  this.$1=0\n  this.$c=\"abcdefg\"\n  this.arg=obj\n  console.log(\"now this is \"+this)\n}\nNewObject.prototype.getFirst=function(){\n  return this.$1\n}\n\nNewObject.prototype.getTest=function(){\n  return this.$c\n}\nNewObject.prototype.getThis=function(){\n  return this\n}\n\nconsole.log(\"test create new NewObject\")\nconst testObj=new NewObject({param:123})\n\nconsole.log(\"testObj is \"+testObj)\nconsole.log(\"test call method getFirst ,return is  \"+testObj.getFirst())\nconsole.log(\"test call method getTest ,return is  \"+testObj.getTest())\n\nconsole.log(\"test call method getThis ,return is  \"+testObj.getThis())\n\nconsole.log(\"test visit member ,testObj.args=  \"+testObj.arg)\n";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'App',
  components: {
    CodeViewer: _components_CodeViewer_vue__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
  },
  data: function data() {
    return {
      sourceCode: testJs,
      compiledCode: ""
    };
  },
  mounted: function mounted() {
    this.compileCode();
  },
  methods: {
    compileMd5: function compileMd5() {
      this.sourceCode = _js_FileRaw_assets_md5_min_txt__WEBPACK_IMPORTED_MODULE_5___default.a;
      this.compileCode();
    },
    compileSha512: function compileSha512() {
      this.sourceCode = _js_FileRaw_assets_sha512_js_txt__WEBPACK_IMPORTED_MODULE_6___default.a;
      this.compileCode();
    },
    changeSource: function changeSource(code) {
      this.sourceCode = code;
    },
    changeCode: function changeCode(code) {
      this.compiledCode = code;
    },
    compileCode: function compileCode() {
      var supperise = acorn__WEBPACK_IMPORTED_MODULE_3__[/* parse */ "a"](this.sourceCode, {
        sourceType: "script",
        ecmaVersion: 2015
      });
      console.log(supperise);
      var promise = _js_Translator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].accept(this.sourceCode, supperise);
      console.log(promise);
      var real = promise.translate();
      console.log(real);
      this.compiledCode = real.toString();
    },
    runCode: function runCode() {
      eval(this.compiledCode);
    }
  }
});

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5138b6f0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=e8dfc344&
var Appvue_type_template_id_e8dfc344_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('button',{on:{"click":_vm.compileMd5}},[_vm._v("编译md5")]),_c('button',{on:{"click":_vm.compileSha512}},[_vm._v("编译sha512")]),_c('div',{staticStyle:{"display":"flex"}},[_c('code-viewer',{key:1,staticStyle:{"width":"600px"},attrs:{"sourceCode":_vm.sourceCode},on:{"code-change":_vm.changeSource}}),_c('code-viewer',{key:2,staticStyle:{"width":"600px"},attrs:{"sourceCode":_vm.compiledCode},on:{"code-change":_vm.changeCode}})],1),_c('button',{on:{"click":_vm.compileCode}},[_vm._v("转换")]),_c('button',{on:{"click":_vm.runCode}},[_vm._v("运行")])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=e8dfc344&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
var Appvue_type_script_lang_js_ = __webpack_require__("199c");

// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&lang=css&
var Appvue_type_style_index_0_lang_css_ = __webpack_require__("034f");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_e8dfc344_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// CONCATENATED MODULE: ./src/main.js






vue_runtime_esm["a" /* default */].config.productionTip = false;
new vue_runtime_esm["a" /* default */]({
  render: function render(h) {
    return h(App);
  }
}).$mount('#app');

/***/ }),

/***/ "7b49":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-names.js
var es_object_get_own_property_names = __webpack_require__("7039");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.parse-int.js
var es_number_parse_int = __webpack_require__("25eb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__("00b4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__("4ae1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.to-string-tag.js
var es_reflect_to_string_tag = __webpack_require__("f8c9");

// CONCATENATED MODULE: ./src/js/CodeDefine.js



var byteCode_define_index = 0;
/* harmony default export */ var CodeDefine = ({
  exit: {
    des: {
      code: "exit",
      stack: "[...]...",
      newStack: "[]"
    },
    name: 'exit',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.exit();
      runtime.next(1);
    }
  },
  eqJmp: {
    des: {
      code: "eqJmp codeIndex",
      stack: "[arg1,arg2]",
      newStack: "[]"
    },
    name: 'eqJmp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();

      if (left === right) {
        runtime.jmp();
      } else {
        runtime.next(2);
      }
    }
  },
  neqJmp: {
    des: {
      code: "neqJmp codeIndex",
      stack: "[arg1,arg2]",
      newStack: "[]"
    },
    name: 'neqJmp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();

      if (left === right) {
        runtime.next(2);
      } else {
        runtime.jmp();
      }
    }
  },
  loadConst: {
    des: {
      code: "loadConst stringValueIndex",
      stack: "[]",
      newStack: "[stringVal]"
    },
    name: 'loadConst',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.loadConstant(runtime.nextCodeVal()));
      runtime.next(2);
    }
  },
  loadBlank: {
    des: {
      code: "loadBlank",
      stack: "[]",
      newStack: "['']"
    },
    name: 'loadBlank',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack("");
      runtime.next(1);
    }
  },
  add: {
    des: {
      code: "add",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'add',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();
      runtime.pushStack(left + right);
      runtime.next(1);
    }
  },
  mkArr: {
    des: {
      code: "mkArr argsLenth",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[[arg1,arg2,arg3...]]"
    },
    name: 'makeArray',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var len = runtime.nextCodeVal();
      var array = runtime.popStackTopN(len);
      runtime.pushStack(array);
      runtime.next(2);
    }
  },
  loadVar: {
    des: {
      code: "loadVar tagetObjectStackPosition[stackIndex,positionIndex]",
      stack: "[]",
      newStack: "[varVal]"
    },
    name: 'loadVar',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitStackVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      runtime.pushStack(val);
      runtime.next(3);
    }
  },
  loadValue: {
    des: {
      code: "loadValue val",
      stack: "[]",
      newStack: "[val]"
    },
    name: 'loadValue',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.nextCodeVal();
      runtime.pushStack(val);
      runtime.next(2);
    }
  },
  loadValue2: {
    des: {
      code: "loadValue2 i8 i8",
      stack: "[]",
      newStack: "[val]"
    },
    name: 'loadValue2',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack((runtime.nextCodeVal() << 8) + runtime.nextCodeNVal(2));
      runtime.next(3);
    }
  },
  loadValue4: {
    des: {
      code: "loadValue4 i8 i8 i8 i8",
      stack: "[]",
      newStack: "[val]"
    },
    name: 'loadValue4',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack((runtime.nextCodeVal() << 24) + (runtime.nextCodeNVal(2) << 16) + (runtime.nextCodeNVal(3) << 8) + runtime.nextCodeNVal(4));
      runtime.next(5);
    }
  },
  parseInt: {
    des: {
      code: "parseInt",
      stack: "[str]",
      newStack: "[val]"
    },
    name: 'loadValue',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.toInt(runtime.popStackTop()));
      runtime.next(1);
    }
  },
  parseFloat: {
    des: {
      code: "parseFloat",
      stack: "[str]",
      newStack: "[val]"
    },
    name: 'loadValue',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.toFloat(runtime.popStackTop()));
      runtime.next(1);
    }
  },
  loadThis: {
    des: {
      code: "loadThis",
      stack: "[]",
      newStack: "[this]"
    },
    name: 'loadThis',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.loadThis());
      runtime.next(1);
    }
  },
  newStack: {
    des: {
      code: "newStack",
      stack: "[]",
      newStack: "[][]"
    },
    name: 'newStack',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.newStack();
      runtime.next(1);
    }
  },
  storeVar: {
    des: {
      code: "storeVar tagetObjectStackPosition[stackIndex,positionIndex]",
      stack: "[arg]",
      newStack: "[]"
    },
    name: 'storeVar',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.popStackTop();
      runtime.storeStackValue(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2), val);
      runtime.next(3);
    }
  },
  movToStash: {
    des: {
      code: "movToStash",
      stack: "[arg]",
      newStack: "[]"
    },
    name: 'movToStash',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.movToStash();
      runtime.next(1);
    }
  },
  movfromStash: {
    des: {
      code: "movfromStash",
      stack: "[]",
      newStack: "[arg]"
    },
    name: 'movfromStash',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.movfromStash();
      runtime.next(1);
    }
  },
  min: {
    des: {
      code: "minus",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'minus',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();
      runtime.pushStack(left - right);
      runtime.next(1);
    }
  },
  initVarIfNeed: {
    des: {
      code: "initVarIfNeed tagetObjectStackPosition[stackIndex,positionIndex]",
      stack: "[arg]",
      newStack: "[]"
    },
    name: 'initVarIfNeed',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      if (runtime.visitStackVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2)) === undefined) {
        runtime.storeStackValue(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2), undefined);
      }

      runtime.next(3);
    }
  },
  load2NumAsArray: {
    des: {
      code: "load2NumAsArray n1 n2",
      stack: "[]",
      newStack: "[[n1,b2]]"
    },
    name: 'load2NumAsArray',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack([runtime.nextCodeNVal(1), runtime.nextCodeNVal(2)]);
      runtime.next(3);
    }
  },
  mul: {
    des: {
      code: "mul",
      stack: "[arg1,arg2]"
    },
    name: 'mul',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();
      runtime.pushStack(left * right);
      runtime.next(1);
    }
  },
  div: {
    des: {
      code: "div",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'div',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();
      runtime.pushStack(left / right);
      runtime.next(1);
    }
  },
  storeContextVar: {
    des: {
      code: "storeContextVar tagetObjectStackPosition[stackIndex,positionIndex]",
      stack: "[arg]",
      newStack: "[]"
    },
    name: 'storeContextVar',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.popStackTop();
      runtime.storeContextVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2), val);
      runtime.next(3);
    }
  },
  storeContextVarSelective: {
    des: {
      code: "storeContextVarSelective tagertObjectNameIndex",
      stack: "[arg,arr]",
      newStack: "[]"
    },
    name: 'storeContextVarSelective',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var selective = runtime.popStackTop(),
          val = runtime.popStackTop();
      runtime.storeContextVarSelective(selective, val) ? 1 : runtime.pushBackEnv(runtime.loadConstant(runtime.nextCodeVal()), val);
      runtime.next(2);
    }
  },
  mod: {
    des: {
      code: "mod",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'mod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();
      runtime.pushStack(left % right);
      runtime.next(1);
    }
  },
  newClassObject: {
    des: {
      code: "newClassObject classNameIndex argsLenth",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[retVal]"
    },
    name: 'newClassObject',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var className = runtime.loadConstant(runtime.nextCodeVal()),
          array = runtime.popStackTopN(runtime.nextCodeNVal(2)); // const target=Object.create(classObj.prototype)
      // classObj.apply(target,array)

      runtime.pushStack(Reflect.construct(runtime.envObject(className), array));
      runtime.next(3); // runtime.pushStack(new (runtime.envObject(className))(...array))
    }
  },
  callFunc: {
    des: {
      code: "callFunc functionNameIndex argsLenth",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[retVal]"
    },
    name: 'callFunc',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var className = runtime.loadConstant(runtime.nextCodeVal());
      var array = runtime.popStackTopN(runtime.nextCodeNVal(2));
      runtime.pushStack(runtime.envObject(className).apply(window, array));
      runtime.next(3);
    }
  },
  memberMethod: {
    des: {
      code: "memberMethod tagetObjectStackPosition[stackIndex,positionIndex] functionNameIndex argsLenth",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[retVal]"
    },
    name: 'memberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitStackVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      var index = runtime.nextCodeNVal(3),
          methodName = runtime.loadConstant(index),
          args = runtime.nextCodeNVal(4);
      var array = runtime.popStackTopN(args);
      runtime.pushStack(val[methodName].apply(val, array));
      runtime.next(5);
    }
  },
  memberIndexMethod: {
    des: {
      code: "memberIndexMethod tagetObjectStackPosition[stackIndex,positionIndex] argsLenth",
      stack: "[arg1,arg2,arg3...,functionTarget]",
      newStack: "[retVal]"
    },
    name: 'memberIndexMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitStackVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      var args = runtime.nextCodeNVal(3);
      var methodName = runtime.popStackTop();
      var array = runtime.popStackTopN(args);
      runtime.pushStack(val[methodName].apply(val, array));
      runtime.next(4);
    }
  },
  contextMemberMethod: {
    des: {
      code: "contextMemberMethod tagetObjectStackPosition[stackIndex,positionIndex] functionNameIndex argsLenth",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[retVal]"
    },
    name: 'contextMemberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitContextVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      var index = runtime.nextCodeNVal(3),
          methodName = runtime.loadConstant(index),
          args = runtime.nextCodeNVal(4);
      var array = runtime.popStackTopN(args);
      runtime.pushStack(val[methodName].apply(val, array));
      runtime.next(5);
    }
  },
  contextMemberMethodSelective: {
    des: {
      code: "contextMemberMethodSelective functionNameIndex argsLenth nameIdex",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[retVal]"
    },
    name: 'contextMemberMethodSelective',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var methodName = runtime.loadConstant(runtime.nextCodeNVal(1)),
          args = runtime.nextCodeNVal(2),
          alterName = runtime.loadConstant(runtime.nextCodeNVal(3)),
          selective = runtime.popStackTop();

      var _v = runtime.visitContextValSelective(selective);

      var array = runtime.popStackTopN(args),
          target = _v[0] ? _v[1] : runtime.envObject(alterName);
      runtime.pushStack(target[methodName].apply(target, array));
      runtime.next(4);
    }
  },
  contextMemberIndexMethod: {
    des: {
      code: "contextMemberMethod tagetObjectStackPosition[stackIndex,positionIndex] argsLenth",
      stack: "[arg1,arg2,arg3...,functionTarget]",
      newStack: "[retVal]"
    },
    name: 'contextMemberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitContextVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      var args = runtime.nextCodeNVal(3);
      var methodName = runtime.popStackTop();
      var array = runtime.popStackTopN(args);
      runtime.pushStack(val[methodName].apply(val, array));
      runtime.next(4);
    }
  },
  contextMemberIndexMethodSelective: {
    des: {
      code: "contextMemberMethod  argsLenth nameIndex",
      stack: "[arg1,arg2,arg3...,functionTarget]",
      newStack: "[retVal]"
    },
    name: 'contextMemberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var args = runtime.nextCodeNVal(1),
          alterName = runtime.loadConstant(runtime.nextCodeNVal(2)),
          methodName = runtime.popStackTop(),
          selective = runtime.popStackTop();

      var _v = runtime.visitContextValSelective(selective);

      var array = runtime.popStackTopN(args),
          target = _v[0] ? _v[1] : runtime.envObject(alterName);
      runtime.pushStack(target[methodName].apply(target, array));
      runtime.next(3);
    }
  },
  noopN: {
    des: {
      code: "noopN n",
      stack: "[]",
      newStack: "[]"
    },
    name: 'popStack',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.next(runtime.nextCodeVal() + 2);
    }
  },
  and: {
    des: {
      code: "and",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'and',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.popStackTop() && runtime.popStackTop());
      runtime.next(1);
    }
  },
  or: {
    des: {
      code: "or",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'or',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop();
      var left = runtime.popStackTop();
      runtime.pushStack(left || right);
      runtime.next(1);
    }
  },
  byteAnd: {
    des: {
      code: "byteAnd",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'byteAnd',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left & right);
      runtime.next(1);
    }
  },
  byteOr: {
    des: {
      code: "byteOr",
      stack: "[arg1,arg2]",
      newStack: "[retVal]"
    },
    name: 'byteOr',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left | right);
      runtime.next(1);
    }
  },
  loadNull: {
    des: {
      code: "loadNull",
      stack: "[]",
      newStack: "[null]"
    },
    name: 'loadNull',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(null);
      runtime.next(1);
    }
  },
  loadTrue: {
    des: {
      code: "loadTrue",
      stack: "[]",
      newStack: "[true]"
    },
    name: 'loadTrue',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(true);
      runtime.next(1);
    }
  },
  loadFalse: {
    des: {
      code: "loadFalse",
      stack: "[]",
      newStack: "[false]"
    },
    name: 'loadFalse',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(false);
      runtime.next(1);
    }
  },
  loadUndefined: {
    des: {
      code: "loadUndefined",
      stack: "[]",
      newStack: "[undefined]"
    },
    name: 'loadUndefined',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(undefined);
      runtime.next(1);
    }
  },
  loadWindow: {
    des: {
      code: "loadWindow",
      stack: "[]",
      newStack: "[window]"
    },
    name: 'loadWindow',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(window);
      runtime.next(1);
    }
  },
  envMemberMethod: {
    des: {
      code: "envMemberMethod tagertObjectNameIndex targetFunctionNameIndex argsLenth",
      stack: "[arg1,arg2,arg3...]",
      newStack: "[retVal]"
    },
    name: 'envMemberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var objName = runtime.loadConstant(runtime.nextCodeVal()),
          methodName = runtime.loadConstant(runtime.nextCodeNVal(2)),
          args = runtime.nextCodeNVal(3),
          array = runtime.popStackTopN(args),
          target = runtime.envObject(objName);
      runtime.pushStack(target[methodName].apply(target, array));
      runtime.next(4);
    }
  },
  envMemberIndexMethod: {
    des: {
      code: "envMemberMethod tagertObjectNameIndex argsLenth",
      stack: "[arg1,arg2,arg3...,method]",
      newStack: "[retVal]"
    },
    name: 'envMemberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var objName = runtime.loadConstant(runtime.nextCodeVal()),
          methodName = runtime.popStackTop(),
          args = runtime.nextCodeNVal(2),
          array = runtime.popStackTopN(args),
          target = runtime.envObject(objName);
      runtime.pushStack(target[methodName].apply(target, array));
      runtime.next(3);
    }
  },
  loadEnv: {
    des: {
      code: "loadEnv tagertObjectNameIndex",
      stack: "[]",
      newStack: "[targetObject]"
    },
    name: 'loadEnv',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var objName = runtime.loadConstant(runtime.nextCodeVal());
      runtime.pushStack(runtime.envObject(objName));
      runtime.next(2);
    }
  },
  jmpZero: {
    des: {
      code: "jmpZero codeIndex",
      stack: "[testVal]",
      newStack: "[]"
    },
    name: 'jmpZero',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      if (!runtime.popStackTop()) {
        runtime.jmp();
      } else {
        runtime.next(2);
      }
    }
  },
  jmpNotZero: {
    des: {
      code: "jmpNotZero codeIndex",
      stack: "[testVal]",
      newStack: "[]"
    },
    name: 'jmpNotZero',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      if (runtime.popStackTop()) {
        runtime.jmp();
      } else {
        runtime.next(2);
      }
    }
  },
  delStack: {
    des: {
      code: "delStack",
      stack: "[][]",
      newStack: "[]"
    },
    name: 'delStack',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.delStack();
      runtime.next(1);
    }
  },
  noop: {
    des: {
      code: "noop",
      stack: "[]",
      newStack: "[]"
    },
    name: 'noop',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.next(1);
    }
  },
  lt: {
    des: {
      code: "lt",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'lt',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left < right);
      runtime.next(1);
    }
  },
  gt: {
    des: {
      code: "gt",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'gt',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left > right);
      runtime.next(1);
    }
  },
  lte: {
    des: {
      code: "lte",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'lte',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left <= right);
      runtime.next(1);
    }
  },
  gte: {
    des: {
      code: "gte",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'gte',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left >= right);
      runtime.next(1);
    }
  },
  inc: {
    des: {
      code: "inc",
      stack: "[var1]",
      newStack: "[var1+1]"
    },
    name: 'inc',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.popStackTop() + 1);
      runtime.next(1);
    }
  },
  dec: {
    des: {
      code: "dec",
      stack: "[var1]",
      newStack: "[var1-1]"
    },
    name: 'dec',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.popStackTop() - 1);
      runtime.next(1);
    }
  },
  dupStack: {
    des: {
      code: "dupStack",
      stack: "[var1]",
      newStack: "[var1,var1]"
    },
    name: 'dupStack',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.dupStackTop();
      runtime.next(1);
    }
  },
  eq: {
    des: {
      code: "eq",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'eq',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.popStackTop() === runtime.popStackTop());
      runtime.next(1);
    }
  },
  neq: {
    des: {
      code: "eq",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'eq',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.popStackTop() !== runtime.popStackTop());
      runtime.next(1);
    }
  },
  instanceof: {
    des: {
      code: "instanceof",
      stack: "[var1,var2]",
      newStack: "[testResult]"
    },
    name: 'instanceof',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left && right && left.__proto__ == right.prototype);
      runtime.next(1);
    }
  },
  jmp: {
    des: {
      code: "jmp codeIndex",
      stack: "[]",
      newStack: "[]"
    },
    name: 'jmp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.jmp();
    }
  },
  loadProp: {
    des: {
      code: "loadProp",
      stack: "[target,property]",
      newStack: "[val]"
    },
    name: 'loadProp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var property = runtime.popStackTop(),
          target = runtime.popStackTop();
      runtime.pushStack(target[property]);
      runtime.next(1);
    }
  },
  setProp: {
    des: {
      code: "setProp",
      stack: "[val,target,property]",
      newStack: "[]"
    },
    name: 'setProp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var property = runtime.popStackTop(),
          target = runtime.popStackTop(),
          val = runtime.popStackTop();
      target[property] = val;
      runtime.next(1);
    }
  },
  delProp: {
    des: {
      code: "delProp",
      stack: "[target,property]",
      newStack: "[]"
    },
    name: 'delProp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var property = runtime.popStackTop(),
          target = runtime.popStackTop();
      delete target[property];
      runtime.next(1);
    }
  },
  retFunc: {
    des: {
      code: "retFunc",
      stack: "[retVal]",
      newStack: "[]",
      retStack: "retVal"
    },
    name: 'retFunc',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.retValue(runtime.popStackTop());
      runtime.gotoEnd();
    }
  },
  newObj: {
    des: {
      code: "newObj",
      stack: "[]",
      newStack: "[obj]"
    },
    name: 'newObj',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack({});
      runtime.next(1);
    }
  },
  rsetProp: {
    des: {
      code: "rsetProp",
      stack: "[target,property,val]",
      newStack: "[]"
    },
    name: 'rsetProp',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.popStackTop(),
          property = runtime.popStackTop(),
          target = runtime.popStackTop();
      target[property] = val;
      runtime.next(1);
    }
  },
  movRet: {
    des: {
      code: "movRet",
      stack: "[target]",
      newStack: "[]",
      retStack: "target"
    },
    name: 'movRet',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.popStackTop();
      runtime.retValue(val);
      runtime.next(1);
    }
  },
  stackMemberMethod: {
    des: {
      code: "stackMemberMethod argsLen",
      stack: "[arg1,arg2...,tagert,method]",
      newStack: "[retVal]",
      retStack: ""
    },
    name: 'stackMemberMethod',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var args = runtime.nextCodeNVal(1),
          methodName = runtime.popStackTop(),
          obj = runtime.popStackTop(),
          array = runtime.popStackTopN(args);
      runtime.pushStack(obj[methodName].apply(obj, array));
      runtime.next(2); // runtime.pushStack(obj[methodName](...array))
    }
  },
  callStackFunc: {
    des: {
      code: "callStackFunc argsLen",
      stack: "[arg1,arg2...,func]",
      newStack: "[retVal]",
      retStack: ""
    },
    name: 'callStackFunc',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var target = runtime.popStackTop();
      var array = runtime.popStackTopN(runtime.nextCodeVal());
      runtime.pushStack(target.apply(window, array));
      runtime.next(2);
    }
  },
  newLocalClassObject: {
    des: {
      code: "newLocalClassObject tagetObjectStackPosition[stackIndex,positionIndex] argsLen",
      stack: "[arg1,arg2...]",
      newStack: "[retVal]",
      retStack: ""
    },
    name: 'newLocalClassObject',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitStackVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      var array = runtime.popStackTopN(runtime.nextCodeNVal(3));
      runtime.pushStack(Reflect.construct(val, array));
      runtime.next(4);
    }
  },
  newContextClassObject: {
    des: {
      code: "newContextClassObject tagetObjectStackPosition[stackIndex,positionIndex] argsLen",
      stack: "[arg1,arg2...]",
      newStack: "[retVal]",
      retStack: ""
    },
    name: 'newContextClassObject',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitContextVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      var array = runtime.popStackTopN(runtime.nextCodeNVal(3));
      runtime.pushStack(Reflect.construct(val, array));
      runtime.next(4);
    }
  },
  newContextClassObjectSelective: {
    des: {
      code: "newContextClassObjectSelective argsLen alterName",
      stack: "[arg1,arg2...,[selective,...]]",
      newStack: "[retVal]",
      retStack: ""
    },
    name: 'newContextClassObjectSelective',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var args = runtime.nextCodeNVal(1),
          alterName = runtime.loadConstant(runtime.nextCodeNVal(2)),
          selective = runtime.popStackTop();

      var _v = runtime.visitContextValSelective(selective);

      var array = runtime.popStackTopN(args),
          target = _v[0] ? _v[1] : runtime.envObject(alterName);
      runtime.pushStack(Reflect.construct(target, array));
      runtime.next(3);
    }
  },
  not: {
    des: {
      code: "not",
      stack: "[target]",
      newStack: "[retVal]",
      retStack: ""
    },
    name: 'not',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(!runtime.popStackTop());
      runtime.next(1);
    }
  },
  loadErrorMap: {
    des: {
      code: "loadErrorMap codeIndex n",
      stack: "[]",
      newStack: "[]",
      retStack: ""
    },
    name: 'loadErrorMap',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var _i = runtime.nextCodeVal(),
          _ = runtime.nextCodeNVal(2);

      runtime.loadErrorMap(runtime.loadCodeArray(_i, _i + _ * 3));
      runtime.next(3);
    }
  },
  storeEnv: {
    des: {
      code: "storeEnv tagertObjectNameIndex",
      stack: "[target]",
      newStack: "[]",
      retStack: ""
    },
    name: 'storeEnv',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushBackEnv(runtime.loadConstant(runtime.nextCodeVal()), runtime.popStackTop());
      runtime.next(2);
    }
  },
  loadError: {
    des: {
      code: "loadError ",
      stack: "[]",
      newStack: "[err]",
      retStack: ""
    },
    name: 'loadError',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.loadError();
      runtime.next(1);
    }
  },
  throwError: {
    des: {
      code: "throwError ",
      stack: "[]",
      newStack: "[]",
      retStack: ""
    },
    name: 'throwError',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.throwError();
    }
  },
  setError: {
    des: {
      code: "setError ",
      stack: "[err]",
      newStack: "[]",
      retStack: ""
    },
    name: 'setError',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.setError();
      runtime.next(1);
    }
  },
  popStack: {
    des: {
      code: "popStack",
      stack: "[objToPop]",
      newStack: "[]"
    },
    name: 'popStack',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.popStackTop();
      runtime.next(1);
    }
  },
  reverse: {
    des: {
      code: "reverse",
      stack: "[num]",
      newStack: "[~num]"
    },
    name: 'reverse',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(~runtime.popStackTop());
      runtime.next(1);
    }
  },
  typeof: {
    des: {
      code: "typeof",
      stack: "[num]",
      newStack: "[typeof num]"
    },
    name: 'typeof',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      // const _=Object.prototype.toString.call(runtime.popStackTop()).replace(/\[object\s+(.*)\]/,"$1").toLowerCase()
      // runtime.pushStack(_=="null"?"object":_)
      runtime.pushStack(typeof runtime.popStackTop());
      runtime.next(1);
    }
  },
  void: {
    des: {
      code: "typeof",
      stack: "[num]",
      newStack: "[typeof num]"
    },
    name: 'typeof',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(void runtime.popStackTop());
      runtime.next(1);
    }
  },
  nor: {
    des: {
      code: "nor",
      stack: "[num1,num2]",
      newStack: "[num1^num2]"
    },
    name: 'nor',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.popStackTop() ^ runtime.popStackTop());
      runtime.next(1);
    }
  },
  defFunc: {
    des: {
      code: "defFunc paramsLen",
      stack: "[bytes]",
      newStack: "[function]"
    },
    name: 'defFunc',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.newFunc(runtime.nextCodeVal(), runtime.popStackTop(), runtime.popStackTop()));
      runtime.next(2);
    }
  },
  loadFuncDef: {
    des: {
      code: "loadFuncDef codeIndex",
      stack: "[]",
      newStack: "[bytes]"
    },
    name: 'loadFuncDef',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.loadCodeArrayN(runtime.nextCodeVal()));
      runtime.next(2);
    }
  },
  loadContext: {
    des: {
      code: "loadContext parentIndex stackIndex",
      stack: "[]",
      newStack: "[]"
    },
    name: 'loadContext',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.loadContext(runtime.nextCodeVal(), runtime.nextCodeNVal(2));
      runtime.next(3);
    }
  },
  loadContextVal: {
    des: {
      code: "loadContextVal  tagetObjectStackPosition[stackIndex,positionIndex]",
      stack: "[]",
      newStack: "[varVal]"
    },
    name: 'loadContextVal',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var val = runtime.visitContextVal(runtime.nextCodeNVal(1), runtime.nextCodeNVal(2));
      runtime.pushStack(val);
      runtime.next(3);
    }
  },
  loadContextValSelective: {
    des: {
      code: "loadContextValSelective tagertObjectNameIndex",
      stack: "[[]...]",
      newStack: "[varVal]"
    },
    name: 'loadContextValSelective',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var selective = runtime.popStackTop(),
          objName = runtime.loadConstant(runtime.nextCodeVal());

      var _v = runtime.visitContextValSelective(selective);

      runtime.pushStack(_v[0] ? _v[1] : runtime.envObject(objName));
      runtime.next(2);
    }
  },
  byteMovRight: {
    des: {
      code: "byteMovRight",
      stack: "[num,step]",
      newStack: "[num>>step]"
    },
    name: 'byteMovRight',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left >> right);
      runtime.next(1);
    }
  },
  byteUnsignedMovRight: {
    des: {
      code: "byteUnsignedMovRight",
      stack: "[num,step]",
      newStack: "[num>>>step]"
    },
    name: 'byteUnsignedMovRight',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left >>> right);
      runtime.next(1);
    }
  },
  byteMovLeft: {
    des: {
      code: "byteMovLeft",
      stack: "[num,step]",
      newStack: "[num<<step]"
    },
    name: 'byteMovLeft',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      var right = runtime.popStackTop(),
          left = runtime.popStackTop();
      runtime.pushStack(left << right);
      runtime.next(1);
    }
  },
  cpContext: {
    des: {
      code: "cpContext [runtimeIndex,stackIndex]",
      stack: "[]",
      newStack: "[[...]]"
    },
    name: 'cpContext',
    val: byteCode_define_index++,
    _apply: function _apply(runtime) {
      runtime.pushStack(runtime.childContext(runtime.nextCodeVal(), runtime.nextCodeNVal(2)));
      runtime.next(3);
    }
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.parse-float.js
var es_number_parse_float = __webpack_require__("c35a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace-all.js
var es_string_replace_all = __webpack_require__("5b81");

// CONCATENATED MODULE: ./src/js/Runtime.js
















function Runtime(bytecodes, codeoffset, env, target) {
  this.extenals = [];
  this.errorMap = [];
  this.stack = [];
  this.stash = [];
  this.stackArray = [];
  this.pointer = 0;
  this.codeOffset = codeoffset || 0;
  this.code = bytecodes ? this.checkHasProperty(bytecodes, 1) ? bytecodes : bytecodes[0].map(function (v, i) {
    return v - (i & 0xff00 ? i : 0xff);
  }) : [];
  this.env = env || {};
  this.$this = target || this;
  this.retVal = null;
  this.codeMap = [];
  this.error = null;
  this.accesstors = [];
  this.contextMap = [];
}

Runtime.prototype.run = function () {
  this.pointer = this.codeOffset;

  while (this.pointer < this.code.length) {
    try {
      this.codeMap[this.code[this.pointer]](this);
    } catch (e) {
      this.error = e, this.throwError();
    }
  }

  if (this.error) {
    console.error(this.error);
    throw new Error(this.error.name + ":" + this.error.message);
  }

  return this.retVal;
};

Runtime.prototype.retValue = function (retVal) {
  return this.retVal = retVal;
};

Runtime.prototype.movToStash = function () {
  this.stash.push(this.popStackTop());
};

Runtime.prototype.movfromStash = function () {
  this.pushStack(this.stash.pop());
};

Runtime.prototype.gotoEnd = function () {
  return this.pointer = this.code.length;
};

Runtime.prototype.checkHasProperty = function (_t, _p) {
  return Object.prototype.hasOwnProperty.call(_t, _p);
};

Runtime.prototype.envObject = function (name) {
  return this.checkHasProperty(this.env, name) ? this.env[name] : this.checkHasProperty(this.$this, name) ? this.$this[name] : this.checkHasProperty(window, name) ? window[name] : undefined;
};

Runtime.prototype.pushBackEnv = function (name, val) {
  this.checkHasProperty(this.env, name) ? this.env[name] = val : window[name] = val;
};

Runtime.prototype.newStack = function () {
  this.stack[this.stack.length] = [];
  this.stackArray[this.stackArray.length] = [];
};

Runtime.prototype.delStack = function () {
  this.stack.pop(), this.stackArray.pop();
};

Runtime.prototype.nextCodeNVal = function (n) {
  return this.code[this.pointer + n];
};

Runtime.prototype.nextCodeVal = function () {
  return this.code[this.pointer + 1];
};

Runtime.prototype.storeStackValue = function (stack, index, val) {
  this.stackArray[stack][index] = val;
};

Runtime.prototype.visitStackVal = function (stack, index) {
  return this.stackArray[stack][index];
};

Runtime.prototype.visitContextVal = function (stack, index) {
  return this.contextMap[stack][index];
};

Runtime.prototype.visitContextValSelective = function ($a) {
  for (var i = 0; $a[i]; ++i) {
    if (this.contextMap[$a[i][0]].length > $a[i][1]) {
      return [1, this.contextMap[$a[i][0]][$a[i][1]]];
    }
  }

  return [0, null];
};

Runtime.prototype.storeContextVal = function (stack, index, val) {
  this.contextMap[stack][index] = val;
};

Runtime.prototype.storeContextVarSelective = function ($a, val) {
  for (var i = 0; $a[i]; ++i) {
    if (this.contextMap[$a[i][0]].length > $a[i][1]) {
      this.contextMap[$a[i][0]][$a[i][1]] = val;
      return $a[i];
    }
  }

  return null;
};

Runtime.prototype.pushStack = function (obj) {
  this.arrTop(this.stack).push(obj);
};

Runtime.prototype.popStackTop = function () {
  return this.arrTop(this.stack).pop();
};

Runtime.prototype.fromCharCode = function (c) {
  return String.fromCharCode(c);
};

Runtime.prototype.dupStackTop = function () {
  var st = this.arrTop(this.stack);
  st.push(st[st.length - 1]);
};

Runtime.prototype.arrTop = function (arr) {
  return arr[arr.length - 1];
};

Runtime.prototype.popStackTopN = function (n) {
  var st = this.arrTop(this.stack);
  var arr = [];

  for (var i = n; i > 0; --i) {
    arr[i - 1] = st.pop();
  }

  return arr;
};

Runtime.prototype.popStackCodeTopN = function () {
  return this.popStackTopN(this.code[this.pointer + 1]);
};

Runtime.prototype.inarray = function (v) {
  return v > 34 && v < 39 && v != 37 || v > 41 && v < 48 || v == 58 || v == 61 || v > 62 && v < 91 || v >= 95 && v <= 122 && v != 96;
};

Runtime.prototype.loadConstant = function (index) {
  var _this = this;

  return decodeURI(this.loadCodeArray(index, this.code[index - 1]).map(function (v) {
    return v + 0x14;
  }).map(function (v) {
    return _this.inarray(v) ? _this.fromCharCode(v) : _this.fromCharCode(37) + _this.toString16(v);
  }).join(''));
};

Runtime.prototype.loadCodeArrayN = function (index) {
  var _ = index + this.codeOffset + 1;

  return this.code.slice(_, _ + this.code[index + this.codeOffset]);
};

Runtime.prototype.loadCodeArray = function (start, end) {
  return this.code.slice(this.codeOffset + start, this.codeOffset + end);
};

Runtime.prototype.toString16 = function (_) {
  return _.toString(16);
};

Runtime.prototype.toInt = function (_) {
  return Number.parseInt(_);
};

Runtime.prototype.next = function (len) {
  this.pointer += len;
};

Runtime.prototype.toFloat = function (_) {
  return Number.parseFloat(_);
};

Runtime.prototype.loadThis = function () {
  return this.$this;
};

Runtime.prototype.goto = function (index) {
  this.pointer = index + this.codeOffset;
};

Runtime.prototype.jmp = function () {
  this.goto(this.code[this.pointer + 1]);
};

Runtime.prototype.exit = function () {
  this.goto(this.code.length);
  this.accesstors && this.accesstors.length && this.accesstors.forEach(function (v) {
    return v.exit();
  });
};

Runtime.prototype.loadError = function () {
  this.pushStack(this.error);
  this.error = null;
};

Runtime.prototype.loadErrorMap = function (_a) {
  this.errorMap = _a;
};

Runtime.prototype.setError = function () {
  this.error = this.popStackTop();
};

Runtime.prototype.throwError = function () {
  var val = this.pointer - this.codeOffset;

  for (var i = 0; this.errorMap[i]; i += 3) {
    if (this.errorMap[i] <= val && val < this.errorMap[i + 1]) {
      return this.goto(this.errorMap[i + 2]);
    }
  }

  this.exit();
};

Runtime.prototype.newFunc = function (_l, _b, _m) {
  var that = this;
  return function () {
    var nr = new Runtime(_b, 0, that.env, this !== window ? this : null);
    nr.accesstors = [that].concat(that.accesstors);
    nr.contextMap = _m;
    nr.newStack();
    nr.codeMap = that.codeMap;

    for (var i = 0; i < _l; ++i) {
      nr.storeStackValue(0, i, arguments[i]);
    }

    return nr.run();
  };
};

Runtime.prototype.childContext = function (_p, _i) {
  return (_p ? this.accesstors[_p - 1] : this).stackArray[_i];
};

Runtime.prototype.loadContext = function (_p, _i) {
  this.contextMap.push(this.accesstors[_p].stackArray[_i]);
};

function replaceBlank(str) {
  return str.replace(/\/\/[^\n]*\n/g, "") //去掉注释
  .replace(/[\n\r\t\s]*([{}[\]}();]+)[\n\r\t\s]*/g, "$1") //去除[]{}();的前后空白
  .replace(/[\n\r\t\s]*([+\-*/%=><&|!><?.,]+)[\n\r\t\s]*/g, "$1") //去除常见操作符的前后空白
  .replace(/;}/g, "}");
}

function reloaceLocalVar(func) {
  return func.replace(/(this|that|nr)\.extenals\s*=\s*\[\];?/g, "").replace(/(this|that|nr|\)|\])\.stackArray/g, "$1._a").replace(/(this|that|nr|\)|\])\.stack/g, "$1._s").replace(/(this|that|nr|\)|\])\.stash/g, "$1._а") //这个是俄文字母
  .replace(/(this|that|nr|\)|\])\.env/g, "$1._e").replace(/(this|that|nr|\)|\])\.\$this/g, "$1._t").replace(/(this|that|nr|\)|\])\.pointer/g, "$1._p").replace(/(this|that|nr|\)|\])\.codeMap/g, "$1._c").replace(/(this|that|nr|\)|\])\.codeOffset/g, "$1._o").replace(/(this|that|nr|\)|\])\.errorMap/g, "$1._m").replace(/(this|that|nr|\)|\])\.error/g, "$1._е") //这个是俄文字母
  .replace(/(this|that|nr|\)|\])\.code/g, "$1._").replace(/(this|that|nr|\)|\])\.retVal/g, "$1.х") //这个是俄文字母
  .replace(/(this|that|nr|\)|\])\.accesstors/g, "$1.$_").replace(/(this|that|nr|\)|\])\.contextMap/g, "$1._о") //这个是俄文字母
  .replaceAll("stack", "$ǃ").replaceAll("index", "$1").replaceAll("name", "$ǀ").replaceAll("retVal", "$$").replaceAll("val", "$_").replaceAll("that", "$t"); // .replaceAll("checkHasProperty","_")
}

Runtime.prototype.declearation = function () {
  var prototypes = Object.getOwnPropertyNames(Runtime.prototype);
  var arr = [];

  for (var i = 0; prototypes[i]; ++i) {
    switch (prototypes[i]) {
      case "constructor":
      case "toString":
      case "run":
      case "declearation":
      case "newInstance":
        break;

      default:
        arr.push(prototypes[i]);
        break;
    }
  }

  var replaceMethods = function replaceMethods(str) {
    for (var _i2 = 0; arr[_i2]; ++_i2) {
      str = str.replaceAll("this." + arr[_i2] + "(", "this.__" + _i2.toString(36) + "(").replaceAll("runtime." + arr[_i2] + "(", "runtime.__" + _i2.toString(36) + "(").replaceAll("nr." + arr[_i2] + "(", "nr.__" + _i2.toString(36) + "(").replaceAll("v." + arr[_i2] + "(", "v.__" + _i2.toString(36) + "(");
    }

    return str.replace(/console\.(log|error)\([\w.\s]+\);?/g, "").replace(/\(function(\([^)]*\))\{return ([^}]+)\}\)/g, "($1=>$2)").replace(/\(function(\([^)]*\))\{/g, "($1=>{").replace(/\(([a-zA-Z0-9]+)\)=>/g, "$1=>");
  };

  var codeMap = this.codeMap.toString().replace(/function\s+_apply\(runtime\)/g, "r=>"); //替换一些常用的变量值   

  codeMap = replaceMethods(replaceBlank(codeMap)).replaceAll("runtime.__", "r.__").replaceAll("index", "_i").replaceAll("target", "_t").replaceAll("property", "_p").replaceAll("left", "_").replaceAll("right", "__").replaceAll("className", "_n").replaceAll("objName", "_0").replaceAll("methodName", "_1").replaceAll("args", "_ǀ").replaceAll("array", "_ǃ").replaceAll("val", "_Ӏ").replaceAll("alterName", "_ı").replaceAll("selective", "_ί").replace(/var\s+([_\w]+)=([^;]+);var\s+([_\w]+)=/g, "var $1=$2,$3=").replace(/if\(([^()]+)\)\{([^}]+)\}else\{([^}]+)\}/g, "($1)?($2):($3);");
  var runtimeMethods = "Runtime.prototype={" + arr.map(function (v, i) {
    return "__" + i.toString(36) + ":" + reloaceLocalVar(replaceMethods(replaceBlank(Runtime.prototype[v].toString())));
  }).join(",") + ",run:" + reloaceLocalVar(replaceBlank(replaceMethods(Runtime.prototype.run.toString()))) + "};"; // const declearation= `function Runtime(_,__,___,$){this.$a=[],this.$c=[],this._s=[],this._a=[],this._em=[],this._p=0,this.$=this.$e=null,this.$t=$||this,this._e=___||{},this._o=__||0,this._$=_,this._c=[${codeMap}]};${runtimeMethods}`

  return reloaceLocalVar(replaceMethods(Runtime.prototype.constructor.toString())).replace(/[\n\r\t\s]*([{}[\]}();]+)[\n\r\t\s]*/g, "$1") //去除[]{}();的前后空白
  .replace(/\s*([<>,?()+\-*/:&])\s*/g, "$1").replace(/function\(([\w,\s]+)\)\{\s*return\s+([^;]+);?\}/, "($1)=>$2").replaceAll("bytecodes", "_").replaceAll("codeoffset", "$").replaceAll("env", "__").replaceAll("target", "$_").replace(/this\._c\s*=\s*\[\]/g, "this._c=[" + codeMap + "]") + ";" + runtimeMethods;
};

Runtime.prototype.newInstance = function () {
  var code = this.code;
  var proxy = "";

  if (this.extenals && this.extenals.length) {
    var setter = this.extenals.map(function (v) {
      return "case \"".concat(v, "\":window[\"").concat(v, "\"]=value;break;//\u6B64\u5904\u8BF7\u6309\u7167\u5B9E\u9645\u60C5\u51B5\u5904\u7406\u5185\u7F6E\u4EE3\u7801\u9700\u8981\u8BBE\u7F6E\u53D8\u91CF").concat(v, "\u7684\u503C\u65F6\u60C5\u51B5,\u5982\u679C\u786E\u4FE1\u4F60\u7684\u4EE3\u7801\u4E2D\u6CA1\u6709\u5BF9\u6B64\u503C\u8FDB\u884C\u8D4B\u503C\u64CD\u4F5C\uFF0C\u53EF\u5FFD\u7565\u6B64set\u65B9\u6CD5");
    }).join("\n");
    proxy = "//\u4F60\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u4E86\u672A\u5B9A\u4E49\u7684\u53D8\u91CF\u503C\uFF0C\u4E3A\u4EE3\u7801\u80FD\u6B63\u786E\u8FD0\u884C\uFF0C\u8BF7\u624B\u5DE5\u5B8C\u6210\u4E0B\u9762\u7684\u4EE3\u7801\uFF0C\u8BBE\u7F6E\u8FD9\u4E9B\u503C\u7684\u83B7\u53D6\u548C\u8D4B\u503C\u65B9\u6CD5\nconst envProxy=new Proxy({".concat(this.extenals.map(function (v) {
      return v + ":window[\"" + v + "\"]";
    }).join(","), "},{\n    set(target,property,value){\n        switch(property){\n            ").concat(setter, "\n            default:target[property]=value;\n        }\n    return true;\n    }\n})");
  } // return "const bytecodes=["+code.map((v,i)=>{v+=(i<255?255:i);return (v<255)?v:("0x"+v.toString(16))}).join(",")+"]\n"+
  //         proxy+
  //         "\nconst runtime=new Runtime([bytecodes],0"+(proxy?",envProxy":"")+");\nruntime.run()"


  return proxy + "\nconst runtime=new Runtime([" + code.map(function (v) {
    return "0x" + v.toString(16);
  }) + "],0" + (proxy ? ",envProxy" : "") + ");\nruntime.run()";
};

Runtime.prototype.toString = function () {
  return '/* 公共代码部分是不变的，可以独立写入一个文件再引入 */\n/* 公共代码部分开始 */\n' + this.declearation() + "\n/*公共代码部分结束*/" + "\n\n\n//下面的部分是左侧代码加密后的源码，同样的代码两次转换的结果不同但等效\n" + this.newInstance();
};

/* harmony default export */ var js_Runtime = (Runtime);
// CONCATENATED MODULE: ./src/js/Translator.js


















var Translator_Translator = function __Translator() {
  Object(classCallCheck["a" /* default */])(this, __Translator);

  this.sourceCode = null;
  this.sourceCodePostionOffset = 0;
  this.name = null;
  this.args = [];
  this.type = "Program";
  /** 字符串常量库 */

  this.consts = [];
  this.argsLength = 0;
  this.vars = [];
  this.blockMethods = [];
  this.anccesstorsPostions = [];
  this.contextVars = {};
  this.alterContextVars = {};
  this.contextVarsMap = {};
  this.map = [];
  this.code = [];
  this.catch = [];
  /** 需要外部引入的数据 */

  this.extenals = [];
  this.anccesstors = [];
  this.localMethods = [];
  this.import = [];
  this.extEffect = [];
};

var Translator_Tag = /*#__PURE__*/function () {
  function __Tag(name) {
    Object(classCallCheck["a" /* default */])(this, __Tag);

    this.name = name;
    this.listeners = [];
  }

  Object(createClass["a" /* default */])(__Tag, [{
    key: "addListener",
    value: function addListener(listener) {
      this.listeners.push(listener);
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      for (var i = 0; this.listeners[i]; ++i) {
        this.listeners[i][1] = index;
      }
    }
  }]);

  return __Tag;
}();

Translator_Translator.prototype.logExtenals = function (name) {
  for (var i = 0; this.extenals[i]; ++i) {
    if (this.extenals[i] === name) {
      return i;
    }
  }

  this.extenals.push(name);
  return [-1, -1];
};

Translator_Translator.prototype.newBlock = function () {
  this.blockMethods.push([]);
  this.vars.push({});
  this.map.push(0);
  return [-1, -1];
};

Translator_Translator.prototype.qiutBlock = function () {
  var arr = this.blockMethods.pop();
  var codeIncrease = 0;

  for (var i = 0; arr[i]; ++i) {
    arr[i].code += codeIncrease;
    codeIncrease += defineFunction(this, arr[i]);
  }

  this.vars.pop();
  this.map.pop();
  return [-1, -1];
};

Translator_Translator.prototype.findVar = function (name) {
  for (var i = this.vars.length - 1; i >= 0; --i) {
    if (this.vars[i][name] != undefined) {
      return this.vars[i][name];
    }
  }

  return [-1, -1];
};

Translator_Translator.prototype.addConstr = function (val) {
  for (var i = 0; this.consts[i]; ++i) {
    if (this.consts[i] === val) {
      return i;
    }
  }

  this.consts.push(val);
  return this.consts.length - 1;
};

Translator_Translator.prototype.addVar = function (name) {
  var stack = this.vars.length - 1;
  var index = this.map[stack];
  this.vars[stack][name] = [stack, index];
  this.map[stack] = this.map[stack] + 1; //将值初始化为undefined，方便后续计数

  this.code.push([CodeDefine.initVarIfNeed, [stack, index]]);
  return [stack, index];
};

Translator_Translator.prototype.findVar = function (name) {
  for (var i = this.vars.length - 1; i >= 0; --i) {
    if (this.vars[i][name] != undefined) {
      return this.vars[i][name];
    }
  }

  return [-1, -1];
};

Translator_Translator.prototype.findContextVar = function (name) {
  if (this.contextVars[name]) {
    return this.contextVars[name];
  } else if (this.alterContextVars[name]) {
    return [-2, this.alterContextVars[name]];
  }

  var alternative = []; //备选项

  for (var i = 0; this.anccesstors[i]; ++i) {
    var definePositions = this.anccesstorsPostions[i];
    var find = this.anccesstors[i].findVar(name);

    if (find && find[0] != -1) {
      //如果查找到对象定义时间在函数定义时间之前，可以直接返回
      if (definePositions[find[0]] > find[1]) {
        var nextIndex = 0;
        var storeKey = i + '-' + find[0];

        if (!Object.prototype.hasOwnProperty.call(this.contextVarsMap, storeKey)) {
          nextIndex = Object.getOwnPropertyNames(this.contextVarsMap).length;
          this.import.push([i, find[0]]); // this.code.push([bydecodeDef.loadContext,i,find[0]])

          this.contextVarsMap[storeKey] = nextIndex;
        } else {
          nextIndex = this.contextVarsMap[storeKey];
        }

        this.contextVars[name] = [nextIndex, find[1]];
        return [nextIndex, find[1]];
      } else {
        alternative.push([i, find[0], find[1]]);
      }
    }
  } //处理备选项


  for (var _i = 0; _i < alternative.length; ++_i) {
    var _find = alternative[_i];
    var _nextIndex = 0;

    var _storeKey = _find[0] + '-' + _find[1];

    if (!Object.prototype.hasOwnProperty.call(this.contextVarsMap, _storeKey)) {
      _nextIndex = Object.getOwnPropertyNames(this.contextVarsMap).length;
      this.import.push([_find[0], _find[1]]);
      this.contextVarsMap[_storeKey] = _nextIndex;
    } else {
      _nextIndex = this.contextVarsMap[_storeKey];
    }

    if (!this.alterContextVars[name]) {
      this.alterContextVars[name] = [];
    }

    this.alterContextVars[name].push([_nextIndex, _find[2]]);
  }

  return alternative.length ? [-2, this.alterContextVars[name]] : [-1, -1];
};

Translator_Translator.prototype.translate = function () {
  var _this = this;

  var data = [];
  var codePositonTag = [];
  var codeMap = [];
  var constantsLocation = [];
  var constantsLocationTag = [];
  var functionCodesLocation = []; //简单考虑下安全问题，将常量字符串织入代码中

  var constantsMap = [];

  for (var i = 0; i < this.consts.length; ++i) {
    constantsLocationTag[i] = [];
    var insert = parseInt(Math.random() * (this.code.length - 1));

    if (insert <= 0) {
      insert = 1;
    }

    if (!constantsMap[insert]) {
      constantsMap[insert] = [];
    }

    constantsMap[insert].push(i);
  }

  var loadCodePositionTag = function loadCodePositionTag(source, target) {
    if (!codePositonTag[source]) {
      codePositonTag[source] = [];
    }

    codePositonTag[source].push(target);
  }; //插入异常处理映射表


  data.push(CodeDefine.noopN.val);
  data.push(this.catch.length * 3);
  var errorMapStart = data.length;
  var catchArray = this.catch.map(function (v) {
    return v;
  }).sort(function (a, b) {
    return b[0] - a[0];
  });

  for (var _i2 = 0; _i2 < catchArray.length; ++_i2) {
    var map = catchArray[_i2];
    loadCodePositionTag(map[0], data.length);
    loadCodePositionTag(map[1], data.length + 1);
    loadCodePositionTag(map[2], data.length + 2);
    data = data.concat(map);
  }

  data.push(CodeDefine.loadErrorMap.val);
  data.push(errorMapStart);
  data.push(catchArray.length);

  for (var _i3 = 0; this.code[_i3]; ++_i3) {
    codeMap[_i3] = data.length;
    var ins = this.code[_i3];
    data.push(ins[0].val); //记录跳转代码位置

    switch (ins[0].val) {
      //记录跳转代码地址变更
      case CodeDefine.jmp.val:
      case CodeDefine.jmpNotZero.val:
      case CodeDefine.jmpZero.val:
      case CodeDefine.eqJmp.val:
      case CodeDefine.neqJmp.val:
        {
          loadCodePositionTag(ins[1], data.length);
        }
        break;
      //记录字符串加载位置变更

      case CodeDefine.loadConst.val:
      case CodeDefine.loadEnv.val:
      case CodeDefine.newClassObject.val:
      case CodeDefine.callFunc.val:
      case CodeDefine.storeEnv.val:
      case CodeDefine.storeContextVarSelective.val:
        constantsLocationTag[ins[1]].push(data.length);
        break;

      case CodeDefine.memberMethod.val:
      case CodeDefine.contextMemberMethod.val:
        constantsLocationTag[ins[2]].push(data.length + 2);
        break;

      case CodeDefine.envMemberMethod.val:
        {
          constantsLocationTag[ins[1]].push(data.length);
          constantsLocationTag[ins[2]].push(data.length + 1);
        }
        break;

      case CodeDefine.contextMemberMethodSelective.val:
        {
          constantsLocationTag[ins[1]].push(data.length);
          constantsLocationTag[ins[3]].push(data.length + 2);
        }
        break;

      case CodeDefine.contextMemberIndexMethodSelective.val:
        {
          constantsLocationTag[ins[2]].push(data.length + 1);
        }
        break;
      //记录内部函数分配    

      case CodeDefine.loadFuncDef.val:
        {
          if (!functionCodesLocation[ins[1]]) {
            functionCodesLocation[ins[1]] = [];
          }

          functionCodesLocation[ins[1]].push(data.length);
        }
    }

    for (var j = 1; j < ins.length; ++j) {
      if (typeof ins[j] === "number") {
        data.push(ins[j]);
      } else if (ins[j] instanceof Array) {
        for (var k = 0; k < ins[j].length; k++) {
          data.push(ins[j][k]);
        }
      } else {
        break; //跳过解释代码
      }
    }

    if (constantsMap[_i3]) {
      //将常量字符串织入代码中
      var inserts = constantsMap[_i3];

      for (var _j = 0; _j < inserts.length; ++_j) {
        var insertStr = this.consts[inserts[_j]];
        var strArray = stringToBytes(insertStr);
        var jmp = [CodeDefine.jmp.val, data.length + 2 + strArray.length].concat(strArray);
        constantsLocation[inserts[_j]] = data.length + 2;
        data = data.concat(jmp);
      }
    }
  } //更新代码跳转位置


  codeMap[this.code.length] = data.length;

  var _loop = function _loop(p) {
    var update = codePositonTag[p];
    update.forEach(function (v) {
      data[v] = codeMap[p];
    });
  };

  for (var p in codePositonTag) {
    _loop(p);
  } //更新字符串加载位置变更


  var _loop2 = function _loop2(_p) {
    var update = constantsLocationTag[_p];
    update.forEach(function (v) {
      data[v] = constantsLocation[_p];
    });
  };

  for (var _p in constantsLocationTag) {
    _loop2(_p);
  } //将函数数据追加到代码末尾


  var functionCodes = [];
  var startLocation = data.length + 2;

  var _loop3 = function _loop3(_i4) {
    if (!functionCodesLocation[_i4]) {
      return "continue";
    }

    var currentLocation = startLocation + functionCodes.length;

    functionCodesLocation[_i4].forEach(function (v) {
      data[v] = currentLocation;
    });

    var funcCode = _this.localMethods[_i4].translate().code;

    functionCodes.push(funcCode.length);
    functionCodes = functionCodes.concat(funcCode);
  };

  for (var _i4 = 0; _i4 < this.localMethods.length; ++_i4) {
    var _ret = _loop3(_i4);

    if (_ret === "continue") continue;
  }

  data.push(CodeDefine.noopN.val);
  data.push(functionCodes.length);
  data = data.concat(functionCodes);
  var runtime = new js_Runtime();
  runtime.code = data;
  var codeMethod = [];

  for (var code in CodeDefine) {
    var _ins = CodeDefine[code];
    codeMethod[_ins.val] = _ins._apply;
  }

  runtime.codeMap = codeMethod;
  runtime.extenals = this.extenals.filter(function (v) {
    return !window[v];
  });
  return runtime;
};

function stringToBytes(str) {
  var array = encodeStrToBytes(str); //来一点简单的加密

  return array.map(function (v) {
    return v - 0x14;
  });
}

function encodeStrToBytes(str) {
  return (window.TextEncoder ? function (str) {
    var encoder = new TextEncoder('utf8');
    var bytes = encoder.encode(str);
    var array = [];

    for (var i = 0; i < bytes.length; ++i) {
      array.push(bytes[i]);
    }

    return array;
  } : function (str) {
    var array = [];
    var es = encodeURIComponent(str);
    var i = 0;

    while (i < es.length) {
      if (es.charAt(i) == '%') {
        array.push(Number.parseInt('0x' + es.charAt(i + 1) + es.charAt(i + 2)));
        i += 3;
      } else {
        array.push(es.charCodeAt(i));
        i++;
      }
    }

    return array;
  })(str);
}

function accept(sourcecode, node) {
  var vm = new Translator_Translator();
  vm.sourceCode = sourcecode;
  vm.newBlock();
  var startPosition = checkCurrentIndex(vm);
  vm.code.push([CodeDefine.newStack]);
  blockStatement(vm, node);
  var endPosition = checkCurrentIndex(vm);
  vm.code.push([CodeDefine.delStack]);
  vm.qiutBlock();
  loadErrorBlockClean(vm, startPosition, endPosition);
  var code = []; //刷新标记点

  for (var i = 0; vm.code[i]; ++i) {
    var bc = vm.code[i];

    if (bc instanceof Array) {
      code.push(bc);
    } else {
      bc.setIndex(code.length);
    }
  }

  vm.code = code;
  return vm;
}

function acceptFunction(parent, node, anccesstorsPostions) {
  var vm = new Translator_Translator();
  vm.type = "Function";
  var startCode = node.start - parent.sourceCodePostionOffset;
  var endCode = node.end - parent.sourceCodePostionOffset;
  vm.sourceCode = parent.sourceCode.substring(startCode, endCode);
  vm.sourceCodePostionOffset = node.start;
  vm.name = node.id ? node.id.name : null;
  vm.anccesstors = [parent].concat(parent.anccesstors);
  vm.anccesstorsPostions = anccesstorsPostions || [];
  vm.newBlock(); //此处要自动多一处记录stack，用于记录参数
  //加载参数记录

  var params = node.params;

  if (params && params.length) {
    vm.argsLength = params.length;

    for (var i = 0; params[i]; ++i) {
      var param = params[i];
      var paramName = param.name;
      vm.addVar(paramName);
      vm.args.push(paramName);
    }
  }

  vm.newBlock();
  vm.code.push([CodeDefine.newStack]);
  var startPosition = checkCurrentIndex(vm);
  blockStatement(vm, node.body);
  var endPosition = checkCurrentIndex(vm);
  vm.code.push([CodeDefine.delStack]);
  vm.qiutBlock();
  vm.code.push([CodeDefine.delStack]); //此处要自动多删除一个stack，因为创建函数时会自动创建参数stack

  vm.qiutBlock(); //清理过程也要多清一个stack

  var jmp = new Translator_Tag("normalJump");
  jumpToTag(vm, jmp); //这里只允许跳转进来，其他时候要跳过

  var throwPosition = checkCurrentIndex(vm);
  vm.code.push([CodeDefine.delStack]); //处理异常前需要先把正常代码块卸载

  vm.code.push([CodeDefine.delStack]);
  vm.code.push([CodeDefine.throwError]);
  vm.catch.push([startPosition, endPosition, throwPosition]);
  vm.code.push(jmp);
  var code = []; //刷新标记点

  for (var _i5 = 0; vm.code[_i5]; ++_i5) {
    var bc = vm.code[_i5];

    if (bc instanceof Array) {
      code.push(bc);
    } else {
      bc.setIndex(code.length);
    }
  }

  vm.code = code;
  return vm;
}

function jumpToTag(vm, tag) {
  // const jmpTo = [bydecodeDef.jmp, 0, tag, '//jump to Tag, refresh position after finish translate']
  var jmpTo = [CodeDefine.jmp, 0];
  vm.code.push(jmpTo);
  tag.addListener(jmpTo);
}

function jumpToTagIfZero(vm, tag) {
  // const jmpTo = [bydecodeDef.jmpZero, 0, tag, '//jump to Tag if stack top is false, refresh position after finish translate']
  var jmpTo = [CodeDefine.jmpZero, 0];
  vm.code.push(jmpTo);
  tag.addListener(jmpTo);
}

function jumpToTagIfNotZero(vm, tag) {
  // const jmpTo = [bydecodeDef.jmpNotZero, 0, tag, '//jump to Tag if stack top is true, refresh position after finish translate']
  var jmpTo = [CodeDefine.jmpNotZero, 0];
  vm.code.push(jmpTo);
  tag.addListener(jmpTo);
}

function blockStatement(vm, node, blockStartTag, blockEndTag) {
  if (node.type == "ContinueStatement") {
    jumpToTag(vm, blockStartTag);
    return;
  } else if (node.type == "BreakStatement") {
    jumpToTag(vm, blockEndTag);
    return;
  }

  var body = node.body; //处理单一语句的情况

  if (!body) {
    body = [node];
  } else if (!(body instanceof Array)) {
    body = [body];
  }

  for (var i = 0; body[i]; ++i) {
    loadBlockBody(vm, body[i], blockStartTag, blockEndTag);
  }
}

function loadBlockStatement(vm, node, blockStartTag, blockEndTag) {
  if (!(node.type === "BlockStatement")) {
    loadBlockBody(vm, node, blockStartTag, blockEndTag);
    return;
  }

  var blockStart = new Translator_Tag("nestBlockStart");
  var blockEnd = new Translator_Tag("nestBlockStart");
  vm.newBlock();
  vm.code.push([CodeDefine.newStack]);
  var startPosition = checkCurrentIndex(vm);
  var body = node.body;

  for (var i = 0; body[i]; ++i) {
    loadBlockBody(vm, body[i], blockStartTag, blockEndTag);
  }

  vm.code.push([CodeDefine.delStack]);
  vm.qiutBlock();
  loadErrorBlockClean(vm, startPosition, checkCurrentIndex(vm));

  if (blockStartTag || blockEndTag) {
    var nextCode = new Translator_Tag("GoToNextCode");
    jumpToTag(vm, nextCode);

    if (blockStartTag) {
      vm.code.push(blockStart);
      vm.code.push([CodeDefine.delStack]);
      jumpToTag(vm, blockStartTag);
    }

    if (blockEndTag) {
      vm.code.push(blockEnd);
      vm.code.push([CodeDefine.delStack]);
      jumpToTag(vm, blockEndTag);
    }

    vm.code.push(nextCode);
  }
}

function loadBlockBody(vm, body, blockStartTag, blockEndTag) {
  var type = body.type;

  switch (type) {
    case "ContinueStatement":
      jumpToTag(vm, blockStartTag);
      break;

    case "BreakStatement":
      jumpToTag(vm, blockEndTag);
      break;

    case "FunctionDeclaration":
      {
        var funcNode = body;

        if (funcNode.id && funcNode.id.name) {
          var funcName = funcNode.id.name;
          var curStack = vm.vars[vm.vars.length - 1];
          var idx = curStack[funcName];

          if (!idx) {
            idx = vm.addVar(funcName);
          }

          defFunctionPre(vm, funcNode);
          vm.code.push([CodeDefine.storeVar, idx]);
        }
      }
      break;

    case "ReturnStatement":
      returnStatement(vm, body);
      break;

    case "VariableDeclaration":
      {
        var vars = body.declarations;

        for (var k = 0; vars[k]; ++k) {
          VariableDeclarator(vm, vars[k]);
        }
      }
      break;

    case "BlockStatement":
      {
        loadBlockStatement(vm, body, blockStartTag, blockStartTag);
      }
      break;

    case "ExpressionStatement":
      {
        loadValueWithTag(vm, body.expression);
        vm.code.push([CodeDefine.movRet]);
      }
      break;

    case "ForStatement":
      {
        forStatement(vm, body);
      }
      break;

    case "IfStatement":
      {
        ifStatement(vm, body, blockStartTag, blockEndTag);
      }
      break;

    case "WhileStatement":
      {
        whileStatement(vm, body, blockStartTag, blockEndTag);
      }
      break;

    case "DoWhileStatement":
      {
        doWhileStatement(vm, body, blockStartTag, blockEndTag);
      }
      break;

    case "SwitchStatement":
      {
        switchStatement(vm, body, blockStartTag, blockEndTag);
      }
      break;

    case "TryStatement":
      {
        tryStatement(vm, body, blockStartTag, blockEndTag);
      }
      break;

    case "ThrowStatement":
      {
        loadValueWithTag(vm, body.argument);
        vm.code.push([CodeDefine.setError]);
        vm.code.push([CodeDefine.throwError]);
      }
      break;

    case "Identifier":
      {
        loadValueWithTag(vm, body);
        vm.code.push([CodeDefine.movRet]);
      }
      break;

    case "EmptyStatement":
      break;

    default:
      throw new Error("unknow statement " + body.type);
  } //实现对变量操作的副作用


  vm.takeEffect();
}

Translator_Translator.prototype.takeEffect = function () {
  while (this.extEffect && this.extEffect.length) {
    this.code = this.code.concat(this.extEffect.pop());
  }
}; // function defFunction(vm,funcNode){
//     const nvm=acceptFunction(vm,funcNode);
//     //TODO 如何处理函数定义时访问外部还没定义的变量呢？？？咋弄
//     //TODO 暂时先定位为不允许访问在函数定义后才定义的变量
//     const newExtenals=nvm.extenals
//     //更新外部引用
//     if(newExtenals&&newExtenals.length){
//         newExtenals.forEach(v=>vm.logExtenals(v))
//     }
//     const imports=nvm.import
//     vm.localMethods.push(nvm)
//     const localMethodsIndex=vm.localMethods.length-1
//     if(imports.length){
//         for(let i=0;i<imports.length;++i){
//             vm.code.push([bydecodeDef.cpContext,imports[i]])
//         }
//     }
//     vm.code.push([bydecodeDef.mkArr,imports.length])
//     vm.code.push([bydecodeDef.loadFuncDef,localMethodsIndex])
//     vm.code.push([bydecodeDef.defFunc,nvm.argsLength])
// }


function defineFunction(vm, record) {
  var nvm = acceptFunction(vm, record.node, record.anccesstorsPostions);
  var newExtenals = nvm.extenals; //更新外部引用

  if (newExtenals && newExtenals.length) {
    newExtenals.forEach(function (v) {
      return vm.logExtenals(v);
    });
  }

  var imports = nvm.import;
  vm.localMethods[record.localMethodsIndex] = nvm;
  var loadParentContext = [];

  if (imports.length) {
    for (var i = 0; i < imports.length; ++i) {
      loadParentContext.push([CodeDefine.cpContext, imports[i]]);
    }
  }

  vm.code = vm.code.slice(0, record.code).concat(loadParentContext).concat([[CodeDefine.mkArr, imports.length], [CodeDefine.loadFuncDef, record.localMethodsIndex], [CodeDefine.defFunc, nvm.argsLength]]).concat(vm.code.slice(record.code));
  return imports.length + 3;
}
/**
 * 函数在调用时应该能访问调用闭包内当前所有的变量，但需要注意的是，如果变量在函数声明前定义，则可以直接访问
 * 如果变量在函数声明后才定义，则应该判断此次调用时，变量是否已经定义了，如果还没有定义，则应该继续向上查找
 * @param {*} vm 
 * @param {*} funcNode 
 */


function defFunctionPre(vm, funcNode) {
  //记录当前允许访问的地址
  function currentVarMap(v) {
    var positions = [];

    for (var i = 0; i < v.vars.length; ++i) {
      positions.push(v.map[i]);
    }

    return positions;
  }

  var anccesstorsPostions = [currentVarMap(vm)].concat(vm.anccesstorsPostions); // vm.anccesstors.forEach((v,index)=>{
  //     accesstorsPositions[index+1]=currentVarMap(v)
  // })

  var localMethodsIndex = vm.localMethods.length;
  vm.localMethods.push(undefined);
  var record = {
    code: vm.code.length,
    anccesstorsPostions: anccesstorsPostions,
    localMethodsIndex: localMethodsIndex,
    node: funcNode
  };
  vm.blockMethods[vm.blockMethods.length - 1].push(record);
}

function returnStatement(vm, node) {
  if (node.argument) {
    loadValueWithTag(vm, node.argument);
  } else {
    vm.code.push([CodeDefine.loadNull]);
  }

  vm.code.push([CodeDefine.retFunc]);
}
/**
 * 变量声明
 * @param {*} vm 
 * @param {*} node 
 * @returns 
 */


function VariableDeclarator(vm, node) {
  var name = node.id.name;
  var curStack = vm.vars[vm.vars.length - 1];
  var idx = curStack[name];

  if (!idx) {
    idx = vm.addVar(name);
  }

  if (node.init) {
    loadValueWithTag(vm, node.init);
    vm.code.push([CodeDefine.storeVar, idx]);
  }

  return idx;
}

function loadValueWithTag(vm, node) {
  var tag = new Translator_Tag("varLoadTag");
  loadDefVar(vm, node, tag);
  vm.code.push(tag);
  return tag;
}

function loadDefVar(vm, node, nextBlockTag) {
  var type = node.type;

  if (type === "VariableDeclarator") {
    return VariableDeclarator(vm, node);
  } else if (type === "ObjectExpression") {
    vm.code.push([CodeDefine.newObj]);
    var ps = node.properties;

    for (var i = 0; ps[i]; ++i) {
      vm.code.push([CodeDefine.dupStack]);
      vm.code.push([CodeDefine.loadConst, vm.addConstr(ps[i].key.name)]);
      loadValueWithTag(vm, ps[i].value);
      vm.code.push([CodeDefine.rsetProp]);
    }

    return null;
  } else if (type === "Literal") {
    var val = node.value;

    if (!val && node.raw == "null") {
      vm.code.push([CodeDefine.loadNull]);
      return;
    }

    if (!val && node.raw == "undefined") {
      vm.code.push([CodeDefine.loadUndefined]);
      return;
    }

    if (node.raw === "true") {
      vm.code.push([CodeDefine.loadTrue]);
      return;
    } else if (node.raw === "false") {
      vm.code.push([CodeDefine.loadFalse]);
      return;
    }

    if (typeof val === 'number') {
      var rawVal = node.raw;
      var isFloat = rawVal.indexOf('.') >= 0 || rawVal.indexOf('e+') >= 0;
      var isNegative = val < 0;
      var positive = isNegative ? -val : val;

      if (isNegative) {
        vm.code.push([CodeDefine.loadValue, 0]);
      }

      if (positive < 0x7fffffff && !isFloat) {
        if (positive < 0xff) {
          vm.code.push([CodeDefine.loadValue, positive]);
        } else if (positive < 0xffff) {
          vm.code.push([CodeDefine.loadValue2, positive >>> 8, positive & 0xff]);
        } else {
          vm.code.push([CodeDefine.loadValue4, positive >>> 24, (positive & 0xff0000) >>> 16, (positive & 0xff00) >>> 8, positive & 0xff]);
        }

        if (isNegative) {
          vm.code.push([CodeDefine.min]);
        }
      } else {
        vm.consts.push(rawVal);
        vm.code.push([CodeDefine.loadConst, vm.addConstr(rawVal)]);

        if (isFloat) {
          vm.code.push([CodeDefine.parseFloat]);
        } else {
          vm.code.push([CodeDefine.parseInt]);
        }
      }

      return;
    } else if (typeof val === 'string') {
      if (val) {
        vm.consts.push(val);
        vm.code.push([CodeDefine.loadConst, vm.addConstr(val)]);
      } else {
        vm.code.push([CodeDefine.loadBlank]);
      }

      return;
    }

    throw new Error("unknown Literal type value " + val);
  } else if (type === "ArrayExpression") {
    var es = node.elements;

    for (var _i6 = 0; es[_i6]; ++_i6) {
      loadValueWithTag(vm, es[_i6]);
    }

    vm.code.push([CodeDefine.mkArr, es.length]);
    return null;
  } else if (type === "NewExpression") {
    return newExpression(vm, node);
  } else if (type === "CallExpression") {
    return callExpression(vm, node);
  } else if (type === "BinaryExpression") {
    return binaryExpression(vm, node);
  } else if (type === "UnaryExpression") {
    return unaryExpression(vm, node);
  } else if (type === "Identifier") {
    return loadIdentifier(vm, node);
  } else if (type == "SequenceExpression") {
    var _es = node.expressions;
    var lastIdx = null;

    for (var _i7 = 0; _es[_i7]; ++_i7) {
      if (_i7 > 0) {
        vm.code.push([CodeDefine.popStack]); //由一串语句拼成的大语句，只要最后一个作为返回值
      }

      var esTag = new Translator_Tag("esTag");
      lastIdx = loadDefVar(vm, _es[_i7], esTag);
      vm.code.push(esTag);
      vm.takeEffect();
    }

    return lastIdx;
  } else if (type == "UpdateExpression") {
    var updataTag = new Translator_Tag("updateTag");
    var idx = loadDefVar(vm, node.argument, updataTag);
    vm.code.push(updataTag);

    if (!node.prefix) {
      vm.code.push([CodeDefine.dupStack]);
    }

    switch (node.operator) {
      case "++":
        vm.code.push([CodeDefine.inc]);
        break;

      case "--":
        vm.code.push([CodeDefine.dec]);
        break;
    }

    if (node.prefix) {
      vm.code.push([CodeDefine.dupStack]);
    }

    vm.code.push([CodeDefine.movToStash]); //要让变量做到语句结束才更新副作用，要付出一点代价啊

    var preCode = vm.code;
    vm.code = [];
    vm.code.push([CodeDefine.movfromStash]);

    if (node.argument.type == "Identifier") {
      if (idx && idx[0] != -1) {
        vm.code.push([CodeDefine.storeVar, idx]);
      } else {
        idx = vm.findContextVar(node.argument.name);

        if (idx[0] >= 0) {
          vm.code.push([CodeDefine.storeContextVar, idx]);
        } else {
          if (idx[0] === -2) {
            idx[1].forEach(function (e) {
              vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
            });
            vm.code.push([CodeDefine.mkArr, idx[1].length]);
            vm.code.push([CodeDefine.storeContextVarSelective, vm.addConstr(node.argument.name)]);
          } else {
            vm.code.push([CodeDefine.storeEnv, vm.addConstr(node.argument.name)]);
          }
        }
      }
    } else if (node.argument.type == "MemberExpression") {
      var ag = node.argument;
      loadValueWithTag(vm, ag.object);

      if (ag.property.type === "Identifier") {
        if (vm.sourceCode.charAt(ag.property.start - 1) === '[') {
          loadValueWithTag(vm, ag.property);
        } else {
          vm.code.push([CodeDefine.loadConst, vm.addConstr(ag.property.name)]);
        }
      } else {
        loadValueWithTag(vm, ag.property);
      }

      vm.code.push([CodeDefine.setProp]);
    } //额外的副作用问题，让副作用在每个语句完成后起作用


    vm.extEffect.push(vm.code);
    vm.code = preCode;
    return idx;
  } else if (type === "MemberExpression") {
    if (node.object.type === "Identifier" && node.property.type === "Identifier") {
      var name = node.object.name;

      var _idx = vm.findVar(name);

      if (_idx[0] === -1) {
        _idx = vm.findContextVar(name);

        if (_idx[0] >= 0) {
          vm.code.push([CodeDefine.loadContextVal, _idx]);
        } else if (_idx[0] === -2) {
          _idx[1].forEach(function (e) {
            vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
          });

          vm.code.push([CodeDefine.mkArr, _idx[1].length]);
          vm.code.push([CodeDefine.loadContextValSelective, vm.addConstr(name)]);
        } else {
          vm.logExtenals(name);
          vm.code.push([CodeDefine.loadEnv, vm.addConstr(name)]);
        }
      } else {
        vm.code.push([CodeDefine.loadVar, _idx]);
      }

      if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
        loadValueWithTag(vm, node.property);
      } else {
        vm.code.push([CodeDefine.loadConst, vm.addConstr(node.property.name)]);
      }
    } else {
      loadValueWithTag(vm, node.object);

      if (node.property.type === "Identifier") {
        if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
          loadValueWithTag(vm, node.property);
        } else {
          vm.code.push([CodeDefine.loadConst, vm.addConstr(node.property.name)]);
        }
      } else {
        loadValueWithTag(vm, node.property);
      }
    }

    vm.code.push([CodeDefine.loadProp]);
    return "cacl";
  } else if (type === "AssignmentExpression") {
    if (node.operator !== "=") {
      loadValueWithTag(vm, node.left);
    }

    loadValueWithTag(vm, node.right);

    switch (node.operator) {
      case "=":
        break;

      case "+=":
        vm.code.push([CodeDefine.add]);
        break;

      case "-=":
        vm.code.push([CodeDefine.min]);
        break;

      case "*=":
        vm.code.push([CodeDefine.mul]);
        break;

      case "/=":
        vm.code.push([CodeDefine.div]);
        break;

      case "%=":
        vm.code.push([CodeDefine.mod]);
        break;

      case "^=":
        vm.code.push([CodeDefine.nor]);
        break;

      case "|=":
        vm.code.push([CodeDefine.byteOr]);
        break;

      case "&=":
        vm.code.push([CodeDefine.byteAnd]);
        break;

      default:
        throw new Error("unknown operator " + node.operator);
    }

    vm.code.push([CodeDefine.dupStack]);
    var left = node.left;

    if (left.type == "Identifier") {
      var _name = left.name;

      var _idx2 = vm.findVar(_name);

      if (_idx2[0] === -1) {
        _idx2 = vm.findContextVar(_name);

        if (_idx2[0] >= 0) {
          vm.code.push([CodeDefine.storeContextVar, _idx2]);
        } else if (_idx2[0] === -2) {
          _idx2[1].forEach(function (e) {
            vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
          });

          vm.code.push([CodeDefine.mkArr, _idx2[1].length]);
          vm.code.push([CodeDefine.storeContextVarSelective, vm.addConstr(_name)]);
        } else {
          vm.code.push([CodeDefine.storeEnv, vm.addConstr(_name)]);
        }
      } else {
        vm.code.push([CodeDefine.storeVar, _idx2]);
      }

      return _idx2;
    } else if (left.type == "MemberExpression") {
      loadAssignmentMember(vm, left, true);
      return null;
    }

    throw new Error("unknow AssignmentExpression type " + left.type);
  } else if (type === "LogicalExpression") {
    loadValueWithTag(vm, node.left);
    vm.code.push([CodeDefine.dupStack]);

    if (node.operator === "||") {
      jumpToTagIfNotZero(vm, nextBlockTag);
    } else if (node.operator === "&&") {
      jumpToTagIfZero(vm, nextBlockTag);
    } else {
      throw new Error("unknow LogicalExpression operator " + node.operator);
    }

    loadValueWithTag(vm, node.right);
    return null;
  } else if (type === "ConditionalExpression") {
    return conditionalExpression(vm, node, nextBlockTag);
  } else if (type === "FunctionExpression" || type === "ArrowFunctionExpression") {
    defFunctionPre(vm, node);
    return null;
  } else if (type === "ThisExpression") {
    vm.code.push([CodeDefine.loadThis]);
    return null;
  }

  throw new Error("unknown variable type " + type);
}

function loadAssignmentMember(vm, node, isTop) {
  // if(node.object.type==="Identifier"||node.object.type==="ThisExpression"){
  //     loadIdentifier(vm, node.object)
  // }else{
  //     loadAssignmentMember(vm,node.object,false)
  // }
  switch (node.object.type) {
    case "MemberExpression":
      loadAssignmentMember(vm, node.object, false);
      break;

    default:
      loadValueWithTag(vm, node.object);
      break;
  }

  if (node.property.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
    } else {
      vm.code.push([CodeDefine.loadConst, vm.addConstr(node.property.name)]);
    }
  } else {
    loadValueWithTag(vm, node.property);
  }

  if (isTop) {
    vm.code.push([CodeDefine.setProp]);
  } else {
    vm.code.push([CodeDefine.loadProp]);
  }
}

function conditionalExpression(vm, node, retTag) {
  loadValueWithTag(vm, node.test);
  vm.takeEffect();
  var alterTag = new Translator_Tag("alterTag");
  jumpToTagIfZero(vm, alterTag);
  loadValueWithTag(vm, node.consequent);
  vm.takeEffect();
  jumpToTag(vm, retTag);
  vm.code.push(alterTag);
  loadValueWithTag(vm, node.alternate);
  vm.takeEffect();
  return null;
}
/**
 * 尝试在上下文中找到对应的变量,并加载到stack
 * @param {*} vm 
 * @param {*} name 
 * @returns 
 */


function searchVarInAll(vm, name) {
  var idx = vm.findVar(name);

  if (idx[0] === -1) {
    idx = vm.findContextVar(name);

    if (idx[0] >= 0) {
      vm.code.push([CodeDefine.loadContextVal, idx]);
      return null;
    } else if (idx[0] === -2) {
      idx[1].forEach(function (e) {
        vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
      });
      vm.code.push([CodeDefine.mkArr, idx[1].length]);
      vm.code.push([CodeDefine.loadContextValSelective, vm.addConstr(name)]);
      return null;
    }

    vm.logExtenals(name);
    vm.code.push([CodeDefine.loadEnv, vm.addConstr(name)]);
  } else {
    vm.code.push([CodeDefine.loadVar, idx]);
  }

  return idx;
}

function loadIdentifier(vm, node) {
  var name = node.name;

  switch (node.name) {
    case "null":
      vm.code.push([CodeDefine.loadNull]);
      return;

    case "undefined":
      vm.code.push([CodeDefine.loadUndefined]);
      return;

    case "window":
      vm.code.push([CodeDefine.loadWindow]);
      return;
  }

  if (node.type == "ThisExpression") {
    vm.code.push([CodeDefine.loadThis]);
    return;
  }

  return searchVarInAll(vm, name);
}

function newExpression(vm, node) {
  var callee = node.callee;
  var args = node.arguments;

  for (var i = 0; args[i]; ++i) {
    loadValueWithTag(vm, args[i]);
    vm.takeEffect();
  }

  var name = callee.name;
  var idx = vm.findVar(name);

  if (idx[0] === -1) {
    idx = vm.findContextVar(name);

    if (idx[0] >= 0) {
      vm.code.push([CodeDefine.newContextClassObject, idx, args.length]);
      return null;
    } else if (idx[0] === -2) {
      idx[1].forEach(function (e) {
        vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
      });
      vm.code.push([CodeDefine.mkArr, idx[1].length]);
      vm.code.push([CodeDefine.newContextClassObjectSelective, args.length, vm.addConstr(name)]);
      return null;
    }

    vm.logExtenals(name);
    vm.code.push([CodeDefine.newClassObject, vm.addConstr(name), args.length]);
  } else {
    vm.code.push([CodeDefine.newLocalClassObject, idx, args.length]);
  }

  return null;
}

function callExpression(vm, node) {
  var callee = node.callee;
  var args = node.arguments;

  for (var i = 0; args[i]; ++i) {
    loadValueWithTag(vm, args[i]);
    vm.takeEffect();
  }

  if (callee.type === "Identifier") {
    var name = callee.name;
    var idx = vm.findVar(name);

    if (idx[0] === -1) {
      idx = vm.findContextVar(name);

      if (idx[0] >= 0) {
        vm.code.push([CodeDefine.loadContextVal, idx]);
        vm.code.push([CodeDefine.callStackFunc, args.length]);
        return null;
      } else if (idx[0] === -2) {
        idx[1].forEach(function (e) {
          vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
        });
        vm.code.push([CodeDefine.mkArr, idx[1].length]);
        vm.code.push([CodeDefine.loadContextValSelective, vm.addConstr(name)]);
        vm.code.push([CodeDefine.callStackFunc, args.length]);
        return null;
      }

      if (name === 'exit') {
        vm.code.push([CodeDefine.exit]);
        return null;
      }

      vm.logExtenals(name);
      vm.code.push([CodeDefine.callFunc, vm.addConstr(name), args.length]);
    } else {
      vm.code.push([CodeDefine.loadVar, idx]);
      vm.code.push([CodeDefine.callStackFunc, args.length]);
    }

    return null;
  } else if (callee.type === "MemberExpression") {
    loadCallExpressionMember(vm, callee, args, true);
    return null;
  } else if (callee.type === 'FunctionExpression') {
    defFunctionPre(vm, callee);
    vm.code.push([CodeDefine.callStackFunc, args.length]);
    return null;
  } else if (callee.type === "CallExpression") {
    callExpression(vm, callee);
    return null;
  }

  throw new Error("unknown callee type " + callee.type);
}

function callLocalCallExpressionMember(vm, node, args, idx) {
  if (node.object.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
      vm.code.push([CodeDefine.memberIndexMethod, idx, args.length]);
    } else {
      vm.code.push([CodeDefine.memberMethod, idx, vm.addConstr(node.property.name), args.length]);
    }
  } else if (node.object.type === "Literal") {
    loadValueWithTag(vm, node.property);
    vm.code.push([CodeDefine.memberIndexMethod, idx, args.length]);
  } else {
    vm.code.push([CodeDefine.memberMethod, idx, vm.addConstr(node.property.name), args.length]);
  }
}

function callContextCallExpressionMember(vm, node, args, idx) {
  if (node.object.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
      vm.code.push([CodeDefine.contextMemberIndexMethod, idx, args.length]);
    } else {
      vm.code.push([CodeDefine.contextMemberMethod, idx, vm.addConstr(node.property.name), args.length]);
    }
  } else if (node.object.type === "Literal") {
    loadValueWithTag(vm, node.property);
    vm.code.push([CodeDefine.contextMemberIndexMethod, idx, args.length]);
  } else {
    vm.code.push([CodeDefine.contextMemberMethod, idx, vm.addConstr(node.property.name), args.length]);
  }
}

function callContextCallExpressionMemberSelective(vm, node, args, idx, nameIndex) {
  idx[1].forEach(function (e) {
    vm.code.push([CodeDefine.load2NumAsArray, e[0], e[1]]);
  });
  vm.code.push([CodeDefine.mkArr, idx[1].length]);

  if (node.object.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
      vm.code.push([CodeDefine.contextMemberIndexMethodSelective, args.length, nameIndex]);
    } else {
      vm.code.push([CodeDefine.contextMemberMethodSelective, vm.addConstr(node.property.name), args.length, nameIndex]);
    }
  } else if (node.object.type === "Literal") {
    loadValueWithTag(vm, node.property);
    vm.code.push([CodeDefine.contextMemberIndexMethodSelective, args.length, nameIndex]);
  } else {
    vm.code.push([CodeDefine.contextMemberMethodSelective, vm.addConstr(node.property.name), args.length, nameIndex]);
  }
}

function callEnvCallExpressionMember(vm, node, args, name) {
  if (node.object.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
      vm.code.push([CodeDefine.envMemberIndexMethod, vm.addConstr(name), args.length]);
    } else {
      vm.code.push([CodeDefine.envMemberMethod, vm.addConstr(name), vm.addConstr(node.property.name), args.length]);
    }
  } else if (node.object.type === "Literal") {
    loadValueWithTag(vm, node.property);
    vm.code.push([CodeDefine.envMemberIndexMethod, vm.addConstr(name), args.length]);
  } else {
    vm.code.push([CodeDefine.envMemberMethod, vm.addConstr(name), vm.addConstr(node.property.name), args.length]);
  }
}

function loadCallExpressionMember(vm, node, args, isTop) {
  if (node.type === "NewExpression") {
    newExpression(vm, node);
    return;
  } else if (node.type === "CallExpression") {
    callExpression(vm, node);
    return;
  } else if (node.object.type === "Identifier") {
    if (isTop) {
      var name = node.object.name;
      var idx = vm.findVar(name);

      if (idx[0] === -1) {
        idx = vm.findContextVar(name);

        if (idx[0] >= 0) {
          callContextCallExpressionMember(vm, node, args, idx);
          return;
        } else if (idx[0] === -2) {
          callContextCallExpressionMemberSelective(vm, node, args, idx, vm.addConstr(name));
          return null;
        }

        vm.logExtenals(name);
        callEnvCallExpressionMember(vm, node, args, name);
      } else {
        callLocalCallExpressionMember(vm, node, args, idx);
      }

      return;
    } else {
      loadIdentifier(vm, node.object);
    }
  } else {
    if (node.object.type === "MemberExpression") {
      loadCallExpressionMember(vm, node.object, false);
    } else {
      loadValueWithTag(vm, node.object);
    }
  }

  if (node.property.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
    } else {
      vm.code.push([CodeDefine.loadConst, vm.addConstr(node.property.name)]);
    }
  } else if (node.property.type === "Literal") {
    loadValueWithTag(vm, node.property);
  } else {
    vm.code.push([CodeDefine.loadConst, vm.addConstr(node.property.name)]);
  }

  if (isTop) {
    vm.code.push([CodeDefine.stackMemberMethod, args.length]);
  } else {
    vm.code.push([CodeDefine.loadProp]);
  }
}

function forStatement(vm, node) {
  if (node.init) {
    if (node.init.type === "VariableDeclaration") {
      var es = node.init.declarations;

      for (var k = 0; es[k]; ++k) {
        VariableDeclarator(vm, es[k]);
        vm.takeEffect();
      }
    } else {
      loadValueWithTag(vm, node.init);
      vm.takeEffect();
    }
  }

  var loop = new Translator_Tag("forStatementStart");
  vm.code.push(loop);
  var end = new Translator_Tag("forStatementEnd");
  loadValueWithTag(vm, node.test);
  vm.takeEffect();
  jumpToTagIfZero(vm, end);
  var blockGoToStartTag = new Translator_Tag("blockToStart");
  loadBlockStatement(vm, node.body, blockGoToStartTag, end);
  vm.takeEffect();
  vm.code.push(blockGoToStartTag);

  if (node.update) {
    loadValueWithTag(vm, node.update);
    vm.code.push([CodeDefine.popStack]);
    vm.takeEffect();
  }

  jumpToTag(vm, loop);
  vm.code.push(end);
}

function ifStatement(vm, node, startTag, endTag) {
  var next = new Translator_Tag("ifStatementNext");
  var end = new Translator_Tag("ifStatementEnd");
  loadValueWithTag(vm, node.test);
  vm.takeEffect();
  jumpToTagIfZero(vm, next);
  loadBlockStatement(vm, node.consequent, startTag, endTag);
  vm.takeEffect();

  if (node.alternate) {
    jumpToTag(vm, end);
    vm.code.push(next);

    if (node.alternate.type === "IfStatement") {
      ifStatement(vm, node.alternate, startTag, endTag);
      vm.takeEffect();
    } else {
      loadBlockStatement(vm, node.alternate, startTag, endTag);
      vm.takeEffect();
    }

    vm.code.push(end);
  } else {
    vm.code.push(next);
  }
}

function whileStatement(vm, node) {
  var start = new Translator_Tag("whileStatementStart");
  var end = new Translator_Tag("whileStatementEnd");
  vm.code.push(start);
  loadValueWithTag(vm, node.test);
  vm.takeEffect();
  jumpToTagIfZero(vm, end);
  loadBlockStatement(vm, node.body, start, end);
  vm.takeEffect();
  jumpToTag(vm, start);
  vm.code.push(end);
}

function checkCurrentIndex(vm) {
  var cc = 0;

  for (var i = 0; vm.code[i]; ++i) {
    var bc = vm.code[i];

    if (bc instanceof Array) {
      cc++;
    }
  }

  return cc;
}

function tryStatement(vm, node, startTag, endTag) {
  var loop = new Translator_Tag("tryStatementLoop");
  var clean = new Translator_Tag("tryStatementclean");
  var pureLoop = new Translator_Tag("tryStatementLoop");
  var pureClean = new Translator_Tag("tryStatementclean");
  var end = new Translator_Tag("tryStatementEnd");

  var loadFinal = function loadFinal() {
    if (node.finalizer) {
      var finalizer = node.finalizer;
      vm.newBlock();
      vm.code.push([CodeDefine.newStack]);
      var finallyBlockStartPosition = checkCurrentIndex(vm);

      if (finalizer.body.type == "BlockStatement") {
        blockStatement(vm, finalizer.body, startTag ? pureLoop : startTag, endTag ? pureClean : endTag);
      } else {
        blockStatement(vm, finalizer, startTag ? pureLoop : startTag, endTag ? pureClean : endTag);
      }

      vm.takeEffect();
      var finallyBlockEndPosition = checkCurrentIndex(vm);
      vm.code.push([CodeDefine.delStack]);
      vm.qiutBlock();
      loadErrorBlockClean(vm, finallyBlockStartPosition, finallyBlockEndPosition);
    }
  }; //正常快递此处开始


  var tryBlockStartPosition = checkCurrentIndex(vm); //加载正常块

  vm.code.push([CodeDefine.newStack]);
  vm.newBlock();
  blockStatement(vm, node.block, startTag ? loop : startTag, endTag ? clean : endTag);
  vm.qiutBlock();
  vm.code.push([CodeDefine.delStack]); //正常块结束

  var tryEndPosition = checkCurrentIndex(vm);
  var next = new Translator_Tag("tryStatementNext");
  jumpToTag(vm, next); //异常处理流程

  vm.catch.push([tryBlockStartPosition, tryEndPosition, checkCurrentIndex(vm)]);
  vm.code.push([CodeDefine.delStack]); //处理异常前需要先把正常代码块卸载

  if (node.handler) {
    var handler = node.handler;
    vm.newBlock();
    vm.code.push([CodeDefine.newStack]);
    var catchBlockStartPosition = checkCurrentIndex(vm);
    var errorName = handler.param.name;
    var curStack = vm.vars[vm.vars.length - 1];
    var idx = curStack[errorName];

    if (!idx) {
      idx = vm.addVar(errorName);
    }

    vm.code.push([CodeDefine.loadError]);
    vm.code.push([CodeDefine.storeVar, idx]);

    if (handler.body.type == "BlockStatement") {
      blockStatement(vm, handler.body, startTag ? loop : startTag, endTag ? clean : endTag);
    } else {
      blockStatement(vm, handler, startTag ? loop : startTag, endTag ? clean : endTag);
    }

    var catchBlockEndPosition = checkCurrentIndex(vm);
    vm.code.push([CodeDefine.delStack]);
    vm.qiutBlock();
    jumpToTag(vm, next);
    vm.catch.push([catchBlockStartPosition, catchBlockEndPosition, checkCurrentIndex(vm)]);
    vm.code.push([CodeDefine.delStack]); //处理异常前需要先把正常代码块卸载
  }

  loadFinal();
  vm.code.push([CodeDefine.throwError]);

  if (startTag || endTag) {
    if (startTag) {
      vm.code.push(loop);
      vm.code.push([CodeDefine.delStack]); //处理continue前需要先把正常代码块卸载

      loadFinal();
      jumpToTag(vm, startTag);
      vm.code.push(pureLoop);
      vm.code.push([CodeDefine.delStack]); //处理continue前需要先把正常代码块卸载

      jumpToTag(vm, startTag);
    }

    if (endTag) {
      vm.code.push(clean);
      vm.code.push([CodeDefine.delStack]); //处理break前需要先把正常代码块卸载

      loadFinal();
      jumpToTag(vm, endTag);
      vm.code.push(pureClean);
      vm.code.push([CodeDefine.delStack]); //处理break前需要先把正常代码块卸载

      jumpToTag(vm, endTag);
    }
  }

  vm.code.push(next);
  loadFinal();
  vm.code.push(end);
}

function loadErrorBlockClean(vm, start, end) {
  var jmp = new Translator_Tag("normalJump");
  jumpToTag(vm, jmp); //这里只允许跳转进来，其他时候要跳过

  var throwPosition = checkCurrentIndex(vm);
  vm.takeEffect(); //出错了副作用还要不要也是个问题

  vm.code.push([CodeDefine.delStack]); //处理异常前需要先把正常代码块卸载

  vm.code.push([CodeDefine.throwError]);
  vm.catch.push([start, end, throwPosition]);
  vm.code.push(jmp);
}

function switchStatement(vm, node) {
  loadValueWithTag(vm, node.discriminant);
  vm.takeEffect();
  var sortCaseArray = node.cases;
  var defaultCaseIndex = -1;
  var caseTagArr = [];

  for (var i = 0; sortCaseArray[i]; ++i) {
    caseTagArr[i] = new Translator_Tag("switchStatementTag" + i);
  }

  for (var _i8 = 0; sortCaseArray[_i8]; ++_i8) {
    if (sortCaseArray[_i8].test) {
      vm.code.push([CodeDefine.dupStack]);
      loadValueWithTag(vm, sortCaseArray[_i8].test);
      vm.takeEffect(); //理论上这里应该是常量，不会有什么副作用，但万一呢？？？

      var clearStack = new Translator_Tag("clearStack"),
          nextJudge = new Translator_Tag("nextJudge");
      var jmpToClear = [CodeDefine.eqJmp, 0];
      vm.code.push(jmpToClear);
      clearStack.addListener(jmpToClear);
      jumpToTag(vm, nextJudge);
      vm.code.push(clearStack);
      vm.code.push([CodeDefine.popStack]);
      jumpToTag(vm, caseTagArr[_i8]);
      vm.code.push(nextJudge);
    } else {
      defaultCaseIndex = _i8;
    }
  } //defaultCase的匹配放到最后


  if (defaultCaseIndex >= 0) {
    vm.code.push([CodeDefine.popStack]);
    jumpToTag(vm, caseTagArr[defaultCaseIndex]);
  }

  var clean = new Translator_Tag("switchStatementCaseClean");
  var end = new Translator_Tag("switchStatementTagEnd");

  for (var _i9 = 0; sortCaseArray[_i9]; ++_i9) {
    vm.code.push(caseTagArr[_i9]);
    var consequent = sortCaseArray[_i9].consequent;

    for (var k = 0; consequent[k]; ++k) {
      if (consequent[k].type !== "BreakStatement") {
        var startPosition = checkCurrentIndex(vm);
        vm.newBlock();
        vm.code.push([CodeDefine.newStack]);
        blockStatement(vm, consequent[k], null, clean);
        vm.takeEffect();
        vm.code.push([CodeDefine.delStack]);
        vm.qiutBlock();
        loadErrorBlockClean(vm, startPosition, checkCurrentIndex(vm));
      } else {
        jumpToTag(vm, end);
      }
    }
  }

  jumpToTag(vm, end);
  vm.code.push(clean);
  vm.code.push([CodeDefine.delStack]);
  vm.code.push(end);
}

function doWhileStatement(vm, node) {
  var start = new Translator_Tag("doWhileStatementStart");
  var loop = new Translator_Tag("doWhileStatementLoop");
  var end = new Translator_Tag("whileStatementEnd");
  vm.code.push(start);
  loadBlockStatement(vm, node.body, loop, end);
  vm.takeEffect();
  vm.code.push(loop);
  loadValueWithTag(vm, node.test);
  vm.takeEffect();
  jumpToTagIfNotZero(vm, start);
  vm.code.push(end);
}

function binaryExpression(vm, node) {
  if (node.left) {
    var leftTag = new Translator_Tag("varLoadTag");
    loadDefVar(vm, node.left, leftTag);
    vm.code.push(leftTag);
  } else {
    vm.code.push([CodeDefine.loadNull]);
  }

  if (node.right) {
    var rightTag = new Translator_Tag("varLoadTag");
    loadDefVar(vm, node.right, rightTag);
    vm.code.push(rightTag);
  } else {
    vm.code.push([CodeDefine.loadNull]);
  }

  switch (node.operator) {
    case '^':
      vm.code.push([CodeDefine.nor]);
      break;

    case '+':
      vm.code.push([CodeDefine.add]);
      break;

    case '-':
      vm.code.push([CodeDefine.min]);
      break;

    case '*':
      vm.code.push([CodeDefine.mul]);
      break;

    case '/':
      vm.code.push([CodeDefine.div]);
      break;

    case '%':
      vm.code.push([CodeDefine.mod]);
      break;

    case '&':
      vm.code.push([CodeDefine.byteAnd]);
      break;

    case '|':
      vm.code.push([CodeDefine.byteOr]);
      break;

    case '&&':
      vm.code.push([CodeDefine.and]);
      break;

    case '||':
      vm.code.push([CodeDefine.or]);
      break;

    case '<':
      vm.code.push([CodeDefine.lt]);
      break;

    case '<=':
      vm.code.push([CodeDefine.lte]);
      break;

    case '>':
      vm.code.push([CodeDefine.gt]);
      break;

    case '>=':
      vm.code.push([CodeDefine.gte]);
      break;

    case '==':
      vm.code.push([CodeDefine.eq]);
      break;

    case '===':
      vm.code.push([CodeDefine.eq]);
      break;

    case '!=':
      vm.code.push([CodeDefine.neq]);
      break;

    case '!==':
      vm.code.push([CodeDefine.neq]);
      break;

    case '>>':
      vm.code.push([CodeDefine.byteMovRight]);
      break;

    case '>>>':
      vm.code.push([CodeDefine.byteUnsignedMovRight]);
      break;

    case '<<':
      vm.code.push([CodeDefine.byteMovLeft]);
      break;

    case "instanceof":
      vm.code.push([CodeDefine.instanceof]);
      break;

    default:
      throw new Error("unkonow binaryExpression operator " + node.operator);
  }

  return null;
}

function unaryExpression(vm, node) {
  switch (node.operator) {
    case '!':
      {
        var argumentTag = new Translator_Tag("argumentTag");
        loadDefVar(vm, node.argument, argumentTag);
        vm.code.push(argumentTag);
        vm.code.push([CodeDefine.not]);
      }
      break;

    case '-':
      {
        vm.code.push([CodeDefine.loadValue, 0]);

        var _argumentTag = new Translator_Tag("argumentTag");

        loadDefVar(vm, node.argument, _argumentTag);
        vm.code.push(_argumentTag);
        vm.code.push([CodeDefine.min]);
      }
      break;

    case '~':
      {
        var _argumentTag2 = new Translator_Tag("argumentTag");

        loadDefVar(vm, node.argument, _argumentTag2);
        vm.code.push(_argumentTag2);
        vm.code.push([CodeDefine.reverse]);
      }
      break;

    case "typeof":
      {
        var _argumentTag3 = new Translator_Tag("argumentTag");

        loadDefVar(vm, node.argument, _argumentTag3);
        vm.code.push(_argumentTag3);
        vm.code.push([CodeDefine.typeof]);
      }
      break;

    case "void":
      {
        var _argumentTag4 = new Translator_Tag("argumentTag");

        loadDefVar(vm, node.argument, _argumentTag4);
        vm.code.push(_argumentTag4);
        vm.code.push([CodeDefine.void]);
      }
      break;

    case "delete":
      {
        var arg = node.argument;

        switch (arg.type) {
          case "Identifier":
            break;
          //删除符号跳过

          case "MemberExpression":
            {
              loadDeleteMember(vm, arg, true);
            }
            break;
        }
      }
      break;

    default:
      throw new Error("unkonow unaryExpression operator " + node.operator);
  }

  return null;
}

function loadDeleteMember(vm, node, isTop) {
  switch (node.object.type) {
    case "MemberExpression":
      loadAssignmentMember(vm, node.object, false);
      break;

    default:
      loadValueWithTag(vm, node.object);
      break;
  }

  if (node.property.type === "Identifier") {
    if (vm.sourceCode.charAt(node.property.start - 1 - vm.sourceCodePostionOffset) === '[') {
      loadValueWithTag(vm, node.property);
    } else {
      vm.code.push([CodeDefine.loadConst, vm.addConstr(node.property.name)]);
    }
  } else {
    loadValueWithTag(vm, node.property);
  }

  if (isTop) {
    vm.code.push([CodeDefine.delProp]);
  } else {
    vm.code.push([CodeDefine.loadProp]);
  }
}

/* harmony default export */ var Translator = __webpack_exports__["a"] = ({
  accept: accept
});

/***/ }),

/***/ "85ec":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c6e1":
/***/ (function(module, exports) {

module.exports = "!function(n){\"use strict\";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r=\"\";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;16>r;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e=\"0123456789abcdef\",o=\"\";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}\"function\"==typeof define&&define.amd?define(function(){return A}):\"object\"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);\n//# sourceMappingURL=md5.min.js.map"

/***/ }),

/***/ "ea81":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5138b6f0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CodeViewer.vue?vue&type=template&id=0bafe058&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"code"},[_c('codemirror',{ref:"myCm",attrs:{"options":_vm.cmOptions},on:{"ready":_vm.onCmReady,"focus":_vm.onCmFocus,"input":_vm.onCmCodeChange},model:{value:(_vm.code),callback:function ($$v) {_vm.code=$$v},expression:"code"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CodeViewer.vue?vue&type=template&id=0bafe058&

// EXTERNAL MODULE: ./node_modules/codemirror/mode/javascript/javascript.js
var javascript = __webpack_require__("f9d4");

// EXTERNAL MODULE: ./node_modules/codemirror/keymap/sublime.js
var sublime = __webpack_require__("9a48");

// EXTERNAL MODULE: ./node_modules/codemirror/lib/codemirror.css
var codemirror = __webpack_require__("a7be");

// EXTERNAL MODULE: ./node_modules/codemirror/theme/juejin.css
var juejin = __webpack_require__("6838");

// EXTERNAL MODULE: ./node_modules/codemirror/theme/monokai.css
var monokai = __webpack_require__("7a7a");

// EXTERNAL MODULE: ./node_modules/codemirror/theme/eclipse.css
var eclipse = __webpack_require__("01cb");

// EXTERNAL MODULE: ./node_modules/codemirror/theme/idea.css
var idea = __webpack_require__("b866");

// EXTERNAL MODULE: ./node_modules/vue-codemirror/dist/vue-codemirror.js
var vue_codemirror = __webpack_require__("8f94");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CodeViewer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//








/* harmony default export */ var CodeViewervue_type_script_lang_js_ = ({
  name: 'CodeViewer',
  components: {
    codemirror: vue_codemirror["codemirror"]
  },
  props: {
    sourceCode: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "juejin"
    }
  },
  data: function data() {
    return {
      code: this.sourceCode,
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: 'text/javascript',
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: this.theme,
        extraKeys: {
          "Ctrl": "autocomplete"
        },
        hintOptions: {
          completeSingle: false
        }
      }
    };
  },
  watch: {
    sourceCode: function sourceCode(val) {
      this.code = val;
    }
  },
  methods: {
    onCmReady: function onCmReady(cm) {
      console.log('the editor is readied!', cm);
    },
    onCmFocus: function onCmFocus(cm) {
      console.log('the editor is focus!', cm);
    },
    onCmCodeChange: function onCmCodeChange(newCode) {
      this.code = newCode;
      this.$emit("code-change", this.code);
    }
  },
  computed: {
    codemirror: function codemirror() {
      return this.$refs.myCm.codemirror;
    }
  },
  mounted: function mounted() {
    console.log('this is current codemirror object', this.codemirror);
  }
});
// CONCATENATED MODULE: ./src/components/CodeViewer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CodeViewervue_type_script_lang_js_ = (CodeViewervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CodeViewer.vue?vue&type=style&index=0&lang=css&
var CodeViewervue_type_style_index_0_lang_css_ = __webpack_require__("ee00");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/CodeViewer.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_CodeViewervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CodeViewer = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "eb50":
/***/ (function(module, exports) {

module.exports = "/*\n * [js-sha512]{@link https://github.com/emn178/js-sha512}\n *\n * @version 0.8.0\n * @author Chen, Yi-Cyuan [emn178@gmail.com]\n * @copyright Chen, Yi-Cyuan 2014-2018\n * @license MIT\n */\n!function(){\"use strict\";function h(h,t){t?(p[0]=p[1]=p[2]=p[3]=p[4]=p[5]=p[6]=p[7]=p[8]=p[9]=p[10]=p[11]=p[12]=p[13]=p[14]=p[15]=p[16]=p[17]=p[18]=p[19]=p[20]=p[21]=p[22]=p[23]=p[24]=p[25]=p[26]=p[27]=p[28]=p[29]=p[30]=p[31]=p[32]=0,this.blocks=p):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],384==h?(this.h0h=3418070365,this.h0l=3238371032,this.h1h=1654270250,this.h1l=914150663,this.h2h=2438529370,this.h2l=812702999,this.h3h=355462360,this.h3l=4144912697,this.h4h=1731405415,this.h4l=4290775857,this.h5h=2394180231,this.h5l=1750603025,this.h6h=3675008525,this.h6l=1694076839,this.h7h=1203062813,this.h7l=3204075428):256==h?(this.h0h=573645204,this.h0l=4230739756,this.h1h=2673172387,this.h1l=3360449730,this.h2h=596883563,this.h2l=1867755857,this.h3h=2520282905,this.h3l=1497426621,this.h4h=2519219938,this.h4l=2827943907,this.h5h=3193839141,this.h5l=1401305490,this.h6h=721525244,this.h6l=746961066,this.h7h=246885852,this.h7l=2177182882):224==h?(this.h0h=2352822216,this.h0l=424955298,this.h1h=1944164710,this.h1l=2312950998,this.h2h=502970286,this.h2l=855612546,this.h3h=1738396948,this.h3l=1479516111,this.h4h=258812777,this.h4l=2077511080,this.h5h=2011393907,this.h5l=79989058,this.h6h=1067287976,this.h6l=1780299464,this.h7h=286451373,this.h7l=2446758561):(this.h0h=1779033703,this.h0l=4089235720,this.h1h=3144134277,this.h1l=2227873595,this.h2h=1013904242,this.h2l=4271175723,this.h3h=2773480762,this.h3l=1595750129,this.h4h=1359893119,this.h4l=2917565137,this.h5h=2600822924,this.h5l=725511199,this.h6h=528734635,this.h6l=4215389547,this.h7h=1541459225,this.h7l=327033209),this.bits=h,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1}function t(t,s,e){var r,n=typeof t;if(\"string\"!==n){if(\"object\"!==n)throw new Error(i);if(null===t)throw new Error(i);if(a&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||a&&ArrayBuffer.isView(t)))throw new Error(i);r=!0}var o=t.length;if(!r){for(var l,f=[],c=(o=t.length,0),u=0;u<o;++u)(l=t.charCodeAt(u))<128?f[c++]=l:l<2048?(f[c++]=192|l>>6,f[c++]=128|63&l):l<55296||l>=57344?(f[c++]=224|l>>12,f[c++]=128|l>>6&63,f[c++]=128|63&l):(l=65536+((1023&l)<<10|1023&t.charCodeAt(++u)),f[c++]=240|l>>18,f[c++]=128|l>>12&63,f[c++]=128|l>>6&63,f[c++]=128|63&l);t=f}t.length>128&&(t=new h(s,!0).update(t).array());var y=[],p=[];for(u=0;u<128;++u){var d=t[u]||0;y[u]=92^d,p[u]=54^d}h.call(this,s,e),this.update(p),this.oKeyPad=y,this.inner=!0,this.sharedMemory=e}var i=\"input is invalid type\",s=\"object\"==typeof window,e=s?window:{};e.JS_SHA512_NO_WINDOW&&(s=!1);var r=!s&&\"object\"==typeof self;!e.JS_SHA512_NO_NODE_JS&&\"object\"==typeof process&&process.versions&&process.versions.node?e=global:r&&(e=self);var n=!e.JS_SHA512_NO_COMMON_JS&&\"object\"==typeof module&&module.exports,o=\"function\"==typeof define&&define.amd,a=!e.JS_SHA512_NO_ARRAY_BUFFER&&\"undefined\"!=typeof ArrayBuffer,l=\"0123456789abcdef\".split(\"\"),f=[-2147483648,8388608,32768,128],c=[24,16,8,0],u=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],y=[\"hex\",\"array\",\"digest\",\"arrayBuffer\"],p=[];!e.JS_SHA512_NO_NODE_JS&&Array.isArray||(Array.isArray=function(h){return\"[object Array]\"===Object.prototype.toString.call(h)}),!a||!e.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(h){return\"object\"==typeof h&&h.buffer&&h.buffer.constructor===ArrayBuffer});var d=function(t,i){return function(s){return new h(i,!0).update(s)[t]()}},b=function(t){var i=d(\"hex\",t);i.create=function(){return new h(t)},i.update=function(h){return i.create().update(h)};for(var s=0;s<y.length;++s){var e=y[s];i[e]=d(e,t)}return i},w=function(h,i){return function(s,e){return new t(s,i,!0).update(e)[h]()}},A=function(h){var i=w(\"hex\",h);i.create=function(i){return new t(i,h)},i.update=function(h,t){return i.create(h).update(t)};for(var s=0;s<y.length;++s){var e=y[s];i[e]=w(e,h)}return i};h.prototype.update=function(h){if(this.finalized)throw new Error(\"finalize already called\");var t,s=typeof h;if(\"string\"!==s){if(\"object\"!==s)throw new Error(i);if(null===h)throw new Error(i);if(a&&h.constructor===ArrayBuffer)h=new Uint8Array(h);else if(!(Array.isArray(h)||a&&ArrayBuffer.isView(h)))throw new Error(i);t=!0}for(var e,r,n=0,o=h.length,l=this.blocks;n<o;){if(this.hashed&&(this.hashed=!1,l[0]=this.block,l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=l[16]=l[17]=l[18]=l[19]=l[20]=l[21]=l[22]=l[23]=l[24]=l[25]=l[26]=l[27]=l[28]=l[29]=l[30]=l[31]=l[32]=0),t)for(r=this.start;n<o&&r<128;++n)l[r>>2]|=h[n]<<c[3&r++];else for(r=this.start;n<o&&r<128;++n)(e=h.charCodeAt(n))<128?l[r>>2]|=e<<c[3&r++]:e<2048?(l[r>>2]|=(192|e>>6)<<c[3&r++],l[r>>2]|=(128|63&e)<<c[3&r++]):e<55296||e>=57344?(l[r>>2]|=(224|e>>12)<<c[3&r++],l[r>>2]|=(128|e>>6&63)<<c[3&r++],l[r>>2]|=(128|63&e)<<c[3&r++]):(e=65536+((1023&e)<<10|1023&h.charCodeAt(++n)),l[r>>2]|=(240|e>>18)<<c[3&r++],l[r>>2]|=(128|e>>12&63)<<c[3&r++],l[r>>2]|=(128|e>>6&63)<<c[3&r++],l[r>>2]|=(128|63&e)<<c[3&r++]);this.lastByteIndex=r,this.bytes+=r-this.start,r>=128?(this.block=l[32],this.start=r-128,this.hash(),this.hashed=!0):this.start=r}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this},h.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var h=this.blocks,t=this.lastByteIndex;h[32]=this.block,h[t>>2]|=f[3&t],this.block=h[32],t>=112&&(this.hashed||this.hash(),h[0]=this.block,h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=h[16]=h[17]=h[18]=h[19]=h[20]=h[21]=h[22]=h[23]=h[24]=h[25]=h[26]=h[27]=h[28]=h[29]=h[30]=h[31]=h[32]=0),h[30]=this.hBytes<<3|this.bytes>>>29,h[31]=this.bytes<<3,this.hash()}},h.prototype.hash=function(){var h,t,i,s,e,r,n,o,a,l,f,c,y,p,d,b,w,A,_,v,B,U,S,g,k,z=this.h0h,E=this.h0l,O=this.h1h,m=this.h1l,x=this.h2h,N=this.h2l,j=this.h3h,J=this.h3l,H=this.h4h,I=this.h4l,R=this.h5h,V=this.h5l,C=this.h6h,K=this.h6l,P=this.h7h,D=this.h7l,F=this.blocks;for(h=32;h<160;h+=2)t=((v=F[h-30])>>>1|(B=F[h-29])<<31)^(v>>>8|B<<24)^v>>>7,i=(B>>>1|v<<31)^(B>>>8|v<<24)^(B>>>7|v<<25),s=((v=F[h-4])>>>19|(B=F[h-3])<<13)^(B>>>29|v<<3)^v>>>6,e=(B>>>19|v<<13)^(v>>>29|B<<3)^(B>>>6|v<<26),v=F[h-32],B=F[h-31],a=((U=F[h-14])>>>16)+(v>>>16)+(t>>>16)+(s>>>16)+((o=(65535&U)+(65535&v)+(65535&t)+(65535&s)+((n=((S=F[h-13])>>>16)+(B>>>16)+(i>>>16)+(e>>>16)+((r=(65535&S)+(65535&B)+(65535&i)+(65535&e))>>>16))>>>16))>>>16),F[h]=a<<16|65535&o,F[h+1]=n<<16|65535&r;var M=z,T=E,W=O,Y=m,q=x,G=N,L=j,Q=J,X=H,Z=I,$=R,hh=V,th=C,ih=K,sh=P,eh=D;for(b=W&q,w=Y&G,h=0;h<160;h+=8)t=(M>>>28|T<<4)^(T>>>2|M<<30)^(T>>>7|M<<25),i=(T>>>28|M<<4)^(M>>>2|T<<30)^(M>>>7|T<<25),s=(X>>>14|Z<<18)^(X>>>18|Z<<14)^(Z>>>9|X<<23),e=(Z>>>14|X<<18)^(Z>>>18|X<<14)^(X>>>9|Z<<23),A=(l=M&W)^M&q^b,_=(f=T&Y)^T&G^w,g=X&$^~X&th,k=Z&hh^~Z&ih,v=F[h],B=F[h+1],v=(a=((U=u[h])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+(sh>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&sh)+((n=((S=u[h+1])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(eh>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&eh))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,sh=(a=(L>>>16)+(v>>>16)+((o=(65535&L)+(65535&v)+((n=(Q>>>16)+(B>>>16)+((r=(65535&Q)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,eh=n<<16|65535&r,t=((L=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o)>>>28|(Q=n<<16|65535&r)<<4)^(Q>>>2|L<<30)^(Q>>>7|L<<25),i=(Q>>>28|L<<4)^(L>>>2|Q<<30)^(L>>>7|Q<<25),s=(sh>>>14|eh<<18)^(sh>>>18|eh<<14)^(eh>>>9|sh<<23),e=(eh>>>14|sh<<18)^(eh>>>18|sh<<14)^(sh>>>9|eh<<23),A=(c=L&M)^L&W^l,_=(y=Q&T)^Q&Y^f,g=sh&X^~sh&$,k=eh&Z^~eh&hh,v=F[h+2],B=F[h+3],v=(a=((U=u[h+2])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+(th>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&th)+((n=((S=u[h+3])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(ih>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&ih))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,th=(a=(q>>>16)+(v>>>16)+((o=(65535&q)+(65535&v)+((n=(G>>>16)+(B>>>16)+((r=(65535&G)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,ih=n<<16|65535&r,t=((q=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o)>>>28|(G=n<<16|65535&r)<<4)^(G>>>2|q<<30)^(G>>>7|q<<25),i=(G>>>28|q<<4)^(q>>>2|G<<30)^(q>>>7|G<<25),s=(th>>>14|ih<<18)^(th>>>18|ih<<14)^(ih>>>9|th<<23),e=(ih>>>14|th<<18)^(ih>>>18|th<<14)^(th>>>9|ih<<23),A=(p=q&L)^q&M^c,_=(d=G&Q)^G&T^y,g=th&sh^~th&X,k=ih&eh^~ih&Z,v=F[h+4],B=F[h+5],v=(a=((U=u[h+4])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+($>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&$)+((n=((S=u[h+5])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(hh>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&hh))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,$=(a=(W>>>16)+(v>>>16)+((o=(65535&W)+(65535&v)+((n=(Y>>>16)+(B>>>16)+((r=(65535&Y)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,hh=n<<16|65535&r,t=((W=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o)>>>28|(Y=n<<16|65535&r)<<4)^(Y>>>2|W<<30)^(Y>>>7|W<<25),i=(Y>>>28|W<<4)^(W>>>2|Y<<30)^(W>>>7|Y<<25),s=($>>>14|hh<<18)^($>>>18|hh<<14)^(hh>>>9|$<<23),e=(hh>>>14|$<<18)^(hh>>>18|$<<14)^($>>>9|hh<<23),A=(b=W&q)^W&L^p,_=(w=Y&G)^Y&Q^d,g=$&th^~$&sh,k=hh&ih^~hh&eh,v=F[h+6],B=F[h+7],v=(a=((U=u[h+6])>>>16)+(v>>>16)+(g>>>16)+(s>>>16)+(X>>>16)+((o=(65535&U)+(65535&v)+(65535&g)+(65535&s)+(65535&X)+((n=((S=u[h+7])>>>16)+(B>>>16)+(k>>>16)+(e>>>16)+(Z>>>16)+((r=(65535&S)+(65535&B)+(65535&k)+(65535&e)+(65535&Z))>>>16))>>>16))>>>16))<<16|65535&o,B=n<<16|65535&r,U=(a=(A>>>16)+(t>>>16)+((o=(65535&A)+(65535&t)+((n=(_>>>16)+(i>>>16)+((r=(65535&_)+(65535&i))>>>16))>>>16))>>>16))<<16|65535&o,S=n<<16|65535&r,X=(a=(M>>>16)+(v>>>16)+((o=(65535&M)+(65535&v)+((n=(T>>>16)+(B>>>16)+((r=(65535&T)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,Z=n<<16|65535&r,M=(a=(U>>>16)+(v>>>16)+((o=(65535&U)+(65535&v)+((n=(S>>>16)+(B>>>16)+((r=(65535&S)+(65535&B))>>>16))>>>16))>>>16))<<16|65535&o,T=n<<16|65535&r;a=(z>>>16)+(M>>>16)+((o=(65535&z)+(65535&M)+((n=(E>>>16)+(T>>>16)+((r=(65535&E)+(65535&T))>>>16))>>>16))>>>16),this.h0h=a<<16|65535&o,this.h0l=n<<16|65535&r,a=(O>>>16)+(W>>>16)+((o=(65535&O)+(65535&W)+((n=(m>>>16)+(Y>>>16)+((r=(65535&m)+(65535&Y))>>>16))>>>16))>>>16),this.h1h=a<<16|65535&o,this.h1l=n<<16|65535&r,a=(x>>>16)+(q>>>16)+((o=(65535&x)+(65535&q)+((n=(N>>>16)+(G>>>16)+((r=(65535&N)+(65535&G))>>>16))>>>16))>>>16),this.h2h=a<<16|65535&o,this.h2l=n<<16|65535&r,a=(j>>>16)+(L>>>16)+((o=(65535&j)+(65535&L)+((n=(J>>>16)+(Q>>>16)+((r=(65535&J)+(65535&Q))>>>16))>>>16))>>>16),this.h3h=a<<16|65535&o,this.h3l=n<<16|65535&r,a=(H>>>16)+(X>>>16)+((o=(65535&H)+(65535&X)+((n=(I>>>16)+(Z>>>16)+((r=(65535&I)+(65535&Z))>>>16))>>>16))>>>16),this.h4h=a<<16|65535&o,this.h4l=n<<16|65535&r,a=(R>>>16)+($>>>16)+((o=(65535&R)+(65535&$)+((n=(V>>>16)+(hh>>>16)+((r=(65535&V)+(65535&hh))>>>16))>>>16))>>>16),this.h5h=a<<16|65535&o,this.h5l=n<<16|65535&r,a=(C>>>16)+(th>>>16)+((o=(65535&C)+(65535&th)+((n=(K>>>16)+(ih>>>16)+((r=(65535&K)+(65535&ih))>>>16))>>>16))>>>16),this.h6h=a<<16|65535&o,this.h6l=n<<16|65535&r,a=(P>>>16)+(sh>>>16)+((o=(65535&P)+(65535&sh)+((n=(D>>>16)+(eh>>>16)+((r=(65535&D)+(65535&eh))>>>16))>>>16))>>>16),this.h7h=a<<16|65535&o,this.h7l=n<<16|65535&r},h.prototype.hex=function(){this.finalize();var h=this.h0h,t=this.h0l,i=this.h1h,s=this.h1l,e=this.h2h,r=this.h2l,n=this.h3h,o=this.h3l,a=this.h4h,f=this.h4l,c=this.h5h,u=this.h5l,y=this.h6h,p=this.h6l,d=this.h7h,b=this.h7l,w=this.bits,A=l[h>>28&15]+l[h>>24&15]+l[h>>20&15]+l[h>>16&15]+l[h>>12&15]+l[h>>8&15]+l[h>>4&15]+l[15&h]+l[t>>28&15]+l[t>>24&15]+l[t>>20&15]+l[t>>16&15]+l[t>>12&15]+l[t>>8&15]+l[t>>4&15]+l[15&t]+l[i>>28&15]+l[i>>24&15]+l[i>>20&15]+l[i>>16&15]+l[i>>12&15]+l[i>>8&15]+l[i>>4&15]+l[15&i]+l[s>>28&15]+l[s>>24&15]+l[s>>20&15]+l[s>>16&15]+l[s>>12&15]+l[s>>8&15]+l[s>>4&15]+l[15&s]+l[e>>28&15]+l[e>>24&15]+l[e>>20&15]+l[e>>16&15]+l[e>>12&15]+l[e>>8&15]+l[e>>4&15]+l[15&e]+l[r>>28&15]+l[r>>24&15]+l[r>>20&15]+l[r>>16&15]+l[r>>12&15]+l[r>>8&15]+l[r>>4&15]+l[15&r]+l[n>>28&15]+l[n>>24&15]+l[n>>20&15]+l[n>>16&15]+l[n>>12&15]+l[n>>8&15]+l[n>>4&15]+l[15&n];return w>=256&&(A+=l[o>>28&15]+l[o>>24&15]+l[o>>20&15]+l[o>>16&15]+l[o>>12&15]+l[o>>8&15]+l[o>>4&15]+l[15&o]),w>=384&&(A+=l[a>>28&15]+l[a>>24&15]+l[a>>20&15]+l[a>>16&15]+l[a>>12&15]+l[a>>8&15]+l[a>>4&15]+l[15&a]+l[f>>28&15]+l[f>>24&15]+l[f>>20&15]+l[f>>16&15]+l[f>>12&15]+l[f>>8&15]+l[f>>4&15]+l[15&f]+l[c>>28&15]+l[c>>24&15]+l[c>>20&15]+l[c>>16&15]+l[c>>12&15]+l[c>>8&15]+l[c>>4&15]+l[15&c]+l[u>>28&15]+l[u>>24&15]+l[u>>20&15]+l[u>>16&15]+l[u>>12&15]+l[u>>8&15]+l[u>>4&15]+l[15&u]),512==w&&(A+=l[y>>28&15]+l[y>>24&15]+l[y>>20&15]+l[y>>16&15]+l[y>>12&15]+l[y>>8&15]+l[y>>4&15]+l[15&y]+l[p>>28&15]+l[p>>24&15]+l[p>>20&15]+l[p>>16&15]+l[p>>12&15]+l[p>>8&15]+l[p>>4&15]+l[15&p]+l[d>>28&15]+l[d>>24&15]+l[d>>20&15]+l[d>>16&15]+l[d>>12&15]+l[d>>8&15]+l[d>>4&15]+l[15&d]+l[b>>28&15]+l[b>>24&15]+l[b>>20&15]+l[b>>16&15]+l[b>>12&15]+l[b>>8&15]+l[b>>4&15]+l[15&b]),A},h.prototype.toString=h.prototype.hex,h.prototype.digest=function(){this.finalize();var h=this.h0h,t=this.h0l,i=this.h1h,s=this.h1l,e=this.h2h,r=this.h2l,n=this.h3h,o=this.h3l,a=this.h4h,l=this.h4l,f=this.h5h,c=this.h5l,u=this.h6h,y=this.h6l,p=this.h7h,d=this.h7l,b=this.bits,w=[h>>24&255,h>>16&255,h>>8&255,255&h,t>>24&255,t>>16&255,t>>8&255,255&t,i>>24&255,i>>16&255,i>>8&255,255&i,s>>24&255,s>>16&255,s>>8&255,255&s,e>>24&255,e>>16&255,e>>8&255,255&e,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n];return b>=256&&w.push(o>>24&255,o>>16&255,o>>8&255,255&o),b>=384&&w.push(a>>24&255,a>>16&255,a>>8&255,255&a,l>>24&255,l>>16&255,l>>8&255,255&l,f>>24&255,f>>16&255,f>>8&255,255&f,c>>24&255,c>>16&255,c>>8&255,255&c),512==b&&w.push(u>>24&255,u>>16&255,u>>8&255,255&u,y>>24&255,y>>16&255,y>>8&255,255&y,p>>24&255,p>>16&255,p>>8&255,255&p,d>>24&255,d>>16&255,d>>8&255,255&d),w},h.prototype.array=h.prototype.digest,h.prototype.arrayBuffer=function(){this.finalize();var h=this.bits,t=new ArrayBuffer(h/8),i=new DataView(t);return i.setUint32(0,this.h0h),i.setUint32(4,this.h0l),i.setUint32(8,this.h1h),i.setUint32(12,this.h1l),i.setUint32(16,this.h2h),i.setUint32(20,this.h2l),i.setUint32(24,this.h3h),h>=256&&i.setUint32(28,this.h3l),h>=384&&(i.setUint32(32,this.h4h),i.setUint32(36,this.h4l),i.setUint32(40,this.h5h),i.setUint32(44,this.h5l)),512==h&&(i.setUint32(48,this.h6h),i.setUint32(52,this.h6l),i.setUint32(56,this.h7h),i.setUint32(60,this.h7l)),t},h.prototype.clone=function(){var t=new h(this.bits,!1);return this.copyTo(t),t},h.prototype.copyTo=function(h){var t=0,i=[\"h0h\",\"h0l\",\"h1h\",\"h1l\",\"h2h\",\"h2l\",\"h3h\",\"h3l\",\"h4h\",\"h4l\",\"h5h\",\"h5l\",\"h6h\",\"h6l\",\"h7h\",\"h7l\",\"start\",\"bytes\",\"hBytes\",\"finalized\",\"hashed\",\"lastByteIndex\"];for(t=0;t<i.length;++t)h[i[t]]=this[i[t]];for(t=0;t<this.blocks.length;++t)h.blocks[t]=this.blocks[t]},(t.prototype=new h).finalize=function(){if(h.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();h.call(this,this.bits,this.sharedMemory),this.update(this.oKeyPad),this.update(t),h.prototype.finalize.call(this)}},t.prototype.clone=function(){var h=new t([],this.bits,!1);this.copyTo(h),h.inner=this.inner;for(var i=0;i<this.oKeyPad.length;++i)h.oKeyPad[i]=this.oKeyPad[i];return h};var _=b(512);_.sha512=_,_.sha384=b(384),_.sha512_256=b(256),_.sha512_224=b(224),_.sha512.hmac=A(512),_.sha384.hmac=A(384),_.sha512_256.hmac=A(256),_.sha512_224.hmac=A(224),n?module.exports=_:(e.sha512=_.sha512,e.sha384=_.sha384,e.sha512_256=_.sha512_256,e.sha512_224=_.sha512_224,o&&define(function(){return _}))}();\n"

/***/ }),

/***/ "ee00":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CodeViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("078a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CodeViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CodeViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

/******/ });