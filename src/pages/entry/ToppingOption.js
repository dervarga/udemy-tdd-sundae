import React from 'react'
import PropTypes from 'prop-types'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0)
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '50%' }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-topping-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Check
            inline
            type='checkbox'
            label={name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

ToppingOption.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  updateItemCount: PropTypes.func,
}

export default ToppingOption
