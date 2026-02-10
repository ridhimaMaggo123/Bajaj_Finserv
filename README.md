# Qualifier 1 - REST API Service

This is a REST API service developed for Chitkara University's Qualifier 1 challenge. The service provides various mathematical operations and AI-powered responses through a clean API interface.

## Features

- **Fibonacci Sequence**: Generate Fibonacci sequence up to n terms
- **Prime Numbers**: Filter prime numbers from a list
- **LCM Calculation**: Calculate Least Common Multiple of numbers
- **HCF Calculation**: Calculate Highest Common Factor of numbers
- **AI Integration**: Get AI-powered responses to questions
- **Health Check**: Verify API status

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- Google Gemini API key (for AI functionality)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Create and activate a virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Running the Application

### Development

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Production

For production, use a production-ready server like Uvicorn with Gunicorn:

```bash
pip install gunicorn
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## API Documentation

Once the server is running, access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### POST /bfhl

Process various mathematical operations and AI queries.

**Request Body Examples:**

1. Fibonacci:
   ```json
   {
     "fibonacci": 7
   }
   ```

2. Prime Numbers:
   ```json
   {
     "prime": [2, 4, 7, 9, 11]
   }
   ```

3. LCM:
   ```json
   {
     "lcm": [12, 18, 24]
   }
   ```

4. HCF:
   ```json
   {
     "hcf": [24, 36, 60]
   }
   ```

5. AI Question:
   ```json
   {
     "AI": "What is the capital city of Maharashtra?"
   }
   ```

### GET /health

Check API health status.

**Response:**
```json
{
  "is_success": true,
  "official_email": "aakash.maggo@chitkara.edu.in"
}
```

## Error Handling

All error responses follow this format:
```json
{
  "is_success": false,
  "error": "Error message",
  "official_email": "aakash.maggo@chitkara.edu.in"
}
```

## Testing

To run tests:

```bash
# Install test dependencies
pip install pytest httpx

# Run tests
pytest
```

## Deployment

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` and follow the prompts
3. Set environment variables in Vercel dashboard

### Railway
1. Create a new project on Railway
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Set environment variables
6. Deploy

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Port to run the server on | No (default: 8000) |

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
