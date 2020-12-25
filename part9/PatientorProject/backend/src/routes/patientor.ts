import express from 'express';

// import patientService from '../services/patientService';
import diagnoseServices from '../services/diagnoseService';

import patientServices from '../services/patientService';

const routePatient = express.Router();

const routeDiagnose = express.Router();

routePatient.get('/', (_req, res) => {
  res.send(patientServices.getPatientDate());
});

routeDiagnose.get('/', (_req, res) => {
  res.send(diagnoseServices.getDiagnoses());
});



export default {
  routePatient,
  routeDiagnose
};