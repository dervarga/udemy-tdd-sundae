import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'

const SummaryForm = () => {
  const [accepted, setAccepted] = useState(false)

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </span>
  )

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' disabled={!accepted}>
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm
