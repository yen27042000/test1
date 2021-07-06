
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import { ThreeSixtySharp } from "@material-ui/icons";

class ComboCountries extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      { field: "Country", headerName: "Country", width: 150 },
      { field: "Slug", headerName: "Slug", width: 150 },
      { field: "IS02", headerName: "IS02", width: 150 },
    ];
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
          
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
    this.state = { columns: columns, 
                   rows: [] ,
                   selectedCountries:'',
                   useStyles:useStyles,
                };
  };
  handleChange = (event) => {
    //console.log('chọn',event);
    this.setState({selectedCountries:event.target.value});
    this.props.handleChange(event.target.value);
  };
  componentDidMount() {
    this.getData();
  }
 
 totalCountries =(totalCountries)=> {
    console.log('totalCountries:',totalCountries);
    
  };
  getData = () => {
    //console.log("getData");
    fetch("https://api.covid19api.com/countries")
      .then((res) => res.json())
      .then(
        (data) => {
          //console.log("results", data);
          let id = 1;
          let dataWithId = data.map((x) =>
            Object.assign({}, x, { id: id++ })
          );
         // console.log("dataWithId 1", dataWithId);
          dataWithId = dataWithId.sort((a,b) => a.Country < b.Country ? -1 : 1);
          //console.log("dataWithId 2", dataWithId);
          this.setState({ rows: dataWithId });
          this.props.totalCountries(dataWithId.length);
        },
        (error) => {
          console.log("error", error);
        }
      );
  };
  render() {
    return (
      <div style={{minWidth: 200}}>
        <FormControl className={this.state.useStyles.formControl}>
          <InputLabel id="demo-simple-select-label" style={{color:'white'}}>
           Quốc gia
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{minWidth: 200}}
            value={this.state.selectedCountries}
            onChange={this.handleChange}
          >
            {this.state.rows.map((value,index)=>{
                    return (
                        <MenuItem key={value.Country} value={value.Country}>
                                 {value.Country}
                                 </MenuItem>
                        );
            })}
        
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default ComboCountries;
