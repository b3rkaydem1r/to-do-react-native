import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: width * 0.1
  },
  errorText: {
    fontSize: height * 0.027,
    textAlign: 'center',
    color: '#9b537a',
    paddingTop: height * 0.02
  },
  welcome: {
    color: '#840032', 
    textAlign: 'center',
    marginBottom: height * 0.03
  },
  button: {
    marginVertical: height * 0.01,
  }
})