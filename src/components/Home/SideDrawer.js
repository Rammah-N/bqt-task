import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { Notify } from "notiflix";
import { app } from "../../firebase";
const SideDrawer = ({ onClose, visible, logOut, loading }) => {
	return (
		<Drawer
			title={<MdOutlineDashboard className="logo" size={45} />}
			placement="left"
			onClose={onClose}
			visible={visible}
			className="sidedrawer">
			<div className="sidedrawer-nav">
				<nav className="nav">
					<Link to="/">Home</Link>
					<Link to="/devices">Devices</Link>
					<Link to="/graphs">Graphs</Link>
					<Link to="/todo">To Do </Link>
				</nav>

				<Button
					onClick={logOut}
					type="secondary"
					size="large"
					style={{
						fontSize: "12px",
						display: "flex",
						alignItems: "center",
						gap: "5px",
					}}
					icon={<BiLogOut size={18} />}
					loading={loading}>
					Sign Out
				</Button>
			</div>
		</Drawer>
	);
};

export default SideDrawer;
