import { 
  Form,
  Input,
  Button,
  YStack,
  H2,
  Label,
  Separator
} from "@my/ui";
import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import SelectForm from "../utils/select";

interface FormData {
  name: string;
  point: string;
  active: string;
}

interface Error {
  name?: string;
  active?: string;
}

type Props = {
  formId: string;
  teamForm: FormData;
  forNewTeam?: boolean;
};

export default function FormTeam({ formId, teamForm, forNewTeam = true }: Props) {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState(teamForm.name);
  const [point, setPoint] = useState(teamForm.point);
  const [active, setActive] = useState(teamForm.active);

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async ({ name, point, active }: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/teams/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, point, active }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/teams/${id}`, data, false); // Update the local data without a revalidation
      router.push("/admin/equipes");
    } catch (error) {
      setMessage("Failed to update team");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async ({ name, point, active }: FormData) => {
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, point, active }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/admin/equipes");
    } catch (error) {
      setMessage("Failed to add pet");
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {};
    if (!name) err.name = "Name is required";
    if (!active) err.active = "Image URL is required";
    return err;
  };

  const handleSubmit = () => {
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewTeam ? postData({ name, point, active }) : putData({ name, point, active });
    } else {
      setErrors({ errs });
    }
  };

  const items = [
    { name: 'Oui' },
    { name: 'Non' }
  ]

  return (
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%" bg="$black12">
      <YStack>
        <H2>{formId}</H2>
        <Separator/>

        <YStack alignItems="center">
          <Form onSubmit={handleSubmit}>
            <Label>Nom</Label>
            <Input
              size="$4"
              placeholder="Nom de l'équipe"
              value={name}
              onChangeText={setName}
            />

            <Label>Point</Label>
            <Input
              size="$4"
              placeholder="Nombre de point de l'équipe"
              value={point}
              onChangeText={setPoint}
            />

            <Label>Actif</Label>
            <SelectForm value={active} setValue={setActive} title={"L'équipe est elle active ?"} list={items} />

            <Form.Trigger asChild>
              <Button width="$12" margin="auto" marginTop="$4">
                Ajouter
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>

      </YStack>

      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </YStack>
  );
};