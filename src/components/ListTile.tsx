import { Dimensions, StyleSheet, Text, View } from "react-native"

import { User } from "../model/user"

type Props = {
    user: User,
    onPress: (user: User) => void
}

export default function ListTile({ user, onPress }: Props) {
    return (
        <View style={styles.container} onTouchEnd={() => onPress(user)} >
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.subTitle}>{user.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 40,
    },
    title: {
        fontSize: 20,
    },
    subTitle: {
        fontSize: 16,
    },
})