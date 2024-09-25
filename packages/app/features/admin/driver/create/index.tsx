import { 
  Form,
  Input,
  Button,
  YStack,
  H2,
  Label,
  Separator
} from "@my/ui";
import { useRouter } from "next/router";
import { useState } from "react";

interface FormData {
    name: string;
    team: string;
    number: number;
    point: number;
    active: string;
}

interface Error {
    name?: string;
}

export default function PostPlayer() {

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [number, setNumber] = useState(0);
  const [point, setPoint] = useState(0);
  const [active, setActive] = useState("");

  const postData = async ({ name, team, number, point, active }: FormData) => {
        try {
            const res = await fetch("/api/drivers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, team, number, point, active }),
            });

            console.log(res)

            if (!res.ok) {
                throw new Error(res.status.toString());
            }

            router.push("/admin");
        } catch (error) {
            setMessage("Le pilote n'a pas été ajouté.");
        }
    };

    const formValidate = () => {
        let err: Error = {};
        if (!name) err.name = "Entrer le nom du pilote";
        return err;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = formValidate();

        if (Object.keys(errs).length === 0) {
            postData({ name, team, number, point, active })
        } else {
            setErrors({ errs });
        }
    };

    const item = [
      { title: "Nom", name:"name", value: name, sValue: setName, type: "text", placeH:"Nom du pilote" },
      { title: "Équipe", name:"team", value: team, sValue: setTeam, type: "text", placeH:"Équipe du pilote" },
      { title: "Numéro", name:"number", value: number, sValue: setNumber, type: "number", placeH:"Numéro du pilote" },
      { title: "Nombre de point", name:"point", value: point, sValue: setPoint, type: "number", placeH:"Nombre de point" },
      { title: "Actif", name:"active", value: active, sValue: setActive, type: "text", placeH:"Actif" }
    ]

  return (
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90vw">
      <H2>Ajouter un pilote</H2>
      <Separator/>

      <YStack alignItems="center">
        <form onSubmit={handleSubmit}>

          {item.map((data) => {
            return (
              <>
                <Label>{data.title}</Label>
                <Input
                  size="$4" 
                  borderWidth={2}
                  width="70vw"
                  placeholder={data.placeH}
                  type={data.type}
                  name={data.name}
                  value={data.value}
                  onChange={(e) => {data.sValue(e.target.value)}}
                  required
                />
              </>
            )}
          )}

          <Button type="submit" className="btn" width="70vw" margin="auto" marginTop="8px">
            Ajouter
          </Button>
        </form>
      </YStack>

      {/* {errors}
      {message} */}
    </YStack>
  )
}