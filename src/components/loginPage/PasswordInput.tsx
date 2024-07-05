import { loginStyles } from "../../styles/loginStyles.ts";
import { TextInput, View } from "react-native";
import { PressableView } from "../ViewTochable.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { white } from "../../styles/baseStyle.ts";

interface PasswordInputProps {
	password:string|undefined;
	isPasswordVisible:boolean;
	setPassword:(value:string) => void;
	togglePassword:()=>void;
	placeholder?:string;
}

const PasswordInput:React.FC<PasswordInputProps> = ({password,isPasswordVisible,setPassword,togglePassword,placeholder="Senha"}) =>{
	return (
		<View style={loginStyles.passwordContainer}>
			<TextInput
				style={loginStyles.input}
				value={password}
				placeholder={placeholder}
				textContentType={"password"}
				secureTextEntry={!isPasswordVisible}
				onChangeText={(e)=>setPassword(e)}
			/>
			<PressableView onPress={togglePassword}>
				<FontAwesomeIcon icon={faEye} color={white} style={loginStyles.eyeIcon}/>
			</PressableView>
		</View>
	)
}
export default PasswordInput;
