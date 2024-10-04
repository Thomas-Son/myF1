import { useRouter } from "next/router";
import useSWR from "swr";
import FormDriver from "../../../../components/form/formDriver";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditDriver = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: driver,
    error,
    isLoading,
  } = useSWR(id ? `/api/drivers/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!driver) return null;

  const driverForm = {
    name: driver.name,
    team: driver.team,
    number: driver.number,
    point: driver.point,
    active: driver.active
  };

  return <FormDriver formId="Modifier un pilote" driverForm={driverForm} forNewDriver={false} />;
};

export default EditDriver;