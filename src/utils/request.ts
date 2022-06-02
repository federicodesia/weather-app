export const request = async (
    baseUrl: string,
    path: string,
    queryParams: URLSearchParams
) => {
    const url = `${baseUrl}/${path}?${queryParams}`;
    return await fetch(url);
}