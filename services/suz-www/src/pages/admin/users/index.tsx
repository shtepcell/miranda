import type { NextPage } from 'next'
import Head from 'next/head'
import { UserList } from '../../../features/UserList';
import Link from 'next/link';

const AdminUsers: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Пользователи • Администрирование</title>
      </Head>

      <main>
        <Link href="/">Home</Link>
        <UserList />
      </main>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const scope = fork({ values: [[$users]]});
//   await allSettled(getUsersFx, {scope});

//   return {
//     props: {
//       initialState: serialize(scope)
//     }
//   }
// }

export default AdminUsers;
