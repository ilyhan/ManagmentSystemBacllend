const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

const dirs = ["controller", "query", "routes", "services", "middlewares"];
const files = ["config.js", "db.js"];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const dir of dirs) {
    fs.cpSync(path.join(root, dir), path.join(dist, dir), { recursive: true });
}

for (const file of files) {
    fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

fs.copyFileSync(path.join(root, "server.js"), path.join(dist, "main.js"));
