//Imports
import http from "http";

// Constants
const PORT = 8080 || process.env.port;

// Server definition
const server = http.createServer((req, res) => {
  res.end("Server says hello to you, Leo Mattioli lover");
});

server.listen(PORT, () => {
  console.log("Listening on port 8080");
});
