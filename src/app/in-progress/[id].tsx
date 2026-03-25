import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { List } from "@/components/List";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { Button } from "@/components/Button";

import { TransactionTypes } from "@/utils/TransactionTypes";

const details = {
  current: "R$ 1.000, 00",
  target: "R$ 5.000,00",
  percentage: 20,
};

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 400,00",
    date: "25/03/2026",
    description: "Descrição genérica",
    type: TransactionTypes.Input,
  },
  {
    id: "2",
    value: "R$ 350,00",
    date: "25/03/2026",
    description: "",
    type: TransactionTypes.Output,
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Nome de algo para comprar"
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => {}} />}
        emptymessage="Nenhuma transação. Toque em nova transação."
      />

      <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
    </View>
  );
}
