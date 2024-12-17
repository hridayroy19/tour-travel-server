
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload)
  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown >) => {
  // //{searterm: "searter"}

  const queryObj = { ...query };
  // console.log("main", query);

  const excludingImportant = ["searchTerm","page","limit"]
  excludingImportant.forEach(key => delete queryObj[key])

  // console.log("secound",queryObj);


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

  const searchableFilds = ["name", "startLocation", "locations"]

  //seatching kno kichu metching kore oi data pabo
  const searchQuery =  Tour.find({ $or: searchableFilds.map((field) => ({ [field]: { $regex: searchTerm, $options: "i" } })) })

  //  filtering kore kuni ekta spacifi field pachhi
  const filerQuery =  searchQuery.find(queryObj);


  const page = Number(query?.page) || 1 ;
  const limit = Number(query?.limit) || 10;
  const skip = (page-1)*limit;
  
  const result = await filerQuery.skip(skip).limit(limit)


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
