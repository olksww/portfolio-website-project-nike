'use strict';
(() => {
  const en = Object.fromEntries([...document.querySelectorAll('[data-t]')].map(el => [el.dataset.t, el.textContent]));
  const uk = {
    skip:'Перейти до вмісту',home:'Головна',benefits:'Переваги',details:'Деталі',reviews:'Відгуки',contacts:'Контакти',create:'Створити пару ↗',
    heroTag:'● ТРОХИ ІНАКШЕ. ЦІЛКОМ ПО-ТВОЄМУ.',heroTitle:'Твої Nike мрії.',heroDescription:'Улюблений силует. Зовсім нова історія. Відкрий кастомні кросівки, які втілюють твої кольори.',heroButton:'Створи свою пару',heroNote:'Щоб виділятися. Щоб бути собою.',inspiration:'НАТХНЕННЯ КОЛЬОРОМ',heroBottom:'Класичний силует. Неочікуваний характер.',explore:'Відкрий ColoRawe ↓',
    whyTag:'БІЛЬШЕ, НІЖ КОЛІР',whyTitle:'Уся різниця — в деталях.',whyIntro:'Від першого ескізу до останнього мазка — кожна деталь на своєму місці.',quality:'Увага до якості',qualityText:'Знайома форма, свіжий погляд і увага до кожної деталі.',colour:'Колір із характером',colourText:'Виразні палітри, що перетворюють звичайну пару на щось особисте.',journey:'Твоя нова пригода',journeyText:'Обери розмір, поділися ідеєю та переглянь деталі своєї пари.',
    detailTag:'ТВОЇ КОЛЬОРИ. ТВОЇ ПРАВИЛА.',detailTitle:'Додай трохи своєї уяви.',detailText:'Почни з кольорового настрою. Додай розмір і власну деталь. Твоя наступна улюблена пара починається з ідеї.',step1:'Обери палітру',step1Text:'Aurora, Violet чи Sunset — знайди свій настрій.',step2:'Додай особисте',step2Text:'Обери розмір і розкажи, що уявляєш.',step3:'Переглянь свою ідею',step3Text:'Перевір усі деталі у вікні попереднього перегляду.',start:'Почни створювати свою пару ↗',
    reviewTag:'ЯСКРАВІ ПАРИ. ОСОБИСТІ ІСТОРІЇ.',reviewTitle:'Трохи любові до ColoRawe.',reviewNote:'Приклади відгуків з оригінального концепту.',quote1:'«Кросівки дуже зручні й добре пофарбовані. За рік нічого не стерлося.»',quote2:'«Дуже задоволена цими кольорами. Підходять до всього мого одягу.»',quote3:'«Саме те для вечірки. Ношу їх постійно — фарба супер.»',since2018:'З нами з 2018 року',since2020:'З нами з 2020 року',since2019:'З нами з 2019 року',
    orderTag:'ЗРОБІМО ЦЕ ОСОБИСТИМ',orderTitle:'Твоя нова пара. Твоя власна історія.',orderText:'Обери деталі та збери свою ідею докупи.',yourSelection:'ТВІЙ ВИБІР',demoNote:'Демонстрація концепту: оплата та замовлення не надсилаються. Твої дані залишаються на цій сторінці.',paletteLabel:'01 — Обери кольоровий настрій',sizeLabel:'Розмір EU',chooseSize:'Обери розмір',nameLabel:'Твоє ім’я',emailLabel:'Електронна пошта',countryLabel:'Країна',cityLabel:'Місто',ideaLabel:'Твоя ідея (необов’язково)',preview:'Переглянути мою пару',formNote:'Просто придивляєшся? Спробуй будь-яку палітру. Дані не надсилаються.',
    faqTag:'КІЛЬКА КОРИСНИХ ДЕТАЛЕЙ',faqTitle:'Гарні запитання.',faq1:'Можна обрати власні кольори?',faq1Text:'Візьми один із трьох настроїв за основу, а бажані кольори опиши в полі для ідеї.',faq2:'Це справжнє замовлення?',faq2Text:'Ні. Це інтерактивний концепт. Форма лише показує попередній перегляд: вона не надсилає дані та не приймає оплату.',faq3:'Як обрати розмір?',faq3Text:'Для демонстрації обери свій звичний розмір кросівок EU. Перед справжньою покупкою перевір розмірну сітку конкретної моделі.',footerTag:'Трохи кольору змінює все.',question:'Маєш запитання?',cooperate:'Співпрацюймо',advertising:'Реклама',independent:'Незалежний дизайн-концепт. Не пов’язаний із Nike.',backTop:'Нагору ↑',previewTag:'ТВОЯ ІДЕЯ В ДЕТАЛЯХ',previewTitle:'Виглядає чудово.',previewNote:'Це лише попередній перегляд. Замовлення не оформлено, дані нікуди не надіслано.',keepCreating:'Продовжити створення'
  };
  const form = document.querySelector('#order-form');
  const dialog = document.querySelector('#preview-dialog');
  const nav = document.querySelector('#navigation');
  const menu = document.querySelector('.menu-toggle');
  const colours = {Aurora:['#52d8db','#a341bb','#243e73'],Violet:['#ddbcff','#a16adf','#593694'],Sunset:['#ffc775','#ef8b83','#bf4d84']};
  let language = 'en';
  const t = key => (language === 'uk' ? uk : en)[key] || en[key];
  function updateSelection() {
    const palette = form.elements.palette.value;
    document.querySelector('#selection-name').textContent = palette;
    document.querySelector('#selection-size').textContent = form.elements.size.value ? `${t('sizeLabel')} · ${form.elements.size.value}` : t('chooseSize');
    document.querySelectorAll('#palette-preview span').forEach((el,index) => {el.style.backgroundColor = colours[palette][index];});
  }
  function closeMenu() {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
  function setLanguage(next) {
    language = next === 'uk' ? 'uk' : 'en';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-t]').forEach(el => {el.textContent = t(el.dataset.t);});
    document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.lang === language)));
    menu.setAttribute('aria-label',language === 'uk' ? 'Відкрити або закрити меню' : 'Toggle menu');
    nav.setAttribute('aria-label',language === 'uk' ? 'Головна навігація' : 'Main navigation');
    document.querySelector('.dialog-close').setAttribute('aria-label',language === 'uk' ? 'Закрити перегляд' : 'Close preview');
    document.querySelector('.detail-art').setAttribute('aria-label',language === 'uk' ? 'Кросівок Aurora у синьо-фіолетовому лісі' : 'Aurora custom sneaker in a blue and purple forest');
    document.title = language === 'uk' ? 'ColoRawe — Твої Nike мрії' : 'ColoRawe — Your dream Nike';
    try {localStorage.setItem('colorawe-language',language);} catch {}
    updateSelection();
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',() => setLanguage(button.dataset.lang)));
  menu.addEventListener('click',() => {const open = !nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event => {if(event.key === 'Escape' && nav.classList.contains('open')){closeMenu();menu.focus();}});
  document.addEventListener('click',event => {if(!event.target.closest('header')) closeMenu();});
  matchMedia('(min-width: 761px)').addEventListener('change',closeMenu);
  form.addEventListener('change',updateSelection);
  form.addEventListener('input',event => event.target.setCustomValidity(''));
  form.addEventListener('submit',event => {
    event.preventDefault();
    for(const name of ['name','country','city']) {
      const input = form.elements[name];
      if(!input.value.trim()) {input.setCustomValidity(language === 'uk' ? 'Заповни це поле.' : 'Please fill out this field.');input.reportValidity();return;}
    }
    const data = new FormData(form);
    const list = document.createElement('dl');
    const labels = {palette:language === 'uk'?'Палітра':'Palette',size:t('sizeLabel'),name:t('nameLabel'),email:t('emailLabel'),country:t('countryLabel'),city:t('cityLabel'),idea:t('ideaLabel')};
    for(const [key,label] of Object.entries(labels)) {
      const value = String(data.get(key) || '').trim();
      if(!value) continue;
      const row = document.createElement('div');row.className = 'preview-row';
      const term = document.createElement('dt');term.textContent = label;
      const detail = document.createElement('dd');detail.textContent = value;
      row.append(term,detail);list.append(row);
    }
    document.querySelector('#preview-content').replaceChildren(list);
    dialog.showModal();
  });
  document.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click',() => dialog.close()));
  dialog.addEventListener('click',event => {if(event.target === dialog){const rect = dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close();}});
  const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.isIntersecting){nav.querySelectorAll('a').forEach(link => {const active = link.hash === '#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});
  document.querySelectorAll('main section[id],footer[id]').forEach(section => observer.observe(section));
  document.querySelector('#year').textContent = new Date().getFullYear();
  try {language = localStorage.getItem('colorawe-language') || 'en';} catch {}
  setLanguage(language);
})();
