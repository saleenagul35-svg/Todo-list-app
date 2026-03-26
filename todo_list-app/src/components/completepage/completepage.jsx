import React, { useEffect, useState } from "react"
import "./completepage.css"
import backbtn from "../../assets/images/backbtn.png"
import { useNavigate } from "react-router-dom"

const CompletePage = ({ tasks, setTasks }) => {
    const Homenavigate = useNavigate()
    const backHome = () => {
        Homenavigate("/home")
    }
    const fun = async () => {
        try {

            const response = await fetch("https://todo-list-app-v7wf.vercel.app/data", {
                method: "GET",

            })
            const Data = await response.json()
            const dataArray = Data.data
            // console.log(dataArray);
            setTasks(dataArray)

        } catch (error) {
            console.log(error);

        }
    }
    fun()
    let competedTasks = tasks.filter(e =>
        e.Status === true

    )
    return (
        <>
            <section className="flex justify-center h-screen">
                <div className="w-96 flex flex-col border-2 border-gray-100">
                    <div className="flex h-28 items-center gap-8 backclor p-4">
                        <img src={backbtn} alt="" onClick={backHome} />
                        <h1 className="font-medium">Completed Task</h1>

                    </div>
                    <div className="relative background h-[90vh]">
                        <div className="  h-[80vh] flex flex-col overflow-y-scroll">
                            {competedTasks.map((e, index) => (
                                <div className="m-4 rounded-2xl p-2.5 flex justify-between bg-white min-h-fit w-82 " id="addingtasks" key={index} >
                                    <div className=" p-1.5 flex flex-col justify-center min-w-0  ">
                                        <h1 className="color uppercase overflow-auto">{e.Title}</h1>
                                        <h2 className="overflow-auto w-50">{e.Detail}</h2>
                                    </div>

                                </div>
                            ))}


                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}
export default CompletePage