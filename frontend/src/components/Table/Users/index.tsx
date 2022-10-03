import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useFormController from "../../Forms/Transaction/formController";
import useTransactionController from "./userController";

const UsersTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const userId = AuthStore((state) => state.userData.id);
	const controller = useTransactionController(brgyId);
	const userController = useFormController();

	const { data, isSuccess, isLoading } = userController.getUsers(brgyId);

	const [searchFilter, setSearchFilter] = useState("");

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				const sorted = data.data;

				const fnameSort = sorted?.filter((d: any) =>
					d.fname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mnameSort = sorted?.filter((d: any) =>
					d.mname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const lnameSort = sorted?.filter((d: any) =>
					d.lname.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const roleSort = sorted?.filter((d: any) =>
					d.role.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const mobileNoSort = sorted?.filter((d: any) =>
					d.mobileNo.toString().includes(searchFilter.toString())
				);

				return searchFilter === ""
					? sorted
					: [...new Set([...fnameSort, ...mnameSort, ...lnameSort, ...roleSort, ...mobileNoSort])];
			}
			return "No Data";
		}
	}, [data, isSuccess, searchFilter]);

	return (
		<>
			<div className="relative w-full p-4 gap-4 flex flex-col">
				<input
					placeholder="Search Name, Role or Mobile No."
					type="text"
					onChange={(e) => {
						setSearchFilter(e.target.value);
					}}
					value={searchFilter}
					className="input input-bordered"
				/>
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">NAME</th>
							<th className="sticky top-0 px-6 py-3">MOBILE NO.</th>
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
									<td className="w-[15rem] truncate">{user.mobileNo}</td>
									<td className="w-[15rem] truncate">{user.role}</td>
									<td className="text-center">
										<input
											type="checkbox"
											checked={user.status > 0 ? true : false}
											className="checkbox"
											onClick={() => controller.activateUser(user.id)}
											disabled={userId === user.id ? true : false}
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
