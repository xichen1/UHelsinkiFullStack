import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{courseName: string}> = ({courseName}) => {
  return <h1>{courseName}</h1>;
};

interface Course {
  name: string,
  exerciseCount: number
}

const Content: React.FC<{courses: Course[]}> = ({courses}) => {
  return <React.Fragment>
      {courses.map(c => (
    <p key={c.name}>{c.name} {c.exerciseCount}</p>
      ))}
  </React.Fragment>

};

const Total: React.FC<{courses: Course[]}> = ({courses}) => {
  return (<React.Fragment>
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
  </React.Fragment>)
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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