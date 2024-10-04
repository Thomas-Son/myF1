import FormTeam from "app/components/form/formTeam"

export default function AddTeam() {

  const teamForm = {
    name: "",
    point: 0,
    active: "Oui",
  };

  return <FormTeam formId="Ajouter une équipe" teamForm={teamForm} />;
};