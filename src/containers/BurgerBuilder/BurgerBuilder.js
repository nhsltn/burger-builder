import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {        
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://react-burger-app-nhsltn-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchasedState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You Continue!');

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            // the code above is to get amount of ingredients we select in the burger builder and push into url in the checkout container url
            // queryParams.push(encodeURIComponent(i) is ouputting salad+meat+cheese, etc while the rest of the code is pushing amount of ingredients to it like salad=1&meat=2

        }
        queryParams.push('price=' + this.state.totalPrice);
        console.log(queryParams);
        const queryString = queryParams.join('&');
        console.log(queryString);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.igd
        };

        for (let ingredientValue in disabledInfo) {
            disabledInfo[ingredientValue] = disabledInfo[ingredientValue] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.igd) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.igd} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        price={this.props.price}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = 
            <OrderSummary 
                ingredients={this.props.igd}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />
            
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        igd: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igdName) =>  dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: igdName}),
        onIngredientRemoved: (igdName) =>  dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: igdName})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));