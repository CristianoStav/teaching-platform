import { Course } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

import { CoursesService } from 'src/courses/courses.service';
import { CourseRepository } from 'src/courses/courses.repository';
import { courseRepositoryMock } from 'test/mocks/courses/course-repository.mock';

describe('CourseService', () => {
  let courseService: CoursesService;
  let courseRepository: Partial<Record<keyof CourseRepository, jest.Mock>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: CourseRepository,
          useValue: courseRepositoryMock,
        },
      ],
    }).compile();

    courseService = module.get<CoursesService>(CoursesService);
    courseRepository = module.get(CourseRepository);
  });

  it('Deve retornar a lista de cursos', async () => {
    (courseRepository.list as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Nodejs', category: 'Backend' },
      { id: 1, name: 'React', category: 'Frontend' },
    ] as Course[]);

    const result = await courseService.findAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Nodejs');
  });

  it('Deve criar um curso', async () => {
    const course = { id: 1, name: 'Nodejs', category: 'Backend' } as Course;
    (courseRepository.create as jest.Mock).mockResolvedValue(course);

    const result = await courseService.create(course);
    expect(result).toEqual(course);
  });

  it('Deve atualizar um curso', async () => {
    const courseId = 1;
    const updateData = { name: 'React', category: 'Frontend' };
    const updatedCourse = { id: courseId, ...updateData };

    (courseRepository.update as jest.Mock).mockResolvedValue(updatedCourse);

    const result = await courseService.update(courseId, updateData);

    expect(courseRepository.update).toHaveBeenCalledWith(courseId, updateData);
    expect(result).toEqual(updatedCourse);
  });

  it('Deve deletar um curso', async () => {
    const courseId = 1;
    (courseRepository.remove as jest.Mock).mockResolvedValue({ id: courseId });

    const result = await courseService.remove(courseId);

    expect(courseRepository.remove).toHaveBeenCalledWith(courseId);
    expect(result).toEqual({ id: courseId });
  });

  it('Deve retornar um curso', async () => {
    const courseId = 1;
    const course = {
      id: courseId,
      name: 'Nodejs',
      category: 'Backend',
    } as Course;

    (courseRepository.findOne as jest.Mock).mockResolvedValue(course);

    const result = await courseService.findOne(courseId);

    expect(courseRepository.findOne).toHaveBeenCalledWith(courseId);
    expect(result).toEqual(course);
  });
});
