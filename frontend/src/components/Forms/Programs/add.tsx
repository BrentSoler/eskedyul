import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import md5 from "md5";
import useFormController from "./formController";
import { toast } from "react-toastify";
import Link from "next/link";

const AddForm = () => {
	const [programData, setProgramData] = useState({
		id: "",
		name: "",
		details: "",
		view: "",
		qualification: "",
		type: "",
	});
	const controller = useFormController(programData.id);
	const [schedData, setSchedData] = useState({
		startTime: "",
		endTime: "",
		date: "",
		location: "",
		programId: "",
	});

	const { data, isSuccess } = controller.getSchedule(programData.id);

	useEffect(() => {
		setProgramData((data) => ({ ...data, id: md5(new Date().toString()) }));
	}, []);
	useEffect(() => {
		if (programData.id !== "") {
			controller.postProgram(
				{
					id: programData.id,
					name: "Editing",
					details: "Editing",
					view: "All",
					qualification: "6months of Residency",
					type: "Goods Aid",
				},
				"First"
			);
		}
	}, [programData.id]);

	function submitSched() {
		schedData.programId = programData.id;

		controller.postSched(schedData);
	}

	async function submitProgram(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (data.data === "No Data") {
			toast.error("Provide a Schedule");
			return;
		}

		await controller.postProgram({ ...programData, status: "Pending" }, "Main");
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[30rem] rounded-md">
			<form className="w-full flex flex-col" onSubmit={submitProgram}>
				<h1>Name <span className = "text-red-600">*</span></h1>
				<input
					type="text"
					name="name"
					placeholder="Name"
					autoComplete="off"
					className="input input-bordered w-full"
					value={programData.name}
					onChange={(e) => handleChange(e, setProgramData)}
				/>

				<h1>Details <span className = "text-red-600">*</span></h1>
				<textarea
					name="details"
					placeholder="Details"
					className="input input-bordered w-full pt-3 min-h-[5rem]"
					value={programData.details}
					onChange={(e) => handleChange(e, setProgramData)}
				/>

				<h1>View <span className = "text-red-600">*</span></h1>
				<select
					className="select select-bordered w-full "
					name="view"
					value={programData.view}
					onChange={(e) => handleChange(e, setProgramData)}
				>
					<option value="--Please select one--" selected hidden>--Please select one--</option>
					<option value="All">All</option>
					<option value="Brgy. Admin">Brgy. Admin</option>
					<option value="Admin">Admin</option>
					<option value="Master Admin">Master Admin</option>
				</select>

				<h1>Qualification <span className = "text-red-600">*</span></h1>
				<select
					className="select select-bordered w-full "
					name="qualification"
					value={programData.qualification}
					onChange={(e) => handleChange(e, setProgramData)}
				>
					<option value="--Please select one--" selected hidden>--Please select one--</option>
					<option value="6months of Residency">6months of Residency</option>
					<option value="Registered Voter">Registered Voter</option>
				</select>

				<h1>Type <span className = "text-red-600">*</span></h1>
				<select
					className="select select-bordered w-full"
					name="type"
					value={programData.type}
					onChange={(e) => handleChange(e, setProgramData)}
				>
					<option value="--Please select one--" selected hidden>--Please select one--</option>
					<option value="Goods Aid">Goods Aid</option>
					<option value="Financial Aid">Financial Aid</option>
					<option value="Goods & Financial Aid">Goods & Financial Aid</option>
				</select>

				<div className="divider">Add Schedule</div>
				<div className="flex gap-3">
					<div>
						<h1>Location <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							name="location"
							placeholder="Location"
							autoComplete="off"
							className="input input-bordered w-full"
							value={schedData.location}
							onChange={(e) => handleChange(e, setSchedData)}
						/>
					</div>
					<div>
						<h1>Start Time <span className = "text-red-600">*</span></h1>
						<input
							type="time"
							name="startTime"
							autoComplete="off"
							className="input input-bordered w-full"
							value={schedData.startTime}
							onChange={(e) => handleChange(e, setSchedData)}
						/>
					</div>
					<div>
						<h1>End Time <span className = "text-red-600">*</span></h1>
						<input
							type="time"
							name="endTime"
							autoComplete="off"
							className="input input-bordered w-full"
							value={schedData.endTime}
							onChange={(e) => handleChange(e, setSchedData)}
						/>
					</div>
				</div>
				<div className="flex items-end gap-7">
					<div className="w-full">
						<h1>Date <span className = "text-red-600">*</span></h1>
						<input
							type="date"
							name="date"
							min = "2022-12-13"
							autoComplete="off"
							className="input input-bordered w-full"
							value={schedData.date}
							onChange={(e) => handleChange(e, setSchedData)}
						/>
					</div>
					<a href="#addModal" className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
						Add
					</a>
						<div className="modal" id="addModal">
						<div className="modal-box">
							<p className="py-4">Are you sure that all the data are correct and valid?</p>
							<div className="modal-action">
								<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">Back</a>
								<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" onClick={submitSched} type="button">
									Confirm
								</button>
							</div>
						</div>
						</div>
					</div>
				<div className="divider">Schedules</div>
				{isSuccess && data.data !== "No Data" ? (
					data.data.map((sched: any) => (
						<div key={sched.id}>
							<div className="flex justify-between items-center">
								<div>
									<h1 className="font-bold text-lg">Location: {sched.location}</h1>
									<h1 className="font-light">Date: {sched.date}</h1>
									<h1 className="font-light text-sm">
										Time: {sched.startTime} - {sched.endTime}
									</h1>
								</div>
								<input type="checkbox" id={sched.id} className="modal-toggle" />
											<div className="modal" id={sched.id}>
												<div className="modal-box">
													<p className="py-4">Are you sure that you want to delete this record?</p>
													<div className="modal-action">
														<label
															htmlFor={sched.id}
															className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max"
														>
															Back
														</label>
														<button
															className="btn-primary mt-10 rounded-lg py-2 px-3 w-max"
															type="submit"
															onClick={() => controller.deleteSched(sched.id)}
														>
															Confirm
														</button>
													</div>
												</div>
											</div>

											<label htmlFor={sched.id} className="btn btn-ghost">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</label>
							</div>
							<div className="divider"></div>
						</div>
					))
				) : (
					<>
						<h1>No Schedules</h1>
						<div className="divider"></div>
					</>
				)}
				<div className="flex gap-3">
					<Link href={`/dashboard/programs`}>
						<button className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
							Back
						</button>
					</Link>
				<a href="#confirmModal" className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
						Submit
					</a>
						<div className="modal" id="confirmModal">
						<div className="modal-box">
							<p className="py-4">Are you sure that all the data are correct and valid?</p>
							<div className="modal-action">
								<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">Back</a>
								<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
									Confirm
								</button>
							</div>
						</div>
						</div>
					</div>
			</form>
		</div>
	);
};

export default AddForm;
