import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loader = (props) => {
  return (
    <>
      <Spinner animation='grow' role='status' />
      <h2>Loading</h2>
    </>
  )
}

export default Loader
