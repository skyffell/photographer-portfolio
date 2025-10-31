# Alex Vision - Photography Portfolio Website

![Photography Portfolio](https://img.shields.io/badge/Photography-Portfolio-blue)
![Flask Backend](https://img.shields.io/badge/Backend-Flask-green)
![Responsive Design](https://img.shields.io/badge/Design-Responsive-orange)

<div align="center">
  
**Профессиональный веб-сайт-портфолио фотографа с современным дизайном и полноценным бэкендом**

[Особенности](#особенности) • [Демо](#демо) • [Установка](#установка) • [Структура](#структура-проекта) • [Использование](#использование)

</div>

## 📸 О проекте

Alex Vision - это современный, полностью адаптивный веб-сайт-портфолио для профессионального фотографа. Проект включает в себя красивый фронтенд с анимациями и функциональный бэкенд для обработки заявок с контактной формы.

### 🌐 Демо


- **API Документация**: `/api/health`
- **Админ панель**: `/api/messages`

## 🚀 Особенности

### 🎨 Фронтенд
- **5 полноценных страниц**: Главная, Обо мне, Портфолио, Услуги, Контакты
- **Адаптивный дизайн**: Оптимизирован для всех устройств
- **Плавные анимации**: CSS анимации и JavaScript скролл-эффекты
- **Интерактивная галерея**: Фильтрация работ по категориям
- **Modern UI/UX**: Градиенты, стеклянный эффект, современные тенени

### ⚙️ Бэкенд
- **Flask API**: Полноценный бэкенд на Python
- **Контактная форма**: Обработка и сохранение заявок
- **CORS поддержка**: Готово для интеграции с фронтендом
- **JSON хранилище**: Сохранение данных без БД

### 🛠 Технологии

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- CSS Grid & Flexbox
- Intersection Observer API
- Responsive Design

**Backend:**
- Python 3.8+
- Flask & Flask-CORS
- JSON file storage

## 📁 Структура проекта
photographer-portfolio/
├── 📄 HTML Pages
│ ├── index.html # Главная страница
│ ├── about.html # Обо мне
│ ├── portfolio.html # Портфолио
│ ├── services.html # Услуги и цены
│ └── contact.html # Контакты
├── 🎨 Styles
│ ├── style.css # Основные стили
│ └── animations.css # Анимации
├── ⚡ JavaScript
│ ├── main.js # Основная логика
│ ├── animations.js # Анимации скролла
│ ├── portfolio.js # Фильтрация работ
│ ├── services.js # FAQ функциональность
│ ├── contact.js # Валидация формы
│ └── form-handler.js # Обработчик API
├── 🐍 Backend
│ ├── app.py # Flask приложение
│ └── requirements.txt # Зависимости Python
├── ⚙️ Configuration
│ ├── .gitignore
│ ├── netlify.toml
│ ├── sitemap.xml
│ └── robots.txt
└── 📝 Documentation
└── README.md

text

## ⚡ Быстрый старт

### Предварительные требования

- Python 3.8 или выше
- Git

### Установка

1. **Клонируйте репозиторий**

git clone https://github.com/your-username/photographer-portfolio.git
cd photographer-portfolio
Установите зависимости Python

```bash
pip install -r requirements.txt
```
Запустите сервер

```bash
python app.py
```
Откройте в браузере
```bash
http://localhost:5000
```
🎯 Использование
🌐 Запуск веб-сайта
Сайт готов к использованию сразу после запуска Flask приложения. Все страницы связаны между собой и полностью функциональны.

📧 Работа с контактной формой
Заполните форму на странице "Контакты"

Данные сохраняются в messages.json

Просмотр всех сообщений: GET /api/messages

🖼 Управление портфолио
Фильтрация работ по категориям

Ленивая загрузка изображений

Lightbox для просмотра

🔧 API Endpoints
Метод	Endpoint	Описание
GET	/api/health	Проверка статуса API
POST	/api/contact	Отправка сообщения
GET	/api/messages	Просмотр всех сообщений
GET	/api/test	Тестовый endpoint
🎨 Кастомизация
Изменение контента
Тексты: Отредактируйте HTML файлы

Изображения: Добавьте в папку images/

Цвета: Измените CSS переменные в style.css

Цены: Обновите в services.html

CSS Переменные для брендинга
```bash
css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* Измените цвета под ваш бренд */
}
```
📦 Деплой
Вариант 1: Netlify (Frontend) + Heroku (Backend)

# Frontend
```bash
netlify deploy --prod
```
# Backend
```bash
git push heroku main
```
Вариант 2: Полный хостинг на Vercel
```bash
vercel --prod
```
Вариант 3: Traditional Hosting
Залить файлы на любой PHP/Python хостинг.

🤝 Разработка
Внесение изменений
Создайте feature ветку

```bash
git checkout -b feature/new-feature
```
Внесите изменения и закоммитьте

```bash
git add .
git commit -m "feat: add new feature"
```
Запушьте изменения

```bash
git push origin feature/new-feature
```
Структура коммитов
feat: Новая функциональность

fix: Исправление ошибок

docs: Изменения в документации

style: Правки стилей

refactor: Рефакторинг кода

📄 Лицензия
Этот проект лицензирован under the MIT License - смотрите файл LICENSE для деталей.

👨‍💻 Автор
N-code Team

GitHub: @skyffell & @NERV-NICK

🙏 Благодарности
Иконки: Emoji

Шрифты: Google Fonts (Inter)

Вдохновение: Современные дизайны портфолио

<div align="center">
**Если вам понравился этот проект, не забудьте поставить ⭐ звезду на GitHub!**
</div>
