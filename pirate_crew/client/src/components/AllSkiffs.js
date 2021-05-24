import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { link, navigate } from '@reach/router';
import { formatValue } from 'react-currency-input-field';
import { formatCurrency } from '../utilities/CurrencyFormatter';  //NOT EXPORT DEFAULT


// DEFINE THE PROPS and THEN YOU TAKE IT OUT OF PROPS
const AllSkiffs = (props) => {
    const [ allSkiffs, setAllSkiffs ] = useState([]);  // SETUP THE GETTER AND SETTER AND A EMPTY ARRAY!!!!!!!   THIS IS THE STATE

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

    // THIS IS THE DELETE BUTTON 
    // USE skiff._id  
    //  THE ROUTE! wooohhh
    //  app.delete('/api/skiffs/:id', SkiffsController.delete);
    const deleteSkiff = (skiffToDelete) => {
        //skiffToDelete is the passed in OBJECT
        axios
            //DONT FORGET THE END SLASHHHHHH!H!H!H!H!H! /////
            .delete('http://localhost:7777/api/skiffs/' + skiffToDelete._id )
            .then( response => {
                // ${skiff.ownerName}'s ${skiff.modelName}  THIS ONLY DELETES STATE BUT WITH AXIOS is goes buh-bye
                console.log(skiffToDelete.ownerName+"'s "+ skiffToDelete.modelName + " Skiff - has been deleted.  The ID was " + skiffToDelete._id);
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
        margin: "10px",
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
        borderRadius: "25px",
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
    const largeButtonStyle = 
        {
            margin: "5px",
            // marginLeft: "5px",
            // marginRight: "5px",
            marginTop: "15px",
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
        border: "4px solid rgb(176, 217, 255)",
        borderRadius: "20px",
        width: "42%",
        // height: "40%",
        display: "inline-block",
        margin: "40px",
        marginBottom: "7px",
        // marginRight: "11px",
        padding: "25px",
        //textAlign: "left",
        background: "rgb(224, 240, 255)",
        paddingBottom: "20px"
    };
    const scaleFlex = 
    {
        display: "flex",
        flexWrap: "wrap",
    };


    // CHECK PASSING OF PROPS TO SHOW NEW USER HAS BEEN CREATED OR WELCOME BACK MESSAGE AW SO CUTE.
    return( 
    <div>
        {/* {
            setConfirmNewUser ?
            <h1 style={titleHeader}>Your new account has been created!</h1>
            : null
        } */}
        <h1 style={titleHeader}>All Yachts</h1>


{/* THIS IS WHERE ALL ALERTS WILL COME AFTER ALTERNATITING  */}
        <p>{props.alert}</p>

        <div style={addNewHeader}>
            <p>Add a new yacht to the database here.</p>
            <button style={largeButtonStyle} onClick={() => navigate(`/skiff/new`)}>Create New Yacht</button>
        </div>
        <div style={addNewHeader}>
            {/* <p>{`Welcome ${user.firstName} ${user.lastName}`}</p> */}
            <button style={largeButtonStyle} onClick={() => navigate(`/skiff/new`)}>View Your Profile</button>
            <button style={largeButtonStyle} onClick={() => navigate(`/skiff/new`)}>Edit</button>
            <button style={largeButtonStyle} onClick={() => navigate(`/skiff/new`)}>Log Out</button>
        </div>

        {/* SKIFF is an object  */}
        {/* <div style={scaleFlex}> */}
            {allSkiffs.map((skiff, index) => (
                <div style={skiffContainer}> 
                    <h4 style={mainNameContainer}>{`${skiff.ownerName}'s ${skiff.modelName} Yacht`}</h4>
                    <br></br>
                    <img style={picPreviewSizer} src={ skiff.pictureUrl} />    {/* ADD IMG CONTAINER HERE */}
                    <p key></p>
                    <p>{`Built by: ${skiff.builderName}`}</p>
                    <p> {`Cost: ${formatCurrency(skiff.stockLength)}`}</p>
                    <p>{`Custom Length: ${skiff.customLength}'`}</p>
                    <p>{`Description: ${skiff.description}`}</p>
                    <p id="smallFont">{`Date Added: ${skiff.createdAt.substring(5,10)}-${skiff.createdAt.substring(0,4)}`}</p>
                    <button style={buttonStyle} onClick={() => navigate(`/skiff/${skiff._id}`)}>Details</button>
                    <button style={buttonStyle} onClick={() => navigate(`/skiff/${skiff._id}/edit`)}>Edit</button>
                    <button style={buttonStyle} onClick={() => deleteSkiff(skiff)}>Delete</button>
                </div>
            ))}
        {/* </div> */}
    </div>
    )
}

export default AllSkiffs;