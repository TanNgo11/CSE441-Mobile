import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { processColor } from 'react-native';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { useGetListUsers } from 'queries/auth/useGetListUser';
import { useGetListOrders } from 'queries/orders/useGetListOrders';
import { OrderResponseType } from 'queries/orders/types';
import { useGetUserInfo } from 'queries/auth/useGetUserInfo';

const LineChartExample = () => {
    const { data: userList } = useGetListUsers();
    const { data: orderData } = useGetListOrders();
    const { data: admin } = useGetUserInfo();


    const getTotalUsers = () => {
        let totalUsers = 0;
        // console.log("User Data:", data);

        if (userList && Array.isArray(userList)) {
            userList.forEach((user) => {
                totalUsers = totalUsers + 1;
            });
        }

        return totalUsers; // Định dạng đúng
    };
    const getTotalOrders = () => {
        let totalOrders = 0;
        // console.log("User Data:", data);


        if (orderData && Array.isArray(orderData.content)) {

            orderData.content.forEach((orderResponseType: OrderResponseType) => {
                totalOrders = totalOrders + 1;
            });
        }


        return totalOrders; // Định dạng đúng
    };

    const getTotalSell = () => {
        let totalRevenue = 0;
        // console.log("User Data:", data);


        if (orderData && Array.isArray(orderData.content)) {

            orderData.content.forEach((orderResponseType: OrderResponseType) => {
                totalRevenue = orderResponseType.totalPay;
            });
        }


        return totalRevenue; // Định dạng đúng
    };

    const userPart = [
        { title: 'Total User', value: getTotalUsers(), iconName: "user", color: '#A848DD' },
        { title: 'Increased', value: '13%', iconName: 'long-arrow-alt-up', color: '#2FC56E' },
    ];

    const orderPart = [
        { title: 'Total Order', value: getTotalOrders(), iconName: "shopping-cart", color: '#A848DD' },
        { title: 'Total Sell', value: getTotalSell(), iconName: 'money-bill-wave', color: '#2FC56E' },
     
    ];
    const getMonthCounts = () => {
        const count = Array(12).fill(0);
        // 

        if (userList && Array.isArray(userList)) {
            // console.log("User Data:", userList);
            userList.forEach((user) => {
                const createdDate = new Date(user.createdDate);
                const month = createdDate.getMonth();
                if (month >= 0 && month < 12) {
                    count[month] += 1;
                }
            });
        }

        return count.map((value) => ({ y: value })); // Định dạng đúng
    };

    const getMonthCountsOfOrder = () => {
        const count = Array(12).fill(0);
        // console.log("Month Data:", orderData);

        if (orderData && Array.isArray(orderData.content)) {

            orderData.content.forEach((orderResponseType: OrderResponseType) => {
                const createdDate = new Date(orderResponseType.createdDate);
                const month = createdDate.getMonth();
                if (month >= 0 && month < 12) {
                    count[month] += 1;
                }
            });
        }

        return count.map((value) => ({ y: value })); // Định dạng đúng
    };

    const lineChartData = {
        dataSets: [
            {
                values: getMonthCounts(),
                label: 'User Registrations',
                config: {
                    color: processColor('rgba(38, 198, 218, 1)'),
                    lineWidth: 2,
                    drawCircles: true,
                    drawValues: false,
                    drawFilled: true,
                    mode: 'CUBIC_BEZIER',
                    fillColor: processColor('rgba(38, 198, 218, 0.3)'),
                    fillAlpha: 0.3,
                },
            },
        ],
    };
    const lineChartOrderData = {
        dataSets: [
            {
                values: getMonthCountsOfOrder(),
                label: 'Monthly Data',
                config: {
                    color: processColor('#27C7A2'),
                    lineWidth: 2,
                    drawCircles: true,
                    circleColor: processColor('#27C7A2'),
                    drawValues: false,
                    drawFilled: true,
                    fillGradient: {
                        colors: [processColor('#27C7A2'), processColor('#FFFFFF')],
                        positions: [0, 1],
                        angle: 90,
                        orientation: 'TOP_BOTTOM',
                    },
                    fillAlpha: 100,
                    mode: 'CUBIC_BEZIER',
                },
            },
        ],
    };

    const xAxis = {
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        granularityEnabled: true,
        drawGridLines: false,
        axisMaximum: 11.6,
        axisMinimum: -1,
        position: 'BOTTOM',
        textColor: processColor('#fff'),
        yOffset: 10,
    };

    const yAxis = {
        left: {
            axisMinimum: 0,
            axisMaximum: 10,    //fix
            drawGridLines: true,
            textColor: processColor('#fff'),
        },
        right: {
            enabled: false,
        },
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Statistics</Text>
                    <Image
                        style={styles.avatar}
                        source={{ uri: admin?.avatar }}
                    />
                </View>

                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Monthly User Registrations</Text>
                    <LineChart
                        style={styles.chart}
                        data={lineChartData}
                        xAxis={xAxis}
                        yAxis={yAxis}
                        chartDescription={{
                            text: '',
                        }}
                        legend={{ enabled: false }}
                    />
                </View>
                <View style={styles.cardContainer}>
                    {userPart.map((userPart, index) => (
                        <View key={index} style={[styles.card, { backgroundColor: '#423D5D' }]}>
                            <Text style={styles.cardTitle}>{userPart.title}</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Icon
                                    name={userPart.iconName}
                                    type={IconType.FontAwesome5}
                                    color={userPart.color}
                                    size={27}
                                />
                                <Text style={styles.cardValue}>{userPart.value}</Text>
                            </View>

                        </View>
                    ))}
                </View>
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Monthly Orders Places</Text>
                    <LineChart
                        style={styles.chart}
                        data={lineChartOrderData}
                        xAxis={xAxis}
                        yAxis={yAxis}
                        chartDescription={{
                            text: '',
                        }}
                        legend={{ enabled: false }}
                        animation={{ durationX: 1000 }}
                    />
                </View>

                <View style={styles.cardContainer}>
                    {orderPart.map((orderPart, index) => (
                        <View key={index} style={[styles.card, { backgroundColor: '#423D5D' }]}>
                            <Text style={styles.cardTitle}>{orderPart.title}</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <Icon
                                name={orderPart.iconName}
                                type={IconType.FontAwesome5}
                                color={orderPart.color}
                                size={27}
                            />
                            <Text style={styles.cardValue}>{orderPart.value}</Text>
                            </View>

                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#29253C',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#37334C',
        paddingBottom: 20,
        padding: 20,
        paddingTop: 35,
        left: 0,
        right: 0,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    chartContainer: {
        backgroundColor: '#423D5D',
        borderWidth: 2,
        borderColor: '#5C4B72',
        borderRadius: 10,
        margin: 15,
        padding: 10,
    },
    chart: {
        width: '100%',
        height: 250,
    },
    chartTitle: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        zIndex: 1,
    },

    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 15,
    },
    card: {
        width: '48%',
        backgroundColor: '#1C1C1C',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        justifyContent: 'center',
    },
    icon: {
        fontSize: 40,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    cardValue: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 10,
    },
});

export default LineChartExample;
