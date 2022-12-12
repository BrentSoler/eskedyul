import { useEffect, useMemo, useState, ChangeEvent } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useFormController from "../../Forms/Transaction/formController";
import useTransactionController from "./userController";
import ReactPaginate from "react-paginate";

const UsersTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const userId = AuthStore((state) => state.userData.id);
	const role = AuthStore((state) => state.userData.role);
	const controller = useTransactionController(brgyId);
	const userController = useFormController();

	const { data, isSuccess, isLoading } = userController.getUsers(brgyId);

	const [searchFilter, setSearchFilter] = useState("");
	const [sort, setSort] = useState("asc");
	const [roleFilter, setRoleFilter] = useState("Resident");
	const [statusFilter, setStatusFilter] = useState("");

	const [activeIndex, setActiveIndex] = useState(1);
	const handleClick = (index: number) => setActiveIndex(index);
	const checkActive = (index: number, className: string) =>
		activeIndex === index ? className : "";

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				const sorted = data.data.sort((a: any, b: any) => {
					return sort === "asc" ? a.lname.localeCompare(b.lname) : -a.lname.localeCompare(b.lname);
				});

				const roleSort = sorted?.filter((d: any) =>
					roleFilter ? d.role.toLowerCase() === roleFilter.toLowerCase() : d
				);

				const statusSort = roleSort?.filter((d: any) =>
					statusFilter ? d.status.toString() === statusFilter.toString() : d
				);

				if (!searchFilter) {
					return statusSort;
				}

				const fnameSort = statusSort?.filter((d: any) =>
					d.fname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mnameSort = statusSort?.filter((d: any) =>
					d.mname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const lnameSort = statusSort?.filter((d: any) =>
					d.lname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mobileNoSort = statusSort?.filter((d: any) =>
					d.mobileNo.toString().includes(searchFilter.toString())
				);
				let brgyIdSort = [];
				if (role === "Master Admin") {
					brgyIdSort = statusSort?.filter((d: any) =>
						d.brgyId.toString().includes(searchFilter.toString())
					);
				}

				return searchFilter === ""
					? sorted
					: [...new Set([...fnameSort, ...mnameSort, ...lnameSort, ...mobileNoSort, ...brgyIdSort])]
							.length > 0
					? [...new Set([...fnameSort, ...mnameSort, ...lnameSort, ...mobileNoSort, ...brgyIdSort])]
					: "No Results Found";
			}

			return "No Data";
		}
	}, [data, isSuccess, searchFilter, roleFilter, statusFilter, sort]);

	const handleRoleChange = (index: number, role: string) => {
		handleClick(index);
		setRoleFilter(role);
		setItemOffset(0);
	};
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
					} or Mobile No.`}
					type="text"
					onChange={(e) => {
						setSearchFilter(e.target.value);
					}}
					value={searchFilter}
					className="input input-bordered w-full mt-3"
				/>
				<label className="flex items-center">Status</label>
				<select
					placeholder="Status"
					onChange={(e) => {
						setStatusFilter(e.target.value);
					}}
					value={statusFilter}
					className="input input-bordered mt-3"
				>
					<option value="--Please select one--" selected hidden>
						--Please select one--
					</option>
					<option value="1">Activated</option>
					<option value="0">Inactivated</option>
				</select>
			</div>
			<div className="w-full mt-4 mb-4 p-1 bg-base-200" />

			{role !== "Brgy. Admin" ? (
				<>
					<div className="w-full  mt-4 mb-4 p-1">
						<div className="p-0 grid">
							<div className="tabs z-10 -mb-px">
								<a
									className={`tab tab-lg gap-2 ${checkActive(1, "tab-active  tab-bordered")}`}
									onClick={() => {
										handleRoleChange(1, "Resident");
									}}
								>
									Resident
								</a>
								<a
									className={`tab tab-lg gap-2 ${checkActive(2, "tab-active tab-bordered")}`}
									onClick={() => {
										handleRoleChange(2, "Brgy. Admin");
									}}
								>
									Brgy. Admin
								</a>
								<a
									className={`tab tab-lg gap-2 ${checkActive(3, "tab-active tab-bordered")}`}
									onClick={() => {
										handleRoleChange(3, "Admin");
									}}
								>
									Admin
								</a>
								{role === "Admin" ? (
									<></>
								) : (
									<a
										className={`tab tab-lg gap-2 ${checkActive(4, "tab-active tab-bordered")}`}
										onClick={() => {
											handleRoleChange(4, "Master Admin");
										}}
									>
										Master Admin
									</a>
								)}
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
			<div className="w-full mt-4 overflow-x-auto m-auto">
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3 flex justify-between items-center">
								NAME
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
							<th className="sticky top-0 px-6 py-3">BRGY. ID</th>
							<th className="sticky top-0 px-6 py-3">MOBILE NO.</th>
							<th className="sticky top-0 px-6 py-3">ROLE</th>
							<th className="sticky top-0 px-6 py-3 w-[2rem]">is activated</th>
							<th className="sticky top-0 px-6 py-3">REMARKS</th>
							<th className="sticky top-0 px-6 py-3 w-6"></th>
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
							currentItems.map((user: any) => (
								<tr key={user.id}>
									<td className="">{`${user.lname}, ${user.fname} ${user.mname}`}</td>
									<td className="w-[15rem] truncate">{user.brgyId}</td>
									<td className="w-[15rem] truncate">{user.mobileNo}</td>

									<td className="w-[15rem] truncate">{user.role}</td>
									<td className="text-center">
										<input
											type="checkbox"
											checked={user.status > 0 ? true : false}
											className="checkbox"
											onClick={() => controller.activateUser(user.id)}
											disabled={role === "Brgy. Admin" ? true : user.id === userId ? true : false}
										/>
									</td>
									<td className="w-[15rem] truncate">{user.remarks}</td>

									<td>
										<Link
											href={`/dashboard/users/edit/${
												user.role === "Resident" ? "resident" : "admin"
											}/${user.id}`}
										>
											<a className="btn btn-ghost">Edit</a>
										</Link>
									</td>
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

export default UsersTable;
