import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import { Appbar, TextInput, HelperText, Switch } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { axiosInstance as api } from '../../utils/server'
import DatePicker from 'react-native-datepicker'
import PushNotification from "react-native-push-notification"
import styles from './styles'

function newReminder() {
    const navigation = useNavigation()
    const [title, setTitle] = useState('')
    const [render, renderItems] = useState(false)
    const [description, setDescription] = useState('')
    const what_time = new Date()
    const [date, setDate] = useState(what_time.getFullYear() + '-' + (what_time.getMonth().toString().length && what_time.getMonth() != 9 ? ('0') + (what_time.getMonth() + 1) : what_time.getMonth() + 1) + '-' + (what_time.getDate().toString().length == 1 ? '0' + what_time.getDate() : what_time.getDate()))
    // date getmonth ay index olarak dönüyor +1 ile doğru ayrı buluyoruz. date tipine dönüştürmek için tek haneli olan ay ve günlerin başına 0 ekliyoruz. 9 ay indexi 10. ay demek kontrol bu yüzden.
    const [hour, setHour] = useState()
    const [minute, setMinute] = useState()
    const [isSwitchOn, setIsSwitchOn] = useState(true)
    const descriptionInput = useRef(null)

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    function createNotification(dateOfReminder, id) {
        PushNotification.localNotificationSchedule({
            id: parseInt(id),
            channelId: 'default-channel-id',
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            color: '#FFBB00', // (optional) default: system default
            groupSummary: true, // (optional) set this notification to be the group summary for a group of notifications, default: false
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
            title: title, // (optional)
            message: description ? description : (dateOfReminder.getDate().toString().length == 1 ? '0' + dateOfReminder.getDate() : dateOfReminder.getDate()) + '-' + ((dateOfReminder.getMonth() + 1).toString().length == 1 ? '0' + dateOfReminder.getMonth() : dateOfReminder.getMonth()) + '-' + dateOfReminder.getFullYear() + ' ' + dateOfReminder.getHours() + ':' + dateOfReminder.getMinutes(), // (required)
            userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: false,
            date: dateOfReminder
        })
    }

    useEffect(() => {
        if (!render) {
            renderItems(1)
            setHour(what_time.getHours().toString())
            setMinute(what_time.getMinutes().toString())
        }
    })

    const hasErrors = () => {
        return title.length == 50 ? true : false
    }

    const descriptionError = () => {
        return description.length == 320 ? true : false
    }

    function checkHour(text) {
        if (text > 23 || text < 0) {
            setHour('00')
        } else {
            setHour(text)
        }
    }


    function createReminder() {
        if (isSwitchOn) {
            var dateOfReminder = new Date(date + 'T' + hour + ':' + minute + ':00Z')
            dateOfReminder = new Date(dateOfReminder.getTime() - 3 * 3600000) // gtm+3 sebebiyle notification saatine göre gtm+0'a çeviriyoruz.
            if (dateOfReminder.toString() == 'Invalid Date') {
                if (hour.length == 1) {
                    var x_hour = '0' + hour // saat tek haneli seçilirse 0 ekliyoruz.
                } else {
                    x_hour = hour
                }
                if (minute.length == 1) {
                    var x_minute = '0' + minute // dakika tek haneli seçilirse 0 ekliyoruz.
                }
                else {
                    x_minute = minute
                }
                dateOfReminder = new Date(date + 'T' + x_hour + ':' + x_minute + ':00Z')
                dateOfReminder = new Date(dateOfReminder.getTime() - 3 * 3600000)
            }
            if (title && new Date() < dateOfReminder) {
                api.post('api/create-reminder', {
                    title,
                    description,
                    completed: false,
                    type: isSwitchOn,
                    date: dateOfReminder,
                }).then(response => {
                    if (response.data.status == false) {
                        ToastAndroid.show('İşlem sırasında bir hata oluştu', ToastAndroid.LONG)
                    } else {
                        createNotification(dateOfReminder, response.data.id)
                        ToastAndroid.show('Hatırlatıcı eklendi.', ToastAndroid.SHORT)
                        navigation.goBack()
                    }
                })
            } else {
                ToastAndroid.show('Başlığın dolu olduğundan ve tarihin geçmiş olmadığından emin olun.', ToastAndroid.SHORT)
            }
        } else {
            if (title) {
                api.post('api/create-reminder', {
                    title,
                    description,
                    completed: false,
                    type: isSwitchOn
                }).then(response => {
                    if (response.data.status == false) {
                        ToastAndroid.show('İşlem sırasında bir hata oluştu', ToastAndroid.LONG)
                    } else {
                        ToastAndroid.show('Not eklendi.', ToastAndroid.SHORT)
                        navigation.goBack()
                    }
                })
            } else {
                ToastAndroid.show('Başlığın dolu olduğundan emin olun.', ToastAndroid.SHORT)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar style={{ backgroundColor: '#F2F2F2' }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color="black" />
                <Appbar.Content title='Yeni Not' />
                <Appbar.Action
                    icon="check"
                    onPress={() => createReminder()}
                />
            </Appbar>
            <ScrollView>
                <View style={styles.note}>
                    <View>
                        <HelperText type={hasErrors() ? "error" : "info"} visible={true} style={styles.helperTitle}>
                            {hasErrors() ? 'Başlık 50 karakterden fazla olamaz.' : 'Not Başlığı'}
                        </HelperText>
                        <View style={styles.descriptionArea}>
                            <MaterialCommunityIcons name={'calendar'} size={styles.iconSize} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={title}
                                underlineColor="#840032"
                                theme={{ colors: { primary: '#840032' } }}
                                onChangeText={text => setTitle(text)}
                                onSubmitEditing={() => descriptionInput.current.focus()}
                                blurOnSubmit={false}
                                maxLength={50}
                            />
                        </View>
                    </View>
                    <View>
                        <HelperText type={descriptionError() ? "error" : "info"} visible={true} style={styles.helperTitle}>
                            {descriptionError() ? 'Ayrıntılar 320 karakterden fazla olamaz.' : 'Ayrıntılar'}
                        </HelperText>
                        <View style={styles.descriptionArea}>
                            <MaterialCommunityIcons name="format-list-text" size={styles.iconSize} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={description}
                                multiline={true}
                                underlineColor="#840032"
                                theme={{ colors: { primary: '#840032' } }}
                                onChangeText={text => setDescription(text)}
                                blurOnSubmit={false}
                                ref={descriptionInput}
                                maxLength={320}
                            />
                        </View>
                    </View>
                    {
                        isSwitchOn ? <>
                            <View style={[styles.dateArea, styles.datePicker]}>
                                <MaterialCommunityIcons name="calendar-range" size={styles.iconSize} style={styles.icon} />
                                <DatePicker
                                    date={date}
                                    mode="date"
                                    placeholder="select date"
                                    androidMode="spinner"
                                    format="YYYY-MM-DD"
                                    minDate={date}
                                    maxDate="2099-01-01"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            left: 0
                                        },
                                        dateText: {
                                            fontSize: styles.dateText,

                                        }
                                    }}
                                    onDateChange={(date) => setDate(date)}
                                />
                            </View>
                            <View style={styles.dateArea}>
                                <MaterialCommunityIcons name="alarm" size={styles.iconSize} style={styles.icon} />
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialCommunityIcons onPress={() => hour < 23 ? setHour((parseInt(hour) + 1).toString()) : null} name={'chevron-up'} size={styles.arrowSize} style={styles.icon} />
                                    <TextInput
                                        style={styles.inputTime}
                                        value={hour}
                                        keyboardType='numeric'
                                        underlineColor="#840032"
                                        theme={{ colors: { primary: '#840032' } }}
                                        onChangeText={text => checkHour(text)}
                                        blurOnSubmit={false}
                                        maxLength={2}
                                    />
                                    <MaterialCommunityIcons onPress={() => hour > 0 ? setHour((parseInt(hour) - 1).toString()) : null} name={'chevron-down'} size={styles.arrowSize} style={styles.icon} />
                                </View>
                                <Text>:</Text>
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialCommunityIcons onPress={() => minute < 59 ? setMinute((parseInt(minute) + 1).toString()) : null} name={'chevron-up'} size={styles.arrowSize} style={styles.icon} />
                                    <TextInput
                                        style={styles.inputTime}
                                        value={minute}
                                        underlineColor="#840032"
                                        theme={{ colors: { primary: '#840032' } }}
                                        onChangeText={text => setMinute(text > 59 ? '59' : text)}
                                        blurOnSubmit={false}
                                        maxLength={2}
                                    />
                                    <MaterialCommunityIcons onPress={() => minute > 0 ? setMinute((parseInt(minute) - 1).toString()) : null} name={'chevron-down'} size={styles.arrowSize} style={styles.icon} />
                                </View>
                            </View>
                        </> : null
                    }
                </View>
            </ScrollView>

            <View style={styles.bottom}>
                <Appbar style={{ backgroundColor: '#840032' }}>
                    <Appbar.Action icon={isSwitchOn ? "calendar" : "calendar-text-outline"} />
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={'#FFBB00'} />
                    {/* <Text style={{ color: 'white' }}>{isSwitchOn ? 'Hatırlatıcı' : 'Not'}</Text> */}
                </Appbar>
            </View>

        </View>
    )
}

export default newReminder