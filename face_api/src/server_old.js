import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "admin",
    password: "Test1234",
    database: "face-recognition",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log("users data:", data);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const users = await db("users").select("*");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json("Error fetching users");
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [loginData] = await db("login").select("*").where({ email });

    if (!loginData) {
      return res.status(400).json("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, loginData.hash);

    if (!isValidPassword) {
      return res.status(400).json("Invalid email or password");
    }

    const [user] = await db("users").select("*").where({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    res.json(user);
  } catch (err) {
    console.error("Error during sign-in:", err);
    res.status(500).json("Error signing in");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.transaction(async (trx) => {
      const [loginEmail] = await trx("login")
        .insert({
          hash: hashedPassword,
          email,
        })
        .returning("email");

      // console.log("Inserted login email:", loginEmail.email);

      const [insertedUser] = await trx("users").returning("*").insert({
        email: loginEmail.email,
        name,
        joined: new Date(),
      });

      // console.log("Inserted user:", insertedUser);

      return insertedUser;
    });

    res.json(newUser);
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json("Error registering user");
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await db("users").select("*").where({ id });

    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json("Error fetching user");
  }
});

app.put("/image", async (req, res) => {
  const { id } = req.body;

  try {
    const [updatedUser] = await db("users")
      .where({ id })
      .increment("entries", 1)
      .returning("entries");

    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    console.log("Updated entries for user:", updatedUser);

    res.json(updatedUser.entries);
  } catch (err) {
    console.error("Error updating entries:", err);
    res.status(500).json("Error updating entries");
  }
});

// Add this Error Handling Middleware AFTER all POST GET routes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Bad JSON formatting" });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
