import { View, Text } from 'react-native'
import React from 'react'
import LucideIconTextEffectButton from '../../../Common/Components/LucideIconTextEffectButton'
import { IconSize } from '../../Constants/Constants_Size'

const TickTask = () => {
    return (
        <View>
            <LucideIconTextEffectButton
                selectedBackgroundColor={'#000000'}
                selectedColorOfTextAndIcon={'#ffffff'}
                iconProps={{ name: 'Circle', size: IconSize.Normal }}

            // style={style.addTaskBtn}
            // onPress={startRemoveTask}
            />
        </View>
    )
}

export default TickTask