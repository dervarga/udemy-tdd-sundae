import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options, { OPTION_TYPES } from '../Options'

describe('displays image for each option from the server', () => {
  test('displays image for each scoop from the server', async () => {
    render(<Options optionType={OPTION_TYPES.scoops} />)

    // find the images, in case of async function await findAllByRole must be used
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    // confirm alt text of images
    const altTexts = scoopImages.map((image) => image.alt)
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })

  test('displays image for each topping from the server', async () => {
    render(<Options optionType={OPTION_TYPES.toppings} />)

    const toppingImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    })
    expect(toppingImages).toHaveLength(3)

    // confirm alt text of images, in case of Array, toEqual must be used
    const altTexts = toppingImages.map((image) => image.alt)
    expect(altTexts).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ])
  })
})

describe.only('validation', () => {
  test('subtotal does not update if input is invalid', async () => {
    render(<Options optionType={OPTION_TYPES.scoops} />)

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '-1')

    const scoopsTotal = screen.getByText('Scoops total: $0.00')
    expect(scoopsTotal).toBeInTheDocument()
  })
})
