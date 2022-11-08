import "../../styles/Login.scss";
import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Notify } from "notiflix";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { setToDos } from "../../store/reducers/todos";
import { setDevices } from "../../store/reducers/devices";
import { setUser } from "../../store/reducers/user";
const Register = () => {
	const [loading, setLoading] = useState(false);
	const auth = getAuth(app);
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const onFinish = (values) => {
		setLoading(true);
		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				Notify.success(
					"You have registered successfully, redirecting you to Dashboard Homepage",
					{ showOnlyTheLastOne: true, timeout: 3000 }
				);
				setLoading(false);
				dispatch(setToDos(null))
				dispatch(setDevices(null))
				dispatch(setUser(user))
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				Notify.failure(error.message);
			});
	};
	return (
		<div className="login">
			<div className="login-info">
				<div className="info-container">
					<h1 className="title">Register</h1>
					<div className="subtitle">
						<span>Already have an account ?</span>
						<Link to="/login">Sign In</Link>
					</div>
					<Form className="login-form" onFinish={onFinish} name="register-form">
						<Form.Item
							name="email"
							label="E-Mail"
							rules={[
								{
									required: true,
									type: "email",
									message: "Please enter your E-Mail Address",
								},
							]}>
							<Input name="email" type="email" placeholder="E-Mail Address" />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{ required: true, message: "Please enter your Password" },
								{
									min: 8,
									message: "Your password must be at least 8 characters",
								},
							]}>
							<Input.Password
								name="password"
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								style={{ marginTop: "20px", width: "100%" }}
								loading={loading}>
								Register
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className="login-bg">
				<h1>Glad you're joining us!</h1>
			</div>
		</div>
	);
};

export default Register;
