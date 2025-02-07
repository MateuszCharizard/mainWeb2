/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/themeContext.js":
/*!************************************!*\
  !*** ./components/themeContext.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst themes = {\n    light: {\n        background: \"#ffffff\",\n        text: \"#000000\",\n        primary: \"#2563EB\"\n    },\n    dark: {\n        background: \"#000000\",\n        text: \"#ffffff\",\n        primary: \"#2563EB\"\n    }\n};\nconst ThemeProvider = ({ children })=>{\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"light\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            const savedTheme = localStorage.getItem(\"theme\");\n            if (savedTheme) {\n                setTheme(savedTheme);\n            }\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            localStorage.setItem(\"theme\", theme);\n        }\n    }[\"ThemeProvider.useEffect\"], [\n        theme\n    ]);\n    const toggleTheme = ()=>{\n        setTheme((prevTheme)=>prevTheme === \"light\" ? \"dark\" : \"light\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            theme,\n            colors: themes[theme],\n            toggleTheme\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/workspaces/mainWeb2/components/themeContext.js\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, undefined);\n};\nconst useTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3RoZW1lQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThFO0FBRTlFLE1BQU1LLDZCQUFlSixvREFBYUE7QUFFbEMsTUFBTUssU0FBUztJQUNiQyxPQUFPO1FBQ0xDLFlBQVk7UUFDWkMsTUFBTTtRQUNOQyxTQUFTO0lBQ1g7SUFDQUMsTUFBTTtRQUNKSCxZQUFZO1FBQ1pDLE1BQU07UUFDTkMsU0FBUztJQUNYO0FBQ0Y7QUFFTyxNQUFNRSxnQkFBZ0IsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDeEMsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdaLCtDQUFRQSxDQUFDO0lBRW5DQyxnREFBU0E7bUNBQUM7WUFDUixNQUFNWSxhQUFhQyxhQUFhQyxPQUFPLENBQUM7WUFDeEMsSUFBSUYsWUFBWTtnQkFDZEQsU0FBU0M7WUFDWDtRQUNGO2tDQUFHLEVBQUU7SUFFTFosZ0RBQVNBO21DQUFDO1lBQ1JhLGFBQWFFLE9BQU8sQ0FBQyxTQUFTTDtRQUNoQztrQ0FBRztRQUFDQTtLQUFNO0lBRVYsTUFBTU0sY0FBYztRQUNsQkwsU0FBUyxDQUFDTSxZQUFlQSxjQUFjLFVBQVUsU0FBUztJQUM1RDtJQUVBLHFCQUNFLDhEQUFDaEIsYUFBYWlCLFFBQVE7UUFBQ0MsT0FBTztZQUFFVDtZQUFPVSxRQUFRbEIsTUFBTSxDQUFDUSxNQUFNO1lBQUVNO1FBQVk7a0JBQ3ZFUDs7Ozs7O0FBR1AsRUFBRTtBQUVLLE1BQU1ZLFdBQVcsSUFBTXZCLGlEQUFVQSxDQUFDRyxjQUFjIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9tYWluV2ViMi9jb21wb25lbnRzL3RoZW1lQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUaGVtZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmNvbnN0IHRoZW1lcyA9IHtcbiAgbGlnaHQ6IHtcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZmZmZcIixcbiAgICB0ZXh0OiBcIiMwMDAwMDBcIixcbiAgICBwcmltYXJ5OiBcIiMyNTYzRUJcIixcbiAgfSxcbiAgZGFyazoge1xuICAgIGJhY2tncm91bmQ6IFwiIzAwMDAwMFwiLFxuICAgIHRleHQ6IFwiI2ZmZmZmZlwiLFxuICAgIHByaW1hcnk6IFwiIzI1NjNFQlwiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IFRoZW1lUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gdXNlU3RhdGUoXCJsaWdodFwiKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkVGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRoZW1lXCIpO1xuICAgIGlmIChzYXZlZFRoZW1lKSB7XG4gICAgICBzZXRUaGVtZShzYXZlZFRoZW1lKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGhlbWVcIiwgdGhlbWUpO1xuICB9LCBbdGhlbWVdKTtcblxuICBjb25zdCB0b2dnbGVUaGVtZSA9ICgpID0+IHtcbiAgICBzZXRUaGVtZSgocHJldlRoZW1lKSA9PiAocHJldlRoZW1lID09PSBcImxpZ2h0XCIgPyBcImRhcmtcIiA6IFwibGlnaHRcIikpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFRoZW1lQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB0aGVtZSwgY29sb3JzOiB0aGVtZXNbdGhlbWVdLCB0b2dnbGVUaGVtZSB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VUaGVtZSA9ICgpID0+IHVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJUaGVtZUNvbnRleHQiLCJ0aGVtZXMiLCJsaWdodCIsImJhY2tncm91bmQiLCJ0ZXh0IiwicHJpbWFyeSIsImRhcmsiLCJUaGVtZVByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ0aGVtZSIsInNldFRoZW1lIiwic2F2ZWRUaGVtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwidG9nZ2xlVGhlbWUiLCJwcmV2VGhlbWUiLCJQcm92aWRlciIsInZhbHVlIiwiY29sb3JzIiwidXNlVGhlbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/themeContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_themeContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/themeContext */ \"./components/themeContext.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);\nreact_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n // Adjust this path as needed\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_themeContext__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/workspaces/mainWeb2/pages/_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.Toaster, {}, void 0, false, {\n                fileName: \"/workspaces/mainWeb2/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this),\n            \" \"\n        ]\n    }, void 0, true, {\n        fileName: \"/workspaces/mainWeb2/pages/_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTJELENBQUMsNkJBQTZCO0FBQzFEO0FBQ1c7QUFFMUMsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNyQyxxQkFDRSw4REFBQ0osbUVBQWFBOzswQkFDWiw4REFBQ0c7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7OzBCQUN4Qiw4REFBQ0gsb0RBQU9BOzs7OztZQUFHOzs7Ozs7O0FBR2pCO0FBRUEsaUVBQWVDLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIi93b3Jrc3BhY2VzL21haW5XZWIyL3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvdGhlbWVDb250ZXh0JzsgLy8gQWRqdXN0IHRoaXMgcGF0aCBhcyBuZWVkZWRcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tICdyZWFjdC1ob3QtdG9hc3QnO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDxUb2FzdGVyIC8+IHsvKiBBZGQgdGhpcyBoZXJlIHRvIG1ha2Ugc3VyZSB0b2FzdHMgYXJlIHJlbmRlcmVkIGdsb2JhbGx5ICovfVxuICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiVGhlbWVQcm92aWRlciIsIlRvYXN0ZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();