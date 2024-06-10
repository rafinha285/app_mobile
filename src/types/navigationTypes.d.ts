import type {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { anime } from "./anime";


export type RootStackParamList = {
	Home: undefined;
	Anime:NavigatorScreenParams<AnimeScreenParams>
	AnimeLancamentos:undefined
};
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type AnimeScreenParams = {
	animePage:string
}

export type AnimeTabScreenProps<T extends keyof AnimeScreenParams> =
	CompositeScreenProps<
		BottomTabScreenProps<AnimeScreenParams,T>,
		RootStackScreenProps<keyof RootStackParamList>
	>

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

// export type AnimeTabParamList = {
// 	Popular: undefined;
// 	Latest: undefined;
// };
