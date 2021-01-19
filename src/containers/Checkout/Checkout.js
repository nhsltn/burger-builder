import React, {Component} from 'react';
import { Route, Redirect } from "react-router-dom";
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
        let summary = <Redirect to="/" />
        if (this.props.igd) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.igd}
                        checkoutCancelled={this.CheckoutCancelledHandler}
                        checkoutContinued={this.CheckoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        igd: state.burgerBuilder.ingredients,
    }
};

// const mapDispatchToProps = dispatch => {
    
// };


export default connect(mapStateToProps)(Checkout);