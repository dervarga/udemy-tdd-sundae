import React from 'react'

import Options, { OPTION_TYPES } from './Options'

const OrderEntry = () => {
  return (
    <div>
      <Options optionType={OPTION_TYPES.scoops} />
      <Options optionType={OPTION_TYPES.toppings} />
    </div>
  )
}

export default OrderEntry
