// import 'react-devtools'
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { primeTables } from './fetcher.js';

import { App } from './App.jsx';

// ReactDOM.render(
//     <h1>Hello World</h1>,
//   document.getElementById('root')
// );
// function MyApp() {
//   return <h1>Hello, world!</h1>;
// }

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container);
// root.render(<MyApp />);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<h1>Hello, world! iainj</h1>);

window.dispatch = async view => {
  await primeTables();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App name={view} />);
}

console.log('hello');
