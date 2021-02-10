import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    note: {
        flex: 1,
        marginTop: height * 0.025,
    },
    descriptionArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: height * 0.015,
        alignContent: 'center',
        textAlign: 'center'
    },
    dateArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.015,
        alignContent: 'center',
        textAlign: 'center',
        marginLeft: width * 0.065
    },
    datePicker: {
        marginTop: height * 0.030
    },
    iconSize: height * 0.03,
    arrowSize: height * 0.035,
    dateText: height * 0.025,
    icon: {
        marginTop: height * 0.006
    },
    input: {
        width: width * 0.75,
        fontSize: height * 0.03,
        backgroundColor: 'transparent'
    },
    inputTime: {
        width: width * 0.13,
        fontSize: height * 0.03,
        marginHorizontal: width * 0.05,
        backgroundColor: 'transparent'
    },
    helperTitle: {
        fontSize: height * 0.025, 
        textAlign: 'center'
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    }
})