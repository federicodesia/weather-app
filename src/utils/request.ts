export const request = async (
    baseUrl: string,
    path: string,
    queryParams: URLSearchParams
) => {
    const url = `${baseUrl}/${path}?${queryParams}`;
    const response = await fetch(url);
    return await response.json();
}