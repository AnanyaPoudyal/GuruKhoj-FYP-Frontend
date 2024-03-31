import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

import ProgramCard from "./ProgramCard";

var {width} = Dimensions.get("window");

const ProgramList = (props) => {
    const { item, navigation } = props; // Destructure navigation from props
    return (
        <TouchableOpacity style={{ width: '50%' }}
            onPress={() =>
                navigation.navigate("Program Details", { item: item })
            }
        >
            <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
                <ProgramCard {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default ProgramList;
