import fetchData from "./fetchData";
import dedent from "dedent";
import * as path from "path";
import * as fs from "fs";

const readMe = path.join(__dirname, "..", "README.md");

const updateFile = async () => {
  const data = await fetchData("https://api.github.com/users/Ohmrrr");

  const text = dedent`## Hello There 👋
  
  \`\`\`js
  const Ohmrrr = {
    name: 'Omar',
    bio: ${data.bio},
    

  };\`\`\``;

  fs.writeFileSync(readMe, text);
};

updateFile();