import React, {Component} from 'react';
import {Route} from "react-router-dom";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    UNSAFE_componentWillMount() {
        console.log(this.props.location);
        const query = new URLSearchParams(this.props.location.search); //Ge
        const ingredients = {};
        let price =  0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]; // transforming ingredients from the url into the state
            }
            console.log(param);
            console.log(price);
            console.log(ingredients);
        } 
        console.log(ingredients);
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.CheckoutCancelledHandler}
                    checkoutContinued={this.CheckoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }

}

export default Checkout;