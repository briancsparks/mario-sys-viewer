
//import _                                from 'underscore';
import React, { Component }             from 'react';
import PrinterSessionsTruthComponent    from './PrinterSessionsTruthComponent';

import {
  Tabs, Tab
  }                                     from 'react-bootstrap';

import '../short.css';

class TopTabs extends Component {

  componentWillMount() {
    this.setState({key:1});
  }

  render() {

    return (
      <div>
        <Tabs activeKey={this.state.key} defaultActiveKey={1} onSelect={this._handleSelect.bind(this)} id="top-tabs">
          <Tab eventKey={1} title="Printer Truth">
            <PrinterSessionsTruthComponent>
            </PrinterSessionsTruthComponent>
          </Tab>
        </Tabs>
      </div>
    );
  }

  _handleSelect(key) {
    this.setState({key});
  }

}

export default TopTabs;


