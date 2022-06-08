import { createContext } from "react";
import { City, CityData, CityState } from "../interfaces/city";

export type CityContextProps = {
    cityState: CityState;
    searchCity: (value: string) => void
    addCity: (data: CityData) => void,
    selectCity: (city: City) => void
}

export const CityContext = createContext<CityContextProps>({} as CityContextProps);