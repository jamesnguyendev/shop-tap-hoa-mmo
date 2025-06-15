import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

apiClient.interceptors.request.use(
  (response) => response,
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);
export default apiClient;

// export async function fetchProducts() {
//   try {
//     const response = await apiClient.get("/homepage-products");
//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;
//     const errMessage =
//       err.response?.data.message || "Fail to fetch product data";

//     console.error("Fail to fetch product data: ", errMessage);
//     throw new Error(errMessage);
//   }
// }

// interface PostResponse {
//   body: [];
// }

// export async function searchProduct(data: unknown) {
//   try {
//     const res = (await postRequest(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/search` || "",
//       data,
//     )) as PostResponse;

//     if (res.body.length <= 0) return;
//     return res.body;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function postRequest<T = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios.post<T>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      ...config
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const errMessage =
      err.response?.data.message || 'Fail to Post Request data';

    throw new Error(errMessage);
  }
}

// interface FetchCommentParams {
//   productId: string;
//   parentId?: string;
//   page?: number;
//   size?: number;
//   asc?: boolean;
// }

// export const fetchComment = async (params: FetchCommentParams) => {
//   try {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_COMMENTS}`, {
//       params: {
//         productId: params.productId,
//         parentId: params.parentId,
//         page: params.page ?? 0,
//         size: params.size ?? 10,
//         asc: params.asc ?? true,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     throw error;
//   }
// };
