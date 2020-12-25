import diagnoseData from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};