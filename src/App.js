import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";

// object to map the filter names to the functions that implement them
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
// Object.keys() returns an array of the keys of an object
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // this function is passed into <From /> as a prop and is called there to add a new task to the list
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, complete: false};
    setTasks([...tasks, newTask]);
  }

  // tasks hook
  const [tasks, setTasks] = useState(props.tasks);
  // filter hook
  const [filter, setFilter] = useState('All');

  // function to toggle whether or not a task is completed
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // function to delete a task
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

// edit task
function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    }
    );
    setTasks(editedTaskList);
}

  const taskList = tasks
  .filter( FILTER_MAP[filter])
  .map((task) => 
  <Todo 
  id={task.id} 
  name={task.name} 
  completed={task.completed} 
  key={task.id}
  toggleTaskCompleted={toggleTaskCompleted}
  deleteTask={deleteTask}
  editTask={editTask}
  />
  );

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter}/>
  ));

  

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      {/* filter button */}
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      {/* task list */}
      <h2 id="list-heading"> {taskList.length} {tasksNoun} remaining</h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}
export default App