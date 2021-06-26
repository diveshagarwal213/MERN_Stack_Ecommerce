const StringToArray = (string) => {
    if (typeof string !== "string") return [];
    return string = string.trim().split(" ").filter( e => e);
}

module.exports = {StringToArray}