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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\nconst ThemeProvider = ({ children })=>{\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('light');\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            const savedTheme = localStorage.getItem('theme');\n            if (savedTheme) {\n                setTheme(savedTheme);\n            } else {\n                setTheme('light');\n            }\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    const toggleTheme = ()=>{\n        const newTheme = theme === 'light' ? 'dark' : 'light';\n        setTheme(newTheme);\n        localStorage.setItem('theme', newTheme);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            theme,\n            toggleTheme\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: theme === 'dark' ? 'dark' : 'light',\n            children: children\n        }, void 0, false, {\n            fileName: \"/workspaces/mainWeb2/components/themeContext.js\",\n            lineNumber: 27,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/workspaces/mainWeb2/components/themeContext.js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3RoZW1lQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThFO0FBRTlFLE1BQU1LLDZCQUFlSixvREFBYUE7QUFFM0IsTUFBTUssV0FBVyxJQUFNSixpREFBVUEsQ0FBQ0csY0FBYztBQUVoRCxNQUFNRSxnQkFBZ0IsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDeEMsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdQLCtDQUFRQSxDQUFDO0lBRW5DQyxnREFBU0E7bUNBQUM7WUFDUixNQUFNTyxhQUFhQyxhQUFhQyxPQUFPLENBQUM7WUFDeEMsSUFBSUYsWUFBWTtnQkFDZEQsU0FBU0M7WUFDWCxPQUFPO2dCQUNMRCxTQUFTO1lBQ1g7UUFDRjtrQ0FBRyxFQUFFO0lBRUwsTUFBTUksY0FBYztRQUNsQixNQUFNQyxXQUFXTixVQUFVLFVBQVUsU0FBUztRQUM5Q0MsU0FBU0s7UUFDVEgsYUFBYUksT0FBTyxDQUFDLFNBQVNEO0lBQ2hDO0lBRUEscUJBQ0UsOERBQUNWLGFBQWFZLFFBQVE7UUFBQ0MsT0FBTztZQUFFVDtZQUFPSztRQUFZO2tCQUNqRCw0RUFBQ0s7WUFBSUMsV0FBV1gsVUFBVSxTQUFTLFNBQVM7c0JBQ3pDRDs7Ozs7Ozs7Ozs7QUFJVCxFQUFFIiwic291cmNlcyI6WyIvd29ya3NwYWNlcy9tYWluV2ViMi9jb21wb25lbnRzL3RoZW1lQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgVGhlbWVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG5leHBvcnQgY29uc3QgdXNlVGhlbWUgPSAoKSA9PiB1c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XG5cbmV4cG9ydCBjb25zdCBUaGVtZVByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbdGhlbWUsIHNldFRoZW1lXSA9IHVzZVN0YXRlKCdsaWdodCcpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWRUaGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpO1xuICAgIGlmIChzYXZlZFRoZW1lKSB7XG4gICAgICBzZXRUaGVtZShzYXZlZFRoZW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGhlbWUoJ2xpZ2h0Jyk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgdG9nZ2xlVGhlbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3VGhlbWUgPSB0aGVtZSA9PT0gJ2xpZ2h0JyA/ICdkYXJrJyA6ICdsaWdodCc7XG4gICAgc2V0VGhlbWUobmV3VGhlbWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsIG5ld1RoZW1lKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxUaGVtZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdGhlbWUsIHRvZ2dsZVRoZW1lIH19PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoZW1lID09PSAnZGFyaycgPyAnZGFyaycgOiAnbGlnaHQnfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9UaGVtZUNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlRoZW1lQ29udGV4dCIsInVzZVRoZW1lIiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwidGhlbWUiLCJzZXRUaGVtZSIsInNhdmVkVGhlbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidG9nZ2xlVGhlbWUiLCJuZXdUaGVtZSIsInNldEl0ZW0iLCJQcm92aWRlciIsInZhbHVlIiwiZGl2IiwiY2xhc3NOYW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/themeContext.js\n");

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