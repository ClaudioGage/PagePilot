import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  const jkRowling = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      bio: 'British author best known for the Harry Potter series',
      birthYear: 1965,
    },
  });

  const stephenKing = await prisma.author.create({
    data: {
      name: 'Stephen King',
      bio: 'American author of horror, supernatural fiction, and fantasy novels',
      birthYear: 1947,
    },
  });

  const georgeOrwell = await prisma.author.create({
    data: {
      name: 'George Orwell',
      bio: 'English novelist and essayist, journalist and critic',
      birthYear: 1903,
    },
  });

  await prisma.book.createMany({
    data: [
      {
        title: "Harry Potter and the Philosopher's Stone",
        summary: 'A young wizard discovers his magical heritage on his 11th birthday',
        publicationYear: 1997,
        authorId: jkRowling.id,
        isFavorite: true,
      },
      {
        title: 'Harry Potter and the Chamber of Secrets',
        summary: 'Harry returns to Hogwarts to face a new dark threat',
        publicationYear: 1998,
        authorId: jkRowling.id,
      },
      {
        title: 'Harry Potter and the Prisoner of Azkaban',
        summary: 'Harry learns about his past and confronts the truth about Sirius Black',
        publicationYear: 1999,
        authorId: jkRowling.id,
      },
      {
        title: 'The Shining',
        summary: 'A writer descends into madness while isolated in a haunted hotel',
        publicationYear: 1977,
        authorId: stephenKing.id,
        isFavorite: true,
      },
      {
        title: 'IT',
        summary: 'A group of kids face their fears against an ancient evil entity',
        publicationYear: 1986,
        authorId: stephenKing.id,
      },
      {
        title: '1984',
        summary: 'A dystopian vision of totalitarian control and surveillance',
        publicationYear: 1949,
        authorId: georgeOrwell.id,
        isFavorite: true,
      },
      {
        title: 'Animal Farm',
        summary: 'An allegorical tale about farm animals who rebel against their owner',
        publicationYear: 1945,
        authorId: georgeOrwell.id,
      },
    ],
  });

  console.log('Database seeding completed!');
  console.log(`Created ${await prisma.author.count()} authors`);
  console.log(`Created ${await prisma.book.count()} books`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });