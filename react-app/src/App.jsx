import React, { useState, useEffect } from 'react';
import ErrorPage from './components/ErrorPage';
import SuccessPage from './components/SuccessPage';
import { allPresets } from './config/presets';
import './styles/demo.css';

function App() {
  const [currentPreset, setCurrentPreset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Randomly select a preset on mount
    const randomIndex = Math.floor(Math.random() * allPresets.length);
    setCurrentPreset(allPresets[randomIndex]);
  }, []);

  if (!currentPreset) {
    return <div>Loading...</div>;
  }

  const filteredPresets = allPresets.filter(preset =>
    preset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preset.params?.error_code?.toString().includes(searchTerm)
  );

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * allPresets.length);
    setCurrentPreset(allPresets[randomIndex]);
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
                  onClick={() => setCurrentPreset(preset)}
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
                  onClick={() => setCurrentPreset(preset)}
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

