import React from 'react';
import SearchComponent from '../components/SearchComponent';
import SaveComponent from '../components/SaveComponent';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="centered-div">
        <h2>Save</h2>
        <SaveComponent />
      </div>
      <hr />
      <div className="centered-div">
        <h2>Search</h2>
        <SearchComponent />
      </div>
    </div>
  );
};

export default HomePage;
