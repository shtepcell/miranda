import { useEvent, useList, useStore } from "effector-react"
import { useEffect } from "react";
import { $users, getUsersFx } from "../../models/users"

interface IUserList {
}

export const UserList: React.FC<IUserList> = () => {
    const users = useStore($users);
    const getUsers = useEvent(getUsersFx);

    const list = useList($users, ({ name, login }) => (
        <div>{login} | {name}</div>
    ));

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <section>
            <h2>Список пользователей</h2>
            {list}
            {users.length}
        </section>
    )
}