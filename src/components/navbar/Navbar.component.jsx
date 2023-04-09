import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo-silver-png.png';
import { navData, zulistNavData } from './nav.data';

const Navbar = ({ user }) => {
	return (
		<nav className='w-full z-50 fixed top-0 bg-black bg-opacity-20 text-white'>
			<div className='max-w-[1280px] flex items-center justify-between mx-auto py-4 px-10'>
				<Link to='/'>
					<img src={Logo} alt='Mizule' className='w-28' />
				</Link>
				<ul className='flex uppercase items-center gap-5'>
					{!user
						? navData.map((nav, i) => (
								<li className='mx-1' key={i}>
									<Link
										to={nav.link}
										className='p-1 walk-through relative active'
									>
										{nav.title}
									</Link>
								</li>
						  ))
						: zulistNavData(user).map((nav, i) => (
								<li className='mx-1' key={i}>
									<Link
										to={nav.link}
										className='p-1 walk-through relative active'
									>
										{nav.title}
									</Link>
								</li>
						  ))}
				</ul>
			</div>
		</nav>
	);
};

const MobileNav = ({ user }) => {
	const [active, setActive] = useState(false);

	return (
		<nav className='w-full z-10 fixed top-0 bg-white bg-opacity-10 backdrop-blur-sm text-white flex items-center justify-between px-6 py-3'>
			<Link to='/'>
				<img src={Logo} alt='Mizule' className='w-28' />
			</Link>
			<div>
				<img
					src='https://img.icons8.com/ios-filled/50/ffffff/menu-rounded.png'
					width='24'
					onClick={() => setActive(!active)}
					alt='menu'
				/>
			</div>
			<div
				className={`absolute -z-10 h-screen top-0 left-0 right-0 bottom-0 bg-[#191923] nav transition-all ${
					active ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<ul className='flex flex-col pt-16 uppercase items-start p-6'>
					{!user
						? navData.map((nav) => (
								<li className='mb-3'>
									<Link
										to={nav.link}
										className='p-1 walk-through relative active text-2xl font-Righteous'
									>
										{nav.title}
									</Link>
								</li>
						  ))
						: zulistNavData(user).map((nav) => (
								<li className='mb-3'>
									<Link
										to={nav.link}
										className='p-1 walk-through relative active text-2xl font-Righteous'
									>
										{nav.title}
									</Link>
								</li>
						  ))}
				</ul>
			</div>
		</nav>
	);
};

export default window.innerWidth > 640 ? Navbar : MobileNav;
