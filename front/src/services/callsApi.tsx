import api from "./axiosConfig";

/**
 * Gets the list whether filtered or not
 * 
 * @param search The search query
 * @returns { Promise<any> } The response
 */
const getAll = async (search: string): Promise<any> => {
  let params: any = {};
  if (search) params.q = search;
  const response = await api
    .get(`/users`, {
      headers: {
        Content: "multipart/form-data",
      },
      params,
    })
    .catch((response) => {
      throw response;
    });
  return response;
};

/**
 * Uploads the file
 *
 * @param { File } file The file we're uploading
 * @returns { Promise<any> } The response
 */
const uploadFile = async (file: any): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api
    .post(`/files`, formData, {
      headers: {
        Content: "multipart/form-data",
      },
    })
    .catch((response) => {
      throw response;
    });
  return response;
};

/**
 * Deletes the file stored
 * 
 * @returns { Promise<any> } The response
 */
const deleteFile =  async (): Promise<any> => {
  const response = await api
    .delete(`/files`)
    .catch((response) => {
      throw response;
    });
  return response;
}

const allMethods = {
  getAll,
  uploadFile,
  deleteFile
}
 
export default allMethods;
