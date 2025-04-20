const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part) => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return(
    <>
    <h4>Number of exercises: {total}</h4>
    </>
  )
}

const Course = (props) => {
  return(
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts}/>
    </>
  )
}

const Courses = (props) => (
  <div>
    {props.courses.map((part) => <Course key={part.id} course={part} />)}
  </div>
)

export default Courses