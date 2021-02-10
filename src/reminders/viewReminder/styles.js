import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    note: {
        flex: 1,
        marginTop: height * 0.025,
        marginHorizontal: width * 0.07
    },
    descriptionText: {
        fontSize: height * 0.03,
        marginLeft: width * 0.02,
        marginRight: width * 0.05
    },
    descriptionArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: height * 0.01
    },
    title: {
        fontSize: height * 0.04,
        marginBottom: height * 0.01
    },
    iconSize: height * 0.03,
    icon: {
        marginTop: height * 0.0065
    },
    errorText: {
        fontSize: height * 0.023,
        textAlign: 'center',
        paddingTop: height * 0.02,
    }
})