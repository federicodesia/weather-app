import { createContext } from "react";
import { CityState } from "../interfaces/interfaces";

export type CityContextProps = {
    cityState: CityState;
    searchCity: (value: string) => void
}

export const CityContext = createContext<CityContextProps>({} as CityContextProps);