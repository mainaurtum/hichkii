import { useState } from 'react'
import './Header.css'

function Header({ cartCount, onCartClick }) {
  const [showPartyCard, setShowPartyCard] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo.png" alt="Hichkii Restaurant" className="logo-image" />
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
            <span className={mobileMenuOpen ? 'active' : ''}></span>
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="nav-label">Home</span>
            </a>
            <a href="#menu" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4zm-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2v7z"/>
              </svg>
              <span className="nav-label">Menu</span>
            </a>
            <a href="#reviews" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="nav-label">Reviews</span>
            </a>
            <a 
              href="https://maps.app.goo.gl/4yydox6XaCjZTKym7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="nav-label">Location</span>
            </a>
            <button className="nav-item cart-button" onClick={() => { onCartClick(); setMobileMenuOpen(false); }}>
              <div className="cart-icon-wrapper">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <span className="nav-label">Cart</span>
            </button>
            <button className="nav-item party-card-button" onClick={() => { setShowPartyCard(true); setMobileMenuOpen(false); }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
              <span className="nav-label">Card</span>
            </button>
          </nav>
        </div>
      </header>

      {showPartyCard && (
        <div className="party-card-overlay" onClick={() => setShowPartyCard(false)}>
          <div className="party-card-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-party-card" onClick={() => setShowPartyCard(false)}>
              &times;
            </button>
            <img src="/partycard.jpg" alt="Party Card" className="party-card-image" />
          </div>
        </div>
      )}
    </>
  )
}

export default Header
