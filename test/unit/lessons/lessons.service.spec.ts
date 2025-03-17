import { Lesson } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

import { LessonsService } from 'src/lessons/lessons.service';
import { LessonsRepository } from 'src/lessons/lessons.repository';
import { lessonRepositoryMock } from 'test/mocks/lessons/lesson-repository.mock';

describe('LessonService', () => {
  let lessonService: LessonsService;
  let lessonRepository: Partial<Record<keyof LessonsRepository, jest.Mock>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: LessonsRepository,
          useValue: lessonRepositoryMock,
        },
      ],
    }).compile();

    lessonService = module.get<LessonsService>(LessonsService);
    lessonRepository = module.get(LessonsRepository);
  });

  it('Deve retornar a lista de lições', async () => {
    const courseId = 1;
    (lessonRepository.findAll as jest.Mock).mockResolvedValue([
      { id: 1, courseId, description: 'First Lesson', title: 'Lesson 1' },
      { id: 2, courseId, description: 'Second Lesson', title: 'Lesson 2' },
    ] as Lesson[]);

    const result = await lessonService.findAll(courseId);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Lesson 1');
  });

  it('Deve criar uma lição', async () => {
    const courseId = 1;
    const lesson = { courseId, description: 'First Lesson', title: 'Lesson 1' } as Lesson;
    (lessonRepository.create as jest.Mock).mockResolvedValue(lesson);

    const result = await lessonService.create(courseId, lesson);
    expect(result).toEqual(lesson);
  });

  it('Deve atualizar uma lesson', async () => {
    const courseId = 1;
    const updateData = { courseId, description: 'First Lesson', title: 'Lesson 1' };

    (lessonRepository.update as jest.Mock).mockResolvedValue(updateData);

    const result = await lessonService.update(courseId, updateData);

    expect(lessonRepository.update).toHaveBeenCalledWith(courseId, updateData);
    expect(result).toEqual(updateData);
  });

  it('Deve deletar uma lesson', async () => {
    const lessonId = 1;
    (lessonRepository.remove as jest.Mock).mockResolvedValue({ id: lessonId });

    const result = await lessonService.remove(lessonId);

    expect(lessonRepository.remove).toHaveBeenCalledWith(lessonId);
    expect(result).toEqual({ id: lessonId });
  });

  it('Deve retornar um curso', async () => {
    const courseId = 1;
    const lessonId = 1;
    const lesson = {
      id: lessonId,
      courseId,
      description: 'First Lesson',
      title: 'Lesson 1',
    } as Lesson;

    (lessonRepository.findOne as jest.Mock).mockResolvedValue(lesson);

    const result = await lessonService.findOne(lessonId);

    expect(lessonRepository.findOne).toHaveBeenCalledWith(lessonId);
    expect(result).toEqual(lesson);
  });
});
