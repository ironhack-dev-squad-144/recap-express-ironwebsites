const express = require("express");
const router = express.Router();
const Website = require("../models/Website");

router.get("/", (req, res, next) => {
  Website.find()
    .sort({ nbOfVotes: -1 })
    .then(websites => {
      res.render("websites", {
        websites: websites
      });
    });
});

// Route to display a form
router.get("/add-website", (req, res, next) => {
  res.render("add-website");
});

// Route to handle the form
router.post("/add-website", (req, res, next) => {
  Website.create({
    name: req.body.name,
    url: req.body.url
  }).then(website => {
    // Redirect to the detail page of the item
    res.redirect("/");
  });
});

// Route to vote for a website
router.get("/vote/:websiteId", (req, res, next) => {
  Website.findByIdAndUpdate(req.params.websiteId, {
    $inc: { nbOfVotes: 1 }
  }).then(website => {
    res.redirect("/");
  });
});

// Route to remove a website
router.get("/remove-website/:websiteId", (req, res, next) => {
  Website.findByIdAndRemove(req.params.websiteId).then(website => {
    res.redirect("/");
  });
});

// Route to display the edit form
router.get("/edit-website/:websiteId", (req, res, next) => {
  Website.findById(req.params.websiteId)
    .then(website => {
      res.render("edit-website", { 
        website: website
      });
    })
});

// Route to handle the edit form
router.post("/edit-website/:websiteId", (req, res, next) => {
  Website.findByIdAndUpdate(req.params.websiteId, {
    name: req.body.name,
    url: req.body.url,
  })
    .then(website => {
      // Redirect to the detail page of the item
      res.redirect("/");
    });
});


module.exports = router;
