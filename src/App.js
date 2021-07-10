import { useState, useEffect } from "react";
// importing from react-router-dom
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
    //async cause it calls fetchTask which returns a promise.
  }, []); //dependency array, idk this shit.

  //fetch data (Tasks)

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    //console.log(data);
    return data;
  };

  // fetch task

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task), // conversion from JS object to json string type.
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    //no need to create an ID, it will be assigned by fetch mechanism.

    //const id = Math.floor(Math.random()*10000)+1
    //console.log(id)
    //const newTask = {...task, id}
    //setTasks([...tasks,newTask])
  };
  //delete task functionality.
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
    //setTasks is the function that comes with useState hook, for updating the state.
  };
  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onClickAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "NO TASKS AVAILABLE"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
