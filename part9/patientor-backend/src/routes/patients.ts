import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getPublicPatients());
});

router.get("/:id", (req, res) => {
    const patient = patientsService.findById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const returnedPatient = patientsService.addPatient(newPatient);
        res.json(returnedPatient);
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

router.post("/:id/entries", (req, res) => {
    const patient = patientsService.findById(req.params.id);
    if (patient) {
        try {
            const newEntry = toNewEntry(req.body);
            if (newEntry) {
                const returnedEntry = patientsService.addEntry(
                    patient,
                    newEntry
                );
                res.json(returnedEntry);
            } else {
                res.status(400);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(400).send(e.message);
            }
        }
    } else {
        res.send(404);
    }
});

export default router;
