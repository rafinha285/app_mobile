import React from "react";
import { View } from "react-native";
import { loadingStyles } from "../styles/loading.ts";
import TextFont from "./TextFont.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { white } from "../styles/baseStyle.ts";
import Spinner from "./Spinner.tsx";

const Loading: React.FC = () => {
	return(
		<View style={loadingStyles.conteiner}>
			<TextFont style={{marginBottom:30}}>Loading Anime</TextFont>
			<Spinner icon={faCircleNotch} size={25} color="white" />
		</View>
	)
}
export default Loading;
