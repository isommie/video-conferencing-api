# **Video Conferencing API**

A video-conferencing API built using **Node.js**, **Express**, and **WebRTC**. This API handles live video streaming, room creation, and user authentication. It uses **Socket.io** for real-time communication and **MongoDB** for data storage.

---

## **Features**
1. **User Authentication**:
   - Register and login with username and password.
   - JWT-based authentication for secure API access.

2. **Room Management**:
   - Create unique rooms for video conferencing.
   - Join existing rooms using a room ID.

3. **WebRTC Signaling**:
   - Real-time peer-to-peer communication using WebRTC.
   - Handle user connections and disconnections.

4. **Scalable**:
   - Built with modular architecture for easy scaling.
   - Uses MongoDB for persistent storage.

---

## **Technologies Used**
- **Backend**: Node.js, Express
- **Real-Time Communication**: Socket.io, WebRTC
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Dependencies**: mongoose, uuid, dotenv, cors

---

## **Setup and Installation**

### **Prerequisites**
1. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **Git**: Install Git from [git-scm.com](https://git-scm.com/).

### **Steps to Run the Project**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/isommie/video-conferencing-api.git
   cd video-conferencing-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Start the Server**:
   - For development (with hot-reloading):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

5. **Test the API**:
   - Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the API endpoints.

---

## **API Endpoints**
   - Example API requests are provided below.
### **Authentication**
- **Register a New User**:
  ```
  POST /api/auth/register
  Body: { "username": "testuser", "password": "testpassword" }
  ```

- **Login**:
  ```
  POST /api/auth/login
  Body: { "username": "testuser", "password": "testpassword" }
  ```

### **Room Management**
- **Create a New Room**:
  ```
  POST /api/rooms/create
  Headers: { "Authorization": "Bearer <JWT_TOKEN>" }
  ```

### **WebRTC Signaling**
- WebRTC signaling is handled via **Socket.io**. Use the following events:
  - `join-room`: Join a room with a room ID and user ID.
  - `user-connected`: Notify other users when a new user joins.
  - `user-disconnected`: Notify other users when a user leaves.

---

## **Running the Project in Production**
1. **Build the Project**:
   - Ensure all dependencies are installed:
     ```bash
     npm install --production
     ```

2. **Set Environment Variables**:
   - Update the `.env` file with production values (e.g., MongoDB Atlas URI).

3. **Start the Server**:
   ```bash
   npm start
   ```

4. **Deploy**:
The API is deployed to a publicly accessible endpoint using [Render](https://render.com). You can access the live API here:

**Live API URL:** [https://www.render.com](https://www.render.com)

---

## **Contributing**
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License.

---

## **Acknowledgments**
- [WebRTC](https://webrtc.org/) for peer-to-peer communication.
- [Socket.io](https://socket.io/) for real-time signaling.
- [Express](https://expressjs.com/) for building the API.
- [Mongoose](https://mongoosejs.com/) for modeling and querying MongoDB.
- [JWT](https://jwt.io/) for authentication.
- [Nodemon](https://nodemon.io/) for hot-reload
