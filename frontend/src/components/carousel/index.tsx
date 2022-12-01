import { useEffect, useMemo } from "react";
import useAnnouncementController from "../Table/Annnouncements/announcementController"

const Carousel = () => {
	const controller = useAnnouncementController();
	const { data, isSuccess } = controller.getAnnouncements();
	const announcementData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				return data.data;
			}
			return "No Data";
		}
	}, [isSuccess, data]);

	useEffect(() => {
		console.log("Announcement", announcementData)
	}, [announcementData])

	return (
		<div className="carousel w-full pt-1 pb-5">
			{isSuccess && announcementData.map((data: any, i: number) => (
				<div
					id={`slide${i}`}
					className="carousel-item relative w-full grid place-items-center"
					key={i}
				>
					<div className="card w-[80%] shadow-xl z-0">

						<div className="card-body mb-5 mx-10 my-10 text-center">
							<h2 className="font-bold text-3xl text-secondary">{data.title}</h2>
							<p>{data.details}</p>
						</div>
					</div>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-999">
						<a
							href={`${i === 0 ? `#slide${announcementData.length - 1}` : `#slide${i - 1}`}`}
							className="btn btn-circle btn-primary	"
						>
							❮
						</a>
						<a
							href={`${announcementData.length - 1 === i ? `#slide${0}` : `#slide${i + 1}`}`}
							className="btn btn-circle btn-primary"
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
