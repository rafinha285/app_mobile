import { FC, useState } from "react";
import { View } from "react-native";
import Header from "../components/homePage/Header.tsx";
import { loginStyles } from "../styles/loginStyles.ts";
import TextFont from "../components/TextFont.tsx";
import { homeStyle } from "../styles/homeStyle.ts";
import TextInputComp from "../components/TextInput.tsx";
import { PressableView } from "../components/ViewTochable.tsx";
import { gray, primary } from "../styles/baseStyle.ts";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PasswordInput from "../components/loginPage/PasswordInput.tsx";

const Register:FC=()=>{
	const navigation = useNavigation()
	const [email,setEmail] = useState<string>("");
	const [name,setName] = useState<string>("")
	const [surname,setSurname] = useState<string>("")
	const [username,setUsername] = useState<string>("")
	const [birthDate,setBirthDate] = useState<Date>(new Date(Date.now()));
	const [s,setS] = useState<string>("")
	const [sVisible,setSVisible] = useState<boolean>(false);
	const [cs,setCs] = useState<string>("")
	const [csVisible,setCsVisible] = useState<boolean>(false);
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	let send = false;
	const onChangeDate = (event: any, selectedDate?: Date) => {
		setShowDatePicker(false);
		if (event.type === "set" && selectedDate) {
			setBirthDate(selectedDate);
		}
	};
	const handleRegister = () =>{
	
	}
	const handleLogin = () =>{
		navigation.navigate("Login" as never);
	}
	return(
		<View style={[homeStyle.body,loginStyles.container]}>
			<Header/>
			<View style={loginStyles.container}>
				<View style={[loginStyles.innerContainer,{height: "70%",width: "60%"}]}>
					<TextFont style={loginStyles.title}>Register</TextFont>
					<TextInputComp
						placeholder={"Email"}
						value={email}
						inputMode={"email"}
						onChange={setEmail}
					/>
					<TextInputComp
						placeholder={"Nome"}
						value={name}
						inputMode={"text"}
						onChange={setName}
					/>
					<TextInputComp
						placeholder={"Sobrenome"}
						value={surname}
						inputMode={"text"}
						onChange={setSurname}
					/>
					<TextInputComp
						placeholder={"Username"}
						value={username}
						inputMode={"text"}
						onChange={setUsername}
					/>
					<PressableView style={[loginStyles.input,{justifyContent:"center", padding:5}]} onPress={() => setShowDatePicker(true)}>
						<TextFont style={{color:"#cdcdcd",fontWeight:"100"}}>{birthDate.toDateString()}</TextFont>
					</PressableView>
					{showDatePicker && <DateTimePicker
						style={loginStyles.input}
						value={birthDate}
						mode={"date"}
						display="default"
						onChange={onChangeDate}
					/>}
					<PasswordInput password={s} isPasswordVisible={sVisible} setPassword={setS} togglePassword={()=>setSVisible(!sVisible)}/>
					<PasswordInput password={cs} isPasswordVisible={csVisible} setPassword={setCs} togglePassword={()=>setCsVisible(!csVisible)} placeholder={"Confirmar senha"}/>
					<View>
						<PressableView style={loginStyles.submitButton} onPress={handleRegister}>
							<TextFont>Submit</TextFont>
						</PressableView>
						<View style={{flexDirection:"row"}}>
							<TextFont>Já tem uma conta? </TextFont>
							<PressableView onPress={handleLogin}>
								<TextFont style={{color:primary}}>Entre aqui</TextFont>
							</PressableView>
						</View>
					</View>
					
				</View>
			</View>
		</View>
	)
}
export default Register
