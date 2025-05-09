import React, { useState } from 'react';
import fertilizerData from '../csv/fertilizer.json'; // Assuming you have the fertilizer data in a JSON file
import './Fertilizer.css'; // Import your CSS file

const FertilizerComponent = () => {
  const [userInput, setUserInput] = useState({ N: 0, P: 0, K: 0, pH: 0.0 }); // Default pH value set to 7.0
  const [recommendedFertilizer, setRecommendedFertilizer] = useState('');
  const [recommendedCrop, setRecommendedCrop] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);

  // Function to calculate similarity score between user input and fertilizer data
  const calculateSimilarityScore = (input, data) => {
    const nDiff = Math.abs(input.N - data.N);
    const pDiff = Math.abs(input.P - data.P);
    const kDiff = Math.abs(input.K - data.K);
    const phDiff = Math.abs(input.pH - data.pH);
    
    // Calculate weighted score (lower is better)
    // Weights: N: 30%, P: 30%, K: 30%, pH: 10%
    return (nDiff * 0.3) + (pDiff * 0.3) + (kDiff * 0.3) + (phDiff * 0.1);
  };

  // Function to recommend fertilizer based on user inputs
  const recommendFertilizer = () => {
    const { N, P, K, pH } = userInput;
    
    // Find the best matching fertilizer
    let bestMatch = null;
    let lowestScore = Infinity;
    
    fertilizerData.forEach(entry => {
      const score = calculateSimilarityScore({ N, P, K, pH }, entry);
      if (score < lowestScore) {
        lowestScore = score;
        bestMatch = entry;
      }
    });

    if (bestMatch) {
      setRecommendedFertilizer(bestMatch.Fertilizer);
      setRecommendedCrop(bestMatch.Crop);
      setSimilarityScore((1 - lowestScore) * 100); // Convert to percentage match
    } else {
      setRecommendedFertilizer('No matching fertilizer found');
      setRecommendedCrop('');
      setSimilarityScore(null);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserInput(prevState => ({ ...prevState, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="fertilizer-container">
      <h2 className="fertilizer-title">Fertilizer Recommendations</h2>
      <form className="fertilizer-form" onSubmit={e => { e.preventDefault(); recommendFertilizer(); }}>
        <div className="input-group">
          <label>
            Nitrogen (N):
            <input 
              type="number" 
              name="N" 
              value={userInput.N} 
              onChange={handleInputChange}
              min="0"
              max="3"
              step="0.1"
              placeholder="Enter N value (0-3)"
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Phosphorus (P):
            <input 
              type="number" 
              name="P" 
              value={userInput.P} 
              onChange={handleInputChange}
              min="0"
              max="3"
              step="0.1"
              placeholder="Enter P value (0-3)"
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Potassium (K):
            <input 
              type="number" 
              name="K" 
              value={userInput.K} 
              onChange={handleInputChange}
              min="0"
              max="3"
              step="0.1"
              placeholder="Enter K value (0-3)"
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Soil pH:
            <input 
              type="number" 
              name="pH" 
              value={userInput.pH} 
              onChange={handleInputChange}
              min="5.0"
              max="8.0"
              step="0.1"
              placeholder="Enter pH value (5.0-8.0)"
            />
          </label>
        </div>
        <button type="submit" className="recommend-button">Get Recommendation</button>
      </form>
      
      {recommendedFertilizer && (
        <div className="recommendation-result">
          <h3>Recommendation Results</h3>
          <p><strong>Recommended Fertilizer:</strong> {recommendedFertilizer}</p>
          {recommendedCrop && <p><strong>Best Suited For:</strong> {recommendedCrop}</p>}
          {similarityScore && (
            <p><strong>Match Score:</strong> {similarityScore.toFixed(1)}%</p>
          )}
          <div className="recommendation-details">
            <h4>Fertilizer Details:</h4>
            <p>The recommended fertilizer is based on your soil's nutrient levels and pH value. 
               The match score indicates how well the fertilizer matches your soil conditions.</p>
            <p>For optimal results, consider:</p>
            <ul>
              <li>Applying the fertilizer during the recommended growing season</li>
              <li>Following the manufacturer's application instructions</li>
              <li>Regular soil testing to monitor nutrient levels</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerComponent;
