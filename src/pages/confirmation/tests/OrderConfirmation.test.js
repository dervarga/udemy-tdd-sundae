import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderConfirmation from '../OrderConfirmation'

test('displays correct heading', () => {
  render(<OrderConfirmation />)
})
