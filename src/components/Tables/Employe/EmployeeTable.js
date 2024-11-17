import React, { useState, useEffect } from 'react';
import { EMPLOYEE_STATUSES, EmployeeStore } from '../../../store/EmployeeStore';
import DateCell from '../TableConfig/DateCell';
import EditableCell from '../TableConfig/EditableCell';
import Filters from '../TableConfig/Filters';
import Pagination from '../TableConfig/Pagination';
import StatusCell from '../TableConfig/StatusCell';
import { Box, Flex, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Button } from '@chakra-ui/react';
import EditEmployeeModal from 'components/Modals/EditEmployeModal';
import { ViewEmployeeModal } from '../../Modals/ViewEmployeeModal';
import useFetchEmploye from 'hooks/employe.hook';
import { useAuthStore } from 'store/store';
import { getEmployeDetails } from 'helper/helper';
import SupprConfirmModal from 'components/Modals/supprConfirmModal';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from "@react-pdf/renderer";
import EmployeePDFDocument from '../../ExportFormat/PDFfile';


const EmployeeTable = () => {
    // Utiliser useFetch pour récupérer les données des employés
    // Récupère apiData depuis le store Zustand pour le maintenir en état global
    // Appel de l'API pour les employés
    // Access the employeeData state and ensure it is an array
    useFetchEmploye('employes');
    const employeeData = useAuthStore((state) => state.employeeData) || [];

    // UseEffect to display employeeData in the console
    useEffect(() => {
        console.log("Employé Data profile:", employeeData);
    }, [employeeData]);

    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");
    const [employeeToDelete, setEmployeeToDelete] = useState({ name: '', id: null });

    const handleDelete = (employeeId, employeeName) => {
        // Check if employeeName and employeeId are valid before setting
        if (employeeId && employeeName) {
            setEmployeeToDelete({ id: employeeId, name: employeeName });
            setIsModalOpen(true); // Afficher le modal
        } else {
            console.error("Employee data is missing or invalid.");
        }
    };

        // Fonction pour mettre à jour currentEmployee avec l'ID de l'employé sélectionné
        const handleSetCurrentEmployee = (employeeId) => {
            // Trouver l'employé avec l'ID
            const employee = employeeData.find(emp => emp.employe._id === employeeId);
            setSelectedEmployee(employee);
            console.log(selectedEmployee);
            
        };



    const handleEdit = async (employeeId) => {
        setIsLoading(true);  // Démarre le chargement
        try {
            const data = await getEmployeDetails(employeeId);  // Utilisation de la fonction helper
            setCurrentEmployee(data);  // Stocke les données de l'employé dans l'état
            setEditModalOpen(true);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'employé:', error);
        } finally {
            setIsLoading(false);  // Fin du chargement
        }
    };

    const handleCellUpdate = async (employeId, columnId, newValue) => {
        console.log(employeId, columnId, newValue);

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/employes/${employeId}/${columnId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                },
                body: JSON.stringify({ value: newValue }), // Le corps contient la nouvelle valeur
            });

            if (response.ok) {
                const updatedEmploye = await response.json();
                // Vous pouvez mettre à jour l'état local ou gérer la réponse comme nécessaire
                console.log('Employé mis à jour :', updatedEmploye);
            } else {
                const errorData = await response.json();
                console.error('Erreur de mise à jour :', errorData);
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    const handleViewModalClose = () => {
        setViewModalOpen(false);
        setCurrentEmployee(null);
    };

    const handleModalClose = () => {
        setEditModalOpen(false);
        setCurrentEmployee(null);
    };

    const handleView = async (employeeId) => {
        setIsLoading(true);  // Démarre le chargement
        try {
            const data = await getEmployeDetails(employeeId);  // Utilisation de la fonction helper
            setCurrentEmployee(data);  // Stocke les données de l'employé dans l'état
            setViewModalOpen(true);  // Ouvre le modal
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'employé:', error);
        } finally {
            setIsLoading(false);  // Fin du chargement
        }
    };

    return (
        <Box p={4}>
            <Filters
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                filterPlaceholder="Search by name"
                data={employees}
            />
            <Box overflowX="auto" maxHeight="500px">
                <Table>
                    <Thead>
                        <Tr bg={tableRowColor}>
                            <Th color='gray.400' borderColor={borderColor}>ID de l'employé</Th>
                            <Th color='gray.400' borderColor={borderColor}>Nom</Th>
                            <Th color='gray.400' borderColor={borderColor}>Prénom</Th>
                            <Th color='gray.400' borderColor={borderColor}>Date de naissance</Th>
                            <Th color='gray.400' borderColor={borderColor}>Âge</Th>
                            <Th color='gray.400' borderColor={borderColor}>Genre</Th>
                            <Th color='gray.400' borderColor={borderColor}>Situation matrimoniale</Th>
                            <Th color='gray.400' borderColor={borderColor}>Contact personnel</Th>
                            <Th color='gray.400' borderColor={borderColor}>Email</Th>
                            <Th color='gray.400' borderColor={borderColor}>Titre du poste</Th>
                            <Th color='gray.400' borderColor={borderColor}>Statut</Th>
                            <Th color='gray.400' borderColor={borderColor}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employeeData.map((employee) => (
                            <Tr key={employee.employe.id_employe}>
                                <Td color={textTableColor} fontSize='sm' fontWeight='bold' borderColor={borderColor}>
                                    {employee.employe._id}
                                </Td>
                                <Td color={textTableColor} fontSize='sm' fontWeight='bold' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.nom}
                                        columnId="nom"
                                        onBlur={(newNom) => handleCellUpdate(employee.employe._id, 'nom', newNom)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' fontWeight='bold' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.prenom}
                                        columnId="prenom"
                                        onBlur={(newPrenom) => handleCellUpdate(employee.employe._id, 'prenom', newPrenom)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <DateCell
                                        value={employee.employe.date_naissance}
                                        rowId={employee.id_employe}
                                        columnId="date_naissance"
                                        onBlur={(newDate) => handleCellUpdate(employee.employe._id, 'date_naissance', newDate)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell
                                        value={"16"}
                                        columnId="age"
                                        onBlur={(newAge) => handleCellUpdate(employee.employe._id, 'age', newAge)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.genre}
                                        columnId="genre"
                                        onBlur={(newGenre) => handleCellUpdate(employee.employe._id, 'genre', newGenre)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.situation_matrimoniale}
                                        columnId="situation_matrimoniale"
                                        onBlur={(newSituation) => handleCellUpdate(employee.employe._id, 'situation_matrimoniale', newSituation)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.contact_personnel}
                                        columnId="contact_personnel"
                                        onBlur={(newContact) => handleCellUpdate(employee.employe._id, 'contact_personnel', newContact)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.email}
                                        columnId="email"
                                        onBlur={(newEmail) => handleCellUpdate(employee.employe._id, 'email', newEmail)}
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell
                                        value={employee.employe.titre_poste}
                                        columnId="titre_poste"
                                        onBlur={(newTitre) => handleCellUpdate(employee.employe._id, 'titre_poste', newTitre)}
                                    />
                                </Td>
                                <Td>
                                    <StatusCell
                                        status={employee.employe.status}
                                        statusOptions={EMPLOYEE_STATUSES}
                                        employeeId={employee.employe._id}
                                    />
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Flex gap={2}>
                                    <Button
                                    colorScheme="blue"
                                    onClick={() => handleSetCurrentEmployee(employee.employe._id)}
                                >
                                    Générer PDF
                                </Button>

                                {/* Lien pour télécharger le PDF du salarié sélectionné */}
                                {selectedEmployee && selectedEmployee.employe._id === employee.employe._id && (
                                    <PDFDownloadLink
                                        document={<EmployeePDFDocument employees={selectedEmployee} />}
                                        fileName={`${selectedEmployee.employe.nom}_${selectedEmployee.employe.prenom}.pdf`}
                                        style={{
                                            textDecoration: 'none',
                                            padding: '10px',
                                            color: 'white',
                                            backgroundColor: '#007ACC',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {({ loading }) => 
                                            loading ? 'Création du PDF...' : 'Télécharger le PDF'
                                        }
                                    </PDFDownloadLink>
                                )}

                                        <Button
                                            colorScheme="blue"
                                            onClick={() => handleView(employee.employe._id)}
                                        >
                                            Voir
                                        </Button>
                                        <Button
                                            colorScheme="yellow"
                                            onClick={() => handleEdit(employee.employe._id)}
                                        >
                                            Éditer
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            onClick={() => handleDelete(employee.employe._id, employee.employe.username)}
                                        >
                                            Supprimer
                                        </Button>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <EditEmployeeModal
                isOpen={isEditModalOpen}
                onClose={handleModalClose}
                employee={currentEmployee}
                setEmployees={setEmployees}
            />
            <ViewEmployeeModal
                isOpen={isViewModalOpen}
                onClose={handleViewModalClose}
                employee={currentEmployee}
            />
            <SupprConfirmModal
                isOpen={isModalOpen} // Afficher ou cacher le modal
                onClose={() => setIsModalOpen(false)} // Fermer le modal
                onConfirm={() => {
                    // Handle the deletion logic here
                    console.log(`Employee ${employeeToDelete?.name} deleted`);
                    setIsModalOpen(false);
                }} // Confirmation logic
                employeeName={employeeToDelete?.name || 'N/A'} 
                employeeId={employeeToDelete?.id || 'N/A'}
            />

        </Box>
    );
};

export default EmployeeTable;