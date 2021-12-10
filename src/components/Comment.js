import React from "react";
import http from "../http";
import Swal from 'sweetalert2';

export default function Comment(props) {
  const { id, user, numTel, description, created_at } = props.comment;


  //les fonctions pour sweetalert2

const fireSweetAlert = () => {
    console.log(`http://localhost:1337/comments/`+id);
    //console.log(API_URL+`/comments/`+id);
    Swal.fire({
        
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(async () => {
            try {
                await http.delete(`/comments/${id}`)
          //  await fetch(API_URL+`/comments/`+id, {
           // headers: {"Content-type": "application/json;charset=UTF-8"},
           //  method: "DELETE",
            //body: JSON.stringify(comment)
            .then(()=>{
            window.location.reload();
         })} catch(err) {
           console.error(err)
         };
       
     }); 
    };
    });
};

  const deleteSweetReport = (id) => {
     
    fireSweetAlert(id);
  };

  return (
    <div className="media mb-3">

      <div className="media-body p-2 shadow-sm rounded bg-light border">
     
        <h6 className="mt-0 mb-1 text-muted">{user}  tél {numTel} à {created_at.slice(0,16)} </h6> 
        {description}
        <button className="btn btn-danger btn-sm mx-1 float-right" onClick={() =>{deleteSweetReport({id})}}>
                          Delete
        </button>
        
      </div>
    </div>
  );
}