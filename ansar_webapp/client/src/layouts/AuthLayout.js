import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	   <div className="w-full flex justify-center">
				<Link to="/">
					<img
						className="mx-auto h-16 w-auto"
						src="/images/logos/logo.png"
						alt="Ansar Relief"
					/>
				</Link>
			</div>

		   <div className="mt-8 w-full flex justify-center">
			   <div className="w-full bg-white py-8 px-4 shadow rounded-lg max-w-4xl">
				   <Outlet />
			   </div>
		   </div>
			
			<div className="mt-6 text-center text-sm text-gray-500">
				<p>© {new Date().getFullYear()} Ansar Relief. All rights reserved.</p>
			</div>
		</div>
	);
};

export default AuthLayout;