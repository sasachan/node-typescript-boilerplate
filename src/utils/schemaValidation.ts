import { validate } from 'class-validator';

const isValidSchema = async (model:Record<string, unknown>) : Promise<boolean> => {
    const errors =  await validate(model);
    if(errors.length > 0){
        return false;
    } 
        return true;
    
};

export default isValidSchema;
