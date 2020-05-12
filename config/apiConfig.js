import axios from "axios";

export const getGuest = axios.create({
    baseURL:"https://api.unsplash.com/",
    headers:{
        Accept: "application/json",
    },
})

export const AccessKey="jwzD5gw-NpiyG8MgXgk92wnUH7Rz4wxMOIC7aKDAPk4"