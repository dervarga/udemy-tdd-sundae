import React from 'react'
import { OPTION_TYPES } from '../entry/Options'

import { useOrderDetails } from '../../contexts/OrderDetails'

const SummaryDetails = (props) => {
  const [orderDetails] = useOrderDetails()

  const getItems = (optionType) => {
    const result = []
    orderDetails[optionType].forEach((value, key) => {
      const item = (
        <li key={key}>
          {optionType === OPTION_TYPES.scoops ? value : ''} {key}
        </li>
      )
      result.push(item)
    })
    return result
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      {getItems('scoops')}
      {orderDetails[OPTION_TYPES.toppings]?.size !== 0 ? (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          {getItems('toppings')}
        </>
      ) : null}

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  )
}

SummaryDetails.propTypes = {}

export default SummaryDetails
