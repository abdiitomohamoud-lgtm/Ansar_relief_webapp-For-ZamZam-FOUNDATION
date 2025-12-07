import React from 'react';
import Layout from './layouts/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const DiagnosticTest = () => {
  return (
    <div>
      <h1>Diagnostic Test</h1>
      <p>If you see this, the basic React setup is working</p>
      
      <h2>Testing LoadingSpinner:</h2>
      <LoadingSpinner />
      
      <h2>Testing Layout:</h2>
      <Router>
        <Layout />
      </Router>
      
      <h2>Testing Redux Provider:</h2>
      <Provider store={store}>
        <div>Redux Provider Test</div>
      </Provider>
    </div>
  );
};

export default DiagnosticTest; 