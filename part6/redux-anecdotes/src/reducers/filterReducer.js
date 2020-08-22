const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEWFILTER': {
            return action.data.content
        }
        default: return state
    }
}

export const newFilter = (content) => {
    return {
        type: 'NEWFILTER',
        data: {
            content
        }
    }
}

export default filterReducer