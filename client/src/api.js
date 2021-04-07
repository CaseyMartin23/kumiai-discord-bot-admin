import axios from "axios";

export const getData = async (type) => {
  //check to see if user is valid
  console.log("getData-type->", type);
  try {
    const res = await axios.get(`/api/data/${type}`);
    console.log("res->", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateData = async (updatedData) => {
  //check to see if user is valid
  try {
    console.log("update data called");
    await axios.put("/api/data", updatedData);
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (data) => {
  //check to see if user is valid
  try {
    await axios.delete(`/api/data/${data.type}/${data.id}`);
  } catch (err) {
    console.log(err);
  }
};

export const createRank = async (data) => {
  //check to see if user is valid
  try {
    console.log(data);
    await axios.post("/api/data", data);
  } catch (err) {
    console.log(err);
  }
};
