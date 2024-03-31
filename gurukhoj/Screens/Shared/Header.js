import React from "react"
import { StyleSheet, Image, SafeAreaView, View,} from "react-native"

const Header = () => {
    return (
        
        <SafeAreaView style={styles.header}>
           <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </SafeAreaView>
    )
    }
    const styles = StyleSheet.create({
        header: {
            width: "100%",
            flexDirection: 'row',
            alignContent: "center",
            justifyContent: "center",
            padding: 20,
            marginTop: 80
        },
        logo: {
            width: 216, 
            height: 69, 
            alignItems: 'center', 
            justifyContent: 'center', 
          },
    })


export default Header;