import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from './routes.js';

import { AppHeader } from './cmps/AppHeader';
import { UserMsg } from './cmps/UserMsg';

export function RootCmp() {

  return (
    <section className='app-layout'>
      <AppHeader />
      <main className='app-main'>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} element={route.component} path={route.path} />
          ))}
        </Routes>
      </main>
      <UserMsg />
    </section >
  );
}

export default RootCmp;
