import { Dimensions, StyleSheet } from "react-native";
import { moderateScale } from "../../components/responsive";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      zIndex: 1000,
    },
    title: {
      fontSize: moderateScale (15),
      fontWeight: 'bold',
      backgroundColor: 'white',
      width: '80%',
      padding: 10,
      borderTopRightRadius: 10
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
      marginBottom: 10
    },
    image: {
      width: "90%",
      height: Dimensions.get('window').height * 0.25,
      resizeMode: "cover",
      marginTop: 30,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      width: '90%',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
    },
    author: {
      fontSize: moderateScale (9.5),
    },
    authorContainer: {
      width: '90%',
    },
    content: {
      fontSize: moderateScale (12),
      backgroundColor: 'white',
    },
    scrollView: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%'
    }
});

export default styles;