import { 
  YStack,
  H2,
  Button,
  Separator
} from "@my/ui";
import { TextLink } from "solito/link";

export default function Dashboard() {
  return(
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90vw">
      <H2>Panneau administrateur</H2>
      <Separator/>

      <YStack alignItems="center" gap="$4">
        <TextLink href="/admin/utilisateurs">
          <Button width="180px">Utilisateurs</Button>
        </TextLink>
        <TextLink href="/admin/gp">
          <Button width="180px">Grands Prix</Button>
        </TextLink>
        <TextLink href="/admin/pilotes">
          <Button width="180px">Pilotes</Button>
        </TextLink>
        <TextLink href="/admin/equipes">
          <Button width="180px">Équipes</Button>
        </TextLink>
        <TextLink href="/admin/paris">
          <Button width="180px">Paris</Button>
        </TextLink>
      </YStack>
      
    </YStack>
  )
}