/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NewPatientEntry, Gender} from './types';

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error ('wrong name');
  }
  return name;
};

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error ('wrong date');
  }

  return date;
};

const isDate = (param: any): boolean => {
  return Boolean(Date.parse(param));
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error ('wrong ssn');
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error ('wrong gender');
  }

  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseOcc = (occ: any): string => {
  if (!occ || !isString(occ)) {
    throw new Error ('wrong occupation');
  }
  return occ;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOcc(object.occupation)
  };
};

export default toNewPatient;