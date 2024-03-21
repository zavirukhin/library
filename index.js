const menuEl = document.getElementById("menu")
const headerNav = document.getElementById("header-nav")
const sliderRight = document.getElementById("slider-right")
const sliderLeft = document.getElementById("slider-left")

const profileDropdown = document.querySelector(".profile-dropdrow")
const profileDropdownContainer = document.querySelector(".profile-container")

const modalAuth = document.querySelector(".modal-auth")
const modalReg = document.querySelector(".modal-registration")
const modalLogin = document.querySelector(".modal-login")


window.addEventListener("DOMContentLoaded", checkElementAuth)

function positionCheck() {
  const currentPosition = Number(getComputedStyle(document.documentElement).getPropertyValue("--position-slider"))
  let countVisible = 0
  document.querySelectorAll(".about-radio-wrapper").forEach((el) => {
    if (getComputedStyle(el).getPropertyValue('display') === 'block') {
      countVisible++
    }
  })
  if (currentPosition >= countVisible) {
    document.querySelectorAll(".about-radio")[countVisible - 1].checked = true
    document.documentElement.style.setProperty("--position-slider", countVisible - 1)
  }
}

function setPointerArrow() {
  const arrowButton = document.querySelectorAll('.about-slider > *')
  const currentPosition = Number(getComputedStyle(document.documentElement).getPropertyValue("--position-slider"))
  arrowButton[0].style.visibility = ""
  arrowButton[1].style.visibility = ""
  if (currentPosition === 0) {
    arrowButton[0].style.visibility = "hidden"
  }
  else if (currentPosition === 4) {
    arrowButton[1].style.visibility = "hidden"
  }
}

sliderRight.addEventListener("click", () => {
  const currentPosition = Number(getComputedStyle(document.documentElement).getPropertyValue("--position-slider"))
  if (currentPosition < 4) {
    document.documentElement.style.setProperty("--position-slider", currentPosition + 1)
    document.querySelector(`.about-radio-wrapper:nth-of-type(${currentPosition + 2}) > input`).checked = true
    setPointerArrow()
  }
})

sliderLeft.addEventListener("click", () => {
  const currentPosition = Number(getComputedStyle(document.documentElement).getPropertyValue("--position-slider"))
  if (currentPosition > 0) {
    document.documentElement.style.setProperty("--position-slider", currentPosition - 1)
    document.querySelector(`.about-radio-wrapper:nth-of-type(${currentPosition}) > input`).checked = true
    setPointerArrow()
  }
})

document.querySelectorAll(".nav-link").forEach((el) => {
  el.addEventListener("click", () => {
    menuEl.classList.remove("icon-close")
    headerNav.classList.remove("header-nav-show")
  })
})

document.querySelectorAll(".about-radio-wrapper").forEach((el, index) => {
  el.addEventListener("click", () => {
    document.documentElement.style.setProperty("--position-slider", index)
    setPointerArrow()
  })
})

window.matchMedia("(max-width: 1439px)").addEventListener("change", positionCheck)
window.matchMedia("(max-width: 1024px)").addEventListener("change", positionCheck)
window.addEventListener("load", () => {
  setPointerArrow()
})

document.querySelectorAll(".favorites-choice-radio").forEach((el, index) => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".favorites-main").forEach((el) => {
      el.style.opacity = 0
    })
    setTimeout(() => {
      document.querySelectorAll(".favorites-main").forEach((el) => {
        el.style.height = "0px"
      })
      const index = Array.from(document.querySelectorAll(".favorites-choice-radio")).findIndex((el) => {
        if (el.checked === true) {
          return el
        }
      })
      document.querySelectorAll(".favorites-main")[index].style.height = "unset"
      document.querySelectorAll(".favorites-main")[index].style.opacity = 1
    }, 300)
  })
})

function closeNavBarMenu() {
  menuEl.classList.remove("icon-close")
  headerNav.classList.remove("header-nav-show")
}

function closeProfileMenu() {
  profileDropdownContainer.classList.remove("profile-container-show")
  profileDropdown.classList.remove("profile-dropdrow-show")
}

menuEl.addEventListener("click", () => {
  if (menuEl.classList.contains("icon-close")) {
    closeNavBarMenu()
  }
  else {
    if (profileDropdown.classList.contains("profile-dropdrow-show")) {
      closeProfileMenu()
    }
    menuEl.classList.add("icon-close")
    headerNav.classList.add("header-nav-show")
  }
})

headerNav.addEventListener("click", (e) => {
  if (e.target.tagName !== "UL") {
    closeNavBarMenu()
  }
})

document.querySelector(".profile-container").addEventListener("click", (e) => {
  const exclude = ["dropdown-header-text", "profile-dropdrow", "dropdown-header-line"]
  const isRestricted = exclude.some((v) => e.target.classList.contains(v))
  if (!isRestricted) {
    closeProfileMenu()
  }
})

