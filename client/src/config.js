const config = {
    // Remove any trailing slashes from the API URL to prevent double slashes
    apiUrl: (process.env.REACT_APP_API_URL || 'https://jobmatchplatform-server.azurewebsites.net').replace(/\/$/, ''),
};

export default config;