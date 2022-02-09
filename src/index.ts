import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';

const updateFile = async () => {
  const userData = (await axios.get('https://api.github.com/users/Ohmrrr'))
    .data;
  const readMe = path.join(__dirname, '..', 'README.md');

  const updatedText = `## Hi There 👋
  
  \`\`\`js
  const Ohmrrr = {
    name: 'Omar',
    bio: ${userData.bio},
    avatarURL: '${userData.avatar_url}',
    followers: ${userData.followers},
    following: ${userData.following},
  };
  \`\`\`
  `;

  fs.writeFileSync(readMe, updatedText);
};

updateFile();
