import type { HeadersInit } from "bun";
import moment from "moment";

interface GitHubUser {
    login: string;
    name: string;
    bio: string | null;
    followers: number;
    following: number;
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

const updatedText = `# 👋 Hello there

\`\`\`ts
const omar = {
    education: "Computer Science @ Sacramento State",
    interests: [
        "Full-Stack Development",
        "Developer Tooling",
        "Cloud Infrastructure"
    ],
    technologies: [
        "TypeScript",
        "Python",
        "C#",
        "React",
        "Angular",
        "FastAPI",
        "ASP.NET Core",
        "AWS"
    ],
    github: {
        commits: {{ COMMITS }},
        pullRequests: {{ PULL_REQUESTS }},
        codeReviews: {{ CODE_REVIEWS }},
        starsEarned: {{ STARS }}
    },
};
\`\`\`

## 🌃 About Me

I'm a Computer Science student at Sacramento State with software engineering experience in financial services and local government. I enjoy building full-stack applications, experimenting with practical AI, and endlessly refining my development environment. Outside of work and school, I'm usually building a side project, configuring my shell, practicing LeetCode, or learning something new because it seems interesting.

## 📊 GitHub Stats

[![${userData.login}'s GitHub stats](./profile/github-stats.svg)](https://github.com/${userData.login})

Automatically updated on ${now} ${randomEmoji}
`;

await Bun.write(templateFile, updatedText);
