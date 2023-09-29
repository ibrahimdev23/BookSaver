import axios from "axios";
import React, { useEffect } from "react";
import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'; 





const Add = () => {

   
    
    const [dataFetched, setDataFetched] = useState(false);
      const [title, setTitle] = useState('');
      const [book, setBook] = useState({
        title: '',
        author: '',
        cover: '',
        review: '',
        date: '',
      });
    

      
      const handleChange = (e) => {
        setTitle(e.target.value);
      };
      
      const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setBook({ ...book, date: selectedDate });
      };


      const handleReviewChange = (e) => { // Handle review input change
        const reviewText = e.target.value;
        setBook({ ...book, review: reviewText });
      };
    


      const handleSubmit = (e) => {
        e.preventDefault();
    
        
        
        // Make an Axios call to fetch book information based on the entered title
        axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`)
          .then((response) => {
            const data = response.data;
            if (data.docs && data.docs.length > 0) {
              const firstResult = data.docs[0];
    
              const newBook = {
                title: firstResult.title,
                author: firstResult.author_name ? firstResult.author_name[0] : 'Unknown Author',
                cover: `https://covers.openlibrary.org/b/id/${firstResult.cover_i}-L.jpg`,
                review: '',
                date: '',
              };
    
              // Update the book state with the retrieved information
              setBook(newBook);
              setDataFetched(true)
            } else {
              // Handle the case when no results are found
              setBook({
                title: 'Not Found',
                author: '',
                cover: '',
                review: '',
                date: "",
              });
              setDataFetched(true)
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
    

      const handleServerSubmit = () => {
        // Make an Axios POST request to your Node.js server
        axios.post('http://localhost:8000/books', book)
          .then((response) => {
            console.log('Data sent to the server:', response.data);
          })
          .catch((error) => {
            console.error('Error sending data to the server:', error);
          });
      };


      return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Enter a Title:
              <input
                type="text"
                value={title}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Search</button>
          </form>
  {dataFetched && (
  <div>
    <h2>Title: {book.title}</h2>
    <h3>Author: {book.author}</h3>
    <img src={book.cover} alt="Book Cover" />
  </div>
)}
          
          <label>
          Enter a Date:
          <input
            type="date"
            value={book.date}
            onChange={handleDateChange}
          />
        </label>
        <label>
          Enter a Review: {/* Changed label text */}
          <input
            type="text"    // Changed input type to text
            name="review"   // Added name attribute
            value={book.review}
            onChange={handleReviewChange}
          />
        </label>
          <button onClick={handleServerSubmit}>Save</button>

        </div>
      );
    }
    
        
            



//     const [book, setBook] = useState({
//         title: "",
//         desc: "",
//         price: null,
//         cover: "",
//     });


//     useEffect(() => {
//         const apiUrl = 'https://openlibrary.org/search.json?q=dune';

    
//     axios.get(apiUrl)
//       .then((response) => {
//         const data = response.data;
//         if (data.docs && data.docs.length > 0) {
//           const firstResult = data.docs[0];

//           const title = firstResult.title;
//           const author = firstResult.author_name ? firstResult.author_name[0] : 'Unknown Author';
//           const cover = `https://covers.openlibrary.org/b/id/${firstResult.cover_i}-L.jpg`;

//           setBook({
//             ...book,
//             title: title,
//             author: author,
//             cover: cover,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   ; // T
// })


//     const naviagate = useNavigate()


//     const handleChange = (e) => {
//         //console.log(prev)
//         const {name, value } = e.target;
//         setBook((prevBook) => ({
//             ...prevBook, [name]: value
//         }))
//     }
//     //console.log(book)

//      const handleClick = async (e) => {
//         e.preventDefault()
//         try{
//             await axios.post("http://localhost:8000/books", book)
//             naviagate("/")
            
//         } catch(err){
//             console.log(err)
//         }
//     }


//     return (
//         <div className="form">
//             <h1>Add New Book</h1>
//             <h2>{book.title}</h2>
//             <input typ="text" 
//             placeholder="title" 
            
//             onChange={handleChange} 
//             name="title"/>
//             <input typ="text" placeholder="desc" onChange={handleChange} name="desc"/>
//             <input typ="number" placeholder="price" onChange={handleChange} name="price"/>
//             <input typ="text" placeholder="cover" onChange={handleChange} name="cover"/>
        
//        <button onClick={handleClick}> Add</button>
//         </div>
//     )
// }

 export default Add