import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartWithDesc {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface PartsProps{
    parts: CoursePartBase[];
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const Part: React.FC<CoursePart> = (props)=>{
    switch (props.name) {
        case 'Fundamentals':
            return <p>{props.name} {props.exerciseCount} {props.description}</p>
        case 'Using props to pass data':
            return <p>{props.name} {props.exerciseCount} {props.groupProjectCount}</p>
        case 'Deeper type usage':
            return <p>{props.name} {props.exerciseCount} {props.description} {props.exerciseSubmissionLink}</p>
        default:
            assertNever(props);
    }
};

const Header:React.FC<{name: string}> = ({name})=>{
    return <h1>{name}</h1>
};

const Content: React.FC<PartsProps> = ({parts})=>{
    return (
        <>
            {parts.map(p=> <Part key={p.name} part={p}/>)}
        </>
    )
};

const Total: React.FC<PartsProps> = ({parts})=>{
    return (
        <>
            Number of exercises{" "}
            {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </>
    );
};

const App: React.FC = () => {
    const courseName = "Half Stack application development";
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
        }
    ];

    return (
        <>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <Total parts={courseParts} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
