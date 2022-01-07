/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const MovieCard = ({movie,deleteMovie}) => {

    const {moviename,image,year}=movie
    // const {deleteMovie}=useContext(MovieContext)

    return (
        <div style={{backgroundColor:'white',display:'flex',flexDirection:'column',width:'300px',height:'auto',padding:'5px',borderRadius:'10px',justifyContent:'center',alignItems:'center',cursor:'pointer'}}>
            <img src={image} />
            <h4 style={{wordWrap:'break-word',width:'200px'}}>{moviename}</h4>
            <h5>Released in: {year}</h5>
            <button className='btn' onClick={()=>{
                deleteMovie()
            }}>Remove</button>
        </div>
    )
}

export default MovieCard
