import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId, setCurrentPage, setFilters } from '../redux/Slices/filterSlice.js'
import { fetchPizzas } from '../redux/Slices/pizzaSlice.js'
import Skeleton from "../components/PizzaBlock/Skeleton.js"
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";

import Pagination from '../components/Pagination/index.js';
import { SearchContext } from '../App.js';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)
  const { items, status } = useSelector(state => state.pizza.items)

  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const sortType = sort.Property
  


  const { searchValue } = React.useContext(SearchContext)

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
    }
    const onChangePage = number => {
      dispatch(setCurrentPage (number))
    }

    // Бизнес логика
    const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace("-",'')
      const order = sort.sortProperty.includes("-") ? "asc" : "desc"
      const category = categoryId > 0 ? `category=${categoryId}` : ""
      const search = searchValue ? `&search=${searchValue}` : ""

    // axios
    // .get(
    //   `https://662553c304457d4aaf9e768b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    //     .then ((res) => {
    //     setItems(res.data)
    //     setisLoading(false)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })

  // try {
  //   dispatch(fetchPizzas({
  //     sortBy,
  //     order,
  //     category,
  //     search,
  //     currentPage
  //   }))
  // } catch (err) {
  //   console.log(err)
  //   alert("Unexpected data-pizzas loading")
  // } finally {
  //   setisLoading(false)
  // }

      dispatch(fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage
    }))
  window.scroll(0,0)
    }

    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
      if (isMounted.current) {
        const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })
        navigate(`?${queryString}`)
      }
      isMounted.current = true
      }, [categoryId, sortType, currentPage]
    )

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
    React.useEffect(() => {
      getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])
    // Если был первый рендер, то запрашиваем пиццы (парсим)
    React.useEffect(() => {
      window.scrollTo(0,0)
      !isSearch.current && getPizzas()
      isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])



    const pizzas = items
    .filter((value) => {
    if (value.title.toLowerCase().includes(searchValue.toLowerCase())) { 
      return true
    } 
    return false
  })
    .map((value) => (<PizzaBlock key={value.id} {...value}/>))
    const skeletons = [... new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory ={onChangeCategory}/>
        <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === "error" ? (
            <div className='content__error-info'>
             <h2>ERROR</h2>
             <p>ГДЕ ПИТСЫ???</p> 
            </div>
          ) : (<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>)
        }
 
        <Pagination currentPage = {currentPage} onChangePage = {onChangePage} />
    </div>
  )
}

export default Home
