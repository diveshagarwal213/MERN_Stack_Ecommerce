const fs = require('fs');

const StringToArray = (string) => {
    if (typeof string !== "string") return [];
    return string = string.trim().split(" ").filter( e => e);
}

const unlinkImage = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
        }
        //file removed if saved
    });
}

module.exports = {StringToArray, unlinkImage}