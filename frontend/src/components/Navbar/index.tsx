import { useRouter } from "next/router";
import AuthStore from "../../store/authStore";

const NavBar = () => {
	const router = useRouter();
	const userData = AuthStore((state) => state.userData);
	const logout = AuthStore((state) => state.logoutHandler);

	return (
		<div className="w-full navbar bg-primary text-white justify-between">
			<div className="flex gap-3">
				<label htmlFor="form-drawer" className="lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
						<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
					</svg>
				</label>
				<h1 className="font-bold text-lg lg:text-3xl">E-SKEDYUL</h1>
			</div>
			<div className="flex gap-5 items-center">
				<h1 className="justify-self-end text-right">
					Welcome, <span className="italic"> {userData.fname} </span>(
					{`${userData.role} |
					${userData.brgyId}`}
					)
				</h1>
				<div className="flex">
					<button
						type="button"
						className="btn btn-ghost tooltip tooltip-bottom items-center flex w-min"
						data-tip="Logout"
						onClick={() => {
							logout();
							router.push("/");
						}}
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
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
