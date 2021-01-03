const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users_controller");

// these are the routes of localhost:8000/users/action

router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

router.get("/sign-out", usersController.destroySession);

// use passport authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
