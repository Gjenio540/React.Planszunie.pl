import { useParams } from "react-router-dom"
import Loading from '../components/Loading'
import useFetch from "../hooks/useFetch"

const Game = () => {
    const { id }  = useParams()
    const { loading, error, data } = useFetch('http://localhost:1337/api/games/'+id)
    console.log(data)

    if(error)
    return(error)

    if(loading)
    return(<Loading/>)
   
    return(
        <div>
            <h1>{data.title}</h1> 
        </div>
        
    )
}
export default Game