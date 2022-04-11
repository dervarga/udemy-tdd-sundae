import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const ScoopOptions = (props) => {
  const { name, imagePath, updateItemCount } = props
  const [isValid, setIsValid] = useState(true)

  const handleChange = (event) => {
    const {
      target: { value: currentValue },
    } = event || {}

    // making sure it is a number and not a string
    const currentValueFloat = parseFloat(currentValue)

    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat

    // validate
    setIsValid(valueIsValid)
    if (valueIsValid) updateItemCount(name, currentValue)
  }
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '50%' }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

ScoopOptions.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  updateItemCount: PropTypes.func.isRequired,
}

export default ScoopOptions
