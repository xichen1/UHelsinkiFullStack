interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length <= 1) throw new Error('no enough arguments')
  let result = new Array()
  const newargs = args.slice(2)
  newargs.map((a) => {
    if (isNaN(Number(a)) || Number(a) < 0) {
      throw new Error('invalid argument')
    }
    result.push(Number(a))
  })
  return result
}

const calculateExercises = (trainTime: Array<number>): Result => {
  const periodLength = trainTime.length - 1
  let trainingDays = 0
  trainTime.map((t) => {
    t !== 0 ? (trainingDays = trainingDays + 1) : null
  })
  trainingDays = trainingDays - 1

  let sum = 0
  trainTime.map((t) => {
    sum = sum + t
  })
  const average = (sum - trainTime[0]) / periodLength
  const target = trainTime[0]
  let success
  if (average > trainTime[0]) {
    success = true
  } else {
    success = false
  }
  const rating = 2
  const ratingDescription = 'aaa'
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

// console.log(calculateExercises([2, 1, 0, 2, 4.5, 0, 3, 1, 0, 4]))
console.log(calculateExercises(parseArguments(process.argv)))
