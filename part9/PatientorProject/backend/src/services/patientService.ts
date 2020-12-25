import {PatientEntry} from '../types';

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

export default {getPatientDate};