import React, { lazy, Suspense } from "react";

const HomeScreen = lazy(() => import("./screen/HomeScreen"));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeScreen />
      </Suspense>
    </div>
  );
}

export default App;
