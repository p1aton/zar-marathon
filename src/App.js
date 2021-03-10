import { Route, Switch, Redirect, useLocation} from "react-router-dom"
import cn from 'classnames'

import Firebase from './service/firebase'

import Footer from './components/Footer';
import MenuHeader from './components/MenuHeader';

import GamePage from './routes/Game';
import HomePage from './routes/Home';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';

import s from './style.module.css';
import { FireBaseContext } from "./context/firebaseContext";
import FinishPage from "./routes/Game/routes/Finish";
import FirebaseClass from "./service/firebase";






const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/'|| location.pathname==='/game/board';


  return (
    <FireBaseContext.Provider value={FirebaseClass}>
    <Switch>
            <Route path="/404" render={() => (
        <h1>404 Not Found</h1>
      )} />
      <Route>
        <>
          <MenuHeader bgActive={!isPadding}/>
          <div className={cn(s.wrap, {
            [s.isHomePage]: isPadding
          })}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/game" component={GamePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/finish" component={FinishPage} />
            <Route render={() => (
              <Redirect to="404"/>
            )} />
          </Switch>
          </div>
          <Footer />
        </>
      </Route>
    </Switch>
    </FireBaseContext.Provider> 
  )

}

export default App;


