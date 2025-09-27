// Setup file for Jest tests
// You can add global setup here if needed

jest.setTimeout(30000); // Increase timeout for DB operations

// Set mock environment variables for testing
process.env.GOOGLE_CLIENT_ID = 'test-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret';
process.env.GITHUB_CLIENT_ID = 'test-github-id';
process.env.GITHUB_CLIENT_SECRET = 'test-github-secret';
process.env.JWT_PRIVATE_KEY = 'test-jwt-key';
process.env.SALT = '10';
process.env.BASE_URL = 'http://localhost:8080';
process.env.CLIENT_URL = 'http://localhost:3000';
