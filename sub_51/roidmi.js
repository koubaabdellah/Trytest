const Roidmi = function () { };

Roidmi.prototype.PageInit = () => {
    Roidmi.MemuDropDownInit();
    Roidmi.MainMenuSticky();
    Roidmi.BurgerNavToggle();
    //Roidmi.MiniCartInit();
    Roidmi.ProfileLayerInit();
    Roidmi.LanguageLayerInit();
    Roidmi.ProductThumbInit();
}

Roidmi.MemuDropDownInit = () => {
    const hasDropdown = document.querySelectorAll('.has-dropdown');
    hasDropdown.forEach((item) => {
        const dropdown = item.querySelector('.navbar-dropdown');
        dropdown.style.minWidth = item.clientWidth + 25 + 'px'
        item.addEventListener('mouseover', (event) => {
            dropdown.classList.toggle('open');
        });
        item.addEventListener('mouseout', () => {
            dropdown.classList.remove('open');
        });

    });
}
Roidmi.MainMenuSticky = () => {
    const header = document.querySelector('.pageHeader');

    window.addEventListener('scroll', (event) => {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        //console.log(header.scrollTop)
        if (t >= header.clientHeight) {
            //nav.classList.add('nav-scroll-color');
            header.style.position = 'fixed'
            document.body.style.marginTop = header.clientHeight + 'px';
        } else {
            //nav.classList.remove('nav-scroll-color');
            header.style.position = 'sticky';
            document.body.style.marginTop = 0;
        }
    });
}
Roidmi.BurgerNavToggle = () => {
    const burger = document.querySelector(".navbar-trigger");
    const nav = document.querySelector(".navbar-menu");
    const navLinks = document.querySelectorAll(".navbar-menu .navbar-item");

    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");

        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });
}



Roidmi.MiniCartInit = () => {

    const minicart = document.querySelector('.page-minicart');
    //console.log('minicart', minicart)
    const cartButton = document.querySelector('.nav-btn-basket');
    const body = document.querySelector('body');
    const header = document.querySelector('.pageHeader');
    let t = document.documentElement.scrollTop || document.body.scrollTop;


    cartButton.addEventListener('click', (event) => {

        const layers = document.querySelectorAll('.js-popOverLayer');
        layers.forEach((item) => {
            console.log(item)
            item.classList.remove('open');
        });


        event.cancelBubble = true;
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        const cartRects = cartButton.getBoundingClientRect();
        minicart.style.top = t + header.clientHeight + 'px'
        if (minicart.classList.contains('open')) {
            minicart.classList.remove('open');
        }
        else {
            minicart.classList.add('open');
            minicart.style.left = cartRects.right - minicart.clientWidth + 'px';
        }
    }, { once: false });

    window.addEventListener('scroll', (event) => {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        minicart.style.top = t + header.clientHeight + 'px'
    });
    window.addEventListener('resize', () => {
        minicart.classList.remove('open');
    })

    body.addEventListener('click', (event) => {
        if (!event.target.classList.contains('page-minicart')) {
            minicart.classList.remove('open');
        }
    });
}



