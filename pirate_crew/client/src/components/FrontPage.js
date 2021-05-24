import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { link, navigate } from '@reach/router';
import { formatValue } from 'react-currency-input-field';
import { formatCurrency } from '../utilities/CurrencyFormatter';  //NOT EXPORT DEFAULT


// DEFINE THE PROPS and THEN YOU TAKE IT OUT OF PROPS
const FrontPage = (props) => {
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
 
    const tealButtonStyle = 
        {
            margin: "5px",
            // marginLeft: "5px",
            // marginRight: "5px",
            marginTop: "15px",
            marginLeft: "20px",
            marginRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "rgb(27, 85, 87)",
            color: "white",
            fontWeight: "bolder",
            fontSize: "large",
            border: "none",
            // border: "2px solid rgb(9, 49, 51)",
            borderRadius: "15px",
        };
        const goldButtonStyle = 
        {
            margin: "5px",
            // marginLeft: "5px",
            // marginRight: "5px",
            marginTop: "15px",
            marginLeft: "20px",
            marginRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "30px",
            paddingRight: "30px",
            background: "rgb(250, 245, 219)",
            color: "black",
            fontWeight: "bolder",
            fontSize: "large",
            border: "none",
            // border: "2px solid rgb(238, 230, 123)",
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
        marginBottom: "20px",
        background: "rgb(224, 240, 255)",
        paddingBottom: "20px"
    };
    const addNewHeader = 
    {
        border: "4px solid rgb(176, 217, 255)",
        borderRadius: "20px",
        // width: "42%",
        // height: "40%",
        // display: "inline-block",
        margin: "40px",
        marginBottom: "40px",
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
    const purpleTier = 
    {
        border: "4px solid rgb(225, 198, 241)",
        borderRadius: "20px",
        // display: "inline-block",
        margin: "40px",
        marginBottom: "-20px",
        padding: "25px",
        marginBottom: "20px",
        background: "rgb(193, 158, 214)",
        paddingBottom: "20px"
    };
    const greenTier = 
    {
        border: "4px solid rgb(200, 241, 198)",
        borderRadius: "20px",
        // display: "inline-block",
        margin: "40px",
        marginBottom: "-20px",
        padding: "25px",
        marginBottom: "20px",
        background: "rgb(158, 214, 163)",
        paddingBottom: "20px"
    };
    const blueTier = 
    {
        border: "4px solid rgb(198, 236, 241)",
        borderRadius: "20px",
        // display: "inline-block",
        margin: "40px",
        marginBottom: "-20px",
        // fontWeight: "bold",
        padding: "25px",
        marginBottom: "20px",
        background: "rgb(158, 212, 214)",
        paddingBottom: "20px"
    };
    const goldTier = 
    {
        border: "4px solid rgb(241, 240, 198)",
        borderRadius: "20px",
        // display: "inline-block",
        margin: "40px",
        marginBottom: "-20px",
        // fontWeight: "bold",
        padding: "25px",
        marginBottom: "20px",
        background: "rgb(213, 214, 158)",
        paddingBottom: "20px"
    };

    return(
    <div>
        <h1 style={titleHeader}>Steamline  Yacht  Club</h1>
            <div style={goldTier}>
                <h2>Members Entrance</h2>
                <button style={goldButtonStyle} onClick={() => navigate(`/`)}>Login</button>
                {/* <button style={goldButtonStyle} onClick={() => navigate(`/skiff/new`)}>Log Out</button> */}
            </div>
        
        <div style={addNewHeader}>
            <div style={purpleTier}>
                <h3>Become part of the world's elite yacht owners.</h3>
                <p>All members recieve the highest level of descretion.</p>
            </div>
            <br></br>
            <div style={greenTier}>
                <h3>Invite Only.</h3>
                <p>New members are given access from our community.</p>
            </div>
            <br></br>
            <div style={blueTier}>
                <h3>Create your custom profile today.</h3>
                <p>Use your activation code or special link to get started.</p>
                <button style={tealButtonStyle} onClick={() => navigate(`/new_member_signup`)}>Join Now</button>
            </div>
        </div>
    </div>
    )
}

export default FrontPage;