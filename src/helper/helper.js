import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../store/store'; // Assurez-vous d'importer votre store Zustand ici

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
console.log("Base URL:", axios.defaults.baseURL);


/** Make API request */

/** to get username from token */
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token);
    console.log(decode);

    return decode;
}

/** authenticate function */
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username });
    } catch (error) {
        return { error: "Username doesn't exist...!" };
    }
}

/** get User details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" };
    }
}

/** register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post('/api/register', credentials);

        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({ error });
    }
}
export async function createEmploye(data) {
    try {
        // Récupérer le token du localStorage
        const token = localStorage.getItem('token');

        if (!token) throw new Error("Token d'authentification manquant");

        // Appel API pour créer un nouvel employé avec le token d'authentification
        const response = await axios.post('/api/employes/ajouter', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajout du token d'autorisation
            }
        });

        // Renvoyer le message de succès ou les données de l'employé
        return Promise.resolve(response.data);
    } catch (error) {
        // Rejeter la promesse en cas d'erreur
        return Promise.reject({ error: error.response ? error.response.data : error.message });
    }
}

/** Login function */

export async function verifyPassword(credentials, setUsername) {
    try {
        // Utiliser axios pour envoyer la requête POST
        const { data } = await axios.post('/api/login', credentials);
        
        console.log('Réponse du serveur:', data); // Log pour voir la réponse complète

        return data;
    } catch (error) {
        console.log('Erreur lors de la connexion:', error.message); // Log de l'erreur
        // Si l'erreur contient une réponse du serveur, affichez-la
        if (error.response && error.response.data) {
            return { error: error.response.data };
        }
        // Autrement, affichez un message générique
        return { error: error.message };
    }
}


/** update user function */
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });

        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile...!" });
    }
}

/** generate OTP */
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });

        // send mail with the OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP(username, code) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** reset password */
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error });
    }
}