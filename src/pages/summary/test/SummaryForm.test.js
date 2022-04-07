import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

describe('tests SummaryForm', () => {
  test('checkbox and button is in the page', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /^I agree to/i,
    })
    const orderButton = screen.getByRole('button', { name: /confirm order/i })
    expect(orderButton).toHaveTextContent('Confirm order')
    expect(checkbox).not.toBeChecked()
  })

  test('button is disabled till checkbox is not checked', async () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /^I agree to/i,
    })
    const orderButton = screen.getByRole('button', { name: /confirm order/i })

    expect(orderButton).toBeDisabled()

    await userEvent.click(checkbox)
    expect(orderButton).toBeEnabled()

    await userEvent.click(checkbox)
    expect(orderButton).toBeDisabled()
  })

  test('popover response to hover', async () => {
    render(<SummaryForm />)
    // popover should be hidden on page load
    const nullPopover = screen.queryByText(
      /no icecream will actually be delivered/i
    )
    expect(nullPopover).not.toBeInTheDocument()
    // popover appears upon mouseover of checkbox label

    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)

    // screent.getByText would throw error if it did not find anything, but the best practice is to check it with expect, too
    const popover = screen.getByText(/no icecream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    // popover disappears when we mouse out
    await userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no icecream will actually be delivered/i)
    )
  })
})
