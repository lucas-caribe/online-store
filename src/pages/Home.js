import React from 'react';

import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <CategoryList />
        <div className="main-content">
          <SearchBar />
          <ProductList {...this.props} />
        </div>
      </div>
    );
  }
}

export default Home;
