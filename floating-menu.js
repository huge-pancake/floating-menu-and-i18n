window.menus = [];

export class FloatingMenu {
  el;
  get items() {
    return [...this.el.querySelectorAll('button')];
  };
  get indicator() {
    return this.el.querySelector('.indicator');
  };
  constructor(el) {
    this.el = el;
    this.el.innerHTML += '<span class="indicator"></span>';
    this.items.forEach(item => {
      item.setAttribute('tabindex', '-1');
    });

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    window.menus.push(this);
    this.focus(0);
  }

  get activeIndex() {
    const index = this.items.indexOf(this.el.querySelector('.active'));
    if (index !== -1)
      return index;
    else
      return 0;
  }
  getRect(index) {
    return this.items[index].getBoundingClientRect();
  }
  focus(index) {
    const rect = this.getRect(index);
    this.indicator.style.top = rect.top + 'px';
    this.indicator.style.left = rect.left + 'px';
    this.indicator.style.width = rect.width + 'px';
    this.indicator.style.height = rect.height + 'px';
    this.items[this.activeIndex].setAttribute('tabindex', '-1');
    this.items[this.activeIndex].classList.remove('active');
    this.items[index].setAttribute('tabindex', '0');
    this.items[index].classList.add('active');
    this.items[index].focus();
  }
  handleKeyDown(e) {
    if (e.ctrlKey || e.mateKey || e.altKey || e.shiftKey) return;
    const { key } = e;
    let targetI = 0;
    switch (key) {
      case 'k':
      case 'h':
        targetI = this.activeIndex - 1;
        targetI < 0 ? this.indicator.classList.add('up') : this.focus(targetI);
        break

      case 'j':
      case 'l':
        targetI = this.activeIndex + 1;
        targetI > this.items.length - 1 ? this.indicator.classList.add('down') : this.focus(targetI);
        break;

      case ' ':
        this.indicator.classList.add('press');

      default:
      break;
    }
  }
  handleKeyUp(e) {
    if (e.key === ' ') {
      this.indicator.classList.remove('press');
    }
    this.indicator.classList.remove('up');
    this.indicator.classList.remove('down');
  }
}

export function handleResize() {
  menus.forEach(menu => {
    menu.focus(menu.activeIndex);
  });
}

window.addEventListener('resize', handleResize.bind(this));

