import Loading from "../components/Loading"
import './Register.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import * as React from 'react';




const Register = () =>
{
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const checkPasswordRef = useRef()
    const [checked, setChecked] = React.useState(false);
    

    const handleChange = () => {
      setChecked(!checked);
    };
    const onSubmit = async (e) =>
    {
        e.preventDefault()
        const username = usernameRef.current.value
        const email= emailRef.current.value
        const password = passwordRef.current.value
        const checkPassword = checkPasswordRef.current.value
        const data = {"identifier": username, "email": email,"password": password,"checkPassword": checkPassword}

        try
        {
            alert("1")
            const data = await fetch('http://localhost:1337/api/users')
            const response = data.json()
            
            const dataArray = [data.username]
            console.log(dataArray)
            alert("2")
           /* for(user in dataArray){
                if (user.email== username) {
                    alert("Podany login jest już zajęty")
                    return
                }*/
               /* if (user.email == email) {
                    alert("Podana nazwa użytkownika jest już zajęty")
                    return
                }*/
            /*if( user.username==username) {
                alert("Podany login jest już zajęty")
                return
            }
            if(user.email==email) {
                alert("Podana nazwa użytkownika jest już zajęty")
                return
            }*/
            if(!checked) {
                alert("Musisz zaakceptować regulamin")
                return
            }
            if(password!=checkPassword) {
                alert("Pola Haslo oraz Powtórz hasło muszą być takie same!")
                return
            }
            try
            {
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"username":username,
                "email": email,
                "password": password})
            })
            const json = await response.json()
            console.log(json)
            }
            catch
            {
                if(username.length<3)
                    alert("Nazwa użytkownika musi się składać z conajmniej 3 znaków!")
                if(password.length<6)
                    alert("Hasło musi się składać z conajmniej 6 znaków!")
            }
            
        }
        catch
        {
            alert("error")
        }
    }

    return(
    <div className="register">
        <h1 className="title">Rejestracja</h1>
        <form onSubmit= {onSubmit}>
            <input className='input' ref={usernameRef} type="text" name="username" placeholder="Nazwa użytkownika" minLength="3" required/><br />
            <input className='input' ref={emailRef} type="email" name="email" placeholder="Email" required/><br />
            <input className='input' ref={passwordRef} type="text" name="password" placeholder="Hasło" minLength="6" required/><br />
            <input className='input' ref={checkPasswordRef} type="text" name="chechPassword" placeholder="Powtórz hasło" minLength="6" required/><br />
            <div className="link1">
                <input type="checkbox" checked={checked}  onChange={handleChange}/> 
                <h6 className='text1'>Akceptuję</h6>
                <Link to="/regulamin"><h6 className='text1' id='text-link'>Regulamin</h6></Link>
            </div>
            <input className="submitButton1" type="submit" value="Zarejestruj się"/>
        </form>
    </div>
    )
    
}
export default Register