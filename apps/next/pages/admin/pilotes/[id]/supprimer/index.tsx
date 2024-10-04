// import DeleteDriver from "app/features/admin/driver/delete/index"

// export default DeleteDriver;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Driver, { Drivers } from "app/models/Driver";
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
    driver: Drivers;
};

export default function DeletePlayer({ driver }: Props) {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        const { id } = router.query;

        try {
            await fetch(`/api/drivers/${id}`, {
                method: "Delete",
            });
            router.push("/admin/pilotes");
        } catch (error) {
            setMessage("Failed to delete the driver.");
        }
    };

    return (
            <YStack f={1} marginTop="$8" ai="center" gap="$5">
                <H3>Voulez-vous supprimer le joueur {driver.name} ?</H3>
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
  const driver = await Driver.findById(params.id).lean();
  if (!driver) {
    return {
      notFound: true,
    };
  };
  const serializedDriver = JSON.parse(JSON.stringify(driver));
  return {
    props: {
      driver: serializedDriver,
    },
  };
};