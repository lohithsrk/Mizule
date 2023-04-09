import React from 'react';
import { Link } from 'react-router-dom';

import PlayStore from '../assets/playstore.png';
import AppStore from '../assets/appstore.svg';
import HeroPNG from '../assets/landing-page/hero.png';

import Footer from '../components/Footer.component';

const Landing = ({ user }) => {
	return (
		<>
			<section className='w-full h-screen flex-col md:flex-row flex items-center justify-center'>
				<div className='w-4/5 sm:w-4/6 md:mr-14 md:max-w-[450px] text-center flex flex-col items-center'>
					<h1 className='text-white text-4xl sm:text-5xl mb-4 md:ml-2 font-Monoton'>
						MIZULE
					</h1>
					<h2 className='text-white text-2xl sm:text-2xl md:ml-2 uppercase font-Righteous'>
						Zuling platform for <br />
						zuled creativity
					</h2>
					<p className='text-gray-300 mt-6 md:ml-2 text-justify'>
						Mizule is an amazing platform that allows Zulists to showcase their
						creative talent and create stunning visuals that will surely wow any
						audience.
					</p>
					<div className='max-w-max'>
						<p className='text-gray-300 mt-7 md:ml-2'>Get Mizule from</p>
						<div className='flex items-center justify-center'>
							<a
								href='https://play.google.com/store/apps/details?id=com.mizule'
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src={PlayStore}
									alt='playstore'
									className='w-[8rem] md:w-[10rem]'
								/>
							</a>
							<a href='/'>
								<img src={AppStore} alt='appstore' className='w-32' />
							</a>
						</div>
						<div className='w-full flex items-center gap-2 mt-3'>
							<div className='w-full h-[1px] bg-white/50'></div>
							<span className='text-white text-xs'>OR</span>
							<div className='w-full h-[1px] bg-white/50'></div>
						</div>
						<Link to={user ? `/${user.name}` : '/signin'}>
							<div className='bg-gradient-to-tr from-[#BF1363] to-[#0F62BA] rounded-md shadow-md mt-5 text-white p-3 w-full'>
								Continue with Mizule Web
							</div>
						</Link>
					</div>
				</div>
				<img src={HeroPNG} alt='mizule' className='w-56 hidden md:block' />
			</section>
			<section className='relative w-full flex items-center justify-center text-center sm:text-left'>
				<div className='relative w-4/5'>
					<h1 className='text-white text-4xl mb-4 font-Monoton'>ZULE</h1>
					<p className='text-gray-300 text-justify'>
						Zule is a new form of videography that is gaining popularity among
						artists and filmmakers. It combines elements of traditional
						filmmaking with modern technology to create unique visual
						experiences. Zule allows an artist to express their creativity in a
						way that has never been seen before. It is a combination of
						different techniques such as stop motion, time-lapse, and drone
						videography.
					</p>
					<h1 className='text-white text-4xl mb-4 mt-16 font-Monoton'>
						ZULIST
					</h1>
					<p className='text-gray-300 text-justify'>
						Zulists can show off their talent and creativity, creating amazing
						visuals that are sure to impress. Furthermore, Zule allows for
						endless possibilities when it comes to creating one-of-a-kind pieces
						of art. With Zule, Zulists can share their work with others and have
						it seen by a wide audience. It's the perfect way for creatives to
						showcase their skills and express themselves in the digital world.
					</p>
				</div>
			</section>
			<section className='w-full md:h-[60vh] flex flex-col md:flex-row items-center justify-center mt-48'>
				<div className='flex flex-col md:flex-row md:w-4/5 items-center justify-center'>
					<div className='w-4/5 md:mr-10'>
						<h1 className='text-white text-3xl md:text-4xl sm:text-4xl mb-4'>
							Opportunities
						</h1>
						<h2 className='text-white text-2xl md:text-3xl mb-3 uppercase'>
							Wanna become a Zulist?
						</h2>
						<p className='text-gray-300 text-justify'>
							Mizule is an online platform that provides aspiring actors and
							filmmakers with the opportunity to gain fame in the film industry.
							It helps them to hone their acting skills and create a portfolio
							of their work. With Mizule, you can get access to various
							resources such as experienced mentors, casting directors, and film
							festivals. You can also showcase your talent to a larger audience
							and increase your visibility in the industry.
						</p>
					</div>
					<div className='bg-white bg-opacity-10 rounded-3xl mt-8 md:ml-10 p-10 text-white w-4/5'>
						<h2 className='text-white text-2xl uppercase'>Grab your chance!</h2>
						<form className='shadow-md'>
							<div className='flex mt-3 gap-3 mb-2'>
								<div className='w-full'>
									<label htmlFor='firstName' className='mb-2 uppercase'>
										First name
									</label>
									<input
										type='text'
										name='firstName'
										id='firstName'
										className='bg-transparent block outline-none border-2 border-white/25 focus:border-white/100 rounded-md w-full mt-1 px-2 py-1 shadow-md'
									/>
								</div>
								<div className='w-full'>
									<label htmlFor='lastName' className='uppercase mb-2'>
										Last name
									</label>
									<input
										type='text'
										name='lastName'
										id='lastName'
										className='bg-transparent block outline-none border-2 border-white/25 focus:border-white/100 rounded-md w-full mt-1 px-2 py-1 shadow-md'
									/>
								</div>
							</div>
							<div className='mb-2'>
								<label htmlFor='email' className='mb-2 uppercase'>
									Email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-transparent block outline-none border-2 border-white/25 focus:border-white/100 rounded-md w-full mt-1 px-2 py-1 shadow-md'
								/>
							</div>
							<div className='mb-2'>
								<label htmlFor='phoneNumber' className='mb-2 uppercase'>
									Phone Number
								</label>
								<input
									type='text'
									name='phoneNumber'
									id='phoneNumber'
									className='bg-transparent block outline-none border-2 border-white/25 focus:border-white/100 rounded-md w-full mt-1 px-2 py-1 shadow-md'
								/>
							</div>
							<div className='mb-2'>
								<label htmlFor='workLink' className='mb-2 uppercase'>
									Previous work link
								</label>
								<input
									type='url'
									name='workLink'
									id='workLink'
									className='bg-transparent block outline-none border-2 border-white/25 focus:border-white/100 rounded-md w-full mt-1 px-2 py-1 shadow-md'
								/>
							</div>
							<button className='w-full p-2 bg-gradient-to-r from-[#BF1363] to-[#0F62BA] rounded-md mt-2 shadow-md uppercase'>
								Catch up
							</button>
						</form>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Landing;
