import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Container, H1, Right, Left } from 'native-base';

const SingleProgram = (props) => {
    const [item, setItem] = useState(props.route.params.item);

    return ( 
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{ uri: "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg" }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>
                        {item.gkprogramArea}
                    </H1>
                    <Text style={styles.contentText}>
                        {item.gkprogramSubject}
                    </Text>
                    <Text style={styles.contentText}>
                        {item.gkprogramAddress}
                    </Text>
                    <Text style={styles.contentText}>
                        {item.gkprogramStartTime}
                    </Text>
                    <Text style={styles.contentText}>
                        {item.gkprogramEndTime}
                    </Text>
                    
                </View>
                {/*TODO: add extra description, which needs ot be added in DB as well: */}
           
            </ScrollView>

            <View style={styles.bottomContainer}>
                    <Left>
                        <Text style={styles.price}>$ {item.gkprogramPrice}
                        </Text>
                    </Left>
                    <Right>
                        <Button title="Enroll"/>
                    </Right>

                </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '95%',
        width: '90%',
        borderWidth: 5,
        borderColor: '#4DBFFF',
        borderRadius: 50,
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        width: '85%',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default SingleProgram;
