import React from 'react'

import Header from './Header.js'
import Content from './Content.js'
const Course = ({ course }) => {
    const total = 
    course.parts.map(part => 
                        part.exercises)
                .reduce(((count, part) => 
                        count+part) , 0)

    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <strong>Total number is {total}</strong>
        </>
    )
}

export default Course