

## 🎯 Objective

This project is a backend service that:
- Accepts product/offer details and a CSV of leads.
- Scores each lead’s buying intent (High / Medium / Low) using:
  - Rule-based logic (Role relevance, Industry match, Data completeness).
  - AI reasoning via Gemini’s API.
- Provides results via API endpoints.

---

## ⚡ Live API Base URL

📡 The service is deployed at:  
`https://kuvaka-assesment.onrender.com/`

---

## ✅ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Suyashtiwary12/kuvaka-assesment.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   MONGO_URI=your_url
   PORT=3000
   ```

4. Start the server (development mode):
   ```bash
   npm start
   ```

---

## ⚙️ API Endpoints

### 1️⃣ Upload Offer

- **POST** `/api/offer`
- Body (JSON):
  ```json
  {
    "name": "AI Outreach Automation",
    "value_props": ["24/7 outreach", "6x more meetings"],
    "ideal_use_cases": ["B2B SaaS mid-market"]
  }
  ```

### 2️⃣ Upload Leads CSV

- **POST** `/api/leads/upload`
- Form-Data:
  | Key  | Type | Value |
  |------|------|-------|
  | file | File | Your leads.csv file |

### 3️⃣ Run Scoring Pipeline

- **POST** `/api/score`
- Response Example:
  ```json
  {
    "message": "Scoring completed",
    "scoredResults": [
      {
        "lead": { "name": "Ava Patel", "role": "Head of Growth", "company": "FlowMetrics" },
        "intent": "High",
        "score": 85,
        "reasoning": "Fits ICP SaaS mid-market and decision maker role."
      }
    ]
  }
  ```

### 4️⃣ Get Scored Results

- **GET** `/api/results`
- Response Example:
  ```json
  [
    {
      "lead": { "name": "Ava Patel", "role": "Head of Growth", "company": "FlowMetrics" },
      "intent": "High",
      "score": 85,
      "reasoning": "Fits ICP SaaS mid-market and decision maker role."
    }
  ]
  ```

### (Optional) 5️⃣ Export Results as CSV

- **GET** `/api/results/export`
- Returns: CSV file of results

---

## ✅ Rule Layer Scoring Logic

- **Role Relevance**:
  - Decision Maker (+20 points): CEO, Head of Growth, CTO
  - Influencer (+10 points): Manager, Lead
  - Else: 0 points

- **Industry Match**:
  - Exact ICP Match (+20 points)
  - Adjacent Industry (+10 points)
  - Else: 0 points

- **Data Completeness**:
  - All fields present (+10 points)

---

## 💡 AI Prompt Template

```plaintext
Given the following offer and lead, classify the lead's buying intent as High, Medium, or Low, and provide reasoning in 1–2 sentences.

Offer: { offer JSON }

Lead: { lead JSON }
```

- The AI response is analyzed for keywords "high", "medium", or "low", and mapped to points:
  - High → 50 points
  - Medium → 30 points
  - Low → 10 points

---


## 📌 Notes

- Currently uses GEMINI API for AI layer.

---

## 📄 License

MIT License
