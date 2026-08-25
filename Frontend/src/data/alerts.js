// Single source of truth for alert + investigation data.
// Alerts.jsx renders the list from `alerts`; SensorInvestigation.jsx looks
// up one entry by `id` (from the URL) to render its detail view.
//
// `electricityMWh` / `expectedMin` / `expectedMax` are only present on
// combustion-emission parameters (PM2.5, CO2, NOx) — that's where the
// power-draw cross-check applies. Temperature/AQI/CEMS-connectivity alerts
// don't get those fields, and the Investigation page adapts its layout
// when they're missing.

export const alerts = [
  {
    id: 'ALT-2048',
    title: 'Critical PM2.5 Level',
    description: 'PM2.5 concentration exceeded the configured emission threshold.',
    parameter: 'PM2.5',
    value: '84.7 µg/m³',
    limit: '60 µg/m³',
    plant: 'Plant A',
    unit: 'Unit 2',
    location: 'Delhi NCR',
    time: '2 min ago',
    severity: 'Critical',
    status: 'Active',

    trustScore: 38,
    electricityMWh: 340,
    expectedMin: 55,
    expectedMax: 65,
    readingUnit: 'µg/m³',
    reportedValue: 84.7,
    history: [58, 62, 66, 71, 76, 80, 83, 84.7],
    anomalyLog: [
      { time: '2 min ago', text: 'PM2.5 reading is 30% above the electricity-based expected maximum (65 µg/m³).' },
      { time: '18 min ago', text: 'Reading climbed steadily for 20 minutes with no matching rise in power draw.' },
    ],
  },
  {
    id: 'ALT-2047',
    title: 'CO₂ Level Warning',
    description: 'CO₂ concentration is approaching the configured warning threshold.',
    parameter: 'CO₂',
    value: '874.2 ppm',
    limit: '1000 ppm',
    plant: 'Plant B',
    unit: 'Unit 1',
    location: 'Uttar Pradesh',
    time: '15 min ago',
    severity: 'Warning',
    status: 'Active',

    trustScore: 64,
    electricityMWh: 210,
    expectedMin: 800,
    expectedMax: 900,
    readingUnit: 'ppm',
    reportedValue: 874.2,
    history: [790, 810, 828, 845, 858, 866, 870, 874.2],
    anomalyLog: [
      { time: '15 min ago', text: 'CO₂ is within the electricity-expected range but trending toward the upper bound.' },
      { time: '2 hours ago', text: 'No anomalies — sensor tracking power draw as expected.' },
    ],
  },
  {
    id: 'ALT-2046',
    title: 'Temperature Threshold',
    description: 'Stack temperature has remained above the recommended operating range.',
    parameter: 'Temperature',
    value: '47.2 °C',
    limit: '45 °C',
    plant: 'Plant C',
    unit: 'Unit 3',
    location: 'Maharashtra',
    time: '42 min ago',
    severity: 'Warning',
    status: 'Active',

    trustScore: 70,
    readingUnit: '°C',
    reportedValue: 47.2,
    history: [44.1, 44.8, 45.3, 45.9, 46.4, 46.8, 47.0, 47.2],
    anomalyLog: [
      { time: '42 min ago', text: 'Stack temperature has stayed above the 45°C limit for 40+ minutes.' },
      { time: '3 hours ago', text: 'No electricity cross-check applies to this parameter — flagged on threshold alone.' },
    ],
  },
  {
    id: 'ALT-2045',
    title: 'Low AQI Risk',
    description: 'Air quality indicator has entered the configured risk range.',
    parameter: 'AQI',
    value: '156',
    limit: '150',
    plant: 'Plant D',
    unit: 'Unit 1',
    location: 'Rajasthan',
    time: '1 hour ago',
    severity: 'Warning',
    status: 'Acknowledged',

    trustScore: 58,
    readingUnit: 'AQI',
    reportedValue: 156,
    history: [138, 142, 145, 148, 151, 153, 155, 156],
    anomalyLog: [
      { time: '1 hour ago', text: 'AQI crossed the configured risk threshold of 150.' },
      { time: '1 hour ago', text: 'Acknowledged by Officer Sharma — pending follow-up inspection.' },
    ],
  },
  {
    id: 'ALT-2044',
    title: 'NOx Level Normalized',
    description: 'NOx concentration has returned to the acceptable operating range.',
    parameter: 'NOx',
    value: '18.7 ppb',
    limit: '100 ppb',
    plant: 'Plant A',
    unit: 'Unit 1',
    location: 'Delhi NCR',
    time: '2 hours ago',
    severity: 'Normal',
    status: 'Resolved',

    trustScore: 92,
    electricityMWh: 190,
    expectedMin: 15,
    expectedMax: 22,
    readingUnit: 'ppb',
    reportedValue: 18.7,
    history: [26, 24, 22, 21, 20, 19.5, 19, 18.7],
    anomalyLog: [
      { time: '2 hours ago', text: 'Reading is well within the electricity-expected range (15–22 ppb) — sensor considered reliable.' },
    ],
  },
  {
    id: 'ALT-2043',
    title: 'Sensor Communication Lost',
    description: 'No data has been received from the environmental sensor.',
    parameter: 'CEMS',
    value: 'Offline',
    limit: 'Online',
    plant: 'Plant B',
    unit: 'Unit 4',
    location: 'Uttar Pradesh',
    time: '3 hours ago',
    severity: 'Critical',
    status: 'Resolved',

    trustScore: 20,
    readingUnit: '',
    reportedValue: null,
    history: [],
    anomalyLog: [
      { time: '3 hours ago', text: 'Sensor stopped transmitting for 47 minutes — no readings received.' },
      { time: '2 hours ago', text: 'Connection restored; investigating cause of outage before re-establishing trust score.' },
    ],
  },
];

export const getAlertById = (id) => alerts.find((a) => a.id === id);
