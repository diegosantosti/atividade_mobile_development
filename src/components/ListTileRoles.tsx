import { Dimensions, StyleSheet, Text, View } from "react-native"

import { Roles } from "../model/roles"

type Props = {
    role: Roles,
    onPress: (role: Roles) => void
}

export default function ListTileRoles({ role, onPress }: Props) {
    return (
        <View style={styles.container} onTouchEnd={() => onPress(role)} >
            <Text style={styles.title}>{role.name}</Text>
            <Text style={styles.subTitle}>{role.description}</Text>
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