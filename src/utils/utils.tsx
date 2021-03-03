import { useFocusEffect } from '@react-navigation/native';
import { useRef } from 'react';
import { IExchangeProps, IPreparedObjectProps } from '../modules/table';

/**
 * Sets interval and executes callback every interval
 * 
 * @param {callback}  function to execute
 * @param {delay}  number mileseconds for interval
 */
export const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef();

    useFocusEffect(() => {
        //@ts-ignore
        savedCallback.current = callback;
    });

    useFocusEffect(() => {
        function tick() {
            //@ts-ignore
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    });
};


/**
 * Prepares data, if it was object with dynamic keys.
 * 
 * @param {data}  object - An object from response
 * @returns Array, that can be used in Flatlist for example
 */
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
