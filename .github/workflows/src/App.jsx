import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  ru: {
    translation: {
      logo: "ARHITECH",
      tagline: "softstyle.uz",
      slogan: "Место, готовое создать интерьер, который работает на вас?",
      freeMeasurement: "Бесплатный замер",
      freeDesign: "Бесплатный дизайн",
      freeCalculation: "Бесплатный расчет",
      guarantee: "Гарантия 3 года",
      bonuses: "Бонусы",
      installment: "Рассрочка",
      orderTelegram: "Заказать в Telegram",
      categories: "Категории",
      products: "Наши работы",
      about: "О компании",
      reviews: "Отзывы",
      contacts: "Контакты",
      kukhnya: "Кухни",
      spalnya: "Спальни",
      divan: "Диваны",
      shkaf: "Шкафы и гардеробные",
      prihozhuyu: "Мебель в прихожую",
      kukhnyaDesc: "Современные кухни по индивидуальным размерам с качественной фурнитурой",
      spalnyaDesc: "Уютные спальни с удобными кроватями и вместительными шкафами",
      divanDesc: "Комфортные диваны для гостиной с различными механизмами трансформации",
      shkafDesc: "Вместительные шкафы-купе и гардеробные системы под ваше пространство",
      prihozhuuyuDesc: "Функциональная мебель для прихожей: шкафы, тумбы, зеркала",
      price: "Цена",
      sum: "сум",
      orderButton: "Заказать",
      aboutTitle: "О компании ARHITECH",
      aboutText: "Мы производим качественную мебель в Ташкенте уже более 12 лет. Наша компания специализируется на изготовлении мебели по индивидуальным проектам с доставкой по всему Узбекистану.",
      advantages: "Наши преимущества",
      fastProduction: "Быстрое производство 7-14 дней",
      longGuarantee: "Гарантия 12+ месяцев",
      freeServices: "Бесплатный замер, 3D-проект, монтаж под ключ",
      experience: "Опыт 10+ лет, более 1000 проектов",
      stats: "Наши достижения",
      orders: "1000+ заказов",
      recommendations: "94% рекомендаций",
      rating: "Рейтинг 4.5",
      avgDays: "14 дней среднее производство",
      orderProcess: "Процесс заказа",
      step1: "1. Связь - оставьте заявку",
      step2: "2. Замер - бесплатный выезд специалиста",
      step3: "3. Проект - 3D-визуализация и расчет",
      step4: "4. Производство - изготовление 7-14 дней",
      step5: "5. Установка - монтаж под ключ",
      reviewsTitle: "Отзывы клиентов",
      workingHours: "Время работы",
      monday: "Пн-Сб: 9:00 - 18:00",
      lunch: "Обед: 13:00 - 14:00",
      sunday: "Вс: выходной",
      phone: "Телефон",
      address: "Адрес",
      addressText: "Ташкент, Узбекистан",
      materials: "Материалы",
      description: "Описание"
    }
  },
  uz: {
    translation: {
      logo: "ARHITECH",
      tagline: "softstyle.uz",
      slogan: "Sizning interyer uchun mukammal mebel yaratishga tayyor joy?",
      freeMeasurement: "Bepul o'lchash",
      freeDesign: "Bepul dizayn",
      freeCalculation: "Bepul hisoblash",
      guarantee: "3 yillik kafolat",
      bonuses: "Bonuslar",
      installment: "Bo'lib to'lash",
      orderTelegram: "Telegramda buyurtma berish",
      categories: "Kategoriyalar",
      products: "Bizning ishlar",
      about: "Kompaniya haqida",
      reviews: "Sharhlar",
      contacts: "Kontaktlar",
      kukhnya: "Oshxonalar",
      spalnya: "Yotoqxonalar",
      divan: "Divanlar",
      shkaf: "Shkaflar va garderoblar",
      prihozhuyu: "Dahliz uchun mebel",
      kukhnyaDesc: "Individual o'lchamlarda zamonaviy oshxonalar sifatli aksessuarlar bilan",
      spalnyaDesc: "Qulay karavotlar va sig'imli shkaflar bilan shinam yotoqxonalar",
      divanDesc: "Turli transformatsiya mexanizmlari bilan mehmonxona uchun qulay divanlar",
      shkafDesc: "Sizning maydoningiz uchun sig'imli shkaf-kupe va garderob tizimlari",
      prihozhuuyuDesc: "Dahliz uchun funktsional mebel: shkaflar, tumba, oynalar",
      price: "Narxi",
      sum: "so'm",
      orderButton: "Buyurtma berish",
      aboutTitle: "ARHITECH kompaniyasi haqida",
      aboutText: "Biz Toshkentda 12 yildan ortiq vaqt davomida sifatli mebel ishlab chiqaramiz. Kompaniyamiz O'zbekiston bo'ylab yetkazib berish bilan individual loyihalar bo'yicha mebel tayyorlashga ixtisoslashgan.",
      advantages: "Bizning afzalliklarimiz",
      fastProduction: "Tez ishlab chiqarish 7-14 kun",
      longGuarantee: "12+ oy kafolat",
      freeServices: "Bepul o'lchash, 3D-loyiha, kalit ostida o'rnatish",
      experience: "10+ yillik tajriba, 1000+ loyiha",
      stats: "Bizning yutuqlarimiz",
      orders: "1000+ buyurtma",
      recommendations: "94% tavsiyalar",
      rating: "Reyting 4.5",
      avgDays: "14 kun o'rtacha ishlab chiqarish",
      orderProcess: "Buyurtma jarayoni",
      step1: "1. Aloqa - arizangizni qoldiring",
      step2: "2. O'lchash - mutaxassis bepul chiqib keladi",
      step3: "3. Loyiha - 3D-vizualizatsiya va hisoblash",
      step4: "4. Ishlab chiqarish - tayyorlash 7-14 kun",
      step5: "5. O'rnatish - kalit ostida montaj",
      reviewsTitle: "Mijozlar sharhlari",
      workingHours: "Ish vaqti",
      monday: "Du-Sh: 9:00 - 18:00",
      lunch: "Tushlik: 13:00 - 14:00",
      sunday: "Ya: dam olish kuni",
      phone: "Telefon",
      address: "Manzil",
      addressText: "Toshkent, O'zbekiston",
      materials: "Materiallar",
      description: "Ta'rif"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

// Season Context
const SeasonContext = createContext();

const SeasonProvider = ({ children }) => {
  const [season, setSeason] = useState('none');

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      <div className={`app-root ${season}`}>
        {children}
      </div>
    </SeasonContext.Provider>
  );
};

// Mock Products Data
const productsData = [
  {
    id: 1,
    name_ru: "Кухня Модерн",
    name_uz: "Modern Oshxona",
    price: 15000000,
    category_ru: "Кухни",
    category_uz: "Oshxonalar",
    mainPhoto: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
    photos: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800"
    ],
    description_ru: "Современная кухня с глянцевыми фасадами, встроенной техникой. Материалы: МДФ, фурнитура Blum.",
    description_uz: "Yaltiroq fasadlar, o'rnatilgan texnika bilan zamonaviy oshxona. Materiallar: MDF, Blum aksessuarlari."
  },
  {
    id: 2,
    name_ru: "Спальня Классика",
    name_uz: "Klassik Yotoqxona",
    price: 12000000,
    category_ru: "Спальни",
    category_uz: "Yotoqxonalar",
    mainPhoto: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
    photos: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
    ],
    description_ru: "Классическая спальня из массива дерева с резными элементами.",
    description_uz: "O'ymakorlik elementlari bilan yog'ochdan klassik yotoqxona."
  },
  {
    id: 3,
    name_ru: "Диван Комфорт",
    name_uz: "Komfort Divan",
    price: 8000000,
    category_ru: "Диваны",
    category_uz: "Divanlar",
    mainPhoto: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800"
    ],
    description_ru: "Удобный раскладной диван с ортопедическим матрасом.",
    description_uz: "Ortopedik matras bilan qulay yoyiladigan divan."
  },
  {
    id: 4,
    name_ru: "Шкаф-купе Макси",
    name_uz: "Maksi Shkaf-kupe",
    price: 10000000,
    category_ru: "Шкафы и гардеробные",
    category_uz: "Shkaflar va garderoblar",
    mainPhoto: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500",
    photos: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"
    ],
    description_ru: "Вместительный шкаф-купе с зеркальными дверями.",
    description_uz: "Oynali eshiklar bilan sig'imli shkaf-kupe."
  },
  {
    id: 5,
    name_ru: "Прихожая Компакт",
    name_uz: "Kompakt Dahliz",
    price: 5000000,
    category_ru: "Мебель в прихожую",
    category_uz: "Dahliz uchun mebel",
    mainPhoto: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500",
    photos: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"
    ],
    description_ru: "Компактная прихожая с обувницей и зеркалом.",
    description_uz: "Poyabzal va oyna bilan ixcham dahliz."
  },
  {
    id: 6,
    name_ru: "Кухня Лофт",
    name_uz: "Loft Oshxona",
    price: 18000000,
    category_ru: "Кухни",
    category_uz: "Oshxonalar",
    mainPhoto: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=500",
    photos: [
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800"
    ],
    description_ru: "Кухня в стиле лофт с открытыми полками и деревянными элементами.",
    description_uz: "Ochiq javonlar va yog'och elementlar bilan loft uslubidagi oshxona."
  }
];

