import React from "react";
import { useState, useEffect } from "react";


const Home = () => {
	const [task,setTask] = useState('')
	const [tasks,setTasks] = useState([])

	// Add into an array => concat
	// Delete from array => filter
	// Update => map

	function getTasks (){ //Trae tareas del API
		fetch('https://assets.breatheco.de/apis/fake/todos/user/nicoramirez12', {
			method: "GET"})
		.then((response) => response.json())
		.then((data) => setTasks(data))
	}

	function updateTasks(opt,index){
		let newTasks = []

		if(opt == "put"){
			newTasks = [...tasks,{label: task, done: false}];
		} else {
			newTasks = (tasks.filter(
				(t,currentIndex) => 
					index != currentIndex
					)
				)
		}
		
		fetch('https://assets.breatheco.de/apis/fake/todos/user/nicoramirez12', {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newTasks)
   		})
		.then(response => {return response.json();})
		.then(data => console.log(data)) //this will print on the console the exact object received from the server
		.catch(error => {console.log(error);});
	}

	useEffect(() => {
		getTasks()
	},[tasks])

	return (
		<>
			<div>
				<div className="container">
					<h1 className="display-2 text-center"><strong>Todo's</strong></h1>
					<div>
						<ul>
							<li>
								<input 
									type="text" 
									value={task} 
									onChange={(e)=>setTask(e.target.value)}
									onKeyDown={(e)=> {
										if (e.key === "Enter" && !task == ''){
											updateTasks("put",null)
											setTask("")
										}
									}}
									placeholder="What do you need to do?"/>
							</li>
							{tasks.map((item,index) => 
								<li key={index} className="element">
									{item.label} <i className="icon fas fa-trash float-end" 
										onClick={() => updateTasks("delete",index)}></i>
								</li>
							)}
							<li className="footer">{tasks.length} Tasks</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;