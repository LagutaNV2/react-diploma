// src/components/Header.tsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import CartIcon from './CartIcon'

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  // return (
  //   <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
  //     <div className="container">
  //       <NavLink to="/" className="navbar-brand">
  //         <img src="/src/assets/img/header-logo.png" alt="Bosa Noga" width="100" />
  //       </NavLink>
  //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //         <li className="nav-item">
  //           <NavLink to="/" className="nav-link">Главная</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/about" className="nav-link">О магазине</NavLink>
  //         </li>
  //         <li className="nav-item">
  //           <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
  //         </li>
  //       </ul>

  //       {/* Иконка корзины */}
  //       <div className="header-controls-pics">
  //         <div className="header-controls-pic header-controls-search"></div>
  //         <CartIcon />
  //       </div>
  //     </div>
  //   </nav>
  // )
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            {/* Логотип */}
            <NavLink to="/" className="navbar-brand">
              <img src="/src/assets/img/header-logo.png" alt="Bosa Noga" />
            </NavLink>

            {/* Навигационное меню */}
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/catalog"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contacts"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Контакты
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Блок виджета поиска и корзины */}
            <div className="ml-auto" style={{ order: 2 }}>
              <div className="header-controls-pics d-flex align-items-center">
                {/* Форма поиска */}
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${
                  isSearchVisible ? '' : 'invisible'
                  }`}
                  style={{ order: 1 }} // Поле ввода слева от иконки
                >
                  <input className="form-control" placeholder="Поиск" style={{ outline: 'none', boxShadow: 'none' }} />
                </form>

                {/* Иконка поиска */}
                <div
                  data-id="search-expander"
                  className="header-controls-pic header-controls-search"
                  onClick={toggleSearch}
                ></div>

                {/* Иконка корзины */}
                  <CartIcon />
              </div>
            </div>

          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
