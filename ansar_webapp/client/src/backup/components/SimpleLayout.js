import React from 'react';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <div className="layout">
      <header className="layout-header">
        <h2>Simple Layout Header</h2>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>© 2023 Ansar Charity</p>
      </footer>
    </div>
  );
};

export default SimpleLayout; 