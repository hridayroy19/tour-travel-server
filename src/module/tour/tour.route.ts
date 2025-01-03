import { Router } from 'express'
import { tourController } from './tour.controller'
import { upload } from '../../helpers/fileUplode'

const tourRouter = Router()

// tourRouter.get('/schedule/:id', tourController.getNextSchedule)
tourRouter.get('/:id', tourController.getSingleTour)
tourRouter.get('/', tourController.getTours)
tourRouter.post('/creat-tour',upload.single("file"),tourController.createTour)
tourRouter.put('/:id', tourController.updateTour)
tourRouter.delete('/:id', tourController.deleteTour)

export default tourRouter
