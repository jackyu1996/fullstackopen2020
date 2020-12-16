export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;
