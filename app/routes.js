const { reduce, repeat } = require("lodash");

module.exports = function (app, passport, db) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/", isLoggedIn, function (req, res) {
    res.render("index.ejs");
  });

  // PROFILE SECTION =========================
  // app.get("/", isLoggedIn, function (req, res) {
  //   db.collection("messages")
  //     .find()
  //     .toArray((err, result) => {
  //       console.log(result);
  //       if (err) return console.log(err);
  //       res.render("index.ejs", {
         
  //         messages: result,
  //       });
  //     });
  // });

    // PROFILE SECTION =========================
    app.get("/getMessages", isLoggedIn, function (req, res) {
      db.collection("messages")
        .find()
        .toArray((err, result) => {
          if (err) return console.log(err);
          // send to main js all the messages as result
          res.send(result)
        });
    });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // message board routes ===============================================================


  app.post("/messages", (req, res) => {
   console.log("req",req)
   if (req.body.comments && req.body.selection){
    db.collection("messages").save(
      { comments: req.body.comments, selection: req.body.selection },
      (err, result) => {
        if (err) return console.log(err);
        // res.send("sendToDataBase");
        console.log("saved to database");
        //  res.redirect("/")
        res.sendStatus(200)
      }
      
    );

   }
    
  });

  app.put("/messages", (req, res) => {
    db.collection("messages").findOneAndUpdate(
      { name: req.body.name, msg: req.body.msg },
      {
        $set: {
          thumbUp: req.body.thumbUp + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      },
      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      }
    );
  });

  app.delete("/messages", (req, res) => {
    db.collection("messages").findOneAndDelete(
      { name: req.body.name, msg: req.body.msg },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Message deleted!");
      }
    );
  });
  // =============================================================================
  // GET STATE PARK DATA ==================================================
  // =============================================================================
  // app.get("/pennsylvania-playGrounds", isLoggedIn, function (req, res) {
  //   db.collection("pennsylvaniaParkData")
  //     .find()
  //     .toArray((err, result) => {
  //       console.log(result);
  //       if (err) return console.log(err);
  //       res.render("park.ejs", { parkData: result });
  //     });
  // });

  // app.get("/massachusetts-park-data", isLoggedIn, function (req, res) {
  //   db.collection("massachusettsParkData")
  //     .find()
  //     .toArray((err, result) => {
  //       console.log(result);
  //       if (err) return console.log(err);
  //       res.render("park.ejs", { parkData: result })
  //     });
  // });
  // app.get("/california-park-data", isLoggedIn, function (req, res) {
  //   db.collection("californiaParkData")
  //     .find()
  //     .toArray((err, result) => {
  //       console.log(result);
  //       if (err) return console.log(err);
  //       res.render("park.ejs", { parkData: result })
  //     });
  // });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}
