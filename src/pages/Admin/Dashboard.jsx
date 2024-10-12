import React, { Fragment } from "react";
import CardSection from "../../components/Admin/Dashboard/CardSection";
import ChartSection from "../../components/Admin/Dashboard/ChartSection";
import TabelSection from "../../components/Admin/Dashboard/TabelSection";

const Dashboard = () => {
  return (
    <Fragment>
      <CardSection />
      <ChartSection />
      <TabelSection />
    </Fragment>
  );
};

export default Dashboard;
