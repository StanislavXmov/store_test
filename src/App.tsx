import { useEffect } from 'react';
import styles from './App.module.scss';
import { useUsers } from './store/useUsers';

let id = 1;

function App() {
  const users = useUsers((state) => state.users);
  const addUser = useUsers((state) => state.addUser);
  const fetchUsers = useUsers((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUserHandler = () => {
    addUser({
      id: Date.now(),
      email: 'test@email.com',
      username: `username${id}`,
      name: `name${id}`,
    });
    id++;
  }
  
  return (
    <div className={styles.app}>
      APP
      <button onClick={addUserHandler}>Add user</button>
      <ol>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ol>
    </div>
  );
}

export default App;
