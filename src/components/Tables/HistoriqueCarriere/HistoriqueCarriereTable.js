import React, { useState } from 'react';
import { HISTORIQUE_POSTES } from '../../../store/HistoriqueCarriereStore';
import DateCell from '../TableConfig/DateCell';
import EditableCell from '../TableConfig/EditableCell';
import Filters from '../TableConfig/Filters';
import Pagination from '../TableConfig/Pagination';
import { Box, Flex, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Button } from '@chakra-ui/react';

const HistoriqueCarriereTable = () => {
    const [historique, setHistorique] = useState(HISTORIQUE_POSTES);
    const [columnFilters, setColumnFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");

    const filteredHistorique = historique.filter(entry => 
        columnFilters.every(filter => entry.poste_actuel.toLowerCase().includes(filter.value.toLowerCase()))
    );

    const displayedHistorique = filteredHistorique.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet historique ?");
        if (confirmDelete) {
            setHistorique(prev => prev.filter(entry => entry.id_historique !== id));
        }
    };

    const handleEdit = (id) => {
        alert(`Modification de l'historique ID: ${id}`);
    };

    const handleView = (id) => {
        alert(`Affichage des détails pour l'historique ID: ${id}`);
    };

    const updateData = (rowId, columnId, newValue) => {
        setHistorique((prevHistorique) =>
            prevHistorique.map((entry) =>
                entry.id_historique === rowId ? { ...entry, [columnId]: newValue } : entry
            )
        );
    };

    return (
        <Box p={4}>
            <Filters 
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                filterPlaceholder="Rechercher par poste"
                data={historique}
            />
            <Box overflowX="auto" maxHeight="500px"> 
                <Table>
                    <Thead>
                        <Tr bg={tableRowColor}>
                            <Th color='gray.400' borderColor={borderColor}>ID Historique</Th>
                            <Th color='gray.400' borderColor={borderColor}>Nom Employé</Th>
                            <Th color='gray.400' borderColor={borderColor}>Date de Début</Th>
                            <Th color='gray.400' borderColor={borderColor}>Date de Fin</Th>
                            <Th color='gray.400' borderColor={borderColor}>Poste Précédent</Th>
                            <Th color='gray.400' borderColor={borderColor}>Poste Actuel</Th>
                            <Th color='gray.400' borderColor={borderColor}>Motif</Th>
                            <Th color='gray.400' borderColor={borderColor}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedHistorique.map((entry) => (
                            <Tr key={entry.id_historique}>
                                <Td color={textTableColor} fontSize='sm' fontWeight='bold' borderColor={borderColor}>
                                    {entry.id_historique}
                                </Td>
                                <Td color={textTableColor} fontSize='sm' fontWeight='bold' borderColor={borderColor}>
                                    {entry.nom}
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <DateCell 
                                        value={entry.date_debut} 
                                        updateData={updateData} 
                                        rowId={entry.id_historique} 
                                        columnId="date_debut" 
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <DateCell 
                                        value={entry.date_fin} 
                                        updateData={updateData} 
                                        rowId={entry.id_historique} 
                                        columnId="date_fin" 
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    {entry.poste_precedent}
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell 
                                        value={entry.poste_actuel} 
                                        columnId="poste_actuel" 
                                        onChange={(columnId, newValue) => {
                                            if (newValue) {
                                                updateData(entry.id_historique, columnId, newValue);
                                            }
                                        }} 
                                    />
                                </Td>
                                <Td color={textTableColor} fontSize='sm' borderColor={borderColor}>
                                    <EditableCell 
                                        value={entry.motif} 
                                        columnId="motif" 
                                        onChange={(columnId, newComment) => {
                                            if (newComment) {
                                                updateData(entry.id_historique, columnId, newComment);
                                            }
                                        }} 
                                    />
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Flex gap={2}>
                                        <Button size="sm" colorScheme='blue' onClick={() => handleEdit(entry.id_historique)}>Modifier</Button>
                                        <Button size="sm" colorScheme='red' onClick={() => handleDelete(entry.id_historique)}>Supprimer</Button>
                                        <Button size="sm" colorScheme='teal' onClick={() => handleView(entry.id_historique)}>Afficher</Button>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Pagination 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalRows={filteredHistorique.length} 
                rowsPerPage={rowsPerPage} 
            />
        </Box>
    );
};

export default HistoriqueCarriereTable;
