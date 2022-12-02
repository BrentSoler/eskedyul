import React, { useState } from "react";
import Links from "../Links";
import NavBar from "../Navbar";

const Sidebar: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [visible, setVisible] = useState(true);

	return (
		<div className="drawer drawer-mobile">
			<input id="form-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col w-full">
				<NavBar cb={setVisible} visible={visible} />
				{children}
			</div>
			{visible && (
				<div className="drawer-side">
					<label htmlFor="form-drawer" className="drawer-overlay"></label>
					<div className="menu p-4 overflow-y-hidden w-80 lg:w-[16vw] bg-primary text-white h-[100vh] flex items-end justify-center">
						<Links />
					</div>
					<div className="divider-horizontal"></div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
