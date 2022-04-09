import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'
import { OrderDetailsProvider } from './contexts/OrderDetails'
import { ORDER_PHASES } from './constants'

const componentMap = new Map([
  [ORDER_PHASES.inProgress, OrderEntry],
  [ORDER_PHASES.inConfirmation, OrderSummary],
  [ORDER_PHASES.done, OrderConfirmation],
])

function App() {
  const [orderPhase, setOrderPhase] = useState(ORDER_PHASES.inProgress)

  const ComponentToRender = componentMap.has(orderPhase)
    ? componentMap.get(orderPhase)
    : OrderEntry

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <ComponentToRender setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  )
}

export default App
