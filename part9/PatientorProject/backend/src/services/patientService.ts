import {PatientEntry, NewPatientEntry} from '../types';
import uuid = require('uuid');

import patientData from '../../data/patients';

const getPatientDate = ():Omit<PatientEntry, 'ssn'>[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addNewPatient = (newPatient: NewPatientEntry): PatientEntry => {
  const newPatientdata = {
    id: uuid.v4(),
    ...newPatient
  };

  patientData.push(newPatientdata);

  return newPatientdata;
};

export default {
  getPatientDate,
  addNewPatient
};