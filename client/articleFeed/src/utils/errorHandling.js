export const handleError = (error) => {
    return error.response?.data || { message: 'Something went wrong' };
};