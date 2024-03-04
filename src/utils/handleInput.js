import { emailRegex, telRegex } from './regex'

export function handleInput(e) {
  function isEmailValid(value) {
    return emailRegex.test(value)
  }
  function isTelValid(value) {
    return telRegex.test(value)
  }
  const element = e.target
  const errorElement = document.querySelector(`#error-${element.id}`)
  errorElement.textContent = ''
  element.classList.remove('text-rose-400')
  if (element.value.length > 1 && element.id === 'email') {
    if (!isEmailValid(element.value)) {
      errorElement.textContent = 'Передан некорректный email'
      element.classList.add('text-rose-400')
    }
  } else if (element.value.length > 1 && element.id === 'tel') {
    if (!isTelValid(element.value)) {
      errorElement.textContent = 'Введите телефон в формате +7(912)345-67-89 или 89123456789'
      element.classList.add('text-rose-400')
    }
  } else {
    if (!element.checkValidity()) {
      errorElement.textContent = element.validationMessage
      element.classList.add('text-rose-400')
    }
  }
}
