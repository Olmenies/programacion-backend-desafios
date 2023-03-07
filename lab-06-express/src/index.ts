// Imports
import express from "express";

// Constants
const PORT = 8080 || process.env.port;
const users = [
  { id: 1, name: "Paul", surname: "Atreides", genre: "M" },
  { id: 2, mame: "Jessica", surname: "Atreodes", genre: "F" },
  { id: 3, name: "Feid-Rautha", surname: "Harkonnen", genre: "M" },
  { id: 4, name: "Vladimir", surname: "Harkonnen", genre: "M" },
];

// Express server instanciation
const app = express();

// Express server definition
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Endpoints
app.get("/", (req, res) => {
  //res.status(200).json({ msg: "You made a GET to /" });
  res.status(200).json(users);
});

// Endpoint - Example req.params localhost:8080/params/1
app.get("/params/:userID", (req, res) => {
  const userID = req.params.userID;
  const user = users.find((el) => el.id.toString() === userID);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ msg: `No user found with id: ${userID}` });
  }
});

// Endpoint - Example req.query -> localhost:8080/query/?genre=M
app.get("/query/", (req, res) => {
  const genre = req.query.genre;
  if (!genre || (genre !== "M" && genre !== "F")) {
    res.status(200).json({ users });
  } else {
    console.log(genre);
    const filteredUsers = users.filter((el) => el.genre === genre);
    res.json({ genre: "M", filteredUsers: filteredUsers });
  }
});

app.get("/greet/:name/:surname", (req, res) => {
  res.status(200).json({
    msg: `Greetings (/greet/:name/:surname), ${req.params.name} ${req.params.surname}`,
  });
});
