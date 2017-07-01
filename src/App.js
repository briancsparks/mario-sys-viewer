
import React, { Component }     from 'react';
import TopTabs                  from './Components/TopTabsComponent';

import {
  Navbar, Nav, NavItem, Grid
  }                             from 'react-bootstrap';

import './short.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse fluid fixedTop>

          {/* Header and Brand -- "Mario System Viewer" */}
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Mario System Viewer</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          {/* Header links*/}
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/foobar">Foo Bar</NavItem>
            </Nav>
          </Navbar.Collapse>

        </Navbar>
        <div>
          <Grid fluid={true}>
            <TopTabs>
            </TopTabs>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
