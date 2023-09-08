import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://182.253.225.226:8000',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
      config.headers['Content-Type'] = 'application/json';
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('REFRESH_TOKEN')

      if (refreshToken) {
        axios.post('http://182.253.225.226:8000/refresh', { refresh_token: refreshToken })
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              localStorage.setItem('ACCESS_TOKEN', response.data.access_token)
              axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`
              axiosInstance.defaults.headers['Content-Type'] = 'application/json';
              return axiosInstance(error.config)
            } else if (response.status === 401) {
              localStorage.removeItem('ACCESS_TOKEN')
              localStorage.removeItem('REFRESH_TOKEN')
              localStorage.removeItem('USER_ID')
              localStorage.removeItem('ROLE')
              window.location.href = '/login'
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;