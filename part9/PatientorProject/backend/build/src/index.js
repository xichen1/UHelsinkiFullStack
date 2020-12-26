"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const patientor_1 = __importDefault(require("./routes/patientor"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    res.send("pong");
});
app.use('/api/diagnoses', patientor_1.default.routeDiagnose);
app.use('/api/patients', patientor_1.default.routePatient);
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
