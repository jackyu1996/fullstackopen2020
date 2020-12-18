/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
    NewPatient,
    NewEntry,
    Discharge,
    Gender,
    HealthCheckRating,
    SickLeave,
} from "./types";

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
    const ssnReg = /\d{6}-(\d{2}[A-Z]|\d{3}[A-Z0-9])/g;
    return Boolean(ssnReg.exec(ssn));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const parseString = (type: string) => (value: any): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${type}: ` + value);
    }
    return value;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const parseName = parseString("name");
const parseDescription = parseString("description");
const parseOccupation = parseString("occupation");
const parseDischarge = (discharge: any): Discharge => {
    if (
        !discharge ||
        !discharge.date ||
        !discharge.criteria ||
        !isDate(discharge.date) ||
        !isString(discharge.criteria)
    ) {
        throw new Error(
            "Incorrect or missing discharge: " +
                discharge.date +
                " " +
                discharge.criteria
        );
    }
    return discharge as Discharge;
};

const parseHealthCheckingRating = (
    healthCheckRating: any
): HealthCheckRating => {
    if (
        typeof healthCheckRating === "undefined" ||
        !isHealthCheckRating(healthCheckRating)
    ) {
        throw new Error(
            "Incorrect or missing healthCheckRating: " + healthCheckRating
        );
    }
    return healthCheckRating;
};

const parseDiagnosisCodes = (codes: any) => {
    if (!codes || !Array.isArray(codes) || !codes.every((c) => isString(c))) {
        throw new Error("Incorrect or missing diagnosisCodes: " + codes);
    }
    return codes as string[];
};

const parseSickLeave = (sickLeave: any) => {
    if (
        !sickLeave ||
        !sickLeave.startDate ||
        !sickLeave.endDate ||
        !isDate(sickLeave.startDate) ||
        !isDate(sickLeave.endDate)
    ) {
        throw new Error(
            "Incorrect or missing sickLeave: " +
                sickLeave.startDate +
                " " +
                sickLeave.endDate
        );
    }
    return sickLeave as SickLeave;
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: [],
    };
};

export const toNewEntry = (object: any): NewEntry | undefined => {
    switch (object.type) {
        case "Hospital":
            return {
                type: "Hospital",
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                description: parseDescription(object.description),
                discharge: parseDischarge(object.discharge),
                ...(object.diagnosisCodes && {
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                }),
            } as NewEntry;
        case "HealthCheck":
            return {
                type: "HealthCheck",
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                description: parseDescription(object.description),
                healthCheckRating: parseHealthCheckingRating(
                    object.healthCheckRating
                ),
                ...(object.diagnosisCodes && {
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                }),
            } as NewEntry;
        case "OccupationalHealthcare":
            return {
                type: "OccupationalHealthcare",
                date: parseDate(object.date),
                specialist: parseName(object.specialist),
                description: parseDescription(object.description),
                employerName: parseName(object.employerName),
                ...(object.diagnosisCodes && {
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                }),
                ...(object.sickLeave && {
                    sickLeave: parseSickLeave(object.sickLeave),
                }),
            } as NewEntry;
        default:
            return undefined;
    }
};
