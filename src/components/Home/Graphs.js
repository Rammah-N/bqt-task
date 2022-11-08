import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import { useSelector } from "react-redux";
import { GiWifiRouter } from "react-icons/gi";
import { AiOutlineLaptop, AiOutlineMobile } from "react-icons/ai";
import { RiComputerLine } from "react-icons/ri";
import { BiServer } from "react-icons/bi";
const Graphs = () => {
	const devices = useSelector((state) => state.devices);

	const nodes = [
		{
			id: "devices",
			position: { x: 0, y: 0 },
			data: { label: <h1>Devices</h1> },
		},
	];
	const icons = {
		Laptop: <AiOutlineLaptop size={35} />,
		Router: <GiWifiRouter size={35} />,
		PC: <RiComputerLine size={35} />,
		Server: <BiServer size={35} />,
		Mobile: <AiOutlineMobile size={35} />,
	};
	const positions = {
		Laptop: {
			x: -400,
			y: 200,
		},
		Router: {
			x: -200,
			y: 200,
		},
		PC: {
			x: 0,
			y: 200,
		},
		Server: {
			x: 200,
			y: 200,
		},
		Mobile: {
			x: 400,
			y: 200,
		},
	};
	const edges = [];
	if (devices) {
		let num = 1;
		for (let key in devices) {
			const quantity = devices[key];
			nodes.push({
				id: `${key}`,
				position: positions[key],
				data: {
					label: (
						<div>
							{icons[key]}
							<h3>{key}</h3>
							<span>Quantity: {quantity}</span>
						</div>
					),
				},
			});
			edges.push({ id: `devices-${key}`, source: "devices", target: key });
			num++;
		}
	}
	return (
		<div style={{ height: "100%" }}>
			<ReactFlow nodes={nodes} edges={edges}>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default Graphs;
