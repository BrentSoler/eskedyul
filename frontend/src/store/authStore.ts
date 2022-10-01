import create from "zustand";

const AuthStore = create((set: any) => ({
	userData: {
		fname: "",
		id: "",
		role: "",
		token: "",
		brgyId: "",
	},
	loginHandler: (user: {
		fname: string;
		id: string;
		token: string;
		brgyId: string;
		role: string;
	}) =>
		set((state: any) => ({
			...state,
			userData: user,
		})),
	logoutHandler: () =>
		set((state: any) => ({
			...state,
			userData: {
				fname: "",
				id: "",
				role: "",
				token: "",
				brgyId: "",
			},
		})),
}));

export default AuthStore;
