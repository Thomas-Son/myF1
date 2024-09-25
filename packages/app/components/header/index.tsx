import { 
    CardHeader,
    YStack,
    Paragraph,
    H1,
    Nav,
    Button,
    Separator
} from "@my/ui"
import { AlignJustify } from '@tamagui/lucide-icons'
import { TextLink } from "solito/link"
import { useState } from "react"

export default function Header() {

    const [active, setActive] = useState(false)

    return (
        <CardHeader gap="$5" alignItems="center" bg="red">
            <TextLink href="/">
                <H1 color="white">myF1</H1>
            </TextLink>

            <Button 
                        icon={AlignJustify}
                        color="white"
                        bg="red"
                        scaleIcon={2}
                        onPress={() => setActive((x) => !x)}
                        hoverStyle={{ scale: 0.925 }}
                        pressStyle={{ scale: 0.875 }}
                    >
            </Button>

            {!active ? (null) : (
                <Nav alignItems="center">
                    <TextLink href="/gp">
                        <Paragraph color="white" fontSize="$5">Grand Prix</Paragraph>
                    </TextLink>
                    <TextLink href="/pilotes">
                        <Paragraph color="white" fontSize="$5">Pilotes</Paragraph>
                    </TextLink>
                    <TextLink href="/equipes">
                        <Paragraph color="white" fontSize="$5">Équipes</Paragraph>
                    </TextLink>
                    <TextLink href="/paris">
                        <Paragraph color="white" fontSize="$5">Paris</Paragraph>
                    </TextLink>
                    <TextLink href="/admin">
                        <Paragraph color="white" fontSize="$5">Administrateur</Paragraph>
                    </TextLink>
                </Nav>
            )}
        </CardHeader>
    )
}