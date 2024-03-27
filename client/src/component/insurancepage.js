import React, { useState } from 'react';

const InsurancePage = () => {
 const [premium, setPremium] = useState('');
 const [coverage, setCoverage] = useState('');
 const [doctor, setdoctor] = useState('');
 const [city, setCity] = useState('');
 const [state, setState] = useState('');
 const [zipCode, setzipCode] = useState('');
 const [recommendations, setRecommendations] = useState([]);
