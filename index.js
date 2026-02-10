require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const lcm = (a, b) => (a * b) / gcd(a, b);

const calculateHCF = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length < 2) {
    throw new Error('At least two numbers are required for HCF calculation');
  }
  return numbers.reduce((a, b) => gcd(a, b));
};

const calculateLCM = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length < 2) {
    throw new Error('At least two numbers are required for LCM calculation');
  }
  return numbers.reduce((a, b) => lcm(a, b));
};

const generateFibonacci = (n) => {
  const fib = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      fib.push(0);
    } else if (i === 1) {
      fib.push(1);
    } else {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
  }
  return fib;
};

const getAIResponse = async (question) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const headers = {
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  };
  
  const data = {
    model: 'llama-3.3-70b-versatile',
    messages: [{
      role: 'user',
      content: `Respond with ONLY a single word or number to: ${question}`
    }],
    max_tokens: 10,
    temperature: 0
  };

  try {
    const response = await axios.post(url, data, { headers });
    const text = response.data.choices[0].message.content.trim();
    return text.split(/\s+/)[0];
  } catch (error) {
    throw new Error('Failed to get AI response from Groq');
  }
};

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Qualifier 1 API',
    endpoints: {
      'GET /': 'API information',
      'GET /health': 'Health check',
      'POST /bfhl': 'Process mathematical operations and AI queries',
    },
    official_email: 'ridhima3915.beai23@chitkara.edu.in'
  });
});

app.get('/health', (req, res) => {
  res.json({
    is_success: true,
    official_email: 'ridhima3915.beai23@chitkara.edu.in'
  });
});

app.post('/bfhl', [
  body().custom((value, { req }) => {
    const keys = Object.keys(req.body);
    const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
    
    if (keys.length !== 1) {
      throw new Error('Request must contain exactly one key');
    }
    
    if (!validKeys.includes(keys[0])) {
      throw new Error('Invalid key. Must be one of: fibonacci, prime, lcm, hcf, AI');
    }
    
    return true;
  }),
  body('fibonacci').optional().isInt({ min: 1, max: 1000 }),
  body('prime').optional().isArray({ min: 1, max: 1000 }),
  body('lcm').optional().isArray({ min: 2, max: 100 }),
  body('hcf').optional().isArray({ min: 2, max: 100 }),
  body('AI').optional().isString().isLength({ min: 1, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        is_success: false,
        official_email: 'ridhima3915.beai23@chitkara.edu.in'
      });
    }

    const { fibonacci, prime, lcm: lcmNumbers, hcf: hcfNumbers, AI } = req.body;
    let result;

    if (fibonacci !== undefined) {
      result = generateFibonacci(fibonacci);
    } else if (prime !== undefined) {
      if (!prime.every(num => typeof num === 'number' && Number.isInteger(num))) {
        return res.status(400).json({
          is_success: false,
          official_email: 'ridhima3915.beai23@chitkara.edu.in'
        });
      }
      result = prime.filter(num => isPrime(Number(num)));
    } else if (lcmNumbers !== undefined) {
      if (!lcmNumbers.every(num => typeof num === 'number' && Number.isInteger(num) && num > 0)) {
        return res.status(400).json({
          is_success: false,
          official_email: 'ridhima3915.beai23@chitkara.edu.in'
        });
      }
      result = calculateLCM(lcmNumbers.map(Number));
    } else if (hcfNumbers !== undefined) {
      if (!hcfNumbers.every(num => typeof num === 'number' && Number.isInteger(num) && num > 0)) {
        return res.status(400).json({
          is_success: false,
          official_email: 'ridhima3915.beai23@chitkara.edu.in'
        });
      }
      result = calculateHCF(hcfNumbers.map(Number));
    } else if (AI !== undefined) {
      result = await getAIResponse(AI);
    }

    res.json({
      is_success: true,
      official_email: 'ridhima3915.beai23@chitkara.edu.in',
      data: result
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({
      is_success: false,
      official_email: 'ridhima3915.beai23@chitkara.edu.in'
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    official_email: 'ridhima3915.beai23@chitkara.edu.in'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
