import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Search, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Mail, 
  Terminal,
  Activity
} from 'lucide-react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  
  // Terminal Logs State
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Simulation of "Real-time" Scanning Steps
  const simulateLoadingLogs = () => {
    const steps = [
      "Initializing Puppeteer Protocol...",
      "Connecting to headless browser instance...",
      "Navigating to target URL...",
      "Bypassing SSL/TLS verification...",
      "Waiting for network idle state...",
      "Capturing full-page viewport screenshot...",
      "Compressing image data (JPEG 70%)...",
      "Encoding Base64 payload...",
      "Connecting to Llama-4 Vision API...",
      "Analyzing semantic structure...",
      "Extracting business entities...",
      "Parsing JSON response...",
      "Finalizing data package..."
    ];

    let currentStep = 0;
    setLogs(["System Ready. Initiating Scan..."]);

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLogs(prev => [...prev, `> ${steps[currentStep]}`]);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return interval;
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setData(null);
    const logInterval = simulateLoadingLogs();

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { url });
      clearInterval(logInterval);
      setLogs(prev => [...prev, "✔ SCAN COMPLETE. DATA RETRIEVED."]);
      
      setTimeout(() => {
        setData(response.data);
        setLoading(false);
      }, 800);

    } catch (err) {
      clearInterval(logInterval);
      setLogs(prev => [...prev, "❌ CRITICAL ERROR: Connection Failed."]);
      setError(err.response?.data?.error || 'Failed to analyze website');
      setLoading(false);
    }
  };

  return (
    <div className="app-main">
      <div className="cyber-grid"></div>
      <div className="glow-overlay"></div>

      <div className="app-container">
        
        {/* HEADER */}
        <header className="header-section">
          <div className="system-badge">
            <span className="status-dot"></span>
            <span className="system-text">System Online</span>
          </div>
          
          <h1 className="main-title">SITE VISION AI</h1>
          <p className="subtitle">
            Autonomous web reconnaissance & structural data extraction.
          </p>
        </header>

        {/* INPUT SECTION */}
        <div className="search-container">
          <form onSubmit={handleAnalyze}>
            <div className="input-wrapper">
              <div className="input-icon">
                <Globe size={24} />
              </div>
              <input
                type="url"
                placeholder="Enter Target URL (https://...)"
                className="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="analyze-btn"
              >
                {loading ? <Activity className="spin" size={20} /> : <Search size={20} />}
                <span>ANALYZE</span>
              </button>
            </div>
          </form>
        </div>

        {/* LOADING TERMINAL */}
        {loading && (
          <div className="terminal-card">
            <div className="terminal-header">
              <Terminal size={14} />
              <span>Terminal Output</span>
            </div>
            <div className="terminal-body">
              {logs.map((log, index) => (
                <div key={index} className={`log-entry ${index === logs.length - 1 ? 'active cursor' : ''}`}>
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}

        {/* ERROR DISPLAY */}
        {error && (
          <div className="error-box">
            <ShieldCheck size={24} />
            <span>{error}</span>
          </div>
        )}

        {/* RESULTS GRID */}
        {data && !loading && (
          <div className="results-grid">
            
            {/* Business Identity Card */}
            <div className="glass-card card-identity">
              <span className="label-sm">Identified Entity</span>
              <h2 className="business-name">{data.business_name || "Unknown Entity"}</h2>
              <a href={data.url} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                {data.url} <Zap size={14} color="#06b6d4" />
              </a>
            </div>

            {/* About Section */}
            <div className="glass-card card-about">
              <div className="section-title">
                <ShieldCheck size={24} color="#06b6d4" />
                <h3>Mission / About</h3>
              </div>
              <p className="text-content">
                {data.about_section || "No descriptive data found in the neural scan."}
              </p>
            </div>

            {/* Contact Grid */}
            <div className="card-contacts">
              <div className="glass-card contact-item">
                <div className="icon-box"><Mail size={20} /></div>
                <div>
                  <span className="label-sm" style={{ marginBottom: '2px' }}>Email Protocol</span>
                  <span style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{data.contact?.email || "N/A"}</span>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="icon-box"><Phone size={20} style={{ color: '#a855f7' }} /></div>
                <div>
                  <span className="label-sm" style={{ marginBottom: '2px' }}>Comm Link</span>
                  <span>{data.contact?.phone || "N/A"}</span>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="icon-box"><MapPin size={20} style={{ color: '#ec4899' }} /></div>
                <div>
                  <span className="label-sm" style={{ marginBottom: '2px' }}>Coordinates</span>
                  <span style={{ fontSize: '0.9rem' }}>{data.contact?.address || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            {data.faq && data.faq.length > 0 && (
              <div className="card-faq-container">
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={28} color="#a855f7" />
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: '700' }}>Common Queries</h3>
                </div>
                
                <div className="faq-grid">
                  {data.faq.map((item, idx) => (
                    <div key={idx} className="faq-item">
                      <span className="faq-question"><span style={{ color: '#06b6d4' }}>Q.</span> {item.question}</span>
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Data */}
            {data.footer_text && (
               <div className="glass-card card-footer">
                  <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>FOOTER_DATA_STREAM: </span>
                  {data.footer_text.substring(0, 150)}...
               </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;