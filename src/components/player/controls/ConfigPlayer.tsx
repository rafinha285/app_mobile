import { ScrollView, View } from "react-native";
import { white } from "../../../styles/baseStyle.ts";
import { configPlayerStyle } from "../../../styles/playerStyle.ts";
import { PressableView } from "../../ViewTochable.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import TextFont from "../../TextFont.tsx";
import { Picker } from "@react-native-picker/picker";

interface Props {
	style?: any;
	pressed:boolean;
	setPressed: React.Dispatch<React.SetStateAction<boolean>>;
	qualitys:string[];
	quality:'1080'|'720'|'480';
	setQuality:React.Dispatch<React.SetStateAction<'1080'|'720'|'480'>>;
	setSelectedCaption:(value:string) => void;
	selectedCaptions:string;
	captions:string[];
	getCaptions:(selectedCaptionUrl:string)=>Promise<void>;
}
const ConfigPlayer:React.FC<Props> = ({
		pressed,
		setPressed,
		quality,
		qualitys,
		setQuality,
		captions,
		selectedCaptions,
	    setSelectedCaption,
		getCaptions,
	}) =>{
	// const [pressed,setPressed] = useState<boolean>(false);
	// console.log(qualitys+' gay')
	return <View style={[configPlayerStyle.container,{display:pressed?"none":'flex'}]}>
		<ScrollView style={configPlayerStyle.innerContainer} contentContainerStyle={configPlayerStyle.innerContainerContainer}>
			<PressableView style={{right:0,top:0}} onPress={()=>setPressed(!pressed)}>
				<FontAwesomeIcon icon={faX} size={20} color="white"/>
			</PressableView>
			<TextFont>Qualidade: </TextFont>
			<Picker style={{
				color:white,
				borderColor:white,
				borderWidth: 1,
			}} onValueChange={(v:'1080'|'720'|'480')=>{setQuality(v);}} selectedValue={quality}>
				{qualitys.map((v, i)=> (
					<Picker.Item label={`${v.split('x')[1]}P`} value={v} key={i}/>
				))}
			</Picker>
			{captions ? (
				<>
					<TextFont>Legenda: </TextFont>
					<Picker style={{
						color:white,
						borderColor:white,
						borderWidth:1
					}} onValueChange={(v:any)=>{
						console.log(v);
						getCaptions(v)
						setSelectedCaption(v);
						
					}} selectedValue={selectedCaptions}>
						{captions.map((v, i)=> (
							<Picker.Item label={v} value={v} key={i}/>
						))}
					</Picker>
				</>
			) : <></>}
		</ScrollView>
	</View>
}
export default ConfigPlayer;
