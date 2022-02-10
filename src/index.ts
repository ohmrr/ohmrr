import * as path from 'path';
import * as fs from 'fs';
import fetchUserData from './fetchUserData';

async function main() {
  const data = await fetchUserData();

  console.log(data);
}

main();