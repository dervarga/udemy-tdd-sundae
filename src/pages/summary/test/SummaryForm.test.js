import { render, screen, fireEvent } from "@testing-library/react"
import SummaryForm from "../SummaryForm"

describe("tests SummaryForm", () => {
  test("checkbox and button is in the page", () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole("checkbox", {
      name: /^I agree to/i,
    })
    const orderButton = screen.getByRole("button", { name: "Confirm order" })
    expect(orderButton).toHaveTextContent("Confirm order")
    expect(checkbox).not.toBeChecked()
  })

  test("button is disabled till checkbox is not checked", () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole("checkbox", {
      name: /^I agree to/i,
    })
    const orderButton = screen.getByRole("button", { name: "Confirm order" })

    expect(orderButton).toBeDisabled()

    fireEvent.click(checkbox)
    expect(orderButton).toBeEnabled()
  })
})
