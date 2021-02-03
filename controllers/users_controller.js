const User = require("../models/user");
module.exports.forgotPassword = function (req, res) {
  return res.render("forgot_pass", {
    title: "Reset Pass In",
  });
};
module.exports.retrivePassword = async function (req, res) {
  const user = await User.findOne(
    { email: req.body.email },
    function (err, user) {
      if (err) {
        console.log("error in finding user in signing up");
        return res.send("error");
      }
      if (user) {
        if (req.body.ans === user.security)
          return res.send(`Your password is -${user.password}`);
      } else if (req.body.ans !== user.security) {
        return res.render("user_sign_up");
      }
      if (err) {
        return res.render("user_sign_in");
      }
    }
  );
};

//////
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

//sign up and rendering page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

//sign in function and rendering
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

// sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session and rendering
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
//Logout or destroy session function
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
//
