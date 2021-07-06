
import './App.css';
import MyAppBar from './MyAppBar'
//import MyContent from './MyContent';
//import Countries from './Countries'
import React from "react";

class App extends React.Component {
constructor(props){
  super(props);
  this.state={selectedCountry:''}; 
}
handleCountryChange=(country)=>{
         console.log('handleCountryChange',country);
         this.setState({selectedCountry:country});
}

  render(){
    return (
      <div>
       <MyAppBar handleCountryChange={this.handleCountryChange}/>
       
      </div>
    );
    }
 
}

export default App;
