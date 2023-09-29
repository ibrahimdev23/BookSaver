import e from 'express'
import express from 'express'
import mysql from "mysql"
import cors from 'cors'


import fetch from "node-fetch"

const PORT = 8000
const app = express()


//let fetch = require('node-fetch');
// async function caller(url){
// let res = await fetch(url)
//     console.log(res.json().t)
//     return res
// }

//function my_async_fn(url) {
    // return fetch(url).then(response => {
    //     //console.log(response.text())
    //     response.json()
        // .then(data => {
        //     let obj = data.docs
        //     for (let k in obj){
        //        // console.log(obj[k])
                
        //             let title = obj[0]
        //             for(let i in title){
        //                 //console.log("I: ", i)
        //                 if(i === "title"){
        //                     let t = i
        //                     console.log(title[t])
        //                     // for(let n in t){
        //                     //     console.log(t[n])
        //                     // }
        //                 }
        //             }
                
        //     }
        //     }
           //console.log(data.sa)   author_name   title
        // console.log(data.start)
        //console.log(data.start)
         //console.log(data.q)



//         )
        
//         //console.log(response.json()); // Logs the response
//         //return response;
//     });
// }


    //{
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: '{}'
// }).then(response => {
//     console.log(response)
//   //return response.json();
// }).catch(err => {console.log(err);});

//}

// const url1 = 'https://openlibrary.org/search.json?q=dune'
// caller(url1)
// async function my_async_fn(url) {
//     let response = await fetch(url);
//     console.log(response); // Logs the response
//     return response;
// )

// console.log(my_async_fn(url)); // Returns Promise

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "mohamed09",
    database: "test"

})

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("hello from the backend")
})

app.get("/books", (req, res) => {
    //const {title, review, date, cover} = req.body
    const query = "SELECT * FROM books"


    db.query(query, (err, data)=> {
        if(err) {
            console.log("err")
            return res.json(err)
        } else {
            return res.json(data)

        }
    })
})


app.post("/books", (req, res) => {
    const {title, review, date, cover} = req.body
    const query = "INSERT INTO books (`title`, `review`,`date`, `cover`) VALUES (?)"
    const values = [
        title, 
        review, 
        date, 
        cover
    ]

    db.query(query, [values], (err, data) => {
        if(err) {
            return res.json(err)
        }else {
            res.json("book added successfully")
        }
    })
})

app.delete("/books/:id", (req, res)=> {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (err, data) => {
        if(err){
            return res.json(err)
        } else {
            return res.json("Book has been deleted")
        }
    })

})


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const { review, date } = req.body;
  
    const query = "UPDATE books SET `review` = ?, `date` = ? WHERE id = ?";
  
    const values = [review, date, bookId];
  
    db.query(query, values, (err, data) => {
      if (err) {
        console.error('Error updating book:', err);
        return res.status(500).json({ error: 'An error occurred while updating the book.' });
      } else if (data.affectedRows === 0) {
        // No rows were affected, indicating that the book with the given id doesn't exist
        return res.status(404).json({ error: 'Book not found.' });
      } else {
        return res.json("Book has been updated");
      }
    });
  });

app.listen(8000, () => {
    console.log(`Connected on port ${PORT}` )
})