import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home, Cart, ProductDetails, PurchaseScreen } from './pages';

import CartLink from './components/CartLink';

import './App.css';

function App() {
  return (
    <BrowserRouter basename="/online-store">
      <div className="App">
        <CartLink />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/purchase" component={PurchaseScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
