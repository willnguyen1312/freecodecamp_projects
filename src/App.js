import React from "react";
import $ from "jquery";
import { Grid, Row, Col, Table } from "react-bootstrap";
import "./App.css";

const TableRow = ({ status, logo, url, name, game, description }) => (
  <tr>
    <td className="text-center">
      <img alt="Avatar" className="logo" src={logo} />
    </td>
    <td className="text-center pad-top-11">
    <a href={url} target={"_blank"}>{name}</a>
    </td>
    <td className="text-center pad-top-11">
      {game} {description}
    </td>
  </tr>
);

const makeUrl = (type, name) =>
  `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`;
class App extends React.Component {
  state = {
    channels: ["freecodecamp", "ninja", "dizzykitten"],
    result: []
  };

  componentDidMount = () => {
    const { channels } = this.state;
    let result = [];
    channels.forEach(channel => {
      let _channel = {};
      $.getJSON(makeUrl("streams", channel), data => {
        let game, status;
        if (data.stream === null) {
          game = "Offline";
          status = "offline";
        } else if (data.stream === undefined) {
          game = "Account Closed";
          status = "offline";
        } else {
          game = data.stream.game;
          status = "online";
        }
        $.getJSON(makeUrl("channels", channel), data => {
          let logo =
              data.logo != null
                ? data.logo
                : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
            name = data.display_name !== null ? data.display_name : channel,
            description = status === "online" ? ": " + data.status : "",
            url = data.url;
          _channel = {
            status,
            logo,
            url,
            name,
            game,
            description
          };
          result.push(_channel);
          this.setState({
            result
          });
        });
      });
    });
  };
  render() {
    return (
      <Grid fluid style={{ marginTop: 10 }}>
        <Row>
          <Col xs={12} smOffset={3} sm={6}>
            <h1 className="text-center">Twitch Tivi Streamline</h1>

            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center">Avatar</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.result.map((channel, index) => (
                  <TableRow {...channel} key={index} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default App;
