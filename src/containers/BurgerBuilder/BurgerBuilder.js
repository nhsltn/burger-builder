import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component {
    // constructor(props) { // bisa make ini juga
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; 
        const updatedCount = oldCount + 1;
        console.log(oldCount);
        console.log(updatedCount);
        const updatedIngredient = {
            ...this.state.ingredients
        };
        console.log(updatedIngredient);
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient})
    }

    removeIngredientHandler = (type) => {
        
    }

    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;