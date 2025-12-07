import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ 
	trigger, 
	items, 
	align = 'left',
	width = 'auto',
	className = ''
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				closeDropdown();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const alignmentClasses = {
		left: 'left-0',
		right: 'right-0'
	};

	const widthClasses = {
		auto: 'min-w-[10rem]',
		sm: 'w-48',
		md: 'w-56',
		lg: 'w-64',
		full: 'w-full'
	};

	return (
		<div className={`relative inline-block ${className}`} ref={dropdownRef}>
			{/* Trigger */}
			<div onClick={toggleDropdown} className="cursor-pointer">
				{trigger || (
					<button className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
						Options <FaChevronDown className="ml-2" />
					</button>
				)}
			</div>

			{/* Dropdown menu */}
			{isOpen && (
				<div className={`absolute z-10 mt-2 ${alignmentClasses[align]} ${widthClasses[width]} bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
					<div className="py-1">
						{items.map((item, index) => (
							<div 
								key={index} 
								onClick={() => {
									if (item.onClick) {
										item.onClick();
										closeDropdown();
									}
								}}
								className={`${item.className || ''} ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'} block px-4 py-2 text-sm text-gray-700`}
							>
								{item.content}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

Dropdown.propTypes = {
	trigger: PropTypes.node,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			content: PropTypes.node.isRequired,
			onClick: PropTypes.func,
			className: PropTypes.string,
			disabled: PropTypes.bool
		})
	).isRequired,
	align: PropTypes.oneOf(['left', 'right']),
	width: PropTypes.oneOf(['auto', 'sm', 'md', 'lg', 'full']),
	className: PropTypes.string
};

export default Dropdown;