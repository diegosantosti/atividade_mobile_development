import React from 'react'
import { Alert, Button, View } from 'react-native'

import MyInput from '../../components/MyInput'
import FullButton from '../../components/FullButton'
import styles from './styles'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { rolesService } from '../../services/roles.service'

export default function Role() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const params = route.params as any
    const role = params ? params.role : undefined

    const [name, setName] = React.useState(role ? role.name : '')
    const [description, setDescription] = React.useState(role ? role.description : '')

    React.useEffect(() => {
        navigation.setOptions({ title: role ? 'Editar Role' : 'Nova Role' })
    }, [])

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome é obrigatório')
            return
        }

        if (role) {
            let body: any = { name }

            if (description.trim() !== '') {
                body = { name, description }
            }

            rolesService.update(role.id, body).then(saved => {
                Alert.alert('Title', 'Role atualizado com sucesso')
                navigation.goBack()
            }).catch(
                error => navigation.navigate('roles')
            )

        } else {
            if (!name || name.trim() === '') {
                Alert.alert('Nome é obrigatório')
                return
            }
            if (!description || description.trim() === '') {
                Alert.alert('Descrição é obrigatória')
                return
            }

            rolesService.create({ name, description }).then(saved => {
                Alert.alert('Title', 'Role criado com sucesso')
                navigation.goBack()
            }).catch(
                error => navigation.navigate('roles')
            )
        }
    }

    return (
        <View style={styles.container}>
            <MyInput label='Nome' value={name} onChangeText={setName} editable={role === undefined} />
            <MyInput label='Descrição' value={description} onChangeText={setDescription}  />
            
            <FullButton title='Salvar' onPress={save} />
        </View>
    )
}