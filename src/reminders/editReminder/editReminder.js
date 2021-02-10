import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Appbar, TextInput, HelperText } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { axiosInstance as api } from '../../utils/server'
import styles from './styles'

function editReminder({ route }) {
    const navigation = useNavigation()
    const { item } = route.params
    const [title, setTitle] = useState('')
    const [render, renderItems] = useState(false)
    const [itemDate, setItemDate] = useState(false)
    const [itemTime, setItemTime] = useState(false)
    const [description, setDescription] = useState('')
    const descriptionInput = useRef(null)

    useEffect(() => {
        if (!render) {
            renderItems(true)
            setTitle(item.title)
            setDescription(item.description)
            var dateOfReminder = new Date(item.date)
            setItemDate((dateOfReminder.getDate().toString().length == 1 ? '0' + dateOfReminder.getDate() : dateOfReminder.getDate()) + '-' + ((dateOfReminder.getMonth() + 1).toString().length == 1 ? '0' + dateOfReminder.getMonth() : dateOfReminder.getMonth()) + '-' + dateOfReminder.getFullYear())
            setItemTime(dateOfReminder.getHours() + ':' + dateOfReminder.getMinutes())
        }
    })

    function editReminder() {
        if (title.length < 51 && description.length < 321) {
            api.put('api/edit-reminder/' + item._id, { title, description }).then(response => {
                if (response.data.status) {
                    navigation.navigate('home')
                }
            })
        }
    }

    const hasErrors = () => {
        return title.length == 50 ? true : false
    }

    const descriptionError = () => {
        return description.length == 320 ? true : false
    }
    return (
        <View>
            <Appbar style={{ backgroundColor: '#F2F2F2' }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color="black" />
                <Appbar.Content title='Notu Düzenle' />
                <Appbar.Action
                    icon="content-save"
                    onPress={() => editReminder()}
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
                        item.type ?
                            <View style={styles.dateAreas}>
                                <View style={styles.dateArea}>
                                    <MaterialCommunityIcons name="calendar-range" size={styles.iconSize} style={styles.icon} />
                                    <Text style={styles.descriptionText}>
                                        {itemDate}
                                    </Text>
                                </View>
                                <View style={styles.dateArea}>
                                    <MaterialCommunityIcons name="alarm" size={styles.iconSize} style={styles.icon} />
                                    <Text style={styles.descriptionText}>
                                        {itemTime}
                                    </Text>
                                </View>
                            </View> : null
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default editReminder