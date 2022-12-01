import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Carousel from "../../components/carousel";
import StatsContainer from "../../components/Stats/container";
import AuthStore from "../../store/authStore";

const Dahsboard = () => {
	const router = useRouter();
	const privRef = useRef<HTMLAnchorElement | null>(null);
	const termsRef = useRef<HTMLAnchorElement | null>(null);
	const token = AuthStore((state) => state.userData.token);
	const stop = AuthStore((state) => state.privacyHandler);
	const privacy = AuthStore((state) => state.privacyStop);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	useEffect(() => {
		if (privRef.current && !privacy) {
			privRef.current.click();
		}
	}, [privRef, termsRef]);
	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Dashboard</h1>
			</div>
			<Carousel />
			<StatsContainer />
			<>
				<a href="#my-modal-2" className="btn hidden" ref={privRef}>
					open modal
				</a>

				<div className="modal" id="my-modal-2">
					<div className="modal-box">
						<p className="py-4">
							<h3 className="font-bold text-lg ">PRIVACY POLICY</h3>
							<p className="py-4">POLICY ON CONSENSUAL DATA COLLECTION OF PERSONAL INFORMATION </p>
							<p className="py-2 text-jusitfy">
								The digital platform of Manila City, ESKEDYUL: An E-Government Financial and Goods
								Assistance Transparency Website, is a collection of systems with functionality for
								monitoring, tracking, and request that will make claiming of financial aid or
								“ayuda” easier and hassle free. This system will guide them when it comes to the
								process that they will take in order to view their status online rather than to go
								directly to their local municipality just to know their status, it will also help
								them to receive their cash assistance by just requesting an E-Payment method, and
								they can also use the online appointment to claim their goods. The system, which is
								made available on desktop and mobile devices, intends to cater all the needy people
								when it comes to receiving their cash assistance and goods because this system will
								be open to all who will register from the system may it be in claiming their goods
								or cash assistance, and with great resources and developments, the developers ensure
								that these measures will be a huge leap for fair and fast distributions. As a
								result, we will only need what is absolutely necessary for the system to function.
								Before users agree to the terms and conditions and our privacy policy and provide
								their approval, no information will be gathered from them. If someone chooses to use
								our service, they will be informed of our policies regarding the collection, use,
								and disclosure of personal information via this page. Legitimate reasons that have
								been decided upon and declared prior to or as soon as is practically practicable
								after collection are the only purposes for which we gather personal data. The users
								whole disclosure of information will be held in full confidentiality and used only
								for study. In accordance with the Data Privacy Act of 2012, the developers will not
								utilize any of the information that the users provide for direct marketing or other
								non-research purposes. These applications along with other connected web
								applications, are part of the E-SKEDYUL Platform and are primarily designed for the
								assistance distribution, monitoring and transparency.
							</p>
						</p>
						<div className="modal-action">
							<a href="#my-modal-3" className="btn">
								I Accept
							</a>
						</div>
					</div>
				</div>
			</>

			<>
				<a href="#my-modal-3" className="btn hidden" ref={termsRef}>
					open modal
				</a>

				<div className="modal" id="my-modal-3">
					<div className="modal-box">
						<h3 className="font-bold text-lg ">TERMS & CONDTIONS</h3>
						<p className="py-2 text-jusitfy">
							I hereby authorize the Office of Senior Affairs City of Manila, to collect and process
							the data indicated herein to properly distribute the financial or goods aid by
							providing schedules and programs and other relevant steps to ensure a transparent
							distribution. I understand that my personal information is protected by RA 10173, Data
							Privacy Act of 2012, and that I am required by RA 11469, Bayanihan Heal as One Act, to
							provide truthful information. Pinahihintulutan ko ang Tanggapan ng mga Ugnayang
							Pangnakatandang Mamamayan Lungsod ng Taguig upang mangolekta at iproseso ang datos na
							ipinahihiwatig dito upang maayos na mapamigay ang mga ayuda sa pamamagitan ng
							pagbibigay ng mga iskedyul at programa at iba pang hakbang upang maisigurado ang isang
							malinis na distribusyon ng ayuda. Naiintindihan ko na ang aking personal na
							impormasyon ay protektado ng RA 10173 o Data Privacy Act of 2012, at ako ay tatalima
							sa RA 11469 o ang Bayanihan Heal as One Act, upang magbigay ng makatotohanang
							impormasyon.
						</p>
						<div className="modal-action">
							<a href="#" className="btn" onClick={() => stop()}>
								I Accept
							</a>
						</div>
					</div>
				</div>
			</>
		</div>
	);
};

export default Dahsboard;
