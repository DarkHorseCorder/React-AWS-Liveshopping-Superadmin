import React, { Fragment,useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import "./index.scss";
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './store/index'
import App from './App';
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {routes} from './router/route'
import ConfigDB from './data/customizer/config'

const Root = (props) =>  {

    const [anim, setAnim] = useState("");
    const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation     
    const abortController = new AbortController();

  useEffect(() => {
    setAnim(animation)
    const layout = localStorage.getItem('layout_version')
    document.body.classList.add(layout);
    const color = localStorage.getItem('color')
    document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;    
    return function cleanup() {
      abortController.abort();
    }
    
    // eslint-disable-next-line
    }, []);

  return(
      <Fragment>
        <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Switch>
            <Fragment>
            <App>
               <Route exact path="/" render={() => {
                          return (<Redirect to="/dashboard/user_management" />)
                      }} />
                <Route exact path="/dashboard" render={() => {
                          return (<Redirect to="/dashboard/user_management" />)
                      }} />

                <TransitionGroup>
                        {routes.map(({ path, Component }) => (
                            <Route key={path} exact path={path}>
                              {({ match }) => (
                                  <CSSTransition 
                                    in={match != null}
                                    timeout={500}
                                    classNames={anim} 
                                    unmountOnExit
                                    >
                                    <div><Component/></div>
                                  </CSSTransition> 
                              )}
                            </Route>
                          ))}
                </TransitionGroup>
            </App>
            </Fragment> 
          </Switch>
        </BrowserRouter>
        </Provider>
    </Fragment>
  )
}
ReactDOM.render(<Root/>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
