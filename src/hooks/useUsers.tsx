import React, {useEffect, useState} from 'react';
import typicodeApi from '../api/typicodeApi';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await typicodeApi.get('/users');
    if (res.status === 200) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  return [users, loading];
};

export default useUsers;
