const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
const morgan = require('morgan')
const Workout = require("./models/workout");
const path = require("path");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/exercise", (req, res) => {
      res.sendFile(path.join(__dirname, "./public/exercise.html"))
  }
  )
  app.post("/api/workouts", (req, res)=>{
      console.log(req.body)
      Workout.create({}).then(workoutID=>{
          res.json(workoutID)
      })
      .catch(err => {
        res.json(err);
      });
  })
  app.put("/api/workouts/:id", (req, res)=>{
      console.log(req.body)
      const id = req.params.id
      Workout.findByIdAndUpdate(id,{$push :{exercises : req.body}})
      .then(result=>{
          console.log(result)
          res.json(result)
      })
      .catch(err=> res.json(err))
  })
  app.get("/stats", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/stats.html"))
  })
  app.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
