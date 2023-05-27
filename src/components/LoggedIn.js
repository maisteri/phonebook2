const LoggedIn = ({ name, handleLogout }) => {
  return (
    <div>
      <p>
        {name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  )
}

export default LoggedIn