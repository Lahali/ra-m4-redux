import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { useFetch } from '../../hooks'
import { FlexBox, Grid } from '../../styles'
import { urls } from '../../constants'
import { getHouses } from '../../store/house.slice'

const HousesStyled = styled(FlexBox)``

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

function Houses() {
  // const [houses, setHouses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, isError, isSuccess } = useFetch(urls.houses)

  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { allIds, byId } = houses
  const houseFilter = useSelector((state) => state.houses.housesFilter)
  const { type, city } = houseFilter

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <HousesStyled>
      {loading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <Grid gridGap="32px">
          {allIds
            .filter((id) => filteredHouses(byId[id], type, city))
            .map((id) => (
              <HouseCard
                key={byId[id].id}
                title={byId[id].title}
                price={`${byId[id].price}`}
                img={byId[id].image}
                link=""
              />
            ))}
        </Grid>
      )}
      <FlexBox align="center">
        <Button
          style={{ marginTop: '2rem' }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Load more
        </Button>
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``
