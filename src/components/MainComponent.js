import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent'; 
import '../App.css';
import Home from './HomeComponent';
import {Route, Redirect, Switch } from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      
    };

}


  render(){

    const HomePage = () =>{
      return(
        <Home/>
      );
    }
  return (
    <div>
      <Header />
        <Switch>
          {/* Route to HOME inside switch based upon the url on the address bar*/}
          <Route path="/home" component={HomePage} /> 
          {/* Route to MENU */}
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />

          {/* Default path if above does not gets executed */}
          <Redirect to="/home"/>
        </Switch>
      <Footer/>
    </div> 
  );
}

}

export default Main;
