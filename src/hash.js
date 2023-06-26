import { readFile } from "fs";
import crypto from "crypto";

export const hash = async (path) => {
  readFile(path, (err, file) => {
    if (err) {
      console.log("Operation failed");
    }
    console.log(crypto.createHash("sha256").update(file).digest("hex"));
  });
};