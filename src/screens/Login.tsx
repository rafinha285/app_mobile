import { FC, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import Header from "../components/homePage/Header.tsx";
import { baseStyles, light_blue, primary, white } from "../styles/baseStyle.ts";
import { homeStyle } from "../styles/homeStyle.ts";
import { loginStyles } from "../styles/loginStyles.ts";
import TextFont from "../components/TextFont.tsx";
import { PressableView } from "../components/ViewTochable.tsx";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import PasswordInput from "../components/loginPage/PasswordInput.tsx";
import ReCAPTCHA from "../components/loginPage/ReCAPTCHA.tsx";
import TextInputComp from "../components/TextInput.tsx";
import { ipApi, ipBase } from "../consts.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../GlobalProvider.tsx";

const Login:FC = () =>{
	const navigation = useNavigation();
	const { setToken } = useGlobalContext()
	const [email,setEmail] = useState<string>("")
	const [password,setPassword] = useState<string>()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const togglePassword = () =>{
		setIsPasswordVisible(!isPasswordVisible)
	}
	const handleLogin = async () =>{
		try{
			const response = await fetch(`${ipBase}/app/login`,{
				method:"POST",
				headers:{
					'Content-Type': 'application/json',
				},
				body:JSON.stringify({email,password})
			})
			console.log(response.status,`${ipBase}/app/login`)
			const data = await response.json();
			if(response.ok){
				setToken(data.token)
				Alert.alert("Login Successful");
				navigation.navigate("Home");
			}else{
				Alert.alert('Login Failed', data.message);
			}
		}catch (err){
			console.error('Login error:', err);
			Alert.alert('Login Failed', 'Something went wrong. Please try again.');
		}
		console.log(email,password);
	}
	const handleRegister = () =>{
		navigation.navigate("Register" as never)
	}
	return (
		<View style={[homeStyle.body,loginStyles.container]}>
			<Header/>
			<View style={loginStyles.container}>
				<View style={loginStyles.innerContainer}>
					<TextFont style={loginStyles.title}>Login</TextFont>
					<TextInputComp
						placeholder={"Email"}
						value={email}
						inputMode={"email"}
						onChange={setEmail}
					/>
					<PasswordInput password={password} isPasswordVisible={isPasswordVisible} setPassword={setPassword} togglePassword={togglePassword}/>
					{/*<ReCAPTCHA/>*/}
					<View>
						<PressableView style={loginStyles.submitButton} onPress={handleLogin}>
							<TextFont>Submit</TextFont>
						</PressableView>
						<View style={{flexDirection:"row"}}>
							<TextFont>Não tem conta? </TextFont>
							<PressableView onPress={handleRegister}>
								<TextFont style={{color:primary}}>Crie uma</TextFont>
							</PressableView>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}
export default Login
