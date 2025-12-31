import { useState } from 'react';
import axios from 'axios';
import { Loader2, Search, CheckCircle } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { url });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Site Vision AI</h1>
          <p className="text-gray-500">Extract business data from any website using AI.</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="flex gap-2 mb-8 shadow-sm">
          <input
            type="url"
            placeholder="https://example.com"
            className="flex-1 p-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 rounded-r-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <h2 className="font-bold text-lg text-gray-800">
                {data.business_name || 'Analysis Result'}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              
              {/* About Section */}
              <section>
                <h3 className="text-sm uppercase tracking-wide text-gray-400 font-bold mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  {data.about_section || 'No about section detected.'}
                </p>
              </section>

              {/* Contact Info */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-xs font-bold text-gray-400 block">Email</span>
                  <span className="text-sm text-gray-800 break-all">{data.contact?.email || 'N/A'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-xs font-bold text-gray-400 block">Phone</span>
                  <span className="text-sm text-gray-800">{data.contact?.phone || 'N/A'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-xs font-bold text-gray-400 block">Address</span>
                  <span className="text-sm text-gray-800">{data.contact?.address || 'N/A'}</span>
                </div>
              </section>

              {/* FAQ Section */}
              {data.faq && data.faq.length > 0 && (
                <section>
                  <h3 className="text-sm uppercase tracking-wide text-gray-400 font-bold mb-3">FAQ</h3>
                  <div className="space-y-3">
                    {data.faq.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <p className="font-semibold text-gray-800 mb-1">Q: {item.question}</p>
                        <p className="text-gray-600 text-sm">A: {item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Raw JSON View (Optional) */}
              <details className="mt-4 text-xs text-gray-400">
                <summary className="cursor-pointer hover:text-gray-600">View Raw JSON</summary>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-2 overflow-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;