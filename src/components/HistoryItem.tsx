import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface HistoryItemProps {
    id: string;
    title: string;
    date: string;
    location: string;
    onPress?: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
    id,
    title,
    date,
    location,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress && onPress(id)}
            activeOpacity={0.7}
        >
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    infoContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    location: {
        fontSize: 14,
        color: '#888',
    },
});

export default HistoryItem;