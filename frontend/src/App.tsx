import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ProposalList from './components/ProposalList';



function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <ProposalList></ProposalList>
    </div>
  );
}

export default App;
