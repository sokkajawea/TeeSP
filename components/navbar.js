
class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
        }
        .flex {
          display: flex;
          align-items: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nav-links {
          display: flex;
          align-items: center;
        }
.nav-link:hover {
          color: #f17827ff;
        }
        .nav-link i {
          margin-right: 0.5rem;
        }
        .logo {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.25rem;
          color: #1f2937;
        }
        .logo i {
          color: #e21717ff;
        }
        .search-box {
          position: relative;
          margin-right: 1rem;
        }
        .search-input {
          padding: 0.5rem 2rem 0.5rem 1rem;
          border: 1px solid #2b7cb3ff;
          border-radius: 0.375rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .search-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
        }
        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        .cart-icon {
          position: relative;
          padding: 0.5rem;
        }
        .cart-count {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          background: #2271e9ff;
          color: white;
          border-radius: 50%;
          width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #4b5563;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          .nav-links {
            display: none;
          }
          .search-box {
            display: none;
          }
        }
      </style>
      <nav>
        <div class="container">
          <div class="flex justify-between">
            <a href="/" class="logo">
              <i data-feather="shopping-bag"></i>
              <span>TeeSP</span>
            </a>
            
            <div class="flex">
              <div class="nav-links">
                <a href="/" class="nav-link">
                  <i data-feather="home"></i>
                  Home
                </a>
                <a href="t-shirts.html" class="nav-link">
                  <i data-feather="shirt"></i>
                  T-Shirts
                </a>
                <a href="polo.html" class="nav-link">
                  <i data-feather="shirt"></i>
                  Polo Shirts
                </a>
                <a href="dress.html" class="nav-link">
                  <i data-feather="shirt"></i>
                  Dress Shirts
                </a>
                <a href="hoodies.html" class="nav-link">
                  <i data-feather="shirt"></i>
                  Hoodies
                </a>
<a href="#" class="nav-link">
                  <i data-feather="user"></i>
                  Account
                </a>
<a href="/password.html" class="nav-link">
                  <i data-feather="settings"></i>
                  Admin
                </a>
</div>
              
              <div class="search-box">
                <input type="text" placeholder="Search..." class="search-input">
                <i data-feather="search" class="search-icon"></i>
              </div>
              
              <a href="#" class="cart-icon">
                <i data-feather="shopping-cart"></i>
                <span class="cart-count">0</span>
              </a>
              
              <button class="mobile-menu-btn">
                <i data-feather="menu"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
