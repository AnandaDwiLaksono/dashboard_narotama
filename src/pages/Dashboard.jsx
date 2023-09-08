/* eslint-disable react/prop-types */
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import moment from "moment/moment"
import { BsFillCalendarWeekFill } from "react-icons/bs"
import { DateRange } from "react-date-range"

import { ErrorAnimation, Footer, LineChart, LoadingAnimation, Navbar, PieChart, Sidebar, Card } from "../components"
import axiosInstance from "../utils/http-interceptors"


const formatSelection = (date) => {
  const dateString = date
  const dateObject = new Date(dateString)

  // Mendapatkan tahun, bulan, dan tanggal dari objek Date
  const year = dateObject.getFullYear() // Tahun (misalnya: 2023)
  const month = dateObject.getMonth() + 1 // Bulan (0-11, jadi kita tambahkan 1)
  const day = dateObject.getDate() // Tanggal

  // Membuat format YYYY-MM-DD
    const formattedDate = year * 10000 + month * 100 + day
    return formattedDate
}

const formatDataDate = (date) => {
  const dateObject = date.map((item) => {
    const date = new Date(item)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // Tambah 1 karena indeks bulan dimulai dari 0
    const day = date.getDate()

    // Menggabungkan tahun, bulan, dan tanggal menjadi angka 20230815
    let formattedDate = year * 10000 + month * 100 + day
    return formattedDate
  });

  return dateObject
}

const stringDate = (numberDate) => {
  const inputDate = String(numberDate)

  // Memisahkan tahun, bulan, dan tanggal dari tanggal input
  const year = inputDate.slice(0, 4)
  const month = inputDate.slice(4, 6)
  const day = inputDate.slice(6, 8)

  // Membuat tanggal dalam format "YYYY-MM-DD"
  const formattedDate = `${year}/${month}/${day}`
  return formattedDate
}


