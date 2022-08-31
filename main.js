import { FloatingMenu } from './floating-menu.js';

// ---- All PUBLIC DATA ---- START

// i18n start
class i18n {
  static get map() {
    return {
      // senc
      startNewGame: ['Start new Game', '开始新的游戏', 'Начните новую игру', 'Commencer une nouvelle partie'],
      startGame: ['Start Game', '开始游戏', 'Начать игру', 'Commencer le jeu.'],
      quitGame: ['Quit Game', '退出游戏', 'Выйти из игры', 'Quitter le jeu'],
      archives: ['Archives', '存档', 'Архив', 'Les archives'],
      deleteArchive: ['Delete Archive', '删除存档', 'Удалить архив', "supprimer l'archive"],
      settings: ['Settings', '设置', 'Настройки', 'Réglages'],
      back: ['Back', '返回', 'Назад', 'Retour'],
      language: ['Language', '语言', 'Язык', 'Langue'],
      direction: ['Direction', '方向', 'Направление', 'Direction'],
      vertical: ['Vertical', '纵向', 'Вертикальный', 'Vertical'],
      vertical: ['Horizontal', '横向', 'Горизонтальный', 'Horizontal'],
    };
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
    return ['en', 'zh-CN', 'ru', 'fr'];
  }
  static get lang() {
    return window.localStorage.getItem('lang') || 'en';
  }
  static get langNum() {
    return this.langs.indexOf(this.lang);
  }
}
// i18n end

// dir start
class Dir {
  static set(dir) {
    if (this.dirs.indexOf(dir) === -1) {
      console.error('Direction not support.');
      return;
    }
    window.localStorage.setItem('dir', dir);
    document.location.reload();
    console.log('Dir changed to ' + dir);
  }
  static get dirs() {
    return ['vert', 'horiz'];
  }
  static get dir() {
    return window.localStorage.getItem('dir') || 'vert';
  }
  static get dirNum() {
    return this.langs.indexOf(this.lang);
  }
}
// dir end

// menuPages start
const menuPages = () => {
  return {
    main: {
      dir: Dir.dir,
      text: 'FloatingMenu&i18n',
      items: [
        [i18n.get('startNewGame'), 'startNewGame()'],
        [i18n.get('archives'), 'gotoPage("archives")'],
        [i18n.get('settings'), 'gotoPage("settings")'],
      ],
    },
    // << main
    archives: {
      dir: Dir.dir,
      text: i18n.get('archives'),
      items: [
        [i18n.get('back'), 'gotoPage("main")'],
        ['Archive 1', 'gotoPage("arch1")'],
      ],
    },
    // << archives
    arch1: {
      dir: Dir.dir,
      text: 'Archive 1',
      items: [
        [i18n.get('back'), 'gotoPage("archives")'],
        [i18n.get('deleteArchive'), 'arch.delete("arch1")'],
        [i18n.get('startGame'), 'arch.start("arch1")'],
      ],
    },
    // >>
    settings: {
      dir: Dir.dir,
      text: i18n.get('settings'),
      items: [
        [i18n.get('back'), 'gotoPage("main")'],
        [i18n.get('language'), 'gotoPage("lang")'],
        [i18n.get('direction'), 'gotoPage("dir")'],
      ],
    },
    // << settings
    lang: {
      dir: Dir.dir,
      text: i18n.get('language'),
      items: [
        [i18n.get('back'), 'gotoPage("settings")'],
        ['English', 'i18n.set("en")'],
        ['简体中文 (中国大陆)', 'i18n.set("zh-CN")'],
        ['Русский', 'i18n.set("ru")'],
        ['Français', 'i18n.set("fr")'],
      ],
    },
    dir: {
      dir: Dir.dir,
      text: i18n.get('direction'),
      items: [
        [i18n.get('back'), 'gotoPage("settings")'],
        [i18n.get('vertical'), 'Dir.set("vert")'],
        [i18n.get('vertical'), 'Dir.set("horiz")'],
      ],
    },
    // >>
    // >>
  };
};
// pageMenus end

// page start
/**
 * @param {string} which
 */
function gotoPage(which) {
  const page = menuPages()[which];
  let text = document.createElement('p');
  text.textContent = page.text;
  let menu = document.createElement('div');
  menu.classList.add('flo-menu');
  menu.classList.add(page.dir);
  for (let i = 0; i < page.items.length; i++) {
    let item = document.createElement('button');
    item.textContent = page.items[i][0];
    item.setAttribute('onclick', `PLDT.${page.items[i][1]}`);
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
  i18n: i18n,
  Dir: Dir,
  menuPages: menuPages,
  gotoPage: gotoPage,
  // others
  startNewGame: startNewGame,
};

// ---- All PUBLIC DATA ---- END

const dialog = document.querySelector('.dialog');

gotoPage('main');
