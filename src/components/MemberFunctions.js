import axios from 'axios'

export const picturePersonal = user_id => {
    return axios
    .get(`/members/face/${user_id}`)
    .then(res =>{
        console.log('get face')
        return res.data[0]
    })
  }