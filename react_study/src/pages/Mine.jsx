import React from 'react'
import MineDemo from './MineDemo'


const Mine = (props) => {
    console.log(props)

   const back = () => {
       props.history.push('/')
   }

   const replaceBack = () => {
        props.history.replace('/')
   }

    return (
        <div>
            Mine: id-{props.match.params.id}
            <button onClick={back}>push-回到首页</button>
            <button onClick={replaceBack}>replace-回到首页</button>
            <MineDemo/>

        </div>
    )
}

export default Mine