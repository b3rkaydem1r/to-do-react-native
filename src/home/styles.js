import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    view: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#FFBB00',
        // margin: width * 0.05,
        marginBottom: height * 0.032,
        marginRight: width * 0.05,
        right: 0,
        bottom: 0,
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    scrollView:{
        marginBottom: height * 0.07
    },
    listItemRight: {
        color: 'gray',
        textAlignVertical: 'center',
        marginRight: width * 0.05,
        textDecorationLine: 'underline',
    },
    title:{
        textAlign: 'center', 
        fontSize: 25,
        marginTop: height * 0.02,
    },
    reminder: {
        fontSize: height * 0.031,
        fontWeight: '700'
    },
    reminderCompleted: {
        fontSize: height * 0.03,
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    },
    errorText: {
        fontSize: height * 0.027,
        textAlign: 'center',
        color: '#9b537a',
        paddingTop: height * 0.02
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addNote: {
        fontSize: height * 0.025,
        textAlign: 'center',
        marginTop: height * 0.05
    },
    toDoList:{ 
        flex: 1, 
        flexDirection: 'row', 
        alignContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center' 
    }
})