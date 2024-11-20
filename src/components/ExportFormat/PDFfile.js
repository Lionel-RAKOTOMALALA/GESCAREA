import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    title: { fontSize: 20, marginBottom: 15, textAlign: 'center' },
    subtitle: { fontSize: 16, marginBottom: 10, textDecoration: 'underline' },
    text: { fontSize: 12, marginBottom: 5 },
});

const employeesPDFDocument = ({ employees }) => {
    
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Rapport détaillé de l'Employé</Text>

                {/* Section Employé */}
                <Text style={styles.subtitle}>Informations Personnelles</Text>
                <View style={styles.section}>
                    <Text style={styles.text}>Nom : {employees.employe.nom}</Text>
                    <Text style={styles.text}>Prénom : {employees.employe.prenom}</Text>
                    <Text style={styles.text}>Nom d'utilisateur : {employees.employe.username}</Text>
                    <Text style={styles.text}>Adresse : {employees.employe.adresse}</Text>
                    <Text style={styles.text}>Date de naissance : {employees.employe.date_naissance}</Text>
                    <Text style={styles.text}>Âge : {employees.employe.age}</Text>
                    <Text style={styles.text}>Genre : {employees.employe.genre}</Text>
                    <Text style={styles.text}>Situation matrimoniale : {employees.employe.situation_matrimoniale}</Text>
                    <Text style={styles.text}>Contact personnel : {employees.employe.contact_personnel}</Text>
                    <Text style={styles.text}>Email : {employees.employe.email}</Text>
                </View>

                {/* Section Statut */}
                <Text style={styles.subtitle}>Statut</Text>
                <View style={styles.section}>
                    <Text style={styles.text}>ID : {employees.statut._id}</Text>
                    <Text style={styles.text}>Code cadre : {employees.statut.code_cadre}</Text>
                    <Text style={styles.text}>Catégorie : {employees.statut.categorie}</Text>
                    <Text style={styles.text}>Grade : {employees.statut.grade}</Text>
                    <Text style={styles.text}>Corps : {employees.statut.corps}</Text>
                    <Text style={styles.text}>Indice : {employees.statut.indice}</Text>
                    <Text style={styles.text}>Qualité : {employees.statut.qualite}</Text>
                    <Text style={styles.text}>Structure : {employees.statut.structure}</Text>
                </View>

                {/* Section Affectation */}
                <Text style={styles.subtitle}>Affectation</Text>
<View style={styles.section}>
    {employees.affectation ? (
        <>
            <Text style={styles.text}>ID : {employees.affectation._id}</Text>
            <Text style={styles.text}>Lieu d'affectation : {employees.affectation.lieu_affectation}</Text>
            <Text style={styles.text}>Date d'entrée : {employees.affectation.date_entree_admin}</Text>
            <Text style={styles.text}>Date de prise de service : {employees.affectation.date_prise_service}</Text>
            <Text style={styles.text}>Motif : {employees.affectation.motif_depart_arrivee}</Text>
        </>
    ) : (
        <Text style={styles.text}>Aucune affectation trouvée.</Text>
    )}
</View>


                {/* Section Diplômes */}
                <Text style={styles.subtitle}>Diplômes</Text>
                <View style={styles.section}>
                    {employees.diplomes.map((diplome, index) => (
                        <Text key={index} style={styles.text}>
                            - Cursus : {diplome.cursus}
                        </Text>
                    ))}
                </View>

                {/* Section Décisions */}
                <Text style={styles.subtitle}>Décisions</Text>
                <View style={styles.section}>
                    {employees.decisions.map((decision, index) => (
                        <View key={index}>
                            <Text style={styles.text}>Numéro : {decision.numero_decision}</Text>
                            <Text style={styles.text}>Date : {decision.date_decision}</Text>
                            <Text style={styles.text}>Libellé : {decision.libelle}</Text>
                        </View>
                    ))}
                </View>

                {/* Poste */}
                <Text style={styles.subtitle}>Poste</Text>
                <View style={styles.section}>
                    <Text style={styles.text}>Poste : {employees.poste ? employees.poste : "Aucun poste assigné"}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default employeesPDFDocument;
