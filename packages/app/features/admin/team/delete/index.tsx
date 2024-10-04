import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Team, { Teams } from "app/models/Team";
import dbConnect from "app/lib/dbConnect";
import {
    Button,
    H3,
    YStack,
} from '@my/ui';
import { TextLink } from "solito/link";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
    team: Teams;
};

export default function DeleteTeam({ team }: Props) {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        const { id } = router.query;

        try {
            await fetch(`/api/teams/${id}`, {
                method: "Delete",
            });
            router.push("/admin/equipes");
        } catch (error) {
            setMessage("Failed to delete the team.");
        }
    };

    return (
            <YStack f={1} marginTop="$8" ai="center" gap="$5">
                <H3>Voulez-vous supprimer le joueur ?</H3>
                <Button onClick={handleDelete}>
                    Supprimer
                </Button>
                <TextLink href={".."}>
                    <Button>
                        Annuler
                    </Button>
                </TextLink>
            </YStack>
    );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect();
  if (!params?.id) {
    return {
      notFound: true,
    };
  };
  const team = await Team.findById(params.id).lean();
  if (!team) {
    return {
      notFound: true,
    };
  };
  const serializedTeam = JSON.parse(JSON.stringify(team));
  return {
    props: {
      team: serializedTeam,
    },
  };
};