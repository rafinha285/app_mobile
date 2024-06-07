import React, { ReactNode } from "react"
import { TouchableOpacity } from "react-native";
interface PressableViewProps {
    onPress: () => void; // Tipo da função de retorno de chamada onPress
    children: ReactNode;
}
export const PressableView:React.FC<PressableViewProps> = ({ onPress, children }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
};