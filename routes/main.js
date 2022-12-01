const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const eventsController = require("../controllers/events");
const todosController = require("../controllers/todos");
const aboutController = require("../controllers/about");


//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/todos", todosController.getTodos);
router.get("/events", eventsController.getEvents);
router.get("/about", aboutController.getAbout);
router.get("/like-event/:id", eventsController.likeEvent);




module.exports = router;
