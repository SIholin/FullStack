import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            
                <h1>{props.course}</h1>
            
        </div>
    )
}
const Part = (props) => {
    return (
        <div>
           <p>
               {props.osa} {props.exercises}
           </p>
        </div>
    )
}
const Content = (props) => {
   
    return (
        <div>
            <Part osa={props.parts[0].name} exercises={props.parts[0].exercises}/>
            <Part osa={props.parts[1].name} exercises={props.parts[1].exercises}/>
            <Part osa={props.parts[2].name} exercises={props.parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    
    let tehtavat = props.all[0].exercises + props.all[1].exercises + props.all[2].exercises
    return (
        <div>
            <p>
                yhteensä {tehtavat} tehtävää
            </p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const parts = [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  

  return (
    <div>
        <Header course={course} />
        <Content parts={parts}  />
        <Total all={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))