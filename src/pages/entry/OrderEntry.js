import React from 'react'
import PropTypes from 'prop-types'

import Options, { OPTION_TYPES } from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Button from 'react-bootstrap/Button'
import { ORDER_PHASES } from '../../constants'

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()
  return (
    <div>
      <h1>Design your sundae</h1>
      <Options optionType={OPTION_TYPES.scoops} />
      <Options optionType={OPTION_TYPES.toppings} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        variant='primary'
        size='lg'
        onClick={() => {
          setOrderPhase && setOrderPhase(ORDER_PHASES.inConfirmation)
        }}
      >
        Order
      </Button>
    </div>
  )
}

OrderEntry.propTypes = {
  setOrderPhase: PropTypes.func.isRequired,
}

export default OrderEntry
