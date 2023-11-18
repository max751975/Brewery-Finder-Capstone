const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    console.log(
      "autenthicateJWT::::::::::::::::::::::::::::::::::::::::::::::::::"
    );
    console.log(
      "autenthicateJWT REQ:::::::::::::::::::::",
      req.headers.authorization.split(" ")[1]
    );
    const token = req.headers.authorization.split(" ")[1];
    // console.log("req.body._token:::::::::::::::::::", req.body._token);
    console.log("req.headers.authorization.token:::::::::::::::::::", token);
    console.log("---------------------------------------------------------");
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    console.log("REQ.USER:::::::::::::::::::::::::::::::", req.user);
    console.log("---------------------------------------------------------");
    return next();
  } catch (error) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  console.log("---------------------------------------------------------");
  console.log("from auth/middleware ensureLoggedIn req.user::::", req.user);
  console.log("---------------------------------------------------------");
  if (!req.user) {
    const e = new ExpressError("Unauthorized", 401);
    return next(e);
  } else {
    return next();
  }
}

function ensureIsAdmin(req, res, next) {
  console.log("---------------------------------------------------------");
  console.log("from auth/middleware ensureIsAdmin req.user::::", req.user);
  console.log("---------------------------------------------------------");

  if (!req.user || !req.user.is_admin) {
    return next(new ExpressError("Must be admin to access", 401));
  }
  return next();
}

module.exports = { authenticateJWT, ensureLoggedIn, ensureIsAdmin };
