import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => <div>{counter}</div>

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                sovellusta käytetään nappeja painelemalla
            </div>
        )
    }

    return (
        <div>
            näppäilyhistoria: {props.allClicks.join(' ')}
        </div>
    )
}
const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
    {text}
    </button>
)
const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightlick = () => {
        setAll(allClicks.concat('R'))
        setRight(right +1)
    }


    return (
      <div>
      <div>
          {left}
      <Button handleClick={handleLeftClick} text='vasen'/>
      <Button handleClick={handleRightlick} text='oikea'/>
       {right}
       <History allClicks={allClicks}/>
       </div>
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
  