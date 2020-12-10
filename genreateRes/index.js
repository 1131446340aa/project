#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var inquirer = require('inquirer');
var fs_1 = require("fs");
var axios_1 = require("axios");
// import path from 'path'
var chalk = require('chalk');
var cwd = process.cwd();
var url = 'http://apim.v2.intra.xiaojukeji.com/auth/v1/interfaces';
var question = [
    {
        name: 'projectId',
        type: 'input',
        message: "请输入项目id"
    },
    {
        name: 'collectionId',
        type: 'input',
        message: "请输入分类ID"
    },
    {
        name: 'cookie',
        type: 'input',
        message: "请输入cookie"
    }
];
var generateResponse = /** @class */ (function () {
    function generateResponse(_a) {
        var projectId = _a.projectId, collectionId = _a.collectionId, cookie = _a.cookie;
        this.projectId = projectId;
        this.collectionId = collectionId;
        this.cookie = cookie;
        this.init();
    }
    generateResponse.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allData, allInterface, resStr, _i, _a, item, res, result, name_1, fixedStr;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(url, {
                            params: {
                                projectId: this.projectId
                            },
                            headers: {
                                Accept: "application/json, text/javascript, */*; q=0.01",
                                "Accept-Encoding": "gzip, deflate",
                                "Accept-Language": "zh-CN,zh;q=0.9",
                                "Connection": "keep-alive",
                                Cookie: this.cookie,
                                Host: "apim.v2.intra.xiaojukeji.com",
                                Referer: "http://apim.v2.intra.xiaojukeji.com/",
                                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })];
                    case 1:
                        allData = _b.sent();
                        allInterface = allData.data;
                        if (allInterface.success) {
                            this.allInterface = allInterface.data.filter(function (item) { return item.collectionId === _this.collectionId; });
                        }
                        resStr = '';
                        _i = 0, _a = this.allInterface;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        return [4 /*yield*/, axios_1["default"].get(url, {
                                params: {
                                    interfaceId: item.id
                                },
                                headers: {
                                    Accept: "application/json, text/javascript, */*; q=0.01",
                                    "Accept-Encoding": "gzip, deflate",
                                    "Accept-Language": "zh-CN,zh;q=0.9",
                                    "Connection": "keep-alive",
                                    Cookie: this.cookie,
                                    Host: "apim.v2.intra.xiaojukeji.com",
                                    Referer: "http://apim.v2.intra.xiaojukeji.com/",
                                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            })];
                    case 3:
                        res = _b.sent();
                        result = res.data;
                        if (result.success) {
                            name_1 = item.method + item.path.replace(/\/(.)/g, function ($0, $1) {
                                return $1.toUpperCase();
                            });
                            fixedStr = result.data.resBody.replace(/\/\/(.*)/g, function ($0, $1) {
                                if ($1.includes("\"") || $1.includes("'")) {
                                    return '//' + $1;
                                }
                                else {
                                    return '';
                                }
                            }).replace(/\,\s*\n\s*([\]\}])/g, '\n$1') // 删除注释
                            ;
                            // console.log(fixedStr && JSON.parse(fixedStr));
                            resStr += object2Class(fixedStr && JSON.parse(fixedStr), name_1).code + '\n';
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        fs_1.writeFileSync(cwd + '/index1.ts', resStr);
                        return [2 /*return*/];
                }
            });
        });
    };
    return generateResponse;
}());
//对象转类型
function object2Class(object, modelName, deep) {
    if (deep === void 0) { deep = 0; }
    modelName = modelName.replace(/[\:\{\}]/g, "");
    modelName = firstUpperCase(modelName);
    var code = '';
    if (modelName) {
        //生成export 和注释
        code = " /*" + modelName + "*/\n  export interface " + modelName + " {\n    ";
    }
    var arrayDeep = '';
    var result = {
        code: '',
        modelName: ''
    };
    if (Array.isArray(object)) {
        //多维数组深度
        deep++;
        for (var i = 0; i < deep; i++) {
            //根据深度生成数组纬度
            arrayDeep += '[]';
        }
        if (object.length === 0) {
            //如果是空数组，生成any[]
            return {
                code: '',
                modelName: 'any' + arrayDeep
            };
        }
        else if (object.length > 0) {
            if (object[0] && typeof object[0] === 'object') {
                //如果数组里面每一项是对象
                var res = object2Class(object[0], modelName, deep);
                result.code = res.code;
                //区分是多维数组还是数组对象
                if (Array.isArray(object[0])) {
                    // 数组直接堆数组纬度
                    result.modelName = res.modelName;
                }
                else {
                    //对象生成新的接口同时要将类型改为接口名
                    result.modelName = "" + modelName + arrayDeep;
                }
                return result;
            }
            else {
                //如果数组里面每一项不是对象
                result.modelName = "" + typeof object[0] + arrayDeep;
                return result;
            }
        }
    }
    else {
        Object.keys(object).forEach(function (key) {
            if (object[key] && typeof object[key] === 'object') {
                //如果对象的属性是对象，递归
                var res = object2Class(object[key], modelName + key);
                code += key + ": " + res.modelName + ";\n    ";
                code = res.code + "\n        \n" + code;
            }
            else {
                //如果对象的属性非对象，判断是不是null 通过 ``对齐格式，代码略丑
                if (object[key] !== null) {
                    code += key + ": " + typeof object[key] + ";\n    ";
                }
                else {
                    code += key + ": null;\n    ";
                }
            }
        });
        result.code = code + "\n  }";
        result.modelName = modelName + arrayDeep;
    }
    return result;
}
//首字母大写
function firstUpperCase(props) {
    return props.replace(/^\S/, function (s) { return s.toUpperCase(); });
}
(function () {
    if (!fs_1.existsSync(cwd + '/interface.config.json')) {
        inquirer.prompt(question).then(function (answer) {
            fs_1.writeFileSync(cwd + '/interface.config.json', JSON.stringify(answer, null, 2));
        });
    }
    else {
        console.log(chalk.red(''));
        inquirer.prompt([{
                name: 'exist',
                type: 'input',
                message: "配置文件已经存在,是否重写 y/others"
            }]).then(function (res) {
            if (res.exist === 'y') {
                inquirer.prompt(question).then(function (answer) {
                    fs_1.writeFileSync(cwd + '/interface.config.json', JSON.stringify(answer, null, 2));
                });
            }
        });
    }
    new generateResponse(JSON.parse(String(fs_1.readFileSync(cwd + '/interface.config.json'))));
})();
