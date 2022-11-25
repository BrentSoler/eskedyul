import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useTransactionController from "./transactionController";
import { getStatusColor } from "../../../hooks/useTransactionApi";
const TransactionTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useTransactionController();
	const role = AuthStore((state) => state.userData.role);
	const { data, isSuccess, isLoading } = controller.getTransaction(brgyId);

	const [searchFilter, setSearchFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sort, setSort] = useState("asc");

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				const sorted = data.data.sort((a: any, b: any) => {
					return sort === "asc"
						? a.residents.users.lname.localeCompare(b.residents.users.lname)
						: -a.residents.users.lname.localeCompare(b.residents.users.lname);
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

				return searchFilter === ""
					? statusSort
					: [
						...new Set([
							...fnameSort,
							...mnameSort,
							...lnameSort,
							...programNameSort,
							...locationSort,
						]),
					];
			}
			return "No Data";
		}
	}, [data, isSuccess, searchFilter, statusFilter, sort]);

	return (
		<>
			<div className="flex gap-3">
				<input
					placeholder="Search Name, Program Name or Location."
					type="text"
					onChange={(e) => {
						setSearchFilter(e.target.value);
					}}
					value={searchFilter}
					className="input input-bordered w-full mt-3"
				/>
				<label className="flex items-center"> View </label>
				<select
					placeholder="Status"
					onChange={(e) => {
						setStatusFilter(e.target.value);
					}}
					value={statusFilter}
					className="input input-bordered w-full mt-3"
				>
					<option value=""></option>
					<option value="Pending">Pending</option>
					<option value="Completed">Completed</option>
					<option value="Cancelled">Cancelled</option>
				</select>
			</div>
			<div className="w-full mt-4 mb-4 p-1 bg-base-200" />
			<div className="w-full mt-4 overflow-x-auto m-auto">
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">ID</th>
							<th className="sticky top-0 px-6 py-3 flex justify-between items-center">
								BENEFICIARY
								<label className="swap swap-rotate">
									<input type="checkbox" onClick={() => setSort(sort === "asc" ? "desc" : "asc")} />

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
							<th className="sticky top-0 px-6 py-3">BGRY. ID</th>
							<th className="sticky top-0 px-6 py-3">Program Name</th>
							<th className="sticky top-0 px-6 py-3">LOCATION</th>
							<th className="sticky top-0 px-6 py-3">Date</th>
							<th className="sticky top-0 px-6 py-3 w-[5rem]">time</th>
							<th className="sticky top-0 px-6 py-3 w-[8rem]">STATUS</th>
							{role !== "Master Admin" && <th className="sticky top-0 px-6 py-3 w-6"></th>}
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
						{isSuccess && handleFilteredData !== "No Data" ? (
							handleFilteredData.map((transaction: any) => (
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
										{transaction.schedule ? transaction.schedule.date : "Deleted"}
									</td>
									<td className="">
										{transaction.schedule
											? `${transaction.schedule.startTime}-${transaction.schedule.endTime}`
											: "Deleted"}
									</td>
									<td className="text-center text-white text-sm">
										<div className={`card p-0 px-1 py-1 ${getStatusColor(`${transaction.status}`)}`}>
											{transaction.status}
										</div>
									</td>
									{transaction.program && role === "Brgy. Admin" ? (
										<td>
											<Link href={`/dashboard/transactions/edit/${transaction.id}`}>
												<a className="btn btn-ghost">Edit</a>
											</Link>
										</td>
									) : (
										<></>
									)
									}
								</tr>
							))
						) : (
							<tr className="btn btn-ghost">No Data</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TransactionTable;
