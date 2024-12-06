import type { OnProgressData } from "react-native-video/src/specs/VideoNativeComponent.ts";
import React from "react";
import { VTTCaptionType } from "../types/captionType.ts";
import { Episode } from "../types/episodeType.ts";
export const removeHtmlTags = (text: string) => {
	return text.replace(/<[^>]*>/g, '');
};
export const handleProgress = (
	progress:OnProgressData,
	setCurrentSubtitles:React.Dispatch<React.SetStateAction<string[]>>,
	setCurrentTime:React.Dispatch<React.SetStateAction<number>>,
	subtitles:VTTCaptionType[],
	setIsOnIntro:React.Dispatch<React.SetStateAction<boolean>>,
	setIsOnOutro:React.Dispatch<React.SetStateAction<boolean>>,
	ep:Episode,
	eps:Map<number, Episode>
) => {
	const time = progress.currentTime;
	// console.log();
	setCurrentTime(time);
	setIsOnIntro(time >= ep.openingstart && time < ep.openingend && eps.has(ep.epindex+1));
	setIsOnOutro(time >= ep.ending);
	const activeSubtitles = subtitles.filter(subtitle =>
		time >= subtitle.startTime && time <= subtitle.endTime
	);
	setCurrentSubtitles(activeSubtitles.map(subtitle => removeHtmlTags(subtitle.text)));
};