// Reviews Data
const reviewsData = [
  {
    id: 1,
    author_ru: "Алексей М.",
    author_uz: "Aleksey M.",
    text_ru: "Отличная работа! Кухня получилась именно такой, как мы хотели. Качество на высоте.",
    text_uz: "Ajoyib ish! Oshxona biz xohlagan kabi bo'ldi. Sifat yuqori darajada."
  },
  {
    id: 2,
    author_ru: "Наргиза С.",
    author_uz: "Nargiza S.",
    text_ru: "Спасибо за профессионализм. Спальня превзошла все ожидания!",
    text_uz: "Professionallik uchun rahmat. Yotoqxona barcha kutishlardan oshib ketdi!"
  },
  {
    id: 3,
    author_ru: "Дмитрий К.",
    author_uz: "Dmitriy K.",
    text_ru: "Быстро, качественно, недорого. Рекомендую!",
    text_uz: "Tez, sifatli, arzon. Tavsiya qilaman!"
  },
  {
    id: 4,
    author_ru: "Малика Р.",
    author_uz: "Malika R.",
    text_ru: "Очень довольны шкафом-купе. Вместительный и красивый.",
    text_uz: "Shkaf-kupe bilan juda mamnunmiz. Sig'imli va chiroyli."
  },
  {
    id: 5,
    author_ru: "Сергей В.",
    author_uz: "Sergey V.",
    text_ru: "Отличный сервис от замера до установки. Все четко и в срок.",
    text_uz: "O'lchashdan o'rnatishgacha ajoyib xizmat. Hammasi aniq va muddatida."
  },
  {
    id: 6,
    author_ru: "Гульнара А.",
    author_uz: "Gulnara A.",
    text_ru: "Прекрасная мебель по разумной цене. Спасибо команде!",
    text_uz: "Oqilona narxda ajoyib mebel. Jamoaga rahmat!"
  }
];

