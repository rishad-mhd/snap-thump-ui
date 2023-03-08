import PropTypes from 'prop-types';
import LoginPage from "../pages/LoginPage"
import useAuth from "../hooks/useAuth"

AuthGuard.propTypes={
  children:PropTypes.node
}
function AuthGuard({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <LoginPage />
  }

  return (children)
}

export default AuthGuard