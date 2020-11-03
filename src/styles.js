import {StyleSheet, Dimensions} from 'react-native';
import { TopicItem } from './components';

export const topicItem = StyleSheet.create({
    container: {
        padding: 12,
        margin: 7,
        borferRadius: 6
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    }
})

export const introduction = StyleSheet.create({
    banner: {
        height: Dimensions.get('window') / 3,
        justifyContent: 'center'
    },
})