import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options, { OPTION_TYPES } from '../Options'

test.only('updates scoop subtotal when scoops change', async () => {
  render(<Options optionType={OPTION_TYPES.scoops} />)

  // make sure total starts with $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check the subtotal
  // await because it will shop up first after server responded
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  console.log({ vanillaInput })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})
