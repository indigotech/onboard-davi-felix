import {z} from 'zod';
import {ZodError} from 'zod';

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email: Array<string>;
  password: Array<string>;
}

const refinePasswordValidation = (password: string) => {
  if (/\d/.test(password) && /\w/.test(password)) {
    return true;
  }
  return false;
};

export const LoginSchema = z.object({
  // Translating messages to agree with the interface
  email: z
    .string()
    .min(1, {message: 'Email é obrigatório.'})
    .email({message: 'E-mail inválido.'}),
  password: z
    .string()
    .min(7, {message: 'Senha deve ter no mínimo 7 caracteres.'})
    .refine(refinePasswordValidation, {
      message: 'Senha deve ter um dígito e uma letra.',
    }),
});

export function validateLoginData(loginData: LoginData): LoginErrors {
  const noErrorResponse = {email: [], password: []};
  try {
    LoginSchema.parse(loginData);
    return noErrorResponse;
  } catch (error) {
    if (error instanceof ZodError) {
      const {fieldErrors} = error.formErrors;
      return {
        email: fieldErrors.email || [],
        password: fieldErrors.password || [],
      };
    }

    return noErrorResponse; // Default to the no-error response
  }
}
