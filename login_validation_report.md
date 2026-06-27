# Login Validation Report

This report documents the investigation of the `422 Unprocessable Entity` error returned during login.

---

## 1. FastAPI Login Endpoint
- **File Path:** [router.py](file:///Users/test/Documents/simp/erp-backend/app/modules/identity/router.py#L48-L68)
- **Route:** `POST /api/v1/auth/login`
- **Controller function:**
  ```python
  @router.post(
      "/login",
      response_model=LoginResponse,
  )
  async def login(
      payload: LoginRequest,
      db: DBSession,
  ):
      try:
          return await AuthService.login(
              db,
              payload,
          )
      ...
  ```

---

## 2. Backend Expected Payload (Pydantic Model)
- **Pydantic Model:** `LoginRequest` in [schemas.py](file:///Users/test/Documents/simp/erp-backend/app/modules/identity/schemas.py#L11-L14)
- **Content-Type:** `application/json`
- **Required Fields:**
  * `username` (Type: `str`)
  * `password` (Type: `str`)
- **JSON Structure:**
  ```json
  {
    "username": "<string>",
    "password": "<string>"
  }
  ```

---

## 3. Frontend Actual Payload
The frontend was previously modified to send a URL-encoded form data payload:
- **File Path:** [auth.api.ts](file:///Users/test/Documents/simp/frontend/src/api/auth.api.ts) (prior state leading to 422)
- **Content-Type:** `application/x-www-form-urlencoded`
- **Payload Structure:**
  ```http
  username=<username>&password=<password>
  ```

---

## 4. Differences & Mismatches
1. **Content-Type Mismatch:** The backend expects `application/json`, but the frontend sent `application/x-www-form-urlencoded`.
2. **Body Structure Mismatch:** The backend expects a raw JSON string body, but the frontend sent a URL-encoded query-string format (`username=...&password=...`).

---

## 5. Why FastAPI Returns HTTP 422
FastAPI returns `422 Unprocessable Entity` when request body validation fails. 
Because the endpoint signature specifies `payload: LoginRequest` (where `LoginRequest` inherits from Pydantic's `BaseModel`), FastAPI expects a JSON object inside a raw request body. When the frontend sends `application/x-www-form-urlencoded` data, FastAPI's validation layer is unable to parse it into the expected `LoginRequest` Pydantic model, marking the required fields (`username` and `password`) as missing.

---

## 6. Required Changes & Minimal Fix
1. **Frontend Reversion:** Revert the login request in `frontend/src/api/auth.api.ts` to send raw JSON matching the `LoginRequest` interface, using `apiClient.post` without URL encoding.
   *(Note: The current file on disk has already been reverted to the correct implementation)*:
   ```typescript
   login: async (data: LoginRequest): Promise<LoginResponse> => {
     const res = await apiClient.post<LoginResponse>('/api/v1/auth/login', data);
     return res.data;
   }
   ```
2. **Backend Database Verification:** Ensure the database configuration in `.env` is correct and that the database is online, as sending a correct JSON request currently triggers a database-related `500 Internal Server Error` on the remote server.

---

## 7. Example Request & Response Payloads

### Example Valid JSON Request
- **Headers:**
  ```http
  POST /api/v1/auth/login HTTP/1.1
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "username": "example_user",
    "password": "secure_password_123"
  }
  ```

### Example Successful Response
- **Status:** `200 OK`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Body:**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2NjY2NjY2MtY2NjYy1jY2NjLWNjY2MtY2NjY2NjY2NjY2NjIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ...",
    "refresh_token": "e81d77a0-0b60-449e-ba78-2dfa6b61882d",
    "token_type": "bearer"
  }
  ```
