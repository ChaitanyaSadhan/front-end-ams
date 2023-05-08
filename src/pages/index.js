import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [data, setData] = useState([])

    const [error, setError] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        setError('')
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://attendance-api-blond.vercel.app/data", requestOptions)
            .then(response => response.text())
            .then(result => setData(JSON.parse(result)))
            .catch(error => setError('Unable to fetch data. Please try again.'));
    }

  return (
      <div className=' bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
          <div className='mx-auto max-w-6xl py-10 w-full'>

              <nav
                  className=" bg-white bg-gradient-to-r from-cyan-500 to-blue-500 fixed w-full z-20 top-0 left-0">
                  <div className="max-w-screen-xl  flex flex-wrap items-center justify-center mx-auto p-4">

                      <div className="items-center hidden w-full md:flex md:w-auto md:order-1"  id="navbar-sticky">
                          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                              <li>
                                  <p
                                     className=" align-middle block m-3.5 text-white text-3xl  font-bold rounded  md:text-white-700 md:p-0 md:dark:text-white-500"
                                     aria-current="page">Attendance Management System | ECE | RGUKT-Basar</p>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>

              <div className='mt-4 py-10'>

                  <div className=" shadow-md rounded-lg">
                      <table  className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead
                              className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                  <th scope="col" className="px-6 py-3">
                                      Student ID
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                      Student Name
                                  </th>

                                  <th scope="col" className="px-6 py-3">
                                      View
                                  </th>
                              </tr>
                          </thead>
                          <tbody >
                          {
                              error.length > 0 ? <p>{error}</p> :
                              data.map(it => {
                                  return (<tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                      <th scope="row"
                                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {it.idNumber}
                                      </th>
                                      <td className="px-6 py-4 dark:text-white">
                                          {it.name}
                                      </td>

                                      <td className="px-6 py-4 ">
                                          <button className='px-5 py-2 rounded-md shadow-md bg-blue-500 text-white'>View</button>
                                      </td>
                                  </tr>)
                              })
                          }

                          </tbody>
                      </table>
                  </div>


              </div>
          </div>

      </div>
  )
}
