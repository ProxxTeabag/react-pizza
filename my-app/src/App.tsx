import React, { lazy, Suspense } from "react"
import Loadable from 'react-loadable'
import { Routes, Route} from "react-router-dom"

import "./scss/app.scss"
import Home from "./pages/Home"

import MainLayout from './layouts/MainLayout'


const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Loading...</div>
});

const NotFound = lazy(() => import( /* webpackChunkName: "NotFound" */ './pages/NotFound'));



function App() {

  return (
        <Routes>
        <Route path="/" element= {<MainLayout />}> 
        <Route path="" element={<Home />} />
         <Route path="cart" element={<Cart />} />
         <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>} />
          </Route>

        </Routes>
  );
}

export default App;

