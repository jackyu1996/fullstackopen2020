import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, exercisesData } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (weight && height) {
        const bmi = calculateBmi(height, weight);
        res.json({
            weight,
            height,
            bmi,
        });
    } else {
        res.json({
            error: "malformatted parameters",
        });
    }
});

app.post("/exercises", (req, res) => {
    const exercisesData = req.body as exercisesData;
    const hours = exercisesData.daily_exercises;
    const target = exercisesData.target;

    if (!hours || !target) {
        res.status(400).json({
            error: "parameters missing",
        });
        return;
    }

    if (!hours.every((h) => !isNaN(h)) || !Number(target)) {
        res.status(400).json({
            error: "malformatted parameters",
        });
        return;
    }

    res.json(calculateExercises(hours, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
