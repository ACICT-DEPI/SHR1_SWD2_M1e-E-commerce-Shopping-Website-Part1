import React, { Fragment } from 'react'
import AddButton from '../../../components/Admin/Buttons/AddButton'
import Carousels from './Carousels'

export const CarouselsPage = () => {
  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <h1 className="text-3xl dark:text-whiten	">Carousels</h1>
        <AddButton label={"Create Carousel"} path={"add"} />
      </div>
      <div>
        <Carousels />
      </div>
    </Fragment>
  )
}
