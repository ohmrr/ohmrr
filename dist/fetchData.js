"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fetchData = async (url) => {
    const result = (await axios_1.default.get(url)).data;
    return result;
};
exports.default = fetchData;
