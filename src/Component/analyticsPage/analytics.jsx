import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './analytics.css';

const AnalyticsPage = () => {
    const [data, setData] = useState({
        numberOfOrdersToday: 0,
        numberOfOrdersThisWeek: 0,
        numberOfOrdersThisMonth: 0,
        totalRevenue: 0,
        totalCompanies: 0,
        totalEmployees: 0,
        recentOrders: [],
        averageReview: 0,
        reviewCount: 0,
        weeklyRevenueBreakdown: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://clickmeal-backend.vercel.app/user/order-insight');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, []);

    const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

    // Data for the circular graph (Pie chart)
    const reviewChartData = [
        { name: 'Average Review', value: data.averageReview },
        { name: 'Remaining', value: 5 - data.averageReview },
    ];

    return (
        <div className='main-dash-root'>
            <div id="dash-header">Dashboard</div>
            <div id="dash-first">
                <div className="summary-card enhanced-summary-card orders-today-card">
                    <h4>Orders Today</h4>
                    <p>{data.numberOfOrdersToday}</p>
                    <div className="summary-card-footer">
                        <span className="summary-card-subtext">Compared to yesterday</span>
                    </div>
                </div>
                <div className="summary-card enhanced-summary-card orders-week-card">
                    <h4>Orders This Week</h4>
                    <p>{data.numberOfOrdersThisWeek}</p>
                    <div className="summary-card-footer">
                        <span className="summary-card-subtext">Weekly overview</span>
                    </div>
                </div>
                <div className="summary-card enhanced-summary-card orders-month-card">
                    <h4>Orders This Month</h4>
                    <p>{data.numberOfOrdersThisMonth}</p>
                    <div className="summary-card-footer">
                        <span className="summary-card-subtext">Monthly insights</span>
                    </div>
                </div>
            </div>
            <div className='dash-total-recent'>
                <div className="chart-container enhanced-revenue-chart">
                    <h3>Total Revenue (Weekly Breakdown)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.weeklyRevenueBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#845EC2" barSize={40} radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="revenue-footer">
                        <p>Total revenue from recent week breakdown</p>
                    </div>
                </div>
                <div className="recent-orders enhanced-recent-orders">
                    <h3>Recent Orders</h3>
                    <div className="recent-orders-card-container">
                        {data.recentOrders.length ? (
                            <table className="analytics-table">
                                <thead>
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Email Address</th>
                                        <th>Phone Number</th>
                                        <th>Company Name</th>
                                        <th>Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.recentOrders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.employeeName}</td>
                                            <td>{order.emailAddress}</td>
                                            <td>{order.phoneNumber}</td>
                                            <td>{order.companyName}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No recent orders available.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='dash-bottom-row dash-total-recent'>
                <div className="enhanced-summary-card">
                    <h3>Total Companies & Employees</h3>
                    <div className="enhanced-summary-content">
                        <div className="summary-block">
                            <div className="summary-value">{data.totalCompanies}</div>
                            <div className="summary-label">Companies</div>
                        </div>
                        <div className="divider"></div>
                        <div className="summary-block">
                            <div className="summary-value">{data.totalEmployees}</div>
                            <div className="summary-label">Employees</div>
                        </div>
                    </div>
                </div>
                <div className="circular-card enhanced-recent-orders">
                    <h4>Average Review</h4>
                    <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                            <Pie
                                data={reviewChartData}
                                innerRadius={50}
                                outerRadius={80}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {reviewChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="circular-card-text">{data.averageReview} / 5 ({data.reviewCount} Reviews)</div>
                </div>
                <div className="enhanced-summary-card">
                    <h3>Total Revenue</h3>
                    <div className='dash-totalRevenue'>
                    <p>{data.totalRevenue}</p>
                    <div className="summary-card-footer">
                        <span className="summary-card-subtext">Compared to yesterday</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
