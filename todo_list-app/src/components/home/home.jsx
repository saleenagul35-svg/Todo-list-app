import React, { useEffect } from "react"
import "./home.css"
import Calender from "../../assets/images/calender.png"
import tick from "../../assets/images/tick.png"
import list from "../../assets/images/list.png"
import plus from "../../assets/images/plus.png"
import { useNavigate } from "react-router-dom"
import trash from "../../assets/images/Trash.png"
import pencil from "../../assets/images/Pencil.png"
import check from "../../assets/images/Check.png"



const Home = ({ data, tasks, setTasks, setEditTask }) => {


    const navigateAdd = useNavigate()
    const addPage = () => {
        navigateAdd("/Addpage")
    }
    const completedTask = () => {
        navigateAdd("/completedpage")
    }
    const GoToEditPage = async (t) => {
        setEditTask(t)

        navigateAdd("/editpage")
    }
    const DeleteTask = async (id) => {

        try {
            let response = await fetch(`https://todo-list-app-v7wf.vercel.app/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },

            })


        } catch (error) {
            console.log(error);

        }

        try {

            const response = await fetch("https://todo-list-app-v7wf.vercel.app/data", {
                method: "GET",

            })
            const Data = await response.json()
            const dataArray = Data.data
            console.log(dataArray);
            setTasks(dataArray)

        } catch (error) {
            console.log(error);

        }

 

    }
    const CheckTask = async (id) => {


        try {
            let response = await fetch(`https://todo-list-app-v7wf.vercel.app/check/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Status:true})

            })


        } catch (error) {
            console.log(error);

        }

        
    }

useEffect(()=>{
        const getFun = async () => {
        try {

            const response = await fetch("https://todo-list-app-v7wf.vercel.app/data", {
                method: "GET",

            })
            const Data = await response.json()
            const dataArray = Data.data
            setTasks(dataArray)

        } catch (error) {
            console.log(error);

        }
    }
    getFun()
    console.log("useEffect running")
}
    
,[])

    return (
        <>
            <section className="flex justify-center h-screen ">
                <div className="w-96 flex flex-col border-2 border-gray-100">
                    <div className="flex h-28 items-center justify-between backclor p-4">
                        <h1 className="font-medium">TODO APP</h1>
                        <img src={Calender} alt="" />
                    </div>
                    <div className="flex justify-around items-center p-2.5 text-center">
                        <div>
                            <img src={list} alt="" className="w-8 h-6" />
                            <h6 className="">All</h6>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <img src={tick} alt="" className="w-5 h-2.5 m-2" onClick={completedTask} />
                            <h6 onClick={completedTask}>Completed</h6>
                        </div>
                    </div>
                    <div className="relative background h-[72vh]">
                        <div className="  h-[60vh] flex flex-col overflow-auto">
                            {tasks.map((e, index) => (
                                <div className="m-4 rounded-2xl flex justify-center bg-white min-h-fit w-82 " id="addingtasks" key={index} >
                                    <div className=" p-1.5 flex flex-col justify-center min-w-0  ">
                                        <h1 className="color uppercase overflow-auto ">{e.Title}</h1>
                                        <h2 className=" w-50   overflow-auto ">{e.Detail}</h2>
                                    </div>
                                    <div className="flex gap-3 items-center px-2 shrink-0">
                                        <img src={pencil} alt="" className="h-6" onClick={() => GoToEditPage(e)} />
                                        <img src={trash} alt="" className="h-6" onClick={() => DeleteTask(e._id)} />

                                        <img src={check} alt="" className="h-6" onClick={() => CheckTask(e._id)} />
                                    </div>
                                </div>
                            ))}


                        </div>

                        <div className="absolute bottom-0 right-0 m-3 mb-5  ">
                            <img src={plus} alt="" className="h-14 w-14" onClick={addPage} />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Home
