import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.user)
    if (user.loggedIn) {
        return children
    } else {
        return <Navigate to={'/login'} />
    }
}

export default ProtectedRoute