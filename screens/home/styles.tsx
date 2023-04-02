import { StyleSheet } from "react-native";
import { moderateScale } from "../../components/responsive";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#424549'
    },
    title: {
        fontSize: moderateScale (20),
        fontWeight: 'bold',
    },
    video: {
        position: 'absolute',
        // aspectRatio: 1,
        height: "70%",
        width: "95%",
        borderRadius: 15,
        bottom:"5%"
    },
    video_container: {
        height: '45%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    label: {
        fontSize: moderateScale (14),
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15,
        textDecorationLine: 'underline'
    },
    feed: {
        marginLeft: 15,
    },
    img: {
        borderRadius: 10,
        width: moderateScale (130),
        height: moderateScale (120),
    },
    feed_title: {
        fontSize: moderateScale (12),
        fontWeight: 'bold',
        color: 'white',
        width:0,
        flexGrow: 1,
        flex: 1,
    },
    labelWrapper:{
        flexDirection: 'row',
    }
});

export default styles;