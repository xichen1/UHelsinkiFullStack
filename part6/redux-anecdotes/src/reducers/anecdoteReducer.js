import anecdoteService from '../services/anecdotes'


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return action.data
    }
    case 'ADDVOTE': {
      // return action.data
      const id = action.data.id
      // const oldanecdote = state.find((ane) => ane.id === id)
      // const newanecdote = {
      //   ...anecdote,
      //   votes: anecdote.votes + 1
      // }
      return state.map(anecdote => anecdote.id === id ? action.data : anecdote)
    }
    case 'ADDANECDOTE': {
      return [...state, action.data]
    }

    default: return state
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADDANECDOTE',
      data: anecdote
    })
  }

}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newanecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdoteService.addVoteNum(newanecdote)
    dispatch({
      type: 'ADDVOTE',
      data: response
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer