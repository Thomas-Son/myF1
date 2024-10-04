import { 
  YStack,
  H2,
  Button,
  Separator
} from "@my/ui";
import { TextLink } from "solito/link";

export default function Dashboard() {
  return(
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%">
      <H2>Panneau administrateur</H2>
      <Separator/>

      <YStack alignItems="center" gap="$4">
        <TextLink href="/admin/utilisateurs">
          <Button width="$12">Utilisateurs</Button>
        </TextLink>
        <TextLink href="/admin/gp">
          <Button width="$12">Grands Prix</Button>
        </TextLink>
        <TextLink href="/admin/pilotes">
          <Button width="$12">Pilotes</Button>
        </TextLink>
        <TextLink href="/admin/equipes">
          <Button width="$12">Équipes</Button>
        </TextLink>
        <TextLink href="/admin/paris">
          <Button width="$12">Paris</Button>
        </TextLink>
      </YStack>
      
    </YStack>
  )
}