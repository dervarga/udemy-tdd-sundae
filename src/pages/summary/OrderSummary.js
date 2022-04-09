import React from 'react'
import SummaryForm from './SummaryForm'
import SummaryDetails from './SummaryDetails'

const OrderSummary = (props) => {
  return (
    <>
      <SummaryDetails />
      <SummaryForm {...props} />
    </>
  )
}

OrderSummary.propTypes = {}

export default OrderSummary
