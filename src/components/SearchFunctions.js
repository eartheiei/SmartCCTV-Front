import axios from "axios";

export const searchVideo = search => {
  return axios
    .post("search/video", search)
    .then(res => {
        console.log("Search API send!")
        return res.data
    });
};

export const uploadPicture = picture => {
  return axios
  .post("search/upload",picture)
  .then( res => {
    console.log(res.statusText)
  })
}

// export const verifyTier = () => {
//   return axios
//   .get("search/tierVerify")
//   .then(res => {
//     return res.data
//   })
// }

export async function verifyTier(){
  try {
    let res = await axios({
      url: "http://localhost:4000/search/tierVerify",
      method: 'get',
      timeout: 8000,
    })
    return res.data
  } catch(err){
    return err
  }
}

export async function findBlockNum(data){
  try {
    let res = await axios({
      url: `http://localhost:4000/blocks/check/block_num/${parseInt(data)}`,
      method: 'get',
      timeout: 8000,
    })
    return res.data
  } catch(err){
    return err
  }
}

export const blockMapping = (data) => {
  return axios
  .get(`search/mapping/${data.user_id}/${data.video_name}`)
  .then( res => {
    return res.data
  })
}

export const detailCam = (id) => {
  return axios
  .get(`settings/camera/${id}`)
  .then(res => {
    return res.data
  })
}