document.querySelectorAll(".icon-profile, .icon-profile-custom").forEach((el) => {
  el.addEventListener("click", () => {
    if (profileDropdown.classList.contains("profile-dropdrow-show")) {
      closeProfileMenu()
    }
    else {
      if (menuEl.classList.contains("icon-close")) {
        closeNavBarMenu()
      }
      profileDropdownContainer.classList.add("profile-container-show")
      profileDropdown.classList.add("profile-dropdrow-show")
    }
  })
})

function showLogin() {
  document.documentElement.style.overflow = "hidden"
  modalReg.style.display = "none"
  modalLogin.style.display = "block"
  modalAuth.classList.add("modal-auth-show")
}

function closeLogin() {
  document.documentElement.style.overflow = ""
  modalAuth.classList.remove("modal-auth-show")
}

document.querySelectorAll(".dropdown-text-reg, .get-card-button-reg").forEach((el) => {
  el.addEventListener("click", () => {
    document.documentElement.style.overflow = "hidden"
    modalReg.style.display = "block"
    modalLogin.style.display = "none"
    modalAuth.classList.add("modal-auth-show")
  })
})

document.querySelectorAll(".dropdown-text-log, .get-card-button-log").forEach(el => {
  el.addEventListener("click", showLogin)
})

document.querySelector(".modal-auth").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-auth") || e.target.classList.contains("modal-close-icon")) {
    closeLogin()
  }
})

document.getElementById("modal-to-login").addEventListener("click", () => {
  modalReg.style.display = "none"
  modalLogin.style.display = "block"
})

document.getElementById("modal-to-reg").addEventListener("click", () => {
  modalReg.style.display = "block"
  modalLogin.style.display = "none"
})

document.getElementById("registration-form").addEventListener("submit", (e) => {
  new FormData(e.target).forEach((k, v) => {
    localStorage.setItem(v, k)
  })
  localStorage.setItem("cardNumber", [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''))
  localStorage.setItem("isAuth", 1)
  localStorage.setItem("loginCount", 1)
  localStorage.setItem("idItemOwned", "[]")
  checkElementAuth()
  closeLogin()
})

function checkElementAuth() {
  if (Number(localStorage.getItem("isAuth"))) {
    const ownedElement = JSON.parse(localStorage.getItem("idItemOwned"))
    document.querySelectorAll(".favorite-button").forEach((el, index) => {
      if (ownedElement.includes(index)) {
        el.disabled = true
        el.innerText = "Own"
      }
    })
    document.querySelector(".modal-profile-book-list").innerHTML = ""
    document.querySelectorAll(".favorite-header-text-book-name").forEach((el, index) => {
      if (ownedElement.includes(index)) {
        const bookName = document.createElement("li")
        const author = document.querySelectorAll(".favorite-header-text-book-author")[index]
        bookName.innerText = `${el.innerText}, ${author.innerText}`
        document.querySelector(".modal-profile-book-list").append(bookName)
      }
    })
    document.querySelector(".form-find-name").value = `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`
    document.querySelector(".form-find-card").value = localStorage.getItem("cardNumber")
    document.querySelectorAll(".only-with-auth").forEach((el) => {
      el.style.display = ""
    })
    document.querySelectorAll(".only-without-auth").forEach((el) => {
      el.style.display = "none"
    })
    document.querySelectorAll(".icon-profile-custom").forEach((el) => {
      el.innerHTML = localStorage.getItem("fname").slice(0, 2)
    })
    document.querySelectorAll(".icon-profile-custom").forEach((el) => {
      el.title = `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`
    })
    document.querySelectorAll(".dropdown-header-text.only-with-auth, .card-number").forEach((el) => {
      el.innerText = localStorage.getItem("cardNumber")
    })
    document.querySelectorAll(".visiter-counter").forEach((el) => {
      el.innerText = localStorage.getItem("loginCount")
    })
    document.querySelectorAll(".books-owned").forEach((el) => {
      el.innerText = JSON.parse(localStorage.getItem("idItemOwned")).length
    })
    document.querySelector(".modal-profile-username").innerText = `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}`
  }
  else {
    document.querySelector(".form-find-name").value = ""
    document.querySelector(".form-find-card").value = ""
    document.querySelectorAll(".favorite-button").forEach((el) => {
      el.disabled = false
      el.innerText = "Buy"
    })
    document.querySelectorAll(".only-with-auth").forEach((el) => {
      el.style.display = "none"
    })
    document.querySelectorAll(".only-without-auth").forEach((el) => {
      el.style.display = ""
    })
    document.querySelector(".modal-profile-book-list").innerHTML = ""
    document.querySelector(".icon-profile-custom").innerText = ""
    document.querySelector(".icon-profile-custom").title = ""
  }
}

