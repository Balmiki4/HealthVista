import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './component/NavBar';
import homePage from './component/homePage';
import login from './component/login';
import signup from './component/signup';
import wellnesspage from './component/wellnesspage';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'



const App=()=>{

  
  return(
    <Router>
    <div className=''>
      <NavBar/>
      <Switch>
      <Route path='/signup' exact component={signup}> 
        </Route> 
        <Route path='/login' exact component={login}> 
        </Route> 
        <Route path='/' exact component={homePage}> 
        </Route> 
        <Route path='/wellnesspage' exact component={wellnesspage}> 
        </Route> 
      </Switch>
    </div>
    </Router>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<App/>,document.getElementById('root'))