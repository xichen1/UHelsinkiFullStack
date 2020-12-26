"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatientDate = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};
const addNewPatient = (newPatient) => {
    const newPatientdata = Object.assign({ id: uuid.v4() }, newPatient);
    patients_1.default.push(newPatientdata);
    return newPatientdata;
};
exports.default = {
    getPatientDate,
    addNewPatient
};
