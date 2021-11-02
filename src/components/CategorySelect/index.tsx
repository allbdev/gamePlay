import React from "react";
import {ScrollView} from "react-native";

import {styles} from "./styles";
import {categories} from "../../utils/categories";
import Category from "../Category";

type Props = {
    categorySelected: string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean
}

export default function CategorySelect({categorySelected, setCategory, hasCheckBox = false}: Props){
    return(
        <ScrollView
            style={styles.container}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20, paddingLeft: 24}}
        >
            {
                categories.map((category) => {
                    return(
                        <Category
                            key={category.id}
                            title={category.title}
                            icon={category.icon}
                            checked={category.id === categorySelected}
                            onPress={() => setCategory(category.id)}
                            hasCheckBox={hasCheckBox}

                        />
                    )
                })
            }
        </ScrollView>
    )
}
