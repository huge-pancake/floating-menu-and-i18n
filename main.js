import { FloatingMenu } from './floating-menu.js';

// ---- All PUBLIC DATA ---- START

// i18n start
class i18n {
  static get map() {
    return {
      // senc
      'startNewGame': ['01010011 01110100 01100001 01110010 01110100 00100000 01101110 01100101 01110111 00100000 01000111 01100001 01101101 01100101', 'Start new Game', '开始新的游戏', 'Начните новую игру', 'Commencer une nouvelle partie'],
      'quitGame': ['01010001 01110101 01101001 01110100 00100000 01000111 01100001 01101101 01100101', 'Quit Game', '退出游戏', 'Выйти из игры', 'Quitter le jeu'],
      'archives': ['01000001 01110010 01100011 01101000 01101001 01110110 01100101 01110011', 'Archives', '存档', 'Архив', 'Les archives'],
      'settings': ['01010011 01100101 01110100 01110100 01101001 01101110 01100111 01110011', 'Settings', '设置', 'Настройки', 'Réglages'],
      'back': ['01000010 01100001 01100011 01101011', 'Back', '返回', 'Назад', 'Retour'],
      'language': ['01001100 01100001 01101110 01100111 01110101 01100001 01100111 01100101', 'Language', '语言', 'Язык', 'Langue']
    }
  }
  static set(lang) {
    if (this.langs.indexOf(lang) === -1) {
      console.error('Language code not support.');
      return;
    }
    window.localStorage.setItem('lang', lang);
    document.location.reload();
    console.log('Lang changed to ' + lang);
  }
  static get(key) {
    return this.map[key][this.langNum];
  }
  static get langs() {
    return [
      'bin',
      'en',
      'zh-CN',
      'ru',
      'fr',
    ];
  }
  static get lang() {
    return window.localStorage.getItem('lang') || 'bin';
  }
  static get langNum() {
    return this.langs.indexOf(this.lang);
  }
}
// i18n end

// menuPages start
const menuPages = {
  'lang': {
    'dir': 'vert',
    'text': i18n.get('language'),
    'items': [
      [i18n.get('back'), 'page("main")'],
      ['Binary ASCII Code', 'i18n.set("bin")'],
      ['English', 'i18n.set("en")'],
      ['简体中文 (中国大陆)', 'i18n.set("zh-CN")'],
      ['Русский', 'i18n.set("ru")'],
      ['Français', 'i18n.set("fr")'],
    ]
  },
  'main': {
    'dir': 'vert',
    'text': 'FloatingMenu&i18n',
    'items': [
      [i18n.get('startNewGame'), 'startNewGame()'],
      [i18n.get('archives'), 'page("archives")'],
      [i18n.get('settings'), 'page("settings")'],
    ]
  },
  'archives': {
    'dir': 'vert',
    'text': i18n.get('archives'),
    'items': [
      [i18n.get('back'), 'page("main")'],
    ]
  },
  'settings': {
    'dir': 'vert',
    'text': i18n.get('settings'),
    'items': [
      [i18n.get('back'), 'page("main")'],
      [i18n.get('language'), 'page("lang")'],
    ]
  }
};
// pageMenus end

// page start
function page(page) {
  let text = document.createElement('p');
  text.textContent = menuPages[page].text;
  let menu = document.createElement('div');
  menu.classList.add('flo-menu');
  menu.classList.add(menuPages[page].dir);
  for (let i = 0; i < menuPages[page].items.length; i++) {
    let item = document.createElement('button');
    item.textContent = menuPages[page].items[i][0];
    item.setAttribute('onclick', `PLDT.${menuPages[page].items[i][1]}`);
    menu.appendChild(item);
  }
  dialog.innerHTML = '';
  window.menus = [];
  dialog.appendChild(text);
  dialog.appendChild(menu);
  new FloatingMenu(menu);
}
// page end

// others start
function startNewGame() {
  console.log('new game starting');
}
// others end

window.PLDT = {
  'menuPages': menuPages,
  'i18n': i18n,
  'page': page,
  // others
  'startNewGame': startNewGame,
};

// ---- All PUBLIC DATA ---- END

const dialog = document.querySelector('.dialog');

page('main');

