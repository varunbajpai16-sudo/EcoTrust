# 🌱 EcoTrust — Environmental Intelligence Platform

> **Real-time environmental monitoring, CEMS telemetry verification, AI-powered validation, and compliance intelligence for industrial facilities.**

<p align="center">
  <a href="https://eco-trust-peach.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-EcoTrust-00c896?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/AI-LangGraph%20%7C%20LangChain-1C3C3C?style=for-the-badge" alt="AI">
</p>

<p align="center">
  <b>Turning environmental telemetry into trusted intelligence.</b>
</p>

---

## 🔗 Live Demo

**[🚀 Open EcoTrust](https://eco-trust-peach.vercel.app/)**

> The deployed demo showcases the EcoTrust environmental monitoring and audit dashboard with simulated CEMS telemetry.

---

## 📸 Screenshots

### 🌿 EcoTrust Loading Experience

<p align="center">
  <img src="assets/ecotrust-loading.png" alt="EcoTrust loading screen" width="100%">
</p>

### 🏠 Landing Page

<p align="center">
  <img src="assets/ecotrust-home.png" alt="EcoTrust landing page" width="100%">
</p>

### 📊 Audit Dashboard

<p align="center">
  <img src="assets/ecotrust-dashboard.png" alt="EcoTrust audit dashboard" width="100%">
</p>

### 📡 Live Monitoring Console

<p align="center">
  <img src="assets/ecotrust-live-monitoring.png" alt="EcoTrust live monitoring console" width="100%">
</p>

---

# 📌 Overview

**EcoTrust** is an environmental intelligence platform designed to make industrial emission data more **transparent, verifiable, and actionable**.

Traditional environmental monitoring systems primarily focus on collecting sensor readings. EcoTrust adds an intelligence and verification layer that analyzes telemetry, sensor health, historical behaviour, and compliance signals to determine whether reported environmental data can be trusted.

The platform is designed around a simple pipeline:

```text
CEMS Telemetry
      ↓
Data Validation
      ↓
Anomaly & Tamper Detection
      ↓
AI-Assisted Verification
      ↓
Trust & Compliance Score
      ↓
Alerts + Analytics + Reports
```

---

# 🎯 Problem

Industrial facilities generate continuous environmental telemetry through **Continuous Emission Monitoring Systems (CEMS)**.

However, raw telemetry alone does not answer important questions:

- Is the sensor behaving normally?
- Is the data complete and consistent?
- Is there a sudden unexplained emission spike?
- Could a sensor be faulty or tampered with?
- Does the historical behaviour match the current readings?
- Which facilities require immediate attention?

Manually reviewing large volumes of environmental telemetry is difficult.

**EcoTrust introduces a verification and intelligence layer on top of CEMS data.**

---

# 💡 Core Features

## 📡 Real-Time CEMS Monitoring

EcoTrust continuously processes environmental telemetry from connected facilities.

The monitoring system supports parameters such as:

- PM2.5
- PM10
- SO₂
- NOx
- CO
- Sensor/device status
- Power/operational signals

---

## 🛡️ Trust & Compliance Scoring

Each monitored facility receives a trust/compliance score based on available validation signals.

Example factors include:

| Signal | Purpose |
|---|---|
| Data Completeness | Checks whether expected telemetry is available |
| Data Consistency | Identifies inconsistent or unrealistic values |
| Sensor Reliability | Evaluates sensor behaviour |
| Temporal Stability | Detects unusual time-series behaviour |
| Validation History | Uses previous verification results |
| Operational Signals | Helps correlate reported activity with facility behaviour |

The goal is not simply to measure pollution, but to measure the **reliability of the environmental telemetry itself**.

---

## 🚨 Tamper & Fault Detection

EcoTrust classifies facility telemetry into statuses such as:

- 🟢 **Verified**
- 🟡 **Suspicious**
- 🔴 **Tampered / Faulty**

This makes it easier for environmental auditors to prioritize facilities that need investigation.

---

## 🗺️ Live Industrial Emission Geo-Grid

The dashboard provides a geospatial view of monitored facilities.

The map can display facility status across the monitored region and provides a quick visual overview of:

- Verified facilities
- Suspicious facilities
- Faulty/tampered facilities
- Active incidents
- Network status

The current demonstration uses **Meerut, Uttar Pradesh** as the monitored region.

---

## 🤖 AI Verification

EcoTrust is designed to use AI-assisted analysis for environmental telemetry verification.

The AI layer can analyze historical and contextual data to help identify patterns such as:

```text
Normal → Normal → Normal
                 ↓
          Sudden Spike
                 ↓
          Back to Normal
```

Possible explanations can then be investigated against available telemetry and historical behaviour.

The architecture is designed around:

- LangChain
- LangGraph
- RAG
- Vector databases
- AI agents

---

## 📊 Live Monitoring Console

The monitoring console provides a facility-by-facility view containing:

- Facility name
- Facility ID
- Verification status
- Trust score
- Sensor information
- Live validation status
- Cross-facility comparison

This provides auditors with a single workspace for monitoring the connected CEMS network.

---

## 🔔 Active Alerts

EcoTrust surfaces environmental and telemetry-related incidents such as:

- High pollutant levels
- Sudden emission spikes
- Sensor faults
- Suspicious telemetry
- Possible tampering
- Data validation failures

Alerts are categorized by severity so auditors can focus on unresolved incidents.

---

## 📄 Compliance & Reports

The platform is designed to support facility-level compliance workflows, including:

- Trust/compliance scores
- Historical telemetry
- Alert history
- Validation results
- Facility information
- Environmental reports

---

# 🧠 AI / Agentic Architecture

EcoTrust can be extended into a multi-step environmental investigation workflow.

```text
                    ┌─────────────────────┐
                    │     CEMS Sensors    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   CEMS Data Layer   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ EcoTrust Validation │
                    │       Engine        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Rule Checks       Historical Data   Sensor Health
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   AI Investigation  │
                    │ LangGraph / RAG     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Trust & Compliance  │
                    │       Score         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Dashboard / Alerts  │
                    │ Reports / Analytics │
                    └─────────────────────┘
```

---

# 🔄 Data Flow

```text
CEMS Sensor
    ↓
CEMS Server / Telemetry Source
    ↓
EcoTrust Poller
    ↓
Backend Validation
    ↓
MongoDB
    ↓
Historical Analysis
    ↓
AI Verification
    ↓
Trust Score
    ↓
Alerts + Dashboard + Reports
```

---

# 🧪 CEMS Simulation

For the hackathon/demo environment, EcoTrust can work with a simulated CEMS server that generates environmental readings.

The simulator can reproduce different scenarios:

### Normal

```text
PM2.5  → Stable
PM10   → Stable
SO₂    → Stable
NOx    → Stable
CO     → Stable
```

### Emission Spike

```text
Normal
   ↓
Normal
   ↓
🚨 Sudden spike
   ↓
Normal
```

### Suspicious Behaviour

```text
Repeated abnormal values
        +
Unexpected sensor behaviour
        +
Historical inconsistency
        ↓
    Suspicious
```

This allows the complete verification pipeline to be demonstrated without requiring physical CEMS hardware.

---

# 👥 User Roles

## 👨‍💼 Environmental Auditor / Government User

Designed for authorities responsible for environmental monitoring.

Possible capabilities:

- Monitor facilities
- View live CEMS telemetry
- Inspect alerts
- Review trust scores
- Investigate suspicious facilities
- Review compliance information
- Generate reports

## 🏭 Factory Owner

Designed for facility-level access.

Possible capabilities:

- View facility telemetry
- Monitor sensor status
- Review trust score
- Review historical data
- Access facility reports

---

# 🗺️ Demonstration Region

The current demo focuses on **Meerut, Uttar Pradesh**.

The application uses a geospatial dashboard to visualize connected industrial facilities and their verification states.

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Leaflet
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs

### AI / Intelligence

- LangChain
- LangGraph
- RAG
- Vector Database
- AI Agents

### Deployment

- Vercel
- Render
- MongoDB

---

# 📡 CEMS API

Example endpoints used by the CEMS layer:

### Get Factories

```http
GET /api/cems/factories
```

### Get Factory Sensors

```http
GET /api/cems/factories/:factoryId/sensors
```

### Get Latest Factory Reading

```http
GET /api/cems/factories/:factoryId/latest
```

### Get Factory Readings

```http
GET /api/cems/factories/:factoryId/readings
```

### Get Latest Sensor Reading

```http
GET /api/cems/sensors/:sensorId/latest
```

### Simulate Sensor Data

```http
POST /api/cems/sensors/:sensorId/simulate
```

### Area Compliance

```http
GET /api/cems/area-compliance
```

---

# 📂 Suggested Project Structure

```text
EcoTrust/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── jobs/
│   └── ...
│
├── cems-server/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── ...
│
├── assets/
│   ├── ecotrust-loading.png
│   ├── ecotrust-home.png
│   ├── ecotrust-dashboard.png
│   └── ecotrust-live-monitoring.png
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ecotrust.git
cd ecotrust
```

## 2. Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

### CEMS Server

```bash
cd ../cems-server
npm install
```

---

# 🔐 Environment Variables

Create the required `.env` files.

Example backend configuration:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CEMS_SERVER_URL=http://localhost:5001
```

If AI functionality is enabled:

```env
OPENAI_API_KEY=your_openai_api_key
```

> ⚠️ Never commit `.env` files or API keys to GitHub.

---

# ▶️ Run Locally

### Start CEMS Server

```bash
cd cems-server
npm run dev
```

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 📈 Future Improvements

- [ ] Real CEMS hardware integration
- [ ] WebSocket-based real-time telemetry
- [ ] Advanced anomaly detection
- [ ] Weather-data correlation
- [ ] Satellite pollution data
- [ ] Electricity-consumption correlation
- [ ] RAG-based environmental regulation assistant
- [ ] MCP integration
- [ ] Multi-agent investigation workflows
- [ ] Predictive pollution analytics
- [ ] Automated regulatory reports
- [ ] State-wide monitoring
- [ ] Mobile application

---

# 🏆 Hackathon Concept

EcoTrust combines multiple technologies into one environmental intelligence workflow:

```text
IoT / CEMS
    +
Real-Time Data
    +
Data Validation
    +
Anomaly Detection
    +
AI Agents
    +
RAG
    +
Geospatial Intelligence
    +
Compliance Analytics
```

The objective is to move from simply **collecting environmental data** to **verifying, understanding, and acting on that data**.

---

# 🌐 Live Application

### 🚀 [EcoTrust](https://eco-trust-peach.vercel.app/)

---

# 👨‍💻 Developer

**Varun Bajpai**

B.Tech Computer Science Engineering

Focused on:

- Full-Stack Development
- Backend Engineering
- AI Agents
- RAG Systems
- Distributed Systems
- Environmental Technology

---

<p align="center">
  <b>🌱 EcoTrust — Turning environmental data into trusted intelligence.</b>
</p>
