import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'

const TaskItemView_Menu = ({
    task,
}: {
    task: TaskPersistedAndRuntimeData,
}) => {

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                position: 'absolute',
                width: '100%',
                height: '100%',


                backgroundColor: "#bc8f",
                // flex: 1,
            },

            taskNameTxt: {
                // width: '100%',
                // height: '100%',
            }
        })
    }, [])

    return (
        <View style={style.master}>
            <Text style={style.taskNameTxt}>{'Todo Task'}</Text>
        </View>
    )
}

export default TaskItemView_Menu