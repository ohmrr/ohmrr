import fetchData from "./fetchData";
import dedent from "dedent";
import moment from 'moment';
import * as path from "path";
import * as fs from "fs";

const readMe = path.join(__dirname, "..", "README.md");

const updateFile = async () => {
  const data = await fetchData("https://api.github.com/users/Ohmrrr");
  console.log(data);

  const text = dedent`## Hello There 👋
  
  \`\`\`js
  const Ohmrrr = {
    name: ${data.name},
    bio: ${data.bio},
    followers: ${data.followers},
    following: ${data.following},
    created: ${moment(data.created_at).format('MM/DD/YY')},
  };
  \`\`\``;

  fs.writeFileSync(readMe, text);
};

updateFile();