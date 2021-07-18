import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Homepage from './components/hompage/homepage';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useState } from 'react';

function App() {

  const [user, setLoginUser] = useState({})

  return (
    <div className="App">
        <Router>
          <Switch>
             <Route exact path='/'>
                {
                 user && user._id ? <Homepage setLoginUser={setLoginUser}/>: <Login setLoginUser={setLoginUser} />
               } 
             </Route>

            <Route exact path='/login'> 
              <Login setLoginUser={setLoginUser}/> 
            </Route>

            <Route exact path='/register'> 
              <Register /> 
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
