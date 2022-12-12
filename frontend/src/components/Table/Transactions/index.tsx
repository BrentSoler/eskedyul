import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useTransactionController from "./transactionController";
import getStatusColor from "../../../hooks/useStatusColor";
import ReactPaginate from "react-paginate";
import useFormController from "../../Forms/Transaction/formController";

const TransactionTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useTransactionController();
	const role = AuthStore((state) => state.userData.role);
	const [id, setID] = useState();
	const { data, isSuccess, isLoading, refetch } = controller.getTransaction(brgyId);

	const [searchFilter, setSearchFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sort, setSort] = useState("asc");
	const [sortBy, setSortBy] = useState("name");

	const formController = useFormController();

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				const sorted = data.data.sort((a: any, b: any) => {
					if (sortBy === "name") {
						return sort === "asc"
							? a.residents.users.lname.localeCompare(b.residents.users.lname)
							: -a.residents.users.lname.localeCompare(b.residents.users.lname);
					}
					if (sortBy === "program") {
						return sort === "asc"
							? a.program.name.localeCompare(b.program.name)
							: -a.program.name.localeCompare(b.program.name);
					}
					if (sortBy === "date") {
						return sort === "asc"
							? new Date(a.schedule.date).valueOf() - new Date(b.schedule.date).valueOf()
							: new Date(b.schedule.date).valueOf() - new Date(a.schedule.date).valueOf();
					}
				});

				const statusSort = sorted.filter((d: any) => {
					return d.status.includes(statusFilter);
				});

				const fnameSort = statusSort.filter((d: any) =>
					d.residents.users.fname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mnameSort = statusSort.filter((d: any) =>
					d.residents.users.mname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const lnameSort = statusSort.filter((d: any) =>
					d.residents.users.lname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const programNameSort = statusSort?.filter((d: any) =>
					d.program.name.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const locationSort = statusSort.filter((d: any) =>
					d.schedule.location.toLowerCase().includes(searchFilter.toLowerCase())
				);
				let brgyIdSort = [];
				if (role === "Master Admin") {
					brgyIdSort = statusSort?.filter((d: any) =>
						d.brgyId.toString().includes(searchFilter.toString())
					);
				}

				return searchFilter === ""
					? statusSort
					: [
							...new Set([
								...fnameSort,
								...mnameSort,
								...lnameSort,
								...programNameSort,
								...locationSort,
								...brgyIdSort,
							]),
					  ].length > 0
					? [
							...new Set([
								...fnameSort,
								...mnameSort,
								...lnameSort,
								...programNameSort,
								...locationSort,
								...brgyIdSort,
							]),
					  ]
					: "No Results Found";
			}
			return "No Data";
		}
	}, [data, isSuccess, searchFilter, statusFilter, sort]);

	//PAGINATION
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;
	const endOffset = itemOffset + itemsPerPage;
	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	console.log("check 1", handleFilteredData);
	let currentItems: any[] = [];
	let pageCount = 0;
	if (isSuccess === true && handleFilteredData !== "No data") {
		currentItems = handleFilteredData.slice(itemOffset, endOffset);
		pageCount = Math.ceil(handleFilteredData.length / itemsPerPage);
	}
	// Changing page
	//@ts-ignore
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % handleFilteredData.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};
	return (
		<>
			<div className="flex gap-3">
				<input
					placeholder={`Search Name, ${
						role === "Master Admin" ? "Barangay ID," : ""
					} Program Name or Location.`}
					type="text"
					onChange={(e) => {
						setSearchFilter(e.target.value);
					}}
					value={searchFilter}
					className="input input-bordered w-full mt-3"
				/>
				<label className="flex items-center"> Status </label>
				<select
					placeholder="Status"
					onChange={(e) => {
						setStatusFilter(e.target.value);
					}}
					value={statusFilter}
					className="input input-bordered w-full mt-3"
				>
					<option value="--Please select one--" selected hidden>
						--Please select one--
					</option>
					<option value="Pending">Pending</option>
					<option value="Completed">Completed</option>
					<option value="Cancelled">Cancelled</option>
				</select>
			</div>
			<div className="w-full mt-4 mb-4 p-1 bg-base-200" />
			<div className="w-full mt-4 overflow-x-auto m-auto border-bt">
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="top-0 px-6 py-3">ID</th>
							<th className="top-0 px-6 py-3 flex justify-between items-center">
								BENEFICIARY
								<label className="swap swap-rotate">
									<input
										type="checkbox"
										onClick={() => {
											setSort(sort === "asc" ? "desc" : "asc");
											setSortBy("name");
										}}
									/>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 swap-off"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 15.75l7.5-7.5 7.5 7.5"
										/>
									</svg>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 swap-on"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</label>
							</th>
							<th className="top-0 px-6 py-3">BRGY. ID</th>
							<th className="top-0 px-6 py-3 flex justify-between items-center">
								Program Name
								<label className="swap swap-rotate">
									<input
										type="checkbox"
										onClick={() => {
											setSort(sort === "asc" ? "desc" : "asc");
											setSortBy("program");
										}}
									/>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 swap-off"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 15.75l7.5-7.5 7.5 7.5"
										/>
									</svg>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 swap-on"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</label>
							</th>
							<th className="top-0 px-6 py-3">LOCATION</th>
							<th className="top-0 px-6 py-3 flex justify-between items-center">
								Date
								<label className="swap swap-rotate">
									<input
										type="checkbox"
										onClick={() => {
											setSort(sort === "asc" ? "desc" : "asc");
											setSortBy("date");
										}}
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 swap-off"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 15.75l7.5-7.5 7.5 7.5"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 swap-on"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</label>
							</th>
							<th className="top-0 px-6 py-3 w-[5rem]">time</th>
							<th className="top-0 px-6 py-3 w-[8rem]">STATUS</th>
						</tr>
					</thead>
					<tbody>
						{isLoading && (
							<tr>
								<td>Loading...</td>
								<td></td>
								<td className="text-center"></td>
							</tr>
						)}
						{isSuccess &&
						handleFilteredData !== "No Data" &&
						handleFilteredData !== "No Results Found" ? (
							currentItems.map((transaction: any) => (
								<tr key={transaction.id}>
									<td className="w-[15rem] truncate">{transaction.id}</td>
									<td className="">{`${transaction.residents.users.lname}, ${transaction.residents.users.fname} ${transaction.residents.users.mname}`}</td>
									<td className="w-[15rem] truncate">{transaction.residents.users.brgyId}</td>
									<td className="w-[15rem] truncate">
										{transaction.program ? transaction.program.name : "Deleted"}
									</td>
									<td className="w-[15rem] truncate">
										{transaction.program ? transaction.schedule.location : "Deleted"}
									</td>
									<td className="">
										{transaction.schedule
											? `${transaction.schedule.date.split("-")[1]}-${
													transaction.schedule.date.split("-")[2]
											  }-${transaction.schedule.date.split("-")[0]}`
											: "Deleted"}
									</td>
									<td className="">
										{transaction.schedule
											? `${
													parseInt(transaction.schedule.startTime.split(":")[0]) % 12 === 0
														? "12"
														: parseInt(transaction.schedule.startTime.split(":")[0]) % 12
											  }:${transaction.schedule.startTime.split(":")[1]} ${
													parseInt(transaction.schedule.startTime.split(":")[0]) < 12 ? "AM" : "PM"
											  } -${
													parseInt(transaction.schedule.endTime.split(":")[0]) % 12 === 0
														? "12"
														: parseInt(transaction.schedule.endTime.split(":")[0]) % 12
											  }:${transaction.schedule.endTime.split(":")[1]} ${
													parseInt(transaction.schedule.endTime.split(":")[0]) < 12 ? "AM" : "PM"
											  }`
											: "Deleted"}
									</td>

									<td className="text-center text-white text-sm">
										<div className="dropdown dropdown-end relative">
											<label
												tabIndex={999}
												className={`card p-0 px-1 py-1 ${getStatusColor(`${transaction.status}`)}`}
												onClick={() => setID(transaction.id)}
											>
												{transaction.status}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
													<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
												</svg>
											</label>

											{role === "Brgy. Admin" && id === transaction.id ? (
												<ul
													tabIndex={999}
													className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black "
												>
													<li>
														<label htmlFor={transaction.id + "Pending"}>Pending</label>
													</li>
													<li>
														<label htmlFor={transaction.id + "Completed"}>Completed</label>
													</li>
													<li>
														<label htmlFor={transaction.id + "Cancelled"}>Cancelled</label>
													</li>
												</ul>
											) : (
												<></>
											)}
										</div>
									</td>

									<input type="checkbox" id={transaction.id + "Pending"} className="modal-toggle" />
									<label htmlFor={transaction.id + "Pending"} className="modal cursor-pointer">
										<label className="modal-box relative" htmlFor="">
											<h3 className="text-lg ">Are you sure you want to update?</h3>
											<div className="modal-action">
												<label
													className="btn btn-primary"
													onClick={() => {
														formController.updateTransaction({
															id: transaction.id,
															residentId: transaction.residentId,
															scheduleId: transaction.scheduleId,
															programId: transaction.programId,
															status: "Pending",
														});
														setTimeout(() => refetch(), 1000);
													}}
													htmlFor={transaction.id + "Pending"}
												>
													Confirm
												</label>
											</div>
										</label>
									</label>

									<input
										type="checkbox"
										id={transaction.id + "Completed"}
										className="modal-toggle"
									/>
									<label htmlFor={transaction.id + "Completed"} className="modal cursor-pointer">
										<label className="modal-box relative" htmlFor="">
											<h3 className="text-lg ">Are you sure you want to update?</h3>
											<div className="modal-action">
												<label
													className="btn btn-primary"
													onClick={() => {
														formController.updateTransaction({
															id: transaction.id,
															residentId: transaction.residentId,
															scheduleId: transaction.scheduleId,
															programId: transaction.programId,
															status: "Completed",
														});
														setTimeout(() => refetch(), 1000);
													}}
													htmlFor={transaction.id + "Completed"}
												>
													Confirm
												</label>
											</div>
										</label>
									</label>

									<input
										type="checkbox"
										id={transaction.id + "Cancelled"}
										className="modal-toggle"
									/>
									<label htmlFor={transaction.id + "Cancelled"} className="modal cursor-pointer">
										<label className="modal-box relative" htmlFor="">
											<h3 className="text-lg ">Are you sure you want to update?</h3>
											<div className="modal-action">
												<label
													className="btn btn-primary"
													onClick={() => {
														formController.updateTransaction({
															id: transaction.id,
															residentId: transaction.residentId,
															scheduleId: transaction.scheduleId,
															programId: transaction.programId,
															status: "Cancelled",
														});
														setTimeout(() => refetch(), 1000);
													}}
													htmlFor={transaction.id + "Cancelled"}
												>
													Confirm
												</label>
											</div>
										</label>
									</label>
								</tr>
							))
						) : handleFilteredData === "No Results Found" ? (
							<tr>
								<td className="">No Results Found</td>
								<td className="w-[15rem] truncate"></td>
								<td className="w-[15rem] truncate"></td>

								<td className="w-[15rem] truncate"></td>
								<td className="text-center"></td>
								<td className="w-[15rem] truncate"></td>

								<td></td>
							</tr>
						) : (
							<tr>
								<td className="">No Data</td>
								<td className="w-[15rem] truncate"></td>
								<td className="w-[15rem] truncate"></td>

								<td className="w-[15rem] truncate"></td>
								<td className="text-center"></td>
								<td className="w-[15rem] truncate"></td>

								<td></td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className="flex flex-row justify-center pt-2">
				<ReactPaginate
					className="rounded-none"
					breakLabel="..."
					breakClassName="btn btn-md p-0 rounded-none border-none"
					breakLinkClassName="btn btn-md bg-primary border-none rounded-none"
					nextLabel="next >"
					nextClassName="btn btn-md p-0 rounded-none border-none"
					nextLinkClassName="btn btn-md bg-primary border-none rounded-none"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					pageClassName="btn btn-md p-0 bg-primary rounded-none border-none"
					pageLinkClassName="btn btn-md bg-transparent border-none rounded-none"
					previousLabel="< previous"
					previousClassName="btn btn-md p-0 rounded-none border-none"
					previousLinkClassName="btn btn-md bg-primary border-none rounded-none"
					containerClassName="btn-group px-5 "
					activeClassName="btn btn-md bg-secondary"
				/>
			</div>
		</>
	);
};

export default TransactionTable;
