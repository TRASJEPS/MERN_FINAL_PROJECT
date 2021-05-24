import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CurrencyInput from 'react-currency-input-field';

const NewSkiff = (props) => {
    const [ buildComplete, setBuildComplete ] = useState(false); //PEG LEG
    const [ eyePatch, setEyePatch ] = useState(false);
    const [ hookHand, setHookHand ] = useState(false);
    const [ ownerName, setOwnerName ] = useState("");
    const [ builderName, setBuilderName ] = useState("");
    const [ modelName, setModelName ] = useState("Standard");  //AUTOMATICALLY STARTS AS STANDARD IN THIS CASE
    const [ startDate, setStartDate ] = useState("");
    const [ stockLength, setStockLength ] = useState("");  // PLAY WITH NUMBERS 
    const [ customLength, setCustomLength ] = useState(""); // SET AS A NUMBER BUT USE AN EMPTY STRING SO CONSOLE PLAYS NICE
    const [ pictureUrl, setPictureUrl ] = useState("");
    const [ description, setDescription ] = useState("");
    const [errs, setErrs ] = useState({});  //READY FOR OBJECT

const submitForm = (event) => {
    event.preventDefault();

    const newSkiff = {       //USE THIS AS AN OBJECT
        buildComplete: buildComplete,
        eyePatch: eyePatch,
        hookHand: hookHand,
        ownerName: ownerName,
        builderName: builderName,
        modelName: modelName,
        startDate: startDate,
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
const titleAligner = {
            display: "inline-block",
            fontSize: "50px",
            marginLeft: "40px",
        };
const addNewHeader = 
        {
            width: "42%",
            // height: "40%",
            display: "inline-block",
            margin: "4px",
            marginBottom: "7px",
            // marginRight: "11px",
            padding: "15px",
            //textAlign: "left",
            background: "rgb(224, 240, 255)",
            paddingBottom: "20px"
        };
const largeButtonStyle = 
        {
            margin: "5px",
            // marginLeft: "5px",
            // marginRight: "5px",
            marginTop: "5px",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "rgb(27, 36, 87)",
            color: "white",
            fontWeight: "bolder",
            fontSize: "large",
            border: "2px solid darkblue",
            borderRadius: "15px",
        };

return (
    <div>
        
        <div style={titleHeader}>
            <h1 style={titleAligner}>Add New Pirate</h1>
            <div style={addNewHeader}>
                <button style={largeButtonStyle} onClick={() => navigate(`/`)}>View Pirate Crew</button>
            </div>
        </div>

        <form style={skiffContainer} onSubmit = {submitForm}>
            <div>
                <label>Pirate Name</label>
                <input style={inputTextPadding} type="text" name="ownerName" onBlur={(event) => setOwnerName(event.target.value)}></input>
                { ownerName.length == 0 ? null 
                    : ownerName.length < 3 ? <span className="fadeInErrors" style={errorAlert}>ARG! Please do be entern' a name longer than 3 characters.</span>
                        : ownerName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>ARG! Ye name be too long to say! Please be entern' a name shorter than 50 characters!</span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.ownerName? <span className="fadeInErrors" style={errorAlert}> { errs.ownerName.message }</span> : null }
            </div>
            <div>
                <label>Ye Pirate Photo URL</label>
                <input style={inputTextPadding} type="text" name="pictureUrl" onBlur={(event) => setPictureUrl(event.target.value)}></input>
                { pictureUrl.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.pictureUrl? <span style={errorAlert}> { errs.pictureUrl.message }</span> : null }
            </div>
            <div className="theTroubleShooter">
                <div className="fontAlignmentPal">
                    <label>Treasure Chests Found</label>
                    <div id="smallFont">Between 0-999 chests.</div>
                </div>
                <input style={inputTextPadding} type="number" name="customLength" onBlur={(event) => setCustomLength(event.target.value)}></input>
                { customLength == 0 ? null 
                    : customLength < 0 ? <span className="fadeInErrors" style={errorAlert}>ARG! Ye cannot be in Davy Jones dept when joining me crew!</span>
                        : customLength > 999 ? <span className="fadeInErrors" style={errorAlert}>ARG! Ye vast wealth will sink me ship! Best leave ye fortune behind! No more than 999 treasure chests.</span>
                            : <span className="fadeInLengths" style={successAlertLength}>&#10003;</span> }
                { errs.customLength? <span className="fadeInErrors" style={errorAlert}> { errs.customLength.message }</span> : null }
            </div>
            <div>
                <label>Catch Phrase</label>
                <input style={inputTextPadding} type="text" name="builderName" onBlur={(event) => setBuilderName(event.target.value)}></input>
                { builderName.length == 0 ? null 
                    : builderName.length < 2 ? <span className="fadeInErrors" style={errorAlert}>ARG! Ye catch phrase must be longer than 2 characters matey!</span>
                        : builderName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>YARG! Ye saying be too long! Please be sayin' a shorter sayn'! Less than 50 characters.</span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.builderName? <span className="fadeInErrors" style={errorAlert}> { errs.builderName.message }</span> : null }
            </div>
            <div>
                <label>Crew Member Since</label>
                <input style={inputTextPadding} type="date" name="startDate" onBlur={(event) => setStartDate(event.target.value)}></input>
                { startDate.length == 0 ? null 
                    : <p className="elementToFadeInAndOut" style={enterAlert}>Ye Start Date Be Selected.</p>}
                { errs.startDate? <span className="fadeInErrors" style={errorAlert}> { errs.startDate.message }</span> : null }
            </div>
            <div>
                <label>Crewmate Role</label>
                <select style={inputTextPadding} type="text" name="modelName" onBlur={(event) => setModelName(event.target.value)}>
                    <option value="Crew Mate">Crew Mate</option>
                    <option value="Cook">Cook</option>
                    <option value="Deckhand">Deckhand</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Navigator">Navigator</option>
                    <option value="First Mate">First Mate</option>
                    <option value="Captain">Captain</option>
                </select>
                { errs.modelName? <span className="fadeInErrors" style={errorAlert}> { errs.modelName.message }</span> : null }
            </div>
            <div className="theTroubleShooter">
                <div className="fontAlignmentPal">
                    <label>Desired Annual Wage</label>
                    <div id="smallFont">{"Enter Ye Wages in Continentals."}</div>
                </div>
                <CurrencyInput style={inputTextPadding} prefix="$" decimalsLimit={2} decimalScale={2} name="stockLength" onBlur={(event) => setStockLength(event.target.value)}/>
                {/* <input style={inputTextPadding} type="number" name="stockLength" onBlur={(event) => setStockLength(event.target.value)}></input> */}  {/*org setup */}
                { stockLength == 0 ? null 
                    : stockLength < 100 ? <span className="fadeInErrors" style={errorAlert}>ARG! No member of me crew earns less than a 100 Continentals.</span>
                        : stockLength > 999999 ? <span className="fadeInErrors" style={errorAlert}>ARRRGGGGG! YE GREED IS TOO MUCH. BEST BE LOWERN' YE WAGE.</span>
                                : <p className="fadeInLengths" style={successAlertLength}>&#10003;</p> }
                { errs.stockLength? <span className="fadeInErrors" style={errorAlert}> { errs.stockLength.message }</span> : null }
            </div>
            <div>
                <label>Peg Leg</label>
                <input style={inputTextPadding} type="checkbox" name="buildComplete" checked onBlur={(event) => setBuildComplete( buildComplete )}></input>
                { errs.buildComplete? <span style={errorAlert}> { errs.buildComplete.message }</span> : null }
            </div>
            <div>
                <label>Eye Patch</label>
                <input style={inputTextPadding} type="checkbox" name="eyePatch" checked onBlur={(event) => setEyePatch( eyePatch )}></input>
                { errs.eyePatch? <span style={errorAlert}> { errs.eyePatch.message }</span> : null }
            </div>
            <div>
                <label>Hook Hand</label>
                <input style={inputTextPadding} type="checkbox" name="buildComplete" checked onBlur={(event) => setHookHand( hookHand )}></input>
                { errs.hookHand? <span style={errorAlert}> { errs.hookHand.message }</span> : null }
            </div>
            <div>
                <div style={inputPadDesc}><label >Description:</label></div>
                <textarea style={textAreaPadding} type="text" name="description" rows={100} onBlur={(event) => setDescription(event.target.value)}></textarea>
                { description.length == 0 ? null 
                    // : description.length < 6 ? <span className="fadeInErrors" style={errorAlert}>Please enter description longer than 6 characters.</span>
                        : description.length > 500 ? <span className="fadeInErrors" style={errorAlert}>ARG! Ye talk too much.  Best be keeping it below 500 characters.</span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.description? <span style={errorAlert}> { errs.description.message }</span> : null }
            </div>

            <button style={buttonStyle} onClick={() => navigate(-1)}>Abandon Ye Entry</button>
            <button style={buttonStyle} type="submit">Join Ye New Pirate Crew!</button>
        </form>
    </div>
)
}

export default NewSkiff;