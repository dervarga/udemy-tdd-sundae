import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
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

  // check loader

  const loaderInConfirmationPage = screen.getByRole('heading', {
    name: 'Loading',
  })
  expect(loaderInConfirmationPage).toBeInTheDocument()

  const spinner = screen.getByRole('status')
  expect(spinner).toBeInTheDocument()

  // confirm order number on confirmation page
  // await, because it makes an axios call on load
  // so we have to wait for that

  const confirmationHeader = await screen.findByRole('heading', {
    name: /Thank you!/,
  })
  expect(confirmationHeader).toBeInTheDocument()

  // at this time the loader should not be in the document
  // queryBy... because we expect it not to be in the document
  // getBy would throw an error, our test would fail
  const notLoading = screen.queryByText('loading')
  expect(notLoading).not.toBeInTheDocument()

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

test('order phase happy path till order summary, without toppings', async () => {
  render(<App />)

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  const orderButton = screen.getByRole('button', { name: 'Order' })
  userEvent.click(orderButton)

  const summaryHeader = await screen.findByRole('heading', {
    name: /order summary/i,
  })
  expect(summaryHeader).toBeInTheDocument()

  const scoopsHeader = screen.getByRole('heading', {
    name: /scoops: /i,
  })
  expect(scoopsHeader).toBeInTheDocument()

  const toppingsHeader = screen.queryByRole(/toppings:/i)
  expect(toppingsHeader).not.toBeInTheDocument()
})
