import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../services/firebase";

const OffersBar = () => {
  const [hopiImage, setHopiImage] = useState([]);

  useEffect(() => {
    const listRef = ref(storage, "carouselOffers");

    listAll(listRef)
      .then((res) => {
        const itemsArray = [];

        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((downloadURL) => {
            itemsArray.push({
              name: itemRef.name,
              path: itemRef.fullPath,
              downloadURL,
            });

            itemsArray.sort((a, b) => {
              const aNumber = parseInt(a.name, 10);
              const bNumber = parseInt(b.name, 10);
              return aNumber - bNumber;
            });

            if (itemsArray.length === res.items.length) {
              setHopiImage(itemsArray);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.teklifTop}>
        <Text style={styles.teklifText}>Teklifi İncele</Text>
        <Text style={styles.teklifSayac}>1/15</Text>
      </View>
      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={hopiImage}
          keyExtractor={(item) => item.path}
          renderItem={({ item }) => (
            <Image source={{ uri: item.downloadURL }} style={styles.images} />
          )}
        />
      </View>
    </View>
  );
};

export default OffersBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  teklifTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teklifText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  teklifSayac: {
    fontWeight: "bold",
    backgroundColor: "#DFDFDF",
    fontSize: 12,
    borderRadius: 6,
    alignItems: "center",
    padding: 6,
  },
  images: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 3,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 10,
  },
});
