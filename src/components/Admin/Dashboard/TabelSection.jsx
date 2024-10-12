import { Fragment } from "react"
import NewOrderTabel from "./NewOrderTabel"

const TabelSection = () => {
  return (
    <Fragment>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-12">
          <div className="mb-6">
            <h1><h1 className="text-2xl font-bold">New Orders</h1></h1>
          </div>
          <div>
            <NewOrderTabel />
          </div>
        </div>
      </div>

    </Fragment>
  )
}
export default TabelSection