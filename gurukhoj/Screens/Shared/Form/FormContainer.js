import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff', 
        width: width,
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20,
      },
      title: {
        color: '#4DBFFF',
        fontSize: 36,
        fontWeight: 400,
        // wordWrap: 'break-word',
      },
})

export default FormContainer;