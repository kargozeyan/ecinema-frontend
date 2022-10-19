import {Fragment} from "react";

const Input = ({id, label, type, margin, onChange, defValue}) => {
    return (
        <Fragment>
            <label className={`label has-text-left has-text-light ${margin}`} htmlFor={id}>{label}</label>
            <input className="input mb-3" id={id} type={type} placeholder={label} onChange={(e) => {
                onChange(e.target.value)
            }} defaultValue={defValue}/>
        </Fragment>
    )
}

export default Input