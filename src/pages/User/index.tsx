import React from 'react'
import { Alert, Button, View , Text  } from 'react-native'
import { MultipleSelectList} from "react-native-dropdown-select-list"

import MyInput from '../../components/MyInput'
import FullButton from '../../components/FullButton'
import styles from './styles'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { userService } from '../../services/user.service'
import { Roles } from '../../model/roles'
import { rolesService } from '../../services/roles.service'
import Rolelist from '../../components/Rolelist'

export default function User() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const params = route.params as any
    const user = params ? params.user : undefined
    console.log(user)

    const [name, setName] = React.useState(user ? user.name : '')
    const [username, setUsername] = React.useState(user ? user.username : '')
    const [password, setPassword] = React.useState('')
    const [passConfirm, setPassConfirm] = React.useState('')
    const [rolesList, setRolesList] = React.useState<Roles[]>([])
    const [roles,setRoles] = React.useState<string[]>(user ? user.roles : [])

    function fetchRolesList() {
        rolesService.list().then(result => {
                setRolesList(result)
            
            }).catch(error => {
                
            })
    }

    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
        fetchRolesList()
    }, [])

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome é obrigatório')
            return
        }

        if (user) {
            let body: any = { name , roles }

            if (password.trim() !== '') {
                if (password !== passConfirm) {
                    Alert.alert('Senha não confere')
                    return
                }
                body = { name, password , roles }
            }

            userService.update(user.id, body).then(saved => {
                Alert.alert('Title', 'Usuário atualizado com sucesso')
                navigation.goBack()
            }).catch(
                error => navigation.navigate('login')
            )

        } else {
            if (!username || username.trim() === '') {
                Alert.alert('Login é obrigatório')
                return
            }
            if (!password || password.trim() === '') {
                Alert.alert('Senha é obrigatória')
                return
            }
            if (password !== passConfirm) {
                Alert.alert('Senha não confere')
                return
            }

            userService.create({ name, username, password , roles }).then(saved => {
                Alert.alert('Title', 'Usuário criado com sucesso')
                navigation.goBack()
            }).catch(
                error => navigation.navigate('login')
            )
        }
    }

    return (
        <View style={styles.container}>
            <MyInput label='Nome' value={name} onChangeText={setName} />
            <MyInput label='Login' value={username} onChangeText={setUsername} editable={user === undefined} />
            <MyInput label='Senha' value={password} onChangeText={setPassword} secureTextEntry />
            <MyInput label='Confirmar Senha' value={passConfirm} onChangeText={setPassConfirm} secureTextEntry />
            
            <Text>Role:</Text>
            <MultipleSelectList
                data={rolesList.map((o) => ( { key : o.name , value : o.description , selected : true } ))}
                setSelected={(val: React.SetStateAction<string[]>) => setRoles(val)} 
                defaultOption={{ key:'teste', value:'teste' }}
                save="key"
                
            />
            <Text>Roles selecionadas: {JSON.stringify(roles)}</Text>

            <FullButton title='Salvar' onPress={save} />
        </View>
    )
}