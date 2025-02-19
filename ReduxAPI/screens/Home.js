import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersThunk,
  deleteUserThunk,
} from "../components/redux/userSlice";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { users, loading, page, hasMore } = useSelector((state) => state.users);

  useEffect(() => {
    if (hasMore) {
      dispatch(fetchUsersThunk(page));
    }
  }, [dispatch, page, hasMore]);

  const handleDelete = (id) => {
    Alert.alert("Delete User?", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => dispatch(deleteUserThunk(id)),
        style: "destructive",
      },
    ]);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchUsersThunk(page));
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Add a Create User Button at the Top */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateUser")}
      >
        <Text style={styles.createButtonText}>Create User</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ddd",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.first_name}
                </Text>
                <Text>@{item.username || "unknown"}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateUser", { user: item })
                }
              >
                <Icon name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="small" style={{ margin: 10 }} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
