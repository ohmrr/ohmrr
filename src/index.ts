import { writeFileSync } from 'fs';
import fetchData from './fetchData';
import * as path from 'path';

const readMe = path.join(__dirname, '..', 'README.md');

const updateFile = async () => {
  const data = await fetchData('https://api.github.com/users/Ohmrrr');

  writeFileSync(readMe, "testing");
}

updateFile();