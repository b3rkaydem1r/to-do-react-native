import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    view: {
        flex: 1,
        marginTop: height * 0.04
    },
    innerView: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-evenly',
    },
    name: {
        fontSize: height * 0.042,
        marginVertical: height * 0.025,
        textAlign: 'center'
    },
    avatarSize: height * 0.235,
    options: {
        fontSize: height * 0.027
    },
    cameraIcon: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 45,
        height: 45,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    profileIcon: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 45,
        height: 45,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    iconSize: height * 0.04
})