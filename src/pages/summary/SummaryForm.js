import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { ORDER_PHASES } from '../../constants'

const SummaryForm = ({ setOrderPhase }) => {
  const [accepted, setAccepted] = useState(false)

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No icecream will actually be delivered</Popover.Body>
    </Popover>
  )

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
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
      <Button
        variant='primary'
        disabled={!accepted}
        onClick={() => {
          setOrderPhase && setOrderPhase(ORDER_PHASES.done)
        }}
      >
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm
