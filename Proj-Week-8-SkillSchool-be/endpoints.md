# API Endpoints Documentation

## Admin Endpoints

### **POST /api/v1/admin/signup**
- **Description**: Register a new admin account.
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string (valid email)",
    "password": "string (min 8, max 24, at least one uppercase, lowercase, number, special character)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Account created"
    }
    ```
  - **403**: 
    ```json
    {
      "msg": "Email already in use"
    }
    ```
  - **403 (Validation Error)**:
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
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **POST /api/v1/admin/signin**
- **Description**: Login to admin account.
- **Request Body:**
  ```json
  {
    "email": "string (valid email)",
    "password": "string (min 8, max 24)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Login Success",
      "token": "string (JWT)"
    }
    ```
  - **403**: 
    ```json
    {
      "msg": "Password Incorrect"
    }
    ```
  - **403 (Validation Error)**:
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
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **GET /api/v1/admin/my-course**
- **Description**: Retrieve all courses created by the admin.
- **Headers:**
  - `Authorization: Bearer <JWT>`


- **Response:**
  - **200**:
    ```json
    {
      "msg": "List of your courses",
      "courses": [
        {
          "id": "string",
          "courseName": "string",
          "price": "number",
          "thumbnailUrl": "string (URL)",
          "description": "string"
        }
      ]
    }
    ```
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **POST /api/v1/admin/course**
- **Description**: Create a new course.
- **Headers:**
  - `Authorization: Bearer <JWT>`


- **Request Body:**
  ```json
  {
    "courseName": "string (min 3, max 75)",
    "price": "number",
    "thumbnailUrl": "string (valid URL)",
    "description": "string (max 250)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Course Created",
      "courseId": "string"
    }
    ```
  - **403 (Validation Error)**:
    ```json
    {
      "msg": "Invalid format",
      "err": [
        {
          "path": ["courseName"],
          "message": "At least 3 char (Zod Default message)"
        }
      ]
    }
    ```
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **PUT /api/v1/admin/course**
- **Description**: Update an existing course.
- **Headers:**
  - `Authorization: Bearer <JWT>`


- **Request Body:**
  ```json
  {
    "courseName": "string (min 3, max 75)",
    "price": "number",
    "thumbnailUrl": "string (valid URL)",
    "description": "string (max 250)",
    "courseId": "string (length 24)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Course Updated",
      "courseId": "string"
    }
    ```
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

## User Endpoints

### **POST /api/v1/user/signup**
- **Description**: Register a new user account.
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string (valid email)",
    "password": "string (min 6, max 24, at least one uppercase, lowercase, number, special character)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Account created"
    }
    ```
  - **403**: 
    ```json
    {
      "msg": "Email already in use"
    }
    ```
  - **403 (Validation Error)**:
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
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **POST /api/v1/user/signin**
- **Description**: Login to user account.
- **Request Body:**
  ```json
  {
    "email": "string (valid email)",
    "password": "string (min 6, max 24)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Login Success",
      "token": "string (JWT)"
    }
    ```
  - **403**: 
    ```json
    {
      "msg": "Password Incorrect"
    }
    ```
  - **403 (Validation Error)**:
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
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **GET /api/v1/user/my-course**
- **Description**: Retrieve all courses purchased by the user.
- **Headers:**
  - `Authorization: Bearer <JWT>`


- **Response:**
  - **200**:
    ```json
    {
      "msg": "Your purchased courses",
      "courseList": [
        {
          "id": "string",
          "courseName": "string",
          "price": "number",
          "thumbnailUrl": "string (URL)",
          "description": "string",
          "courseCreator": "string"
        }
      ]
    }
    ```
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

## Course Endpoints

### **POST /api/v1/course/purchase-course**
- **Description**: Purchase a course.
- **Headers:**
  - `Authorization: Bearer <JWT>`


- **Request Body:**
  ```json
  {
    "courseId": "string (length 24)"
  }
  ```
- **Response:**
  - **200**:
    ```json
    {
      "msg": "Course purchased",
      "purchaseId": "string"
    }
    ```
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```

### **GET /api/v1/course/all-course**
- **Description**: Retrieve the list of all courses.
- **Response:**
  - **200**:
    ```json
    {
      "msg": "List of All courses",
      "courseList": [
        {
          "id": "string",
          "courseName": "string",
          "price": "number",
          "thumbnailUrl": "string (URL)",
          "description": "string",
          "courseCreator": "string"
        }
      ]
    }
    ```
  - **500**:
    ```json
    {
      "msg": "Internal Server Error"
    }
    ```
