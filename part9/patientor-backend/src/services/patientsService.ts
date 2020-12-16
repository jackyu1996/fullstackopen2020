import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

import { PublicPatient, Patient, NewPatient } from "../types";

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

const addEntry = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient,
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getPublicPatients,
    findById,
    addEntry,
};
