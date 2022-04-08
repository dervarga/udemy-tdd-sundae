import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options, { OPTION_TYPES } from '../Options'

test('updates scoop subtotal when scoops change', async () => {
  render(<Options optionType={OPTION_TYPES.scoops} />)

  // make sure total starts with $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check the subtotal
  // await because it will show up first after server responded
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')

  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  await userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings total when topping changes', async () => {
  render(<Options optionType={OPTION_TYPES.toppings} />)

  // make sure total starts with $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // activate cherries topping and check subtotal
  // await because it will show up first after server responded
  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  await userEvent.click(cherriesInput)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // activate hot fudge topping and check subtotal
  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  })
  await userEvent.click(hotFudgeInput)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // deactivate cherries topping and check subtotal
  await userEvent.click(cherriesInput)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})
