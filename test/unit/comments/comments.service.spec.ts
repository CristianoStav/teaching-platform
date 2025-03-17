import { Comments } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

import { CommentsService } from 'src/comments/comments.service';
import { CommentsRepository } from 'src/comments/comments.repository';
import { commentsRepositoryMock } from 'test/mocks/comments/comments-repository.mock';

describe('CommentService', () => {
  let commentsService: CommentsService;
  let commentsRepository: Partial<Record<keyof CommentsRepository, jest.Mock>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentsRepository,
          useValue: commentsRepositoryMock,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get(CommentsRepository);
  });

  it('Should return the list of comments', async () => {
    const courseId = 1;
    const lessonId = 1;
    (commentsRepository.findAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        lessonId,
        date: new Date(),
        user: 'Cristiano',
        text: 'Um comentário.',
      },
    ] as Comments[]);

    const result = await commentsService.findAll(courseId, lessonId);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('Should create a comment', async () => {
    const lessonId = 1;
    const comment = {
      id: 1,
      lessonId,
      date: new Date(),
      user: 'Cristiano',
      text: 'Um comentário.',
    } as Comments;

    (commentsRepository.create as jest.Mock).mockResolvedValue(comment);

    const result = await commentsService.create(lessonId, comment);
    expect(result).toEqual(comment);
  });

  it('Should update a comment', async () => {
    const commentId = 1;
    const updateData = {
      text: 'Comentário atualizado',
      user: 'Cristiano',
    } as Comments;

    (commentsRepository.update as jest.Mock).mockResolvedValue(updateData);

    const result = await commentsService.update(commentId, updateData);

    expect(commentsRepository.update).toHaveBeenCalledWith(
      commentId,
      updateData,
    );
    expect(result).toEqual(updateData);
  });

  it('Should delete a comment', async () => {
    const commentId = 1;
    (commentsRepository.remove as jest.Mock).mockResolvedValue({
      id: commentId,
    });

    const result = await commentsService.remove(commentId);

    expect(commentsRepository.remove).toHaveBeenCalledWith(commentId);
    expect(result).toEqual({ id: commentId });
  });

  it('Should return a comment', async () => {
    const commentId = 1;
    const comment = {
      id: commentId,
      lessonId: 1,
      date: new Date(),
      user: 'Cristiano',
      text: 'Um comentário.',
    } as Comments;

    (commentsRepository.findOne as jest.Mock).mockResolvedValue(comment);

    const result = await commentsService.findOne(commentId);

    expect(commentsRepository.findOne).toHaveBeenCalledWith(commentId);
    expect(result).toEqual(comment);
  });
});
