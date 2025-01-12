import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardPage = (props) => {
    console.log('DashboardPage props:', props); // Log all props
    const { token, userId } = props;

    if (!token || !userId) {
        console.log('Missing props in DashboardPage:', { token, userId });
    }

    return <Dashboard token={token} userId={userId} />;
};

export default DashboardPage;