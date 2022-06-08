// think of this index.js as the 'starting point' for webpack, it will basically look through everything inside of here and include it in the 'output'

import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import './stylesheets/styles.scss';

const appElement = document.getElementById('app');

render(<App />, appElement);
