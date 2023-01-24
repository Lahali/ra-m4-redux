import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Body } from '../components/layout'
import { getHouses } from '../store/house.slice'
import { Text } from '../components/atoms'

const byCity = (house, city) => {
  if (!city) return true
  return house.city.includes(city)
}

const byType = (house, type) => {
  if (!type) return true
  return house.type.includes(type)
}

const filteredHouses = (house, type, city) =>
  byCity(house, city) && byType(house, type)

function Data() {
  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId } = houses
  const houseFilter = useSelector((state) => state.houses.housesFilter)
  const { type, city } = houseFilter

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  console.log('allId', allIds, 'byId', byId, 'tipiño, cidade', type, city)

  return (
    <Body>
      {allIds
        .filter((id) => filteredHouses(byId[id], type, city))
        .map((id) => (
          <Text key={byId[id].id}>
            {byId[id].title} <br />
            {byId[id].city} <br />
            {byId[id].type}
          </Text>
        ))}
    </Body>
  )
}

export default Data
