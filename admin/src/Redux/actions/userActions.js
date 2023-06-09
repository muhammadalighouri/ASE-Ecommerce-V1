import axiosa from "../../api/axiosa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    ALL_ORDERS_RESET,
    ORDER_DETAILS_RESET,
} from "../constants/orderConstants";
import {
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosa.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const getUsers = () => async (dispatch, getState) => {
    try {
        const {
            UserLogin: { userInfo },
        } = getState();

        dispatch({ type: USER_LIST_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axiosa.get(
            "/api/v1/admin/users/all",
            config
        );

        dispatch({ type: USER_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    // const navigate = useNavigate();
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch({ type: ALL_ORDERS_RESET });

    document.location.href = "/login";
};
