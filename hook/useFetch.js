import { useState, useEffect } from "react";
import axios from 'axios';
import * as apiTest from '../testFetch.json'; //for test

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const options = {
    //     method: 'GET',
    //     url: ` ${endpoint}`,
    //     headers: {
    //       'X-RapidAPI-Key': 'f67f461958mshd5c3e05827af177p1d750cjsn6289f5ed6987',
    //       'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    //     },
    //     params: { ...query },
    //   };

    //   const fetchData = async () => {
    //     setIsLoading(true);

    //     try{
    //         const response = await axios.request(options);

    //         setData(response.data.data);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setError(error);
    //         alert('There is an error');
    //     } finally {
    //         setIsLoading(false);
    //     }
    //   }

    //   useEffect(() => {
    //     fetchData();
    //   }, []);

    //   const reFetch = () => {
    //     setIsLoading(true);
    //     fetchData();
    //   }

// for test 
const sleep = ms => new Promise(r => setTimeout(r, ms));
    const fetchData = async () => {
        setIsLoading(true);

        try{
            const response = apiTest;
            await sleep(1000)

            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

      const refetch = () => {
        setIsLoading(true);
        fetchData();
      }
// for test

      return { data, isLoading, error, refetch };
}

export default useFetch;