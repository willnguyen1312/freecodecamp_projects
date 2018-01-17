import React, { Component } from "react";
import "./App.css";

class App extends React.Component {
  state = {
    api: "https://fcc-weather-api.glitch.me/api/current?",
    lat: "",
    lon: "",
    currentTempUnit: "C",
    currentTemp: "",
    city: "",
    country: "",
    desc: ""
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = "lat=" + position.coords.latitude;
        const lon = "lon=" + position.coords.longitude;
        this.setState({
          lat,
          lon
        });
        this.getWeather();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  getWeather = () => {
    const { api, lat, lon } = this.state;
    const urlString = api + lat + "&" + lon;
    fetch(urlString)
      .then(response => response.json())
      .then(data => {
        const { name: city, sys: { country }, main: { temp }, weather } = data;

        const desc = weather[0].main;

        const currentTemp = `${Math.round(temp * 10) / 10}`;
        this.setState({
          city,
          country,
          currentTemp,
          desc
        });
      });
  };

  handleChangeTempUnit = () => {
    const { currentTempUnit, currentTemp } = this.state;
    const newTempUnit = currentTempUnit === "C" ? "F" : "C";
    let newTemp;
    if (newTempUnit === "F") {
      newTemp = Math.round(parseInt(currentTemp) * 9 / 5 + 32);
    } else {
      newTemp = Math.round((parseInt(currentTemp) - 32) * 5 / 9);
    }
    this.setState({
      currentTemp: newTemp,
      currentTempUnit: newTempUnit
    });
  };

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
          <div className="col-xs-8 col-xs-offset-2">
            <div className="text-center">
              <p>
                {this.state.city}, {this.state.country}
              </p>
              <p>
                {this.state.currentTemp} {String.fromCharCode(176)}{" "}
                <span
                  onClick={this.handleChangeTempUnit}
                  className="pointer text-primary"
                >
                  {this.state.currentTempUnit}
                </span>
              </p>
              <p>{this.state.desc}</p>
            </div>

            <p className="text-center">
              Inspired By{" "}
              <a href="https://codepen.io/freeCodeCamp/" target="_blank">
                FreeCodeCamp
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
