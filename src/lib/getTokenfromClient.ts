import { authClient } from "./auth-client"

export const getTokenfromClient = async() => {
    const {data} = await authClient.token();

    const token = data?.token;
    return token

}