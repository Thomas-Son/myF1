import { UserDetailScreen } from 'app/features/user'
import Head from 'next/head'
import { createParam } from 'solito'

const { useParam } = createParam<{ id: string }>()

export default function Page() {
  const id = useParam('id') as unknown as string
  return (
    <>
      <Head>
        <title>Salut à toi !</title>
      </Head>
      <UserDetailScreen id={id} />
    </>
  )
}
