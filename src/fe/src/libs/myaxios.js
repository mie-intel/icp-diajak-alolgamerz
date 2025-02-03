import axios from "axios";

export const myaxios = axios.create({
    headers: {
        Authorization: localStorage.getItem("session") || "" 
    }
});