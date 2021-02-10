import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: width * 0.1
  },
  errorText: {
    fontSize: height * 0.023,
    textAlign: 'center',
    color: '#840032',
    paddingTop: height * 0.02
  },
  welcome: {
    color: '#840032',
    textAlign: 'center',
    marginBottom: height * 0.03
  },
  button: {
    marginVertical: height * 0.01,
  },
  birthdayText: {
    fontSize: height * 0.03,
    backgroundColor: '#840032',
    color: 'white',
    paddingHorizontal: width * 0.025
  },
  birthdayView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: height * 0.025
  }
})