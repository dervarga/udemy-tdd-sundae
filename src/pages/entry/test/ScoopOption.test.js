import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoopOption from '../ScoopOption'

describe('scoop option validation', () => {
  test.only('if scoop is negative, it should be invalid', async () => {
    render(<ScoopOption updateItemCount={jest.fn()} />)

    const input = screen.getByRole('spinbutton')
    await userEvent.clear(input)
    await userEvent.type(input, '-1')
    expect(input).toHaveClass('is-invalid')
  })

  test('if input has decimals in it, input is invalid', async () => {
    const input = screen.getByRole('spinbutton')
    userEvent.clear(input)
    await userEvent.type(input, '2.5')
    expect(input).toHaveClass('is-invalid')
  })

  test('if scoop number is bigger than 10, input is invalid', () => {
    render(<ScoopOption updateItemCount={jest.fn()} />)

    const input = screen.getByRole('spinbutton')
    userEvent.clear(input)
    userEvent.type(input, '11')
    expect(input).toHaveClass('is-invalid')

    // finally we check if it is valid again
    userEvent.clear(input)
    userEvent.type(input, '5')
    expect(input).not.toHaveClass('is-invalid')
  })
})
