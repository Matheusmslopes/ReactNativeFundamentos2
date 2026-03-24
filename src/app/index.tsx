import { StatusBar, View } from "react-native";
import { router } from "expo-router";

import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";

const summary = {
  total: "R$2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90" },
  output: { label: "Saídas", value: "-R$ 883.90" },
};

const targets = [
  {
    id: "1",
    name: "Comprar alguma coisa",
    percentage: "10%",
    current: "10",
    target: "100",
  },
  {
    id: "2",
    name: "Comprar um PC",
    percentage: "50%",
    current: "R$ 5.000,00",
    target: "R$ 10.000,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        title="Metas"
        keyExtractor={(item) => item.id}
        data={targets}
        renderItem={({ item }) => (
          <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />
        )}
        emptymessage="Nenhuma meta. Toque em nova meta para adicionar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova Meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
