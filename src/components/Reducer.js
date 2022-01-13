export const reducer = (state, action) => {
    if (action.type === "ADD_MOVIE") {
      return {
          ...state,
        moviesList: [...state.moviesList, action.payload],
        isModalOpen: true,
        modalContent: "✅ Movie added successfully",
      };
    
    }

    if(action.type==="CLOSE_MODAL")
    {
         return {

            ...state,isModalOpen:false

         }
    }

    if(action.type==="DELETE_MOVIE")
    {
        const newMovies=state.moviesList.filter((movie,index)=>{
          
            return index!==action.payload
        })
         return {

            ...state,moviesList:newMovies,isModalOpen:true,modalContent:'❌ Deleted movie successfully'

         }
    }

    if(action.type==="FILL_ALL")
    {
      return{
        ...state,isModalOpen:true,modalContent:"🚫 Please fill all fileds"
      }
    }
    if(action.type==="INVALID_IMAGE_URL")
    {
      return{
        ...state,isModalOpen:true,modalContent:"🚫 Invalid image URL"
      }
    }

    new Error("Invalid type")

  };
