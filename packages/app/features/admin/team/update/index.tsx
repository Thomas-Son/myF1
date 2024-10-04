import { useRouter } from "next/router";
import useSWR from "swr";
import FormTeam from "../../../../components/form/formTeam";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditTeam = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: team,
    error,
    isLoading,
  } = useSWR(id ? `/api/teams/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!team) return null;

  const teamForm = {
    name: team.name,
    team: team.team,
    number: team.number,
    point: team.point,
    active: team.active
  };

  return <FormTeam formId="Modifier un équipe" teamForm={teamForm} forNewTeam={false} />;
};

export default EditTeam;