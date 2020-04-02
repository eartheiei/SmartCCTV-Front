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

export const addBlock = block => {
  return axios
  .post("blocks/add",{
    area_name: block.area_name,
    size: block.size,
    realRow: block.realRow,
    realColumn: block.realColumn,
    pixelRow: block.pixelRow,
    pixelColumn: block.pixelColumn,
    cam_id: block.cam_id
  })
  .then(res =>{
    console.log("Done!")
  })
}
