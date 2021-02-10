import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useNavigation, StackActions } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { axiosInstance as api } from '../../utils/server'
import styles from './styles'

function viewReminder({ route }) {
    const navigation = useNavigation()
    const [render, renderItems] = useState(false)
    const [itemDate, setItemDate] = useState(false)
    const [itemTime, setItemTime] = useState(false)
    const { item } = route.params

    useEffect(() => {
        if (!render) {
            renderItems(1)
            var dateOfReminder = new Date(item.date)
            setItemDate((dateOfReminder.getDate().toString().length == 1 ? '0' + dateOfReminder.getDate() : dateOfReminder.getDate()) + '-' + ((dateOfReminder.getMonth() + 1).toString().length == 1 ? '0' + dateOfReminder.getMonth() : dateOfReminder.getMonth()) + '-' + dateOfReminder.getFullYear())
            setItemTime(dateOfReminder.getHours() + ':' + dateOfReminder.getMinutes())
        }
    })

    function completeReminder() {
        api.put('api/complete-reminder/' + item._id).then(response => {
            if (response.data.status) {
                navigation.goBack()
            }
        })
    }

    return (
        <View>
            <Appbar style={{ backgroundColor: '#F2F2F2' }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color="black" />
                <Appbar.Content title='Not detayları' />
                {
                    item.completed ?
                        <Appbar.Action
                            icon="delete-outline"
                            onPress={() => navigation.dispatch(StackActions.push('edit', { item }))}
                        />
                        :
                        <View style={{ flexDirection: 'row' }}>
                            <Appbar.Action
                                icon="pencil"
                                onPress={() => navigation.dispatch(StackActions.push('edit', { item }))}
                            />
                            <Appbar.Action
                                icon="check"
                                onPress={() => completeReminder()}
                            />
                        </View>
                }
            </Appbar>

            <ScrollView>
                <View style={styles.note}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    {
                        item.description ?
                            <View style={styles.descriptionArea}>
                                <MaterialCommunityIcons name="format-list-text" size={styles.iconSize} style={styles.icon} />
                                <Text style={styles.descriptionText}>
                                    {item.description}
                                </Text>
                            </View> : null
                    }
                    {
                        item.type ?
                            <>
                                <View style={styles.descriptionArea}>
                                    <MaterialCommunityIcons name="calendar-range" size={styles.iconSize} style={styles.icon} />
                                    <Text style={styles.descriptionText}>
                                        {itemDate}
                                    </Text>
                                </View>
                                <View style={styles.descriptionArea}>
                                    <MaterialCommunityIcons name="alarm" size={styles.iconSize} style={styles.icon} />
                                    <Text style={styles.descriptionText}>
                                        {itemTime}
                                    </Text>
                                </View>
                            </> : null
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default viewReminder