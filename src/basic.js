import path from "path";
import fs from "fs";
import { rename } from "fs/promises"; 

export const cat = (fileName, curDir) => {
	const readStream = fs.createReadStream(path.resolve(curDir, fileName));

	readStream.on('data', (chunk) => {
		process.stdout.write(chunk);
	});

	readStream.on('end', () => {
		console.log(`You are currently in ${curDir}`);
	});

	readStream.on('error', (err) => {
		console.error('Operation failed');
	});
};

export const add = async (newFile, curDir) => {
  try {
    fs.createWriteStream(path.resolve(curDir, newFile))
	} catch (err) {
    console.log(`Operation failed`);
	}
  console.log(`file ${newFile} created`);
  console.log(`You are currently in ${curDir}`);
};

export const rn = async (oldName, newName, curDir) => {
  await rename(path.resolve(curDir, oldName), path.resolve(curDir, newName)).catch(
    (err) => {
      console.log("Operation failed");
    }
  );
  console.log(`File ${oldName} renamed to ${newName}!`);
  console.log(`You are currently in ${curDir}`);
};

export const cp = async (pathSourceDir, pathNewDir, curDir) => {
  if (pathSourceDir === "") {
    console.log("Invalid input");
  }
  try {
    const sourceStream = fs.createReadStream(
      path.resolve(curDir, pathSourceDir)
    );
    const destinationStream = fs.createWriteStream(
      path.resolve(curDir, pathNewDir, path.basename(pathSourceDir))
    );
  
    sourceStream.pipe(destinationStream);
  
    destinationStream.on('finish', () => {
      console.log(`files copied`);
      console.log(`You are currently in ${curDir}`);
    });
  } catch {
    console.log("Operation Failed");
  }
};

export const rm = async (sourcePath, curDir) => {
  try {
    fs.promises.rm(path.resolve(curDir, sourcePath));
	} catch (err) {
    console.log('Operation failed');
    return false;
	}
  return true;
};

export const mv = async (pathSourceDir, pathNewDir, curDir) => {
  await cp(pathSourceDir, pathNewDir, curDir).then(
    rm(pathSourceDir, curDir)
  );
};


