import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const NewUser = (props) => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState(""); 
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ associatedHOAs, setAssociatedHOAs ] = useState([]);             // SINCE THIS IS AN ARRAY IS THIS OK??? ASKKSKSKAKSKSKSAKSAKSAKSAKSAK
    // const [ streetAddress, setStreetAddress ] = useState("");
    const [ streetNumber, setStreetNumber ] = useState("");
    const [ streetName, setStreetName ] = useState("");
    const [ unit, setUnit ] = useState("");   
    const [ state, setState ] = useState(""); 
    const [ zipCode, setZipCode ] = useState("");  
    const [ residentSince, setResidentSince ] = useState("");
    const [ userTotalVehicles, setUserTotalVehicles ] = useState(""); 
    const [ pictureUrl, setPictureUrl ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ confirmNewUser, setConfirmNewUser ] = useState("");
    const [errs, setErrs ] = useState({});  //READY FOR OBJECT

const submitForm = event => {
    console.log("click")
    event.preventDefault();
    // NAU USE AXIOS!
    // console.log(Number(stockLength.replace(/[^0-9.-]+/g,"")))
    // console.log(stockLength)

    const newUser = {       //USE THIS AS AN OBJECT
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,   
        associatedHOAs: associatedHOAs,
        // streetAddress: streetAddress,
        streetNumber: streetNumber,
        streetName: streetName,
        unit: unit,
        state: state,
        zipCode: zipCode,
        residentSince: residentSince,
        userTotalVehicles: userTotalVehicles,
        pictureUrl: pictureUrl,
        description: description
        // confirmNewUser: confirmNewUser  DONT USE HERE?
    };

    console.log(newUser);

    // SETUP WITH LOGIN 
//CHANGING FROM with {withCredentials: true,}             add V  ,        V added here

    axios.post("http://localhost:7777/api/user/register", newUser)  
        .then(response => {
            if(response.data.errors) {
                setErrs(response.data.errors);
            } else {    
            console.log(response.data);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");           
            setAssociatedHOAs("");
            // setStreetAddress("");
            setStreetNumber("");
            setStreetName("");
            setUnit("");
            setState("");
            setZipCode("");
            setResidentSince("");
            setUserTotalVehicles("");
            setPictureUrl("");
            setDescription("");

            setErrs({}); // THIS MUST BE DONE IF ITS SUCCESSFUL TOO TO AVIOD CRASHES

            setConfirmNewUser("Thank you.  Your new account with Steamline Yachts has been created.");



// THIS IS WHERE THE ALERT IS PASSED IN AND POSED THROUHG THE NEW USER FROM THE BACKEND
// ONLY NEED TO SET IT HERE NOT MADE A CONST ABOVE
// IN REFERENCE THROUGH response.data
// THE .msg IS HOW IT IS CALLED ON THE BACKEND THROUGH THE users.controller.js 
            props.setAlert(response.data.msg)


            navigate(`/`);   // SENDS TO MAIN PAGE
            }
            })

            //
            // AGH WHY IS THIS A PROBLEM
        .catch((err) => { 
            // console.log(err);
            // console.log("this is INSIDE the catch block"); 
            setErrs(err.response.data.errors);  // problem?????
            // setErrs(err);  // problem?????
        });  
};
            //

const titleHeader = 
{
    border: "4px solid rgb(176, 217, 255)",
    borderRadius: "20px",
    // display: "inline-block",
    margin: "20px",
    marginLeft: "35px",
    marginRight: "35px",
    // fontWeight: "bold",
    padding: "25px",
    // fontWeight: "bolder",
    // fontSize: "large",
    //textAlign: "left",
    background: "rgb(224, 240, 255)",
    paddingBottom: "20px"
};
const skiffContainer = 
{
    border: "2px solid darkblue",
    borderRadius: "20px",
    display: "inline-block",
    width: "66%",
    margin: "10px",
    fontWeight: "bold",
    paddingLeft: "25px",
    paddingRight: "25px",
    textAlign: "center",
    background: "white",
    paddingBottom: "20px",
    paddingTop: "20px"
};
const mainNameContainer = 
{
    border: "4px solid rgb(176, 217, 255)",
    borderRadius: "20px",
    display: "inline-block",
    margin: "10px",
    fontWeight: "bold",
    padding: "15px",
    fontWeight: "bolder",
    fontSize: "large",
    //textAlign: "left",
    background: "rgb(224, 240, 255)",
    paddingBottom: "20px"
};
const buttonStyle = 
    {
        marginTop: "15px",
        marginLeft: "15px",
        marginRight: "15px",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        background: "rgb(27, 36, 87)",
        color: "white",
        fontWeight: "bolder",
        fontSize: "small",
        border: "2px solid darkblue",
        borderRadius: "30px",
    };
