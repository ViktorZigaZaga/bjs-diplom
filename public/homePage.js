'use strict'

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => ApiConnector.logout(response => {
    if(response.success) {
        location.reload();
        clearInterval(interval);
        setMessage(response.success, "Выход из личного кабинета успешно произведен");
    } else {
        setMessage(response.success, response.error);
    }
});

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        setMessage(response.success, "Информация о пользователе успешно получена");
    } else {
        setMessage(response.success, response.error);
    }
});

const func = () => ApiConnector.getStocks(response => {
    if(response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
        setMessage(response.success, "Текущий курс валют успешно получен");
    } else {
        setMessage(response.success, response.error);
    }
});

func();
let interval = setInterval(func(), 60000);

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data); 
        setMessage(response.success, "Баланс успешно пополнен");
    } else {
        setMessage(response.success, response.error);
    }
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data); 
        setMessage(response.success, "Валюта успешно конвертирована");
    } else {
        setMessage(response.success, response.error);
    }
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data); 
        setMessage(response.success, "Валюта успешно переведена");
    } else {
        setMessage(response.success, response.error);
    }
});

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
        setMessage(response.success, "Список пользователей успешно получен");
    } else {
        setMessage(response.success, response.error);
    }
});

favoritesWidget.addUserToFavoritesForm = (data) => ApiConnector.addUserToFavorites(data,response => {
    if(response.success) {
        getFavorites(response);
        setMessage(response.success, "Пользователи успешно добавлены");
    } else {
        setMessage(response.success, response.error);
    }
});

favoritesWidget.removeUserCallback = (data) => ApiConnector.addUserToFavorites(data,response => {
    if(response.success) {
        getFavorites(response);
        setMessage(response.success, "Пользователи успешно удалены");
    } else {
        setMessage(response.success, response.error);
    }
});

