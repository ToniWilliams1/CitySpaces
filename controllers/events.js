const fetch = require('node-fetch');
const Event = require("../models/Event");

  module.exports = {
    getEvents: async (req, res) => {
        const results = await fetch('https://data.cityofnewyork.us/resource/bquu-z2ht.json');
       const data = await results.json();
        console.log(data);
        res.render("../views/events.ejs", {arrayOfData: data})
      },

      likeEvent: async (req, res) => {
        try {
          await watching.push(data);
          console.log("watching");
          res.redirect("/profile");
        } catch (err) {
          console.log(err);
        }
      },
  }
  
