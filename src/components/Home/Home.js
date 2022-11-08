import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import Devices from "./Devices";
import { Route, Routes, useNavigate } from "react-router-dom";
import ToDo from "./ToDo";
import Graphs from "./Graphs";
import "../../styles/home.scss";
import { getAuth, signOut } from "firebase/auth";
import SideDrawer from "./SideDrawer";
import { Notify } from "notiflix";
import { AiOutlineMenu } from "react-icons/ai";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import {
	getFirestore,
	collection,
	addDoc,
	getDoc,
	getDocs,
	setDoc,
	doc,
} from "firebase/firestore";
import { getApps } from "firebase/app";
import { useDispatch } from "react-redux";
import { setDevices } from "../../store/reducers/devices";
import { setToDos } from "../../store/reducers/todos";
import { setUser } from "../../store/reducers/user";
const app = getApps()[0];
const db = getFirestore(app);
const Home = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const navigate = useNavigate();
	const todos = useSelector((state) => state.todos);
	const devices = useSelector((state) => state.devices);
	const currentUser = useSelector((state) => state.user)?.uid;
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (!user) {
			navigate("/login");
			Notify.info("Please login to access your dashboard", {
				showOnlyTheLastOne: true,
				timeout: 3000,
			});
		}
	}, [user]);

	let devicesData = [];
	for (let key in devices) {
		devicesData.push({ name: key, quantity: devices[key] });
	}

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		};
		window.addEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const docRef = doc(db, "devices", `${currentUser}-devices`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data().newValues;
				dispatch(setDevices(data));
			} else {
				// doc.data() will be undefined in this case
			}

			const todoDoc = `${currentUser}-todo`;
			const todos = [];
			const querySnapshot = await getDocs(collection(db, todoDoc));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				todos.push(doc.data());
			});
			dispatch(setToDos(todos));
		};
		fetchData();
	}, []);

	const logOut = () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				setLoading(false);
				dispatch(setDevices(null));
				dispatch(setToDos(null));
				dispatch(setUser(null));
				navigate("/login");
				Notify.success("You have logged out successfully");
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	const showDrawer = () => {
		setVisible(true);
	};
	const hideDrawer = () => {
		setVisible(false);
	};

	const renderLineChart = (
		<div
			className="charts-container"
			style={{
				display: "grid",
				placeItems: "center",
				placeContent: "center",
				width: "100%",
				height: "100%",
			}}>
			<h1>Chart of your Devices</h1>
			<LineChart
				width={dimensions.width > 800 ? 600 : 300}
				height={dimensions.width > 800 ? 500 : 200}
				data={devicesData}
				title="Devices"
				margin={{ top: 30, right: 30, left: 20, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Line type="natural" dataKey="quantity" stroke="#0F7847" />
			</LineChart>
		</div>
	);

	if (!user) {
		return null;
	}

	return (
		<main className="home">
			{dimensions.width > 600 ? (
				<SideMenu logOut={logOut} loading={loading} />
			) : !visible ? (
				<div className="mobile-menu">
					<AiOutlineMenu size={30} fill="#0F7847" onClick={showDrawer} />
				</div>
			) : null}
			<SideDrawer
				visible={visible}
				onClose={hideDrawer}
				logOut={logOut}
				loading={loading}></SideDrawer>
			<div className="home-container">
				<Routes>
					<Route exact path="/devices" element={<Devices />} />
					<Route exact path="/graphs" element={<Graphs />} />
					<Route exact path="/todo" element={<ToDo />} />
					<Route exact path="/" element={renderLineChart} />
				</Routes>
			</div>
		</main>
	);
};

export default Home;
