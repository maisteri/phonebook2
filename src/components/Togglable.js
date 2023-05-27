import PropTypes from 'prop-types'

const Togglable = (props) => {

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired
  }

  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable