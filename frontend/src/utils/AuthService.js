import axios from "axios";
import { useInfo } from "./context";


axios.defaults.withCredentials = true;

export const signup = async (userData) => {
    return axios.post(
        `http://localhost:8000/api/users/signup`,
        userData
    );
};

export const login = async (credentials) => {
    return axios.post(
        `http://localhost:8000/api/users/login`,
        credentials
    );
};
export const logout = async () => {

    try {
        await axios.get(`http://localhost:8000/api/users/logout`, {
            withCredentials: true,
        });
        console.log("Logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const authenticate = async () => {
    return axios.get(`http://localhost:8000/api/users/authenticate`, {
        withCredentials: true,
    });
};

export const ask = async (question) => {
    return axios.post(`http://localhost:8000/api/users/ask`,
        question
    );
};