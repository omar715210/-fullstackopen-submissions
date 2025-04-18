import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const StatisticLine = (props) => {
  return(
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.stats}</td>
    </tr>
    </>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, tot, avg, pos} = props

  if (tot === 0){
    return(
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return(
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text={'good'} stats={good}/>
        <StatisticLine text={'neutral'} stats={neutral}/>
        <StatisticLine text={'bad'} stats={bad}/>
        <StatisticLine text={'All'} stats={tot}/>
        <StatisticLine text={'Average'} stats={avg.toFixed(2)}/>
        <StatisticLine text={'Positive:'} stats={pos.toFixed(2)+' %'}/>
      </table>
    </>
  )
}


const App = () => {
  const [feedback, setFeedback] = useState({good:0,neutral:0,bad:0})
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const increament = feedback.good + 1
    setFeedback({...feedback,good:increament,})
    setTotal(total+1)
  }

  const handleneutral = () => {
    const increament = feedback.neutral + 1
    setFeedback({...feedback,neutral:increament,})
    setTotal(total+1)
  }

  const handlebad = () => {
    const increament = feedback.bad + 1
    setFeedback({...feedback,bad:increament,})
    setTotal(total+1)
  }
  
  const average = total === 0 ? 0 :(feedback.good-feedback.bad)/total;
  const positive = total === 0 ? 0 :feedback.good/total

  return(
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text={'good'}/>
      <Button onClick={handleneutral} text={'neutral'}/>
      <Button onClick={handlebad} text={'bad'}/>
      <Statistics good={feedback.good} bad={feedback.bad} neutral={feedback.neutral} tot={total} avg={average} pos={positive}/>
    </>
  )
}

export default App