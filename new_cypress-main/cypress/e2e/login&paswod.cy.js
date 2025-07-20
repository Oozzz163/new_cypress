
describe('Проверка авторизации', function () {

   it('Верный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // Защли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввести правильный логин
        cy.get('#pass').type('iLoveqastudio1'); // Вести правильный пароль
        cy.get('#loginButton').click(); // нажать войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден пользователю
    })

    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
        cy.get('#forgotEmailButton').click(); // нажать забыли пароль
        cy.get('#mailForgot').type('german@dolnikov.ru'); // Ввёл почту для востановление пароля
        cy.get('#restoreEmailButton').click(); // нажать отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible') // Крестик виден пользователю 
    })

    it('Ввести неправильный пароль', function () {
        cy.visit('https://login.qa.studio'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввести правильный логин
        cy.get('#pass').type('iLoveqastudio1234'); // Вести неправильный пароль
        cy.get('#loginButton').click(); // нажать войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден пользователю 

    })

    it('Ввести неправильный логин', function () {
        cy.visit('https://login.qa.studio'); // Зашли на сайт
        cy.get('#mail').type('maxim@qa.studio'); // Ввести неправильный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввести правильный пароль
        cy.get('#loginButton').click(); // нажать войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден пользователю 

    }) 
    
    it('Ввести логин без @', function () {
        cy.visit('https://login.qa.studio'); // Зашли на сайт
        cy.get('#mail').type('germandolnikov.ru'); // Ввести лигин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввести правильный пароль
        cy.get('#loginButton').click(); // нажать войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден пользователю 

    })  

    it('проверка на строчные буквы', function () {
        cy.visit('https://login.qa.studio'); // Зашли на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввести логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввести правильный пароль
        cy.get('#loginButton').click(); // нажать войти
        cy.get('#messageHeader').contains('Такого логина и пароля нет');
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Крестик виден пользователю 

    })  

 }) 

 describe('Проверка покупки нового аватара', function () {                 // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
         cy.wait(2000);
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
         cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
         cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
         cy.get('.card_csv').type('125');                             // вводим CVV карты
         cy.get('.card_date').type('1226');                           // вводим срок действия карты
         cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
         cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
     });
 });