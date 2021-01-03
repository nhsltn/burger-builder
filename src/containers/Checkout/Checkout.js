import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad : 1,
            meat : 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        console.log(this.props.location);
        const query = new URLSearchParams(this.props.location.search); //Ge
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]; // transforming ingredients from the url into the state
            console.log(ingredients);
        } 
        console.log(ingredients);
        this.setState({ingredients: ingredients});
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
            </div>
        );
    }

}

export default Checkout;