
/**
 *
 */
import request                  from 'superagent';
import {
    addAttrs
  }                             from './Actions/Actions';

var   sg                        = require('sgsg/lite');
const _                         = require('underscore');
_.each(require('sgsg/flow'), (value, key) => { sg[key] = value; });

const normlz                    = sg.normlz;

const attrsUrl                  = normlz(`xcc/api/v1/dbg-telemetry/watch/`);

export default function main() {
  console.log('main() Starting...');

  return sg.__run([function(next) {
    next();

    one();
    function one() {
      // curl -s 'http://local.mobilewebassist.net/xcc/api/v1/dbg-telemetry/watch/' | _print
      return request.get(attrsUrl).end(function(err, res) {

        // Start next XHR
        one();

        // Noting for errors
        if (err)                  { console.error(err); return; }
        if (!res || !res.body)    { console.error(`No body from ${attrsUrl}`); return; }
        if (!res.body.ok)         { console.error(`Not OK from ${attrsUrl}`); return; }
        if (!res.body.items)      { console.error(`No items from ${attrsUrl}`); return; }

        // Success! Send the attrs objects
        console.log(`Got ${attrsUrl}:`, err, res.body);
        addAttrs(res.body.items);
      });
    }

  }], function() {
    console.log('Up and Running.');
  });
}

