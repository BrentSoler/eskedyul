import { ChangeEvent } from "react";

export default function handleChange(
	e:
		| ChangeEvent<HTMLInputElement>
		| ChangeEvent<HTMLTextAreaElement>
		| ChangeEvent<HTMLSelectElement>,
	callback: any
) {
	callback((prevData: any) => ({
		...prevData,
		[e.target.name]: e.target.value,
	}));
}
