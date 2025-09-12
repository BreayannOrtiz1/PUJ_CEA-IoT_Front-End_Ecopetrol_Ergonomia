import React from 'react';
import { useState } from "react";
import { useTable } from '../../../hooks/useTable';
import Checkbox from "../../form/input/Checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";

interface DynamicTableProps {
    tableName: string;
    className?: string;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ 
    tableName, 
    className = '',
    orderBy,
    orderDirection = 'asc'
}) => {
    const { data, columns, loading, error, refresh } = useTable(tableName);
    const [sortConfig, setSortConfig] = useState({
        key: orderBy || '',
        direction: orderDirection
    });

    // Función para ordenar los datos
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] === null) return 1;
            if (b[sortConfig.key] === null) return -1;
            
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];
            
            // Intentar convertir a números si es posible
            const aNum = !isNaN(Number(aValue)) ? Number(aValue) : null;
            const bNum = !isNaN(Number(bValue)) ? Number(bValue) : null;
            
            let comparison = 0;
            if (aNum !== null && bNum !== null) {
                // Si ambos valores son numéricos, comparar como números
                comparison = aNum - bNum;
            } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                // Si son strings, usar localeCompare para comparación natural
                comparison = aValue.localeCompare(bValue, undefined, {numeric: true});
            } else {
                // Fallback a comparación de strings simple
                comparison = String(aValue).localeCompare(String(bValue));
            }
            
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [data, sortConfig]);

    // Función para cambiar el ordenamiento al hacer clic en una columna
    const requestSort = (key: string) => {
        setSortConfig(current => ({
            key,
            direction: 
                current.key === key && current.direction === 'asc' 
                    ? 'desc' 
                    : 'asc',
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 text-red-500">
                <p>{error}</p>
                <button
                    onClick={refresh}
                    className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                No hay datos disponibles
            </div>
        );
    }

    return (
        <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] overflow-x-auto ${className}`}>


            <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell 
                                isHeader 
                                key={index} 
                                className="px-6 py-2"
                            >
                                <div 
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] p-2 rounded transition-colors"
                                    onClick={() => requestSort(column)}
                                >
                                    {column}
                                    {sortConfig.key === column && (
                                        <span className="text-gray-400">
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {sortedData.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                        >   {columns.map((column, colIndex) => (
                            <TableCell 
                                key={`${rowIndex}-${colIndex}`} 
                                className={`px-4 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400 ${
                                    sortConfig.key === column ? 'bg-gray-50/50 dark:bg-white/[0.02]' : ''
                                }`}
                            >
                                {row[column]?.toString() || ''}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};