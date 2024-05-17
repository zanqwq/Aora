import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const invokeFetch = async () => {
    try {
      const res = await fn();
      setData(res);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    invokeFetch();
  }, []);

  return { data, isLoading, invokeFetch };
};

export default useAppwrite;
