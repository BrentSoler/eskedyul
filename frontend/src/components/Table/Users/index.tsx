import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useFormController from "../../Forms/Transaction/formController";
import useTransactionController from "./userController";

const UsersTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const userId = AuthStore((state) => state.userData.id);
	const role = AuthStore((state) => state.userData.role);
	const controller = useTransactionController(brgyId);
	const userController = useFormController();

	const { data, isSuccess, isLoading } = userController.getUsers(brgyId);

	const [searchFilter, setSearchFilter] = useState("");
	const [sort, setSort] = useState("asc");
	const [roleFilter, setRoleFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");

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

				return searchFilter === ""
					? sorted
					: [...new Set([...fnameSort, ...mnameSort, ...lnameSort, ...mobileNoSort])];
			}

			return "No Data";
		}
		console.log("check data", data)
	}, [data, isSuccess, searchFilter, roleFilter, statusFilter, sort]);

	return (
		<>
			<div className="flex gap-3">
				<input
					placeholder="Search Name, Role or Mobile No."
					type="text"
					onChange={(e) => {
						setSearchFilter(e.target.value);
					}}
					value={searchFilter}
					className="input input-bordered w-full mt-3"
				/>
				<label className="flex items-center">Role</label>
				<select
					placeholder="Role"
					onChange={(e) => {
						setRoleFilter(e.target.value);
					}}
					value={roleFilter}
					className="input input-bordered w-full mt-3"
				>
					<option value=""></option>
					<option value="Resident">Resident</option>
					<option value="Brgy. Admin">Brgy. Admin</option>
					<option value="Admin">Admin</option>
					<option value="Master Admin">Master Admin</option>
				</select>
				<label className="flex items-center">Status</label>
				<select
					placeholder="Status"
					onChange={(e) => {
						setStatusFilter(e.target.value);
					}}
					value={statusFilter}
					className="input input-bordered w-full mt-3"
				>
					<option value=""></option>
					<option value="1">Activated</option>
					<option value="0">Inactivated</option>
				</select>
			</div>
			<div className="w-full mt-4 mb-4 p-1 bg-base-200" />
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
							<th className="sticky top-0 px-6 py-3">BGRY. ID</th>
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
						{isSuccess && handleFilteredData !== "No Data" ? (
							handleFilteredData.map((user: any) => (
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
									<td className="w-[15rem] truncate">Remark</td>

									<td>
										<Link
											href={`/dashboard/users/edit/${user.role === "Resident" ? "resident" : "admin"
												}/${user.id}`}
										>
											<a className="btn btn-ghost">Edit</a>
										</Link>
									</td>
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

export default UsersTable;
