import axios from "axios";

export default axios.create({
	//baseURL: process.env.NEXT_PUBLIC_API_URL,
	baseURL: "https://ess-production-3fc1.up.railway.app",
});
