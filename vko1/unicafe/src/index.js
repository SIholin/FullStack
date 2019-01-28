import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ hyva, neutraali, huono }) => {
    const yht = hyva + neutraali + huono
    if (yht === 0) {
        return (
            <div>Ei yhtään palutetta annettu!</div>
        )
    }
    const miinus = hyva - huono
    const keski = miinus / yht
    const prosentti = hyva / yht * 100
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä </td>
                        <td>{hyva}</td>
                    </tr>
                    <tr>
                        <td>neutraali </td>
                        <td>{neutraali}</td>
                    </tr>
                    <tr>
                        <td>huono </td>
                        <td>{huono}</td>
                    </tr>
                    <tr>
                        <td>yhteensä </td>
                        <td>{yht}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo </td>
                        <td>{keski}</td>
                    </tr>
                    <tr>
                        <td>positiivisia </td>
                        <td>{prosentti} %</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Anna palutetta</h1>
            <Button handleClick={handleGood} text='hyvä' />
            <Button handleClick={handleNeutral} text='neutraali' />
            <Button handleClick={handleBad} text='huono' />
            <h1>Statistiikka</h1>
            <Statistics hyva={good} neutraali={neutral} huono={bad} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

