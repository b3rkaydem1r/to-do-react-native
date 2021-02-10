import React, { useState, useRef } from 'react'
import { Text, View, ToastAndroid } from 'react-native'
import { HelperText } from 'react-native-paper'
import { iOSUIKit } from 'react-native-typography'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Jiro } from 'react-native-textinput-effects'
import styles from './styles'


function changePassword() {
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const passwordInput = useRef(null)
    const newPasswordInput = useRef(null)
    const navigation = useNavigation()

    function checkPassword() {
        if (password1 == password2) {
            return false
        } else {
            if (password2.length != 0) {
                return true
            } else {
                return false
            }
        }
    }

    return (
        <View style={styles.view}>

            <Text style={[iOSUIKit.largeTitleEmphasized, styles.welcome]}>Şifremi Değiştir</Text>

            <Jiro
                label='mevcut şifreniz'
                borderColor={'#840032'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
                value={password}
                onChangeText={password => setPassword(password)}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={true}
                onSubmitEditing={() => passwordInput.current.focus()}
                maxLength={20}
            />

            <Jiro
                label='yeni şifreniz'
                borderColor={'#840032'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
                value={password1}
                onChangeText={password => setPassword1(password)}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={true}
                onSubmitEditing={() => newPasswordInput.current.focus()}
                ref={passwordInput}
                maxLength={20}
            />

            <Jiro
                label='tekrar | yeni şifreniz'
                borderColor={'#840032'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
                value={password2}
                onChangeText={password => setPassword2(password)}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={true}
                // onSubmitEditing={() => navigation.goBack()}
                ref={newPasswordInput}
                maxLength={20}
            />

            <HelperText type="error" visible={checkPassword()} style={styles.errorText}>
                Şifreler uyuşmuyor.
            </HelperText>

            <Button icon="lock" mode="contained" color="#840032" onPress={() => ToastAndroid.show('Henüz mevcut değil.', ToastAndroid.SHORT)} style={styles.button}>
                Güncelle
            </Button>
            <Button icon="lock-question" mode="outlined" color="#840032" onPress={() => ToastAndroid.show('Henüz mevcut değil.', ToastAndroid.SHORT)} style={styles.button}>
                Şifremi Unuttum
            </Button>

        </View>
    )
}

export default changePassword