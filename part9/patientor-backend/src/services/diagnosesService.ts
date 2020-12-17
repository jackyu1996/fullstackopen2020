import diagnoses from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

const findById = (code: string): Diagnosis | undefined => {
    return diagnoses.find((d) => d.code === code);
};

export default {
    getEntries,
    findById,
};
