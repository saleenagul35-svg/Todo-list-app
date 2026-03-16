import { useState } from 'react'

import './App.css'
import Home from './components/home/home'
import { Routes, Route } from "react-router-dom"
import Addpage from "./components/addpage/addpage"
import CompletePage from "./components/completepage/completepage"
import EditPage from './components/editpage/editpage'
import Login from './components/login/login'

function App() {
  const [tasks, setTasks] = useState([]);
  const [handleForm, setHandleForm] = useState({ Title: "", Detail: "", Status: false })
  const [editTask, setEditTask] = useState(null);

  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home data={handleForm} tasks={tasks} setTasks={setTasks} setEditTask={setEditTask} />} />
        <Route path="/addpage" element={<Addpage handleForm={handleForm} setHandleForm={setHandleForm} setTasks={setTasks} tasks={tasks} />} />
        <Route path="/completedpage" element={<CompletePage tasks={tasks} setTasks={setTasks} />} />
        <Route path="/editpage" element={<EditPage editTask={editTask} setEditTask={setEditTask} tasks={tasks} setTasks={setTasks} />} />
      </Routes>
  

    </>
  )
}

export default App
