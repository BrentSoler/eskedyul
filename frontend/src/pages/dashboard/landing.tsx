const LandingPage = () => {
	return (
		<div>
			<div className="relative overflow-hidden bg-white h-[100vh]">
				<div className="mx-auto max-w-7xl">
					<div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
						<svg
							className="absolute inset-y-0 right-0 hidden h-[100vh] w-48 translate-x-1/2 transform text-white lg:block"
							fill="currentColor"
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<polygon points="50,0 100,0 50,100 0,100" />
						</svg>

						<div>
							<div className="relative px-4 pt-6 sm:px-6 lg:px-8">
								<nav
									className="relative flex items-center justify-between sm:h-10 lg:justify-start"
									aria-label="Global"
								></nav>
							</div>
						</div>

						<main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
							<div className="sm:text-center lg:text-left">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
									<span className="block text-[#1e40af] xl:inline text-[5rem]">E-SKEDYUL</span>
								</h1>
								<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
									E-Skedyul is an e-government website that aims to help the Office of Senior
									Citizens Affairs of Manila to organize and distribute the financial and goods
									assistances offered by the Office of Manila to its senior citizens.
								</p>
								<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
									<div className="mt-3 sm:mt-0 sm:ml-3">
										<a
											href="#learn-more"
											className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-[#1e40af] hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
										>
											Learn More
										</a>
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>

				<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
					<div className="carousel w-full h-full">
						{/* IMAGES TO CAROUSEL */}
						<div id="slide1" className="carousel-item relative w-full">
							<img
								className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
								src="/Osca-logo.jpg"
								alt=""
							/>
							<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
								<a href="#slide3" className="btn btn-circle">
									❮
								</a>
								<a href="#slide2" className="btn btn-circle">
									❯
								</a>
							</div>
						</div>
						<div id="slide2" className="carousel-item relative w-full">
							<img
								className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
								src="/lungsod-ng-maynila.jpg"
								alt=""
							/>
							<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
								<a href="#slide1" className="btn btn-circle">
									❮
								</a>
								<a href="#slide3" className="btn btn-circle">
									❯
								</a>
							</div>
						</div>

						<div id="slide3" className="carousel-item relative w-full">
							<img
								className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
								src="/osca-manila.jpg"
								alt=""
							/>
							<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
								<a href="#slide2" className="btn btn-circle">
									❮
								</a>
								<a href="#slide1" className="btn btn-circle">
									❯
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* PUT INFORMATION HERE */}

			<div className="bg-white py-12 h-[100vh] flex items-center" id="learn-more">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-lg font-semibold text-[#1e40af]">
							Office of Senior Citizen Affairs - Manila
						</h2>
						<p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
							Tanggapan ng mga Ugnayang Pangnakatandang Mamamayan
						</p>
						<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
							Rm. 115 Ground Floor, Manila City Hall Building
						</p>
					</div>

					<div className="mt-10">
						<dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
							<div className="relative">
								<dt>
									<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-[#1e40af] text-white">
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
											/>
										</svg>
									</div>
									<p className="ml-16 text-lg font-medium leading-6 text-gray-900">VISION</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									To provide quality service to our elderly and monitor compliance of the provision
									of RA 9994 particularly the grant of discounts and their privileges.
								</dd>
							</div>

							<div className="relative">
								<dt>
									<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-[#1e40af] text-white">
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
											/>
										</svg>
									</div>
									<p className="ml-16 text-lg font-medium leading-6 text-gray-900">BISYON</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									Magbigay ng kalidad na serbisyo sa mga nakatatanda at subaybayan ang pagtalima sa
									mga probisyon ng RA9994 lalo na ang pagkakaloob ng mga deskuwento at kanilang mga
									pribilehiyo.
								</dd>
							</div>

							<div className="relative">
								<dt>
									<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-[#1e40af] text-white">
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
											/>
										</svg>
									</div>
									<p className="ml-16 text-lg font-medium leading-6 text-gray-900">MISSION</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									To encourage active participation of the senior citizens in the affairs of the
									city giving unequivocal recognition to their outstanding contribution to the
									society.
								</dd>
							</div>

							<div className="relative">
								<dt>
									<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-[#1e40af] text-white">
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
											/>
										</svg>
									</div>
									<p className="ml-16 text-lg font-medium leading-6 text-gray-900">MISYON</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									Hikayatin ang aktibong pakikilahok ng mga senior citizen sa mga gawain ng lungsod
									bilang pagbibigay ng di-matatawarang pagkilala sa kanilang natatanging
									kontribusyon sa lipunan.
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
