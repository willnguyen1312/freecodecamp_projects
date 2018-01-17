import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    api: "https://fcc-weather-api.glitch.me/api/current?",
    lat: "",
    lon: "",
    tempUnit: "C",
    currentTempt: undefined
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = "lat=" + position.coords.latitude;
        var lon = "lon=" + position.coords.longitude;
        // getWeather(lat, lon);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <header className="col-xs-12 text-center">
            <h1>
              Free C<i className="wi wi-hail" />de Camp{" "}
            </h1>
            <h1>Weather App</h1>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
