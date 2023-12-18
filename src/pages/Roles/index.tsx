import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import { rolesService } from '../../services/roles.service'
import { Roles } from '../../model/roles'
import ListTileRoles from '../../components/ListTileRoles'

export default function RolesPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [roles, setRoles] = React.useState<Roles[]>([])
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title='Voltar' onPress={logOff} />,
            headerRight: () => (
                <View style={{ flexDirection: 'row'  }}>
                  <Button title='Add Role' onPress={goToCreateRole}  />
                </View>
              )
        })
    
        fetchRolesList()
    }, [])

    function fetchRolesList() {
        setRefreshing(true)

        rolesService.list().then(result => {
                setRefreshing(false)
                setRoles(result)
            
            }).catch(error => {
                setRefreshing(false)
                logOff()
            })
    }

    function logOff() {
        navigation.goBack()
    }

    function goToCreateRole() {
        navigation.navigate('role')
    }

    function goToEditRole(role: Roles) {
        navigation.navigate('role', { role })
    }

    if (roles.length < 1) {
        return (
            <View style={styles.container}>
                <Text>Nenhuma role cadastrada</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={roles}
                refreshing={refreshing}
                onRefresh={fetchRolesList}
                renderItem={({ item }) => <ListTileRoles role={item} onPress={goToEditRole} />}
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