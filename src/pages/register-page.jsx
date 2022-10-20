import {Link, useNavigate} from "react-router-dom";
import Input from "../components/input";
import {useContext, useState} from "react";
import {Context} from "../index";
import Joi from "joi";
import toast from "react-hot-toast";

const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email({tlds: {allow: false}}),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).messages({
        'any.only': "Passwords are not the same"
    })
})

const RegisterPage = () => {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return <div className="lr-form">
        <h1 className="title is-1 has-text-light has-text-centered">Register</h1>
        <Input id="fname" type="text" onChange={setFirstName} label="First Name"/>
        <Input id="lname" type="text" onChange={setLastName} label="Last Name"/>
        <Input id="email" type="email" onChange={setEmail} label="Email"/>
        <Input id="password" type="password" onChange={setPassword} label="Password"/>
        <Input id="confirmPassword" type="password" onChange={setConfirmPassword} label="Confirm Password"/>
        <button className="button is-primary mt-4 is-fullwidth" onClick={async () => {
            const {error, value} = schema.validate({firstName, lastName, email, password, confirmPassword})
            if (error) {
                toast.error(error.message)
            } else {
                const {firstName, lastName, email, password} = value
                await toast.promise(store.register(firstName, lastName, email, password), {
                    loading: "Registering...",
                    success: () => {
                        navigate(-1)
                        return `Registered as ${store.user.firstName} ${store.user.lastName}`
                    },
                    error: e => e.response.data
                })
            }
        }}>Register
        </button>
        <Link className="button is-primary mt-2 is-outlined is-fullwidth" to="/login">Login</Link>
    </div>
}

export default RegisterPage