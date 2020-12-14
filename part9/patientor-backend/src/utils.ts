import { NewPatient, Gender } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */

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

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }
    return name;
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

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };
};

export default toNewPatient;
