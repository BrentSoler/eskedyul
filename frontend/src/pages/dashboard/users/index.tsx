import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UsersTable from "../../../components/Table/Users";
import AuthStore from "../../../store/authStore";

const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Users</h1>
				<div className="flex gap-3">
					<Link href="/dashboard/users/add/admin" className="btn btn-primary">
						<a className="btn btn-primary rounded-md">ADD ADMIN</a>
					</Link>
					<Link href="/dashboard/users/add/resident" className="btn btn-primary">
						<a className="btn btn-primary rounded-md">ADD RESIDENT</a>
					</Link>
				</div>
			</div>
			<UsersTable />
		</div>
	);
};

export default ProgramsPage;