document.querySelector(".dropdown-text-out").addEventListener(("click"), () => {
  localStorage.setItem("isAuth", 0)
  setTimeout(checkElementAuth, 300)
})

document.getElementById("login-form").addEventListener("submit", (e) => {
  const emailCard = new FormData(e.target).get("emailCard")
  const password = new FormData(e.target).get("password")
  const isAuth = (emailCard === localStorage.getItem("cardNumber") || emailCard === localStorage.getItem("email")) &&
                  password === localStorage.getItem("password")
  if (isAuth) {
    localStorage.setItem("isAuth", 1)
    localStorage.setItem("loginCount", Number(localStorage.getItem("loginCount")) + 1)
    closeLogin()
    checkElementAuth()
  }
  else {
    alert("Incorrect card number/email or password, please try again")
  }
})

document.querySelectorAll(".favorite-button").forEach((el, index) => {
  el.addEventListener("click", () => {
    if (Number(localStorage.getItem("isAuth"))) {
      if (localStorage.getItem("card")) {
        let ownedElement = JSON.parse(localStorage.getItem("idItemOwned"))
        ownedElement.push(index)
        localStorage.setItem("idItemOwned", JSON.stringify(ownedElement))
        checkElementAuth()
      }
      else {
        document.documentElement.style.overflow = "hidden"
        document.querySelector(".modal-card-background").classList.add("modal-card-background-show")
      }
    }
    else {
      showLogin()
    }
  })
})

document.querySelector(".card-copy").addEventListener("click", () => {
  navigator.clipboard.writeText(localStorage.getItem("cardNumber"))
})

document.querySelectorAll(".get-card-button-prof, .dropdown-text-profile").forEach((el) => {
  el.addEventListener("click", () => {
    document.documentElement.style.overflow = "hidden"
    document.querySelector(".modal-profile-background").classList.add("modal-profile-background-show")
  })
})

document.querySelector(".modal-profile-close-icon").addEventListener("click", () => {
  document.documentElement.style.overflow = ""
  document.querySelector(".modal-profile-background").classList.remove("modal-profile-background-show")
})

document.querySelector(".modal-profile-background").addEventListener("click", (el) => {
  if (el.target.classList.contains("modal-profile-background")) {
    document.documentElement.style.overflow = ""
    document.querySelector(".modal-profile-background").classList.remove("modal-profile-background-show")
  }
})

document.querySelector(".modal-add-card-close").addEventListener("click", () => {
  document.documentElement.style.overflow = ""
  document.querySelector(".modal-card-background").classList.remove("modal-card-background-show")
})

document.querySelector(".modal-card-background").addEventListener("click", (el) => {
  if (el.target.classList.contains("modal-card-background")) {
    document.documentElement.style.overflow = ""
    document.querySelector(".modal-card-background").classList.remove("modal-card-background-show")
  }
})

function formatCreditCard(number) {
  const value = number.replaceAll(" ", "").replace(/\D+/g, "").split("")
  if (value.length) {
    return value.reduce((seed, next, index) => {
      if (index !== 0 && !(index % 4)) {
        seed += " "
      }
      return seed + next
    })
  }
  return value
}

document.querySelector("#card-number").addEventListener("input", (el) => {
  el.target.value = formatCreditCard(el.target.value)
})

document.querySelector(".modal-add-card-form").addEventListener("submit", (el) => {
  let card = {}
  new FormData(el.target).forEach((k, v) => {
    card[v] = k
  })
  localStorage.setItem("card", JSON.stringify(card))
  document.documentElement.style.overflow = ""
  document.querySelector(".modal-card-background").classList.remove("modal-card-background-show")
})

document.querySelector(".form-button").addEventListener("click", () => {
  let name = document.querySelector(".form-find-name")
  let card = document.querySelector(".form-find-card")
  if (name.value === `${localStorage.getItem("fname")} ${localStorage.getItem("lname")}` && card.value === localStorage.getItem("cardNumber")) {
    document.querySelectorAll(".visiter-counter").forEach((el) => {
      el.innerText = localStorage.getItem("loginCount")
    })
    document.querySelectorAll(".books-owned").forEach((el) => {
      el.innerText = JSON.parse(localStorage.getItem("idItemOwned")).length
    })
    document.querySelector(".temp-show").style.display = "flex"
    document.querySelector(".always-show").style.display = "none"
    setTimeout(() => {
      name.value = ""
      card.value = ""
      document.querySelector(".temp-show").style.display = "none"
      document.querySelector(".always-show").style.display = ""
    }, 10000)
  }
  else {
    if (localStorage.getItem("loginCount")) {
      alert("this user not found")
    }
  }
})

