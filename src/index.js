import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

// Router Imports
import { BrowserRouter as Router } from "react-router-dom";

// ScrollToTop Import
import ScrollToTop from './utils/ScrollToTop'
import RemoveCartId from './utils/RemoveCartId'

ReactDOM.render(
    <Router>
        <ScrollToTop />
        <RemoveCartId />
        <App />
    </Router>
,document.getElementById('root'));
