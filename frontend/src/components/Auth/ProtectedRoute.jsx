import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useSelector((state) => {
		return state.auth;
	});
	// console.log('Authenticated : ', isAuthenticated);

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}
	return children;
};

export default ProtectedRoute;
