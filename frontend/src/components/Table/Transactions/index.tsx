import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useTransactionController from "./transactionController";

const TransactionTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useTransactionController();

	const { data, isSuccess, isLoading } = controller.getTransaction(brgyId);

	const [getData, setGetData] = useState(data);
	const [searchFilter, setSearchFilter] = useState("");

	console.log("DATA: ", data)
	console.log("GET:", getData)

	// filter function useMemo
	const handleFilteredData = useMemo(() => {
		console.log("TINGIN NGA ULIT?:", getData)
		console.log("BAKA NAMAN?", data);
		if (data !== undefined) {
			const sorted = data?.data;

			const fnameSort = sorted?.filter((d) => 
				d.residents.users.fname.toLowerCase().includes(searchFilter.toLowerCase())
			)

			const mnameSort = sorted?.filter((d) => 
				d.residents.users.mname.toLowerCase().includes(searchFilter.toLowerCase())
			)

			const lnameSort = sorted?.filter((d) => 
				d.residents.users.lname.toLowerCase().includes(searchFilter.toLowerCase())
			)

			const programNameSort = sorted?.filter((d) => 
				d.program.name.toLowerCase().includes(searchFilter.toLowerCase())
			)

			const locationSort = sorted?.filter((d) => 
				d.schedule.location.toLowerCase().includes(searchFilter.toLowerCase())
			)
			
			return searchFilter === "" 
				? sorted 
				: [...new Set([...fnameSort,...mnameSort,...lnameSort, ...programNameSort, ...locationSort])];
		} 
		return [
			{
				id: "",
				fname: "",
				mname: "",
				lname: "",
				programName: "",
				location: "",
				view: "",
				status: "",
			}
		]
	}, [data, searchFilter])

	return (
		<>
			<div className="relative w-full p-4">
				<input
					placeholder="Search"
					type="text"
					onChange={(e) => {
						setSearchFilter(e.target.value);
						console.log(handleFilteredData, searchFilter);
					}}
					value={searchFilter}
				/>
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">BENEFICIARY</th>
							<th className="sticky top-0 px-6 py-3">Program Name</th>
							<th className="sticky top-0 px-6 py-3">LOCATION</th>
							<th className="sticky top-0 px-6 py-3">Date</th>
							<th className="sticky top-0 px-6 py-3 w-[5rem]">time</th>
							<th className="sticky top-0 px-6 py-3 w-[8rem]">STATUS</th>
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
							handleFilteredData.map((transaction: any) => (
								<tr key={transaction.id}>
									<td className="">{`${transaction.residents.users.lname}, ${transaction.residents.users.fname} ${transaction.residents.users.mname}`}</td>
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
									<td className="text-center">{transaction.status}</td>
									{transaction.program && (
										<td>
											<Link href={`/dashboard/transactions/edit/${transaction.id}`}>
												<a className="btn btn-ghost">Edit</a>
											</Link>
										</td>
									)}
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
