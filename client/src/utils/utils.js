import dayjs from 'dayjs';

export const formatDate = (date) => {
    return dayjs(date).format('DD-MM-YYYY')
  };

export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const expiryTime = decodedPayload.exp * 1000;
  
    return expiryTime < Date.now();
  };