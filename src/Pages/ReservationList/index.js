import React from "react";
import data from "../../Data";
import { Table, Input, Select } from "antd";
import moment from "moment";
import "./index.css";
import {
	chooseColor,
	orderByShift,
	handleSearch,
	orderByEventDay,
	orderByStatus,
} from "./Helpers";
export default function App() {
	const [tableData, setTableData] = React.useState(data);
	const columns = [
		{
			title: "Id",
			dataIndex: "id",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.id - b.id,
			sortDirections: ["ascend", "descend"],
		},

		{
			title: "Name",
			dataIndex: "customer",
			render: (item) => item.firstName + " " + item.lastName,
			sorter: (a, b) =>
				(a.customer.firstName + " " + a.customer.lastName).toLowerCase() >
				(b.customer.firstName + " " + b.customer.lastName).toLowerCase()
					? 1
					: -1,
			sortDirections: ["ascend", "descend"],
		},
		{
			title: "Shift",
			dataIndex: "shift",
			render: (item) => <span>{item}</span>,
		},

		{
			title: "Quantity",
			dataIndex: "quantity",
			render: (item) => <span>{item}</span>,
		},
		{
			title: "Business Date",
			dataIndex: "businessDate",
			render: (item) => (
				<span>
					{moment(item.toString().split(".").join("/"), "DD/MM/YYYY").format(
						"LLL"
					)}
				</span>
			),
		},
		{
			title: "Starting at",
			dataIndex: "start",
			render: (item) => <span>{moment(item).format("LLL")}</span>,
		},
		{
			title: "Ending at",
			dataIndex: "end",
			render: (item) => <span>{moment(item).format("LLL")}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (item) => (
				<span
					style={{
						paddingTop: 3,
						paddingBottom: 3,
						paddingLeft: 15,
						paddingRight: 15,
						borderRadius: 4,
						backgroundColor: chooseColor(item),
						textAlign: "center",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						// width: 200,
					}}
				>
					{item.toString()}
				</span>
			),
		},
		{
			title: "Notes",
			dataIndex: "guestNotes",
			render: (item) => <span>{item}</span>,
		},
	];

	const handleChange = (pagination, filters, sorter, extra) => {};

	return (
		<div className="mainContainer">
			<div className="parentDiv">
				<span className="heading">Reservation List:</span>
				<div className="filterationDiv">
					<div className="rowing">
						<div className="colLeft">
							<Select
								className="widthForSelect"
								onChange={(val) => {
									orderByShift(val, data, setTableData);
								}}
								placeholder="Sort by Shift"
								allowClear
								options={[
									{
										value: "DINNER",
										label: "Dinner",
									},
									{
										value: "LUNCH",
										label: "Lunch",
									},

									{
										value: "BREAKFAST",
										label: "Breakfast",
									},
								]}
							/>
						</div>
						<div className="colLeft">
							<Select
								className="widthForSelect"
								onChange={(val) => {
									orderByStatus(val, data, setTableData);
								}}
								placeholder="Sort by Status"
								allowClear
								options={[
									{
										value: "CHECKED OUT",
										label: "Checked Out",
									},
									{
										value: "NOT CONFIRMED",
										label: "Not Confirmed",
									},

									{
										value: "SEATED",
										label: "Seated",
									},
									{
										value: "CONFIRMED",
										label: "Confirmed",
									},
								]}
							/>
						</div>
						<div className="colLeft">
							<Select
								className="widthForSelect"
								onChange={(val) => {
									orderByEventDay(val, data, setTableData);
								}}
								placeholder="Sort by Date"
								allowClear
								options={[
									{
										value: "Past",
										label: "Past",
									},

									{
										value: "Today",
										label: "Today",
									},
									{
										value: "Upcoming",
										label: "Upcoming",
									},
								]}
							/>
						</div>
					</div>
					<Input
						onChange={(e) => {
							handleSearch(e.target.value.trim(), data, setTableData);
						}}
						placeholder="Search customer..."
						className="widthForSearch"
					/>
				</div>
				<Table
					columns={columns}
					dataSource={tableData}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
