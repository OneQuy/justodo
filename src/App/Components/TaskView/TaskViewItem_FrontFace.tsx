import { StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { TaskPersistedAndRuntimeData } from '../../Types'
import TaskItemView_Background from './TaskViewItem_Background'
import TaskItemView_Content from './TaskViewItem_Content'
import TaskItemView_Menu from './TaskViewItem_Menu'

// const IsLog = true

const TaskItemView_FrontFace = ({
    task,
    actionRemoveTask,
    isActiveBackgroundFrontFace,
}: {
    actionRemoveTask: (task: TaskPersistedAndRuntimeData) => void,
    task: TaskPersistedAndRuntimeData,
    isActiveBackgroundFrontFace: boolean,
}) => {
    const [isActiveContent, set_isActiveContent] = useState(false)
    const [isActiveMenu, set_isActiveMenu] = useState(false)

    const [isScaleUpOrDownBackground, set_isScaleUpOrDownBackground] = useState(true)

    //// remove task

    // const startRemoveTask = useCallback(() => {
    //     set_isActiveContent(false)
    //     set_isScaleUpOrDownBackground(false)
    // }, [])

    // end background animation

    const onContentAnimationEnd = useCallback((isAppearOrRemove: boolean) => {
        if (isAppearOrRemove) { // start show menu
            set_isActiveMenu(true)
        }
    }, [])

    // end background animation

    const onBackgroundAnimationEnd = useCallback((isAppearOrRemove: boolean, task: TaskPersistedAndRuntimeData) => {
        // if (IsLog) console.log('[onBackgroundAnimationEnd] isAppearOrRemove', isAppearOrRemove);

        if (isAppearOrRemove) {
            set_isActiveContent(true)
        }
        else { // remove
            actionRemoveTask(task)
        }
    }, [actionRemoveTask])

    // style

    const style = useMemo(() => {
        return StyleSheet.create({
            master: {
                flex: 1,
                backgroundColor: "#afeeee",
                overflow: 'hidden', // for hide text content (TaskItemView_Content) SlideIn effect
            },
        })
    }, [])

    return (
        <View style={style.master}>
            {/* background */}
            {
                isActiveBackgroundFrontFace &&
                <TaskItemView_Background
                    completedShowCallback={onBackgroundAnimationEnd}
                    task={task}
                    isScaleUpOrDown={isScaleUpOrDownBackground}
                />
            }

            {/* content */}
            {
                isActiveContent &&
                <TaskItemView_Content
                    completedShowCallback={onContentAnimationEnd}
                    task={task}
                />
            }

            {/* menu */}
            {
                isActiveMenu &&
                <TaskItemView_Menu
                    task={task}
                />
            }
        </View>
    )
}

export default TaskItemView_FrontFace