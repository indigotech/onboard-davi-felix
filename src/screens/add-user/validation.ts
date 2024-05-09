import {ZodError, z} from 'zod';
import {LoginSchema} from '../login/validation';

const AddUserSchema = LoginSchema.extend({
  name: z.string().min(1, {message: 'O nome é obrigatório'}),
  role: z.enum(['user', 'admin'], {message: 'O tipo é obrigatório'}),
  birthDate: z
    .date()
    .max(new Date(), {message: 'A data não pode ser futura'})
    .min(new Date('1900-01-01'), {message: 'A data é muito antiga'}),
  phone: z
    .string()
    .min(1, {message: 'O telefone é obrigatório'})
    .max(11, {message: 'O telefone deve ter no máximo 11 dígitos'})
    .regex(/\d{11}/, {message: 'O telefone deve conter 11 dígitos numéricos'}),
});

interface NewUser {
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  password: string;
  birthDate: Date;
}

export const noErrors = {
  email: [],
  name: [],
  phone: [],
  password: [],
  birthDate: [],
  role: [],
};

export const validateNewUser = (user: NewUser) => {
  const errors = noErrors;
  try {
    AddUserSchema.parse(user);
    return {isValid: true, errors};
  } catch (error) {
    if (error instanceof ZodError) {
      const {fieldErrors} = error.formErrors;
      return {isValid: false, errors: {...errors, ...fieldErrors}};
    }
    return {isValid: true, errors};
  }
};
