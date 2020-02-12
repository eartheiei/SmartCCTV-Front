import axios from "axios";

export const addCamera = newCamera => {
  return axios
    .post("settings/add/camera", {
      ip: newCamera.ip,
      location: newCamera.location,
      spec: newCamera.spec
    })
    .then(res => {
      console.log("added camera!");
    });
};

export const getCamera = camera => {
    return axios
    .get("settings/cameras")
    .then(res => {
        return res.data
    })
}
