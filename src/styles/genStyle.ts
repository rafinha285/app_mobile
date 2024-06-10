import { white } from "./baseStyle.ts";
import { StyleSheet } from "react-native"

export const genStyles = StyleSheet.create({
	container: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: '100%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: white,
		padding:5,
		marginHorizontal:3,
	}
});
