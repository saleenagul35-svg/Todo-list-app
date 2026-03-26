import React, { useState } from "react"
import "./editpage.css"
import backbtn from "../../assets/images/backbtn.png"
import { useNavigate } from "react-router-dom"

const EditPage = ({ setEditTask, editTask, setTasks, tasks }) => {

    const Homenavigate = useNavigate()
    const UpdataData = async (event) => {

        const id = editTask._id
        event.preventDefault()


        try {

            await fetch(`https://todo-list-app-v7wf.vercel.app/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
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
        setUpdatedData({ Title: "", Detail: "" })
         Homenavigate("/home")
    }




    // setTasks((prev) =>
    //     prev.map((b) =>

    //         editTask.id === b.id ?
    //             { ...b, Title: updatedData.Title, Detail: updatedData.Detail }
    //             : b
    //     )
    // )
   


    const [updatedData, setUpdatedData] = useState({
        Title: "",
        Detail: "",
        Status: false
    })

    const UpdatingValues = (event) => {
        const { name, value } = event.target
        setUpdatedData((prev) => ({
            ...prev,
            [name]: value
        })

        )

    }



    const backHome = () => {
        Homenavigate("/home")
    }
    return (
        <>
            <section className="flex justify-center h-screen ">
                <div className="w-96 flex flex-col border-2 border-gray-100">
                    <div className="flex h-28 items-center gap-8 backclor p-4">
                        <img src={backbtn} alt="" onClick={backHome} />
                        <h1 className="font-medium">Edit Task</h1>

                    </div>
                    <form onSubmit={UpdataData} action="" className="flex flex-col px-5 py-7 gap-5">
                        <input type="text" placeholder="Title" name="Title" value={updatedData.Title} onChange={UpdatingValues} className="py-2 w-85 border-b-[1.5px] border-gray-300 focus:outline-none" required />
                        <input type="text" placeholder="Detail" name="Detail" value={updatedData.Detail} onChange={UpdatingValues} className="py-2 w-85 border-b-[1.5px] border-gray-300 focus:outline-none" required />
                        <div className="flex gap-16 items-center">
                            <button type="submit" className="w-36 backclor py-4 font-medium my-4 rounded-2xl" >Update</button>
                            <button type="button" className="w-36 backclor py-4 font-medium my-4 rounded-2xl" onClick={backHome}>Cancel</button>
                        </div>
                    </form>


                </div>
            </section>
        </>
    )
}
export default EditPage