var addressBook = {
    control: false,  // элемент селект
    target:  false,  // «цель» - элемент pre
    loader:  false,  // сообщение о загрузке
    xmlhttp: false,  // XMLHttpRequest

    // инициализация
    // controlId - id элемента select
    // sbmtBtnId - id кнопки submit
    // targetId - id элемента pre
    init: function(controlId, sbmtBtnId, targetId) {


        if (!document.getElementById(controlId) ||
            !document.getElementById(sbmtBtnId) ||
            !document.getElementById(targetId)) return;

        // создаем и проверяем объект XMLHttpRequest,
        // если возникли проблемы тихонько выходим
        addressBook.xmlhttp = window.ActiveXObject ?
                              new ActiveXObject("Microsoft.XMLHTTP") :
                              new XMLHttpRequest();                              
        if (!addressBook.xmlhttp) return;
        
        // удаляем кнопку submit
        // она нам нужна только если скрипт не запустится
        addressBook.removeElement(document.getElementById(sbmtBtnId));
        
        addressBook.control = document.getElementById(controlId);
        addressBook.target = document.getElementById(targetId);

        // добавляем обработчик события onchange элемента select
        addressBook.addEvent(addressBook.control, 'change',
                             function() {
                                 if (this.value != '')
                                     addressBook.getAddress(this.value);
                                 else
                                     addressBook.target.innerHTML = '';
                             });
    },

    // загрузка и отображение данных
    getAddress: function(id) {
        // даем пользователю знать, что началась загрузка данных
        addressBook.buildLoader();

        addressBook.xmlhttp.open('POST', 'index.php', true);
        // обязательное для POST указание Content-Type
        addressBook.xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        addressBook.xmlhttp.onreadystatechange = function() {
            if (addressBook.xmlhttp.readyState == 4) {
                if (addressBook.xmlhttp.status == 200) {
                    // удаляем сообщение о загрузке
                    addressBook.killLoader();
                    // вставляем полученную информацию в элемент pre
                    addressBook.target.innerHTML = addressBook.xmlhttp.responseText;
                }
            }
        };
        // отсылаем данные запроса
        addressBook.xmlhttp.send('id=' + id);
    },

    // создание сообщения о загрузке
    buildLoader: function() {
        addressBook.loader = document.createElement('div');
        addressBook.loader.id = 'loading';
        addressBook.loader.appendChild(document.createTextNode('Загрузка...'));
        document.body.appendChild(addressBook.loader);
    },

    // удаление сообщения о загрузке
    killLoader: function() {
        addressBook.removeElement(document.getElementById('loading'));
    },

    // удаление элемента
    removeElement: function(el) {
        el.parentNode.removeChild(el);
    },

    // добавление обработчика события
    addEvent: function(obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn, false);
        else if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            };
            obj.attachEvent('on' + type, obj[type + fn]);
        }
    }
};

// вызываем метод init() при загрузке страницы
// и передаем необходимые параметры
addressBook.addEvent(window, 'load', function() {
    addressBook.init('person', 'submit', 'address');
});
