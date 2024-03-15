import { useEffect, useState } from "react";
import getCountries from "../services/countries";
import { Country } from "../models/Country";



const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    
    useEffect(() => {
        const fetchCountries = async () => {
        const data = await getCountries();
        setCountries(data);
        };
    
        fetchCountries();
    }, []);
    
    return {countries};
}

export default useCountries;