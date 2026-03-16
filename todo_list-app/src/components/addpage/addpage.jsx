import React, { useEffect, useState } from "react"
import "./addpage.css"
import backbtn from "../../assets/images/backbtn.png"
import { useNavigate } from "react-router-dom"
import { jsx } from "react/jsx-runtime"


const Addpage = ({ handleForm, setHandleForm, setTasks, tasks }) => {
    const HomeNavigate = useNavigate()

    const backHome = () => {
        HomeNavigate("/home")
    }


    const formData = (event) => {
        const { name, value } = event.target
        setHandleForm((prev) => ({
            ...prev,
            [name]: value,


        }))

    }


    const submitBackHome =async (event) => {
         event.preventDefault()
        
     
        try{
            
            const response = await fetch("http://localhost:5000/submit",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(handleForm)
            })
            
          
            

        }catch(error){
            console.log(error);
            
        }

        setHandleForm({ Title: "", Detail: "" })
        HomeNavigate("/home")
       
    }


    return (
        <>
            <section className="flex justify-center h-screen  ">
                <div className="w-96 flex flex-col border-2 border-gray-100">
                    <div className="flex h-28 items-center gap-8 backclor p-4">
                        <img src={backbtn} alt="" onClick={backHome} />
                        <h1 className="font-medium">Add Task</h1>

                    </div>
                    <form action="" onSubmit={submitBackHome} className="flex flex-col px-5 py-7 gap-5">
                        <input type="text" placeholder="Title" name="Title" value={handleForm.Title} className="py-2 w-85 border-b-[1.5px] border-gray-300 focus:outline-none" onChange={formData} required />
                        <input type="text" placeholder="Detail" name="Detail" value={handleForm.Detail} className="py-2 w-85 border-b-[1.5px] border-gray-300 focus:outline-none" onChange={formData} required />
                        <button type="submit" className="w-85 backclor py-4 font-medium my-4 rounded-2xl" >ADD</button>
                    </form>


                </div>
            </section>
           
        </>
    )
}
export default Addpage