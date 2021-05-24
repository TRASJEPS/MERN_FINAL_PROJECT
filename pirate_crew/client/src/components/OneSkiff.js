import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { link, navigate } from '@reach/router';
// import { formatValue } from 'react-currency-input-field';   //THIS IS NOT NEEDED ANY MORE BECAUSE OF CURRENCY FUNCTION
// THIS FORMATS ALL CURRENCY USE ON ALL PAGES 
import { formatCurrency } from '../utilities/CurrencyFormatter';

// BACK BUTTON
// import { withRouter } from 'react-router-dom';
// import { useHistory } from "react-router-dom";   EDITING HERE

const OneSkiff = (props) => {
    // THIS HAS TO BE CALLED id BECAUSE ITS DEFINED THERE IN THE APP.JS
    const { id } = props;
    // make sure its CURLY not an array BRACKET
    // COMES IN AS OBJECT and is initially set as EMPTY
    // BECAUSE THIS IS WITH AXIOS this is ACRYNIOUS ** spelling MVP
    const [ skiff, setSkiff ] = useState({});

    //app.get('/api/skiffs/:id', SkiffsController.getOne);
    useEffect(() => {
        axios
        //THIS IS DEFINED above
            .get("http://localhost:7777/api/skiffs/" + id)
            .then((response) => {
                const oneSkiffOnly = response.data;
                console.log(response.data);
                // setSkiff(response.data);
                console.log(oneSkiffOnly);
                setSkiff(oneSkiffOnly);

            }) 
            .catch((err) => {
                console.log(err);
            });
    },[]);

    // BACK BUTTON!?!?!?!
// export const Item = () => {
//     let history = useHistory();

//THIS IS FOR CURRENCY
// const moneyStyle = formatValue ({
//     groupSeparator: ',',
//     decimalSeparator: '.',
//     prefix: '$',
//     decimalScale: 2,
//     value: skiff.stockLength,
// });

const skiffContainer = 
{
    border: "2px solid darkblue",
    borderRadius: "20px",
    display: "inline-block",
    width: "26%",
    margin: "10px",
    fontWeight: "bold",
    paddingLeft: "25px",
    paddingRight: "25px",
    //textAlign: "left",
    background: "white",
    paddingBottom: "20px"
};

const mainNameContainer = 
{
    border: "4px solid rgb(176, 217, 255)",
    borderRadius: "30px",
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
        margin: "5px",
        // marginLeft: "5px",
        // marginRight: "5px",
        marginTop: "15px",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        background: "rgb(27, 36, 87)",
        color: "white",
        fontWeight: "bolder",
        fontSize: "small",
        border: "2px solid darkblue",
        borderRadius: "10px",
    };

const titleHeader = 
{
    border: "4px solid rgb(176, 217, 255)",
    borderRadius: "30px",
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

//DELETE METHOD IS HERE hidden for now XD
{
// const deleteSkiff = (skiffToDelete) => {
//     //skiffToDelete is the passed in OBJECT
//     axios
//         //DONT FORGET THE END SLASHHHHHH!H!H!H!H!H! /////
//         .delete('http://localhost:7777/api/skiffs/' + skiffToDelete._id )
//         .then( response => {
//             // ${skiff.ownerName}'s ${skiff.modelName}  THIS ONLY DELETES STATE BUT WITH AXIOS is goes buh-bye
//             console.log(skiffToDelete.ownerName+"'s "+ skiffToDelete.modelName + " Skiff - has been deleted.  The ID was " + skiffToDelete._id);
//             // filter callback function is going through the skiff array
//             const newSkiffsArray = allSkiffs.filter((skiff) => {
//                 //MAKE SURE TO COMPARE THE ._id for specifics NOT the OBJECT
//                 return skiffToDelete._id !== skiff._id;
//             })
//             //THE NEW ARRAY!  MINUS the skiff passed in that was compared via _ID
//             setAllSkiffs(newSkiffsArray)
//         })  //NO SEMICOLIN to keep the chain going ....
//         .catch((err) => {
//             console.log(err);
//         });
// };
}

 return(
    <div>
        <h1>Yacht Profile Details</h1>
        {/* AT THIS POINT ITS THE WHOLE OBJECT OR NOTHING */}
        {/* MAKE SURE TO CHECK ITS NOT UNDEFINED  */}
        {/* USE THIS IF ITS ASYCRINOUS LOADING HURGGG */}
        {
            skiff.ownerName !== undefined ? 
            (
            <div style={skiffContainer}> 
                <h4 style={mainNameContainer}>{`${skiff.ownerName}'s ${skiff.modelName} Yacht`}</h4>
                <br></br>
                <img src={ skiff.pictureUrl} />    {/* ADD IMG CONTAINER HERE */}
                <p>{`Built by: ${skiff.builderName}`}</p>
                {/* <p> {`Cost: ${ moneyStyle }`}</p> */}

                {/* <p> {`Cost: $${ skiff.stockLength }`}</p> */}
                <p> {`Cost: ${ formatCurrency(skiff.stockLength)} `}</p>

                <p>{`Custom Length: ${skiff.customLength}'`}</p>
                <p>{`Build Start Date: ${skiff.startDate.substring(5,10)}-${skiff.startDate.substring(0,4)}`}</p>
                <p>{`Build Completion Date: ${skiff.finishDate.substring(5,10)}-${skiff.finishDate.substring(0,4)}`}</p>
                <p>{`Description: ${skiff.description}`}</p>
                <p id="smallFont">{`Date Added: ${skiff.createdAt.substring(5,10)}-${skiff.createdAt.substring(0,4)}`}</p>
                {/* <button style={buttonStyle} onClick={() => navigate(-1)}>Return</button> */}
                <button style={buttonStyle} onClick={() => navigate(`/`)}>Return</button>
                <button style={buttonStyle} onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit</button>
                {/* <button style={buttonStyle} onClick={() => deleteSkiff(skiff)}>Delete</button>     */}
            </div>
            ):
            <p>GETTING DATA... or something went horribly wrong...</p>
        }
    </div>
)
}

export default OneSkiff;
