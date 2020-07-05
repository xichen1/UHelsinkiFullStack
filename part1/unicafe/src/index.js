import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onclick, text}) => 
  <button onClick={onclick}>{text}</button>

const Statistic = ({value, text}) => {
  if ({text} === 'positive') {
    return (
      <tr>
        <td>{text} </td> 
        <td>{value}%</td>
    </tr>
    )
  } else {
    return (      
    <tr>
      <td>{text} </td> 
      <td>{value}%</td>
    </tr>
    )
  }
}


const Statistics = (props) => {
  if (props.good === 0 &&
     props.bad === 0 &&
    props.neutral === 0){
    return(
      <div>
        <h1>statistics</h1>
        No fedback given
      </div>
    )
  } else {
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic value={props.good} text='good' />
            <Statistic value={props.neutral} text='neutral' />
            <Statistic value={props.bad} text='bad' />
            <Statistic value={props.total} text='total' />
            <Statistic value={props.average} text='average' />
            <Statistic value={props.positive} text='positive' />
          </tbody>
        </table>
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onclick={() => setGood(good + 1)} text='good'/> 
      <Button onclick={() => setNeutral(neutral + 1)} text='neutral'/> 
      <Button onclick={() => setBad(bad + 1)} text='bad'/> 
      <Statistics good={good} neutral={neutral} bad={bad}
        total={total} average={(good-bad)/total} positive={(good/total)*100}

      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)