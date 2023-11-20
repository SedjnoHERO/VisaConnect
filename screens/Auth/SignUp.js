// Допустим, у вас есть компонент, в котором вы хотите добавить новую визу
import React, { useEffect } from 'react';
import addVisa from '../WelcomeScreens/WelcomeStep1'; // Путь к функции добавления визы

export default function MyComponent() {
    useEffect(() => {
        const newVisaData = {
            visaType: 'Туристическая',
            expirationDate: 'Дата окончания',
            cost: 100,
            country: 'Страна',
            numberOfEntries: 1,
            notes: 'Примечания'
        };

        addVisa(newVisaData); // Вызываем функцию добавления визы
    }, []);

    return null;
}
