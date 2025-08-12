import React from 'react';

interface ParkingSessionCardProps {
    location: string;
    startTime: string; // ISO string or formatted
    endTime?: string; // Optional, for ongoing sessions
    plateNumber: string;
    status: 'Active' | 'Expired' | 'Upcoming';
    onClick?: () => void;
}

const statusColors = {
    Active: '#4caf50',
    Expired: '#f44336',
    Upcoming: '#ff9800',
};

const ParkingSessionCard: React.FC<ParkingSessionCardProps> = ({
    location,
    startTime,
    endTime,
    plateNumber,
    status,
    onClick,
}) => {
    return (
        <div
            style={{
                border: `1.5px solid ${statusColors[status]}`,
                borderRadius: 12,
                padding: 20,
                margin: 10,
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'box-shadow 0.2s',
            }}
            onClick={onClick}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>{location}</span>
                <span
                    style={{
                        color: '#fff',
                        background: statusColors[status],
                        borderRadius: 8,
                        padding: '2px 10px',
                        fontSize: 13,
                        fontWeight: 500,
                    }}
                >
                    {status}
                </span>
            </div>
            <div style={{ fontSize: 15, marginBottom: 4 }}>
                <strong>Plate:</strong> {plateNumber}
            </div>
            <div style={{ fontSize: 14, color: '#555' }}>
                <div>
                    <strong>Start:</strong> {new Date(startTime).toLocaleString()}
                </div>
                {endTime && (
                    <div>
                        <strong>End:</strong> {new Date(endTime).toLocaleString()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParkingSessionCard;