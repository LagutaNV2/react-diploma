// src/components/Footer.tsx
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        {/* Левая колонка: Информация */}
        <div className="col-md-4">
          <section>
            <h5>Информация</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/about" className="nav-link">О магазине</Link>
              </li>
              <li className="nav-item">
                <Link to="/catalog" className="nav-link">Каталог</Link>
              </li>
              <li className="nav-item">
                <Link to="/contacts" className="nav-link">Контакты</Link>
              </li>
            </ul>
          </section>
        </div>

        {/* Центральная колонка: Принимаем к оплате */}
        <div className="col-md-4">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className="footer-pay">

                  {/* <img src="/src/assets/img/PayPal.png" alt="PayPal" />
                  <img src="/src/assets/img/MasterCard.png" alt="MasterCard" />
                  <img src="/src/assets/img/Visa.png" alt="Visa" />
                  <img src="/src/assets/img/YandexMoney.png" alt="Яндекс.Деньги" />
                  <img src="/src/assets/img/webmoney.png" alt="WebMoney" />
                  <img src="/src/assets/img/Qiwi.png" alt="Qiwi" /> */}

                  <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                  <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                  <div className="footer-pay-systems footer-pay-systems-visa"></div>
                  <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                  <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                  <div className="footer-pay-systems footer-pay-systems-qiwi"></div>

            </div>
          </section>
          <section>
            <div className="footer-copyright">
              2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.<br />
              Все права защищены.<br />
              Доставка по всей России!
            </div>
          </section>
        </div>

        {/* Правая колонка: Контакты */}
        <div className="col-md-4 text-right">
          <section className="footer-contacts">
            <h5>Контакты:</h5>
              <a href="tel:+7-495-790-35-03" className="footer-contacts-phone" target="_blank" rel="noopener noreferrer">
                +7 495 79 03 5 03
              </a>
              <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
              <a href="mailto:office@bosanoga.ru" className="footer-contacts-email" target="_blank" rel="noopener noreferrer">
                office@bosanoga.ru
              </a>
            <div className="footer-social-links">
              <a href="https://twitter.com/bosanoga " target="_blank" rel="noopener noreferrer">
                <div className="footer-social-link footer-social-link-twitter"></div>
              </a>
              <a href="https://vk.com/bosanoga " target="_blank" rel="noopener noreferrer">
                <div className="footer-social-link footer-social-link-vk"></div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </footer>
  )
}

export default Footer
