import React, { useEffect, useState } from 'react';

const DiagonalSumCalculator = () => {
    const [diagonalSum, setDiagonalSum] = useState(0);

    //  Function to calculate diagonal sum
    useEffect(() => {
        const calculateDiagonalSum = () => {
            let sum = 0;
            for (let i = 1; i <= 16; i += 5) {
                sum += i;
            }
            setDiagonalSum(sum);
        };
        calculateDiagonalSum();
    }, []);

    
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '250px', marginTop: "50px", marginLeft: "50px", marginBottom: "50px" }}>
                {[...Array(16).keys()].map((index) => (
                    <div key={index} style={{ width: '25%', height: '25%', border: '1px solid black', boxSizing: 'border-box', textAlign: 'center', lineHeight: '50px' }}>
                        {index + 1}
                    </div>
                ))}
                Diagonal Sum: {diagonalSum}
            </div>
        </div>
    );
};

export default DiagonalSumCalculator;
