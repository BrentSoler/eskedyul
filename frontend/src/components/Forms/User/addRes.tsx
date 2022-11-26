import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import { toast } from "react-toastify";
import useFormController from "./formController";
import Link from "next/link";
const AddRes = () => {
	const [data, setData] = useState({
		role: "Resident",
		fname: "",
		mname: "",
		lname: "",
		suffix: "",
		sex: "",
		mobileNo: "",
		presAdd: "",
		permAdd: "",
		brgyId: "",
		idType: "",
		idNo: "",
	});
	const [residentData, setResidentData] = useState({
		seniorType: "",
		emgContNum: "",
		emgContName: "",
		civilStatus: "",
		birthdate: "",
		birthPlace: "",
		empStatus: "",
		residencyStatus: "",
		OSCAId: "",
	});
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();

	useEffect(() => {
		setData((data) => ({ ...data, brgyId: brgyId }));
	}, [brgyId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (residentData.seniorType === "OLD" && !residentData.OSCAId) {
			toast.error("Add an OSCAID");
			return;
		}

		controller.postResident(data, residentData);
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[50rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>First Name:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="fname"
							value={data.fname}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Middle Name:</h1>
						<input
							type="text"
							name="mname"
							value={data.mname}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="w-full">
						<h1>Last Name:</h1>
						<input
							type="text"
							name="lname"
							value={data.lname}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Suffix</h1>
						<select
							className="select select-bordered w-full "
							name="suffix"
							value={data.suffix}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="jr">jr</option>
							<option value="Jr.">Jr.</option>w2
							<option value="II">II</option>
							<option value="III">III</option>
							<option value="None">None</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Sex:</h1>
						<select
							className="select select-bordered w-full"
							name="sex"
							value={data.sex}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Mobile No:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="mobileNo"
							value={data.mobileNo}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Present Address:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="presAdd"
							value={data.presAdd}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Permanent Address:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="permAdd"
							value={data.permAdd}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>ID Type:</h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Passport">Passport</option>
							<option value="Birth Certificate">Birth Certificate</option>
							<option value="Police Clearance">Police Clearance</option>
							<option value="NBI">NBI</option>
							<option value="Voters ID">Voters ID</option>
							<option value="National ID">National ID</option>
							<option value="SSSID">SSSID</option>
							<option value="PHILHEALTH">PHILHEALTH</option>
						</select>
					</div>
					<div className="w-full">
						<h1>ID No:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="idNo"
							value={data.idNo}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="divider"></div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Senior Type:</h1>
						<select
							className="select select-bordered w-full "
							name="seniorType"
							value={residentData.seniorType}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value=""></option>
							<option value="OLD">OLD</option>
							<option value="NEW">NEW</option>
						</select>
					</div>
					{residentData.seniorType === "OLD" && (
						<div className="w-full">
							<h1>OSCA ID:</h1>
							<input
								type="text"
								className="input input-bordered w-full"
								name="OSCAId"
								value={residentData.OSCAId}
								onChange={(e) => handleChange(e, setResidentData)}
							/>
						</div>
					)}
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Civil Status:</h1>
						<select
							className="select select-bordered w-full "
							name="civilStatus"
							value={residentData.civilStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value=""></option>
							<option value="Single">Single</option>
							<option value="Married">Married</option>
							<option value="Widow">Widow</option>
							<option value="Divorce">Divorce</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Emergency Contact Name:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="emgContName"
							value={residentData.emgContName}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
					<div className="w-full">
						<h1>Emergency Contact No:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="emgContNum"
							value={residentData.emgContNum}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Birth Date:</h1>
						<input
							type="date"
							className="input input-bordered w-full"
							name="birthdate"
							value={residentData.birthdate}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
					<div className="w-full">
						<h1>Birth Place:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="birthPlace"
							value={residentData.birthPlace}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="w-full">
						<h1>Employment Status:</h1>
						<select
							className="select select-bordered w-full "
							name="empStatus"
							value={residentData.empStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value=""></option>
							<option value="Employed">Employed</option>
							<option value="Retired w/ pension">Retired w/ pension</option>
							<option value="Retired wo/ pention">Retired wo/ pension</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Residency Status:</h1>
						<select
							className="select select-bordered w-full "
							name="residencyStatus"
							value={residentData.residencyStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value=""></option>
							<option value="6months of Residency">6months of Residency</option>
							<option value="Registered Voter">Registered Voter</option>
						</select>
					</div>
				</div>

				<div className="form-control">
					<label className="cursor-pointer label">
						<input type="checkbox" className="checkbox checkbox-primary" id="agreement" required />
						<label> I have <b>read</b>,
							<b> understood</b>, and
							<b> accepted </b>the
							<label htmlFor="privacyPolicy" className="text-primary"> Privacy Policy </label>
							and
							<label htmlFor="termsCondition" className="text-primary"> Terms & Conditions </label>
						</label>
					</label>
				</div>

				<input type="checkbox" id="privacyPolicy" className="modal-toggle" />
				<div className="modal">
					<div className="modal-box w-11/12 max-w-5xl">
						<h3 className="font-bold text-lg ">PRIVACY POLICY</h3>
						<p className="py-4">POLICY ON CONSENSUAL DATA COLLECTION OF PERSONAL INFORMATION </p>
						<p className="py-2 text-jusitfy">
							The digital platform of Manila City, ESKEDYUL: An E-Government Financial and Goods Assistance
							Transparency Website, is a collection of systems with functionality for monitoring, tracking, and
							request that will make claiming of financial aid or “ayuda” easier and hassle free. This system will
							guide them when it comes to the process that they will take in order to view their status online
							rather than to go directly to their local municipality just to know their status, it will also help
							them to receive their cash assistance by just requesting an E-Payment method, and they can also use
							the online appointment to claim their goods. The system, which is made available on desktop and
							mobile devices, intends to cater all the needy people when it comes to receiving their cash
							assistance and goods because this system will be open to all who will register from the system may
							it be in claiming their goods or cash assistance, and with great resources and developments, the
							developers ensure that these measures will be a huge leap for fair and fast distributions.

							As a result, we will only need what is absolutely necessary for the system to function. Before users
							agree to the terms and conditions and our privacy policy and provide their approval, no information
							will be gathered from them. If someone chooses to use our service, they will be informed of our
							policies regarding the collection, use, and disclosure of personal information via this page.

							Legitimate reasons that have been decided upon and declared prior to or as soon as is practically
							practicable after collection are the only purposes for which we gather personal data.

							The users whole disclosure of information will be held in full confidentiality and used only for
							study. In accordance with the Data Privacy Act of 2012, the developers will not utilize any of the
							information that the users provide for direct marketing or other non-research purposes.

							These applications along with other connected web applications, are part of the E-SKEDYUL Platform
							and are primarily designed for the assistance distribution, monitoring and transparency.
						</p>
						<div className="modal-action">
							<label htmlFor="privacyPolicy" className="btn btn-primary">Okay</label>
						</div>
					</div>
				</div>

				<input type="checkbox" id="termsCondition" className="modal-toggle" />
				<div className="modal">
					<div className="modal-box w-11/12 max-w-5xl">
						<h3 className="font-bold text-lg ">TERMS & CONDTIONS</h3>
						<p className="py-2 text-jusitfy">
							I hereby authorize the Office of Senior Affairs City of Manila, to collect and process the data
							indicated herein to properly distribute the financial or goods aid by providing schedules and programs
							and other relevant steps to ensure a transparent distribution. I understand that my personal information
							is protected by RA 10173, Data Privacy Act of 2012, and that I am required by RA 11469, Bayanihan
							Heal as One Act, to provide truthful information.

							Pinahihintulutan ko ang Tanggapan ng mga Ugnayang Pangnakatandang Mamamayan Lungsod ng Taguig upang
							mangolekta at iproseso ang datos na ipinahihiwatig dito upang maayos na mapamigay ang mga ayuda sa
							pamamagitan ng pagbibigay ng mga iskedyul at programa at iba pang hakbang upang maisigurado ang isang
							malinis na distribusyon ng ayuda. Naiintindihan ko na ang aking personal na impormasyon ay protektado
							ng RA 10173 o Data Privacy Act of 2012, at ako ay tatalima sa RA 11469 o ang Bayanihan Heal as One
							Act, upang magbigay ng makatotohanang impormasyon.
						</p>
						<div className="modal-action">
							<label htmlFor="termsCondition" className="btn btn-primary">Okay</label>
						</div>
					</div>
				</div>

				<div>
					<Link href={`/dashboard/users`}>
						<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-start" type="submit">
							Back
						</button>
					</Link>
					<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddRes;
