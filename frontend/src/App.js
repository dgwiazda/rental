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

import WorekTreningowy from "./views/WorekTreningowy";

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
import Product from "./views/Product";

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
        <Route path="/user/orders" component={OrderList} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/order/bieznia" component={OrderBieznia} />
        <Route path="/order/hala" component={OrderHala} />
        <Route path="/order/kajak" component={OrderKajak} />
        <Route path="/order/mata" component={OrderMata} />
        <Route path="/order/orlik" component={OrderOrlik} />
        <Route path="/order/rower" component={OrderRower} />
        <Route
          path="/order/rower-stacjonarny"
          component={OrderRowerStacjonarny}
        />
        <Route path="/order/spadochron" component={OrderSpadochron} />
        <Route path="/order/stadion" component={OrderStadion} />
        <Route path="/order/szyna-cmp" component={OrderSzynaCmp} />
        <Route
          path="/order/worek-treningowy"
          component={OrderWorekTreningowy}
        />
        <Route path="/order/zestaw-do-nart" component={OrderZestawDoNart} />
        <Route path="/order/zestaw-do-hokeja" component={OrderZestawDoHokeja} />
        <Route
          path="/order/zestaw-snowboardowy"
          component={OrderZestawSnowboardowy}
        />
        <Route
          path="/order/zestaw-wspinaczkowy"
          component={OrderZestawDoWspinaczki}
        />
        <Home>
          <Route
            component={({ match }) => (
              <div>
                <Route exact path="/" component={Content} />
                <Route
                  path="/products/zestaw-do-nart"
                  render={(props) => (
                    <Product
                      itemIdDb={36}
                      imageId={[19, 20, 21]}
                      title={"Zestaw do nart"}
                      description={
                        <div>
                          <h3>W zestawie:</h3>
                          <ul>
                            <li>narty</li>
                            <li>kask</li>
                            <li>buty</li>
                            <li>kijki</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"zestaw-do-nart"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/zestaw-snowboardowy"
                  render={(props) => (
                    <Product
                      itemIdDb={47}
                      imageId={[22, 23]}
                      title={"Zestaw snowboardowy"}
                      description={
                        <div>
                          <h3>W zestawie:</h3>
                          <ul>
                            <li>deska</li>
                            <li>kask</li>
                            <li>buty</li>
                            <li>kijki</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"zestaw-snowboardowy"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/zestaw-do-hokeja"
                  render={(props) => (
                    <Product
                      itemIdDb={39}
                      imageId={[17, 18]}
                      title={"Zestaw do hokeja"}
                      description={
                        <div>
                          <h3>W zestawie:</h3>
                          <ul>
                            <li>kij</li>
                            <li>kask</li>
                            <li>łyżwy</li>
                            <li>bramki</li>
                            <li>krążek</li>
                            <li>strój</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"zestaw-do-hokeja"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/worek-treningowy"
                  component={WorekTreningowy}
                />
                <Route
                  path="/products/mata"
                  render={(props) => (
                    <Product
                      itemIdDb={8}
                      imageId={[4]}
                      title={"Mata treningowa"}
                      description={
                        <div>
                          <h3>Szczegóły:</h3>
                          <ul>
                            <li>wymiar: 1.25x1.25x0.3</li>
                            <li>no i dobra jest</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/szt na dzień"}
                      link={"mata"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/rower-stacjonarny"
                  render={(props) => (
                    <Product
                      itemIdDb={27}
                      imageId={[9, 10, 11]}
                      title={"Rower stacjonarny"}
                      description={""}
                      pricePer={"zł/dzień"}
                      link={"rower-stacjonarny"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/bieznia"
                  render={(props) => (
                    <Product
                      itemIdDb={1}
                      imageId={[0, 1]}
                      title={"Bieżnia"}
                      description={""}
                      pricePer={"zł/dzień"}
                      link={"bieznia"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/szyna-cmp"
                  render={(props) => (
                    <Product
                      itemIdDb={31}
                      imageId={[14]}
                      title={"Szyna CMP"}
                      description={
                        <div>
                          <h3>Szczegóły:</h3>
                          <ul>
                            <li>max zgięcie: 105 &deg;</li>
                            <li>pilot</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"szyna-cmp"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/orlik"
                  render={(props) => (
                    <Product
                      itemIdDb={18}
                      imageId={[5]}
                      title={"Orlik"}
                      description={
                        <div>
                          <h3>Adresy:</h3>
                          <ul>
                            <li>ul. Warszawska 36</li>
                            <li>ul. 3-maja 14</li>
                            <li>ul. Żwirki i Wigury 3</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/2h"}
                      link={"orlik"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/hala"
                  render={(props) => (
                    <Product
                      itemIdDb={3}
                      imageId={[2]}
                      title={"Hala sportowa"}
                      description={
                        <div>
                          <h3>Adresy:</h3>
                          <ul>
                            <li>ul. Wyspiańskiego 36</li>
                            <li>ul. Sochaczewska 14</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/2h"}
                      link={"hala"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/stadion"
                  render={(props) => (
                    <Product
                      itemIdDb={30}
                      imageId={[13]}
                      title={"Stadion"}
                      description={
                        <div>
                          <h3>Adres:</h3>
                          <ul>
                            <li>ul. Brochowska 54</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/2h"}
                      link={"stadion"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/kajak"
                  render={(props) => (
                    <Product
                      itemIdDb={5}
                      imageId={[3]}
                      title={"Kajak"}
                      description={
                        <div>
                          <h3>W zestawie:</h3>
                          <ul>
                            <li>2 wiosła</li>
                            <li>2 kapoki</li>
                            <li>kajak 2-osobowy</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"kajak"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/spadochron"
                  render={(props) => (
                    <Product
                      itemIdDb={29}
                      imageId={[12]}
                      title={"Spadochron"}
                      description={""}
                      pricePer={"zł/dzień"}
                      link={"spadochron"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/rower"
                  render={(props) => (
                    <Product
                      itemIdDb={21}
                      imageId={[6, 7, 8]}
                      title={"Rower"}
                      description={
                        <div>
                          <h3>Do wyboru:</h3>
                          <ul>
                            <li>kolażówka</li>
                            <li>górski</li>
                            <li>miejski</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"rower"}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/products/zestaw-wspinaczkowy"
                  render={(props) => (
                    <Product
                      itemIdDb={50}
                      imageId={[24, 25]}
                      title={"Zestaw Wspinaczkowy"}
                      description={
                        <div>
                          <h3>W zestawie</h3>
                          <ul>
                            <li>buty</li>
                            <li>haki</li>
                            <li>liny</li>
                            <li>rękawice</li>
                          </ul>
                        </div>
                      }
                      pricePer={"zł/dzień"}
                      link={"zestaw-wspinaczkowy"}
                      {...props}
                    />
                  )}
                />
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
