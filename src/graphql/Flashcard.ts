import {
  booleanArg,
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';

export const Flashcard = objectType({
  name: 'Flashcard',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('backpage');
    t.nonNull.string('frontpage');
    t.nonNull.boolean('read');
    t.field('authorId', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.card
          .findUnique({ where: { id: parent.id } })
          .author();
      },
    });
  },
});

export const FlashcardQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('cards', {
      type: 'Flashcard',
      resolve(parent, args, context, info) {
        return context.prisma.flashcard.findMany();
      },
    });
  },
});

export const FlashcardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('card', {
      type: 'Flashcard',
      args: {
        backpage: nonNull(stringArg()),
        frontpage: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { backpage, frontpage } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error('Cannot post without logging in.');
        }

        const newCard = context.prisma.flashcard.create({
          data: {
            backpage: backpage,
            frontpage: frontpage,
            read: false,
            author: { connect: { id: userId } },
          },
        });
        return newCard;
      },
    });
    t.nonNull.field('updateCard', {
      type: 'Flashcard',
      args: {
        id: nonNull(intArg()),
        backpage: stringArg(),
        frontpage: stringArg(),
        read: booleanArg(),
      },
      resolve(parent, args, context) {
        const { id, backpage, frontpage, read } = args;
        return context.prisma.flashcard.update({
          where: { id },
          data: {
            backpage,
            frontpage,
            read,
          },
        });
      },
    });
    t.nonNull.field('deleteCard', {
      type: 'Flashcard',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.flashcard.delete({
          where: { id },
        });
      },
    });
  },
});
