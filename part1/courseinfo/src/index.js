import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
  <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  const part = props.parts
  return (
    <p>
      {part.name} {part.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts[0]} />
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      {props.parts[0].exercise + 
      props.parts[1].exercise + 
      props.parts[2].exercise}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React',
        exercise: 10  
      },
      { name: 'Using props to pass data',
        exercise: 7
      },
      { name: 'State of a component',
        exercise: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))