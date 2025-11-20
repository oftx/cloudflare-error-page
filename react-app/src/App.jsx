import React, { useState, useEffect } from 'react';
import ErrorPage from './components/ErrorPage';
import SuccessPage from './components/SuccessPage';
import { allPresets } from './config/presets';
import './styles/demo.css';

function App() {
  const [currentPreset, setCurrentPreset] = useState(null);

  useEffect(() => {
    // Randomly select a preset on mount
    const randomIndex = Math.floor(Math.random() * allPresets.length);
    setCurrentPreset(allPresets[randomIndex]);
  }, []);

  if (!currentPreset) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="demo-controller-trigger"></div>
      <div className="demo-controller">
        <span>Select Scenario:</span>
        {allPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setCurrentPreset(preset)}
            style={{ fontWeight: currentPreset.id === preset.id ? 'bold' : 'normal' }}
          >
            {preset.id}
          </button>
        ))}
        <button onClick={() => {
          const randomIndex = Math.floor(Math.random() * allPresets.length);
          setCurrentPreset(allPresets[randomIndex]);
        }}>
          Reroll (Random)
        </button>
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

