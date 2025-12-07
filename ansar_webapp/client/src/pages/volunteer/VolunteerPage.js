import React from 'react';

const VolunteerPage = () => {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Volunteer With Us
					</h1>
					<p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
						Make a difference in your community by volunteering with Ansar
					</p>
				</div>
				
				{/* Volunteer Form Section */}
				<div className="mt-12 max-w-lg mx-auto">
					<form className="space-y-6">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
								Phone Number
							</label>
							<input
								type="tel"
								name="phone"
								id="phone"
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
						</div>

						<div>
							<label htmlFor="message" className="block text-sm font-medium text-gray-700">
								Message
							</label>
							<textarea
								name="message"
								id="message"
								rows={4}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default VolunteerPage;