import { useState } from 'react';
import CardPreview from './components/CardPreview';
import { generateChristmasCard, isReplicateConfigured } from './api/replicate';
import './App.css';

function App() {
  const [message, setMessage] = useState('With love and gratitude!');
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFont, setSelectedFont] = useState('classic');

  const handleGenerate = async () => {
    if (!imagePrompt.trim()) {
      setError('Please describe what you want in your Christmas card!');
      return;
    }

    if (!isReplicateConfigured()) {
      setError('Please configure your Replicate API key and style images in the .env file');
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const imageUrl = await generateChristmasCard(imagePrompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePurchase = () => {
    if (!generatedImage) {
      alert('⚠️ Please generate a card first!');
      return;
    }

    alert(
      '🎄 Purchase Complete! (Demo Mode)\n\n' +
      'Price: $1.00\n\n' +
      'You would receive:\n' +
      '• High-resolution Christmas card image\n' +
      '• Print-ready PDF file\n' +
      '• Digital version for sharing\n\n' +
      '(Connect Stripe for real payments)'
    );
  };

  const examplePrompts = [
    'Snowman with presents in a snowy forest',
    'Cozy fireplace with stockings and a Christmas tree',
    'Reindeer flying over a winter village',
    'Santa\'s workshop with elves and toys',
  ];

  const fontOptions = [
    { id: 'classic', name: 'Classic', fontFamily: '"Google Sans Code", monospace'},
    { id: 'digital', name: 'Digital', fontFamily: '"Courier New", monospace' },
    { id: 'simple', name: 'Vintage', fontFamily: '"Grenze Gotisch", serif' },
    { id: 'elegant', name: 'Elegant', fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
    { id: 'y2k', name: 'Y2K', fontFamily: '"Comic Sans MS", "Comic Sans", cursive' },
    { id: 'fancy', name: 'Fancy', fontFamily: '"Dancing Script", cursive' },
    { id: 'formal', name: 'Formal', fontFamily: '"Times New Roman", Times, serif' },
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Christmas Card Generator</h1>
        <p className="app-subtitle">Create magical Christmas cards in your unique art style</p>
      </header>

      {/* Main Content - Split Screen */}
      <main className="main-content">
        {/* LEFT: Controls */}
        <div className="controls-section">
          <div className="controls-card">
            <h2 className="section-title">Design Your Card</h2>

            <div className="form-group">
              <label className="form-label">Your Message</label>
              <div className="textarea-wrapper">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="2"
                  className="form-textarea"
                  placeholder="e.g., Merry Christmas, Mom! Love you!"
                  maxLength={100}
                  style={{ fontFamily: fontOptions.find(f => f.id === selectedFont)?.fontFamily }}
                />
                <span className="char-count">{message.length}/100</span>
              </div>

              {/* Font Selector */}
              <div className="font-selector">
                <div className="font-options">
                  {fontOptions.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`font-option-button ${selectedFont === font.id ? 'active' : ''}`}
                      style={{ fontFamily: font.fontFamily }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Describe Your Image</label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows="3"
                className="form-textarea"
                placeholder="e.g., snowman with presents in a snowy forest"
              />
              <p className="form-hint">Be creative! Describe the Christmas scene you imagine</p>
            </div>

            {/* Example Prompts */}
            <div className="example-prompts">
              <p className="example-label">Quick ideas:</p>
              <div className="example-buttons">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setImagePrompt(prompt)}
                    className="example-button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !imagePrompt.trim()}
              className="generate-button"
            >
              {isGenerating ? 'Generating...' : '✨ Generate Card'}
            </button>

            {/* Purchase Section */}
            <div className="purchase-section">
              <div className="price-container">
                <p className="price-label">Create this card</p>
                <p className="price-amount">$1.00</p>
              </div>
              <button
                onClick={handlePurchase}
                className="purchase-button"
                disabled={!generatedImage}
              >
                Purchase Card
              </button>
              <p className="purchase-details">
                High-res image • Print-ready PDF • Instant download
              </p>
            </div>

            {/* Info about style */}
            <div className="info-box">
              <p className="info-text">
                🎨 All cards are generated in the unique art style you provided!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Preview */}
        <div className="preview-section">
          <CardPreview
            imageUrl={generatedImage}
            message={message}
            isLoading={isGenerating}
            fontFamily={fontOptions.find(f => f.id === selectedFont)?.fontFamily}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
