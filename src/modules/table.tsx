import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList,
    ScrollView,
} from 'react-native';
import { Palette } from '../styles/palette/palette';

interface IExchangeProps {
    [key: string]: {
        last: string,
        highestBid: string,
        percentChange: string,
    }
}

interface IPreparedObjectProps {
    last: string,
    highestBid: string,
    percentChange: string,
    name: string
}

const prepareData = function (data: IExchangeProps): IPreparedObjectProps[] {
    let tempArray = [];

    for (let property in data) {
        const tempObject = { ...data[property], name: property };
        tempArray.push(tempObject)
    }
    console.log(tempArray)

    return tempArray;
};

function row(item: IPreparedObjectProps) {

    return (
        <View style={styles.row}>
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column}>{item.highestBid}</Text>
            <Text style={styles.column}>{item.last}</Text>
            <Text style={styles.column}>{item.percentChange}</Text>
        </View>
    );
}

function Header() {

    return (
        <View style={styles.header}>
            <Text style={[styles.column, styles.title]}>Name</Text>
            <Text style={[styles.column, styles.title]}>Highest Bid</Text>
            <Text style={[styles.column, styles.title]}>Last</Text>
            <Text style={[styles.column, styles.title]}>Percent Change</Text>
        </View>
    );
}

export function Table() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<IPreparedObjectProps[]>([]);

    useEffect(() => {
        fetch('https://poloniex.com/public?command=returnTicker')
            .then((response) => response.json())
            .then((json) => prepareData(json))
            .then((data) => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.main}>
            {isLoading ? <ActivityIndicator /> : (
                <ScrollView horizontal>
                    <FlatList
                        // pagingEnabled={true}
                        ListHeaderComponent={<Header />}
                        data={data}
                        keyExtractor={(item, index) => item.name}
                        renderItem={(item) => (
                            row(item.item)
                        )}
                    />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    column: {
        width: 150
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 20,
        color: Palette.DODGER_BLUE,
    }
});
