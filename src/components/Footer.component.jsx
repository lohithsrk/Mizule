import React from 'react';

const Footer = () => {
	return (
		<section className='w-full relative'>
			<div className='absolute left-0 right-0 bottom-0 z-10 flex flex-col items-center justify-end w-full h-full'>
				<form className='flex p-2 bg-white bg-opacity-10 w-1/4 rounded-md backdrop-blur-md'>
					<input
						type='text'
						name='newsletter'
						placeholder='Sign up for newsletter'
						className='bg-transparent block outline-none border-2 border-white/25 focus:border-white/100 rounded-md w-full px-2 py-1 shadow-md'
					/>
					<button className='rounder bg-gradient-to-tr from-[#ff0077] to-[#007bff] p-2 ml-2 rounded-md'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 text-white'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
							/>
						</svg>
					</button>
				</form>
				<p className='my-5 text-white'>Mizule copyright 2023</p>
			</div>
			<svg
				width='100%'
				height='100%'
				id='svg'
				viewBox='0 0 1440 400'
				xmlns='http://www.w3.org/2000/svg'
				className='transition duration-300 ease-in-out delay-150 scale-y-75 origin-bottom'
			>
				<defs>
					<linearGradient id='gradient' x1='0%' y1='43%' x2='100%' y2='57%'>
						<stop offset='5%' stopColor='#0f62bab3'></stop>
						<stop offset='95%' stopColor='#bf1363b3'></stop>
					</linearGradient>
				</defs>
				<path
					d='M 0,400 C 0,400 0,200 0,200 C 52.71449694449805,157.63927546266373 105.4289938889961,115.27855092532747 152,129 C 198.5710061110039,142.72144907467253 238.99852138851355,212.52507176135387 278,207 C 317.00147861148645,201.47492823864613 354.57692055694963,120.62116202925705 392,125 C 429.42307944305037,129.37883797074295 466.6937963836882,218.990280121618 511,256 C 555.3062036163118,293.009719878382 606.6478939082978,277.41771748427095 656,263 C 705.3521060917022,248.58228251572908 752.7146279831207,235.33884994129826 802,243 C 851.2853720168793,250.66115005870174 902.4935941592191,279.2268827505361 940,254 C 977.5064058407809,228.7731172494639 1001.3109953800031,149.7536190565573 1041,138 C 1080.689004619997,126.24638094344269 1136.2624243207683,181.7586410232346 1185,188 C 1233.7375756792317,194.2413589767654 1275.6393073369231,151.21181685050442 1317,145 C 1358.3606926630769,138.78818314949558 1399.1803463315384,169.3940915747478 1440,200 C 1440,200 1440,400 1440,400 Z'
					stroke='none'
					strokeWidth='0'
					fill='url(#gradient)'
					fillOpacity='1'
					className='transition-all duration-300 ease-in-out delay-150 path-0'
				></path>
			</svg>
		</section>
	);
};

export default Footer;
