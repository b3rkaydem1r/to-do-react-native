import React, { useState, useEffect, useRef } from 'react'
import { Text } from 'react-native'
import { HelperText } from 'react-native-paper'
import { iOSUIKit } from 'react-native-typography'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation, StackActions } from '@react-navigation/native'
import { Jiro } from 'react-native-textinput-effects'
import { axiosInstance as api } from '../../utils/server'
import styles from './styles'


function login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const passwordInput = useRef(null)
    const navigation = useNavigation()

    async function login() {
        if (email && password) {
            if (!checkEmail()) {
                setError('e posta adresiniz geçersiz')
            } else if (password.length < 6) {
                setError('şifreniz 6 karakterden küçük olamaz')
            }
            else {
                setError(false)
                try {
                    const response = await api.post('login', {
                        email,
                        password
                    })
                    const payload = await response.data
                    if (payload.status) {
                        await AsyncStorage.setItem('@user_token', payload.token)
                        await AsyncStorage.setItem('@user_id', payload.id)
                        await AsyncStorage.setItem('@user_name', payload.name)
                        await AsyncStorage.setItem('@user_email', email)
                        navigation.dispatch(StackActions.replace('home'))
                    } else {
                        setError(payload.message)
                    }
                } catch (error) {
                    setError('bir hata oluştu')
                    console.log(error)
                }
            }
        } else {
            if (!email) {
                setError('e posta boş olamaz')
            } else {
                setError('şifre boş olamaz')
            }
        }
    }

    function register() {
        navigation.dispatch(StackActions.push('register', {
            login_email: email,
            login_password: password
        }))
    }

    function checkEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(email)) {
            return true
        } else {
            return false
        }
    }

    return (
        <View style={styles.view}>

            <Text style={[iOSUIKit.largeTitleEmphasized, styles.welcome]}>Hatırlatıcım</Text>

            <Jiro
                label='e-posta adresiniz'
                borderColor={'#840032'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
                value={email}
                onChangeText={email => setEmail(email)}
                keyboardType="email-address"
                autoCompleteType="email"
                textContentType="emailAddress"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInput.current.focus()}
                maxLength={30}
            />

            <Jiro
                label='şifreniz'
                borderColor={'#840032'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
                value={password}
                onChangeText={password => setPassword(password)}
                textContentType='password'
                autoCompleteType='password'
                secureTextEntry={true}
                onSubmitEditing={() => login()}
                ref={passwordInput}
                maxLength={20}
            />

            <HelperText type="error" visible={error} style={styles.errorText}>
                {error}
            </HelperText>

            <Button icon="login-variant" mode="contained" color="#840032" onPress={() => login()} style={styles.button}>
                Giriş Yap
            </Button>
            <Button icon="account-plus" mode="outlined" color="#840032" onPress={() => register()} style={styles.button}>
                Kayıt Ol
            </Button>

        </View>
    )
}

export default login