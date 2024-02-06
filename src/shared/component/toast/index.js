import React from 'react';
import {toast} from 'react-toastify'
export const toastMessage = (msg,type)=>{
    if(type == 'success'){
        return toast.success(msg ,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored"
        })
    }else{
        toast.error(msg ? msg :"Please check network connection!",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored"
        })
    }
  
}
