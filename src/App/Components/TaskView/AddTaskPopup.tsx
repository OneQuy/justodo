import { View, Text } from 'react-native'
import React from 'react'
import { CommonStyles } from '../../../Common/CommonConstants'
import { TaskPersistedData } from '../../Types'
import { Color_Text } from '../../Hooks/useTheme'

const AddTaskPopup = ({
    startCloseAddTaskPopup,
}: {
    startCloseAddTaskPopup: (taskToAdd: TaskPersistedData | undefined) => void,
}) => {

    return (
        <View
            style={[
                // must
                CommonStyles.width100PercentHeight100Percent, // must 100%

                // optionals
                {
                }
            ]}
        >
            {/* <Text style={{ color: Color_Text }}>{Task}</Text> */}
        </View>
    )
}

export default AddTaskPopup