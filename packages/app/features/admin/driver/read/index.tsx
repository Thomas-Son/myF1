import {
    H2,
    H4,
    YStack,
    Section,
} from '@my/ui';
import dbConnect from "app/lib/dbConnect";
import Driver, { Drivers } from "app/models/Driver";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
    driver: Drivers;
};

export default function ReadDriver() {
    return (
            <YStack f={1} marginTop="$8" ai="center" gap="$5">
                <Section gap="$4" p="$5" alignItems="center">
                    <H2>Informations :</H2>
                    <H4></H4>
                </ Section>
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