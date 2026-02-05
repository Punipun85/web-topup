import React, { useState } from 'react'
import { Trophy, Target, Calculator, RotateCcw, AlertCircle, Gamepad2 } from 'lucide-react'
import './winrate.css' // Import file CSS yang baru dibuat

export default function KalkulatorWinRate() {
  const [matches, setMatches] = useState('')
  const [currentWr, setCurrentWr] = useState('')
  const [targetWr, setTargetWr] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateWr = () => {
    setError('')
    setResult(null)

    const tMatch = parseFloat(matches)
    const tWr = parseFloat(currentWr)
    const tTarget = parseFloat(targetWr)

    if (!matches || !currentWr || !targetWr) {
      setError('Mohon isi semua kolom data.')
      return
    }
    if (tWr >= 100 || tTarget >= 100) {
      setError('Win Rate tidak bisa 100% atau lebih.')
      return
    }
    if (tTarget <= tWr) {
      setError('Target Win Rate harus lebih tinggi dari saat ini.')
      return
    }

    const wrResult = (tMatch * (tTarget - tWr)) / (100 - tTarget)
    const finalResult = Math.ceil(wrResult)
    setResult(finalResult)
  }

  const handleReset = () => {
    setMatches('')
    setCurrentWr('')
    setTargetWr('')
    setResult(null)
    setError('')
  }

  return (
    <div className="calc-wrapper">
      
      {/* Background Decor */}
      <div className="calc-blob blob-purple"></div>
      <div className="calc-blob blob-blue"></div>

      {/* Main Content */}
      <div className="calc-container">
        
        {/* === LEFT COLUMN: INPUT FORM === */}
        <div className="calc-card">
          <div className="calc-header">
            <div className="icon-wrapper">
              <Calculator size={28} />
            </div>
            <div className="calc-title">
              <h1>Win Rate Calculator</h1>
              <p>Hitung win streak yang dibutuhkan.</p>
            </div>
          </div>

          <div className="calc-form">
            
            {/* Input 1 */}
            <div className="input-group">
              <label className="input-label">
                <Gamepad2 size={16} color="#c084fc" /> Total Pertandingan
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="Contoh: 350"
                  className="calc-input"
                  value={matches}
                  onChange={(e) => setMatches(e.target.value)}
                />
              </div>
            </div>

            {/* Input 2 */}
            <div className="input-group">
              <label className="input-label">
                <Trophy size={16} color="#eab308" /> Win Rate Saat Ini (%)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="Contoh: 50.5"
                  className="calc-input wr-input"
                  value={currentWr}
                  onChange={(e) => setCurrentWr(e.target.value)}
                />
                <span className="input-suffix">%</span>
              </div>
            </div>

            {/* Input 3 */}
            <div className="input-group">
              <label className="input-label">
                <Target size={16} color="#f87171" /> Target Win Rate (%)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="Contoh: 60.0"
                  className="calc-input target-input"
                  value={targetWr}
                  onChange={(e) => setTargetWr(e.target.value)}
                />
                <span className="input-suffix">%</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-box">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="btn-group">
               <button onClick={calculateWr} className="btn-primary">
                 Hitung Hasil
               </button>
               <button onClick={handleReset} className="btn-reset" title="Reset">
                 <RotateCcw size={20} />
               </button>
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN: RESULT === */}
        <div className="result-wrapper">
           {result !== null ? (
             <div className="result-card">
                <div className="result-inner">
                   <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                      <Trophy size={64} color="#facc15" style={{ filter: 'drop-shadow(0 0 10px rgba(250,204,21,0.5))' }} />
                   </div>

                   <span className="res-label">Kamu Membutuhkan</span>
                   <div className="res-number">{result}</div>
                   <h4 className="res-subtitle">Kemenangan Beruntun</h4>
                   
                   <div className="res-details">
                      <div className="detail-row">
                        <span style={{ color: '#9ca3af' }}>Total Match Nanti</span>
                        <span className="text-mono">{parseFloat(matches) + result}</span>
                      </div>
                      <div className="detail-row">
                        <span style={{ color: '#9ca3af' }}>Target WR</span>
                        <span className="text-purple text-mono">{targetWr}%</span>
                      </div>
                   </div>

                   <div className="res-quote">
                      "Tanpa kalah sekalipun (Win Streak). <br/>Semangat push rank-nya!"
                   </div>
                </div>
             </div>
           ) : (
             <div className="empty-state">
                <div className="empty-icon">
                  <Gamepad2 size={40} />
                </div>
                <h3 style={{ color: '#9ca3af', fontWeight: 'bold', marginBottom: '0.5rem' }}>Siap Menghitung?</h3>
                <p style={{ fontSize: '0.875rem' }}>Masukkan statistik Mobile Legends kamu di kiri untuk melihat hasilnya.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  )
}