import { View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Meta" subtitle="Economize para alcançar as metas" />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" placeholder="Ex: Viagem para algum lugar" />
        <CurrencyInput label="Valor alvo (R$)" value={12345} />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
