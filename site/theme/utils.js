import { transform } from 'babel-standalone';

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
