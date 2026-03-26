import { lazy, useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from './components/login/login'

const Addpage = lazy(()=>import("./components/addpage/addpage"))
const Home = lazy(()=>import('./components/home/home'))
const CompletePage = lazy(()=>import("./components/completepage/completepage"))
const EditPage = lazy(()=>import('./components/editpage/editpage'))

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
