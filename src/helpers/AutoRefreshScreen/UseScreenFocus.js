import React,{ useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const UseScreenFocus = (callback) => {
  useFocusEffect(
    React.useCallback(() => {
      callback();
    }, [])
  );
};

export default UseScreenFocus;
