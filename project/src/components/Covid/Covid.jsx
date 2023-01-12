import React, { useState, useEffect } from 'react';
import './covid.css';
import axios from 'axios';

export function Covid() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState('dark-mode');

    useEffect(() => {
        axios.get('https://api.covid19api.com/summary')
            .then((response) => {
                setData([...response.data.Countries]);
                setFilterData([data, ...response.data.Countries]);
                // console.log(data);
            });
    }, [data]);

    useEffect(() => {
        const filteredData = data.filter((datas) => {
            if (datas.Country) {
                // console.log(search.toLowerCase())
                // console.log(datas.Country.length)
                // debugger

                return datas.Country.toLowerCase().includes(search.toLowerCase());
            }
        });
        // console.log(filteredData);
        setFilterData(filteredData);
    }, [search]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggle = () => {
        if (theme === "dark-mode") {
            setTheme('light-mode');
        } else {
            setTheme('dark-mode');
        }
    }

    return (
        <>
            <header>
                <div className='inputDiv'>
                    <input className='inputBox' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find your Country here"></input>
                </div>
                <h1>Covid 19 Live Data Update</h1>
                <div className='toggleDiv'>
                    <button className="btn" onClick={() => toggle()}>Toggle Mode</button>
                </div>
            </header>
            <main>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="tr">Country</th>
                                <th className="tr">New Confirmed</th>
                                <th className="tr">New Deaths</th>
                                <th className="tr">New Recovered</th>
                                <th className="tr">Total Cases</th>
                                <th className="tr">Total Deaths</th>
                                <th className="tr">Total Recovered</th>
                                <th className='tr'>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterData.map(data =>
                                    <tr key={data.ID}>
                                        <td className='data'>{data['Country']}</td>
                                        <td className='data'>{data['NewConfirmed']}</td>
                                        <td className="data">{data['NewDeaths']}</td>
                                        <td className="data">{data['NewRecovered']}</td>
                                        <td className="data">{data['TotalConfirmed']}</td>
                                        <td className="data">{data['TotalDeaths']}</td>
                                        <td className="data">{data['TotalRecovered']}</td>
                                        <td className='data'>{data['Date']}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}