const Success = ({name}) => {
  if (name === null){
    return;
  }
  return(
    <div className="success">
      Added {name}
    </div>
  )
}

export default Success