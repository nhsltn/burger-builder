import axios from '../../axios-orders'
// import order from '../../components/Order/Order';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    };
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
}