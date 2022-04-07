import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Row from 'react-bootstrap/Row'

import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

export const OPTION_TYPES = {
  scoops: 'scoops',
  toppings: 'toppings',
}

const Options = (props) => {
  const { optionType } = props

  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.log(error)
        // TODO: handle error response
      })
  }, [optionType])

  const ItemComponent =
    optionType === OPTION_TYPES.scoops ? ScoopOption : ToppingOption

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}

Options.propTypes = {
  optionType: PropTypes.oneOf(Object.values(OPTION_TYPES)),
}

export default Options
