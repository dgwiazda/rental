import React, { useEffect } from "react";

import { Router, Switch, Route } from "react-router-dom";

import { clearMessage } from "./actions/message";
import { useDispatch } from "react-redux";

import Contact from "./views/Contact";
import NoMatch from "./views/NoMatch";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import BoardAdmin from "./views/BoardAdmin";
import OrderList from "./views/OrderList";
import Profile from "./views/Profile";

import Footer from "./components/Footer";
import Content from "./components/Content";
import NavigationBar from "./components/NavigationBar";

import ZestawDoNart from "./views/products/ZestawDoNart";
import ZestawSnowboardowy from "./views/products/ZestawSnowboardowy";
import ZestawDoHokeja from "./views/products/ZestawDoHokeja";
import WorekTreningowy from "./views/products/WorekTreningowy";
import Mata from "./views/products/Mata";
import RowerStacjonarny from "./views/products/RowerStacjonarny";
import Bieznia from "./views/products/Bieznia";
import SzynaCmp from "./views/products/SzynaCmp";
import Orlik from "./views/products/Orlik";
import Hala from "./views/products/Hala";
import Stadion from "./views/products/Stadion";
import Kajak from "./views/products/Kajak";
import Spadochron from "./views/products/Spadochron";
import Rower from "./views/products/Rower";
import ZestawWspinaczkowy from "./views/products/ZestawWspinaczkowy";

import OrderBieznia from "./views/orders/OrderBieznia";
import OrderHala from "./views/orders/OrderHala";
import OrderKajak from "./views/orders/OrderKajak";
import OrderMata from "./views/orders/OrderMata";
import OrderOrlik from "./views/orders/OrderOrlik";
import OrderRower from "./views/orders/OrderRower";
import OrderRowerStacjonarny from "./views/orders/OrderRowerStacjonarny";
import OrderSpadochron from "./views/orders/OrderSpadochron";
import OrderStadion from "./views/orders/OrderStadion";
import OrderSzynaCmp from "./views/orders/OrderSzynaCmp";
import OrderWorekTreningowy from "./views/orders/OrderWorekTreningowy";
import OrderZestawDoNart from "./views/orders/OrderZestawDoNart";
import OrderZestawDoHokeja from "./views/orders/OrderZestawDoHokeja";
import OrderZestawSnowboardowy from "./views/orders/OrderZestawSnowboardowy";
import OrderZestawDoWspinaczki from "./views/orders/OrderZestawWspinaczkowy";

import { history } from "./helpers/history";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  return (
    <Router history={history}>
      <NavigationBar />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/Contact" component={Contact} />
        <Route path="/signup" component={SignUp} />
        <Route path="/admin" component={BoardAdmin} />
        <Route path="/user/orders" component={OrderList}/>
        <Route path="/user/profile" component={Profile}/>
        <Route path="/order/bieznia" component={OrderBieznia} />
        <Route path="/order/hala" component={OrderHala} />
        <Route path="/order/kajak" component={OrderKajak} />
        <Route path="/order/mata" component={OrderMata} />
        <Route path="/order/orlik" component={OrderOrlik} />
        <Route path="/order/rower" component={OrderRower} />
        <Route path="/order/rower-stacjonarny" component={OrderRowerStacjonarny}/>
        <Route path="/order/spadochron" component={OrderSpadochron} />
        <Route path="/order/stadion" component={OrderStadion} />
        <Route path="/order/szyna-cmp" component={OrderSzynaCmp} />
        <Route path="/order/worek-treningowy" component={OrderWorekTreningowy}/>
        <Route path="/order/zestaw-do-nart" component={OrderZestawDoNart} />
        <Route path="/order/zestaw-do-hokeja" component={OrderZestawDoHokeja} />
        <Route path="/order/zestaw-snowboardowy" component={OrderZestawSnowboardowy}/>
        <Route path="/order/zestaw-wspinaczkowy" component={OrderZestawDoWspinaczki}/>
        <Home>
          <Route
            component={({ match }) => (
              <div>
                <Route exact path="/" component={Content} />
                <Route path="/products/zestaw-do-nart" component={ZestawDoNart}/>
                <Route path="/products/zestaw-snowboardowy" component={ZestawSnowboardowy}/>
                <Route path="/products/zestaw-do-hokeja"  component={ZestawDoHokeja}/>
                <Route path="/products/worek-treningowy" component={WorekTreningowy}/>
                <Route path="/products/mata" component={Mata} />
                <Route path="/products/rower-stacjonarny" component={RowerStacjonarny}/>
                <Route path="/products/bieznia" component={Bieznia} />
                <Route path="/products/szyna-cmp" component={SzynaCmp} />
                <Route path="/products/orlik" component={Orlik} />
                <Route path="/products/hala" component={Hala} />
                <Route path="/products/stadion" component={Stadion} />
                <Route path="/products/kajak" component={Kajak} />
                <Route path="/products/spadochron" component={Spadochron} />
                <Route path="/products/rower" component={Rower} />
                <Route path="/products/zestaw-wspinaczkowy" component={ZestawWspinaczkowy}/>
              </div>
            )}
          />
        </Home>
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
