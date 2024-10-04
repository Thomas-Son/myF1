import FormDriver from "app/components/form/formDriver"

export default function AddDriver() {

  const driverForm = {
    name: "",
    team: "",
    number: 0,
    point: 0,
    active: "Oui",
  };

  return <FormDriver formId="Ajouter un joueur" driverForm={driverForm} />;
};