'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
        }
    }
);

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const func = () => ApiConnector.getStocks(response => {
    if(response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});

func();
setInterval(() => func(), 60000);

const moneyManager = new MoneyManager();

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
        setMessage(response.success, "Валюта успешно конверктирована");
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

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    }
});

favoritesWidget.addUserToFavoritesForm = (data) => ApiConnector.addUserToFavorites(data,response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
        setMessage(response.success, "Пользователи успешно добавлены");
    } else {
        setMessage(response.success, response.error);
    }
});

favoritesWidget.removeUserCallback = (data) => ApiConnector.addUserToFavorites(data,response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
        setMessage(response.success, "Пользователи успешно удалены");
    } else {
        setMessage(response.success, response.error);
    }
});

