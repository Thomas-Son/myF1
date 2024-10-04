import { 
  YStack,
  XStack,
  H2,
  H3,
  Button,
  Separator
} from "@my/ui";
import { TextLink } from "solito/link";
import { useEffect, useState } from "react";

export default function TeamAdmin() {

  const [gp, setGp] = useState([])

  useEffect(() => {
        async function getData() {
            try {
                const posts = await (await fetch("/api/gps")).json();
                setGp(posts.data);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

  return(
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%">
      <H2>Liste des Grand Prix</H2>
      <Separator/>

      {
        !gp ? (null)
        :
        (
          gp.map((data) => (
            <XStack justifyContent="space-between">
              <H3>{data.name}</H3>
              <XStack gap="$4">
                <TextLink href={"/admin/equipes/" + data._id + "/modifier"}>
                    <Button width="$11">
                        Modifier
                    </Button>
                </TextLink>

                <TextLink href={"/admin/equipes/" + data._id + "/supprimer"}>
                    <Button width="$11">
                        Supprimer
                    </Button>
                </TextLink>
              </XStack>
            </XStack>
          ))
        )
      }

      <TextLink href="/admin/gp/ajouter">
        <Button width="$12" margin="auto">Ajouter</Button>
      </TextLink>
    </YStack>
  )
}