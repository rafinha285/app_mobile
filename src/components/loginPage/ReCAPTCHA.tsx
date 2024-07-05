import { FC, useRef } from "react";
import Recaptcha, { RecaptchaRef } from "react-native-recaptcha-that-works";
import { recaptchaSiteKey } from "../../consts.ts";
import { Button, View } from "react-native";

const ReCAPTCHA:FC = () =>{
	const recaptchaRef = useRef<RecaptchaRef>();
	const onVerify = (token:string) =>{
	
	}
	const onExpire = () =>{
		console.log('reCAPTCHA expired');
	}
	return(
		<View style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<Recaptcha
				siteKey={recaptchaSiteKey}
				baseUrl={"http://192.168.18.20"}
				onVerify={onVerify}
				onExpire={onExpire}
				size={"normal"}
				theme="dark"
			/>
			<Button title="Verify" onPress={() => recaptchaRef.current!.open()} />
		</View>
	)
}
export default ReCAPTCHA