// Header Component
const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="logo-section">
            <Link to="/" className="logo">{t('logo')}</Link>
            <div className="tagline">{t('tagline')}</div>
          </div>

          <div className="lang-switch">
            <button
              onClick={() => changeLanguage('ru')}
              className={i18n.language === 'ru' ? 'active' : ''}
            >
              RU
            </button>
            <button
              onClick={() => changeLanguage('uz')}
              className={i18n.language === 'uz' ? 'active' : ''}
            >
              UZ
            </button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>{t('products')}</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>{t('about')}</Link>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>{t('reviews')}</a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>{t('contacts')}</a>
        </nav>

        <div className="cta-bar">
          <span>✓ {t('freeMeasurement')}</span>
          <span>✓ {t('freeDesign')}</span>
          <span>✓ {t('freeCalculation')}</span>
          <span>✓ {t('guarantee')}</span>
          <span>✓ {t('bonuses')}</span>
          <span>✓ {t('installment')}</span>
          <a href="https://t.me/arhitech_uz" className="telegram-btn" target="_blank" rel="noopener noreferrer">
            {t('orderTelegram')}
          </a>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="container">
        <h1>{t('slogan')}</h1>
      </div>
    </section>
  );
};

// Categories Component
const Categories = () => {
  const { t } = useTranslation();

  const categories = [
    { key: 'kukhnya', desc: 'kukhnyaDesc' },
    { key: 'spalnya', desc: 'spalnyaDesc' },
    { key: 'divan', desc: 'divanDesc' },
    { key: 'shkaf', desc: 'shkafDesc' },
    { key: 'prihozhuyu', desc: 'prihozhuuyuDesc' }
  ];

  return (
    <section className="categories">
      <div className="container">
        <h2>{t('categories')}</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.key} className="category-card">
              <h3>{t(cat.key)}</h3>
              <p>{t(cat.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product List Component
const ProductList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <section className="products">
      <div className="container">
        <h2>{t('products')}</h2>
        <div className="products-grid">
          {productsData.map(product => (
            <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
              <img src={product.mainPhoto} alt={i18n.language === 'ru' ? product.name_ru : product.name_uz} />
              <h3>{i18n.language === 'ru' ? product.name_ru : product.name_uz}</h3>
              <p className="category">{i18n.language === 'ru' ? product.category_ru : product.category_uz}</p>
              <p className="price">{formatPrice(product.price)} {t('sum')}</p>
              <button className="order-btn">{t('orderButton')}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Detail Component
const ProductDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-btn">← {t('products')}</button>

        <div className="detail-content">
          <div className="gallery">
            <img
              src={product.photos[currentImage]}
              alt={i18n.language === 'ru' ? product.name_ru : product.name_uz}
              className="main-image"
            />
            <div className="thumbnails">
              {product.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${idx + 1}`}
                  className={currentImage === idx ? 'active' : ''}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          </div>

          <div className="detail-info">
            <h1>{i18n.language === 'ru' ? product.name_ru : product.name_uz}</h1>
            <p className="category">{i18n.language === 'ru' ? product.category_ru : product.category_uz}</p>
            <p className="price-large">{formatPrice(product.price)} {t('sum')}</p>

            <div className="description">
              <h3>{t('description')}</h3>
              <p>{i18n.language === 'ru' ? product.description_ru : product.description_uz}</p>
            </div>

            <a href="https://t.me/arhitech_uz" className="telegram-btn-large" target="_blank" rel="noopener noreferrer">
              {t('orderTelegram')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reviews Component
const Reviews = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <h2>{t('reviewsTitle')}</h2>
        <div className="reviews-grid">
          {reviewsData.map(review => (
            <div key={review.id} className="review-card">
              <p className="review-text">"{i18n.language === 'ru' ? review.text_ru : review.text_uz}"</p>
              <p className="review-author">— {i18n.language === 'ru' ? review.author_ru : review.author_uz}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Page Component
const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        <h1>{t('aboutTitle')}</h1>
        <p className="about-intro">{t('aboutText')}</p>

        <section className="advantages-section">
          <h2>{t('advantages')}</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <h3>⚡</h3>
              <p>{t('fastProduction')}</p>
            </div>
            <div className="advantage-card">
              <h3>✓</h3>
              <p>{t('longGuarantee')}</p>
            </div>
            <div className="advantage-card">
              <h3>🎁</h3>
              <p>{t('freeServices')}</p>
            </div>
            <div className="advantage-card">
              <h3>⭐</h3>
              <p>{t('experience')}</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>{t('stats')}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>1000+</h3>
              <p>{t('orders')}</p>
            </div>
            <div className="stat-card">
              <h3>94%</h3>
              <p>{t('recommendations')}</p>
            </div>
            <div className="stat-card">
              <h3>4.5</h3>
              <p>{t('rating')}</p>
            </div>
            <div className="stat-card">
              <h3>14</h3>
              <p>{t('avgDays')}</p>
            </div>
          </div>
        </section>

        <section className="process-section">
          <h2>{t('orderProcess')}</h2>
          <div className="process-steps">
            <div className="step">{t('step1')}</div>
            <div className="step">{t('step2')}</div>
            <div className="step">{t('step3')}</div>
            <div className="step">{t('step4')}</div>
            <div className="step">{t('step5')}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="contacts" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3!2d69.2401!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>

          <div className="contact-info">
            <div className="info-block">
              <h3>{t('workingHours')}</h3>
              <p>{t('monday')}</p>
              <p>{t('lunch')}</p>
              <p>{t('sunday')}</p>
            </div>

            <div className="info-block">
              <h3>{t('phone')}</h3>
              <p><a href="tel:+998974025548">+998 (97) 402-55-48</a></p>
              <p><a href="tel:+998974025549">+998 (97) 402-55-49</a></p>
            </div>

            <div className="info-block">
              <h3>{t('contacts')}</h3>
              <div className="social-links">
                <a href="https://t.me/arhitech_uz" target="_blank" rel="noopener noreferrer">Telegram</a>
                <a href="https://instagram.com/arhitech_uz" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://facebook.com/arhitech.uz" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>

            <div className="info-block">
              <h3>{t('address')}</h3>
              <p>{t('addressText')}</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 ARHITECH - {t('tagline')}</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <SeasonProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Categories />
                <ProductList />
                <Reviews />
              </>
            } />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>

        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
          }

          .app-root {
            min-height: 100vh;
            width: 100%;
            overflow-x: hidden;
          }

          .App {
            width: 100%;
            overflow-x: hidden;
          }

          .app-root.winter {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .app-root.summer {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            width: 100%;
          }

          /* Header */
          .header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
            width: 100%;
          }

          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            gap: 20px;
            flex-wrap: wrap;
          }

          .logo-section {
            display: flex;
            flex-direction: column;
          }

          .logo {
            font-size: 48px;
            font-weight: bold;
            color: #2c3e50;
            text-decoration: none;
            font-family: serif;
          }

          .tagline {
            font-size: 24px;
            font-style: italic;
            transform: skewX(-10deg);
            color: #7f8c8d;
          }

          .lang-switch {
            display: flex;
            gap: 10px;
          }

          .lang-switch button {
            padding: 8px 16px;
            border: 2px solid #3498db;
            background: white;
            color: #3498db;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            transition: all 0.3s;
          }

          .lang-switch button.active {
            background: #3498db;
            color: white;
          }

          .hamburger {
            display: none;
            font-size: 28px;
            background: none;
            border: none;
            cursor: pointer;
          }

          .nav {
            display: flex;
            gap: 30px;
            padding: 15px 0;
            border-top: 1px solid #ecf0f1;
            border-bottom: 1px solid #ecf0f1;
          }

          .nav a {
            color: #2c3e50;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
          }

          .nav a:hover {
            color: #3498db;
          }

          .cta-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
            padding: 15px 0;
            font-size: 14px;
            width: 100%;
            overflow-x: auto;
          }

          .cta-bar span {
            color: #27ae60;
            white-space: nowrap;
          }

          .telegram-btn, .telegram-btn-large {
            background: #3498db;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background 0.3s;
          }

          .telegram-btn:hover, .telegram-btn-large:hover {
            background: #2980b9;
          }

          .telegram-btn-large {
            display: inline-block;
            margin-top: 20px;
            padding: 15px 30px;
            font-size: 18px;
          }

          /* Hero */
          .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 0;
            text-align: center;
          }

          .hero h1 {
            font-size: 42px;
            max-width: 800px;
            margin: 0 auto;
          }

          /* Categories */
          .categories {
            padding: 60px 0;
            background: white;
          }

          .categories h2 {
            text-align: center;
            font-size: 36px;
            margin-bottom: 40px;
            color: #2c3e50;
          }

          .categories-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .category-card {
            padding: 30px;
            background: #f8f9fa;
            border-radius: 10px;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }

          .category-card h3 {
            color: #3498db;
            margin-bottom: 10px;
            font-size: 24px;
          }

          .category-card p {
            color: #555;
          }

          /* Products */
          .products {
            padding: 60px 0;
            background: #f8f9fa;
          }

          .products h2 {
            text-align: center;
            font-size: 36px;
            margin-bottom: 40px;
            color: #2c3e50;
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .product-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          }

          .product-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
          }

          .product-card h3 {
            padding: 15px 20px 5px;
            font-size: 20px;
            color: #2c3e50;
          }

          .product-card .category {
            padding: 0 20px;
            color: #7f8c8d;
            font-size: 14px;
          }

          .product-card .price {
            padding: 10px 20px;
            font-size: 22px;
            font-weight: bold;
            color: #27ae60;
          }

          .order-btn {
            margin: 0 20px 20px;
            width: calc(100% - 40px);
            padding: 12px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          }

          .order-btn:hover {
            background: #2980b9;
          }

          /* Product Detail */
          .product-detail {
            padding: 60px 0;
            background: white;
          }

          .back-btn {
            padding: 10px 20px;
            background: #ecf0f1;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 30px;
          }

          .detail-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
          }

          .gallery .main-image {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 15px;
          }

          .thumbnails {
            display: flex;
            gap: 10px;
          }

          .thumbnails img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 5px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: border-color 0.3s;
          }

          .thumbnails img:hover, .thumbnails img.active {
            border-color: #3498db;
          }

          .detail-info h1 {
            font-size: 32px;
            color: #2c3e50;
            margin-bottom: 10px;
          }

          .detail-info .category {
            color: #7f8c8d;
            margin-bottom: 10px;
          }

          .price-large {
            font-size: 32px;
            font-weight: bold;
            color: #27ae60;
            margin: 20px 0;
          }

          .description {
            margin-top: 30px;
          }

          .description h3 {
            color: #2c3e50;
            margin-bottom: 10px;
          }

          /* Reviews */
          .reviews {
            padding: 60px 0;
            background: white;
          }

          .reviews h2 {
            text-align: center;
            font-size: 36px;
            margin-bottom: 40px;
            color: #2c3e50;
          }

          .reviews-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }

          .review-card {
            padding: 25px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #3498db;
          }

          .review-text {
            font-style: italic;
            color: #555;
            margin-bottom: 15px;
          }

          .review-author {
            font-weight: bold;
            color: #2c3e50;
          }

          /* About Page */
          .about-page {
            padding: 60px 0;
            background: white;
          }

          .about-page h1 {
            font-size: 42px;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
          }

          .about-intro {
            font-size: 18px;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto 60px;
            text-align: center;
            color: #555;
          }

          .advantages-section, .stats-section, .process-section {
            margin-bottom: 60px;
          }

          .advantages-section h2, .stats-section h2, .process-section h2 {
            font-size: 32px;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
          }

          .advantages-grid, .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
          }

          .advantage-card, .stat-card {
            padding: 25px;
            background: #f8f9fa;
            border-radius: 10px;
            text-align: center;
          }

          .advantage-card h3, .stat-card h3 {
            font-size: 36px;
            margin-bottom: 15px;
          }

          .process-steps {
            max-width: 600px;
            margin: 0 auto;
          }

          .step {
            padding: 20px;
            background: #ecf0f1;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 18px;
            color: #2c3e50;
          }

          /* Footer */
          .footer {
            background: #2c3e50;
            color: white;
            padding: 60px 0 20px;
          }

          .footer-content {
            display: flex;
            gap: 50px;
            margin-bottom: 40px;
          }

          .map-container {
            flex: 1;
          }

          .contact-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .info-block h3 {
            color: #3498db;
            margin-bottom: 10px;
          }

          .info-block a {
            color: white;
            text-decoration: none;
          }

          .social-links {
            display: flex;
            gap: 15px;
          }

          .social-links a {
            padding: 8px 16px;
            background: #3498db;
            border-radius: 5px;
            transition: background 0.3s;
          }

          .social-links a:hover {
            background: #2980b9;
          }

          .footer-bottom {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
          }

          /* Mobile Styles */
          @media (max-width: 768px) {
            .hamburger {
              display: block;
            }

            .nav {
              display: none;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: white;
              box-shadow: 0 5px 10px rgba(0,0,0,0.1);
              padding: 20px;
            }

            .nav.open {
              display: flex;
            }

            .categories-grid {
              grid-template-columns: 1fr;
            }

            .products-grid {
              grid-template-columns: 1fr;
            }

            .detail-content {
              grid-template-columns: 1fr;
            }

            .reviews-grid {
              grid-template-columns: 1fr;
            }

            .advantages-grid, .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .footer-content {
              flex-direction: column;
            }

            .map-container {
              order: 1;
            }

            .contact-info {
              order: 2;
            }

            .cta-bar {
              font-size: 12px;
            }

            .hero h1 {
              font-size: 28px;
            }

            .logo {
              font-size: 32px;
            }

            .tagline {
              font-size: 18px;
            }
          }

          /* Tablet Styles */
          @media (min-width: 769px) and (max-width: 1024px) {
            .categories-grid {
              grid-template-columns: 1fr;
            }

            .products-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .reviews-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .advantages-grid, .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}</style>
      </SeasonProvider>
    </Router>
  );
};

export default App;