const app = require("./app.js");
const config = require("./app/config/index.js");
const MongoDB = require("./app/Utils/mongodb.util.js");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();
