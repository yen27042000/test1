

import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
  
class Countries extends React.Component {
   constructor(props){
       super(props);
  
      const columns= [
        { field: 'Country', headerName: 'Quốc gia', width:200 },
        { field: 'NewConfirmed', headerName: 'Mắc mới', width: 170 },
        { field: 'TotalConfirmed', headerName: 'Tổng cộng', width: 170 },
        { field: 'NewDeaths', headerName: 'Số trường chết', width:200 },
        { field: 'FormatDate', headerName: 'Ngày', width:170 },
      ];
      this.state={columns:columns, rows:[],
        selectedCountry:props.selectedCountry,
        displayData:[]};   
   }
   ///hàm chọn quốc gia từ menu
   static getDerivedStateFromProps(props,state){
     const displayData=state.rows.filter((data)=> data.Country===props.selectedCountry || props.selectedCountry==='');
      return {
        displayData:displayData
      };
   }
   componentDidMount(){
       this.getData();
   }
   getData=()=>{
       //console.log('getData');
       fetch('https://api.covid19api.com/summary')
             .then((res) =>res.json())
             .then(
                 (data)=>{
                    //console.log('results',data)
                    let id=1;
                    const dataWithId=data.Countries.map((x)=>
                         Object.assign({},
                          x,
                          {id:id++},
                          {FormatDate:"Ngày "+moment(x.date).format("DD/MM/YYYY")})
                    );
                   // console.log('dataWithId',dataWithId);
                    const displayData=[...dataWithId];
                    this.setState({rows:dataWithId,displayData:displayData});
                 },
                 (error)=>
                 {
                        console.log('error',error)
                 }
             )
   }
  render(){
    return (
        <div style={{ height: '700px', width: '100%' }}>
        <DataGrid rows={this.state.displayData} columns={this.state.columns} />
      </div>
    );
    }
 
}

export default Countries;