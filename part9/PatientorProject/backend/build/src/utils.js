"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('wrong name');
    }
    return name;
};
const isString = (param) => {
    return typeof param === 'string' || param instanceof String;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('wrong date');
    }
    return date;
};
const isDate = (param) => {
    return Boolean(Date.parse(param));
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('wrong ssn');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('wrong gender');
    }
    return gender;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseOcc = (occ) => {
    if (!occ || !isString(occ)) {
        throw new Error('wrong occupation');
    }
    return occ;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOcc(object.occupation)
    };
};
exports.default = toNewPatient;
