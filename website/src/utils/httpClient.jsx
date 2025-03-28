import axios from "axios"

const token = localStorage.getItem("token");

export default axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})
