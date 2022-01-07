import React, { useContext } from 'react'
import { MovieContext } from '.'


// MovieContext


const Navbar = () => {
    const {state}=useContext(MovieContext)
    return (
        <div>
            <h4>Total movies: {state.moviesList.length}</h4>
        </div>
    )
}

export default Navbar
