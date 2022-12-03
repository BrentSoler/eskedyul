import AuthStore from "../../store/authStore";
import Link from "next/link";

const Stats = ({
	name,
	detail,
	type,
	pending,
	qualification,
	complete,
	status,
	cancel,
}: {
	name: string;
	detail: string;
	qualification: string;
	status: string;
	type: string;
	pending: string;
	complete: string;
	cancel: string;
}) => {
	const role = AuthStore((state) => state.userData.role);
	return (
		<div className="stats shadow ">
			<div className="stat w-[25rem]">
				<div className="stat-figure text-secondary w-full">
					<label htmlFor={name} className="btn modal-button btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
					</label>
					<input type="checkbox" id={name} className="modal-toggle" />
					<div className="modal">
						<div className="modal-box">
							<h3 className="font-bold text-lg">{name}</h3>
							<p className="py-1">Details: {detail}</p>
							<p className="py-1">Type: {type}</p>
							<p className="py-1">Qualification: {qualification}</p>
							<p className="py-1">Status: {status}</p>
							<div className="modal-action">
								<label htmlFor={name} className="btn btn-sm btn-circle absolute right-2 top-2">
									✕
								</label>
								{role === "Brgy. Admin" && (
									<Link href="/dashboard/transactions/add" className="btn btn-primary">
										<a className="btn">APPLY</a>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* <div className="stat-title">Program</div> */}
				<div className ="tooltip tooltip-bottom" data-tip= {name}>
					<div className="stat-value truncate" >{name}</div>
				</div>
			</div>

			<div className="stat">
				<div className="stat-figure text-secondary">
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
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
				</div>
				<div className="stat-title">Pending</div>
				<div className="stat-value text-secondary">{pending}</div>
			</div>

			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
				</div>
				<div className="stat-title">Completed</div>
				<div className="stat-value text-accent">{complete}</div>
			</div>

			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
				<div className="stat-title">Cancelled</div>
				<div className="stat-value text-error">{cancel}</div>
			</div>
		</div>
	);
};

export default Stats;
