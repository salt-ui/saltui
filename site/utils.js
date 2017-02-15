import { transform } from 'babel-standalone';
import { mapping } from './constants';

export const transformCode = (contents) => {
  
  try{
      const { code } = transform(contents.trim(), {
        presets: ['es2015', 'react', 'stage-2'],
        compact: true,
      });

      return { code }

  }catch(err){

    return { err: err.toString() }
  }

}

export const upperFirstCharactor = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);

export const removeTingle = (word) => word.slice(7);

export const mappingNavItem = (name) => {
  const newName = removeTingle(name);
  return mapping[newName];

}

