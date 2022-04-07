import { render, screen } from '@testing-library/react'
import Options from '../Options'

test('displays image for each scoop from the server', async () => {
  render(<Options optionType='scoops' />)

  // find the images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // confirm alt text of images
  const altTexts = scoopImages.map((image) => image.alt)
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
