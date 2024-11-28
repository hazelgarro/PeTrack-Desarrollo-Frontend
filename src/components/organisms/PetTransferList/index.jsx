import { useState } from 'react'; 
import Button from "../../atoms/Button";
import { showMessageDialog } from '../../../utils/customAlerts.jsx';
import { getData } from '../../../utils/apiConnector.js';
import CardTransfer from '../../molecules/CardTransfer/index.jsx';
import dog_default from "../../../assets/img/dog_default.webp";
import cat_default from "../../../assets/img/cat_default.webp";

export default function PetTransferList({ transfers, userData, fetchTransfers, fetchPets }) {
    const [transferFilter, setTransferFilter] = useState('recibidas');
    const [statusFilters, setStatusFilters] = useState({
        All: false,
        Accepted: false,
        Rejected: false,
        Pending: true,
        Cancelled: false, // Agregado filtro "Cancelled"
    });

    // Maneja el cambio de filtros individuales
    const handleStatusFilterChange = (status) => {
        setStatusFilters((prevFilters) => {
            const newFilters = { ...prevFilters, [status]: !prevFilters[status] };

            if (status !== "All") {
                newFilters.All = Object.values(newFilters).slice(1).every((value) => value);
            } else {
                const allStatus = !prevFilters.All;
                newFilters.All = allStatus;
                Object.keys(newFilters).forEach((key) => {
                    if (key !== "All") {
                        newFilters[key] = allStatus;
                    }
                });
            }

            return newFilters;
        });
    };

    // Filtra las transferencias según los estados seleccionados
    const filteredTransfers = transfers.filter((transfer) => {
        if (transferFilter === 'todas') return true;
        if (transferFilter === 'enviadas') return transfer.requester.email !== userData.email;
        if (transferFilter === 'recibidas') return transfer.requester.email === userData.email;
        
        return false;
    }).filter((transfer) => statusFilters[transfer.status]);

    const handleTransferFilter = (filter) => {
        setTransferFilter(filter);
    };

    const handleRespondToTransfer = async (transferId, action) => {
        try {
            const apiUrl = `https://www.APIPetrack.somee.com/Transfer/RespondToTransfer/${transferId}`;
            const response = await getData(apiUrl, { accepted: action }, true, "PUT");

            if (response.result) {
                fetchTransfers();
                await fetchPets();

                const section = document.getElementById('pets-section');
                if (section && action) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }

                showMessageDialog(response.message, "success", "top");
            } else {
                showMessageDialog(response.message, "warning", "top");
            }
        } catch (error) {
            console.error(`Error al responder a la transferencia:`, error);
            showMessageDialog("Ocurrió un error al procesar la solicitud. Inténtalo de nuevo más tarde.", "warning", "top");
        }
    };

    const handleCancelTransfer = async (transferId) => {
        try {
            const apiUrl = `https://www.APIPetrack.somee.com/Transfer/CancelTransferRequest?transferRequestId=${transferId}`;
            const response = await getData(apiUrl, null, true, "PUT");

            if (response.result) {
                fetchTransfers();

                showMessageDialog(response.message, "success", "top");
            } else {
                showMessageDialog(response.message, "warning", "top");
            }
        } catch (error) {
            console.error(`Error al cancelar la transferencia:`, error);
            showMessageDialog("Ocurrió un error al procesar la solicitud. Inténtalo más tarde.", "warning", "top");
        }
    };

    return (
        <section>
            <div id="transfers-section" className="grid gap-5 md:gap-10 pt-24">
                <h2 className="text-3xl md:text-8xl font-bold text-petrack-green text-center">Transferencias</h2>
                <div className=" flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
                    <Button type="button" size="small" variant={transferFilter === "recibidas" ? "solid-green" : "border-green"} onClick={() => handleTransferFilter('recibidas')}>
                        Recibidas
                    </Button>
                    <Button type="button" size="small" variant={transferFilter === "enviadas" ? "solid-green" : "border-green"} onClick={() => handleTransferFilter('enviadas')}>
                        Enviadas
                    </Button>
                    <Button type="button" size="small" variant={transferFilter === "todas" ? "solid-green" : "border-green"} onClick={() => handleTransferFilter('todas')}>
                        Todas
                    </Button>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-center">Filtar por estado</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-5">
                {["All", "Pending", "Accepted", "Rejected", "Cancelled"].map((status) => ( // Agregado "Cancelled"
                    <div key={status} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id={status}
                            checked={statusFilters[status]}
                            onChange={() => handleStatusFilterChange(status)}
                            className="w-5 h-5 accent-petrack-green"
                        />
                        <label htmlFor={status} className="text-lg md:text-xl font-medium">
                            {status === "All"
                                ? "Marcar todo"
                                : status === "Accepted"
                                ? "Aceptadas"
                                : status === "Rejected"
                                ? "Denegadas"
                                : status === "Cancelled"
                                ? "Canceladas"
                                : "Pendientes"}
                        </label>
                    </div>
                ))}
            </div>

            <div className="mx-12 md:mx-24 lg:mx-44 my-20">
                {filteredTransfers.length > 0 ? (
                    filteredTransfers.map((transfer) => (
                        <CardTransfer
                            key={transfer.id}
                            imgSrc={transfer.petPicture}
                            imgAlt={transfer.petName}
                            name={transfer.petName}
                            species={transfer.petSpecies}
                            userEmail={userData.email}
                            ownerEmail={transfer.currentOwner.email}
                            newOwnerEmail={transfer.requester.email}
                            status={
                                transfer.status === 'Accepted'
                                    ? 'Aceptada'
                                    : transfer.status === 'Rejected'
                                    ? 'Denegada'
                                    : transfer.status === 'Cancelled'
                                    ? 'Cancelada'
                                    : 'Pendiente'
                            }
                            requestDate={new Date(transfer.requestDate).toLocaleDateString()}
                            onAccept={() => handleRespondToTransfer(transfer.id, true)}
                            onDeny={() => handleRespondToTransfer(transfer.id, false)}
                            onCancel={() => handleCancelTransfer(transfer.id)}
                        />
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500">No se encontraron transferencias.</p>
                )}
            </div>
        </section>
    );
}

