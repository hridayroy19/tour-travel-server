import QueryBuilder from '../../builder/querybuilder'
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)
  const data = new Tour(payload)
  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown>) => {
  //   // //{searterm: "searter"}

  //   const queryObj = { ...query };
  //   console.log("main", query);

  //   const excludingImportant = ["searchTerm","page","limit","sortOrder","sortBy","fields"]
  //   excludingImportant.forEach(key => delete queryObj[key])

  //   // console.log("secound",queryObj);

  //   const searchTerm = query?.searchTerm || '';
  //   console.log(searchTerm);

  //   //"name", "startLocation", "locations"
  //   // console.log(searchTerm);

  //   // const result = Tour.find({$or:
  //   //   [
  //   //     {name: {$regex: searchTerm, $options: "i"}},
  //   //     {startLocation:{$regex: searchTerm, $options: "i"}},
  //   //     {locations:{$regex:searchTerm, $options: "i"}}
  //   //   ]
  //   // })

  //   const searchableFilds = ["name", "startLocation", "locations"]
  //   //seatching kno kichu metching kore oi data pabo
  //   const searchQuery = Tour.find({ $or:searchableFilds.map((field) => ({ [field]: { $regex:searchTerm, $options: "i" }})) })

  //   //  filtering kore kuni ekta spacifi field pachhi
  //   const filerQuery =  searchQuery.find(queryObj);

  //   const page = Number(query?.page) || 1 ;
  //   const limit = Number(query?.limit) || 10;
  //   const skip = (page-1)*limit;

  //   const paginetQuery =  filerQuery.skip(skip).limit(limit)

  //   let sortStr=""

  //   if(query?.sortBy&& query?.sortOrder){
  //       const sortBy = query?.sortBy;
  //       const sortOrder = query?.sortOrder;
  //       // "-price" othoba "price"
  //        sortStr = `${sortOrder ==="desc"?'-':''}${sortBy}`
  //   }

  //   const sortQuery =  paginetQuery.sort(sortStr);

  //   let fields = "-__v";

  //   if (query?.fields) {
  //     fields = (query?.fields as string)?.split(",").join(" ");
  //   }
  // // console.log(fields);

  //    const result = await sortQuery.select(fields);

  //   return result

  const searchableFields = ['name', 'startLocation', 'locations']
  const tours = new QueryBuilder(Tour.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .select()

  const result = await tours.modelQuery
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
