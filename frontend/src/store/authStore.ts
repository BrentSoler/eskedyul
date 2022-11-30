import create from "zustand";

const AuthStore = create((set: any) => ({
	userData: {
		fname: "",
		id: "",
		role: "",
		token: "",
		brgyId: "",
	},
	privacyStop: false,
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
			privacyStop: false,
		})),
	privacyHandler: () =>
		set((state: any) => ({
			...state,
			privacyStop: true,
		})),
}));

export default AuthStore;
