import {React} from 'react';
import { Redirect } from "react-router-dom";
import { Spinner } from 'reactstrap';

const ProtectedRoute = ({ isLoggedIn, children, isCheckingToken }) => {
    return (
        isCheckingToken ? <Spinner/> : isLoggedIn ? children : <Redirect to='/signin' />
  )
}

export default ProtectedRoute;