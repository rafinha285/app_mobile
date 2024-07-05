import React, { useState } from "react";
import { Text, View } from "react-native";
import { PressableView } from "../ViewTochable.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { white } from "../../styles/baseStyle.ts";
// import { homeStyle } from "../styles/homeStyle.ts";
import { borderWidth, heartSize, heartStyles } from "../../styles/heartStyle.ts";
// import { homeStyle } from "../styles/homeStyle.ts";


const HeartButton: React.FC = ()=>{
	const [isSelected, setIsSelected] = useState(false);
	
	const handleLike = () => {
		setIsSelected(!isSelected);
	};
	return(
		<PressableView style={[heartStyles.div,isSelected && heartStyles.selected]} onPress={handleLike}>
			<FontAwesomeIcon icon={faHeart} color={white} size={heartSize - borderWidth} />
		</PressableView>
	);
};
export default HeartButton;
