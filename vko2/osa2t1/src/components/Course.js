import React from 'react'

const Header = props =>
    <h1>{props.course}</h1>

const Total = ({ parts }) => {

    const total = parts.map(part => part.exercises)
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    return <p>yhteensä {total.reduce(reducer)} tehtävää</p>
}


const Part = ({ parts }) => parts.map(part =>
    <li key={part.id}>{part.name} {part.exercises}</li>)

const Content = ({ parts }) => {

    return (

        <ul>
            <Part parts={parts} />
        </ul>



    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />

            <Content parts={course.parts} />

            <Total parts={course.parts} />
        </div>
    )
}

const Courses = ({courses}) => {
    const rows = () => courses.map(course =>
        <Course key={course.id} course={course} />)
    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

export default Courses