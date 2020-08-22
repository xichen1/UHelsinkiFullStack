import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const Anecdote = ({ anecdote, handleClick }) => {
        return (
            <div>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={handleClick}>vote</button>
                </div>
            </div>
        )
    }

    const dispatch = useDispatch()
    const anecdotes = (useSelector(state => (state.anecdotes.sort(
        (a, b) => {
            return b.votes - a.votes
        })
        .filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
    )
    ))

    // console.log(useSelector(state => state.filter))

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted Anecdote "${anecdote.content}"`, 5))
    }

    return (
        <div>
            {
                anecdotes.map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
                )
            }
        </div>
    )
}

export default AnecdoteList