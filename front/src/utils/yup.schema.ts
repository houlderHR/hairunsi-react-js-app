import * as yup from 'yup';

const schemaCreateRole = yup.object({
  role: yup
    .string()
    .trim('Le nom doit avoir au moins 4 caractères')
    .required('Remplir le champ')
    .min(4, 'Le nom doit avoir au moins 4 caractères'),
});

export default schemaCreateRole;
