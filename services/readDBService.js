const fs = require("fs").promises;
const path = require("path")

class ReadDBService{
    async getUsers(){
        const users = JSON.parse(await fs.readFile(path.join(__dirname, "..","db", "users.json")));
        return users;
    }
}

module.exports.ReadDBService = ReadDBService