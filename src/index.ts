import fetchData from './fetchData';
import dedent from 'dedent';
import moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';

const readMe = path.join(__dirname, '..', 'README.md');

const updateFile = async () => {
  const data = await fetchData('https://api.github.com/users/Ohmrrr');

  const text = dedent`## Hello There 👋, I'm Ohmrrr

  I'm slightly new to GitHub but I'm on here to improve my skills and share my work.
  I primarily use JavaScript and TypeScript, but I'm still learning. So far, I've worked on:

  - [eTOA-001](https://github.com/Ohmrrr/etoa) - a Discord bot made with Discord.js v13. 
  
  [![eTOA](https://github-readme-stats.vercel.app/api/pin/?username=Ohmrrr&repo=etoa&show_owner=true&theme=dark)](https://github.com/anuraghazra/github-readme-stats)

  Hopefully there'll be more in the future.

  ## My Stats

  [![My Stats](https://github-readme-stats.vercel.app/api?username=Ohmrrr&layout=compact&theme=dark)](https://github.com/anuraghazra/github-readme-stats)
  
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
