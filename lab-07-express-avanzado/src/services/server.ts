// Imports
import express from "express";
import { User } from "../interfaces/userInterface";

// app definition
const app = express();

// Two magic lines
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vars
const users: User[] = [];

// Endpoints
// POST: Create
app.post("/api/user", (req, res) => {
  const user: User = req.body; // Why this isn't complaining despite not having an 'id' field?

  if (!user.name || !user.surname) {
    res.status(400).json({ status: "Error", msg: "Incomplete values" });
  }

  users.length === 0
    ? (user.id = 1)
    : (user.id = users[users.length - 1].id + 1);

  users.push(user);
  return res.status(201).json({ status: "Success", msg: "User created" });
});

// GET: Read
app.get("/api/user", (req, res) => {
  if (users.length === 0) {
    return res
      .status(404)
      .json({ status: "error", msg: "There aren't any users registered" });
  }
  return res.status(200).json({ status: "Success", msg: users });
});

// PUT: Update
app.put("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const changes = req.body;
  console.log(id);

  !id &&
    res.status(400).json({ status: "Error", msg: "Id provided is not valid" });

  const userIndex = users.findIndex((el) => el.id === id);
  const user = users[userIndex];

  if (userIndex === -1)
    return res
      .status(404)
      .json({ status: "Error", msg: "No user found with the provided id" });

  if (changes.id)
    return res
      .status(400)
      .json({ status: "Error", msg: "Cannot update User ID" });

  const updatedUser = { ...user, ...changes };

  //users[userIndex] = updatedUser;
  users.splice(userIndex, 1, updatedUser); // Better way to replace an element of an array
  return res.status(200).json({ status: "Success", msg: "User updated" });
});

// Delete
app.delete("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((el) => el.id === id);
  if (userIndex === -1)
    return res
      .status(404)
      .json({ status: "Error", msg: "No user found with the provided id" });
  users.splice(userIndex, 1);
  return res.status(200).json({ status: "Success", msg: "User deleted" });
});

export default app;
