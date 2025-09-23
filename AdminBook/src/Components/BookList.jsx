import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

function BookList() {
    let [fno,setFno]=useState(0)
    function show(){
        console.log("hello...")
    }
    useEffect(()=>{
        axios({
            url:'http://localhost:3000/book/books',
            method:'get'
        }).then((result)=>{
            if(result.data.success){
                console.log(result.data.data)
            }
        }).catch((err)=>{

        })
    })
  return (
    <>
        <h1>We are going to show the Books </h1>
        
    </>
  )
}

export default BookList