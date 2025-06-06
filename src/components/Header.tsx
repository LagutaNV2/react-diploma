// src/components/Header.tsx
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { setSearchQuery, performSearch } from '../features/catalog/catalogSlice';
import CartIcon from './CartIcon';

// SSR-safe проверка на выполнение в браузере
const isBrowser = typeof window !== "undefined";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { searchQuery } = useSelector((state: RootState) => state.catalog.mainCatalog);
  const [searchParams] = useSearchParams();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setLocalQuery(urlQuery);
    dispatch(setSearchQuery(urlQuery));
  }, [searchParams, dispatch]);

  // Синхронизация при изменении Redux state
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // SSR-safe очистка таймаута
  useEffect(() => {
    return () => {
      if (isBrowser && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [dispatch]);


  const triggerSearchNavigation = (currentQuery: string) => {
    const trimmedQuery = currentQuery.trim();
    if (trimmedQuery) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('q', trimmedQuery);

      if (location.pathname !== '/catalog') {
        navigate(`/catalog?${newSearchParams.toString()}`);
      } else {
        navigate({ search: newSearchParams.toString() }, { replace: true });
      }

      dispatch(setSearchQuery(trimmedQuery));
      dispatch(performSearch());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);

    // SSR-safe очистка таймаута
    if (isBrowser && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // SSR-safe установка таймаута
    if (isBrowser) {
      timeoutRef.current = setTimeout(() => {
        dispatch(setSearchQuery(value));
        triggerSearchNavigation(value);
      }, 1500);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
     // SSR-safe очистка таймаута
    if (isBrowser && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    triggerSearchNavigation(e.target.value);
  };

  const handleSearchToggle = () => {
    if (isSearchVisible && localQuery.trim()) {
      triggerSearchNavigation(localQuery);
    }
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            {/* Логотип */}
            <NavLink to="/" className="navbar-brand">
              {/* <img src="/src/assets/img/header-logo.png" alt="Bosa Noga" /> */}
              <img src="/img/header-logo.png" alt="Bosa Noga" />
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
                  <input
                    ref={inputRef}
                    className="form-control"
                    type="text"
                    placeholder="Поиск"
                    style={{ outline: 'none', boxShadow: 'none' }}
                    value={localQuery}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                </form>

                {/* Иконка поиска */}
                <div
                  data-id="search-expander"
                  className="header-controls-pic header-controls-search"
                  onClick={handleSearchToggle}
                  style={{ cursor: 'pointer' }}
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
