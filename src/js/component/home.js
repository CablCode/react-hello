import React, { useState, useEffect } from "react";
import { string } from "prop-types";

let x = 0;
let url = "https://assets.breatheco.de/apis/fake/todos/user/CablCode";

export function Home() {
	const [todo, setTodo] = useState("");
	const [tasks, setTasks] = useState([]);

	let addTodo = "";

	const getList = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				const newTasks = response.map(item => {
					return item;
				});
				setTasks(newTasks);
			});
	};

	const updateList = () => {
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(tasks)
		})
			.then(response => {
				return response;
			})
			.catch(err => {
				console.log(err);
			});
	};

	function addTask(event) {
		addTodo = event.target.value;
		if (event.key === "Enter") {
			if (addTodo) {
				const newTask = { label: addTodo, done: false };
				setTasks([...tasks, newTask]);
				setTodo("");
			} else {
				alert("ADD YOUR TASK");
			}
		}
		x = tasks.length;
	}

	function removeItem(i) {
		let newtasks = tasks.filter(item => item.label != i);
		x = newtasks.length;
		setTasks(newtasks);
	}

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		if (tasks.length) {
			updateList();
		}
	}, [tasks]);

	const TodosHTML = tasks.map((task, i) => {
		return (
			<li
				className="list-group-item"
				onClick={() => {
					removeItem(task.label);
				}}
				key={i}
				id={i}
				value={task.label}
				{...(x = tasks.length)}>
				{task.label}
			</li>
		);
	});

	return (
		<div className="list">
			<div className="text-center mt-5">
				<h1 className="title"> TO-DO-LIST </h1>
			</div>
			<div className="text-center mt-5">
				<ul className="list-group">
					<input
						id="myInput"
						value={todo}
						placeholder="ADD YOUR TASK"
						onChange={e => setTodo(e.target.value)}
						onKeyPress={e => addTask(e, todo)}></input>
					<div>{TodosHTML}</div>
				</ul>
			</div>
		</div>
	);
}
