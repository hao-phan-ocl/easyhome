import { Test, TestingModule } from '@nestjs/testing'

import { OwnersController } from '../owners.controller'
import { OwnersService } from '../owners.service'

describe('OwnersController', () => {
  let controller: OwnersController

  const mockOwnersService = {
    registerOwner: jest.fn((dto) => {
      return {
        ...dto,
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
      providers: [OwnersService],
    })
      .overrideProvider(OwnersService)
      .useValue(mockOwnersService)
      .compile()

    controller = module.get<OwnersController>(OwnersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return all the owners', () => {
    expect(controller.getAll)
  })

  it('should create an owner', async () => {
    const createOwnerDto = {
      firstName: 'Hao',
      lastName: 'Phan',
      email: 'test@a.io',
    }

    const res = await controller.registerOwner(createOwnerDto)

    expect(res.firstName).toBe('Hao')
    expect(res.email).toMatch(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}\.[a-z]{1,64}/i)
  })
})
