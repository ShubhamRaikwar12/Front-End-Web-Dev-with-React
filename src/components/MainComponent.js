// Author: @Shubham Raikwar

import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent'; 
import '../App.css';
import Home from './HomeComponent';
import {Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { DISHES } from '../shared/dishes';

const mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  
  constructor(props){
    super(props);

}

  render(){
    const HomePage =() =>{
      return(
        <Home 
            dish ={this.props.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]}
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
        />
      );
    };
  

  const AboutUsPage = () =>{
    return(
        <About
          leaders={this.props.leaders}
        />
    );
  };

  const DishWithId = ({match}) =>{
    return(
      <DishDetail
        dish={this.props.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
      />
    );
  };


  
  return (
    <div>
      <Header />
        <Switch>
          {/* Route to HOME inside switch based upon the url on the address bar*/}
          <Route path="/home" component={HomePage} /> 
          <Route exact path="/aboutus" component={ () => <About leaders={this.props.leaders} /> } />
          {/* Route to MENU */}
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          
          {/* Default path if above does not gets executed */}
          <Redirect to="/home"/>
        </Switch>
      <Footer/>
    </div> 
  );
}

}

export default withRouter(connect(mapStateToProps)(Main));
