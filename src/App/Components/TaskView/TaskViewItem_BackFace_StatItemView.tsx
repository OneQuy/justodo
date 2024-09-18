import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'

const TaskViewItem_BackFace_StatItemView = () => {
    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                
                // flexDirection: 'row'
                backgroundColor: "#aabe",
            },,

            taskNameTxt: {
            }
        })
    }, [])

    return (
        <View style={style.master}>
            <Text>Streak</Text>
            <Text>88</Text>
            <Text>Days</Text>
        </View>
    )
}

export default TaskViewItem_BackFace_StatItemView