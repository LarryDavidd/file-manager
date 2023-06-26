import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import stream from 'stream';

export const compress = async (curFile, newFile, curDir) => {
  stream.pipeline(
    fs.createWriteStream(path.resolve(curDir, newFile, path.basename(curFile) + '.br')),
    zlib.createBrotliDecompress(), 
    fs.createReadStream(path.resolve(curDir, curFile)), 
    () => console.log('file decompressed')
  );
};