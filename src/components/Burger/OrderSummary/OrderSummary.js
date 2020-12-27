import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component { // This using class based component due to checking component lifecycle, you can convert it into standard functional component
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingredietKey => {
            return (
                <li key={ingredietKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingredietKey}</span>
                    : {this.props.ingredients[ingredietKey]}
                </li>)
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}


export default OrderSummary;