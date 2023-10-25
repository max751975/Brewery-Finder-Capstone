const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  res.send("AUTH IS CONNECTED!!!");
});

// sign in new user with password hashing
router.post("/register", async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      location,
      isAdmin,
    } = req.body;

    if (!username || !password) {
      return next(new ExpressError("Username and password required", 400));
    }
    //  hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    // save to db
    const results = await db.query(
      `
    INSERT INTO users (username, password, first_name, last_name, email, location, is_admin)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id, username, password, is_admin`,
      [username, hashedPassword, firstName, lastName, email, location, isAdmin]
    );
    return res.json(results.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return next(new ExpressError("Username taken. Try another one!", 400));
    }
  }
});

// login user and returns JWT on success
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username/password required", 400);
    }
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    let user = result.rows[0];

    if (user) {
      if ((await bcrypt.compare(password, user.password)) === true) {
        let token = jwt.sign(user, SECRET_KEY);

        return res.json({ message: "Logged in successfully", token });
      }
    }
    throw new ExpressError("Invalid username/password", 400);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
