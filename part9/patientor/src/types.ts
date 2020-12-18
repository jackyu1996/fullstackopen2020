export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export enum EntryType {
    Hospital = "Hospital",
    HealthCheck = "HealthCheck",
    OccupationalHealthcare = "OccupationalHealthcare",
}

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
    description: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewEntry =
    | Omit<HospitalEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">
    | Omit<HealthCheckEntry, "id">;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth?: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}
