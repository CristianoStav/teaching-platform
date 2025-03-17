import { Lesson } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

import { LessonsService } from 'src/lessons/lessons.service';
import { LessonsController } from 'src/lessons/lessons.controller';
import { lessonServiceMock } from 'test/mocks/lessons/lesson-service.mock';

describe('CoursesController', () => {
  let lessonsController: LessonsController;
  let lessonsService: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        {
          provide: LessonsService,
          useValue: lessonServiceMock,
        },
      ],
    }).compile();

    lessonsController = module.get<LessonsController>(LessonsController);
    lessonsService = module.get<LessonsService>(LessonsService);
  });

  it('Should return the list of lessons', async () => {
    const courseId = 1;
    const lessons: Lesson[] = [
      { id: 1, title: 'Lesson 1', description: 'Start Lessons', courseId },
      { id: 2, title: 'Lesson 2', description: 'Start Lessons', courseId },
    ];

    lessonServiceMock.findAll.mockResolvedValue(lessons);

    const result = await lessonsController.findAll(`${courseId}`);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe(lessons[0].title);
  });

  it('Should create a lesson', async () => {
    const courseId = 1;
    const lesson: Lesson = {
      id: 1,
      title: 'Lesson 1',
      description: 'Start Lessons',
      courseId,
    };
    lessonServiceMock.create.mockResolvedValue(lesson);

    const result = await lessonsController.create(`${courseId}`, lesson);
    expect(result.title).toBe(lesson.title);
  });

  it('Should update a lesson', async () => {
    const courseId = 1;
    const lesson: Lesson = {
      id: 1,
      title: 'Lesson 1',
      description: 'Start Lessons',
      courseId,
    };
    lessonServiceMock.update.mockResolvedValue(lesson);

    const result = await lessonsController.update(`${courseId}`, lesson);
    expect(lessonsService.update).toHaveBeenCalledWith(+`${courseId}`, lesson);
    expect(result.title).toBe(lesson.title);
  });

  it('Should return a lesson', async () => {
    const courseId = 1;
    const lesson: Lesson = {
      id: 1,
      title: 'Lesson 1',
      description: 'Start Lessons',
      courseId,
    };
    lessonServiceMock.findOne.mockResolvedValue(lesson);

    const result = await lessonsController.findOne(`${courseId}`);
    expect(result?.title).toBe(lesson.title);
  });

  it('Should remove a lesson', async () => {
    const lessonId = 1;
    lessonServiceMock.remove.mockResolvedValue({ id: lessonId });

    const result = await lessonsController.remove(`${lessonId}`);

    expect(lessonsService.remove).toHaveBeenCalledWith(lessonId);
    expect(result).toEqual({ id: lessonId });
  });
});
