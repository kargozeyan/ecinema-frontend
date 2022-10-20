import {Context} from "../index";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import Input from "../components/input";

const ProfilePage = () => {
    const {store} = useContext(Context)
    const [firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const user = store.user

    return (<div className="container" style={{height: "100vh"}}>
        <p className="title is-4 has-text-light">My Profile</p>
        <div style={{height: "1px"}} className="has-background-light mb-6"></div>
        <Input label="First Name" defValue={user.firstName} onChange={setFirstName}/>
        <Input label="Last Name" defValue={user.lastName} onChange={setLastName}/>
        <Input label="Email" defValue={user.email} onChange={setEmail}/>
        <Input label="New Password" onChange={setNewPassword} type="password"/>
        <Input label="Old Password" onChange={setOldPassword} type="password"/>
        <button className="button is-primary has-text-weight-bold is-center" onClick={() => {
        }}>Save Changes
        </button>
    </div>)
}

export default observer(ProfilePage)
