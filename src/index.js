const moment = require("moment");
const dedent = require("dedent");
const path = require("path");
const fs = require("fs");

const template = path.join(__dirname, "..", "TEMPLATE.md");
const date = moment(new Date()).format("MMMM Do, YYYY");
const emojis = ["🙌", "😎", "💯", "👽", "🔮", "🤙", "‼️", "✅"];

const updateFile = async (user) => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const userData = await fetch(`https://api.github.com/users/${user}`).then(
    (res) => res.json()
  );

  const updatedText = dedent`# Hello There 👋, I'm ${userData.name}

    \`\`\`js
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
      location: "${userData.location === null ? "" : userData.location}",
      created: "${moment(userData.created_at).format("MMMM Do, YYYY")}"
    }
    \`\`\`
    
    <br />

    ## 📚 About Me

    Currently I'm a high school student just programming for fun. I primarily work on Web Development with JavaScript, TypeScript, and Svelte. More recently, I've been learning Python and Java.
    I hope to post more projects onto GitHub, but until then here are some that I've worked on:

    <br />

    - [csfhs](https://github.com/estebangarcia21/csfhs) - My school's computer science pathway website, made with TypeScript, Svelte, and Tailwind CSS.

    [![csfhs](https://github-readme-stats.vercel.app/api/pin/?username=estebangarcia21&repo=csfhs&show_owner=false&theme=dark)](https://github.com/estebangarcia21/csfhs)

    <br />

    - [dotfiles](https://github.com/${userData.login}/dotfiles) - My shell configuration files for zsh, nvim, git, and more.

    [![dotfiles](https://github-readme-stats.vercel.app/api/pin/?username=${userData.login}&repo=dotfiles&show_owner=true&theme=dark)](https://github.com/${userData.login}/dotfiles)

    <br />

    ## 📊 Stats

    [![${userData.login}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${userData.login}&show_icons=true&theme=dark)](

    <br />
    <br />
    
    Last updated on ${date} ${randomEmoji}`;

  fs.writeFileSync(template, updatedText);
};

updateFile("ohmrr");
