import React, { useState } from 'react'

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const changeVisible = () => {
        setVisible(!visible)
    }

    const showtext = { display: visible ? 'none' : '' }
    const hidetext = { display: visible ? '' : 'none' }
    return (
        <div>
            <div style={showtext}>
                <button onClick={changeVisible}>{props.buttonname}</button>
            </div>
            <div style={hidetext}>
                <button onClick={changeVisible}>cancel</button>
                {props.children}
            </div>
        </div>
    )
}

export default Toggleable