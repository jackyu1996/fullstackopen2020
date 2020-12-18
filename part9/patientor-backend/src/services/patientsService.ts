import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

import { PublicPatient, Patient, NewPatient, NewEntry, Entry } from "../types";

const getEntries = (): Patient[] => {
    return patients;
};

const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient,
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
    const newEntry = {
        id: uuidv4(),
        ...entry,
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    getPublicPatients,
    findById,
    addPatient,
    addEntry,
};
