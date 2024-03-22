import { useState, useEffect } from "react";
import axios from "axios";
import * as apiTest from "../testFetch.json"; //for test
import { REACT_APP_API_KEY } from "@env";
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": REACT_APP_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  // const fetchData = async () => {
  //   setIsLoading(true);

  //   try{
  //       const response = await axios.request(options);

  //       setData(response.data.data);
  //       setIsLoading(false);
  //   } catch (error) {
  //       setError(error);
  //       alert('There is an error');
  //   } finally {
  //       setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const reFetch = () => {
  //   setIsLoading(true);
  //   fetchData();
  // }

  // for test
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = apiTest;
      if (endpoint === 'job-details') {
        const filtered = apiTest.data.find(job => job.job_id === query.job_id);
        setData([filtered])
      } else {
        setData(response.data);
      }
      await sleep(1000);
    
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    setIsLoading(true);
    fetchData();
  };
  // for test

  return { data, isLoading, error, reFetch };
};

export default useFetch;