const inputTextPadding = 
    {
        paddingTop: "7px",
        paddingBottom: "7px",
        paddingLeft: "25px",
        paddingRight: "25px",
        borderRadius: "30px",
        border: "2px solid rgb(176, 217, 255)",
        margin: "5px",
        marginLeft: "20px"
    };
const inputTextPaddingSpecial = 
    {
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: "30px",
        border: "2px solid rgb(176, 217, 255)",
        marginTop: "-5px",
        alignItems: "center",
    };
const textAreaPadding = 
        {
            padding: "10px",
            borderRadius: "30px",
            border: "2px solid rgb(176, 217, 255)",
            margin: "5px",
            width: "72%",
            height: "100px"
        };
const inputPadDesc = 
        {
            align: "vertial",
        };
const errorAlert =
        {
            display: "inline-block",
            color: "white",
            background: "rgb(142, 3, 3)",
            borderRadius: "20px",
            padding: "5px",
            paddingLeft: "25px",
            paddingRight: "25px",
            margin: "0px",
            border: "2px solid rgb(220, 191, 191)",
        };
const enterAlert =
        {
            display: "inline-block",
            color: "white",
            background: "rgba(59, 132, 177, 1.0)",
            borderRadius: "20px",
            padding: "5px",
            paddingLeft: "25px",
            paddingRight: "25px",
            margin: "0px",
            marginTop: "6px",
            border: "2px solid rgba(191, 207, 220, 1.0)",
        };
const successAlert =
        {
            display: "inline-block",
            color: "white",
            background: "rgb(21, 103, 28)",
            paddingBottom: "3px",
            paddingTop: "0px",
            paddingLeft: "4px",
            paddingRight: "4px",
            borderRadius: "30px",
            marginTop: "9px",
            marginLeft: "10px",
            marginBottom: "3px",
            border: "2px solid rgb(192, 220, 191)",
        };
const successAlertLength =
        {
            alignItems: "right",
            justifyContent: "right",
            display: "inline-block",
            color: "white",
            background: "rgb(21, 103, 28)",
            paddingBottom: "3px",
            paddingTop: "0px",
            paddingLeft: "4px",
            paddingRight: "4px",
            borderRadius: "30px",
            marginTop: "3px",
            alignItems: "right",
            justifyContent: "right",
            marginBottom: "3px",
            marginLeft: "10px",
            border: "2px solid rgb(192, 220, 191)",
        };