Roidmi.ProfileLayerInit = () => {

    const profileLayer = document.querySelector('.page-profile-layer');
    const cartButton = document.querySelector('.nav-btn-profile');
    const body = document.querySelector('body');
    const header = document.querySelector('.pageHeader');
    let t = document.documentElement.scrollTop || document.body.scrollTop;
    if (profileLayer) {
        const inputs = profileLayer.querySelectorAll('input[type=text], input[type=password]');
        if (inputs) {
            inputs.forEach((item) => {
                //console.log(item)
                item.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
        }
    }

    cartButton.addEventListener('click', (event) => {
        event.cancelBubble = true;

        const layers = document.querySelectorAll('.js-popOverLayer');
        layers.forEach((item) => {
            //console.log(item)
            item.classList.remove('open');
        });

        let t = document.documentElement.scrollTop || document.body.scrollTop;
        const cartRects = cartButton.getBoundingClientRect();
        profileLayer.style.top = t + header.clientHeight + 'px'
        if (profileLayer.classList.contains('open')) {
            profileLayer.classList.remove('open');
        }
        else {
            profileLayer.classList.add('open');
            profileLayer.style.left = cartRects.right - profileLayer.clientWidth + 'px';
        }
    }, { once: false });

    window.addEventListener('scroll', (event) => {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        profileLayer.style.top = t + header.clientHeight + 'px'
    });
    window.addEventListener('resize', () => {
        profileLayer.classList.remove('open');
    })

    body.addEventListener('click', (event) => {
        if (!event.target.classList.contains('page-profile-layer')) {
            profileLayer.classList.remove('open');
        }
    });
}
Roidmi.LanguageLayerInit = () => {

    const profileLayer = document.querySelector('.page-language-layer');
    const cartButton = document.querySelector('.nav-btn-language');
    const body = document.querySelector('body');
    const header = document.querySelector('.pageHeader');
    let t = document.documentElement.scrollTop || document.body.scrollTop;
    if (cartButton == null) {
        return;
    }

    cartButton.addEventListener('click', (event) => {
        event.cancelBubble = true;

        const layers = document.querySelectorAll('.js-popOverLayer');
        layers.forEach((item) => {
            console.log(item)
            item.classList.remove('open');
        });

        let t = document.documentElement.scrollTop || document.body.scrollTop;
        const cartRects = cartButton.getBoundingClientRect();
        profileLayer.style.top = t + header.clientHeight + 'px'
        if (profileLayer.classList.contains('open')) {
            profileLayer.classList.remove('open');
        }
        else {
            profileLayer.classList.add('open');
            profileLayer.style.left = cartRects.right - profileLayer.clientWidth + 'px';
        }
    }, { once: false });

    window.addEventListener('scroll', (event) => {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        profileLayer.style.top = t + header.clientHeight + 'px'
    });
    window.addEventListener('resize', () => {
        profileLayer.classList.remove('open');
    })

    body.addEventListener('click', (event) => {
        if (!event.target.classList.contains('page-language-layer')) {
            profileLayer.classList.remove('open');
        }
    });
}

Roidmi.ProductThumbInit = () => {
    const current = document.querySelector('#ProductStandardImage');

    const imgs = document.querySelector('.product__images--thumb-image');

    if (!current && !imgs) {
        return;
    }
    const img = document.querySelectorAll('.product__images--thumb-image img');
    if (img.length == 0) {
        return;
    }
    const opacity = 0.6;

    // Set first img opacity
    img[0].style.opacity = opacity;

    imgs.addEventListener('click', imgClick);

    function imgClick(e) {

        //to avoid clicking between images
        if (e.target.localName === 'img') {
            // Reset the opacity
            img.forEach(img => (img.style.opacity = 1));

            // Change current image to src of clicked image
            current.src = e.target.dataset.src;
            //console.log(e.target.dataset.src)
            // Add fade in class
            current.classList.add('fade-in');

            // Remove fade-in class after .5 seconds
            setTimeout(() => current.classList.remove('fade-in'), 500);

            // Change the opacity to opacity var
            e.target.style.opacity = opacity;
        }
    }
}

var tabLinks = document.querySelectorAll(".tab-links");
var tabContent = document.querySelectorAll(".tab-content");
tabLinks.forEach(function (el) {
    el.addEventListener("click", openTabs);
});


function openTabs(el) {
    var btnTarget = el.currentTarget;
    var targetid = btnTarget.dataset.targetid;
    if (btnTarget.classList.contains('active')) {
        btnTarget.classList.remove("active");
        document.querySelector("#" + targetid).classList.remove("active");
        return;
    }

    tabContent.forEach(function (el) {
        el.classList.remove("active");
    });

    tabLinks.forEach(function (el) {
        el.classList.remove("active");
    });

    document.querySelector("#" + targetid).classList.add("active");

    btnTarget.classList.add("active");
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add("visible");
}

// When the user clicks on <span> (x), close the modal or
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target.classList.contains("modal") || event.target.className == "close") {
        var allModals = document.querySelectorAll(".modal");
        allModals.forEach(function (modalBox) {
            modalBox.classList.remove("visible");
        });
    }
}

function AddToCartGTM(self, currencyCode, productName, productId, productPrice, productCategory, quantity) {
    //console.log(arguments)
    try {
        dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode': currencyCode,
                'add': {                                // 'add' actionFieldObject measures.
                    'products': [{                        //  adding a product to a shopping cart.
                        'name': productName,
                        'id': productId,
                        'price': productPrice,
                        'category': productCategory,
                        'quantity': quantity
                    }]
                }
            }
        });
    }
    catch (exp) {
        console.warn(exp);
    }

    self.form.submit();
}

function AddToCartGTMNoSubmit(self, currencyCode, productName, productId, productPrice, productCategory, quantity) {
    //console.log(arguments)
    try {
        dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode': currencyCode,
                'add': {                                // 'add' actionFieldObject measures.
                    'products': [{                        //  adding a product to a shopping cart.
                        'name': productName,
                        'id': productId,
                        'price': productPrice,
                        'category': productCategory,
                        'quantity': quantity
                    }]
                }
            }
        });
    }
    catch (exp) {
        console.warn(exp);
    }
}

function asyncAddToCart(btn, url, addedText) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            var itemsincart = document.getElementById("items-in-cart");
            itemsincart.classList.add("items-in-cart");
            document.getElementById("items-in-cart").innerHTML = response;

            btn.disabled = true;
            btn.classList.add("disabled");
            btn.classList.add("btn-default");
            btn.classList.remove("btn--primary");
            btn.innerHTML = "<i class='fas fa-check-circle text-green'></i><span class='text-green'> " + addedText + "</span>";
        });
}


function asyncAddToCartAndOpenModal(btn, url) {
    btn.disabled = true;
    btn.classList.add("disabled");
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            var itemsincart = document.getElementById("items-in-cart");
            itemsincart.classList.add("items-in-cart");
            document.getElementById("items-in-cart").innerHTML = response;
            openModal('addtocartModal');
        });

    window.setTimeout(function () {
        btn.disabled = false
        btn.classList.remove("disabled");
    }, 2000);

}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.height) {
            panel.style.height = null;
        } else {
            panel.style.height = (panel.scrollHeight + 25) + "px";
        }
    }
}