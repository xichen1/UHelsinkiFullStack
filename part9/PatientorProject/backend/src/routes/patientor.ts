import express from 'express';

// import patientService from '../services/patientService';
import diagnoseServices from '../services/diagnoseService';

import patientServices from '../services/patientService';

import toNewPatient from '../utils';

const routePatient = express.Router();

const routeDiagnose = express.Router();

routePatient.get('/', (_req, res) => {
  res.send(patientServices.getPatientDate());
});

routeDiagnose.get('/', (_req, res) => {
  res.send(diagnoseServices.getDiagnoses());
});

routePatient.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
  
    res.json(patientServices.addNewPatient(newPatientEntry));
  } catch(e) {
    res.status(400);
  }
});



export default {
  routePatient,
  routeDiagnose
};