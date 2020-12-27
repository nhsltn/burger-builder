import React from 'react';

import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients) // Convert object of state to array
        .map(igKey => { // Get Value of ingredients state ex = [cheese, bacon, salad, meat] 
            return [...Array(props.ingredients[igKey])] // get value of nothing array from igkey = [4) [Array(1), Array(1), Array(2), Array(2)] which all array is undefinied because we just want get the how much ingredient
                .map((_, i) => { 
                    return <BurgerIngredients key={igKey + i} type={igKey} /> // from array of nothing we populated it value, props from igKey so Array(2) [key = cheese0/cheese1. props = cheese, and the typeof]
                })
        })
        .reduce((arr, el) => { // reduce to make it into into single aray combining(concat) from all el so results will be [6] [salad1, cheese1, cheese2, meat1, meat2, bacon] from [Array(1), Array(1), Array(2), Array(2)] 
            return arr.concat(el)
        }, []);
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please Start Adding Ingredients!</p>;
        }

    // console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
};

export default burger;