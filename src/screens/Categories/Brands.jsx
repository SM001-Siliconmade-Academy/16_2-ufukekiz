import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {  getBrandList, selectCategoryBrands, selectCategoryBrandsError, selectCategoryBrandsStatus } from "./BrandsSlice";

const Brands = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const brandList = useSelector(selectCategoryBrands);
  const status = useSelector(selectCategoryBrandsStatus);
  const error = useSelector(selectCategoryBrandsError);

  useEffect(() => {
    async function fetchBrands() {
      try {
        // @ts-ignore
        await dispatch(getBrandList());
      } catch (error) {
        // handle error
      }
    }
    fetchBrands();
  }, [dispatch]);

  function handleNavigate(item) {
    // @ts-ignore
    navigation.navigate("Map", { item });
  }

  return (
    <View style={styles.container}>
      {status === "loading" && <Text>Loading...</Text>}
      {status === "failed" && <Text>{error}</Text>}
      {status === "succeeded" && (
        <FlatList
          data={brandList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.list}
              key={index}
              onPress={() => handleNavigate(item)}
            >
              <View style={styles.leftSide}>
                <Text style={styles.brandName}>{item.brandName}</Text>
                <Text style={styles.brandLocation}>{item.address}</Text>
              </View>
              <View style={styles.rightSide}>
                <Feather name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 2,
  },
  leftSide: {},
  brandName: {
    fontWeight: "900",
    paddingBottom: 10,
  },
  brandLocation: {
    fontWeight: "300",
  },
  rightSide: {},
});
