import React, { useEffect, useRef } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Animated, StyleProp, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface SpinnerProps {
	icon: IconProp;
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
}

const Spinner: React.FC<SpinnerProps> = ({ icon, size = 25, color = 'black', style }) => {
	const rotation = useRef(new Animated.Value(0)).current;
	
	useEffect(() => {
		Animated.loop(
			Animated.timing(rotation, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			})
		).start();
	}, []);
	
	const spin = rotation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});
	
	return (
		<Animated.View style={[style, { transform: [{ rotate: spin }] }]}>
			<FontAwesomeIcon icon={icon} size={size} color={color} />
		</Animated.View>
	);
};
export default Spinner;
