import axios from "axios";

interface ChatParam {
    chat_id: number
    text: string
}

export const getAxiosInstance = () => {
    const { TELEGRAM_TOKEN, TELEGRAM_URL} = process.env

    return {
        get(method: string, params: ChatParam){
            console.log("--- Get", params)
            return axios.get(`/${method}`, {
                baseURL: `${TELEGRAM_URL}${TELEGRAM_TOKEN}`,
                params
            })
        },
    }
}