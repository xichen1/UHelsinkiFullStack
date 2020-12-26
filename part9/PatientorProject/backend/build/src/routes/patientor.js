"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import patientService from '../services/patientService';
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const routePatient = express_1.default.Router();
const routeDiagnose = express_1.default.Router();
routePatient.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientDate());
});
routeDiagnose.get('/', (_req, res) => {
    res.send(diagnoseService_1.default.getDiagnoses());
});
routePatient.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
        res.json(patientService_1.default.addNewPatient(newPatientEntry));
    }
    catch (e) {
        res.status(400);
    }
});
exports.default = {
    routePatient,
    routeDiagnose
};
