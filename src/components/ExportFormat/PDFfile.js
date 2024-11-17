import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    title: { fontSize: 20, marginBottom: 10 },
    text: { fontSize: 12, marginBottom: 5 },
});

const EmployeePDFDocument = ({ employees }) => {
    (

    
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Détails de l'Employé</Text>
                {Array.isArray(employees) && employees.map((employee) => (
                    <View key={employee.employe._id} style={styles.section}>
                        <Text style={styles.text}>ID: {employee.employe._id}</Text>
                        <Text style={styles.text}>Nom: {employee.employe.nom}</Text>
                        <Text style={styles.text}>Prénom: {employee.employe.prenom}</Text>
                        <Text style={styles.text}>Date de naissance: {employee.employe.date_naissance}</Text>
                        <Text style={styles.text}>Âge: {employee.employe.age}</Text>
                        <Text style={styles.text}>Genre: {employee.employe.genre}</Text>
                        <Text style={styles.text}>Contact: {employee.employe.contact_personnel}</Text>
                        <Text style={styles.text}>Email: {employee.employe.email}</Text>
                        <Text style={styles.text}>Poste: {employee.poste.titre_poste}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
    
    
}

    export default EmployeePDFDocument;