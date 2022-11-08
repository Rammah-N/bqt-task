import { Button } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import "../../styles/todos.scss";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getApps } from "firebase/app";
import { BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setToDos } from "../../store/reducers/todos";
import { FcTodoList } from "react-icons/fc";
import { db } from "../../firebase";
import { Notify } from "notiflix";
const ToDo = () => {
	const [loading, setLoading] = useState(false);
	const [todo, setToDo] = useState("");
	const [todos, setCurrentToDos] = useState([]);
	const currentUser = useSelector((state) => state?.user)?.uid;
	const dispatch = useDispatch();
	const todosState = useSelector((state) => state.todos);
	useEffect(() => {
		if (todosState) {
			setCurrentToDos(todosState);
		}
	});
	const addToDo = async () => {
		if (todo) {
			setLoading(true);

			try {
				const docRef = await addDoc(collection(db, `${currentUser}-todo`), {
					todo: todo,
				});
				Notify.success("Your To-Do was added successfully!");
				setCurrentToDos([...todos, { todo }]);
				setToDo("");
				dispatch(setToDos([...todos, { todo }]));
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
		} else {
			Notify.info("Please write something", {
				showOnlyTheLastOne: true,
				timeout: 2000,
			});
		}
	};
	const onChange = (e) => {
		setToDo(e.target.value);
	};

	return (
		<div className="todos">
			<div className="todos-actions">
				<Input
					placeholder="Enter your To-Do here!"
					value={todo}
					onChange={(e) => onChange(e)}
				/>
				<Button
					type="primary"
					onClick={addToDo}
					loading={loading}
					icon={<BiPencil size={18} />}
					style={{ display: "flex", alignItems: "center", gap: "5px" }}>
					Add
				</Button>
			</div>

			<div className="todos-container">
				{todos.length < 1 ? (
					<h2>Please add items to your To-Do List</h2>
				) : (
					<>
						<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
							<FcTodoList size={25} />
							<h1 style={{ marginBottom: 0 }}>To Do List: </h1>
						</div>
						<div className="items">
							{todos.map((item) => (
								<div className="item">
									<h3>{item.todo}</h3>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ToDo;
