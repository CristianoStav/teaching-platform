import { Comments } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from 'src/comments/comments.service';
import { CommentsController } from 'src/comments/comments.controller';
import { commentsServiceMock } from 'test/mocks/comments/comments-service.mock';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: commentsServiceMock,
        },
      ],
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('Should return the list of comments', async () => {
    const courseId = 1;
    const lessonId = 1;
    const comments: Comments[] = [
      {
        id: 1,
        lessonId,
        user: 'Pedro',
        date: new Date(),
        text: 'Good course',
      },
      {
        id: 2,
        lessonId,
        user: 'Paulo',
        date: new Date(),
        text: 'Good course',
      },
    ];

    commentsService.findAll = jest.fn().mockResolvedValue(comments);

    const result = await commentsController.findAll(
      `${lessonId}`,
      `${courseId}`,
    );
    expect(result).toHaveLength(2);
    expect(result[0].text).toBe(comments[0].text);
  });

  it('Should create a comment', async () => {
    const lessonId = 1;
    const courseId = 1;
    const comment: Comments = {
      id: 1,
      lessonId,
      user: 'Pedro',
      date: new Date(),
      text: 'Good course',
    };

    commentsServiceMock.create.mockResolvedValue(comment);

    const result = await commentsController.create(
      `${lessonId}`,
      `${courseId}`,
      comment,
    );

    expect(result.id).toBe(comment.id);
  });

  it('Should update a comment', async () => {
    const comment: Comments = {
      id: 1,
      lessonId: 1,
      date: new Date(),
      text: 'Comentário novo',
      user: 'Pedro',
    };

    commentsServiceMock.update.mockResolvedValue(comment);

    const result = await commentsController.update(`${comment.id}`, comment);

    expect(result.id).toBe(comment.id);
  });

  it('Should return a comment', async () => {
    const comment: Comments = {
      id: 1,
      lessonId: 1,
      date: new Date(),
      text: 'Comentário novo',
      user: 'Pedro',
    };

    commentsServiceMock.findOne.mockResolvedValue(comment);

    const result = await commentsController.findOne(`${comment.id}`);
    expect(result?.text).toBe(comment.text);
  });

  it('Should delete a comment', async () => {
    const commentId = 1;
    commentsServiceMock.remove.mockResolvedValue({ id: commentId });

    const result = await commentsController.remove('1');

    expect(commentsService.remove).toHaveBeenCalledWith(commentId);
    expect(result).toEqual({ id: commentId });
  });
});
