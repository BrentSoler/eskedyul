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
	const [roleFilter, setRoleFilter] = useState("");

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				const sorted = data.data;

				const roleSort = sorted?.filter((d: any) =>
					roleFilter ? d.role.toLowerCase() === roleFilter.toLowerCase() : d
				);

				if (!searchFilter) {
					return roleSort;
				}

				const fnameSort = roleSort?.filter((d: any) =>
					d.fname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mnameSort = roleSort?.filter((d: any) =>
					d.mname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const lnameSort = roleSort?.filter((d: any) =>
					d.lname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mobileNoSort = roleSort?.filter((d: any) =>
					d.mobileNo.toString().includes(searchFilter.toString())
				);

				return searchFilter === ""
					? sorted
					: [...new Set([...fnameSort, ...mnameSort, ...lnameSort, ...mobileNoSort])];
			}

			return "No Data";
		}
	}, [data, isSuccess, searchFilter, roleFilter]);

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
			</div>
			<div className="w-full mt-4 overflow-x-auto m-auto">
				<table className="table w-[10rem]">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">NAME</th>
							<th className="sticky top-0 px-6 py-3">PERMANENT ADDRESS</th>
							<th className="sticky top-0 px-6 py-3">PRESENT ADDRESS</th>
							<th className="sticky top-0 px-6 py-3">MOBILE NO.</th>
							<th className="sticky top-0 px-6 py-3">EMERGENCY CONTACT NAME</th>
							<th className="sticky top-0 px-6 py-3">EMERGENCY CONTACT NUMBER</th>
							<th className="sticky top-0 px-6 py-3">CIVIL STATUS</th>
							<th className="sticky top-0 px-6 py-3">BIRTHDATE</th>
							<th className="sticky top-0 px-6 py-3">BIRTHPLACE</th>
							<th className="sticky top-0 px-6 py-3">ROLE</th>
							<th className="sticky top-0 px-6 py-3 w-[2rem]">is activated</th>
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
									<td className="w-[15rem] truncate">{user.permAdd}</td>
									<td className="w-[15rem] truncate">{user.presAdd}</td>
									<td className="w-[15rem] truncate">{user.mobileNo}</td>
									<td className="w-[15rem] truncate">
										{user.residents.length > 0 ? user.residents[0].emgContName : "Not Available"}
									</td>
									<td className="w-[15rem] truncate">
										{user.residents.length > 0 ? user.residents[0].emgContNum : "Not Available"}
									</td>
									<td className="w-[15rem] truncate">
										{user.residents.length > 0 ? user.residents[0].civilStatus : "Not Available"}
									</td>
									<td className="w-[15rem] truncate">
										{user.residents.length > 0 ? user.residents[0].birthdate : "Not Available"}
									</td>
									<td className="w-[15rem] truncate">
										{user.residents.length > 0 ? user.residents[0].birthPlace : "Not Available"}
									</td>

									<td className="w-[15rem] truncate">{user.role}</td>
									<td className="text-center">
										<input
											type="checkbox"
											checked={user.status > 0 ? true : false}
											className="checkbox"
											onClick={() => controller.activateUser(user.id)}
											disabled={
												role === "Brgy. Admin" && user.role === "Resident"
													? userId === user.id
														? true
														: false
													: userId === user.id
													? true
													: role === "Master Admin"
													? false
													: true
											}
										/>
									</td>

									<td>
										<Link href={`/dashboard/users/edit/${user.id}`}>
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
