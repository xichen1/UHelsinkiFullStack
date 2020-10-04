const calculateBmi = (height: number, weight: number): number => {
  return weight / (height / 100) ** 2
}

console.log(calculateBmi(180, 74))
