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

export default function DriverAdmin() {

  const [drivers, setDrivers] = useState([])

  useEffect(() => {
        async function getData() {
            try {
                const posts = await (await fetch("/api/drivers")).json();
                setDrivers(posts.data);
                console.log(drivers)
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

  return(
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%">
      <H2>Liste des pilotes</H2>
      <Separator/>

      {
        !drivers ? (null)
        :
        (
          drivers.map((driver) => (
            <XStack justifyContent="space-between">
              <H3>{driver.name}</H3>
              <XStack gap="$4">
                <TextLink href={"/admin/pilotes/" + driver._id + "/modifier"}>
                    <Button width="$11">
                        Modifier
                    </Button>
                </TextLink>

                <TextLink href={"/admin/pilotes/" + driver._id + "/supprimer"}>
                    <Button width="$11">
                        Supprimer
                    </Button>
                </TextLink>
              </XStack>
            </XStack>
          ))
        )
      }

      <TextLink href="/admin/pilotes/ajouter">
        <Button width="$12" margin="auto">Ajouter</Button>
      </TextLink>
    </YStack>
  )
}