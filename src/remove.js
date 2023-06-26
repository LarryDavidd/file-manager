import path from "path";
import fs from "fs";

export const rm = async (sourcePath, curDir) => {
  try {
    fs.promises.rm(path.resolve(curDir, sourcePath));
	} catch (err) {
    console.log('Operation failed');
    return false;
	}
  return true;
};