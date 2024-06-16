
const fs = require('fs');
const path = require('path');

const getPathFromPath = (path) => {
    return path.replaceAll("\\", "/")
}

const getNewPathAndRemoveOld = (oldPath, pathWithDoubleSlash) => {
    const filePath = path.join(__dirname, oldPath);
    fs.unlink(oldPath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
          return getPathFromPath(pathWithDoubleSlash)
        } else {
          console.log(`File deleted: ${filePath}`);
          return getPathFromPath(pathWithDoubleSlash)
        }
      });
}

module.exports = {getPathFromPath, getNewPathAndRemoveOld}

