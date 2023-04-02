import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const useScreenOrientation = (): 'PORTRAIT' | 'LANDSCAPE' => {
  const [orientation, setOrientation] = useState <'PORTRAIT' | 'LANDSCAPE'> (isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

  useEffect(() => {
    const dimension =  Dimensions.addEventListener ('change', () => {
        setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE')
    });

    return () => {
        dimension?.remove ();
    };
  }, []);

  return orientation;
}

export default useScreenOrientation;