import React,{Suspense,lazy} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {Switch,Route} from 'react-router';
//import component from './movie'

const Dashboard = lazy(() => import('./Dashboard'));

function Component() { 
return (
<div> 
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/* <Route exact path='/dashboard' component={component} ></Route> */}
          <Route path='/metrics' component={Dashboard}></Route>     
        </Switch>
      </Suspense>
    </BrowserRouter>
  
  </div>);
}

export default Component;
