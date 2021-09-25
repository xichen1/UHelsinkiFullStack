import React from "react";
import ReactDOM from "react-dom";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CourseDiscription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDiscription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseDiscription {
  name: "new test"
}

interface CourseDiscription extends CoursePartBase {
  description: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (object: never):never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(object)}`)
};

const Part: React.FC<{course: CoursePart}> = ({course}) => {
  let returnValue;
  switch (course.name) {
    case "Fundamentals":
      returnValue = <p>name: {course.name} description: {course.description} exerciseCount: {course.exerciseCount}</p>;
      break;
    case "Using props to pass data":
      returnValue = <p>name: {course.name} groupProjectCount: {course.groupProjectCount} exerciseCount: {course.exerciseCount}</p>;
      break;
    case "Deeper type usage":
      returnValue = <p>name: {course.name} description: {course.description} exerciseCount: {course.exerciseCount} submissionLink: {course.exerciseSubmissionLink}</p>;
      break;
    case "new test":
      returnValue = <p>name: {course.name} description: {course.description} exerciseCount: {course.exerciseCount}</p>;
      break;
    default:
      return assertNever(course);
  }
  return returnValue
};

const Header: React.FC<{courseName: string}> = ({courseName}) => {
  return <h1>{courseName}</h1>;
};

const Content: React.FC<{courses: CoursePart[]}> = ({courses}) => {
  return <React.Fragment>
      {courses.map(c => (
    // <p key={c.name}>{c.name} {c.exerciseCount}</p>
      <Part course={c} key={c.name} />
      ))}
  </React.Fragment>

};

const Total: React.FC<{courses: CoursePart[]}> = ({courses}) => {
  return (<React.Fragment>
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  </React.Fragment>)
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "new test",
    exerciseCount: 20,
    description: "this is a test entry"
  }
];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));