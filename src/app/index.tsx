import { Button, Text, View } from "react-native";

import { router } from "expo-router";

import { fontFamily } from "@/theme/fontFamily";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ fontFamily: fontFamily.bold }}>Teste</Text>
      <Button title="Novo" onPress={() => router.navigate("/target")} />
      <Button title="transação" onPress={() => router.navigate("/transaction/132")} />
      <Button title="Progresso" onPress={() => router.navigate("/in-progress/11")} />
    </View>
  );
}
