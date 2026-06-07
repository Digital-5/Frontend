import client from './client';

export const postRequest = async <TBody, TResponse>(
  endpoint: string,
  body: TBody
): Promise<TResponse> => {
  try {
    const { data } = await client.post<TResponse>(endpoint, body);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};