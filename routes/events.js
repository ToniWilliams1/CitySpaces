const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const eventsController = require("../controllers/events");


router.post("/createEvent", eventsController.createEvent);

module.exports = router;