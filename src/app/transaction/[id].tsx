import { Alert, StatusBar, View } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionType } from "@/components/TransactionType";

import { TransactionTypes } from "@/utils/TransactionTypes";
import { useTransactionDatabase } from "@/database/useTransactionsDatabase";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input);
  const [isCreating, setIsCreating] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [observation, setObservation] = useState("");

  const params = useLocalSearchParams<{ id: string }>();
  const transactionsDatabase = useTransactionDatabase();

  async function handleCreate() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert("Atenção!", "Preencha o valor. Deve ser maior que zero.");
      }

      setIsCreating(true);

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });

      Alert.alert("Sucesso!", "Transação salva com sucesso", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Nova transação"
        subtitle="Cada valor guardado fica mais próximo de bater a meta"
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput
          label="Valor (R$)"
          placeholder="R$ 0,00"
          value={amount}
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: juntar para investir"
          onChangeText={setObservation}
        />
        <Button title="Salvar" onPress={handleCreate} isProcessing={isCreating} />
      </View>
    </View>
  );
}
