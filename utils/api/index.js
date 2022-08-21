import axios from "axios";
import Cookies, { parseCookies } from 'nookies';
import { AuthApi } from "./auth";
import { InvitingApi } from "./inviting"
import { ChannelsApi } from "./channels"


export const Api = (ctx) => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.token;

    const instance = axios.create({
        withCredentials: true,
        baseURL: process.env.API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return {
        auth: AuthApi(instance),
        inviting: InvitingApi(instance),
        channels: ChannelsApi(instance),
    }
};