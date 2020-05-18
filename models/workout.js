const mongoose = require("mongoose")
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "What type of exercise?"
            },
            name: {
                type: String,
                trim: true,
                required: "Name of exercise"
            },
            duration: {
                type: Number,
                required: "How long was your workout?"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        }
    }
);
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, current) => {
      return total + current.duration;
    }, 0);
  });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;