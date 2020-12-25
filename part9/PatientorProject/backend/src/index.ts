import express from 'express';
import cors from 'cors';
import patientorRouter from './routes/patientor';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send("pong");
});

app.use('/api/diagnoses', patientorRouter.routeDiagnose);
app.use('/api/patients', patientorRouter.routePatient);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});