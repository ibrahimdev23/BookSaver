import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import axios from 'axios'

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
              const res = await axios.get('http://localhost:8000/books') 
              setBooks(res.data)
              console.log(res)  
            } catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])


        let booksRev = books.toReversed()

    const handleDelete = async(id) => {
        try{
            await axios.delete("http://localhost:8000/books/"+id);
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }


    return (
        <div>
      
            <h1>BOOK TRACKER  <button className="btn"> 
        <Link to={"/add"}>Add new book </Link>
        </button></h1>

           
            <div className="books">
            {booksRev.map(book => ( 
            <div className="book" key={book.id}> 
                {book.cover && <img src={book.cover} alt=""></img>}
                <h2>{book.title}</h2>
                <p>{book.review}</p>
                <span>{book.price}</span>
                <div className="button">
                <button className="btn"><Link to={`/update/${book.id}`}> Update</Link></button>
                <button className="btn" onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
            </div>
            ))}
        </div>
    
       </div> 
    )
}


export default Books