import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { OPTION_TYPES } from '../Options'

import { rest } from 'msw'
import { server } from '../../../mocks/server'

test('handles errors for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(`http://localhost:3030/${OPTION_TYPES.scoops}`, (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(
      `http://localhost:3030/${OPTION_TYPES.toppings}`,
      (req, res, ctx) => res(ctx.status(500))
    )
  )

  // I might need setOrderPhase mock in order to keep test not failing
  render(<OrderEntry setOrderPhase={jest.fn()} />)

  // in case for waiting for more responses, waitFor must be used
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})

test.only('order button is disabled if no scoops are selected', async () => {
  render(<OrderEntry />)
  const orderButton = screen.getByRole('button', { name: 'Order' })
})
