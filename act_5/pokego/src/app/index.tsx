import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const pokeAPI = "https://pokeapi.co/api/v2/pokemon/?limit=20";

interface Pokemon {
  name: string;
  image: string;
  ImageBack: string;
  type: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
export default function Index() {
  useEffect(() => {
    fetchPokemons();
  }, []);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function fetchPokemons() {
    try {
      const response = await fetch(pokeAPI);
      const data = await response.json();

      const detailPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            ImageBack: details.sprites.back_default,
            type: details.types,
          };
        }),
      );

      setPokemons(detailPokemons);

      console.log(JSON.stringify(detailPokemons, null, 2));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {pokemons.map((pokemon: Pokemon) => (
          <View key={pokemon.name}>
            <Text>{pokemon.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
