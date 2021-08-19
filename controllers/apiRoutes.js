const apiRouter = require("express").Router();
const db = require("../models");

// Get last workout
apiRouter.get("/", async (req, res) => {
  const agg = await db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
    { $sort: { day: 1 } },
  ]);

  res.json(agg);
});

// Get workouts in range
apiRouter.get("/range", async (req, res) => {
    const agg = await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
        { $sort: { day: 1 } },
      ]);

      res.json(agg);
});

// Add exercise to current workout
apiRouter.put("/:id", async (req, res) => {
    try {
        const workout = await db.Workout.findOneAndUpdate({_id: req.params.id},{$push:{exercises:req.body}},{useFindAndModify: false,});
        res.json(workout);
    } catch (error) {
        res.status(400).json(err);
    }
});

// Create new workout
apiRouter.post("/", async (req, res) => {
    let workout;
    if(Object.entries(req.body).length > 0){
        console.log("This is not the way");
        workout = new db.Workout({
            day: Date.now(),
            exercises: [],
        });
    } else {
        console.log("This is the way");
        workout = new db.Workout({day:Date.now(),...req.body});
    }
    console.log(workout);
  const newWorkout = await db.Workout.create(workout);
  console.log(newWorkout);
  res.json(newWorkout);
});

module.exports = apiRouter;
