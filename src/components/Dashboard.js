import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import HeatmapMap from '../components/Heatmap';
import GraphGrid from '../components/Graphs';
import PotholeDetectionTable from '../components/RecentDetections'; // Import your table component

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    }, []);

    const potholeData = [
        {
            location: 'Thimphu',
            severity: 'High',
            potholeCount: 2030,
            timestamp: '2025-01-20 10:00 AM',
        },
        {
            location: 'Paro',
            severity: 'Medium',
            potholeCount: 920,
            timestamp: '2025-01-20 10:30 AM',
        },
        {
            location: 'Bumthang',
            severity: 'Low',
            potholeCount: 50,
            timestamp: '2025-01-20 11:00 AM',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px', marginBottom: '40px' }}> {/* Added bottom margin */}
            <Grid container spacing={3}>
                {/* Total Potholes */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Total Potholes</Typography>
                            <Typography variant="h4" sx={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 2 }}>1,234</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Budget */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Total Budget</Typography>
                            <Typography variant="h4" sx={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 2 }}>Nu 5.6M</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Potholes Repaired */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Potholes Repaired</Typography>
                            <Typography variant="h4" sx={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 2 }}>150</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Potholes Reported */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Potholes Reported</Typography>
                            <Typography variant="h4" sx={{ fontSize: '2rem', fontWeight: 'bold', marginTop: 2 }}>80</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br />
            {/* Graph Section */}
            <div>
                <GraphGrid />
            </div>

            {/* Heatmap Section */}
            <Grid item xs={12} sm={20} md={20} sx={{ marginTop: '20px' }}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Potholes Heatmap
                        </Typography>
                        <HeatmapMap />
                    </CardContent>
                </Card>
            </Grid>

            {/* Pothole Detection Table Section */}
            <Grid item xs={12} sx={{ marginTop: '20px' }}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardContent sx={{ padding: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                            Recent Pothole Detection
                        </Typography>
                        <PotholeDetectionTable data={potholeData} />
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
};

export default Dashboard;
