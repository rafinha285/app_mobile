import React, { ReactNode } from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
interface PressableViewProps {
    onPress: () => void; // Tipo da função de retorno de chamada onPress
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}
export const PressableView:React.FC<PressableViewProps> = ({ onPress, children, style}) => {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    );
};
