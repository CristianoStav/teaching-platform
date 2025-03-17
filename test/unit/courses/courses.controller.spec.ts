import { Test, TestingModule } from '@nestjs/testing';
import { Course } from '@prisma/client';
import { CoursesController } from 'src/courses/courses.controller';
import { CoursesService } from 'src/courses/courses.service';
import { courseServiceMock } from 'test/mocks/courses/course-service.mock';

describe('CoursesController', () => {
  let coursesController: CoursesController;
  let coursesService: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: courseServiceMock,
        },
      ],
    }).compile();

    coursesController = module.get<CoursesController>(CoursesController);
    coursesService = module.get<CoursesService>(CoursesService);
  });

  it('Should return the list of courses', async () => {
    const courses: Course[] = [
      { id: 1, name: 'Python', category: 'Backend' },
      { id: 2, name: 'Nodejs', category: 'Backend' },
    ];

    courseServiceMock.findAll = jest.fn().mockResolvedValue(courses);

    const result = await coursesController.findAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe(courses[0].name);
  });

  it('Should create a crouse', async () => {
    const course = { id: 1, name: 'Python', category: 'Backend' };
    courseServiceMock.create = jest.fn().mockResolvedValue(course);

    const result = await coursesController.create(course);
    expect(result.name).toBe(course.name);
  });

  it('Should update a course', async () => {
    const course = { id: 1, name: 'Python', category: 'Backend' };
    courseServiceMock.update = jest.fn().mockResolvedValue(course);

    const result = await coursesController.update('1', course);
    expect(coursesService.update).toHaveBeenCalledWith(+'1', course);
    expect(result.name).toBe(course.name);
  });

  it('Should return a course', async () => {
    const course = { id: 1, name: 'Python', category: 'Backend' };
    courseServiceMock.findOne.mockResolvedValue(course);

    const result = await coursesController.findOne('1');
    expect(result?.name).toBe(course.name);
  });

  it('Should remove a course', async () => {
    const courseId = 1;
    courseServiceMock.remove.mockResolvedValue({ id: courseId });

    const result = await coursesController.remove('1');

    expect(coursesService.remove).toHaveBeenCalledWith(courseId);
    expect(result).toEqual({ id: courseId });
  })
});
