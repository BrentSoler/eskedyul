import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useProgramController from "./programController";

const ProgramsTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useProgramController(brgyId);

	const { data, isSuccess, isLoading } = controller.getPrograms(brgyId);

	// const [getData, setGetData] = useState(data);

	const [searchFilter, setSearchFilter] = useState("");

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		if (isSuccess) {
			if (data.data !== "No Data") {
				const sorted = data?.data;

				const nameSort = sorted?.filter((d: any) =>
					d.name.toLowerCase().includes(searchFilter.toLowerCase())
				);

				const typeSort = sorted?.filter((d: any) =>
					d.type.toString().includes(searchFilter.toString())
				);

				const qualificationSort = sorted?.filter((d: any) =>
					d.qualification.toString().toLowerCase().includes(searchFilter.toString().toLowerCase())
				);

				return searchFilter === ""
					? sorted
					: [...new Set([...nameSort, ...typeSort, ...qualificationSort])];
			}
			return "No Data";
		}
	}, [isSuccess, data, searchFilter]);

	return (
		<>
			<div className="overflow-x-auto relative w-full p-4 gap-4 flex flex-col">
				<input
					placeholder="Search Name, Type or Qualification"
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
							<th className="sticky top-0 px-6 py-3">TYPE</th>
							<th className="sticky top-0 px-6 py-3">QUALIFICATIONS</th>
							<th className="sticky top-0 px-6 py-3 w-[5rem]">VIEW</th>
							<th className="sticky top-0 px-6 py-3 w-[8rem]">STATUS</th>
							<th className="sticky top-0 px-6 py-3 w-6"></th>
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
							handleFilteredData.map((program: any) => (
								<tr key={program.id}>
									<td className="">{program.name}</td>
									<td className="w-[15rem] truncate">{program.type}</td>
									<td className="">{program.qualification}</td>
									<td className="">{program.view}</td>
									<td className="text-center">{program.status}</td>
									<td>
										<Link href={`/dashboard/programs/edit/${program.id}`}>
											<a className="btn btn-ghost">Edit</a>
										</Link>
									</td>
									<td>
										<button
											className="btn btn-ghost"
											onClick={() => controller.deleteProgram(program.id)}
										>
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
										</button>
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

export default ProgramsTable;
