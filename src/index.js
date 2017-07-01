import React                  from 'react';
import ReactDOM               from 'react-dom';
import App                    from './App';
import registerServiceWorker  from './registerServiceWorker';
import main                   from './main';

import './index.css';

main();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
