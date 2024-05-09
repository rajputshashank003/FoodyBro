import axios from "axios";

export const getAll = async () => {
    const response =  await axios.get(`/api/foods`);
    return response;
}

export const getAllTags = async () => {
    const response =  await axios.get("/api/foods/tags");
    return response;
}

export const getAllByTag = async (tag) => {
    const response = tag.toLocaleLowerCase() == "all" ?
        getAll() 
        :
        await axios.get("/api/foods/tags/" + tag);
    return response;
}

export const searchFood = async (searchTerm) => {
    const response = await axios.get("/api/foods/search/" + searchTerm);
    return response;
}

export const foodById = async (id) => {
    const response = await axios.get("api/foods/" + id);
    return response;
}