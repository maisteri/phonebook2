import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {

  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  if (type === 'error') {
    return (
      <p className='error' >{message}</p>
    )
  } else if (type === 'success') {
    return (
      <p className='personAdded' >{message}</p>
    )
  } else {
    return null
  }
}

export default Notification