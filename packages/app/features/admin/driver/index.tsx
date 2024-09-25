import { 
  YStack,
  H2,
  Button,
  Separator
} from "@my/ui";
import { TextLink } from "solito/link";

export default function DriverAdmin() {
  return(
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%">
      <H2>Liste des pilotes</H2>
      <Separator/>

      {/* map list of drivers */}

      <TextLink href="/admin/pilotes/ajouter">
        <Button width="$12" margin="auto">Ajouter</Button>
      </TextLink>
    </YStack>
  )
}