// @ts-nocheck
import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportUsersPDF({ data }) {
	data.map((user) => {
		if (user.status === 1) {
			user.status = "Active";
		}
		if (user.status === 0) {
			user.status = "Inactive";
		}
	});
	//console.log("data: ", data)
	const userData = data.map((user, index) => ({
		" ": index + 1,
		"FIRST NAME": user.fname,
		"MIDDLE NAME": user.mname,
		"LAST NAME": user.lname,
		ROLE: user.role,
		STATUS: user.status,
		SEX: user.sex,
		"MOBILE NO.": user.mobileNo,
		EMAIL: user.email,
		"PRESENT ADDRESS": user.presAdd,
		"PERMANENT ADDRESS": user.permAdd,
		"BRGY ID": user.brgyId,
	}));
	//console.log("user data", userData)
	const unit = "pt";
	const size = "legal";
	const orientation = "landscape";

	const marginLeft = 10;
	const doc = new jsPDF(orientation, unit, size);

	doc.setFontSize(12);

	const title = "USERS";
	const headers = [Object.keys(userData[0])];
	const tableData = userData.map((users) => Object.values(users));
	console.log(tableData);
	let content = {
		startY: 50,
		horizontalPageBreak: true,
		horizontalPageBreakRepeat: 0,
		head: headers,
		body: tableData,
	};
	doc.text(title, marginLeft, 40);
	doc.autoTable(content);
	doc.save("Users Report.pdf");
}

export function exportProgramsPDF({ data }) {
	//console.log("data: ", data)
	const programData = data.map((program, index) => ({
		" ": index + 1,
		NAME: program.name,
		DETAILS: program.details,
		VIEW: program.view,
		QUALIFICATION: program.qualification,
		"BRGY. ID": program.brgyId,
		STATUS: program.status,
		TYPE: program.type,
	}));
	console.log("program data", programData);
	const unit = "pt";
	const size = "A4";
	const orientation = "landscape";

	const marginLeft = 40;
	const doc = new jsPDF(orientation, unit, size);

	doc.setFontSize(15);

	const title = "PROGRAMS";
	const headers = [Object.keys(programData[0])];
	const tableData = programData.map((programs) => Object.values(programs));
	console.log("headers: ", headers);
	console.log("table: ", tableData);
	let content = {
		startY: 50,
		head: headers,
		body: tableData,
	};

	doc.text(title, marginLeft, 40);
	doc.autoTable(content);
	doc.save("Programs Report.pdf");
}

export function exportTransactionsPDF({ data }, programFilter) {
	//console.log("data: ", data)

	const programFilterData = data.filter((transaction) =>
		transaction.program.name.includes(programFilter)
	);

	const transactionData = programFilterData.map((transaction, index) => ({
		" ": index + 1,
		BENEFICIARY:
			transaction.residents.users.fname +
			" " +
			transaction.residents.users.mname +
			" " +
			transaction.residents.users.lname,
		"BARANGAY ID": transaction.residents.users.brgyId,
		"PROGRAM NAME": transaction.program.name,
		LOCATION: transaction.schedule.location,
		DATE: transaction.schedule.date,
		SCHEDULE: transaction.schedule.startTime + " - " + transaction.schedule.endTime,
		STATUS: transaction.status,
	}));

	const unit = "pt";
	const size = "A4";
	const orientation = "landscape";

	const marginLeft = 40;
	const doc = new jsPDF(orientation, unit, size);

	doc.setFontSize(15);

	const title = "TRANSACTIONS";
	const headers = [Object.keys(transactionData[0])];
	const tableData = transactionData.map((transaction) => Object.values(transaction));

	let content = {
		startY: 50,
		head: headers,
		body: tableData,
	};

	doc.text(title, marginLeft, 40);
	doc.autoTable(content);
	doc.save("Transactions Report.pdf");
}
