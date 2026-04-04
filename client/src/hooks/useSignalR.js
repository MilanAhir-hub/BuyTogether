import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

export const useSignalR = (dealId, propertyId) => {
    const [groupData, setGroupData] = useState(null);
    const [propertyGroupData, setPropertyGroupData] = useState(null);
    const [groupActivated, setGroupActivated] = useState(false);
    const [groupExpired, setGroupExpired] = useState(false);
    const connectionRef = useRef(null);

    useEffect(() => {
        if (!dealId && !propertyId) return;

        // Initialize connection
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5222/hubs/group') 
            .withAutomaticReconnect()
            .build();

        connectionRef.current = newConnection;

        const startConnection = async () => {
            try {
                await newConnection.start();
                console.log('SignalR Connected!');
                
                // Join specific deal group if dealId provided
                if (dealId) {
                    await newConnection.invoke('JoinDealGroup', dealId);
                }

                // Listeners
                newConnection.on('GroupUpdated', (payload) => {
                    if (payload.dealId === dealId) {
                        setGroupData(payload);
                    }
                });

                newConnection.on('GroupActivated', (payload) => {
                    if (payload.dealId === dealId) {
                        setGroupActivated(true);
                    }
                });

                newConnection.on('GroupExpired', (payload) => {
                    if (payload.dealId === dealId) {
                        setGroupExpired(true);
                    }
                });

                // Property Group Listener
                newConnection.on('PropertyGroupUpdated', (rPropertyId, currentCount, maxCount, status) => {
                    if (rPropertyId === propertyId) {
                        setPropertyGroupData({ propertyId: rPropertyId, currentCount, maxCount, status });
                    }
                });
            } catch (err) {
                console.error('SignalR Connection Error: ', err);
            }
        };

        startConnection();

        // Cleanup
        return () => {
            if (connectionRef.current) {
                if (dealId) {
                    connectionRef.current.invoke('LeaveDealGroup', dealId).catch(() => {});
                }
                connectionRef.current.stop().catch(() => {});
            }
        };
    }, [dealId, propertyId]);

    return { groupData, groupActivated, groupExpired, propertyGroupData };
};
