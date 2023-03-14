import { Dimensions, Platform, PixelRatio } from 'react-native';
import react, {useEffect} from 'react';
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
} = Dimensions.get('window');

// based on iphone 5s's scale
const scaleFont = SCREEN_WIDTH / 320;

const responsiveFont = (size: number) => {
    const responsiveSize = size * scaleFont;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(responsiveSize)) + 4
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(responsiveSize)) - 4
    }
}

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => SCREEN_WIDTH / guidelineBaseWidth * size;
const verticalScale = (size: number)  => SCREEN_HEIGHT / guidelineBaseHeight * size;
const moderateScale = (size: number, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {
    scale,
    verticalScale,
    moderateScale,
    responsiveFont
};