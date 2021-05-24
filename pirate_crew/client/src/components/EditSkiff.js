import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CurrencyInput from 'react-currency-input-field';

//AXIOS UPDATE
const EditSkiff = (props) => {
    //THIS must be called id because thats how its linked in APP.JS
    //THIS also links into the front end, DESCTURCUTING
    const { id } = props;
    // THIS IS IMPORTANT, it takes in the props from creating the new skiff 
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
    const [errs, setErrs ] = useState({});

    //FOR DATES conversion FUNCTION
    //MUST CONVERT TO YYYY-MM-DD
    const editingDateFormatter = incomingDate => {
        console.log(incomingDate);
        
        return incomingDate.split("T")[0];  // SPLITS UP TO THE first element of that string's character, then LOGS the split to the first slot in array in this case slot 0


        // CHECK DATE IN
        // console.log(incomingDate);
        // let year = incomingDate.getFullYear();
        // let month = String (incomingDate.getMonth()+1).padStart(2,'0');  //BECUASE ITS AN ARRAY!!! starts at zero // THIS MAKES IT SO THE DAMN MONTH is formatted 'mm'
        // let day = String (incomingDate.getDate()+1).padStart(2,'0');  //BECUASE ITS AN ARRAY!!! starts at zero // THIS MAKES IT SO THE DAMN DAY is formatted 'dd'
        // console.log(`${year}-${month}-${day}`);
        // return `${year}-${month}-${day}`;
    };

useEffect(() => {
    axios  //BACKEND
        .get("http://localhost:7777/api/skiffs/" + id )  //THIS IS IN THE skiffs.route.js BACKEND PATH
        .then((response) => {
            const editOneSkiff = response.data;
            console.log(editOneSkiff);
            setBuildComplete(editOneSkiff.buildComplete);
            setOwnerName(editOneSkiff.ownerName);
            setBuilderName(editOneSkiff.builderName);
            setModelName(editOneSkiff.modelName);

            // setStartDate((new Date(editOneSkiff.startDate)).toLocaleDateString("en_US"));   // TRY THIS!!!
            //

            // setStartDate((new Date(editOneSkiff.startDate)).toLocaleDateString("en_US")); 
            // IMPLIMENTS THE DATE FORMATIING FUNCTION AND CLEANS UP ENTRY  

            // setStartDate(editingDateFormatter(new Date(editOneSkiff.startDate)));   
            // setFinishDate(editingDateFormatter(new Date(editOneSkiff.finishDate)));
            setStartDate(editingDateFormatter(editOneSkiff.startDate)); 
            setFinishDate(editingDateFormatter(editOneSkiff.finishDate));

            setStockLength(editOneSkiff.stockLength);
            setCustomLength(editOneSkiff.customLength);
            setPictureUrl(editOneSkiff.pictureUrl);  // DOESNT ERROR OUT IF NO PIC FOUND
            setDescription(editOneSkiff.description == undefined ? "" : editOneSkiff.description);  //TERNARY TO MAKE SURE IT TAKES NON ENTERED DATA
            }) 
        .catch((err) => {
            console.log(err);
            });
}, []);

const submitForm = (event) => {
    event.preventDefault();
    axios  //BACKEND
        .put("http://localhost:7777/api/skiffs/" + id,     //THIS IS IN THE skiffs.route.js BACKEND PATH
   {
    buildComplete: buildComplete,
    ownerName: ownerName,
    builderName: builderName,
    modelName: modelName,
    startDate: startDate, 
    finishDate: finishDate,
    stockLength: stockLength,  //ALLOWS FOR THE / to be entered 
    customLength: customLength, 
    pictureUrl: pictureUrl,
    description: description,
   })
        .then((response) => {
            if(response.data.errors) {
                console.log(response.data.errors);
                setErrs(response.data.errors);
            } else {    
                console.log(response.data);
                navigate(`/skiff/${response.data._id}`);
            }
            })
        .catch((err) => { 
            console.log(err); 
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
        display: "inline-block",
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
        border: "2px solid lightblue",
        borderRadius: "15px",
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
            width: "45%",
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

 return(

// REMEMBER TO SETUP THE CATCH like on ONE SKIFF
// MUST BE FROM onBlur TO onChange
    <div>
        <h2>Edit Yacht</h2>
        <form onSubmit={submitForm}>
        <div>
                <label>Owner Name</label>
                <input style={inputTextPadding} type="text" name="ownerName" value={ownerName} onChange={(event) => setOwnerName(event.target.value)}></input>
                { ownerName.length == 0 ? null 
                    : ownerName.length < 3 ? <span className="fadeInErrors" style={errorAlert}>Please enter a name longer than 3 characters.</span>
                        : ownerName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>Your name is longer than 50 characters.  Please enter a shorter name. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.ownerName? <span className="fadeInErrors" style={errorAlert}> { errs.ownerName.message }</span> : null }
            </div>
            <div>
                <label>Builder Name</label>
                <input style={inputTextPadding} type="text" name="builderName" value={builderName} onChange={(event) => setBuilderName(event.target.value)}></input>
                { builderName.length == 0 ? null 
                    : builderName.length < 3 ? <span className="fadeInErrors" style={errorAlert}>Please enter a builder name longer than 3 characters.</span>
                        : builderName.length > 50 ? <span className="fadeInErrors" style={errorAlert}>Your builder name is longer than 50 characters.  Please enter a shorter name. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.builderName? <span className="fadeInErrors" style={errorAlert}> { errs.builderName.message }</span> : null }
            </div>
            <div>
                <label>Select Model Type</label>
                <select style={inputTextPadding} type="text" name="modelName" value={modelName} onChange={(event) => setModelName(event.target.value)}>
                    <option value="Standard">Standard</option>
                    <option value="Wide Body">Wide Body</option>
                    <option value="Jumbo">Jumbo</option>
                    <option value="Flat Bottom">Flat Bottom</option>
                </select>
                { errs.modelName? <span className="fadeInErrors" style={errorAlert}> { errs.modelName.message }</span> : null }
            </div>
            <div>
                <label>Build Start Date</label>
                <input style={inputTextPadding} type="date" name="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)}></input>
                { startDate.length == 0 ? null 
                    : <p className="elementToFadeInAndOut" style={enterAlert}>Date selected...</p>}
                { errs.startDate? <span className="fadeInErrors" style={errorAlert}> { errs.startDate.message }</span> : null }
            </div>
            <div>
                <label>Build Finish Date</label>
                <input style={inputTextPadding} type="date" name="finishDate" value={finishDate} onChange={(event) => setFinishDate(event.target.value)}></input>
                { finishDate.length == 0 ? null 
                    : <p className="elementToFadeInAndOut" style={enterAlert}>Date selected...</p> }
                { errs.finishDate? <span className="fadeInErrors" style={errorAlert}> { errs.finishDate.message }</span> : null }
            </div>



            <div className="theTroubleShooter">
                <div className="fontAlignmentPal">
                    <label>Boat Cost</label>
                    <div id="smallFont">{"Value in Dollars & Cents"}</div>
                </div>
                {/* <CurrencyInput style={inputTextPadding} prefix="$" decimalsLimit={2} decimalScale={2} name="stockLength" onBlur={(event) => setStockLength(event.target.value)}/> */}
                <CurrencyInput style={inputTextPadding} prefix="$" decimalsLimit={2} decimalScale={2} name="stockLength" value={stockLength} 
                onValueChange={
                    (value) => setStockLength(value)
                    // (event) => setStockLength(event.target.value.replace(/[^0-9.-]+/g,""))
                    }/>

                { stockLength == 0 ? null 
                    : stockLength < 150000 ? <span className="fadeInErrors" style={errorAlert}>Your yacht will cost at least $150,000.</span>
                                : <p className="fadeInLengths" style={successAlertLength}>&#10003;</p> }
                { errs.stockLength? <span className="fadeInErrors" style={errorAlert}> { errs.stockLength.message }</span> : null }
            </div>

            <div className="theTroubleShooter">
                <div className="fontAlignmentPal">
                    <label>Custom Length in Feet</label>
                    <div id="smallFont">Between 50-350'</div>
                </div>
                <input style={inputTextPadding} type="number" name="customLength" value={customLength} onChange={(event) => setCustomLength(event.target.value)}></input>
                { customLength == 0 ? null 
                    : customLength < 50 ? <span className="fadeInErrors" style={errorAlert}>Please enter a custom length longer than 50 feet.</span>
                        : customLength > 350 ? <span className="fadeInErrors" style={errorAlert}>Please enter a custom length shorter than 350 feet.</span>
                            : <span className="fadeInLengths" style={successAlertLength}>&#10003;</span> }
                { errs.customLength? <span className="fadeInErrors" style={errorAlert}> { errs.customLength.message }</span> : null }
            </div>
            <div>
                <label>Photo Link</label>
                <input style={inputTextPadding} type="text" name="pictureUrl" value={pictureUrl} onChange={(event) => setPictureUrl(event.target.value)}></input>
                { pictureUrl.length == 0 ? null 
                    : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.pictureUrl? <span style={errorAlert}> { errs.pictureUrl.message }</span> : null }
            </div>
            <div>
                <div style={inputPadDesc}><label >Description:</label></div>
                <textarea style={textAreaPadding} type="text" name="description" value={description} rows={100} onChange={(event) => setDescription(event.target.value)}></textarea>
                { description.length == 0 ? null 
                    : description.length < 6 ? <span className="fadeInErrors" style={errorAlert}>Please enter description longer than 6 characters.</span>
                        : description.length > 500 ? <span className="fadeInErrors" style={errorAlert}>Please enter a shorter description. </span>
                            : <p className="fadeIn" style={successAlert}>&#10003;</p> }
                { errs.description? <span style={errorAlert}> { errs.description.message }</span> : null }
            </div>
            <div>
                <label>Build Complete</label>
                <input style={inputTextPadding} type="checkbox" name="buildComplete" checked={buildComplete} onChange={(event) => setBuildComplete( !buildComplete )}></input>  {/*SET OPPOSITE TO MAKE IT MAKES IT AUTO FALSE */}
                { errs.buildComplete? <span style={errorAlert}> { errs.buildComplete.message }</span> : null }
            </div>
            <button style={buttonStyle} type="submit">Update Yacht Details</button>
            <button style={buttonStyle} onClick={() => navigate(-1)}>Cancel Changes</button>
        </form>
        
    </div>
 )
}

export default EditSkiff;