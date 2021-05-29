import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { link, navigate } from '@reach/router';
// import { formatValue } from 'react-currency-input-field';
import { formatCurrency } from '../utilities/CurrencyFormatter';  

const AllSkiffs = (props) => {
    const [ allSkiffs, setAllSkiffs ] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:7777/api/skiffs")
            .then((response) => {
                console.log(response.data);
                setAllSkiffs(response.data);
            }) 
            .catch((err) => {
                console.log(err);
            });
    },[]);

    const deleteSkiff = (skiffToDelete) => {
        
        axios
            .delete('http://localhost:7777/api/skiffs/' + skiffToDelete._id )
            .then( response => {
                console.log("Pirate "+skiffToDelete.ownerName+" "+ skiffToDelete.modelName + "  has been walked the plank!  The ID was " + skiffToDelete._id);
                // filter callback function is going through the skiff array
                const newSkiffsArray = allSkiffs.filter((skiff) => {
                    //MAKE SURE TO COMPARE THE ._id for specifics NOT the OBJECT
                    return skiffToDelete._id !== skiff._id;
                })
                //THE NEW ARRAY!  MINUS the skiff passed in that was compared via _ID
                setAllSkiffs(newSkiffsArray)
            })  //NO SEMICOLIN to keep the chain going ....
            .catch((err) => {
                console.log(err);
            });
    };
 
    const skiffContainer = 
    {
        border: "2px solid darkblue",
        borderRadius: "20px",
        display: "inline-block",
        width: "26%",
        height: "40%",
        margin: "20px",
        flex: 20, // KEEP 1 for small sec
        fontWeight: "bold",
        paddingLeft: "25px",
        paddingRight: "25px",
        // textAlign: "left",
        background: "white",
        paddingBottom: "20px"
    };
    const mainNameContainer = 
    {
        border: "4px solid rgb(176, 217, 255)",
        borderRadius: "15px",
        display: "inline-block",
        margin: "10px",
        fontWeight: "bold",
        padding: "15px",
        paddingLeft: "5%",
        paddingRight: "5%",
        fontWeight: "bolder",
        fontSize: "large",
        //textAlign: "left",
        background: "rgb(224, 240, 255)",
    };
    const picPreviewSizer = 
    {
        border: "4px solid rgb(176, 217, 255)",
        width: "100px",
        height: "100px",
        // borderRadius: "25px",
        display: "inline-block",
        margin: "10px",
        padding: "5px",
        //textAlign: "left",
        background: "rgb(224, 240, 255)",
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
        const walkThePlank = 
        {
            margin: "5px",
            // marginLeft: "5px",
            // marginRight: "5px",
            marginTop: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            background: "darkred",
            color: "white",
            fontWeight: "bolder",
            fontSize: "small",
            border: "2px solid darkred",
            borderRadius: "10px",
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
    const titleHeader = 
    {
        border: "4px solid rgb(176, 217, 255)",
        borderRadius: "20px",
        // display: "inline-block",
        margin: "40px",
        marginBottom: "-20px",
        // fontWeight: "bold",
        padding: "25px",
        // fontWeight: "bolder",
        // fontSize: "large",
        //textAlign: "left",
        background: "rgb(224, 240, 255)",
        paddingBottom: "20px"
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
    const scaleFlex = 
    {
        display: "flex",
        flexWrap: "wrap",
    };
    const titleAligner = {
        display: "inline-block",
        fontSize: "70px",
        marginLeft: "40px",
    };

    return( 
    <div>
        <div style={titleHeader}>
            <h1 style={titleAligner}>All Pirate Crew Mates</h1>
            <div style={addNewHeader}>
                <p>Avast ye!  Add new pirates to ye crew here.</p>
                <button style={largeButtonStyle} onClick={() => navigate(`/skiff/new`)}>Add New Crew Member</button>
            </div>
        </div>
        <p>{props.alert}</p>
            {allSkiffs.map((skiff, index) => (
                <div style={skiffContainer} key={index}> 
                    <h4 style={mainNameContainer}>{skiff.ownerName}</h4>
                    <br></br>
                    <img style={picPreviewSizer} src={skiff.pictureUrl} alt="PIRATE"/>
                    <p>{`Catch Phrase: ${skiff.builderName}`}</p>
                    <p>{`Annual Wage: ${formatCurrency(skiff.stockLength)}`}</p>
                    <p>{`Treasure Chests Found: ${skiff.customLength}`}</p>
                    <p>{`Description: ${skiff.description}`}</p>
                    <p id="smallFont">{`Crew Member Since: ${skiff.createdAt.substring(5,10)}-${skiff.createdAt.substring(0,4)}`}</p>
                    <button style={buttonStyle} onClick={() => navigate(`/skiff/${skiff._id}`)}>Pirate Details</button>
                    <button style={buttonStyle} onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit</button>
                    <button style={walkThePlank} onClick={() => deleteSkiff(skiff)}>Walk The Plank!</button>
                </div>
            ))}
    </div>
    )
}

export default AllSkiffs;