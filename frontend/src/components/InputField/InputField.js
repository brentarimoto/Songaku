/*************** REACT IMPORTS ***************/
/*************** OTHER IMPORTS ***************/
/*************** COMPONENTS ***************/
const InputField = ({label, type, classname})=>{
    return(
        <div className={`${classname}-div`}>
            <label>{label}: </label>
            <input className={classname} type={type} placeholder={label}></input>
        </div>
    )
}

/*************** EXPORT ***************/
export default InputField;