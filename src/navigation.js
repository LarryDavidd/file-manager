import path from "path";
import fs from 'fs';

export const up = async (currDir) => {
  const newDir = path.resolve(currDir, "..");
  if (newDir === currDir) {
    return currDir;
  } else {
    return newDir;
  }
}

export const cd = async (dirName, workingDirectory) => {
	const curDir = path.resolve(workingDirectory, dirName);
  return await fs.promises
    .stat(curDir)
    .then(async (stat) => {
      if (stat.isDirectory()) {
        return curDir;
      }
    })
    .catch((err) => {
      console.log("Operation failed");
      return workingDirectory;
    });
};

export const ls = async (curDir) => {
	try {
    const table = [];
    const anime = await fs.promises.readdir(curDir, { withFileTypes: true });

		anime.forEach((element) => {
      table.push({ name: element.name, type: element.isDirectory() ? "directory" : "file"});
    });

		console.table(table);
		console.log(`You are currently in ${curDir}`);
	} catch (err) {
		console.log('Operation failed');
	}
}

