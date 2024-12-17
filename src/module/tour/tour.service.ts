
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload)
  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown>) => {
  // //{searterm: "searter"}

  const searchTerm = query?.searchTerm || '';
  //"name", "startLocation", "locations"
  // console.log(searchTerm);
  
  // const result = Tour.find({$or:
  //   [
  //     {name: {$regex: searchTerm, $options: "i"}},
  //     {startLocation:{$regex: searchTerm, $options: "i"}},
  //     {locations:{$regex:searchTerm, $options: "i"}}
  //   ]
  // })
  const searchableFilds =  ["name", "startLocation","locations" ]
 
   const result = await Tour.find({$or:searchableFilds.map((field)=>({[field]:{$regex:searchTerm, $options:"i" }}))})


  return result
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id)
  return result
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
}

// const getNextSchedule = async (id: string) => {
//   // console.log(id);

//   const tour = await Tour.getNextNearestStartDateAndEndData()
//   //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

//   return {
//     tour,
//     // nextSchedule,
//   }
// }

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  // getNextSchedule,
}
