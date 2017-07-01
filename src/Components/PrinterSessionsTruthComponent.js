
import _                        from 'underscore';
import React, { Component }     from 'react';
import {
  Table, thead, tr, th, tbody, td
  }                             from 'react-bootstrap';
import printersStore            from '../Stores/PrintersStore';
import {
    cp
  }                             from '../helpers';

import '../short.css';

class PrintersTruth extends Component {

  componentDidMount() {
    printersStore.addChangeListener(this._onChange.bind(this));
  }

  render() {
//    var whos = printersStore.getWhos();
//    console.log('Whos: ', whos);

    var whos      = [];
    var printers  = [];
    var state     = this.state;

    if (state) {
      whos = this.state.whos || whos;

      console.log('state.printers', this.state.printers);
      printers = _.map(this.state.printers || {}, (printer, ip) => {
        return _.extend({}, printer, {ip});
      });

      // Sort by fastest response for printer
      printers = _.sortBy(printers, (printer) => {
        var speed = _.reduce(whos, (latency, who) => {
          return _.min([latency, printer.who[who] || latency+1]);
        }, 999000);
        return speed;
      });

      // Sort backwards by speed
      printers.reverse();

      // Sort by slowest find
      printers = _.sortBy(printers, (printer) => {
        var speed = _.reduce(whos, (m, who) => {
          const thisLatency = printer.who[who] || 999000;

          if (thisLatency === 999000)   { return thisLatency + m; }
          if (m >= 999000)              { return thisLatency + m; }

          return _.max([m, thisLatency]);
        }, 0);
        return speed;
      });

      // Sort backwards by speed
      printers.reverse();

    }

    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>IP</th>
              <th>SN</th>

                { _.map(whos, (who, i) => {
                  return (

                    <th key={i}>{ `${who}` }</th>

                  )
                })}

            </tr>
          </thead>

          <tbody>

              { _.map(printers, (printer, i) => {
                const ip = printer.ip;
//                console.log('--------', ip);
                return (
                <tr key={ip.toString()}>
                  <td key="{i}">{ i } </td>
                  <td key="{ip}">{ ip } </td>
                  <td key="{ip+printer.SN}">{ printer.SN || '---' }</td>
                   {_.map(whos, (who, i) => {
                      return (
                        <td key={ip+who}>{ printer.who[who] || '---' }</td>
                      )
                    })}
                </tr>
                )
              })}

          </tbody>

        </Table>
      </div>
    );
  }

  _onChange() {
    var printers  = cp(printersStore.getPrinters());
    var whos      = printersStore.getWhos();

    this.setState({printers, whos});
  }
}


export default PrintersTruth;

