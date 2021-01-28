// script for starting react client,
// used to start server and client with one command using concurrently lib
const args = ["start"];
const opts = { stdio: "inherit", cwd: "client", shell: true };
require("child_process").spawn("npm", args, opts);
