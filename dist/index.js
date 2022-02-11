"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fetchData_1 = __importDefault(require("./fetchData"));
const dedent_1 = __importDefault(require("dedent"));
const path = __importStar(require("path"));
const readMe = path.join(__dirname, "..", "README.md");
const updateFile = async () => {
    const data = await (0, fetchData_1.default)("https://api.github.com/users/Ohmrrr");
    const text = (0, dedent_1.default) `## Hello There 👋
  
  \`\`\`js
  const Ohmrrr = {
    name: 'Omar',
    bio: ${data.bio},

  };\`\`\``;
    const text2 = `## Hello There 👋
  
  \`\`\`js
  const Ohmrrr = {
    name: 'Omar',
    bio: ${data.bio},

  };\`\`\``;
    console.log(text);
    console.log('\n\n');
    console.log(text2);
    (0, fs_1.writeFileSync)(readMe, text);
};
updateFile();
