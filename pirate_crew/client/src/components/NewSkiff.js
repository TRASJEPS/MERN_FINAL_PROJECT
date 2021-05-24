import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CurrencyInput from 'react-currency-input-field';

// import { set } from 'mongoose';  DO NOT ADD THIS ON THE FRONT END

// SETTING UP REGEX using r
// the first forward slash ingicates start then the slash G at end is global to document 
// SETTING UP FOR CURRENCY  -- ADD TO INSIDE OF FUNCTION
// let regex = /^[0-9]+.[0-9][0-9]/g;

const NewSkiff = (props) => {
    const [ buildComplete, setBuildComplete ] = useState(false);
    const [ ownerName, setOwnerName ] = useState("");
    const [ builderName, setBuilderName ] = useState("");
    const [ modelName, setModelName ] = useState("Standard");  //AUTOMATICALLY STARTS AS STANDARD IN THIS CASE
    const [ startDate, setStartDate ] = useState("");
    const [ finishDate, setFinishDate ] = useState("");
    const [ stockLength, setStockLength ] = useState("");  // PLAY WITH NUMBERS 
    const [ customLength, setCustomLength ] = useState(""); // SET AS A NUMBER BUT USE AN EMPTY STRING SO CONSOLE PLAYS NICE
    const [ pictureUrl, setPictureUrl ] = useState("");
    const [ description, setDescription ] = useState("");
    const [errs, setErrs ] = useState({});  //READY FOR OBJECT
    // RIP REGEX 2021-2021
    // let regex = /^[0-9]+.[0-9][0-9]/g;  // SETTING UP FOR CURRENCY

    //     "buildComplete": true,
    //     "_id": "602f12d1708e671126bef843",
    //     "ownerName": "Jean Puggly",
    //     "builderName": "Flat Boat",
    //     "modelName": "Standard",
    //     "startDate": "2019-10-11T00:00:00.000Z",
    //     "finishDate": "2020-02-03T00:00:00.000Z",
    //     "stockLength": 26,
    //     "customLength": 26,
    //     "pictureUrl": "weekend_at_qweqw",
    //     "description": "LOOK MY HAT IS A HELMET TOO!",
    //     "createdAt": "2021-02-19T01:22:25.133Z",
    //     "updatedAt": "2021-02-19T01:22:25.133Z",
    //     "__v": 0

const submitForm = (event) => {
    event.preventDefault();
    // NAU USE AXIOS!
    // console.log(Number(stockLength.replace(/[^0-9.-]+/g,"")))s
    // console.log(stockLength)

    const newSkiff = {       //USE THIS AS AN OBJECT
        buildComplete: buildComplete,
        ownerName: ownerName,
        builderName: builderName,
        modelName: modelName,
        startDate: startDate,
        finishDate: finishDate,
        // stockLength: stockLength,  OLD VERSION PRE CURRENCY
        stockLength: Number(stockLength.replace(/[^0-9.-]+/g,"")),     //WHERE THE FILTER IS ADDED CHECK THIS
        customLength: customLength,
        pictureUrl: pictureUrl,
        description: description
    };

    console.log(newSkiff);
    axios.post("http://localhost:7777/api/skiffs", newSkiff)  //THIS REPLACES THE LIST IN AXIOS
        .then((response) => {
        if(response.data.errors) {
            setErrs(response.data.errors);
        } else {    
        console.log(response.data);
        navigate(`/skiff/${response.data._id}`);
        }
        })
        .catch((err) => { console.log(JSON.stringify(err)); 
            // JSON.stringify(err) is a COOL ADD!
            //changed from console.log(err)
        });
    
}

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
        marginLeft: "5px",
        marginRight: "5px",
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

// TOGGLE FROM onChange TO onBlur
return (
    <div>
        <h2 style={titleHeader}>Add New Yacht</h2>
        <form style={skiffContainer} onSubmit = {submitForm}>
            <div>
                <label>Owner Name</label>
                <input style={inputTextPadding} type="text" name="ownerName" onBlur={(event) => setOwnerName(event.target.value)}></input>
                { ownerName.length == 0 ? null 
                    : ownerName.length < 3 ? <span className="fadeInErrors" style={errorAlert}>Please enter a name longer than 3 characters.</span>
                        : ownerName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>Your name is longer than 50 characters.  Please enter a shorter name. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.ownerName? <span className="fadeInErrors" style={errorAlert}> { errs.ownerName.message }</span> : null }
            </div>
            <div>
                <label>Builder Name</label>
                <input style={inputTextPadding} type="text" name="builderName" onBlur={(event) => setBuilderName(event.target.value)}></input>
                { builderName.length == 0 ? null 
                    : builderName.length < 3 ? <span className="fadeInErrors" style={errorAlert}>Please enter a builder name longer than 3 characters.</span>
                        : builderName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>Your builder name is longer than 50 characters.  Please enter a shorter name. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.builderName? <span className="fadeInErrors" style={errorAlert}> { errs.builderName.message }</span> : null }
            </div>
            <div>
                <label>Select Model Type</label>
                <select style={inputTextPadding} type="text" name="modelName" onBlur={(event) => setModelName(event.target.value)}>
                    <option value="Standard">Standard</option>
                    <option value="Wide Body">Wide Body</option>
                    <option value="Jumbo">Jumbo</option>
                    <option value="Flat Bottom">Flat Bottom</option>
                </select>
                { errs.modelName? <span className="fadeInErrors" style={errorAlert}> { errs.modelName.message }</span> : null }
            </div>
            <div>
                <label>Build Start Date</label>
                <input style={inputTextPadding} type="date" name="startDate" onBlur={(event) => setStartDate(event.target.value)}></input>
                { startDate.length == 0 ? null 
                    : <p className="elementToFadeInAndOut" style={enterAlert}>Date selected...</p>}
                { errs.startDate? <span className="fadeInErrors" style={errorAlert}> { errs.startDate.message }</span> : null }
            </div>
            <div>
                <label>Build Finish Date</label>
                <input style={inputTextPadding} type="date" name="finishDate" onBlur={(event) => setFinishDate(event.target.value)}></input>
                { finishDate.length == 0 ? null 
                    : <p className="elementToFadeInAndOut" style={enterAlert}>Date selected...</p> }
                { errs.finishDate? <span className="fadeInErrors" style={errorAlert}> { errs.finishDate.message }</span> : null }
            </div>
            <div className="theTroubleShooter">
                <div className="fontAlignmentPal">
                    <label>Boat Cost</label>
                    <div id="smallFont">{"Enter Value in Dollars & Cents"}</div>
                </div>
                <CurrencyInput style={inputTextPadding} prefix="$" decimalsLimit={2} decimalScale={2} name="stockLength" onBlur={(event) => setStockLength(event.target.value)}/>
                {/* <input style={inputTextPadding} type="number" name="stockLength" onBlur={(event) => setStockLength(event.target.value)}></input> */}  {/*org setup */}
                { stockLength == 0 ? null 
                    : stockLength < 150000 ? <span className="fadeInErrors" style={errorAlert}>Your yacht will cost at least $150,000.</span>
                        // : stockLength > 30 ? <span className="fadeInErrors" style={errorAlert}>Please enter a stock length shorter than 350 feet.</span>
                                : <p className="fadeInLengths" style={successAlertLength}>&#10003;</p> }
                { errs.stockLength? <span className="fadeInErrors" style={errorAlert}> { errs.stockLength.message }</span> : null }
            </div>
            <div className="theTroubleShooter">
                <div className="fontAlignmentPal">
                    <label>Custom Length in Feet</label>
                    <div id="smallFont">Between 50-350'</div>
                </div>
                <input style={inputTextPadding} type="number" name="customLength" onBlur={(event) => setCustomLength(event.target.value)}></input>
                { customLength == 0 ? null 
                    : customLength < 50 ? <span className="fadeInErrors" style={errorAlert}>Please enter a custom length longer than 50 feet.</span>
                        : customLength > 350 ? <span className="fadeInErrors" style={errorAlert}>Please enter a custom length shorter than 350 feet.</span>
                            : <span className="fadeInLengths" style={successAlertLength}>&#10003;</span> }
                { errs.customLength? <span className="fadeInErrors" style={errorAlert}> { errs.customLength.message }</span> : null }
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
            <div>
                <label>Build Complete</label>
                {/* call was checked="buildComplete" */}
                <input style={inputTextPadding} type="checkbox" name="buildComplete" onBlur={(event) => setBuildComplete( !buildComplete )}></input>  {/*SET OPPOSITE TO MAKE IT MAKES IT AUTO FALSE */}
                { errs.buildComplete? <span style={errorAlert}> { errs.buildComplete.message }</span> : null }
            </div>
            <button style={buttonStyle} onClick={() => navigate(-1)}>Cancel</button>
            <button style={buttonStyle} type="submit">Add New Yacht</button>
        </form>
    </div>
)
}

export default NewSkiff;