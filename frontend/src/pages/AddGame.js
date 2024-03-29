import { useRef, useState } from 'react'
import { getToken } from '../modules/Auth'
import style from './styles/AddGame.module.css'

const AddGame = () => {
    const titleRef = useRef()  
    const decritionRef = useRef()
    const authorRef = useRef()
    const illustratorRef = useRef()
    const publisherRef = useRef()
    const playerFromRef = useRef()
    const playerToRef = useRef()
    const timeFromRef = useRef()
    const timeToRef = useRef()
    const ageToRef = useRef()
    const imageRef = useRef()
    const [error, setError] = useState(null)
    const [picture, setPicture] = useState({})

    const onChange = (e) => {
        setPicture(e.target.files[0])
        console.log(picture)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(picture)
        const title = titleRef.current.value
        const description = decritionRef.current.value
        const authors = authorRef.current.value
        const artists = illustratorRef.current.value
        const publisher = publisherRef.current.value
        const players_from = playerFromRef.current.value
        const players_to = playerToRef.current.value
        const time_from = timeFromRef.current.value
        const time_to = timeToRef.current.value
        const age = ageToRef.current.value
        const token = "Bearer "+getToken()
        const body = JSON.stringify({"data":{
                        "title": title,
                        "description": description,
                        "authors": authors,
                        "artists": artists,
                        "publisher": publisher,
                        "players_from": players_from,
                        "players_to": players_to,
                        "time_from": time_from,
                        "time_to": time_to,
                        "age": age}})

        const file = picture
        const formdata = new FormData()
        
        
        try
        {
            const response1 = await fetch('http://localhost:1337/api/games', {
                method: 'POST',
                headers: {Authorization: token, 'Content-Type': 'application/json'},
                body: body
            })

            let data1 = await response1.json()
            formdata.append('files', file)
            formdata.append('refId', data1.data.id)
            formdata.append('ref', 'api::game.game')
            formdata.append('field', 'icon')

            const response2 = await fetch('http://localhost:1337/api/upload', {
                method: 'POST',
                headers: {Authorization: token},
                body: formdata
            })
            await response2.json()
            
            if (!response1.ok || !response2.ok)
            {
                setError("Błąd")
            }
            else
            {
                setError("Dodano grę")
            }  
        }
        catch
        {
            setError("Brak komunikacji z serwerem.")
        }
        console.log(picture)
        
    }

    return(
        <>
        <h1>{error}</h1>
            <form onSubmit={onSubmit}>
                <div className={style.form}>
                    <div className={style.basics}>
                        <input ref={imageRef} type="file" id="image" name="image" onChange={onChange} required /><br />
                        <input ref={titleRef} type="text" placeholder='Tytył' required/><br />
                        <textarea ref={decritionRef} name="" id="" cols="30" rows="10" placeholder='Opis' required></textarea><br />
                    </div>  
                    <div className={style.parameters}>
                        <label htmlFor="authors">Autorzy:</label><br />
                        <input ref={authorRef} type="text" name='authors' className='long' placeholder='Autor1, Autor2...' required/><br />
                        <label htmlFor="illustrators">Ilustratorzy:</label><br />
                        <input ref={illustratorRef} type="text" name='illustrators' className='long' placeholder='Ilustrator1, Ilustrator2...' required /><br />
                        <label htmlFor="publisher">Wydawca:</label><br />
                        <input ref={publisherRef} type="text" name='publisher' className='long' required/><br />
                        <label htmlFor="number">Ilość graczy:</label><br />
                        <input ref={playerFromRef} type="text" name='number' className='short' placeholder='od' required />
                        <input ref={playerToRef} type="text" name='number' className='short' placeholder='do' required /><br />
                        <label htmlFor="number">Czas gry:</label><br />
                        <input ref={timeFromRef} type="text" className='short' name='time' placeholder='od' required/>
                        <input ref={timeToRef} type="text" className='short' name='time' placeholder='do' required/> <br />
                        <label htmlFor="publisher">Wiek:</label><br />
                        <input ref={ageToRef}type="text" name='wiek' className='long' required/><br />
                    </div>
                    <input  type="submit" value="Dodaj" />
                </div> 
            </form>
        
        </>
    )
}
export default AddGame