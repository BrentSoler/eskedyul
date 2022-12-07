import { useRouter } from "next/router";
import AuthStore from "../../store/authStore";

const NavBar = ({ cb, visible }: { cb: any; visible: boolean }) => {
	const router = useRouter();
	const userData = AuthStore((state) => state.userData);
	const logout = AuthStore((state) => state.logoutHandler);

	return (
		<div className="w-full navbar bg-primary text-white justify-between">
			<div className="flex gap-3">
				<label htmlFor="form-drawer" className="lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
							clipRule="evenodd"
						/>
					</svg>
				</label>

				<button className="hidden lg:flex" onClick={() => cb(!visible)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				<h1 className="font-bold text-lg opacity-0 md:opacity-100 lg:text-3xl">E-SKEDYUL</h1>
			</div>
			<div className="flex gap-5 items-center">
				<h1 className="justify-self-end text-right">
					Welcome, <span className="italic"> {userData.fname} </span>(
					{`${userData.role} |
					${userData.brgyId}`}
					)
				</h1>
				<div className="flex">
					<a href = "#logoutModal">
					<button
						type="button"
						className="btn btn-ghost tooltip tooltip-bottom items-center flex w-min"
						data-tip="Logout"
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
					
					<div className="flex gap-3">
						<div className="modal" id="logoutModal">
							<div className="modal-box">
								<p className="py-4">Are you sure that you want to logout?</p>
								<div className="modal-action">
									<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">Back</a>
										<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" 
											onClick={() => {
													logout();
													router.push("/");
												}}													
											type="submit"
										>
											Confirm
										</button>
								</div>
							</div>
						</div>
					</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
