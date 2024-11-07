import { Button, Flex } from '@chakra-ui/react'; // Importation des composants Button et Flex de Chakra UI

const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calcul du nombre total de pages

    return (
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
                size="sm"
            >
                Précédent
            </Button>
            <span>
                Page {currentPage + 1} sur {totalPages}
            </span>
            <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                size="sm"
            >
                Suivant
            </Button>
        </Flex>
    );
};

export default Pagination; // Exporte le composant Pagination
