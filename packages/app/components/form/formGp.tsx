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
  track: string;
  state: string;
  first: string;
  second: string;
  third: string;
}

interface Error {
  name?: string;
  track?: string;
  state?: string;
}

type Props = {
  formId: string;
  gpForm: FormData;
  forNewGp?: boolean;
};

export default function FormGp({ formId, gpForm, forNewGp = true }: Props) {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState(gpForm.name);
  const [track, setTrack] = useState(gpForm.track);
  const [state, setState] = useState(gpForm.state);
  const [first, setFirst] = useState(gpForm.first);
  const [second, setSecond] = useState(gpForm.second);
  const [third, setThird] = useState(gpForm.third);

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async ({ name, track, state, first, second, third }: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/gps/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, track, state, first, second, third }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/gps/${id}`, data, false); // Update the local data without a revalidation
      router.push("/admin/gp");
    } catch (error) {
      setMessage("Failed to update gp");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async ({ name, track, state, first, second, third }: FormData) => {
    try {
      const res = await fetch("/api/gps", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({ name, track, state, first, second, third }),
      });

      // Throw error with status code in case Fetch API req failed
      console.log({ name, track, state, first, second, third })
      console.log(res)
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/admin/gp");
    } catch (error) {
      setMessage("Failed to add gp");
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {};
    if (!name) err.name = "Name is required";
    if (!track) err.track = "Owner is required";
    if (!state) err.state = "Species is required";
    return err;
  };

  const handleSubmit = () => {
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewGp ? postData({ name, track, state, first, second, third }) : putData({ name, track, state, first, second, third });
    } else {
      setErrors({ errs });
    }
  };

  const items = [
        { name: 'À venir' },
        { name: 'Terminé' }
    ]

  return (
    <YStack f={1} gap="$4" margin="auto" marginTop="$8" width="90%" bg="$black12">
      <YStack>
        <H2>{formId}</H2>
        <Separator/>

        <YStack alignItems="center">
          <Form onSubmit={handleSubmit}>
            <Label>GP</Label>
            <Input
              placeholder="Nom du GP"
              value={name}
              onChangeText={setName}
            />

            <Label>Circuit</Label>
            <Input
              placeholder="Circuit"
              value={track}
              onChangeText={setTrack}
            />

            <Label>État</Label>
            <SelectForm value={state} setValue={setState} title={"État du GP"} list={items} />

            <Label>Gagnant</Label>
            <Input
              placeholder="Gagnant du Gp"
              value={first}
              onChangeText={setFirst}
            />

            <Label>Deuxième</Label>
            <Input
              placeholder="Deuxième"
              value={second}
              onChangeText={setSecond}
            />

            <Label>Troisième</Label>
            <Input
              placeholder="Troisième"
              value={third}
              onChangeText={setThird}
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