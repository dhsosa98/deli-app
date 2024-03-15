import { Country } from "../models/Country";

import { API_BASE_URL } from "../vite-env.d"

const API_URL = API_BASE_URL+'/countries';


async function getCountries(): Promise<Country[]>{
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.countries;
}

export default getCountries;
