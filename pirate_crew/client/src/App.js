import './App.css';
import React, { useState } from 'react';  // ADDED USE STATE MAKE SURE TO ADD THE COMAAAA
import { Router } from '@reach/router';
import NewSkiff from './components/NewSkiff';
import EditSkiff from './components/EditSkiff';
import AllSkiffs from './components/AllSkiffs';
import OneSkiff from './components/OneSkiff';
import FrontPage from './components/FrontPage';
import NewUser from './components/NewUser';

function App() {

const NotFound = () => {
    return (
      <div>
        ERROR ROUTE NOT FOUND.  CHECK YOUR URL ENTRY.
      </div>
    )
  };

  // SETTING UP FOR THE USE STATE  ** 1 **
  // SHOULD THIS BE AN ARRAY? check later

  
 const [ alert, setAlert ] = useState("");

 //  FROM THE NewUser path THIS MAKES THE SET ALERT PROP AND PASSES IT IN  PROPPPSSSS ** 2 ** 
 //  FROM THE AllSkiffs THIS IS THE ** 3 ** REFERENCEING THIS VARIABLE PASSED AS A PROP allowing the component access

 

  return (
    // FRONT END PATHING!! USE THIS ON PORT 3000
    //  NEVER EVER EVER EVER PUT A COMMENT AFTER A ROUTER PATH <>


    // *** CONTEXT ***
    // SETTING UP THE HEADER this keeps a value throughout the APP
    // CONDITIONALLY renders, this holds onto repeated data
    // HOOKS into it -->
    // CONTEXT - puts state into a component - USE A GLOBAL STATE!
    // USER ACCESS LEVELS!!! CONTEXT USE for access level...
    //    REDUX - CLASS BASED VERSION of the hooks UseReducer and UseContext together

    //  KILL THE alert system that is added on, SWITCH OVER TO THE CONTEXT

    <div className="App">
      
      {/* <GlobalHeader /> */}


      <Router>

        <AllSkiffs path="/" alert = {alert} />  

        <NewSkiff path="/skiff/new" />
        <OneSkiff path="/skiff/:id" />
        <EditSkiff path="/skiff/:id/edit" />
        <FrontPage path="/frontpage"/>

        
        <NewUser path="/new_member_signup" setAlert = {setAlert}/>   
        
        
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
