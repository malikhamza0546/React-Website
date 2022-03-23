import axios from 'axios'
// import ErrorHandler from '../ErrorHandler/ErrorHandler';

export const signup = (data) => { 
    return axios.post(process.env.REACT_APP_SERVER_PATH+`/signup`, data)
      .then((response)=> {
          return response
        }).catch(e=>{
          console.log("error is happend", e.response.data.error);
        })
}

export const signin = (data) => { 
  return axios.post(process.env.REACT_APP_SERVER_PATH+`/login`, data)
    .then((response)=> {
        return response
      }).catch(e=>{
        console.log("error is happend")
      })
}
  
  
// .catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       <ErrorHandler/>
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//       <ErrorHandler/>
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//       <ErrorHandler/>
//     }
//     console.log(error.config);
//     <ErrorHandler/>
//   });