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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: height * 0.01,
        marginLeft: width * 0.065
    },
    dateAreas: {
        marginVertical: height * 0.01,
    },
    iconSize: height * 0.03,
    dateText: height * 0.025,
    descriptionText: {
        fontSize: height * 0.03,
        marginLeft: width * 0.06,
        marginRight: width * 0.05
    },
    icon: {
        marginTop: height * 0.006
    },
    input: {
        width: width * 0.75,
        fontSize: height * 0.03,
        backgroundColor: 'transparent'
    },
    helperTitle: {
        fontSize: height * 0.025, 
        textAlign: 'center'
    }
})