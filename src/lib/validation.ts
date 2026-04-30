import { z } from 'zod';

/**
 * Lead form validation schema.
 * Used on both client-side (React Hook Form) and server-side (Server Action).
 */
export const leadSchema = z.object({
  nome: z
    .string()
    .min(2, 'Por favor, insira seu nome')
    .max(100, 'Nome muito longo')
    .trim(),

  email: z
    .string()
    .email('Por favor, insira um e-mail válido')
    .max(254, 'E-mail muito longo')
    .trim()
    .toLowerCase(),

  telefone: z
    .string()
    .min(10, 'Por favor, insira um telefone com DDD')
    .max(20, 'Telefone muito longo')
    .trim(),

  empresa: z
    .string()
    .max(200, 'Nome da empresa muito longo')
    .trim()
    .optional()
    .or(z.literal('')),

  servico_interesse: z
    .string()
    .max(100)
    .optional()
    .or(z.literal('')),

  mensagem: z
    .string()
    .max(2000, 'Mensagem muito longa')
    .trim()
    .optional()
    .or(z.literal('')),
});

export type LeadFormData = z.infer<typeof leadSchema>;
