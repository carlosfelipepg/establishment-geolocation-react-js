import React from 'react';
import axios from 'axios';
import { geolocated } from "react-geolocated";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class App extends React.Component {
  state = {
    list: []
  }
  componentWillReceiveProps(props) {
    axios.post('http://192.168.0.136:8444/api/establishment/order_establishment_by_distance/',
      { lat: props.coords ? props.coords.latitude : null, lon: props.coords ? props.coords.longitude : null })
      .then((response) => {
        const { data } = response;
        this.setState({ list: data })
      })
      .catch((error) => {
        console.log(error.response)
      });
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', flexDirection: 'column', height: '100vh' }}>
        <div style={{ color: 'white' }}>Your browser does not support Geolocation</div>
      </div>
    ) : !this.props.isGeolocationEnabled ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', flexDirection: 'column', height: '100vh' }}>
        <div style={{ color: 'white' }}>Localização não está ativa</div>
      </div>
    ) : this.props.coords ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', flexDirection: 'column', height: '100vh' }}>
        <Typography variant="h6" style={{ width: '50%', color: 'white' }}>
          Estabelecimentos próximos
          </Typography>
        <div style={{ width: '50%', justifyContent: 'center', textAlign: 'center' }}>
          <List style={{ alignItems: 'center' }}>
            {this.state.list.map((value, index) => {
              return <div key={index}>
                <ListItem style={{ backgroundColor: '#f3f3f3' }}>
                  <ListItemText
                    primary={value.name}
                    secondary={value.distance.toFixed(2) + ' Km'}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>

            })}
          </List>
        </div>
      </div>
    ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', flexDirection: 'column', height: '100vh' }}>
              <div style={{ color: 'white' }}>Obtendo os dados de localização&hellip; </div>
            </div>
          );
  }
}

// export default App;
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