return (
    <div>
        <h2 style={titleHeader}>Create New Account</h2>
        <form style={skiffContainer} onSubmit = {submitForm}>
            <div>
                <label>First Name</label>
                <input style={inputTextPadding} type="text" name="firstName" onBlur={(event) => setFirstName(event.target.value)}></input>
                { firstName.length == 0 ? null 
                    : firstName.length < 2 ? <span className="fadeInErrors" style={errorAlert}>Please enter a name longer than 1 character.</span>
                        : firstName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>Your first name is longer than 50 characters.  Please enter a shorter name. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.firstName? <span className="fadeInErrors" style={errorAlert}> { errs.firstName.message }</span> : null }
            </div>
            <div>
                <label>Last Name</label>
                <input style={inputTextPadding} type="text" name="lastName" onBlur={(event) => setLastName(event.target.value)}></input>
                { lastName.length == 0 ? null 
                    : lastName.length < 2 ? <span className="fadeInErrors" style={errorAlert}>Please enter a last name longer than 1 characters.</span>
                        : lastName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>Your last name is longer than 50 characters.  Please enter a shorter last name. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.lastName? <span className="fadeInErrors" style={errorAlert}> { errs.lastName.message }</span> : null }
            </div>
            <div>
                <label>Email Address</label>
                <input style={inputTextPadding} type="text" name="email" onBlur={(event) => setEmail(event.target.value)}></input>
                { email.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.email? <span style={errorAlert}> { errs.email.message }</span> : null }
            </div>

            <div>
                <label>Account Password</label>
                <input style={inputTextPadding} type="password" name="password" onBlur={(event) => setPassword(event.target.value)}></input>
                { password.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.password? <span style={errorAlert}> { errs.password.message }</span> : null }
            </div>
            <div>
                <label>Repeat Password</label>
                <input style={inputTextPadding} type="password" name="confirmPassword" onBlur={(event) => setConfirmPassword(event.target.value)}></input>
                { confirmPassword.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.confirmPassword? <span style={errorAlert}> { errs.confirmPassword.message }</span> : null }
            </div>
            
            <div>
                <label>HOA Association</label>
                <input style={inputTextPadding} type="text" name="associatedHOAs" onBlur={(event) => setAssociatedHOAs(event.target.value)}></input>
                { associatedHOAs.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.associatedHOAs? <span style={errorAlert}> { errs.associatedHOAs.message }</span> : null }
            </div>

            {/* ADD AN ADDRESS LABEL AND CSS TO MAKE THIS MORE USER FRIENDLY */}
            <div>
                <label>Street Number</label>
                <input style={inputTextPadding} type="number" name="streetNumber" onBlur={(event) => setStreetNumber(event.target.value)}></input>
                { streetNumber.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.streetNumber? <span style={errorAlert}> { errs.streetNumber.message }</span> : null }
            </div>
            <div>
                <label>Street Name</label>
                <input style={inputTextPadding} type="text" name="streetName" onBlur={(event) => setStreetName(event.target.value)}></input>
                { streetName.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.streetName? <span style={errorAlert}> { errs.streetName.message }</span> : null }
            </div>
            <div>
                <label>Unit</label>
                <input style={inputTextPadding} type="text" name="unit" onBlur={(event) => setUnit(event.target.value)}></input>
                { unit.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.unit? <span style={errorAlert}> { errs.unit.message }</span> : null }
            </div>
            <div>
                <label>State</label>
                <input style={inputTextPadding} type="text" name="state" onBlur={(event) => setState(event.target.value)}></input>
                { state.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.state? <span style={errorAlert}> { errs.state.message }</span> : null }
            </div>
            <div>
                <label>Zip Code</label>
                <input style={inputTextPadding} type="text" name="zipCode" onBlur={(event) => setZipCode(event.target.value)}></input>
                { zipCode.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.zipCode? <span style={errorAlert}> { errs.zipCode.message }</span> : null }
            </div>
            <div>
                <label>HOA Member Since</label>
                <input style={inputTextPadding} type="date" name="residentSince" onBlur={(event) => setResidentSince(event.target.value)}></input>
                { residentSince.length == 0 ? null 
                    : <p className="elementToFadeInAndOut" style={enterAlert}>Date selected...</p>}
                { errs.residentSince? <span className="fadeInErrors" style={errorAlert}> { errs.residentSince.message }</span> : null }
            </div>
            <div>
                <label>Total Vehicles</label>
                <input style={inputTextPadding} type="number" name="userTotalVehicles" onBlur={(event) => setUserTotalVehicles(event.target.value)}></input>
                { userTotalVehicles.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.userTotalVehicles? <span style={errorAlert}> { errs.userTotalVehicles.message }</span> : null }
            </div>
            
            <div>
                <label>Photo Link</label>
                <input style={inputTextPadding} type="text" name="pictureUrl" onBlur={(event) => setPictureUrl(event.target.value)}></input>
                { pictureUrl.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.pictureUrl? <span style={errorAlert}> { errs.pictureUrl.message }</span> : null }
            </div>
            <div>
                <div style={inputPadDesc}><label >Description:</label></div>
                <textarea style={textAreaPadding} type="text" name="description" rows={100} onBlur={(event) => setDescription(event.target.value)}></textarea>
                { description.length == 0 ? null 
                    : description.length < 6 ? <span className="fadeInErrors" style={errorAlert}>Please enter description longer than 6 characters.</span>
                        : description.length > 500 ? <span className="fadeInErrors" style={errorAlert}>Please enter a shorter description. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.description? <span style={errorAlert}> { errs.description.message }</span> : null }
            </div>
            
            <button style={buttonStyle} type="submit">Create Your New Account</button>
            <button style={buttonStyle} onClick={() => navigate(`/frontpage`)}>Cancel</button>
            
        </form>
    </div>
)
}

export default NewUser;