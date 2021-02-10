import React from 'react'
import Gallery from 'react-native-image-gallery';
import { View } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

function imageGallery({ route }) {
    const { userimage } = route.params
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <Ionicons onPress={() => navigation.goBack()} name="ios-arrow-back" size={height * 0.035} color="white" style={styles.back}></Ionicons>
            <Gallery initialPage={0}
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                    { source: { uri: 'https://www.gravatar.com/avatar/' + userimage + '?s= 900' } }
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: 'black',
        paddingTop: height * 0.02,
        paddingLeft: width * 0.035
    },
});


export default imageGallery