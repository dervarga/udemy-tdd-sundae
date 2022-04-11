import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderConfirmation from '../OrderConfirmation'

import { rest } from 'msw'
import { server } from '../../../mocks/server'

test('display alert if server responses with error', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<OrderConfirmation setOrderPhase={jest.fn()} />)
  const alert = await screen.findByRole('alert')
  expect(alert).toBeInTheDocument()
})
