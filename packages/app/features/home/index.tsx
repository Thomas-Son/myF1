import {
  Button,
  H2,
  Separator,
  YStack,
  XStack,
  SwitchThemeButton
} from '@my/ui'
import { TextLink } from 'solito/link'
import { Platform } from 'react-native'

export function HomeScreen() {

  return (
    <YStack f={1} gap="$8" margin="auto" marginTop="$8" width="90vw">
      
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
            <SwitchThemeButton />
        )}
      </XStack>

      <YStack gap="$4">
        <H2 ta="left" col="$color12">
          Formule 1
        </H2>
        <Separator/>

        <YStack alignItems="center" gap="$3">
          <TextLink href="/gp-2024">
            <Button width="180px">Grand Prix 2024</Button>
          </TextLink>
          <TextLink href="/pilotes">
            <Button width="180px">Pilotes</Button>
          </TextLink>
          <TextLink href="/equipe">
            <Button width="180px">Équipes</Button>
          </TextLink>
        </YStack>
      </YStack>

      <YStack gap="$4">
        <H2 ta="left" col="$color12">
          Pari
        </H2>
        <Separator />

        <YStack alignItems="center" gap="$3">
          <TextLink href="/regles">
            <Button width="180px">Règles</Button>
          </TextLink>
          <TextLink href="/paris">
            <Button width="180px">Pari</Button>
          </TextLink>
        </YStack>
      </YStack>

      <YStack gap="$4">
        <H2 ta="left" col="$color12">
          Administrateur
        </H2>
        <Separator />

        <YStack alignItems="center" gap="$3">
          <TextLink href="/admin">
            <Button width="180px">Administrateur</Button>
          </TextLink>
        </YStack>
      </YStack>

    </YStack>
  )
}