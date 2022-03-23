import { useState, useEffect } from 'react'
const INITIAL_STATE = {
  isLoading: false,
  error: null,
  token: null,
  identity: null,
  roomName: null
}
// const INITIAL_STATE = {
//   "isLoading": false,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzdkYWYzOGFkYWIwYjhlZmY5OTJjODdjNjJlNzhiMGJmLTE2NDI2ODcxNTIiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJoeWhlbGxvNTdAZ21haWwuY29tIiwidmlkZW8iOnsicm9vbSI6Ik1lZXRpbmctOTg1In19LCJpYXQiOjE2NDI2ODcxNTIsImV4cCI6MTY0MjY5MDc1MiwiaXNzIjoiU0s3ZGFmMzhhZGFiMGI4ZWZmOTkyYzg3YzYyZTc4YjBiZiIsInN1YiI6IkFDNzgyNmFkNjNjOTg5OTI2MjYxNTU5ODFlNzU1ZWMwMjUifQ.qv0tYdSOF-8BVL2KH0mYRFDphCk3EhJjopOhtX_A0jU",
//   "identity": "hello",
//   "roomName": "Meeting-1002"
// }

/**
 * get token to connect to a room
 */
const useConfig = () => {
  const [config, setConfig] = useState(INITIAL_STATE);


  const getToken = async ({ identity, roomName }) => {
    if (identity && roomName) {
      setConfig({ ...INITIAL_STATE, isLoading: true })
      const res = await fetch(`${process.env.REACT_APP_SERVER_PATH}/bookings/${roomName}/getVideoToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      const data = await res.json();


      setConfig(c => ({
        ...c,
        isLoading: false,
        token: data.message.token,
        identity,
        roomName
      }))


    }
  }
  return { ...config, getToken }
}

export default useConfig;