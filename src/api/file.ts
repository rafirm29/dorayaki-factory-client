import { AxiosInstance } from "axios"
import { FileResponse } from "../interface/file/Response"
export const Upload = (
  axios: AxiosInstance,
  file: File
): Promise<FileResponse> => {
  const formData = new FormData()
  formData.append("file", file)

  return axios
    .post("/api/file", formData)
    .then((response) => response.data as FileResponse)
}
