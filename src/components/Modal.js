import React from 'react'

const Modal = ({modalContent,closeModal}) => {


    setTimeout(()=>{

        closeModal()

    },2000)

    return (
        <div className='modal'>
           {modalContent} 
        </div>
    )
}

export default Modal
