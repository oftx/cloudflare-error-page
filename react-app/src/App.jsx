import React, { useState, useEffect } from 'react';
import ErrorPage from './components/ErrorPage';
import SuccessPage from './components/SuccessPage';
import { allPresets } from './config/presets';
import './styles/demo.css';

// Merge custom configuration with preset, but only allow specific fields to be overridden
function applyCustomConfig(preset, customConfig) {
  if (!customConfig || !preset.params) return preset;

  // Allowed top-level fields
  const allowedFields = [
    'domain',
    'html_title',
    'time',
    'ray_id',
    'client_ip'
  ];

  const customizedParams = { ...preset.params };

  // Merge allowed top-level fields
  allowedFields.forEach(field => {
    if (customConfig[field] !== undefined) {
      customizedParams[field] = customConfig[field];
    }
  });

  // Merge location fields from nested status objects
  // Only allow customizing the 'location' field within each status
  if (customConfig.browser_status?.location !== undefined) {
    customizedParams.browser_status = {
      ...customizedParams.browser_status,
      location: customConfig.browser_status.location
    };
  }

  if (customConfig.cloudflare_status?.location !== undefined) {
    customizedParams.cloudflare_status = {
      ...customizedParams.cloudflare_status,
      location: customConfig.cloudflare_status.location
    };
  }

  if (customConfig.host_status?.location !== undefined) {
    customizedParams.host_status = {
      ...customizedParams.host_status,
      location: customConfig.host_status.location
    };
  }

  // Allow customizing perf_sec_by (footer link)
  if (customConfig.perf_sec_by !== undefined) {
    customizedParams.perf_sec_by = {
      ...customizedParams.perf_sec_by,
      ...customConfig.perf_sec_by
    };
  }

  return {
    ...preset,
    params: customizedParams
  };
}

// Get custom configuration from environment variable
function getCustomConfig() {
  const envConfig = import.meta.env.VITE_CONFIG_JSON;
  if (envConfig) {
    try {
      const parsed = JSON.parse(envConfig);
      console.log("Loaded custom config from VITE_CONFIG_JSON:", parsed);
      return parsed;
    } catch (e) {
      console.error("Failed to parse VITE_CONFIG_JSON:", e);
    }
  }
  return null;
}

function App() {
  const [currentPreset, setCurrentPreset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [customConfig] = useState(getCustomConfig());

  useEffect(() => {
    // Randomly select a preset on mount
    const randomIndex = Math.floor(Math.random() * allPresets.length);
    const selectedPreset = allPresets[randomIndex];

    // Apply custom config if available
    const finalPreset = customConfig ? applyCustomConfig(selectedPreset, customConfig) : selectedPreset;
    setCurrentPreset(finalPreset);
  }, [customConfig]);

  if (!currentPreset) {
    return <div>Loading...</div>;
  }

  const filteredPresets = allPresets.filter(preset =>
    preset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preset.params?.error_code?.toString().includes(searchTerm)
  );

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * allPresets.length);
    const selectedPreset = allPresets[randomIndex];
    const finalPreset = customConfig ? applyCustomConfig(selectedPreset, customConfig) : selectedPreset;
    setCurrentPreset(finalPreset);
  };

  const handlePresetSelect = (preset) => {
    const finalPreset = customConfig ? applyCustomConfig(preset, customConfig) : preset;
    setCurrentPreset(finalPreset);
  };

  const getCategoryClass = (category) => {
    if (category === 'creative') return 'category-creative';
    if (category === 'success') return 'category-success';
    return 'category-standard';
  };

  return (
    <div>
      <div className="demo-controller-trigger"></div>
      <div className={`demo-controller ${isExpanded ? 'expanded' : ''}`}>
        <div className="demo-controller-header">
          <button
            className="demo-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? '▼' : '▶'} Scenario Controller
          </button>

          {/* Horizontal scrollable status codes */}
          <div className="demo-codes-scroll-container">
            <div className="demo-codes-list">
              {allPresets.map((preset) => (
                <button
                  key={preset.id}
                  className={`demo-code-btn ${getCategoryClass(preset.category)} ${currentPreset.id === preset.id ? 'active' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                  title={`${preset.id} - ${preset.params?.title || ''}`}
                >
                  {preset.params?.error_code || '200'}
                </button>
              ))}
            </div>
          </div>

          <button
            className="demo-random-btn"
            onClick={handleRandomize}
            title="Random scenario"
          >
            🎲 Random
          </button>
        </div>

        {isExpanded && (
          <div className="demo-controller-content">
            <div className="demo-search-box">
              <input
                type="text"
                placeholder="Search by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="demo-search-input"
              />
              {searchTerm && (
                <button
                  className="demo-clear-btn"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>


            <div className="demo-presets-grid">
              {filteredPresets.map((preset) => (
                <button
                  key={preset.id}
                  className={`demo-preset-btn ${getCategoryClass(preset.category)} ${currentPreset.id === preset.id ? 'active' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                  title={preset.params?.title || preset.id}
                >
                  <span className="demo-preset-code">{preset.params?.error_code || '---'}</span>
                  <span className="demo-preset-name">{preset.id}</span>
                  <span className={`demo-preset-category ${preset.category}`}>
                    {preset.category === 'creative' ? '✨' : preset.category === 'success' ? '✓' : '•'}
                  </span>
                </button>
              ))}
            </div>

            {filteredPresets.length === 0 && (
              <div className="demo-no-results">
                No scenarios found for "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>

      {currentPreset.type === 'success' ? (
        <SuccessPage />
      ) : (
        <ErrorPage params={currentPreset.params} />
      )}
    </div>
  );
}

export default App;

