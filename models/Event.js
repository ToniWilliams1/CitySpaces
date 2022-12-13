const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    userName: {type: String, unique: true},

 opportunity_id:{
    
type: Number,
required: true,
  }

  ,

  saved:{
    type: Boolean,
    require: true
  },
    title: {
    type: String,
    required: true,
  },
 summary: {
    type: String,
    require: true,
  },
  cateogory_desc: {
    type: String,
    require: true,
  },
  org_title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);