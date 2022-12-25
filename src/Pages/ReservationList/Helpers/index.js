import moment from "moment";
const orderByStatus = (val, data, setTableData) => {
	let temp = [...data];
	if (val === "None" || !val) {
		setTableData(temp);
	} else {
		temp = temp.filter((item) => item.status === val);
		setTableData(temp);
	}
};

const orderByEventDay = (val, data, setTableData) => {
	let temp = [...data];
	if (val === "Past") {
		temp = temp.filter((item) =>
			moment(moment(item.start).format("YYYY/MM/DD")).isBefore(
				moment().format("YYYY/MM/DD")
			)
		);
	} else if (val === "Today") {
		temp = temp.filter((item) =>
			moment(moment(item.start).format("YYYY/MM/DD")).isSame(
				moment().format("YYYY/MM/DD")
			)
		);
	} else if (val === "Upcoming") {
		temp = temp.filter((item) =>
			moment(moment(item.start).format("YYYY/MM/DD")).isAfter(
				moment().format("YYYY/MM/DD")
			)
		);
	}
	setTableData(temp);
};
const handleSearch = (val, data, setTableData) => {
	let temp = [...data];
	temp = temp.filter(
		(item) =>
			item.customer.firstName.toLowerCase().includes(val.toLowerCase()) ||
			item.customer.lastName.toLowerCase().includes(val.toLowerCase())
	);
	setTableData(temp);
};
const orderByShift = (val, data, setTableData) => {
	let temp = [...data];
	if (val === "None" || !val) {
		setTableData(temp);
	} else {
		temp = temp.filter((item) => item.shift === val);
		setTableData(temp);
	}
};

const chooseColor = (item) => {
	if (item === "CHECKED OUT") {
		return "#ffcccc";
	} else if (item === "NOT CONFIRMED") {
		return "#ffffcc";
	} else if (item === "SEATED") {
		return "#ccffcc";
	}
	return "#ccffff";
};

export {
	chooseColor,
	orderByShift,
	handleSearch,
	orderByEventDay,
	orderByStatus,
};
