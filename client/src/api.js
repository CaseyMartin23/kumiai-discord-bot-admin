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
    const res = await axios.put("/api/data", updatedData);

    console.log("res->", res);
    // return
  } catch (err) {
    console.log(err);
  }
};
