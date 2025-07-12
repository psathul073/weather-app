import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_UNSPLASH_API_URL,
    headers: { "Content-Type": "application/json" },
});
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export const FetchCityImg = async (city) => {
    if (!city)  return;
    try {
        // console.log(city);
        
        const res = await API.get(`/search/photos?query=${city}&client_id=${API_KEY}`);
        // console.log(res.data, 'img--');
        return res.data?.results?.[0]?.urls?.regular;
        
    } catch (error) {
        console.error('Error fetching city image', error);
        return null;
    }
};