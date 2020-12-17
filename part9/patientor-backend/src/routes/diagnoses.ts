import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(diagnosesService.getEntries());
});

router.get("/:code", (req, res) => {
    const name = diagnosesService.findById(req.params.code);
    if (name) {
        res.send(name);
    } else {
        res.sendStatus(404);
    }
});

export default router;
