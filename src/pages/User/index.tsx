import React from 'react'
import { Alert, Button, View , Text  } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import MyInput from '../../components/MyInput'
import FullButton from '../../components/FullButton'
import styles from './styles'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { userService } from '../../services/user.service'

export default function User() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const params = route.params as any
    const user = params ? params.user : undefined

    const [name, setName] = React.useState(user ? user.name : '')
    const [username, setUsername] = React.useState(user ? user.username : '')
    const [password, setPassword] = React.useState('')
    const [passConfirm, setPassConfirm] = React.useState('')
    const [selectedItems, setSelectedItems] = React.useState<string[]>([])

    const handleItemChange = (value: string | string[]) => {
        // 'value' can be a string or an array of strings
        setSelectedItems(Array.isArray(value) ? value : [value]);
    };

    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
    }, [])

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('Nome é obrigatório')
            return
        }

        if (user) {
            let body: any = { name }

            if (password.trim() !== '') {
                if (password !== passConfirm) {
                    Alert.alert('Senha não confere')
                    return
                }
                body = { name, password }
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

            userService.create({ name, username, password }).then(saved => {
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
            <Text>Select Multiple Items:</Text>
            <RNPickerSelect
                value={selectedItems}
                onValueChange={handleItemChange}
                items={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                // Add more items as needed
                ]}
                placeholder={{ label: 'Select an option', value: null }}
                
            />

            <Text>Selected Items: {JSON.stringify(selectedItems)}</Text>

            <FullButton title='Salvar' onPress={save} />
        </View>
    )
}