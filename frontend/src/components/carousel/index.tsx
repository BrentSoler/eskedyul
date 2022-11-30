const mockData = [
	{
		title: "Announcement1",
		detail: "1",
	},
	{
		title: "Announcement2",
		detail: "2",
	},
];

const Carousel = () => {
	return (
		<div className="carousel w-full">
			{mockData.map((data, i) => (
				<div
					id={`slide${i}`}
					className="carousel-item relative w-full grid place-items-center"
					key={i}
				>
					<div className="card w-[80%] bg-base-100 shadow-xl image-full z-0">
						<figure>
							<div className="bg-gradient-to-r from-indigo-500 ..."></div>
						</figure>
						<div className="card-body m-5">
							<h2 className="font-bold text-3xl">{data.title}</h2>
							<p>{data.detail}</p>
						</div>
					</div>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-999">
						<a
							href={`${i === 0 ? `#slide${mockData.length - 1}` : `#slide${i - 1}`}`}
							className="btn btn-circle"
						>
							❮
						</a>
						<a
							href={`${mockData.length - 1 === i ? `#slide${0}` : `#slide${i + 1}`}`}
							className="btn btn-circle"
						>
							❯
						</a>
					</div>
				</div>
			))}
		</div>
	);
};

export default Carousel;
