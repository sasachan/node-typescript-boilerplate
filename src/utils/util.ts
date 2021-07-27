import * as bcrypt from 'bcrypt';

const createHash = async (text: string): Promise<string> =>  bcrypt.hash(text, 8);

const isPasswordMatch = async (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);


const filterResponse =  (obj: Record<string, unknown>, keysToRemove?: Array<string>): Record<string, unknown> => {
   const data = obj;
    const commonFields = ['updatedAt','createdAt','password'];
    const fieldsToRemove = keysToRemove ? [...commonFields, ...keysToRemove] : commonFields;
    fieldsToRemove.forEach((val)=>{
        if (data[val]) {
            delete data[val];
        }
    });
    return data;
};



export {
    createHash,
    isPasswordMatch,
    filterResponse
};
