export const handleError = (error) => {
    console.error('API Error:', error);
    return error.response?.data || { message: 'Something went wrong' };
};