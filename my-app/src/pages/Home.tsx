import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {Skeleton, Categories, Sort, PizzaBlock , Pagination} from '../components';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortProperty;


  const onChangeCategory = React.useCallback((id: number) => {
    console.log('onChangeCategory', id);
    dispatch(setCategoryId(id));
  }, [])
  const onChangePage = (page: number) => {
    console.log('onChangePage', page);
    dispatch(setCurrentPage(page));
  };

  // Бизнес логика
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scroll(0, 0);
  };

  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);


  // Если был первый рендер, то запрашиваем пиццы (парсим)
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   !isSearch.current && getPizzas();
  //   isSearch.current = false;
  // }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((value: any) => <PizzaBlock key={value.id} {...value} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>ERROR</h2>
          <p>ГДЕ ПИТСЫ???</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
