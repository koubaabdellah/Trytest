class SlideoutMenu {
  constructor(el) {
    /* DOM elements */
    let obj = this;
    this.DOM = {el};
    this.DOM.treeItems = [...this.DOM.el.querySelectorAll('.menu__item--has-children')];

    /* Screen */
    this.isDesktop = window.innerWidth > 991;
    this.mq = window.matchMedia('(min-width: 991px)');

    /* Filter active menu from url */
    const urlSegments = window.location.pathname.split('/');

    /* Tree config */
    this.treeConfig = this.DOM.treeItems.map((item) => ({
      item: item,
      parentMenu: item.parentElement,
      link: item.firstElementChild,
      menu: item.querySelector('.menu'),
      backCtrl: item.querySelector('.menu--has-parent > li > .menu-back'),
      active: this.isActive(item.classList, urlSegments),
      level: Number(item.dataset.level),
    }));

    /* Variables */
    this.levelActive = 0;
    this.menuHeight = 0;
    this.menuWidth = 0;
    if (this.treeConfig.length) {
      this.menusActive = [
        {
          menu: this.treeConfig[0].parentMenu,
          initialHeight: this.treeConfig[0].parentMenu.offsetHeight,
        },
      ];
    } else {
      this.menusActive = [];
    }

    /* Init events */
    this.initEvents();

    /* Render initial state */
    this.renderTree();

    window.addEventListener('resize', function () {
      obj.renderTree();
    });
  }

  initEvents() {
    /* Init click events for every tree link */
    for (let index = 0; index < this.treeConfig.length; index++) {
      const treeItem = this.treeConfig[index];
      treeItem.link.addEventListener('click', () => this.toggle(treeItem));

      if (treeItem.backCtrl) {
        this.setBackLabel(treeItem);
      }
    }

    /* Init click events for every back control  */
    for (let index = 0; index < this.treeConfig.length; index++) {
      const treeItem = this.treeConfig[index];
      if (treeItem.backCtrl !== undefined && treeItem.backCtrl !== null) {
        treeItem.backCtrl.addEventListener('click', () => this.closeLevel(treeItem.level));
      }
    }

    /* Change desktop flag on change */
    this.mq.addEventListener('change', (event) => {
      this.isDesktop = event.matches;
    });
  }

  /* Set back control label based on item title */
  setBackLabel(item) {
    const backCtrlLabel = item.link.dataset.label;
    const backCtrlLabelNode = item.backCtrl.querySelector('.menu-back-title');
    backCtrlLabelNode.innerText = backCtrlLabel;
  }
  
  /* Close a level (back button) */
  closeLevel(level) {
    this.treeConfig = this.treeConfig.map((item) => {
      if (item.level === level) {
        item.active = false;
      }
      return item;
    });

    this.levelActive = level;
    this.renderTree();
  }

  /* Toggle item */
  toggle(item) {
    for (let index = 0; index < this.treeConfig.length; index++) {
      const treeItem = this.treeConfig[index];

      /* Check if there is already an item active with the same level | if true, disable, otherwise enable */
      if (treeItem.active && treeItem.level === item.level) {
        treeItem.active = false;
      } else if (!treeItem.active && treeItem.item === item.item) {
        treeItem.active = true;
      }

      /* Check if currently clicked item level is lower than tree items | if clicked and true, disbale the child items */
      if (item.level < treeItem.level && treeItem.active) {
        treeItem.active = false;
      }
    }

    /* Set appropriate level active */
    this.levelActive = item.active ? Number(item.menu.level) : item.level;

    /* Render classes on items */
    this.renderTree();
  }

  /* Render items with classes and attributes according to tree config state */
  renderTree() {
    /* Save an object of active levels */
    let activeLevels = {};
    for (let index = 0; index < this.treeConfig.length; index++) {
      const treeItem = this.treeConfig[index];
      if (treeItem.active) {
        activeLevels[treeItem.level] = treeItem.active;
      }
    }

    for (let index = 0; index < this.treeConfig.length; index++) {
      const treeItem = this.treeConfig[index];
      const state = treeItem.active ? 'add' : 'remove';

      /* Add classes based on item state */
      treeItem.link.classList[state]('is-active');
      if (treeItem.menu !== undefined && treeItem.menu !== null) {
        treeItem.menu.classList[state]('is-active');
      }

      /* If level is not active, add the class */
      treeItem.parentMenu.classList[activeLevels[treeItem.level] ? 'add' : 'remove']('is-active');

      /* Set appropriate menus active */
      this.setActiveMenus(treeItem);
    }

    /* Reset dimensions */
    this.menuHeight = 0;
    this.menuWidth = 0;

    /* Set height */
    for (let index = 0; index < this.menusActive.length; index++) {
      const item = this.menusActive[index];

      // reset element height to prevent overlapping column bug.
      item.menu.style.height = '';

      this.menuHeight = item.menu.offsetHeight > this.menuHeight ? item.menu.offsetHeight : this.menuHeight;
      this.menuWidth += item.menu.offsetWidth;
    }

    for (let index = 0; index < this.menusActive.length; index++) {
      const item = this.menusActive[index];
      item.menu.style.height = `${this.menuHeight}px`;
    }
  }

  /* Check which menus are active and store them in menusActive object */
  setActiveMenus(treeItem) {
    const itemExists = this.menusActive.find((item) => item.menu === treeItem.menu);

    /* Reset height for each item to initialHeight  */
    this.menusActive.forEach((item) => {
      item.menu.style.height = `${item.initialHeight}px`;
    });

    /**
     * Place item in menusActive object if treeItem is active and is not already included in object
     * Otherwise remove from object
     */
    if (treeItem.active) {
      if (!itemExists) {
        this.menusActive = [...this.menusActive, {menu: treeItem.menu, initialHeight: treeItem.menu.offsetHeight}];
      }
    } else if (itemExists) {
      this.menusActive = this.menusActive.filter((item) => item.menu !== treeItem.menu);
    }
  }

  isActive(itemClassList, urlSegments) {
    let active = false;
    itemClassList.forEach(function (classStr) {
      if (urlSegments.indexOf(classStr) > -1) {
        active = true;
        return false;
      }
    });
    return active;
  }
}

const SlideoutMenuNode = document.querySelector('.slideout-menu');
if (SlideoutMenuNode) {
  new SlideoutMenu(SlideoutMenuNode);
}
