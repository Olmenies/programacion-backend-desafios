// Imports
import fs from "fs";
import crypto, { Hmac } from "crypto";
import path from "path";

// User interface
interface User {
  name: string;
  surname: string;
  username: string;
  pass: string | Hmac;
  salt?: string;
}

// Class
class UserManager {
  private dataPath: string;

  constructor() {
    this.dataPath = path.resolve(__dirname, "../data/Users.json");
  }

  public async queryUsers() {
    if (fs.existsSync(this.dataPath)) {
      const rawData = await fs.promises.readFile(this.dataPath, "utf-8");
      const users: User[] = JSON.parse(rawData);
      return users;
    } else {
      return [];
    }
  }

  public async createUser(user: User) {
    const users: User[] = await this.queryUsers();

    //Password hashing
    user.salt = crypto.randomBytes(128).toString("base64");

    if (typeof user.pass === "string") {
      user.pass = crypto.createHmac("sha256", user.salt).update(user.pass);
    } else {
      throw new Error(
        "Something went wrong while hashing the password on queryUsers()"
      );
    }

    users.push(user);
    console.log(users);

    await fs.promises.writeFile(
      this.dataPath,
      JSON.stringify(users, null, "\t")
    );
    return user;
  }
}

const env = async () => {
  const myUserManager = new UserManager();
  await myUserManager.createUser({
    name: "Leo",
    surname: "Mattioli",
    username: "LeonSantafecino",
    pass: "VivaLaCumbia",
  });
  console.log(await myUserManager.queryUsers);
};

env();
