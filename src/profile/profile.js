import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { List, Avatar, Title, HelperText, Divider } from 'react-native-paper'
import { useNavigation, StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import Ionicons from "react-native-vector-icons/Ionicons"
import md5 from 'md5'
import { material } from 'react-native-typography'
import styles from './styles'


function profile({ route }) {
    const { userData } = route.params
    const navigation = useNavigation()
    const [render, renderItems] = useState(false)
    const [username, setName] = useState('')
    const [userimage, setUserImage] = useState('')

    useEffect(() => {
        if (!render) {
            renderItems(true)
            setName(userData[1])
            setUserImage(md5(userData[2])) // gravatar fotoğrafını çekmek için e-postanın md5 hash'li hali gerek.
        }
    })

    async function logOut() {
        await AsyncStorage.removeItem('@user_token')
        await AsyncStorage.removeItem('@user_id')
        await AsyncStorage.removeItem('@user_name')
        await AsyncStorage.removeItem('@user_email')
        navigation.dispatch(StackActions.replace('login'))
    }

    return (
        <View style={styles.view}>
            <View style={styles.innerView}>
                <View style={{ alignSelf: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.dispatch(StackActions.push('gallery', { userimage }))}
                        style={styles.profileImage}>
                        <Avatar.Image size={styles.avatarSize} source={{ uri: 'https://www.gravatar.com/avatar/' + userimage + '?s=300' }} />
                    </TouchableOpacity>

                    <View style={styles.cameraIcon}>
                        <Ionicons onPress={() => ToastAndroid.show('Profil fotoğrafınızı Gravatar üzerinden değiştirebilirsiniz.', ToastAndroid.SHORT)} name="camera-outline" size={styles.iconSize} color="#EB4165" style={{ marginBottom: 2 }}/>
                    </View>

                    <View style={styles.profileIcon}>
                        <Ionicons onPress={() => ToastAndroid.show('Henüz mevcut değil.', ToastAndroid.SHORT)} name="create-outline" size={styles.iconSize} color="#235789" style={{ marginLeft: 0, marginBottom: 3 }}/>
                    </View>
                </View>
                <Text style={styles.name}>{username}</Text>
            </View>
            <Divider />
            <List.Item
                title={'Şifremi Değiştir'}
                titleStyle={material.headline, styles.options}
                onPress={() => navigation.navigate('change-password')}
                left={props => <List.Icon {...props} icon='lock' />}
            />
            <List.Item
                title={'Çıkış Yap'}
                titleStyle={material.headline, styles.options}
                onPress={() => logOut()}
                left={props => <List.Icon {...props} icon='logout-variant' />}
            />
        </View>
    )
}

export default profile