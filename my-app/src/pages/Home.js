import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId, setCurrentPage, setFilters } from '../redux/Slices/filterSlice.js'
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


  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const sortType = sort.Property
  


  const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setisLoading] = React.useState(true)

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
    }
    const onChangePage = number => {
      dispatch(setCurrentPage (number))
    }
    const fetchPizzas = () => {
      setisLoading(true)
      const sortBy = sort.sortProperty.replace("-",'')
      const order = sort.sortProperty.includes("-") ? "asc" : "desc"
      const category = categoryId > 0 ? `category=${categoryId}` : ""
      const search = searchValue ? `&search=${searchValue}` : ""

    axios
    .get(
      `https://662553c304457d4aaf9e768b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then ((res) => {
        setItems(res.data)
        setisLoading(false)
        })
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
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1))

        const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

        dispatch (
          setFilters({
            ...params,
            sort
          })
        )
        isSearch.current = true
      }
    }, [])
    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
      window.scrollTo(0,0)
      !isSearch.current && fetchPizzas()
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
        <div className="content__items">
        {
          isLoading ? skeletons : pizzas
        }
        <Pagination currentPage = {currentPage} onChangePage = {onChangePage} />
        </div>
    </div>
  )
}

export default Home
