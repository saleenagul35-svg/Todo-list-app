import React, { useEffect, useState } from "react"
import "./login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const [logIn, setLogIn] = useState({
        Email: "",
        Password: ""
    })
    const LogInData = (event) => {
        const { name, value } = event.target
        setLogIn(prev => ({
            ...prev,
            [name]: value
        }))

    }
    const savedDetails =
    {
        Email: "saleenagul35@gmail.com",
        Password: "Nuture@2.0"
    }

    localStorage.setItem("savedDetails", JSON.stringify(savedDetails))
    const matchingFunction = () => {
        let retrivedDetails = JSON.parse(localStorage.getItem("savedDetails"))


        if (retrivedDetails.Email === logIn.Email && retrivedDetails.Password === logIn.Password) {
            localStorage.setItem("loginDetail", JSON.stringify(logIn));
            alert("successfully login")
            navigate("/home")
        } else {
            alert("Incorrect Username or Password")
        }
        setLogIn({
            Email: "",
            Password: ""
        })
    }

    const LogInHome = (event) => {
        event.preventDefault()

        // matchingFunction();

        navigate("/home")


    }
    return (
        <>
            <section className="flex justify-center h-screen  ">
                <div className="w-96 flex flex-col border-2 border-gray-100">
                    <div className="flex h-28 items-center gap-8 backclor p-4">

                        <h1 className="font-medium">LOGIN</h1>

                    </div>
                    <form action="" onSubmit={LogInHome} className="flex flex-col px-5 py-7 gap-5">

                        <input type="email" placeholder="Email" name="Email" value={logIn.Email} className="py-2 w-85 border-b-[1.5px] border-gray-300 focus:outline-none" onChange={LogInData} required />
                        <input type="password" placeholder="Password" name="Password" value={logIn.Password} className="py-2 w-85 border-b-[1.5px] border-gray-300 focus:outline-none" onChange={LogInData} required />
                        <button type="submit" className="w-85 backclor py-4 font-medium my-4 rounded-2xl" >LOGIN</button>
                    </form>


                </div>
            </section>
        </>
    )
}
export default Login
