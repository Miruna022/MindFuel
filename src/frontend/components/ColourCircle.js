import {useState} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native"

export const ColourCircle = ({ color }) => {

    const [selected, setSelected] = useState(false)

    return (
        <TouchableOpacity
            style={[styles.circle, {backgroundColor: color}, selected ? {borderWidth: 3, borderColor: 'black'} : null]}
            onPress={() => {setSelected(!selected)}}
        />
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 50,
    }
})