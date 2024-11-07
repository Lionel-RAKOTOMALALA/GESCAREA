import * as Yup from 'yup';
import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** Schéma Yup pour valider le nom d'utilisateur */
const usernameSchema = Yup.string()
  .required(() => {
    toast.error('Username Required...!');
    return 'Username Required...!';
  });

/** Schéma Yup pour valider le mot de passe */
const passwordSchema = Yup.string()
  .required(() => {
    toast.error("Password required...!");
    return 'Password required...!';
  })
  .min(4, () => {
    toast.error('Password should be at least 4 characters long...!');
    return 'Password should be at least 4 characters long...!';
  })
  .matches(/[!@#$%^&*(),.?":{}|<>]/, () => {
    toast.error('Password should contain at least one special character...!');
    return 'Password should contain at least one special character...!';
  });

/** Schéma Yup pour valider l'email */
const emailSchema = Yup.string()
  .email(() => {
    toast.error("Invalid Email...!");
    return 'Invalid Email...!';
  })
  .required(() => {
    toast.error('Email Required...!');
    return 'Email Required...!';
  });

/** Valider le nom d'utilisateur sur la page de login */
export async function usernameValidate(values) {
  const errors = {};

  try {
    await usernameSchema.validate(values.username);
  } catch (err) {
    errors.username = err.message;
  }

  if (values.username) {
    // Check if the user exists
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error('User does not exist...!');
    }
  }

  return errors;
}

/** Valider le mot de passe */
export async function passwordValidate(values) {
  const errors = {};

  try {
    await passwordSchema.validate(values.password);
  } catch (err) {
    errors.password = err.message;
  }

  return errors;
}

/** Valider le formulaire d'inscription */
export async function registerValidation(values) {
  const errors = {};

  try {
    await usernameSchema.validate(values.username);
  } catch (err) {
    errors.username = err.message;
  }

  try {
    await passwordSchema.validate(values.password);
  } catch (err) {
    errors.password = err.message;
  }

  try {
    await emailSchema.validate(values.email);
  } catch (err) {
    errors.email = err.message;
  }

  return errors;
}

/** Valider la page de profil */
export async function profileValidation(values) {
  const errors = {};

  try {
    await emailSchema.validate(values.email);
  } catch (err) {
    errors.email = err.message;
  }

  return errors;
}



const employeSchema = Yup.object().shape({
  nom: Yup.string().required(() => {
    toast.error('Nom is required');
    return 'Nom is required';
  }),
  prenom: Yup.string().required(() => {
    toast.error('Prenom is required');
    return 'Prenom is required';
  }),
  date_naissance: Yup.date().required(() => {
    toast.error('Date de naissance is required');
    return 'Date de naissance is required';
  }),
  email: Yup.string()
    .email(() => {
      toast.error('Invalid email format');
      return 'Invalid email format';
    })
    .required(() => {
      toast.error('Email is required');
      return 'Email is required';
    }),
  telephone: Yup.string().required(() => {
    toast.error('Telephone is required');
    return 'Telephone is required';
  }),
  adresse: Yup.string().required(() => {
    toast.error('Adresse is required');
    return 'Adresse is required';
  }),
  contact_flotte: Yup.string().required(() => {
    toast.error('Contact flotte is required');
    return 'Contact flotte is required';
  }),
  contact_personnel: Yup.string().required(() => {
    toast.error('Contact personnel is required');
    return 'Contact personnel is required';
  }),
  situation_matrimoniale: Yup.string().required(() => {
    toast.error('Situation matrimoniale is required');
    return 'Situation matrimoniale is required';
  }),
  genre: Yup.string().oneOf(['M', 'F']).required(() => {
    toast.error('Genre is required and must be "M" or "F"');
    return 'Genre is required and must be "M" or "F"';
  }),
  age: Yup.number().required(() => {
    toast.error('Age is required');
    return 'Age is required';
  }),
  password: Yup.string()
    .required(() => {
      toast.error('Password is required');
      return 'Password is required';
    })
    .min(4, () => {
      toast.error('Password should be at least 4 characters');
      return 'Password should be at least 4 characters';
    })
    .matches(/[!@#$%^&*(),.?":{}|<>]/, () => {
      toast.error('Password should contain at least one special character');
      return 'Password should contain at least one special character';
    }),
  username: Yup.string().required(() => {
    toast.error('Username is required');
    return 'Username is required';
  }),
});

const statutSchema = Yup.object().shape({
  structure: Yup.string().required('Structure is required'),
  indice: Yup.string().required('Indice is required'),
  grade: Yup.string().required('Grade is required'),
  corps: Yup.string().required('Corps is required'),
  categorie: Yup.string().required('Categorie is required'),
  qualite: Yup.string().required('Qualite is required'),
  code_cadre: Yup.string().required('Code cadre is required'),
  status: Yup.string().required('Status is required'),
  date_debut: Yup.date().required('Date debut is required'),
  date_fin: Yup.date().nullable(true), // optional field
});

const affectationSchema = Yup.object().shape({
  id_departement: Yup.string().required('ID departement is required'),
  date_affectation: Yup.date().required('Date affectation is required'),
  motif_depart_arrivee: Yup.string().required('Motif depart arrivee is required'),
  lieu_affectation: Yup.string().required('Lieu affectation is required'),
  date_prise_service: Yup.date().required('Date prise service is required'),
  date_entree_admin: Yup.date().required('Date entree admin is required'),
});

const diplomeSchema = Yup.object().shape({
  id_diplome: Yup.string().required('ID diplome is required'),
  cursus: Yup.string().required('Cursus is required'),
  diplome: Yup.string().required('Diplome is required'),
  date_obtention: Yup.date().required('Date obtention is required'),
  etablissement: Yup.string().required('Etablissement is required'),
});

const decisionSchema = Yup.object().shape({
  id_decision: Yup.string().required('ID decision is required'),
  numero_decision: Yup.string().required('Numero decision is required'),
  date_decision: Yup.date().required('Date decision is required'),
  commentaire: Yup.string().required('Commentaire is required'),
});

const posteSchema = Yup.object().shape({
  titre_poste: Yup.string().required('Titre poste is required'),
  description_poste: Yup.string().required('Description poste is required'),
  departement: Yup.string().required('Departement is required'),
  salaire_min: Yup.number().required('Salaire min is required'),
  salaire_max: Yup.number().required('Salaire max is required'),
  effectifs_a_pourvoir: Yup.number().required('Effectifs a pourvoir is required'),
});

const serviceSchema = Yup.object().shape({
  nom_service: Yup.string().required('Nom service is required'),
  description: Yup.string().required('Description is required'),
});

export const ajouterEmployeValidation = Yup.object().shape({
  employe: employeSchema,
  statut: statutSchema,
  affectation: affectationSchema,
  diplome: diplomeSchema,
  decision: decisionSchema,
  poste: posteSchema,
  service: serviceSchema,
});
