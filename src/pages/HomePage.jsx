import React, { Suspense } from "react";
import Banner from "../../src/components/Banner/Banner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorBoundary";
// import CoinsTable from "../components/CoinsTable/CoinsTable";
const CoinsTable = React.lazy(() =>
  import("../components/CoinsTable/CoinsTable")
);

const HomePage = () => {
  return (
    <div>
      {/* <h1>Homepage</h1> */}
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
