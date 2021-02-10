import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { FAB, Appbar, Snackbar, List, Title, ActivityIndicator } from 'react-native-paper'
import { useNavigation, StackActions } from '@react-navigation/native'
import { material } from 'react-native-typography'
import { axiosInstance as api } from '../utils/server'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotification from "react-native-push-notification"
import styles from './styles'


function Home() {
    const navigation = useNavigation()
    const [render, renderItems] = useState(false)
    const [reminders, setReminders] = useState([])
    const [activeSnackbar, setSnackbarActived] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [indicatorStatus, setIndicatorStatus] = useState(true)
    const [userData, setUserData] = useState([])

    PushNotification.createChannel(
        {
            channelId: "default-channel-id", // (required)
            channelName: `Default channel`, // (required)
            vibrate: false,
        })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            allReminders()
        })
    }, [navigation])

    function completeReminder(id) {
        setSnackbarText('Tamamlandı olarak işaretlendi.')
        PushNotification.cancelLocalNotifications({ id: parseInt(id) })
        api.put('api/complete-reminder/' + id).then(response => {
            if (response.data.status) {
                setSnackbarActived(!activeSnackbar)
                allReminders()
            }
        })
    }

    function deleteReminder(id) {
        setSnackbarText('Not silindi.')
        api.delete('api/reminder/' + id).then(response => {
            if (response.data.status) {
                setSnackbarActived(!activeSnackbar)
                allReminders()
            }
        })
    }

    function allReminders() {
        api.get('api/reminders').then(response => {
            if (response.data.status) {
                setReminders(response.data.reminders)
                renderItems(true)
                setIndicatorStatus(false)
            }
        })
    }

    async function getUserData() {
        const id = await AsyncStorage.getItem('@user_id')
        const name = await AsyncStorage.getItem('@user_name')
        const email = await AsyncStorage.getItem('@user_email')
        setUserData([id, name, email])
    }

    useEffect(() => {
        if (!render) {
            renderItems(true)
            allReminders()
            getUserData()
        }
    })

    const renderReminders = ({ item }) => {
        if (item.type) {
            if (new Date() < new Date(item.date) && !(item.completed)) {
                var dateOfReminder = new Date(item.date)
                var itemDate = (dateOfReminder.getDate().toString().length == 1 ? '0' + dateOfReminder.getDate() : dateOfReminder.getDate()) + '-' + ((dateOfReminder.getMonth() + 1).toString().length == 1 ? '0' + dateOfReminder.getMonth() : dateOfReminder.getMonth()) + '-' + dateOfReminder.getFullYear() + ' ' + dateOfReminder.getHours() + ':' + dateOfReminder.getMinutes()
                return (
                    <List.Item
                        title={item.title}
                        titleStyle={material.headline, styles.reminder}
                        description={item.description ? item.description : itemDate}
                        onPress={() => navigation.dispatch(StackActions.push('view', { item }))}
                        left={props => <List.Icon {...props} icon={'calendar'} />}
                        right={props => <TouchableOpacity onPress={() => completeReminder(item._id)}>
                            <List.Icon {...props} icon='check' />
                        </TouchableOpacity>}
                    />
                )
            }
        } else {
            if (!(item.completed)) {
                return (
                    <List.Item
                        title={item.title}
                        titleStyle={material.headline, styles.reminder}
                        description={item.description ? item.description : null}
                        onPress={() => navigation.dispatch(StackActions.push('view', { item }))}
                        left={props => <List.Icon {...props} icon={'calendar-text-outline'} />}
                        right={props => <TouchableOpacity onPress={() => completeReminder(item._id)}>
                            <List.Icon {...props} icon='check' />
                        </TouchableOpacity>}
                    />
                )
            }
        }
    }

    const renderCompleteds = ({ item }) => {
        if (item.type) {
            if (item.completed || new Date() > new Date(item.date)) {
                return (
                    <List.Item
                        title={item.title}
                        titleStyle={[styles.reminderCompleted, material.headline]}
                        description='Tamamlandı'
                        onPress={() => console.log()} //
                        left={props => <List.Icon {...props} icon='check' color='#4F646F' />}
                        right={props => <TouchableOpacity onPress={() => deleteReminder(item._id)}>
                            <List.Icon {...props} icon='delete-outline' />
                        </TouchableOpacity>}
                    />
                )
            }
        } else {
            if (item.completed) {
                return (
                    <List.Item
                        title={item.title}
                        titleStyle={[styles.reminderCompleted, material.headline]}
                        description='Tamamlandı'
                        onPress={() => console.log()} //
                        left={props => <List.Icon {...props} icon='check' color='#4F646F' />}
                        right={props => <TouchableOpacity onPress={() => deleteReminder(item._id)}>
                            <List.Icon {...props} icon='delete-outline' />
                        </TouchableOpacity>}
                    />
                )
            }
        }
    }


    return (
        <View style={styles.view}>
            <ActivityIndicator style={styles.loading} animating={indicatorStatus} color='#EB4165' />
            <ScrollView style={styles.scrollView}>
                <View style={{ marginVertical: 5 }}>
                    <View style={styles.toDoList}>
                        <Title style={styles.title}>Yapılacaklar</Title>
                    </View>
                    <FlatList
                        data={reminders}
                        renderItem={renderReminders}
                        numColumns={1}
                        keyExtractor={item => item._id} />
                </View>

                {reminders.length == 0 ?
                    <TouchableOpacity onPress={() => navigation.navigate('new')}>
                        <Text style={styles.addNote}>Henüz bir notunuz yok. Not ekleyin.</Text>
                    </TouchableOpacity>
                    : null}

                {
                    reminders.length > 0 ?
                        <View style={{ marginVertical: 5 }}>
                            <Title style={styles.title}>Tamamlananlar</Title>
                            <FlatList
                                data={reminders}
                                renderItem={renderCompleteds}
                                numColumns={1}
                                keyExtractor={item => item._id} />
                        </View> : null
                }
            </ScrollView>
            <View style={styles.bottom}>
                <Appbar style={{ backgroundColor: '#840032' }}>
                    <Appbar.Action
                        icon="account"
                        onPress={() => navigation.dispatch(StackActions.push('profile', { userData }))}
                    />
                </Appbar>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => navigation.navigate('new')}
                />
            </View>
            <Snackbar
                visible={activeSnackbar}
                onDismiss={() => setSnackbarActived(false)}
                duration={2000}>
                {snackbarText}
            </Snackbar>
        </View>
    )
}


export default Home