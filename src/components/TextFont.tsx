import { FC, ReactNode } from "react";
import { Text, TextStyle } from "react-native";
import { baseStyles } from "../styles/baseStyle.ts";

interface Props {
	children: ReactNode;
	style?: TextStyle;
}
const TextFont: FC<Props> = ({style,children}) => {
	return <Text style={[baseStyles.font,style]}>{children}</Text>
}
export default TextFont;
