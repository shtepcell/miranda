import type { NextPage } from 'next'
import Head from 'next/head'
import { UserList } from '../../../features/UserList';

const AdminUsers: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Пользователи • Администрирование</title>
      </Head>

      <main>
        <UserList />
      </main>
    </div>
  )
}

export default AdminUsers;
