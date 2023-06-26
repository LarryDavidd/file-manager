import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import stream from 'stream';

export const compress = async (curFile, newFile, curDir) => {
  stream.pipeline(
    fs.createReadStream(path.resolve(curDir, curFile)), 
    zlib.createBrotliCompress(), 
    fs.createWriteStream(path.resolve(curDir, newFile, path.basename(curFile) + '.br')),
    () => console.log('file compressed')
  );
};