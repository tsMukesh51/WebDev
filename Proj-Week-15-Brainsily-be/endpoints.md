# API Endpoints Documentation

## **User Authentication**

### **POST /api/v1/signup**
- **Description**: Creates a new user account.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Account created"
    }
    ```
  - **409**: 
    ```json
    {
      "msg": "Account already exists"
    }
    ```
  - **400**:
    ```json
    {
      "msg": "Invalid format",
      "err": [
        {
          "path": ["password"],
          "message": "At least one uppercase, lowercase, number, and special character"
        }
      ]
    }
    ```

### **POST /api/v1/signin**
- **Description**: Authenticates a user and provides a JWT.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Login successful"
    }
    ```
  - **404**: 
    ```json
    {
      "msg": "Account does not exist"
    }
    ```
  - **401**: 
    ```json
    {
      "msg": "Wrong credentials"
    }
    ```
  - **400**:
    ```json
    {
      "msg": "Invalid format",
      "err": [
        {
          "path": ["password"],
          "message": "At least one uppercase, lowercase, number, and special character"
        }
      ]
    }
    ```

## **Content Management**

### **GET /api/v1/content**
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Description**: Fetches the authenticated user's saved content.
- **Responses**:
  - **200**:
    ```json
    {
      "msg": "List of contents"
    }
    ```
  - **403**:
    ```json
    {
      "msg": "Authentication Error"
    }
    ```

### **POST /api/v1/content**
- **Headers:**
  - `Authorization: Bearer <JWT>`
  
- **Request Body**:
  ```json
  {
    "contentFormat": "text | tweet | ytvid | link",
    "body": "string",
    "title": "string"
  }
  ```
- **Responses**:
  - **201**:
    ```json
    {
      "msg": "Content created"
    }
    ```
  - **400**:
    ```json
    {
      "msg": "Invalid format"
    }
    ```

### **DELETE /api/v1/content/:contentId**
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Responses**:
  - **200**:
    ```json
    {
      "msg": "Content deleted"
    }
    ```
  - **404**:
    ```json
    {
      "msg": "Content not found"
    }
    ```

## **Brain Sharing**

### **POST /api/v1/brain/share**
- **Description**: Makes user brain content public or private.
- **Headers**:
  - `Authorization: Bearer <JWT>`
- **Request Body**:
  ```json
  {
    "isShared": true | false
  }
  ```
- **Responses**:
  - `200`: Share link created
  - `200`: Share link disabled
  - **200**:
    ```json
    {
      "msg": "Share link created"
      "sharedLink": sharedLinkId
    }
    ```
    ```json
    {
      "msg": "Share link disabled"
    }
    ```

### **GET /api/v1/brain/:shareLink**
- **Description**: Retrieves content from a shared brain.
- **Responses**:
  - **200**:
    ```json
    {
      "msg": "List of contents"
      "contents": content[]
    }
    ```
  - **401**:
    ```json
    {
      "msg": "Brain is private"
    }
    ```