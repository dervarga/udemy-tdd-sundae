import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options, { OPTION_TYPES } from '../Options'
import OrderEntry from '../OrderEntry'

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

describe('grand total', () => {
  /**
   * 
   *    // this will be tested in first test,it should not be separated.
   // it might cause unmounted error
 
   // test('grand total starts at $0.00', () => {
   //   render(<OrderEntry />)
   //   const grandTotal = screen.getByRole('heading', {
   //     name: /Grand total: \$/i,
   //   })
   //   expect(grandTotal).toHaveTextContent('0.00')
   // })
   */

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })

    //check that grandtotal starts with 0.00
    expect(grandTotal).toHaveTextContent('0.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn} />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    expect(grandTotal).toHaveTextContent('0.00')

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    expect(grandTotal).toHaveTextContent('0.00')

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    })
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })

    userEvent.clear(chocolateInput)
    await userEvent.click(hotFudgeCheckbox)
    await userEvent.type(chocolateInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')

    await userEvent.type(chocolateInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')

    await userEvent.click(hotFudgeCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')

    await userEvent.type(chocolateInput, '0')
    expect(grandTotal).toHaveTextContent('0.00')
  })
})
