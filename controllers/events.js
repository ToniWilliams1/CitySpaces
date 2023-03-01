const fetch = require('node-fetch');
const Event = require("../models/Event");
const User = require("../models/User");


  module.exports = {
    getEvents: async (req, res) => {
        const results = await fetch('https://data.cityofnewyork.us/resource/bquu-z2ht.json');
       const data = await results.json();
      //  const { selectedRecurrenceType } = req.query;

      // //  let filteredData;

      // //  if (borough) {
      // //    filteredData = data.filter(event=> event.borough === borough);
      // //  } else {
      // //    filteredData = data;
      // //  }
      // const selectedRecurrenceType = req.query.recurrenceType;
      
      // // Filter the events data by selected borough (or show all events if no borough is selected)
      // const filteredData = selectedRecurrenceType ? data.filter(event => event.recurrence_type === selectedRecurrenceType) : data;
      // console.log(selectedRecurrenceType)
      //           res.render('events', { events: filteredData, selectedRecurrenceType });
      
// If selectedRecurrenceType is provided, filter the data by recurrence type
// if (selectedRecurrenceType) {

//   data = data.filter(event => event.recurrence_type === selectedRecurrenceType);
//         console.log(selectedRecurrenceType)
const { recurrence_type = [], borough = [] } = req.query;
// const filteredData = recurrence_type ? data.filter(event => event.recurrence_type === recurrence_type) : data;
const filteredData = data.filter(event => (
  recurrence_type.length === 0 || recurrence_type.includes(event.recurrence_type)
) && (
  borough.length === 0 || borough.includes(event.borough)
));
res.render('../views/events.ejs', { events: filteredData });

},




// res.render('events', { events: data });



        // const newArray = data.filter(item=> item.recurrence_type === "ongoing")
        // res.render("../views/events.ejs", {arrayOfData: filteredData})
      
        likeEvent: async (req, res) => {
          try {
  const user = await User.findById(req.user._id)
  user.watching.push(req.params.id, req.params.id);
  await user.save()
  req.logIn(user, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/profile");

  });
  console.log("watching");
} catch (err) {
  console.log(err);
}


},
          
      

//       likeEvent: async (req, res) => {
//         try {
// const user = await User.findById(req.user._id)
//           user.watching.push(req.params.id, req.params.title);
//           await user.save()
//           req.logIn(user, (err) => {
//             if (err) {
//               return next(err);
//             }
//           res.redirect("/profile");
//         } catch (err) {
//           console.log(err);
//         }
  
 
//       },
  }

      
 

  
  
