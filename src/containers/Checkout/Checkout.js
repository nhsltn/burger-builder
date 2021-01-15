import React, {Component} from 'react';
import {Route} from "react-router-dom";
import { connect } from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
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
                    ingredients={this.props.igd}
                    checkoutCancelled={this.CheckoutCancelledHandler}
                    checkoutContinued={this.CheckoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        igd: state.ingredients,
        price: state.totalPrice
    }
};

// const mapDispatchToProps = dispatch => {
    
// };


export default connect(mapStateToProps)(Checkout);