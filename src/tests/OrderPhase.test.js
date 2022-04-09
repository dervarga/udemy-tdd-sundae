import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test.only('order phases for happy path', async () => {
  // render the app
  render(<App />)
  // add ice cream scoops and toppings
  // screen.getByRole('heading', { name: 'Design your Sundae!' })
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })

  userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '2')

  // in case of chocolate we don't have to await
  // because vanilla has already been loaded, it means
  // chocolate must be also on screen
  const chocolateInput = screen.getByRole('spinbutton', {
    name: 'Chocolate',
  })
  expect(chocolateInput).toBeInTheDocument()

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  await userEvent.click(cherriesCheckbox)

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Order' })
  await userEvent.click(orderButton)

  // check summary information based on order
  screen.getByRole('heading', { name: 'Order Summary' })
  const summaryHeader = await screen.findByRole('heading', {
    name: /Order Summary/i,
  })
  expect(summaryHeader).toBeInTheDocument()
  // check subtotals
  const scoopsHeader = screen.getByRole('heading', {
    name: 'Scoops: $4.00',
  })
  expect(scoopsHeader).toBeInTheDocument()

  const toppingsHeader = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  })
  expect(toppingsHeader).toBeInTheDocument()

  const summaryGrandTotal = screen.getByRole('heading', {
    name: /grand total: \$/i,
  })

  // check summary option items
  expect(screen.getByText('2 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  expect(summaryGrandTotal).toHaveTextContent('5.50')

  // accept terms and conditions and click button to confirm
  const acceptCheckbox = screen.getByRole('checkbox', {
    name: /^I agree to/i,
  })
  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  })
  await userEvent.click(acceptCheckbox)
  await userEvent.click(confirmOrderButton)

  // confirm order number on confirmation page
  // await, because it makes an axios call on load
  // so we have to wait for that
  const confirmationHeader = await screen.findByRole('heading', {
    name: /Thank you!/,
  })
  expect(confirmationHeader).toBeInTheDocument()

  const confirmationNumber = screen.getByRole('heading', {
    name: /order number/i,
  })
  expect(confirmationNumber).toBeInTheDocument()

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: /new order/i,
  })
  await userEvent.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()

  // do we need to await anything to avoid test errors?
  // check inputs again, otherwise RTL gives error
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  screen.getByRole('checkbox', { name: 'Cherries' })
})