const Dashboard = () => {
  // const [dataTransactions, setDataTransactions] = useState([]);
  // data tanggal
  const currentDate = new Date()

  const [tanggal, setTanggal] = useState([
    {
      endDate: currentDate,
      startDate: null,
      key: "selection",
    },
  ])

  const [isToggled, setIsToggled] = useState(true)

  // fetching
  const fetchDataTransactions = useQuery({
    queryKey: ['transaction'],
    queryFn: () => {
      return axiosInstance.get('/administrator/transaction')
    },
  })

  const fetchDataTransactionTypes = useQuery({
    queryKey: ['transactionTypes'],
    queryFn: () => {
      return axiosInstance.get('/administrator/transaction/list')
    },
  })

  // animasi fetch
  if (fetchDataTransactions.isLoading && fetchDataTransactionTypes.isLoading) {return <LoadingAnimation /> }
  if (fetchDataTransactions.isError && fetchDataTransactionTypes.isError) {return <ErrorAnimation /> }

  if (!fetchDataTransactions.isLoading && !fetchDataTransactionTypes.isLoading) {
    // ambil tanggal
    const create_atData = fetchDataTransactions.data?.data.map(
      (item) => item.created_at
    )
    const dateSelectionStart = tanggal[0].startDate
    const dateSelectionEnd = tanggal[0].endDate

    // ubah format
    const dates = fetchDataTransactions.data?.data
    const dataDate = formatDataDate(create_atData)

    // filtering
    const filteringDate = (date) => {
      const startDate = formatSelection(dateSelectionStart)
      const endDate = formatSelection(dateSelectionEnd)
      return date >= startDate && date <= endDate
    };
    const filteredDate = dataDate.filter(filteringDate)

    // index
    const bottomDate = filteredDate[0]
    const topDate = filteredDate[filteredDate.length - 1]
    const indexAwal = dataDate.indexOf(bottomDate)
    const indexAkhir = dataDate.lastIndexOf(topDate)

    // potong data
    const result = dates.slice(indexAwal, indexAkhir + 1)

    // const dataTransactions = fetchDataTransactions.data?.data
    const dataTransactions = result
    console.log("Result : ",result)
    const dataTransactionTypes = fetchDataTransactionTypes.data?.data

    // formating tanggal
    const formattedDate = (date) => {
      const newDate = new Date(date)

      const day = String(newDate.getDate()).padStart(2, '0')
      const month = String(newDate.getMonth() + 1).padStart(2, '0')
      const year = newDate.getFullYear()

      return `${year}-${month}-${day}`
    };

    // data transaksi hari ini
    const dataTransactionsFilterToday = dataTransactions.filter((data) => data.status === '1' && moment(formattedDate(data.created_at)).isSame(formattedDate(new Date()), 'day'))

    // data transaksi kemarin
    const dataTransactionsFilterYesterday = dataTransactions.filter((data) => data.status === '1' && moment(formattedDate(data.created_at)).isSame(formattedDate(moment().subtract(1, 'days')), 'day'))

    // persentase
    const percentage = (value, total) => {
      const result = (((value - total) / total) * 100).toFixed(0)

      if (result === 'Infinity' || result === 'NaN') {
        return ''
      } else if (result > 0) {
        return `+${result}%`
      } else {
        return `${result}%`
      }
    };

    // data income
    const dataIncomeToday = dataTransactionsFilterToday.filter((data) => data.category === 'InCome').length
    const dataIncomeYesterday = dataTransactionsFilterYesterday.filter((data) => data.category === 'InCome').length

    // data outcome
    const dataOutcomeToday = dataTransactionsFilterToday.filter((data) => data.category === 'OutCome').length
    const dataOutcomeYesterday = dataTransactionsFilterYesterday.filter((data) => data.category === 'OutCome').length

    const getDaysInMonth = (year, month) => {
      return new Date(year, month, 0).getDate()
    }

    // data linechart
    const dataTimeSeries = (args) => {
      let data = [];

      const year = new Date().getFullYear()
      const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
      const daysInMonth = getDaysInMonth(year, month)

      for (let i = 0; i < daysInMonth; i++) {
        const transactionDataFiltered = dataTransactions.filter((item) => item.status === '1' && item.category === args && moment(formattedDate(item.created_at)).isSame(moment(`${year}-${month}-01`).add(i, 'days')), 'day')

        const total = transactionDataFiltered.reduce((acc, curr) => acc + curr.amount, 0)

        data.push({ x: new Date(moment(`${year}-${month}-01`).add(i, 'days')), y: total })
      }

      return data
    }

    const numberFormat = new Intl.NumberFormat('id-ID')

    // pengolahan data pie chart
    for (let i = 0; i < dataTransactionTypes.length; i++) {
      let qtyTotal = 0

      dataTransactionsFilterToday.forEach((item) => {
        if (item.type === dataTransactionTypes[i].id) {
          qtyTotal += 1
        }
      })

      dataTransactionTypes[i] = {...dataTransactionTypes[i], qty: qtyTotal}
    }

    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col justify-between w-5/6 pl-2 pr-12">
          <Navbar title={`Welcome, ${localStorage.getItem('ROLE') === 1 ? 'Super Admin' : 'Admin'}`} />
          <div className="flex flex-col justify-center max-h-[calc(100%-136px)] gap-5">
            <div className="flex justify-between gap-5 2xl:h-48 h-36">
              <Card
                bgColor={"bg-wave-yellow"}
                layout={"mr-0 sm:mr-1 mb-3 sm:mb-0"}
                judul={"Total Semua Transaksi"}
                jumlah={dataTransactionsFilterToday.length}
                value={percentage(
                  dataTransactionsFilterToday.length,
                  dataTransactionsFilterYesterday.length
                )}
              />
              <Card
                bgColor={"bg-wave-blue"}
                layout={"mx-0 sm:mx-1 mb-3 sm:mb-0"}
                judul={"Total Transaksi Income"}
                jumlah={dataIncomeToday}
                value={percentage(dataIncomeToday, dataIncomeYesterday)}
              />
              <Card
                bgColor={"bg-wave-green"}
                layout={"ml-0 sm:ml-1 mb-3 sm:mb-0"}
                judul={"Total Transaksi Outcome"}
                jumlah={dataOutcomeToday}
                value={percentage(dataOutcomeToday, dataOutcomeYesterday)}
              />
            </div>
            <div className="flex gap-5 max-h-[calc(100%-160px)]">
              <div className="card w-full sm:w-3/5 rounded-2xl border border-primary p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="2xl:text-3xl text-xl text-dark">Transaksi</div>
                  <div className="flex items-center">
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="btn btn-sm border-2 mt-4 mb-2">
                        <BsFillCalendarWeekFill />
                        {formatSelection(dateSelectionStart) < 20230101
                          ? "Early"
                          : stringDate(formatSelection(dateSelectionStart))}{" "}
                        - {stringDate(formatSelection(dateSelectionEnd))}
                      </label>
                      <div
                        tabIndex={0}
                        className="dropdown-content z-[1] card card-compact w-auto p-2 bg-white border-[1px] border-base-text shadow-2xl text-primary-content">
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => {
                            console.log(item)
                            setTanggal([item.selection])
                          }}
                          moveRangeOnFirstSelection={true}
                          ranges={tanggal}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center my-3">
                  <div className="flex justify-between bg-light rounded-full 2xl:p-2 p-1 border border-primary duration-150">
                    <button
                      onClick={() => setIsToggled(!isToggled)}
                      className={`2xl:px-6 px-3 2xl:py-2 py-1 rounded-full duration-150 ${
                        isToggled ? "bg-primary text-white" : ""
                      }`}>
                      Income
                    </button>
                    <button
                      onClick={() => setIsToggled(!isToggled)}
                      className={`2xl:px-6 px-3 2xl:py-2 py-1 rounded-full duration-150 ${
                        isToggled ? "" : "bg-primary text-white"
                      }`}>
                      Outcome
                    </button>
                  </div>
                  <div className="text-xl text-dark">
                    Total :{" "}
                    <span className="font-bold">
                      {" "}
                      Rp{" "}
                      {isToggled
                        ? numberFormat.format(
                            dataTimeSeries("InCome").reduce(
                              (acc, curr) => acc + curr.y,
                              0
                            )
                          )
                        : numberFormat.format(
                            dataTimeSeries("OutCome").reduce(
                              (acc, curr) => acc + curr.y,
                              0
                            )
                          )}
                    </span>
                  </div>
                </div>
                {isToggled ? (
                  <LineChart
                    intervalType="Days"
                    // interval={500000}
                    dataSource={dataTimeSeries("InCome")}
                    name="Income Transactions"
                    id="chartIncome"
                  />
                ) : (
                  <LineChart
                    intervalType="Days"
                    // interval={3000000}
                    dataSource={dataTimeSeries("OutCome")}
                    name="Outcome Transactions"
                    id="chartOutcome"
                  />
                )}
              </div>
              <div className="card w-full sm:w-2/5 rounded-2xl border border-primary p-6">
                <div className="2xl:text-3xl text-xl text-dark">
                  Tipe Transaksi
                </div>
                <PieChart data={dataTransactionTypes} />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard
