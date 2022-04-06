import React, { useState } from "react"

const SummaryForm = () => {
  const [accepted, setAccepted] = useState(false)

  return (
    <div>
      <input
        type="checkbox"
        id="termsAndConditions"
        defaultChecked={accepted}
        onClick={(e) => setAccepted(e.target.checked)}
      />
      <label htmlFor="termsAndConditions">
        I agree to Terms and Conditions
      </label>
      <button disabled={!accepted}>Confirm order</button>
    </div>
  )
}

export default SummaryForm
