import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("users/register", {
      user_id: newUser.user_id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      area_name: newUser.area_name,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const allAdmin = () => {
  return axios.get("users/admin").then((res) => {
    return res.data;
  });
};

export const deleteAdmin = (admin_id) => {
  return axios
    .post("users/delete", { admin_id: admin_id })
    .then((res) => console.log(res));
};

export const changePassword = (data) => {
  return axios
  .post("users/changePassword",data)
  .then(res => console.log(res))
}