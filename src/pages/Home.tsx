import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import { userService } from '../services/user.service'
import { User } from '../model/user'
import ListTile from '../components/ListTile'

export default function Home() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [users, setUsers] = React.useState<User[]>([])
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Sair' onPress={logOff} />,
            headerRight: () => (
                <View style={{ flexDirection: 'row'  }}>
                  <Button title='Add User' onPress={goToCreateUser}  />
                  <Button title='Roles' onPress={goToCreateRole} />
                </View>
              )
        })
    
        fetchUserList()
    }, [])

    function fetchUserList() {
        setRefreshing(true)

        userService.list().then(result => {
                setRefreshing(false)
                setUsers(result)
            
            }).catch(error => {
                setRefreshing(false)
                logOff()
            })
    }

    function logOff() {
        navigation.goBack()
    }

    function goToCreateUser() {
        navigation.navigate('user')
    }

    function goToCreateRole() {
        navigation.navigate('roles')
    }

    function goToEditUser(user: User) {
        navigation.navigate('user', { user })
    }

    if (users.length < 1) {
        return (
            <View style={styles.container}>
                <Text>Nenhum usuários cadastrado</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                refreshing={refreshing}
                onRefresh={fetchUserList}
                renderItem={({ item }) => <ListTile user={item} onPress={goToEditUser} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
})