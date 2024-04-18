import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      id: 'user1_id',
      name: 'John Doe',
      email: 'john@example.com',
      emailVerified: new Date(),
      image: 'https://example.com/john.jpg',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user2_id',
      name: 'Jane Smith',
      email: 'jane@example.com',
      emailVerified: new Date(),
      image: 'https://example.com/jane.jpg',
    },
  });

  // Create accounts
  await prisma.account.createMany({
    data: [
      {
        id: 'account1_id',
        userId: user1.id,
        type: 'type1',
        provider: 'provider1',
        providerAccountId: 'provider1_account1',
      },
      {
        id: 'account2_id',
        userId: user1.id,
        type: 'type2',
        provider: 'provider2',
        providerAccountId: 'provider2_account1',
      },
      {
        id: 'account3_id',
        userId: user2.id,
        type: 'type1',
        provider: 'provider1',
        providerAccountId: 'provider1_account2',
      },
    ],
  });

  // Create sessions
  await prisma.session.createMany({
    data: [
      {
        id: 'session1_id',
        sessionToken: 'session_token_1',
        userId: user1.id,
        expires: new Date(),
      },
      {
        id: 'session2_id',
        sessionToken: 'session_token_2',
        userId: user2.id,
        expires: new Date(),
      },
    ],
  });

  // Create posts
  await prisma.post.createMany({
    data: [
      {
        id: 1,
        name: 'Post 1',
        createdBy: {
          connect: { id: user1.id },
        },
      },
      {
        id: 2,
        name: 'Post 2',
        createdBy: {
          connect: { id: user2.id },
        },
      },
    ],
  });

  // Create verification tokens
  await prisma.verificationToken.createMany({
    data: [
      {
        identifier: 'identifier1',
        token: 'verification_token_1',
        expires: new Date(),
      },
      {
        identifier: 'identifier2',
        token: 'verification_token_2',
        expires: new Date(),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
