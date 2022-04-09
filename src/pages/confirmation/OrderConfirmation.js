import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import { ORDER_PHASES } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'
import AlertBanner from '../common/AlertBanner'

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetItemCount] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then(({ data: { orderNumber } }) => setOrderNumber(orderNumber))
      .catch(() => setError(true))
  }, [])

  if (error) {
    return <AlertBanner />
  }

  return (
    <>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>Nothing really will happen</p>
      <Button
        variant='primary'
        onClick={() => {
          resetItemCount && resetItemCount()
          setOrderPhase && setOrderPhase(ORDER_PHASES.inProgress)
        }}
      >
        Create new order
      </Button>
    </>
  )
}

OrderConfirmation.propTypes = {
  setOrderPhase: PropTypes.func,
}

export default OrderConfirmation
