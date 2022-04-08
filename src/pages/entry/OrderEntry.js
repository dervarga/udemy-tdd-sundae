import React from 'react'

import Options, { OPTION_TYPES } from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails()
  return (
    <div>
      <Options optionType={OPTION_TYPES.scoops} />
      <Options optionType={OPTION_TYPES.toppings} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  )
}

export default OrderEntry
