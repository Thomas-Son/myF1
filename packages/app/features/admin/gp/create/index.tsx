import FormGp from "app/components/form/formGp"

export default function AddGp() {

  const gpForm = {
    name: "",
    track: "",
    state: "À venir",
    first: "",
    second: "",
    third: "",
  };

  return <FormGp formId="Ajouter un GP" gpForm={gpForm} />;
};