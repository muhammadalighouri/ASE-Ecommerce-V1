import { getProductconstants } from "../constants/actionTypes";
import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
} from "../constants/productConstants";

const initialstate = {
    products: [],
};
// GET all products 

export const allProductsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// get single products 

export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true, };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

// New Product Reducer
export const newProductReducer = (state = { product: {} }, { type, payload }) => {
    switch (type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                product: payload.product,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// get single products 

export const singleProductReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true, products: [] };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
