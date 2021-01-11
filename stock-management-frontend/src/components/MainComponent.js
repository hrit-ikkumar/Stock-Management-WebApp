import React, {Component} from 'react'; // React Component Class Added
import Header from './HeaderComponent'; // Header Component imported
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import { Switch, Route, Redirect } from 'react-router-dom';

// Main Class Component
class Main extends Component{
    render(){
        return(
            <div>
                <Header />
                <TransitionGroup>
                    <Switch>
                        <Route path="/home" component={Header} />
                    </Switch>
                </TransitionGroup>
            </div>
        );
    }
}

export default Main;