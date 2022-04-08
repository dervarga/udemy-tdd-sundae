import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Row from 'react-bootstrap/Row'

import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'
import { pricePerItem } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'

export const OPTION_TYPES = {
  scoops: 'scoops',
  toppings: 'toppings',
}

const Options = (props) => {
  const { optionType } = props

  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent =
    optionType === OPTION_TYPES.scoops ? ScoopOption : ToppingOption

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}

Options.propTypes = {
  optionType: PropTypes.oneOf(Object.values(OPTION_TYPES)),
}

export default Options
