import { Fragment } from "react"
import AreaChart from "../Charts/AreaChart"
import DoughnutChart from "../Charts/DoughnutChart"

const ChartSection = ({ areaData, doughnutData }) => {

  return (
    <Fragment>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Total Sales</h1>
          </div>

          <AreaChart chartdata={areaData} />
        </div>
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Orders Status</h1>
          </div>
          <DoughnutChart chartdata={doughnutData} />
        </div>
      </div>

    </Fragment>
  )
}
export default ChartSection