import './App.css';
//import MyContent from './MyContent';
import Countries from './Countries'
import React from "react";

class MyContent extends React.Component {
constructor(props){
  super(props);
  this.state={selectedCountry:''}; 
}
handleCountryChange=(country)=>{
         //console.log('handleCountryChange',country);
         this.setState({selectedCountry:country});
}

  render(){
    return (
      <div>
           <Countries selectedCountry={this.state.selectedCountry}/>
      </div>
    );
    }
 
}

export default MyContent;