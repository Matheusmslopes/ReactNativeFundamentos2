import { Alert, StatusBar, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { HomeHeader } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

import { numberToCurrency } from "@/utils/numberToCurrecy";

import { useTargetDatabase } from "@/database/useTargetDatabase";

const summary = {
  total: "R$2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90" },
  output: { label: "Saídas", value: "-R$ 883.90" },
};

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const targetDatabase = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.ListBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

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
