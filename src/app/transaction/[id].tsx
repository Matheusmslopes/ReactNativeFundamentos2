import { View } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionType } from "@/components/TransactionType";

import { TransactionTypes } from "@/utils/TransactionTypes";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input);
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="Cada valor guardado fica mais próximo de bater a meta"
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput label="Valor (R$)" value={0} />
        <Input label="Motivo (opcional)" placeholder="Ex: juntar para investir" />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
