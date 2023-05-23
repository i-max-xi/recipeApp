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

  const filteredMeals = meals.filter((meal) =>
    meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaProvider> 
      <View style={styles.container}>
        <Appbar.Header>
          <Text style={styles.header}>Max's Recipe App</Text>
        </Appbar.Header>
        <Searchbar
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        <ScrollView>
          {filteredMeals.map((meal) => (
            <Card key={meal.idCategory} style={styles.card}>
              <Card.Title title={meal.strCategory} />
              <Card.Cover source={{ uri: meal.strCategoryThumb }} />
              <Card.Content>
                <Paragraph>{meal.strCategoryDescription}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 0,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    padding: 10,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 35,
    backgroundColor: "#f2f2f2",
    width: "60%",
    alignSelf: "center",
  },
  card: {
    margin: 20,
  },
 
});
