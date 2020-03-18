import axios from "axios";

export const searchVideo = search => {
  return axios
    .post("search/video", {
      name: search.name,
      picture: search.picture,
      areaName: search.areaName,
      camera: search.camera,
      date: search.date,
      time: search.time
    })
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