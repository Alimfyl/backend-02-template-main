const fs = require("fs");
const path = require("path");

const getUsers = (callback) => {
    const usersPath = path.join(__dirname, "..", "data", "users.json");

    fs.readFile(usersPath, "utf8", callback);
};

module.exports = {
    getUsers,
};