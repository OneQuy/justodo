import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'

const TaskViewItem_BackFace = () => {
    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                backgroundColor: "#aabbee",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <View style={style.master}>
            <Text>Back Face</Text>
        </View>
    )
}

export default TaskViewItem_BackFace