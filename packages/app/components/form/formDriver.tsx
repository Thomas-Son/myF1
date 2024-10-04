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

interface FormData {
  name: string;
  team: string;
  number: string;
  point: string;
  active: string;
}

interface Error {
  name?: string;
  team?: string;
  number?: string;
  active?: string;
}

type Props = {
  formId: string;
  driverForm: FormData;
  forNewDriver?: boolean;
};

export default function FormDriver({ formId, driverForm, forNewDriver = true }: Props) {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState(driverForm.name);
  const [team, setTeam] = useState(driverForm.team);
  const [number, setNumber] = useState(driverForm.number);
  const [point, setPoint] = useState(driverForm.point);
  const [active, setActive] = useState(driverForm.active);

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async ({ name, team, number, point, active }: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/drivers/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, team, number, point, active }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/drivers/${id}`, data, false); // Update the local data without a revalidation
      router.push("/admin/pilotes");
    } catch (error) {
      setMessage("Failed to update driver");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async ({ name, team, number, point, active }: FormData) => {
    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, team, number, point, active }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/admin/pilotes");
    } catch (error) {
      setMessage("Failed to add driver");
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {};
    if (!name) err.name = "Name is required";
    if (!team) err.team = "Owner is required";
    if (!number) err.number = "Species is required";
    if (!active) err.active = "Image URL is required";
    return err;
  };

  const handleSubmit = () => {
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewDriver ? postData({ name, team, number, point, active }) : putData({ name, team, number, point, active });
    } else {
      setErrors({ errs });
    }
  };

  return (
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%" bg="$black12">
      <YStack>
        <H2>{formId}</H2>
        <Separator/>

        <YStack alignItems="center">
          <Form onSubmit={handleSubmit}>
            <Label>Nom</Label>
            <Input
              placeholder="Nom du pilote"
              value={name}
              onChangeText={setName}
            />

            <Label>Équipe</Label>
            <Input
              placeholder="Équipe du pilote"
              value={team}
              onChangeText={setTeam}
            />

            <Label>Numéro</Label>
            <Input
              placeholder="Numéro du pilote"
              value={number}
              onChangeText={setNumber}
            />

            <Label>Point</Label>
            <Input
              size="$4"
              placeholder="Nombre de point du pilote"
              value={point}
              onChangeText={setPoint}
            />

            <Label>Actif</Label>
            <Input
              size="$4" 
              placeholder="Le pilote est il actif ?"
              value={active}
              onChangeText={setActive}
            />

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