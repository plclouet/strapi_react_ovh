import React from "react";
//import http from "../http";
import Swal from 'sweetalert2';

export default function Comment(props) {
  const { id, user, numTel, description, created_at } = props.comment;
  const deleteComment = props.deleteComment;
  const selectedArray = props.selectedArray;
  const toggleCheckbox = props.toggleCheckbox;

  
  //les fonctions pour sweetalert2
const fireSweetAlert = () => {
    console.log(selectedArray);
    //console.log(props);
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
        ).then(() => {deleteComment(id)})
      };
    });
};

  const deleteSweetReport = (id) => {
     
    fireSweetAlert(id);
  };

  return (
    <div className="media mb-3" name="box">

      <div className="media-body p-2 shadow-sm rounded bg-light border">
      <input
            name="checkbox"
            type="checkbox"
            defaultChecked={false}
            onChange={() => toggleCheckbox(id)} />
        <label htmlFor="checkbox" className="p-2 m-0">{user}</label>
        <h6 className="mt-0 mb-1 text-muted">{numTel} à {created_at.slice(0,16)} </h6> 
        {description}
        <button className="btn btn-danger btn-sm mx-1 float-right" 
        onClick={() =>{deleteSweetReport({id})}}>
                          Delete
        </button>
        
        
      </div>
    </div>
  );
}