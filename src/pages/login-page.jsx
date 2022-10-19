import {Link, useNavigate} from "react-router-dom";
import Input from "../components/input";
import {useContext, useState} from "react";
import {Context} from "../index";
import toast from "react-hot-toast";

const LoginPage = (props) => {
    const navigate = useNavigate()
    const {store} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return <div className="lr-form">
        <h1 className="title is-1 has-text-light has-text-centered">Login</h1>
        <Input id="email" type="email" label="Email" onChange={setEmail}/>
        <Input id="password" type="password" label="Password" onChange={setPassword}/>
        <button className="button is-primary mt-4 is-fullwidth" onClick={async () => {
            await toast.promise(store.login(email, password), {
                loading: "Logging in...",
                success: () => {
                    navigate(-1);
                    return `Logged in as ${store.user.firstName} ${store.user.lastName}`
                },
                error: () => "Incorrect login/password"
            })
        }
        }>Login
        </button>
        <Link className="button is-primary mt-2 is-outlined is-fullwidth" to="/register">Register</Link>
    </div>
}

export default LoginPage