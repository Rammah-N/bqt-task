import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import "../../styles/sidemenu.scss";
import { Button } from "antd";
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { Notify } from "notiflix";
import { app } from "../../firebase";

const SideMenu = ({ logOut, loading }) => {

	return (
		<div className="side-menu">
			<MdOutlineDashboard className="logo" size={45} />
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
	);
};

export default SideMenu;
