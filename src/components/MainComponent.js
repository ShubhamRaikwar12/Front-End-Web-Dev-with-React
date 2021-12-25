// Author: @Shubham Raikwar

import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent'; 
import '../App.css';
import Home from './HomeComponent';
import {Route, Redirect, Switch } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };

}

  render(){
    const HomePage =() =>{
      return(
        <Home 
            dish ={this.state.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.state.promotions.filter((promotion)=>promotion.featured)[0]}
            leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    };
  

  const AboutUsPage = () =>{
    return(
        <About
          leaders={this.state.leaders}
        />
    );
  };

  const DishWithId = ({match}) =>{
    return(
      <DishDetail
        dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
      />
    );
  };


  
  return (
    <div>
      <Header />
        <Switch>
          {/* Route to HOME inside switch based upon the url on the address bar*/}
          <Route path="/home" component={HomePage} /> 
          {/* Route to MENU */}
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={ AboutUsPage } />
          {/* Default path if above does not gets executed */}
          <Redirect to="/home"/>
        </Switch>
      <Footer/>
    </div> 
  );
}

}

export default Main;
