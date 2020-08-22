import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteForm = (props) => {
    const Form = ({ notification, handleSubmit }) => {
        if (notification !== '') {
            return <Notification />
        }
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={handleSubmit}>
                    <div><input type='text' name='anecdote' /></div>
                    <button type='submit'>create</button>
                </form>
            </div>
        )
    }

    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`You created Anecdote ${content}`, 5))
    }

    const notification = useSelector(state => state.notification)

    return (
        <Form notification={notification} handleSubmit={newAnecdote} />
    )
}

export default AnecdoteForm