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
    { $sort: { day: -1 } },
  ]);

  res.json(agg);
});

// Get workouts in range
apiRouter.get("/range", (req, res) => {
  res.send("Hello from your server!");
});

// Add exercise to current workout
apiRouter.put("/", (req, res) => {
  db.Workout.find({})
    // .sort({ date: -1 })
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
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
  const newWorkout = db.Workout.create(req.body);
  res.json(newWorkout);
});

module.exports = apiRouter;
