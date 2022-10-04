import { useRouter } from "next/router";
import React from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();

	return (
		<div data-theme="eskedyul">
			<div className="font-pop">
				{router.pathname.includes("/dashboard") ? (
					<Sidebar>{children}</Sidebar>
				) : (
					<h1>{children}</h1>
				)}
				<ToastContainer />
			</div>
		</div>
	);
};

export default Layout;
