import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar, Searchbar, Card, Paragraph } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const api = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const getMeals = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setMeals(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Appbar.Header>
          {/* <Appbar.Content title="Recipe App" /> */}
          <Text style={styles.header}>Max's Recipe App</Text>
          {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
         </Appbar.Header>
        <Searchbar
          placeholder="search here..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <ScrollView>
          {meals.map((meal) => (
            <Card key={meal.idCategory} style={styles.card}>
              <Card.Title title={meal.strCategory} />
              <Card.Cover source={{ uri: meal.strCategoryThumb }} />
              <Card.Content>
                <Paragraph>{meal.strCategoryDescription}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
        {/* <StatusBar style="auto" /> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  card: {
    margin: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
