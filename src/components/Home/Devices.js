import React, { useEffect, useState } from "react";
import { Checkbox, Form, Row, Col, InputNumber, Button } from "antd";
import { GiWifiRouter } from "react-icons/gi";
import { MdSave } from "react-icons/md";
import { AiOutlineLaptop, AiOutlineMobile } from "react-icons/ai";
import { RiComputerLine } from "react-icons/ri";
import { BiServer } from "react-icons/bi";
import "../../styles/devices.scss";
import { Notify } from "notiflix";
import { useDispatch } from "react-redux";
import { setDevices } from "../../store/reducers/devices";
import { useSelector } from "react-redux";
import {
	getFirestore,
	collection,
	addDoc,
	getDoc,
	setDoc,
	doc,
} from "firebase/firestore";
import { getApps } from "firebase/app";
import { db } from "../../firebase";
const Devices = () => {
	const [loading, setLoading] = useState(false);
	const [checked, setChecked] = useState({
		Router: false,
		PC: false,
		Laptop: false,
		Mobile: false,
		Server: false,
	});
	const devices = useSelector((state) => state?.devices);
	const currentUser = useSelector((state) => state?.user)?.uid;
	useEffect(() => {
		if (devices) {
			devicesForm.setFieldsValue(devices);
			const newState = { ...checked };
			for (let key in devices) {
				newState[key] = true;
			}
			setChecked(newState);
		}
	}, []);

	const [devicesForm] = Form.useForm();
	const dispatch = useDispatch();

	const onChange = (e) => {
		const newState = { ...checked };
		const name = e.target.name;
		newState[name] = e.target.checked;
		setChecked(newState);
	};

	const onFinish = async (values) => {
		setLoading(true);
		const formValues = Object.values(values);
		if (formValues.every((item) => !item)) {
			Notify.info("Please select a device first", { showOnlyTheLastOne: true });
		} else {
			const newValues = {};
			for (let key in values) {
				if (values[key]) {
					newValues[key] = values[key];
				}
			}
			dispatch(setDevices(newValues));
			try {
				const docRef = await setDoc(
					doc(db, "devices", `${currentUser}-devices`),
					{
						newValues,
					}
				);
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
			Notify.success("Your devices have been added successfully", {
				showOnlyTheLastOne: true,
			});
		}
	};

	return (
		<div className="devices">
			<h1>Please select the devices you're using, and how many you own</h1>
			<Form name="devices-form" onFinish={onFinish} form={devicesForm}>
				<div className="device-input">
					<GiWifiRouter size={28} />
					<Checkbox onChange={onChange} checked={checked.Router} name="Router">
						Router
					</Checkbox>
					<Form.Item
						rules={[
							{
								required: checked.Router,
								message: "Please enter the quantity",
							},
						]}
						name="Router">
						<InputNumber
							min={1}
							name="Router"
							type="number"
							placeholder="Quantity"
							disabled={!checked.Router}
						/>
					</Form.Item>
				</div>

				<div className="device-input">
					<RiComputerLine size={28} />
					<Checkbox onChange={onChange} checked={checked.PC} name="PC">
						PC
					</Checkbox>
					<Form.Item
						rules={[
							{ required: checked.PC, message: "Please enter the quantity" },
						]}
						name="PC">
						<InputNumber
							min={1}
							name="PC"
							type="number"
							placeholder="Quantity"
							disabled={!checked.PC}
						/>
					</Form.Item>
				</div>

				<div className="device-input">
					<AiOutlineLaptop size={28} />
					<Checkbox onChange={onChange} checked={checked.Laptop} name="Laptop">
						Laptop
					</Checkbox>
					<Form.Item
						rules={[
							{
								required: checked.Laptop,
								message: "Please enter the quantity",
							},
						]}
						name="Laptop">
						<InputNumber
							min={1}
							name="Laptop"
							type="number"
							placeholder="Quantity"
							disabled={!checked.Laptop}
						/>
					</Form.Item>
				</div>

				<div className="device-input">
					<AiOutlineMobile size={28} />
					<Checkbox onChange={onChange} checked={checked.Mobile} name="Mobile">
						Mobile
					</Checkbox>
					<Form.Item
						rules={[
							{
								required: checked.Mobile,
								message: "Please enter the quantity",
							},
						]}
						name="Mobile">
						<InputNumber
							min={1}
							name="Mobile"
							type="number"
							placeholder="Quantity"
							disabled={!checked.Mobile}
						/>
					</Form.Item>
				</div>

				<div className="device-input">
					<BiServer size={28} />
					<Checkbox onChange={onChange} checked={checked.Server} name="Server">
						Server
					</Checkbox>
					<Form.Item
						rules={[
							{
								required: checked.Server,
								message: "Please enter the quantity",
							},
						]}
						name="Server">
						<InputNumber
							min={1}
							name="Server"
							type="number"
							placeholder="Quantity"
							disabled={!checked.Server}
						/>
					</Form.Item>
				</div>
				<Button
					htmlType="submit"
					type="primary"
					size="large"
					icon={<MdSave size={18} />}
					style={{ display: "flex", alignItems: "center", gap: "10px" }}
					loading={loading}>
					Save
				</Button>
			</Form>
		</div>
	);
};

export default Devices;
