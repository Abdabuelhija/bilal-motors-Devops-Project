import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const API ="http://localhost:8000/Admin"

export const checkPassword = async (password) => {
    try {
        const response = await axios.post(`${API}/login`, {password});
        if (response.status === 200) {
            console.log(response);
            return response.data;
        }
        return null;
    }
    catch (error) {
        console.error("Unable to check password:", error);
        return null;
    }
};


export const resetPassword = async (password) => {
    try {
        const response = await axios.put(`${API}`,{Password: password});
        if (response.status === 200) {
            return true;
        }
        else {
            console.error("Unable to reset password, status code:", response.status);
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

export const sendMail = async (random) => {
    try {
        const response = await axios.post(`${API}/sendmail`, { random });
        if (response.status === 200) {
            return true;
        } else {
            console.error("Unable to send mail, status code:", response.status);
            return false;
        }
    }
    catch (error) {
        console.error("Unable to send mail:", error);
        return false;
    }
};




