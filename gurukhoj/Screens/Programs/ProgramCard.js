import React from "react"; 
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native'

var { width } = Dimensions.get("window");

const ProgramCard = (props) => {
    const { gkprogramSubject, gkprogramPrice } = props;

    return (
        <View style = {styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: "https://m.media-amazon.com/images/I/8179uEK+gcL._AC_UF1000,1000_QL80_.jpg" }}
            />
            <View style={styles.card}/>
            <Text style={styles.gkprogramSubject}>
                {gkprogramSubject && gkprogramSubject.length > 15 ? gkprogramSubject.substring(0, 15 - 3) + '...' : gkprogramSubject}
            </Text>
            <Text styles={styles.gkprogramPrice}>${gkprogramPrice}</Text>

            

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        borderWidth: 5,
        borderColor: '#4DBFFF',
        borderRadius: 50,
        backgroundColor: '#fff'
    }, 
    image: {
        width: width / 3 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -10
    }, 
    card: {
        marginBottom: 40,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    }, 
    gkprogramSubject: {
        fontWeight: "100",
        fontSize: 14, 
        textAlign: 'center'
    }, 
    gkprogramPrice: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default ProgramCard;
