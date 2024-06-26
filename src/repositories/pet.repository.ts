import Pet from '../models/Pet'
import { PetInterface } from '../models/Pet'
class PetRepository {
  async create(pet: PetInterface) {
    return await pet.save()
  }
  async findByName(tutorId: string, name: string) {
    const pet = await Pet.findOne({ tutor: tutorId, name })
    return pet
  }
  async findById(tutorId: string, petId: string) {
    const pet = await Pet.findOne({ tutor: tutorId, _id: petId })
    return pet
  }
  async deleteOne(tutorId: string, petId: string) {
    await Pet.findOneAndDelete({ _id: petId, tutor: tutorId })
  }
  async findByTutorId(tutorId: string) {
    const pets = await Pet.find({ tutor: tutorId })
    return pets
  }
  async update(petData: PetInterface, petId: string) {
    const updatedPet = await Pet.findByIdAndUpdate(petId, petData, {
      new: true,
      runValidators: true
    })
    return updatedPet
  }
}

export default new PetRepository()