console.log("Ваша оценка - 100 баллов \nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1) Вёрстка валидная. Для проверки валидности вёрстки используйте сервис https://validator.w3.org/Валидной вёрстке соответствует надпись \"Document checking completed. No errors or warnings to show.\" В таком случае баллы за пункт требований выставляем полностью.Eсли есть предупреждения - warnings, но нет ошибок - errors, выставляем половину баллов за пункт требований. \n\n2) `header`, `main`, `footer` \n\n3) Шесть элементов `section` (по количеству секций) \n\n4) Только один заголовок `h1`. Если элементов `h1` на странице больше одного, считаем это ошибкой. \n\n5) Пять заголовков `h2` (легко отличимы на верхних границах секций, имеют единый стиль) \n\n6) Один элемент `nav` (панель навигации в хедере) \n\n7) Два списка ul > li > a (панель навигации, ссылки на соцсети в футере) \n\n8) Семь кнопок `button` \n\n9) Два инпута `input` \n\n10) Блок `header`  Стараемся, чтобы текст совпадал с макетом. Если есть небольшие отклонения, то главное для нас, чтобы расстояние между элементами меню было одинаковое, 30px.  Элементы меню работают как якоря. При нажатии на один из них нас перебросит наверх соответствующего раздела.Сами элементы меню при наведении (эффект hover) должны быть интерактивными (решайте сами, должны ли они стновиться жирными или подчеркнутыми. Но обязательно курсор должен поменяться на cursor: pointer)Расстояние от самого меню до иконки пользователя - 40px. Иконка является отдльным элементом, и не входит в `nav`. Текст \"Brooklyn Public Library\" находится в `h1`. \n\n11) Секция `Welcome` \n\n12) Секция `About`Добавьте все картинки, которые будут использованы в папку с картинками. Даже если отображается всего 3, в папке должны быть все 5.Расстояния между кнопками пагинации 10px.Обратите внимание, что кнопки хоть и имеют вид круга, но интерактивная область (область нажатия, выделяемая cursor:pointer) должна быть размером +5px в каждую сторону (круглая, квадратная или со скошенными углами - на ваш выбор). Т.е. это будут прозрачные элементы размерами 26x26, внутри которых будут располагаться непосредственно кнопки 16x16. \n\n13) Секция `Favorites` Интерактивные кнопки дожны иметь структуру input type=\"radio\" + label.Добавьте небольшую область вокруг кнопки и надписи (например, 5px как в примере секции `about`) для того, чтобы была возможность легче наводить мышку.Картинок и описаний - много, для 4х секций. Их стоит добавить в проект. А лучше сразу на страницу, и скрыть с помощью CSS свойств, например display: none;.Кнопки \"buy\" должны быть интерактивными, плавно менять свой цвет при наведении на них, как указано в макете styleguides.Кнопка \"own\" не должна быть интерактивной, не должна нажиматься. И на ней должен присутствовать атрибут disabled. \n\n14) Секция `CoffeShop` \n\n15) Секция `Contacts`Карту можно вставить просто картинкой. Добавлять ее отдельным сервисом не обязательно.Везде, где в тексте встречаются цифры в виде телефонного номера, это должны быть ссылки с типом \"tel\" и номером.Там, где в тексте встречается текст с именем контактного лица, это должна быть ссылка с типом \"mailto\" и адресом почты (например, AmandaHirst@gmail.com). \n\n16) Секция `LibraryCard`\"Find your Library card\" - это должа быть форма с полями input.Желательно сделать ограничения в полях input на использование только букв и цифр, а также дефиса. Но это правило проверять не нужно.Все 3 кнопки должны быть интерактивными, плавно менять свой цвет при наведении на них, как указано в макете styleguides.Хоть иконки из модального окна (Visits, Bonuses, Books) сейчас не нужны будут, можно их добавить в соответствующую папку проекта. \n\n17) Блок `footer` - Адрес библиотеки должен быть ссылкой (место на карте, например).Иконки соцсетей также должны быть ссылками (можете вставить свои соцсети или любые другие аккаунты этих сервисов). Вместо Username должно быть ваше имя, как оно пишется на английском языке и ссылка на GitHub. \n\n18) Для построения сетки используются флексы или гриды (display: flex... или display: grid...) \n\n19) При уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону. Фон за рамками страницы может быть черным, белым или любого оттенка серого. \n\n20) Иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления \n\n21) Изображения добавлены в формате .jpg (.jpeg) или .png \n\n22) Есть favicon \n\n23) Плавная прокрутка по якорям \n\n24) В футере название ссылки Username заменено и ведет на GitHub студента \n\n25) В футере ссылка The Rolling Scopes School ведет на страницу курса https://rs.school/js-stage0/  \n\n26) Интерактивность элементов согласно макету. Интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета \n\n27) Обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы ")