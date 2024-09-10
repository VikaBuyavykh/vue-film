# Film Project

Проект представляет собой сервис по покупке билетов в кинотеатр. В нем реализованы:

- вывод актуальных сеансов (пагинация)
- просмотр подробной информации о выбранной ленте
- выбор даты и места
- удаление билетов из корзины
- оформление заказа с заполнением небольшой формы (кастомная валидация с RegExp)

## Tools

Страница адаптивная, в ней используется семантическая Desctop First верстка. Код написан на Vue 3, реализованы следующие инструменты:

- Сomposition API и Script Setup
- компонентный подход, named и conditional slots
- работа с реактивностью, отслеживанием, computed
- макросы компиляции: defineProps, defineEmits, defineModel
- работа с формами и асинхронным кодом
- хуки жизненного цикла
- Composables
- Pinia store, localStorage

## Стек технологий

- Vue 3
- Vite
- Composition API
- TailwindCSS
- Axios
- Pinia Store
- ESLint
- Prettier

## Ссылка на проект

Задеплоенный рабочий проект доступен по [ссылке](https://vue-film.vercel.app/)
