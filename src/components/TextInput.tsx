import { FC } from "react";
import { InputModeOptions, TextInput } from "react-native";
import { loginStyles } from "../styles/loginStyles.ts";

interface Props {
	placeholder: string,
	value: string,
	inputMode: InputModeOptions,
	// textContentType: string,
	onChange: (value: any) => void,
	
}

const TextInputComp: FC<Props> = ({ placeholder, value, inputMode, onChange }) => {
	return (
		<TextInput
			style={loginStyles.input}
			value={value}
			placeholder={placeholder}
			inputMode={inputMode}
			// textContentType={"name"}
			onChangeText={onChange}
		/>
	);
};
export default TextInputComp;
