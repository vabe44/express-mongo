1. Install dependencies: 'npm install'
2. Change config file if needed (db url, jwt secret, port, etc.): .env file
3. Start server: 'npm start'
4. Use postman collection to test the API in docs folder
    - register user first
    - login with registered user, get JWT back if successful
    - use the JWT in the request header to access protected routes