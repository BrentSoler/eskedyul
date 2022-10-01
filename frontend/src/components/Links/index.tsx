import Link from "next/link";
import { useRouter } from "next/router";

const Links = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col items-end justify-center text-lg gap-4">
			<Link href="/dashboard">
				<a
					className={`${
						router.pathname === "/dashboard" ? "font-bold" : "font-light"
					} transition all`}
				>
					Home
				</a>
			</Link>
			<Link href="/dashboard/programs">
				<a
					className={`${
						router.pathname.includes("/dashboard/programs") ? "font-bold" : "font-light"
					} transition all`}
				>
					Programs
				</a>
			</Link>
			<Link href="/dashboard/transactions">
				<a
					className={`${
						router.pathname.includes("/dashboard/transactions") ? "font-bold" : "font-light"
					} transition all`}
				>
					Transactions
				</a>
			</Link>
			<Link href="/dashboard/users">
				<a
					className={`${
						router.pathname.includes("/dashboard/users") ? "font-bold" : "font-light"
					} transition all`}
				>
					Users
				</a>
			</Link>
		</div>
	);
};

export default Links;
