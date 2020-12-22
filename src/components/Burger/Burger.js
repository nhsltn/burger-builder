import React from 'react';

import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    const transformingredients = Object.keys(props.ingredients)
        .map(igKey => { // Get Value of ingredients state ex = [cheese, bacon, salad, meat] 
            return [...Array(props.ingredients[igKey])] // get value of nothing array from igkey = [4) [Array(1), Array(1), Array(2), Array(2)] which all array is undefinied because we just want get the how much ingredient
                .map((_, i) => { 
                    return <BurgerIngredients key={igKey + i} type={igKey} /> // from array of nothing we populated it value, props from igKey so Array(2) [key = cheese0/cheese1. props = cheese, and the typeof]
                })
        });

    // console.log(transformingredients); check hasil di console

    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformingredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
};

export default burger;