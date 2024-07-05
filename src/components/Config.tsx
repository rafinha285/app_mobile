// NÃO USAR
// NÃO USAR
// NÃO USAR
// NÃO USAR
// NÃO USAR
// NÃO USAR
// NÃO USAR
// NÃO USAR

import { FC } from "react";
import { Button, Modal, ScrollView, View } from "react-native";
import { PressableView } from "./ViewTochable.tsx";
import TextFont from "./TextFont.tsx";
import { configStyle } from "../styles/playerStyle.ts";

interface ConfigOverlayProps {
	visible: boolean;
	onClose: () => void;
	onSelectSubtitle: (index: number) => void;
	onSelectQuality: (quality: string) => void;
	subtitles: string[];
	qualities: string[];
}

const Config:FC<ConfigOverlayProps> = ({
   visible,
   onClose,
   onSelectSubtitle,
   onSelectQuality,
   subtitles,
   qualities
}) =>{
	return(
		<Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
			<ScrollView style={configStyle.overlayContainer}>
				<View style={configStyle.overlayContent}>
					<TextFont style={configStyle.title}>Configurações</TextFont>
					
					<TextFont style={configStyle.subtitle}>Selecione a Legenda:</TextFont>
					{subtitles.map((subtitle, index) => (
						<PressableView
							key={index}
							style={configStyle.subtitleButton}
							onPress={() => onSelectSubtitle(index)}
						>
							<TextFont style={configStyle.subtitleText}>{subtitle}</TextFont>
						</PressableView>
					))}
					
					<TextFont style={configStyle.subtitle}>Selecione a Qualidade:</TextFont>
					{qualities.map((quality, index) => (
						<PressableView
							key={index}
							style={configStyle.subtitleButton}
							onPress={() => onSelectQuality(quality)}
						>
							<TextFont style={configStyle.subtitleText}>{quality}</TextFont>
						</PressableView>
					))}
					
					<Button title="Fechar" onPress={onClose} />
				</View>
			</ScrollView>
		</Modal>
	)
}
export default Config
