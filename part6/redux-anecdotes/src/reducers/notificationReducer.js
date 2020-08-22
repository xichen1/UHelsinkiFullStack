const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SETNOTIFICATION': {
            return action.data
        }
        case 'REMOVENOTIFICATION': {
            return ''
        }
        default: return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        const finaltime = time * 1000
        setTimeout(() => {
            dispatch(removeNotification())
        }, finaltime)
        dispatch({
            type: 'SETNOTIFICATION',
            data: content
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVENOTIFICATION'
    }
}

export default notificationReducer