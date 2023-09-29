import axios from "axios";
import {React, useEffect} from "react";
import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useLocation} from 'react-router-dom'; 


//ALLOWS USER TO UPDATE REVIEW BUT NOTHING ELSE 
const Update = () => {

    const [book, setBook] = useState({
        title: "",
        review: "",
        date: '',
        cover: "",
    });

    const naviagate = useNavigate()
    const location = useLocation()
    const bookId = location.pathname.split("/")[2]

    useEffect(() => {
        // Fetch book data based on bookId
        axios.get("http://localhost:8000/books/" + bookId)
          .then((response) => {
            const bookData = response.data;
            // Set the title from the fetched data
            setBook((prev) => ({
              ...prev,
              title: bookData.title,
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      }, [bookId]);
    


    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook((prev) => ({
            ...prev,
            [name]: value
        }))
        
    }

    //console.log(book)

     const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:8000/books/"+bookId, book)
            naviagate("/")
            
        } catch(err){
            console.log(err)
            
        }
    }

   

    return (
        <div className="form">
            <h1>Update Book Log</h1>
            <h1>{book.title}</h1>
            <input typ="text" 
            placeholder="change review"
            onChange={handleChange} 
            value={book.review}
            name="review"/>
            <input type="date"
            placeholder="update date" 
            onChange={handleChange} 
            
            name="date"/>


       <button onClick={handleClick}> Update</button>
       
     
        </div>
    )
}

export default Update