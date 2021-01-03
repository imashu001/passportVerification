const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
console.log("router loaded");
router.get("/", homeController.home);

// refer to users.js for routes like localhost:8000/users/action
router.use("/users", require("./users"));

module.exports = router;
