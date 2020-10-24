import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();

app.get('/Hello', (_req, res) => {
  res.send("hello full stack!");
});

app.post('/exercises', (req, res)=>{
  const {dailyArray, target} = req.body as {
    dailyArray: [number],
    target: number
  };

  const input: number[] = [target].concat(dailyArray);

  if(!target || !dailyArray) {
    return res.status(400).json({error: 'parameters error'});
  }


  return res.json(calculateExercises(input));
});

app.get('/bmi', (req, res)=>{
  if (req.query.weight === undefined || req.query.height === undefined) {
    res.sendStatus(404);
    throw new Error("malformatted parameters");
  }
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.sendStatus(404);
    throw new Error('invalid argument');
  }

  const output: Record<string, number> = {
    weight,
    height,
    bmi: calculateBmi(height, weight)
  };
  res.send(output);
});

const PORT = 3001;

app.listen(PORT, ()=>{
  console.log(`server running on ${PORT}`);
});