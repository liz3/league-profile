import React, {Suspense} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContentWrapper from './components/ContentWrapper'
import Store from "./common/Store";
import { Provider } from "react-redux";
import {createGlobalStyle} from 'styled-components'
import Profile from "./pages/Profile"
import Matchlist from "./pages/Matchlist"
import Match from "./pages/Match"
import Home from "./pages/Home"


const Styles = createGlobalStyle`
.dropdown-base {
  position: relative;
  .drop-down-container {
      position: absolute;
      z-index: 5000;
   
  }
}
`

function App() {
  return (
    <Suspense fallback={null}>
          <Styles />
        <Router>
        <Provider store={Store}>
        <ContentWrapper>
          <Switch>
            <Route path={"/profile/:region/:name/:tag"} component={Profile}  exact/>
            <Route path={"/profile/:region/:name/:tag/matchlist"} component={Matchlist} exact />
            <Route path={"/match/:region/:matchId/:summonerId"} component={Match} exact/>
            <Route component={Home} />
          </Switch>
        </ContentWrapper>
        </Provider>
        </Router>
    </Suspense>
  );
}

export default App;
