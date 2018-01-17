import React from "react";
import $ from "jquery";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

const WrappedListGroupItem = ({title, snippet}) => {
  return (
    <ListGroupItem>
      <div className="well">
        <a
          href={`https://en.wikipedia.org/wiki/'${title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>{title}</h3>
        </a>
        <p dangerouslySetInnerHTML={{__html: snippet}}></p>
      </div>
    </ListGroupItem>
  );
};
class App extends React.Component {
  state = {
    searchText: "",
    api:
      "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=",
    result: []
  };
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { api, searchText } = this.state;
    const url = api + searchText;
    $.ajax({
      url,
      dataType: "jsonp",
      type: "POST",
      headers: {
        "Api-User-Agent": "Example/1.0"
      },
      success: data => {
        const result = data.query.search;
        console.log(result)
        this.setState({
          result
        });
      }
    });
  };

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };
  render() {
    return (
      <Grid style={{ marginTop: 10 }}>
        <Row>
          <Col xs={12} md={7}>
            <h1 className="text-center">Wikipedia Viewer</h1>
            <a
              href="https://en.wikipedia.org/wiki/Special:Random"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              Random Article
            </a>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Search Box
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Please enter your text"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={this.state.searchText}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button
                    onClick={this.handleSubmit}
                    bsStyle="primary"
                    type="submit"
                  >
                    GO!
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12} md={7}>
            <ListGroup>
              {this.state.result && this.state.result.map(item => <WrappedListGroupItem title={item.title} snippet={item.snippet} key={item.pageid}/>)}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default App;
