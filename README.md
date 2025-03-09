# Farpost test case

### Проект - NX Monorepo. Форма авторизации написанная на фреймворке Angular.

## 🔧 Требования
Перед запуском убедитесь, что у вас установлены:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Запуск через Docker
1. **Склонируйте репозиторий**:
```bash
   git clone https://github.com/ваш-аккаунт/farpost_test_case.git
   cd farpost_test_case
```

2. **Поднимите контейнер**:
```bash
   docker-compose up --build
```

3. **Откройте приложение в браузере**:
- http://localhost

## 🛠 Возможные проблемы
1. **Ошибка CORS при запросе**:
- Придется либо скачать расширение для обхода блокировки cors, либо отключить проверки в браузере
2. **Ошибка при скачивании зависимостей**:
- Проверьте соединение с интернетом и попробуйте:
```bash
   docker-compose build --no-cache
```

