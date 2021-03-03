import { useFocusEffect } from '@react-navigation/native';
import { useRef } from 'react';
import { IExchangeProps, IPreparedObjectProps } from '../modules/table';

export const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef();

    useFocusEffect(() => {
        savedCallback.current = callback;
    });

    useFocusEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    });
};

export const prepareData = function (
    data: IExchangeProps,
): IPreparedObjectProps[] {
    let tempArray = [];

    for (let property in data) {
        const tempObject = { ...data[property], name: property };
        tempArray.push(tempObject);
    }

    return tempArray;
};
