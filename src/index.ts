import type { HeadersInit } from "bun";
import moment from "moment";

interface GitHubUser {
  login: string;
  name: string;
  location: string | null;
  bio: string | null;
  followers: number;
  following: number;
  created_at: string;
}

const fetchGitHubUser = async (username: string) => {
  const token = process.env.USER_TOKEN || null;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "GitHub-Profile-Updater",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Unable to fetch GitHub user information.");
  }

  const userData = (await response.json()) as GitHubUser;
  return userData;
};

const username = "ohmrr";
const now = moment(new Date()).format("MMMM Do, YYYY");
const userData = await fetchGitHubUser(username);
const templateFile = Bun.file("TEMPLATE.md");

const emojis = ["🚀", "✨", "💯", "🔥", "🤖", "🪄"];
const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

const updatedText = `# Hi, I'm ${userData.name}

\`\`\`ts
const ${userData.login} = {
  name: "${userData.name}",
  bio: "${userData.bio === null ? "" : userData.bio}",
  repositories: {
    owned: {{ REPOSITORIES }},
    contributedTo: {{ REPOSITORIES_CONTRIBUTED_TO }}
  },
  pullRequests: {{ PULL_REQUESTS }},
  codeReviews: {{ CODE_REVIEWS }},
  totalCommits: {{ COMMITS }},
  stars: {{ STARS }},
  followers: ${userData.followers},
  following: ${userData.following},
  location: ${userData.location ? `"${userData.location}"` : null},
  created: "${moment(userData.created_at).format("MMMM Do, YYYY")}"
}
\`\`\`

## 🌃 About Me

I'm currently a second year Computer Science major. I have experience working with TypeScript, JavaScript, C++, Java, SvelteKit, TailwindCSS, MongoDB, PrismaORM. While I mostly specialize in Web Development, I'm always working on learning more languages and frameworks.

## 💻 Projects

### 🤝 Fund Tawheed

Made in collaboration with Masjid Al-Tawheed in order to help raise funds for a construction project. The website is made with **TypeScript, SvelteKit, and TailwindCSS**. 

[![fund-tawheed](https://github-readme-stats.vercel.app/api/pin/?username=${userData.login}&repo=tawheed-website&show_owner=false&theme=dark)](https://github.com/${userData.login}/tawheed-website)

### 👽 Quabos

A Discord.js v14 bot that uses **TypeScript, MongoDB, and PrismaORM** for type safety and scalability. The bot uses messages previously sent in a server to generate new ones using a Markov chaining algorithm. Currently running 24/7 while entirely self hosted on a computer running Ubuntu server.

[![quabos](https://github-readme-stats.vercel.app/api/pin/?username=${userData.login}&repo=quabos-discord&show_owner=false&theme=dark)](https://github.com/${userData.login}/quabos-discord)

### 🏫 CSFHS

A website I worked on in collaboration with the STEAM Computer Science pathway for my high school. The website aims to get more students interested in Computer Science as an educational and career path. Created with **TypeScript, SvelteKit, and TailwindCSS**.

[![csfhs](https://github-readme-stats.vercel.app/api/pin/?username=nurikimchi&repo=csfhs&show_owner=false&theme=dark)](https://github.com/nurikimchi/csfhs)

## 📊 GitHub Stats

[![${userData.login}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${userData.login}&show_icons=true&theme=dark)](https://github.com/${userData.login})

<br />
<br />

Automatically updated on ${now} ${randomEmoji}
`;

await Bun.write(templateFile, updatedText);
