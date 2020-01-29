import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
	isAuthenticated: boolean;
	isVerifying: boolean;
}

const ProtectedRoute = (props: IProps) => {
	const { component, isAuthenticated, isVerifying, ...rest} = props;

	const renderComponent: (props: RouteProps) => JSX.Element | boolean = (props) => (
		!isVerifying
		&& ((isAuthenticated && component)
			? React.createElement(component)
			: <Redirect
				to={{
					pathname: '/login',
					state: { from: props.location }
				}}
			/>)
	);

	return (
		<Route
			{...rest}
			render={renderComponent}
		/>
	);
};

export default ProtectedRoute;
