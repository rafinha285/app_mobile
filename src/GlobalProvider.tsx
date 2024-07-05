import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GlobalContextType {
	isLogged: boolean;
	setToken: (token: string | null) => void;
	getToken: () => Promise<string | undefined>;
}
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider:React.FC<{children:ReactNode}> = ({children}) =>{
	const [isLogged, setIsLogged] = useState<boolean>(false)
	// const [cookies] = useCookies();
	// const token = getCookie('token');
	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const token = await AsyncStorage.getItem("token")
				setIsLogged(!!token); // Verifica se o token existe e define o estado de isLogged
			} catch (error) {
				console.error("Erro ao acessar AsyncStorage:", error);
			}
		};
		
		checkLoginStatus();
	}, []);
	const getToken = async (): Promise<string | undefined> => {
		try {
			const token = await AsyncStorage.getItem("token");
			return token !== null ? token : undefined;
		} catch (e) {
			console.error("Erro ao acessar AsyncStorage:", e);
			return undefined;
		}
	};
	const setToken = async (token: string | null) => {
		try {
			if (token) {
				await AsyncStorage.setItem('token', token);
				setIsLogged(true);
			} else {
				await AsyncStorage.removeItem('token');
				setIsLogged(false);
			}
		} catch (error) {
			console.error("Erro ao acessar AsyncStorage:", error);
		}
	};
	
	return(
		<GlobalContext.Provider value={{isLogged,setToken,getToken}}>
			{children}
		</GlobalContext.Provider>
	)
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useGlobalContext deve ser usado dentro de um GlobalProvider");
	}
	return context;
};
export default GlobalProvider;
