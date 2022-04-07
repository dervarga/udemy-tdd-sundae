import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || 'An unexpected error occured. Please try again later.'
  const alertVariant = variant || 'danger'

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  )
}

AlertBanner.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
}

export default AlertBanner
